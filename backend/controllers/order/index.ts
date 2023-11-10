import {Request , Response} from "express";
import Orders from "../../models/orders";
import Real_estates_own from "../../models/real_estates_own"; 
import Real_estates from "../../models/real_estates";
import Users from "../../models/users";
import { sequelize } from "../../models";
import { Op } from "sequelize";
import Trades from "../../models/trades";

export const orderSell =async(req : Request , res :Response)=>{
    console.log("orderSell에 post 요청 들어옴");
    console.log(req.body);
    console.log(req.params);
    const { price , amount} = req.body;
    const { name } = req.params;
    
    // 유저 임시
    const user_email = "test@naver.com"
    try {
        // 유저가 해당 매물에 amount 이상의 양을 보유하고 있는지 확인
        const holdings : any = await Real_estates_own.findAll({
            where :{ user_email : user_email , real_estate_name : name},
            attributes :[
                "possible_quantity",
            ],
            raw : true,
        })
        // console.log("holdings------", holdings);
        // 물량이 아예 없을 때 반환
        if(holdings.length <= 0){
            res.send("보유 물량 없음");
        }
        // 물량은 있지만 주문수량 이상으로 있는지 확인
        else {
            if(holdings[0].possible_quantity >= amount){

                const result = await Orders.create({
                    user_email : user_email,
                    real_estate_name : name,
                    order_type : "sell",
                    order_status : "0",
                    order_price : price,
                    order_amount : amount,
                    possible_amount : amount, 
                })

                await Real_estates_own.update({
                    possible_quantity : sequelize.literal(`possible_quantity-${amount}`)

                },{
                    where :{ user_email : user_email , real_estate_name : name},
                })

                res.send("매도 주문 완료");
            }
            else{
                res.send("보유 수량 부족");
            }
        }
        

    } catch (error) {
        console.log(error);
    }
}


export const orderBuy = async(req : Request , res : Response)=>{
    console.log("orderBuy post 요청 들어오니?");
    console.log(req.body);
    console.log(req.params);
    const { price , amount} = req.body;
    const { name } = req.params;
    let restamount;

    // 유저 임시
    const islogin = "test2@naver.com"

    try {
        // 구매했을 때 유저의 잔고가 주문금액 * 수량 보다 많은지 확인
        // 유저테이블의 balance 가져오기
        // balance 변수의 타입이 객체인데 안의 값이 넘버 or null 임을 정의
        const balance : {balance : number} | null = await Users.findOne({
            where :{
                user_eamil : islogin,
            },
            attributes :[
                "balance",
            ],
            raw : true,
        }) as {balance : number} | null; // as 키워드를 통해 반환값의 타입을 강제로 지정.

        console.log("잔고 : " , balance?.balance);

        

        // ! 의 의미는 이 변수는 항상 값을 가질 것으로 null 또는 undefined 를 걱정하지 말라는 뜻.
        if (balance!.balance > price * amount ){

            // 매물의 현재가 가져오기
            const currentPrice : {current_price : number} | null = await Real_estates.findOne({
                where :{
                    real_estate_name : name,
                },
                attributes :[
                    "current_price",
                ],
                raw : true,
                }) as {current_price : number} | null;
    
                console.log((currentPrice?.current_price));

             // 현재가 보다 주문금액이 낮으면 order 테이블 단순 등록(체결이 안됨)    

            if(currentPrice!.current_price > price){

                await Orders.create({
                    user_email : islogin,
                    real_estate_name : name,
                    order_type : "buy",
                    order_status : "0",
                    order_price : price,
                    order_amount : amount,
                    possible_amount : amount,
                })

                // 구매 주문이 완료되면 잔고에서 주문금액만 빼기
                await Users.update({
                    balance : sequelize.literal(`balance-${price*amount}`),
                },
                {
                    where :{user_eamil : islogin},
                })
            }

            // 현재가 보다 높게 매수 신청 했을 때
            else{

                const sellOrders = await Orders.findAll({
                    where:{
                      real_estate_name: name,
                      order_type: "sell",
                      order_status: "0",
                      order_price: {
                        [Op.lte]: price,
                        // [Op.lte]: currentPrice?.current_price,
                      },
                      possible_amount : {
                        [Op.gt] : 0,
                      }
                    },
                    order :[
                        ['order_price','ASC'],
                        ['createdAt','ASC'],
                    ],
                    raw : true,
                });

                console.log("sellOrder----", sellOrders);

                // 현재가가 아래 호가에 있을 경우 현재가로 주문하면 파는 물량이 없기때문에 단순 주문이 된다.
                if(sellOrders.length <= 0){

                    await Orders.create({
                        user_email : islogin,
                        real_estate_name : name,
                        order_type : "buy",
                        order_status : "0",
                        order_price : price,
                        order_amount : amount,
                        possible_amount : amount,
                    })
    
                    // 구매 주문이 완료되면 잔고에서 주문금액만 빼기
                    await Users.update({
                        balance : sequelize.literal(`balance-${price*amount}`),
                    },
                    {
                        where :{user_eamil : islogin},
                    })
                    res.send("매수 주문 완료");
                }
                else{
                    console.log("sellOrder+++++++++++++",sellOrders);

                    const result = sellOrders.map(({id, possible_amount,user_email,order_price} ) => ({ id,possible_amount,user_email,order_price }));

                    for(const el of result){
                        console.log(el);
                        

                        // 오더 테이블에 체결 상태로 넣기
                        await Orders.create({
                            user_email : islogin,
                            real_estate_name : name,
                            order_type : "buy",
                            order_status : "1",
                            order_price : price,
                            order_amount : amount,
                            possible_amount : 0,
                        })

                        restamount = amount - el.possible_amount;
                        

                        if(restamount<0){
                            console.log("0볻 ㅏ작아음")
                            console.log(amount);
                            // 해당 id 컬럼에서 possible_amount -amount를 해주고,
                            // 물량이 남아있으니 미체결 0
                            await Orders.update({
                                possible_amount : el.possible_amount - amount,
                            },{
                                where : { id : el.id },
                            })

                            // 체결 테이블 생성
                            await Trades.create({
                                real_estate_name : name,
                                buyer_order_email : islogin,
                                seller_order_email : el.user_email,
                                trade_price : el.order_price,
                                trade_amount : el.possible_amount - amount,
                            })

                            // user_email로 그 사람의 balance를 가져와서 amount * order_price 만큼 더해주기.
                            await Users.update({
                                balance : sequelize.literal(`balance + ${(el.possible_amount - amount) * el.order_price}`)
                            },{
                                where : {user_eamil : el.user_email},
                            }
                            )
                            break;
                        }
                        else if(restamount==0){
                            console.log("0임");
                            console.log(amount);
                            // 해당 id 컬럼에서 possible_amount 를 0으로 해주고,
                            // order_status 를 체결로 만들어주고, 
                            await Orders.update({
                                possible_amount : 0,
                                order_status : "1",
                            },{
                                where : { id : el.id },
                            })
                            
                            // 체결 테이블 생성
                            await Trades.create({
                                real_estate_name : name,
                                buyer_order_email : islogin,
                                seller_order_email : el.user_email,
                                trade_price : el.order_price,
                                trade_amount : el.possible_amount,
                            })
                            
                            await Users.update({
                                balance : sequelize.literal(`balance + ${(el.possible_amount) * el.order_price}`)
                            },{
                                where : {user_eamil : el.user_email},
                            }
                            )
                            break;
                        }
                        else {
                            console.log("0보다 큼");
                            console.log(amount);
                            // 해당 id 컬럼을 possible_amount 를 0으로 해주고,
                            // order_status 를 체결로 만들어주고, 
                            await Orders.update({
                                possible_amount : 0,
                                order_status : "1",
                            },{
                                where : { id : el.id },
                            })

                            // 체결 테이블 생성
                            await Trades.create({
                                real_estate_name : name,
                                buyer_order_email : islogin,
                                seller_order_email : el.user_email,
                                trade_price : el.order_price,
                                trade_amount : el.possible_amount,
                            })
                            
                            await Users.update({
                                balance : sequelize.literal(`balance + ${(el.possible_amount) * el.order_price}`)
                            },{
                                where : {user_eamil : el.user_email},
                            }
                            )
                        }
                    }
                    res.send("매수 완료");
                }
            }
        }
        else{
            res.send("보유 금액 부족")
        }
        
    } catch (error) {
        console.log(error);
    }   
    res.send();
}