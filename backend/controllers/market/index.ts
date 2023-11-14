import {Request, Response} from "express";
import Subscriptions from "../../models/subscriptions"
import Real_estates from "../../models/real_estates";
import { sequelize } from "../../models";
import Dividends from "../../models/dividends";
import { db } from "../../models";

export const marketSubscription = async (req :Request, res : Response) =>{
    console.log("marketSubscription / get 요청 들어옴?");
    
    try {
        const result = await Subscriptions.findAll({
            where : {subscription_status : "start"},
            limit : 1,
            order : [['createdAt','DESC']],
            attributes : [
                "subscription_img",
                "subscription_totalprice",
                "subscription_description",
                "subscription_name",
                "subscription_order_amount",

                // [sequelize.literal('subscription_end_date'-'subscription_start_date'), 'duration']
                [sequelize.literal(`DATE_PART('day', (subscription_end_date - subscription_start_date))`),'subscription_restdate']
        
        ]
        });
        
        if(result.length>0){
            res.json(result);
        }
        else{
            const result = await Subscriptions.findAll({
                where : {subscription_status : "pending"},
                limit : 1,
                order : [['createdAt','DESC']],
                attributes : [
                        "subscription_img",
                        "subscription_totalprice",
                        "subscription_description",
                        "subscription_name",
                        "subscription_order_amount",
    
                        // [sequelize.literal('subscription_end_date'-'subscription_start_date'), 'duration']
                        [sequelize.literal(`DATE_PART('day', (subscription_end_date - subscription_start_date))`),'subscription_restdate']
                
                ]
            })

            if(result.length>0){

                res.json(result)
            }
            else {
                res.send("예정,진행중인 청약없음");
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const marketTradelist = async(req : Request, res: Response)=>{
    console.log("marketTradelist / get 요청 들어옴?");

    try {
        // sequelize 에서 컬럼간의 연산을 수행할 때는 주로 sequelize.literal를 사용
        const result = await Real_estates.findAll({
            attributes : [ // (현재값(value) / 시작가 * 100) - 100
                "start_price",
                "current_price",

                // ⭐⭐ 값들이 int 로 선언되어 소수점 계산이 안되서 계산식 순서를 바꿈
                [sequelize.literal('((current_price*100)/start_price)-100'),'fluctuation_rate'],
                [sequelize.literal("((current_price*100)/value)-100"),"rating"],
            ],
            include : [
                {
                    model : Subscriptions,
                    attributes : ["subscription_img","subscription_name","subscription_description"]
                }
            ],
            raw : true,
                
        });
        
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

export const marketDetail = async (req : Request , res : Response) =>{
    console.log("marketDetail get요청 들어옴?");
    const {name} = req.params;
    console.log(name);
    try {

        const result = await Real_estates.findAll({
            where : {real_estate_name : name},
    
            attributes : [
                "current_price",
                // "start_price",
                "value",
                
                [sequelize.literal('((current_price*100)/start_price)-100'),'fluctuation_rate'],
                [sequelize.literal("((current_price*100)/value)-100"),"rating"]
            ],
            include : [
                {
                    model : Subscriptions,
                    attributes : ["subscription_img","subscription_description","subscription_name",
                "subscription_address",]
                }
            ],
            raw : true,
        })
        const result2 = await Dividends.findAll({
            where : {real_estate_name : name},
            attributes : [
                "dividend_price",
                "dividend_basedate",
                "dividend_paymentdate",
            ],
            raw : true,
        })
        const mergeobj = {...result[0],...result2[0]}
        res.json(mergeobj);
        
    } catch (error) {
        console.log(error);
    }
}