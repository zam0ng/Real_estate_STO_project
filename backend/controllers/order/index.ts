import e, {Request , Response} from "express";
import Orders from "../../models/orders";
import Real_estates_own from "../../models/real_estates_own"; 
import Real_estates from "../../models/real_estates";
import Users from "../../models/users";
import { sequelize } from "../../models";
import { Op, Sequelize } from "sequelize";
import Trades from "../../models/trades";

// 매도 주문
export const orderSell =async(req : Request , res :Response)=>{
    console.log("orderSell에 post 요청 들어옴");
    const { price , amount} = req.body;
    const { name } = req.params;
    let restamount = amount;
    
    // 유저 임시
    const islogin = "test@naver.com"
    try {
        // 유저가 해당 매물에 amount 이상의 양을 보유하고 있는지 확인
        const holdings : any = await Real_estates_own.findAll({

            where :{ user_email : islogin , real_estate_name : name},
            attributes :[
                "possible_quantity",
            ],
            raw : true,
        })

        // 물량이 아예 없을 때 반환
        if(holdings.length <= 0){
            res.send("보유 물량 없음");
        }

        // 물량은 있지만 주문수량 이상으로 있는지 확인
        else {
            if(holdings[0].possible_quantity >= amount){

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
                
                 // 현재가 보다 매도 주문금액이 높으면 order 테이블 단순 등록(체결이 안됨)
                 // real_estates_own 테이블에서 possible_quantity 컬럼 -amount 해주기
                if(currentPrice!.current_price < price){
                    
                    await Orders.create({
                        user_email : islogin,
                        real_estate_name : name,
                        order_type : "sell",
                        order_status : "0",
                        order_price : price,
                        order_amount : amount,
                        possible_amount : amount,
                    })

                    await Real_estates_own.update({
                        possible_quantity : sequelize.literal(`possible_quantity - ${amount}`),
                    },{
                        where : {
                            user_email : islogin,
                            real_estate_name : name,
                        }   
                    })
                    console.log("ㄷㅈㄱㄷㅈㄱㄷㅈ");

                    res.send("매도 주문 완료");

                }
                else{

                    // 현재가보다 매도 주문금액이 낮거나 같을 때
                    // 먼저, 현재가로 buy 가 있는지 판단

                    const buyOrdes = await Orders.findAll({
                        where :{
                            real_estate_name : name,
                            order_type : "buy",
                            order_status : "0",

                            order_price : {
                                [Op.gte] : price // price 보다 크거가 같아
                            },

                            possible_amount :{
                                [Op.gt] : 0 // 0 보다 큰거 -> 물량이 있음.
                            }
                        },
                        order :[
                            ['order_price','DESC'],
                            ['createdAt','ASC'],
                        ],
                        raw : true,
                    })
                    
                    // 현재가가 위에 호가에 있어서 구매 수량이 없으면 단순 등록
                    if(buyOrdes.length <= 0){

                        await Orders.create({
                            user_email : islogin,
                            real_estate_name : name,
                            order_type : "sell",
                            order_status : "0",
                            order_price : price,
                            order_amount : amount,
                            possible_amount : amount,
                        })
    
                        await Real_estates_own.update({
                            possible_quantity : sequelize.literal(`possible_quantity - ${amount}`),
                        },{
                            where : {
                                user_email : islogin,
                                real_estate_name : name,
                            }   
                        })

                        res.send('매도 주문 완료');
                    }
                    else{
                        console.log("buyOrders---",buyOrdes);

                        const result = buyOrdes.map(({id, possible_amount,user_email,order_price} ) => ({ id,possible_amount,user_email,order_price }));

                        const real_estate_id : {id : number} | null = await Real_estates.findOne({
                            where : {
                                real_estate_name : name,
                            },
                            attributes : [
                                'id'
                            ],
                            raw : true,

                        }) as {id : number} | null;
                        console.log("+_+_+_+_+_+_+_+",real_estate_id?.id)


                        for (const el of result) {
                            console.log(el);


                            restamount = restamount - el.possible_amount;

                            if(restamount < 0 ){
                                console.log("restamount 0아래임", restamount);

                                // order 체결된 테이블생성
                                await Orders.create({
                                    user_email : islogin,
                                    real_estate_name : name,
                                    order_type : "sell",
                                    order_status : "1",
                                    order_price : el.order_price,
                                    order_amount : el.possible_amount + restamount,
                                    possible_amount : 0,
                                })
                                // trade 테이블생성
                                await Trades.create({
                                    real_estate_name : name,
                                    trade_price : el.order_price,
                                    trade_amount : el.possible_amount + restamount,
                                    buyer_order_email : el.user_email,
                                    seller_order_email : islogin,
                                })
                                
                                // 다 팔린게 아니기때문에 해당 id 의 possible_amount 변경해주기,
                                await Orders.update({
                                    possible_amount : sequelize.literal(`possible_amount-${el.possible_amount + restamount}`)
                                },{
                                    where :{
                                        id : el.id,
                                    }
                                })
                                // 판매자의 real_estates_own 테이블에서 possible_quantitiy, amount 체결량만큼 빼기,
                                await Real_estates_own.update({
                                    possible_quantity : sequelize.literal(`possible_quantity-${el.possible_amount + restamount}`),
                                    amount : sequelize.literal(`amount-${el.possible_amount + restamount}`,)
                                },{
                                    where :{
                                        user_email : islogin,
                                        real_estate_name : name,
                                    }
                                })
                                // 구매자의 using_balance 에서 체결 금액만큼 빼기,
                                await Users.update({
                                    using_balance : sequelize.literal(`using_balance-${el.order_price * (el.possible_amount + restamount)}`)
                                },{
                                    where : {
                                        user_email : el.user_email,
                                    }
                                })

                                // 매도가 완료되었으니 판매자한테 돈 넣어주기
                                await Users.update({
                                    balance : sequelize.literal(`balance + ${el.order_price * (el.possible_amount + restamount)}`)
                                },{
                                    where :{
                                        user_email : islogin,
                                    }
                                })

                                // 구매자의 real_estates_own에 구매한 만큼 추가하기
                                // 먼저 구매자가 가지고 있는 매물인지 체크

                                const isHave = await Real_estates_own.findOne({
                                    where : {
                                        user_email : el.user_email,
                                        real_estate_name : name,
                                    }
                                })
                                // 매물이 없으면 create ,
                                if(!isHave){
                                    await Real_estates_own.create({
                                        user_email : el.user_email,
                                        real_estate_id  : real_estate_id!.id,
                                        real_estate_name : name,
                                        price : (el.order_price * (el.possible_amount + restamount)) / el.possible_amount + restamount, // 🔥
                                        amount : el.possible_amount + restamount,
                                        possible_quantity : el.possible_amount + restamount,
                                    })
                                }
                                // 있으면 update
                                else{
                                    await Real_estates_own.update({
                                        // price : sequelize.literal(`price+${el.order_price * (el.possible_amount + restamount)}`),
                                        price : sequelize.literal(`((price * amount)+(${el.order_price * (el.possible_amount + restamount)})) / (amount + ${(el.possible_amount + restamount)})`), // 🔥
                                        amount : sequelize.literal(`amount+${ el.possible_amount + restamount}`),
                                        possible_quantity : sequelize.literal(`possible_quantity+${el.possible_amount + restamount}`),
                                    },{
                                        where :{
                                            user_email : el.user_email,
                                            real_estate_name : name,
                                        }
                                    })
                                }

                                break;
                            }
                            else if(restamount ==0){
                                console.log("restamount 0임", restamount);

                                // order 체결된 테이블생성
                                await Orders.create({
                                    user_email : islogin,
                                    real_estate_name : name,
                                    order_type : "sell",
                                    order_status : "1",
                                    order_price : el.order_price,
                                    order_amount : el.possible_amount,
                                    possible_amount : 0,
                                })

                                // trade 테이블생성
                                await Trades.create({
                                    real_estate_name : name,
                                    trade_price : el.order_price,
                                    trade_amount : el.possible_amount,
                                    buyer_order_email : el.user_email,
                                    seller_order_email : islogin,
                                })
                                
                                // 매수 주문 업데이트
                                await Orders.update({
                                    possible_amount : 0,
                                    order_status : "1",
                                },{
                                    where :{
                                        id : el.id,
                                    }
                                })

                                // 판매자의 real_estates_own 테이블에서 possible_quantitiy 체결량만큼 빼기,
                                await Real_estates_own.update({
                                    possible_quantity : sequelize.literal(`possible_quantity-${el.possible_amount}`),
                                    amount : sequelize.literal(`amount-${el.possible_amount}`),
                                },{
                                    where :{
                                        user_email : islogin,
                                        real_estate_name : name,
                                    }
                                })
                                // 구매자의 using_balance 에서 체결 금액만큼 빼기,
                                await Users.update({
                                    using_balance : sequelize.literal(`using_balance-${el.order_price * el.possible_amount}`)
                                },{
                                    where : {
                                        user_email : el.user_email,
                                    }
                                })

                                // 매도가 완료되었으니 판매자한테 돈 넣어주기
                                await Users.update({
                                    balance : sequelize.literal(`balance + ${el.order_price * el.possible_amount}`)
                                },{
                                    where :{
                                        user_email : islogin,
                                    }
                                })

                                // 구매자의 real_estates_own에 구매한 만큼 추가하기
                                // 먼저 구매자가 가지고 있는 매물인지 체크
                                const isHave = await Real_estates_own.findOne({
                                    where : {
                                        user_email : el.user_email,
                                        real_estate_name : name,
                                    }
                                })
                                // 매물이 없으면 create ,
                                if(!isHave){
                                    await Real_estates_own.create({
                                        user_email : el.user_email,
                                        real_estate_id  : real_estate_id!.id,
                                        real_estate_name : name,
                                        price : (el.order_price * el.possible_amount) / el.possible_amount,// 🔥
                                        amount : el.possible_amount,
                                        possible_quantity : el.possible_amount,
                                    })
                                }
                                // 있으면 update
                                else{
                                    await Real_estates_own.update({
                                        // price : sequelize.literal(`price+${el.order_price * el.possible_amount}`),
                                        price : sequelize.literal(`((price * amount) + (${el.order_price * el.possible_amount})) / (amount + ${el.possible_amount})`), // 🔥
                                        amount : sequelize.literal(`amount+${ el.possible_amount}`),
                                        possible_quantity : sequelize.literal(`possible_quantity+${el.possible_amount}`),
                                    },{
                                        where :{
                                            user_email : el.user_email,
                                            real_estate_name : name,
                                        }
                                    })
                                }

                                break;
                            }
                            else{
                                console.log("restamount 0이상임", restamount);

                                // order 체결된 테이블생성
                                await Orders.create({
                                    user_email : islogin,
                                    real_estate_name : name,
                                    order_type : "sell",
                                    order_status : "1",
                                    order_price : el.order_price,
                                    order_amount : el.possible_amount,
                                    possible_amount : 0,
                                })
                                // trade 테이블생성
                                await Trades.create({
                                    real_estate_name : name,
                                    trade_price : el.order_price,
                                    trade_amount : el.possible_amount,
                                    buyer_order_email : el.user_email,
                                    seller_order_email : islogin,
                                })
                                
                                // 
                                await Orders.update({
                                    possible_amount : 0,
                                    order_status : "1",
                                },{
                                    where :{
                                        id : el.id,
                                    }
                                })
                                // 판매자의 real_estates_own 테이블에서 possible_quantitiy 체결량만큼 빼기,
                                await Real_estates_own.update({
                                    possible_quantity : sequelize.literal(`possible_quantity-${el.possible_amount}`),
                                    amount : sequelize.literal(`amount-${el.possible_amount}`)
                                },{
                                    where :{
                                        user_email : islogin,
                                        real_estate_name : name,
                                    }
                                })
                                // 구매자의 using_balance 에서 체결 금액만큼 빼기,
                                await Users.update({
                                    using_balance : sequelize.literal(`using_balance-${el.order_price * el.possible_amount}`)
                                },{
                                    where : {
                                        user_email : el.user_email,
                                    }
                                })

                                // 매도가 완료되었으니 판매자한테 돈 넣어주기
                                await Users.update({
                                    balance : sequelize.literal(`balance + ${el.order_price * el.possible_amount}`)
                                },{
                                    where :{
                                        user_email : islogin,
                                    }
                                })

                                // 구매자의 real_estates_own에 구매한 만큼 추가하기
                                // 먼저 구매자가 가지고 있는 매물인지 체크
                                const isHave = await Real_estates_own.findOne({
                                    where : {
                                        user_email : el.user_email,
                                        real_estate_name : name,
                                    }
                                })
                                // 매물이 없으면 create ,
                                if(!isHave){
                                    await Real_estates_own.create({
                                        user_email : el.user_email,
                                        real_estate_id  : real_estate_id!.id,
                                        real_estate_name : name,
                                        price :( el.order_price * el.possible_amount) / el.possible_amount, // 🔥
                                        amount : el.possible_amount,
                                        possible_quantity : el.possible_amount,
                                    })
                                }
                                // 있으면 update
                                else{
                                    await Real_estates_own.update({
                                        // price : sequelize.literal(`price+${el.order_price * el.possible_amount}`),
                                        price : sequelize.literal(`((price * amount) + (${el.order_price * el.possible_amount})) / (amount + ${el.possible_amount})`), // 🔥
                                        amount : sequelize.literal(`amount+${ el.possible_amount}`),
                                        possible_quantity : sequelize.literal(`possible_quantity+${el.possible_amount}`),
                                    },{
                                        where :{
                                            user_email : el.user_email,
                                            real_estate_name : name,
                                        }
                                    })
                                }
                            }

                        }
                        console.log("최종 amount",restamount);

                        // 해당 매물의 마지막 체결 테이블의 trade_price 를 가져와서
                        // 매물의 현재가로 변경해주기. => 체결의 마지막이 현재가
                        const lastTradePrice : {trade_price : number}[] | null = await Trades.findAll({
                            where : {
                                real_estate_name : name,
                            },
                            
                            attributes :[
                                'trade_price'
                            ],
    
                            order :[
                                ['createdAt','DESC'],
                            ],
                            
                            limit :1,
                            raw : true,
                        }) as {trade_price : number}[] | null ;
                        
                        console.log(lastTradePrice?.[0].trade_price);
                        
                        await Real_estates.update({
                            current_price : lastTradePrice?.[0]?.trade_price,
                        },{
                            where : {
                                real_estate_name : name,
                            }
                        })

                        if( restamount > 0){
                            
                            // 현재가 보다 낮은가격에 매도 한다면 현재가에 매도
                            // lastTradePrice?.[0]?.trade_price 가 undefined 인지 먼저 판별 하고 true 면 lastTradePrice[0].trade_price  과 && 연산
                            // lastTradePrice[0].trade_price 값이 존재한다면 price 랑 그때 비교
                            if(lastTradePrice?.[0]?.trade_price !== undefined && lastTradePrice[0].trade_price > price){

                                // 남은 물량 order 테이블에 추가해주고,
                                await Orders.create({
                                    user_email : islogin,
                                    real_estate_name : name,
                                    order_type : "sell",
                                    order_status : "0",
                                    order_price : lastTradePrice?.[0]?.trade_price,
                                    order_amount : restamount,
                                    possible_amount : restamount,
                                })
                            }
                            else{

                                // 남은 물량 order 테이블에 추가해주고,
                                await Orders.create({
                                    user_email : islogin,
                                    real_estate_name : name,
                                    order_type : "sell",
                                    order_status : "0",
                                    order_price : price,
                                    order_amount : restamount,
                                    possible_amount : restamount,
                                })
                            }
                            
                            
                            // 가능 수량에서 빼주고,
                            await Real_estates_own.update({
                                possible_quantity : sequelize.literal(`possible_quantity-${restamount}`),
                            },
                            {
                                where : {
                                    user_email : islogin,
                                    real_estate_name : name,
                                }
                            })
                        }
    
                        
                        res.send("매도 완료");
                    }
                }

            }
            else{
                res.send("보유 수량 부족");
            }
        }

    } catch (error) {
        console.log(error);
    }
}

// 매수 주문
export const orderBuy = async(req : Request , res : Response)=>{
    console.log("orderBuy post 요청 들어오니?");
   
    const { price , amount} = req.body;
    const { name } = req.params;
    let restamount : number = amount;

    // 유저 임시
    const islogin = "test2@naver.com"

    try {
        // 구매했을 때 유저의 잔고가 주문금액 * 수량 보다 많은지 확인
        // 유저테이블의 balance 가져오기
        // balance 변수의 타입이 객체인데 안의 값이 넘버 or null 임을 정의
        const balance : {balance : number} | null = await Users.findOne({
            where :{
                user_email : islogin,
            },
            attributes :[
                'balance',
                // [sequelize.literal('balance - using_balance'),'available_balance']
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

                // 구매 주문이 완료되면 balance에서 주문금액만큼 빼고, using_balance 에 넣기
                await Users.update({
                    balance : sequelize.literal(`balance-${price*amount}`),
                    using_balance : sequelize.literal(`using_balance + ${price*amount}`),
                },
                {
                    where :{user_email : islogin},
                })

                res.send("매수 주문 완료");
            }

            // 현재가 보다 높게 매수 신청 했을 때
            else{

                const sellOrders = await Orders.findAll({
                    where:{
                      real_estate_name: name,
                      order_type: "sell",
                      order_status: "0",
                      order_price: {
                        [Op.lte]: price, // price 보다 작거나 같은
                        // [Op.lte]: currentPrice?.current_price,
                      },
                      possible_amount : {
                        [Op.gt] : 0, // 0보다 크다.
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
                        using_balance : sequelize.literal(`using_balance + ${price*amount}`),
                    },
                    {
                        where :{user_email : islogin},
                    })
                    res.send("매수 주문 완료");
                }
                else{
                    console.log("sellOrder+++++++++++++",sellOrders);

                    const result = sellOrders.map(({id, possible_amount,user_email,order_price} ) => ({ id,possible_amount,user_email,order_price }));

                    const real_estate_id : {id : number} | null = await Real_estates.findOne({
                        where : {
                            real_estate_name : name,
                        },
                        attributes : [
                            'id'
                        ],
                        raw : true,

                    }) as {id : number} | null;
                    console.log("+_+_+_+_+_+_+_+",real_estate_id?.id);

                    for(const el of result){
                        console.log(el);

                        restamount = restamount - el.possible_amount;
                        

                        if(restamount<0){
                            console.log("0볻 ㅏ작아음")
                            console.log(restamount); // -2

                            // 오더 테이블에 체결 상태로 넣기

                            await Orders.create({
                                user_email : islogin,
                                real_estate_name : name,
                                order_type : "buy",
                                order_status : "1",
                                order_price : el.order_price,
                                order_amount : el.possible_amount + restamount,
                                possible_amount : 0,
                            })

                            // 해당 id 컬럼에서 possible_amount -amount를 해주고,
                            // 물량이 남아있으니 미체결 0 으로 두기

                            await Orders.update({
                                possible_amount : sequelize.literal(`possible_amount-${el.possible_amount + restamount}`)
                            },{
                                where : { id : el.id },
                            })

                            // 체결 테이블 생성
                            await Trades.create({
                                real_estate_name : name,
                                buyer_order_email : islogin,
                                seller_order_email : el.user_email,
                                trade_price : el.order_price,
                                trade_amount : el.possible_amount + restamount,
                            })

                            // user_email로 판매자 의 balance를 가져와서 amount * order_price 만큼 더해주기.
                            await Users.update({
                                balance : sequelize.literal(`balance + ${(el.possible_amount + restamount) * el.order_price}`)
                            },{
                                where : {user_email : el.user_email},
                            }
                            )

                            // 판매자의 real_estates_own 의 amount 를 체결 수량만큼 빼기 🔥
                            await Real_estates_own.update({
                                amount : sequelize.literal(`amount-${el.possible_amount + restamount}`)
                            },{
                                where :{
                                    user_email : el.user_email,
                                    real_estate_name : name,
                                }
                            })

                            // 구매자 balance 에 차감
                            await Users.update({
                                balance : sequelize.literal(`balance -${(el.possible_amount + restamount) * el.order_price}`)
                            },{
                                where : {user_email : islogin},
                            })

                            // 구매자의 real_estates_own에 구매한 만큼 추가하기
                            // 먼저 구매자가 가지고 있는 매물인지 체크
                            const isHave = await Real_estates_own.findOne({
                                where : {
                                    user_email : islogin,
                                    real_estate_name : name,
                                }
                            })
                            // 매물이 없으면 create ,
                            if(!isHave){
                                await Real_estates_own.create({
                                    user_email : islogin,
                                    real_estate_id  : real_estate_id!.id,
                                    real_estate_name : name,
                                    price : ((el.possible_amount + restamount) * el.order_price) / (el.possible_amount + restamount), // 🔥
                                    amount : el.possible_amount + restamount,
                                    possible_quantity : el.possible_amount + restamount,
                                })
                            }
                            // 있으면 update
                            else{
                                await Real_estates_own.update({
                                    // price : sequelize.literal(`price+${(el.possible_amount + restamount) * el.order_price}`),
                                    price : sequelize.literal(`((price * amount)+(${el.order_price * (el.possible_amount + restamount)})) / (amount + ${(el.possible_amount + restamount)}) `), // 🔥

                                    amount : sequelize.literal(`amount+${ el.possible_amount + restamount}`),
                                    possible_quantity : sequelize.literal(`possible_quantity+${el.possible_amount + restamount}`),
                                },{
                                    where :{
                                        user_email : islogin,
                                        real_estate_name : name,
                                    }
                                })
                            }
                            break;
                        }
                        else if(restamount==0){
                            console.log("0임");
                            console.log(restamount);
                            // 해당 id 컬럼에서 possible_amount 를 0으로 해주고,
                            // order_status 를 체결로 만들어주고, 

                            // 오더 테이블에 체결 상태로 넣기
                            await Orders.create({
                                user_email : islogin,
                                real_estate_name : name,
                                order_type : "buy",
                                order_status : "1",
                                order_price : el.order_price,
                                order_amount : el.possible_amount,
                                possible_amount : 0,
                            })

                            // 다 팔린거니 가능물량 0 , 상태 체결 1로 변경
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
                            
                            // 판매자 한테 체결금액만큼 돈 넣기
                            await Users.update({
                                balance : sequelize.literal(`balance + ${(el.possible_amount) * el.order_price}`)
                            },{
                                where : {user_email : el.user_email},
                            }
                            )

                            // 판매자의 real_estates_own 의 amount 를 체결 수량만큼 빼기 🔥
                            await Real_estates_own.update({
                                amount : sequelize.literal(`amount-${el.possible_amount}`)
                            },{
                                where :{
                                    user_email : el.user_email,
                                    real_estate_name : name,
                                }
                            })

                            // 구매자 balance 에 차감
                            await Users.update({
                                balance : sequelize.literal(`balance -${(el.possible_amount) * el.order_price}`)
                            },{
                                where : {user_email : islogin},
                            })

                            // 구매자의 real_estates_own에 구매한 만큼 추가하기
                            // 먼저 구매자가 가지고 있는 매물인지 체크
                            const isHave = await Real_estates_own.findOne({
                                where : {
                                    user_email : islogin,
                                    real_estate_name : name,
                                }
                            })
                            // 매물이 없으면 create ,
                            if(!isHave){
                                await Real_estates_own.create({
                                    user_email : islogin,
                                    real_estate_id  : real_estate_id!.id,
                                    real_estate_name : name, 
                                    price : ((el.possible_amount) * el.order_price) / el.possible_amount , // 🔥
                                    amount : el.possible_amount,
                                    possible_quantity : el.possible_amount,
                                })
                            }
                            // 있으면 update
                            else{
                                await Real_estates_own.update({
                                    // price : sequelize.literal(`price+${(el.possible_amount) * el.order_price}`),
                                    price : sequelize.literal(`((price * amount)+(${el.order_price * el.possible_amount})) / (amount + ${el.possible_amount})`), // 🔥

                                    amount : sequelize.literal(`amount+${ el.possible_amount}`),
                                    possible_quantity : sequelize.literal(`possible_quantity+${el.possible_amount}`),
                                },{
                                    where :{
                                        user_email : islogin,
                                        real_estate_name : name,
                                    }
                                })
                            }
                            break;
                        }
                        else {
                            console.log("0보다 큼");
                            console.log(restamount);

                            // 오더 테이블에 체결 상태로 넣기
                            await Orders.create({
                                user_email : islogin,
                                real_estate_name : name,
                                order_type : "buy",
                                order_status : "1",
                                order_price : el.order_price,
                                order_amount : el.possible_amount,
                                possible_amount : 0,
                            })

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
                            
                            // 판매자의 balance에 체결금액만큼 추가
                            await Users.update({
                                balance : sequelize.literal(`balance + ${(el.possible_amount) * el.order_price}`)
                            },{
                                where : {user_email : el.user_email},
                            }
                            )

                            // 판매자의 real_estates_own 의 amount 를 체결 수량만큼 빼기 🔥
                            await Real_estates_own.update({
                                amount : sequelize.literal(`amount-${el.possible_amount}`)
                            },{
                                where :{
                                    user_email : el.user_email,
                                    real_estate_name : name,
                                }
                            })

                            // 구매자 balance 에 차감
                            await Users.update({
                                balance : sequelize.literal(`balance -${(el.possible_amount) * el.order_price}`)
                            },{
                                where : {user_email : islogin},
                            })

                            // 구매자의 real_estates_own에 구매한 만큼 추가하기
                            // 먼저 구매자가 가지고 있는 매물인지 체크
                            const isHave = await Real_estates_own.findOne({
                                where : {
                                    user_email : islogin,
                                    real_estate_name : name,
                                }
                            })
                            // 매물이 없으면 create ,
                            if(!isHave){
                                await Real_estates_own.create({
                                    user_email : islogin,
                                    real_estate_id  : real_estate_id!.id,
                                    real_estate_name : name,
                                    price : ((el.possible_amount) * el.order_price) / el.possible_amount, // 🔥
                                    amount : el.possible_amount,
                                    possible_quantity : el.possible_amount,
                                })
                            }
                            // 있으면 update
                            else{
                                await Real_estates_own.update({
                                    // price : sequelize.literal(`price+${(el.possible_amount) * el.order_price}`),
                                    price : sequelize.literal(`((price * amount)+(${el.order_price * el.possible_amount})) / (amount + ${el.possible_amount})`), // 🔥

                                    amount : sequelize.literal(`amount+${ el.possible_amount}`),
                                    possible_quantity : sequelize.literal(`possible_quantity+${el.possible_amount}`),
                                },{
                                    where :{
                                        user_email : islogin,
                                        real_estate_name : name,
                                    }
                                })
                            }
                        }
                    }
                    console.log("최종 amount", restamount);

                    // 해당 매물의 마지막 체결 테이블의 trade_price 를 가져와서
                    // 매물의 현재가로 변경해주기. => 체결의 마지막이 현재가
                    const lastTradePrice : {trade_price : number}[] | null = await Trades.findAll({
                        where : {
                            real_estate_name : name,
                        },
                        
                        attributes :[
                            'trade_price'
                        ],

                        order :[
                            ['createdAt','ASC'],
                        ],
                        
                        limit :1,
                        raw : true,
                    }) as {trade_price : number}[] | null ;
                    
                    console.log(lastTradePrice?.[0]?.trade_price);
                    
                    await Real_estates.update({
                        current_price : lastTradePrice?.[0]?.trade_price,
                    },{
                        where : {
                            real_estate_name : name,
                        }
                    })

                    if( restamount > 0){

                        if(lastTradePrice?.[0]?.trade_price !== undefined && lastTradePrice[0].trade_price < price){

                            // 남은 물량 order 테이블에 추가해주고,
                            await Orders.create({
                                user_email : islogin,
                                real_estate_name : name,
                                order_type : "buy",
                                order_status : "0",
                                order_price : lastTradePrice?.[0]?.trade_price,
                                order_amount : restamount,
                                possible_amount : restamount,
                            })
                        }
                        else{

                            // 남은 물량 order 테이블에 추가해주고,
                            await Orders.create({
                                user_email : islogin,
                                real_estate_name : name,
                                order_type : "buy",
                                order_status : "0",
                                order_price : price,
                                order_amount : restamount,
                                possible_amount : restamount,
                            })
                        }

                        await Users.update({
                            balance : sequelize.literal(`balance-${price*restamount}`),
                            using_balance : sequelize.literal(`using_balance + ${price*restamount}`),
                        },
                        {
                            where :{user_email : islogin},
                        })
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
}

// 오더 메인 호가 
export const orderMain = async(req : Request, res : Response)=>{

    const {name} = req.params;
    console.log(name);
    try {
        const sellList = await Orders.findAll({
            where :{
                real_estate_name : name,
                order_type : "sell",
                order_status : "0",

                possible_amount : {
                    [Op.ne] : 0 // 0 != -> 0이 아닌것
                }
            },

            attributes : [
                'order_price',
                [sequelize.fn('SUM', sequelize.col('order_amount')), 'total_order_amount'],
            ],
            //⭐
            group : ['order_price'],

            order : [
                ['order_price','DESC']
            ],
            raw : true,
        })

        const buyList = await Orders.findAll({
            where :{
                real_estate_name : name,
                order_type : "buy",
                order_status : "0",

                possible_amount : {
                     
                    [Op.ne] : 0 // 0 != -> 0이 아닌것
                }
            },

            attributes : [
                'order_price',
                // order_price 같은 값인 컬럼의 order_amount 값을 더해서 total_order_amount 값으로 반환할건데,
                // 그럼 group 속성으로 묶어주는게 필요함 
                [sequelize.fn('SUM', sequelize.col('order_amount')), 'total_order_amount'],
            ],
            //⭐
            group : ['order_price'],
            
            order : [
                ['order_price','DESC']
            ],
            raw : true,
        })
      
        const ALLlist = {
            sell_list : sellList,
            buy_list : buyList,
        };
        res.json(ALLlist);
    } catch (error) {
        console.log(error);
    }
}

export const orderConclusion = async(req : Request , res : Response) =>{
    try {
        const {name} = req.params;
        console.log(name);

        //  임시 유저
        const islogin = 'test2@naver.com'
        
        // const buyOrder = await Trades.findAll({
        //     where :{
        //         buyer_order_email : islogin,
        //     },

        //     attributes : [
        //         'trade_price',
        //         'trade_amount',
        //         'createdAt',
        //     ],

        //     // order :[
        //     //     ['createdAt','DESC']
        //     // ],

        //     raw : true,
        // })

        const key = 'order_type';
        const value = 'buy';
        const value2 = 'sell';

        const conclusion = await Trades.findAll({
            where : {
                // buyer_order_email : islogin,
                // seller_order_email : islogin,
                [Op.or] : [{buyer_order_email : islogin},{seller_order_email :islogin}]
            },
            
            attributes :[
                'trade_price',
                'trade_amount',
                'createdAt',
                'buyer_order_email',
                'seller_order_email',
            ],
            
            order :[
                ['createdAt','DESC']
            ],
            raw : true,
        })
        
        conclusion.forEach((el) => {
            
            if(el.buyer_order_email == islogin){
                el[key] = value;
            }
            else{
                el[key] = value2;
            }
        });

        res.json(conclusion);
    } catch (error) {
        console.log(error);
    }
}

export const notConclusion = async(req : Request, res : Response) =>{
    try {
        const {name} = req.params;
        console.log(name);
        // 임시 유저
        const islogin = 'test@naver.com'
        const result = await Orders.findAll({
            where : {
                user_email : islogin,
                real_estate_name : name,
                order_status : "0",
                possible_amount : {
                    [Op.ne] : 0
                }
            },
            attributes : [
                'id',
                'order_type',
                'order_price',
                'possible_amount',
                'createdAt',
            ],
            
            order : [
                ['createdAt','DESC'],
            ],
            raw : true,
        })
        // console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

export const cancelOrder = async(req : Request , res : Response) =>{
    try {
        const {name , id} =req.params;
        console.log(name,id);
        // 임시 로그인
        const islogin = 'test@naver.com'
        // 해당 id로 orders 테이블의 order_type 을 가져와서,
        
        const result : {order_type : String, order_price : number, possible_amount : number} | null = await Orders.findOne({
            where :{
                id : id,
            },
            attributes : [
                'order_type',
                'order_price',
                'possible_amount',
            ],
            raw : true,

        }) as {order_type : String, order_price : number, possible_amount : number} | null;

        console.log(result?.order_type);


        // orders 테이블의 해당 id를 order_status 를 2로 변경,  possible 0로 변경
        await Orders.update({
            order_status : "2",
            possible_amount : 0,
        },{
            where : {
                id : id,
            }
        })

        // 구매 취소
        if(result?.order_type == "buy"){
            
            // using_balance에서는 order_price * possible_amount 만큼 빼주고, balance에서는 더해주고,
            await Users.update({
                using_balance : sequelize.literal(`using_balance-${result.order_price * result.possible_amount}`),
                balance : sequelize.literal(`balance+${result.order_price * result.possible_amount}`),
            },{
                where :{
                    user_email : islogin,
                }
            })

            res.send("취소 완료");
        }
        
        // 판매 취소
        else{
            // real_states_own 테이블에서 possible_quantity 에 possible_amount 더해주기

            await Real_estates_own.update({
                possible_quantity : sequelize.literal(`possible_quantity+${result!.possible_amount}`),
            },{
                where : {
                    user_email : islogin,
                }
            })
            res.send("취소 완료");
        }
    } catch (error) {
        console.log(error);
    }
}