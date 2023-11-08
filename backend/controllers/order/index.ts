import {Request , Response} from "express";
import Orders from "../../models/orders";
import Real_estates_own from "../../models/real_estates_own"; 
import Real_estates from "../../models/real_estates";
import Users from "../../models/users";
import { sequelize } from "../../models";

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
            where :{ user_email : user_email , real_estates_name : name},
            attributes :[
                "possible_quantity",
            ],
            raw : true,
        })
        console.log(holdings[0].possible_quantity);
        // 물량이 아예 없을 때 반환
        if(!holdings){
            res.send("보유 물량 없음");
        }
        // 물량은 있지만 주문수량 이상으로 있는지 확인
        else {
            if(holdings[0].possible_quantity >= amount){

                const result = await Orders.create({
                    user_email : user_email,
                    real_estates_name : name,
                    order_type : "sell",
                    order_status : "1",
                    order_price : price,
                    order_amount : amount,
                    possible_amount : amount, 
                })

                await Real_estates_own.update({
                    possible_quantity : sequelize.literal(`possible_quantity-${amount}`)

                },{
                    where :{ user_email : user_email , real_estates_name : name},
                })

                res.sendStatus(201);
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

    // 유저 임시
    const user_email = "test2@naver.com"

    try {
        // 구매했을 때 유저의 잔고가 주문금액 보다 많은지 확인
        // 먼저, 해당 매물의 현재가 가져오기
        
        const currentPrice : {current_price : number} | null = await Real_estates.findOne({
            where :{
                real_estates_name : name,
            },
            attributes :[
                "current_price",
            ],
            raw : true,
        }) as {current_price : number} | null;
        console.log("매물현재가 : ", currentPrice?.current_price );

       
        // // 유저테이블의 balance 가져오기
        // balance 변수의 타입이 객체인데 안의 값이 넘버 or null 임을 정의
        const balance : {balance : number} | null = await Users.findOne({
            where :{
                user_eamil : user_email,
            },
            attributes :[
                "balance",
            ],
            raw : true,
        }) as {balance : number} | null; // as 키워드를 통해 반환값의 타입을 강제로 지정.

        console.log("잔고 : " , balance?.balance);
        // ! 의 의미는 이 변수는 항상 값을 가질 것으로 null 또는 undefined 를 걱정하지 말라는 뜻.
        if (balance!.balance > currentPrice!.current_price ){

        }
        
    } catch (error) {
        console.log(error);
    }   
    res.send();
}