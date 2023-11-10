import express, { Express, Request, Response, Router } from "express";
import { Op } from "sequelize";
import { db } from "../../models";
import Notices from "../../models/notices";
import Dividends from "../../models/dividends";
import Subscriptions from "../../models/subscriptions";


// 매물 전체 정보
export const realEstatesList = async (req: Request, res: Response) => {
  try {
    const result = await db.Real_estates.findAll();
    const weeklyDate = await db.Trades.findAll({
      where: {
        createdAt: {
          [Op.lt]: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          [Op.gt]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
      },
    });

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 현재 진행 중인 공모 정보
export const subscriptionPanding = async (req: Request, res: Response) => {
  try {
    const result = await db.Subscriptions.findAll({
      where: { subscription_status: "pading" },
    });

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 총 이용자 수
export const usersList = async (req: Request, res: Response) => {
  try {
    const result = await db.Trades.findAll();

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 최근 거래 내역 (3개)
export const recentTradeList = async (req: Request, res: Response) => {
  try {
    const result = await db.Trades.findAll();

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 매물별 거래량 차트 (일)
export const tradeDayList = async (req: Request, res: Response) => {
  try {
    const result = await db.Trades.findAll();

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};
// 매물별 거래량 차트 (주)
export const tradeWeekList = async (req: Request, res: Response) => {
  try {
    const result = await db.Trades.findAll();

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};
// 매물별 거래량 차트 (월)
export const tradeMonthList = async (req: Request, res: Response) => {
  try {
    const result = await db.Trades.findAll();

    if (result) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// // 청약 진행률
// export const subscriptionsList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Subscriptions.findAll({
//       attributes: [
//         "subscription_name",
//         "subscription_start_date",
//         "subscription_end_date",
//         "subscription_status",
//         [
//           db.sequelize.literal(
//             `(subscription_order_amount / subscription_totalsupply) * 100`
//           ),
//           "participation_rate",
//         ],
//         [
//           db.sequelize.literal(
//             `DATE_PART('day', subscription_start_date - subscription_end_date)`
//           ),
//           "d_day",
//         ],
//       ],
//     });

//     console.log("subscriptionsList : ", result);

//     if (result) res.status(200).json(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 일별 토큰 거래량
// export const tradeList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Trades.findAll({
//       attributes: [
//         "real_estate_name",
//         [
//           db.sequelize.fn("sum", db.sequelize.col("trade_amount")),
//           "sum_amount",
//         ],
//       ],
//       group: "real_estate_name",
//     });

//     console.log("realEstateTradeList : ", result);

//     if (result) res.status(200).json(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 회원 별 토큰 보유 현황 (상위 10명)
// export const realEstateOwnList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Real_estates_own.findAll({
//       attributes: [
//         "user_email",
//         [db.sequelize.fn("sum", db.sequelize.col("amount")), "total_amount"],
//       ],
//       order: ["total_amount", "DESC"],
//       limit: 10,
//     });

//     console.log("realEstateOwnList : ", result);

//     if (result) res.status(200).send(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 블랙리스트 보여주기
// export const blackList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Users.findAll({ where: { blacklist: true } });

//     console.log("blacklist : ", result);

//     if (result) res.status(200).send(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 공지사항 가져오기
// export const noticesList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Notices.findAll();

//     if (result) res.status(200).send(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 매물 통계 정보
// export const realEstateTradeList = async (req: Request, res: Response) => {
//   try {
//     const result = await db.Real_estates_own.findAll({
//       attributes: [
//         "user_email",
//         [db.sequelize.fn("sum", db.sequelize.col("amount")), "total_amount"],
//       ],
//     });

//     console.log("realEstateOwnList : ", result);

//     if (result) res.status(200).send(result);
//     else res.status(404).send("empty");
//   } catch (error) {
//     console.error(error);
//   }
// };

// 재영 어드민 부분
export const realEstateSubmit = async (req: Request , res : Response) =>{
  // console.log("test",req.body);

  const{img,name,address,totalprice,totalsupply,description,
          start_date,end_date,result_date,building_date,trading_start_date,
          order_amount,offering_price,status,floors,purpose,mainpurpose,area,
          allarea,buildarea,floorarea,completion,stock_type,publisher
      } = req.body;
  
  try {

      const result = await Subscriptions.create({
          subscription_img :img,
          subscription_name : name,
          subscription_address: address,
          subscription_totalprice : totalprice,
          subscription_totalsupply : totalsupply,
          subscription_description : description,
          subscription_start_date : start_date,
          subscription_end_date : end_date,
          subscription_result_date : result_date,
          subscription_building_date : building_date,
          subscription_trading_start_date : trading_start_date,
          subscription_order_amount : order_amount,
          subscription_offering_price : offering_price,
          subscription_status : status,
          floors : floors,
          purpose : purpose,
          main_purpose : mainpurpose,
          area : area,
          all_area : allarea,
          build_area : buildarea,
          floor_area : floorarea,
          completion : completion,
          stock_type : stock_type,
          publisher : publisher,
      })
      res.sendStatus(201);

  } catch (error) {
      console.log(error);
      res.sendStatus(400);
  }
  
  // subscription_img varchar // 매물 이미지
  // subscription_name varchar // 매물 이름
  // subscription_address varchar // 매물 주소
  // subscription_totalprice bigint // 청약 총 공모금액
  // subscription_totalsupply number // 청약 총 발행량
  // subscription_description text // 청약 간단 설명
  // subscription_start_date timestamp // 청약 시작날짜
  // subscription_end_date timestamp // 청약 종료날짜
  // subscription_result_date timestamp //  청약 결과 날짜
  // subscription_building_date timestamp // 청약 입고 날짜
  // subscription_trading_start_date timestamp // 청약 거래 날짜
  // subscription_order_amount number // 청약 주문 총 양
  // subscription_offering_price bigint // 공모 금액(5천원)
  // subscription_status varchar // 공모 상태 (예정, 진행, 성공, 실패)
  // floors varchar // 층수
  // purpose varchar // 용도
  // mainpurpose varchar // 주용도
  // area float // 면적
  // allarea float // 연면적
  // buildarea float // 건폐율
  // floorarea float // 용적률
  // completion timestamp // 준공일
  // stock_type varchar // 증권타입
  // publisher varchar // 발행인
}

export const noticeSubmit = async (req : Request , res : Response)=>{
  // console.log(req.body);
  const {category, title, content,real_estate_name} = req.body;
  const writer : string = "admin";
  // const htmlText = req.body.content.replace(/\n/g, '<br>');
  try {
      const result = await Notices.create({
          category : category,
          notice_title : title,
          notice_content : content,
          notice_writer : writer,
          real_estate_name : real_estate_name,
      })
      console.log(result);

      res.sendStatus(201);
  } catch (error) {
      console.log(error);
      res.sendStatus(400);
  }
}

export const dividendSubmit = async (req : Request, res : Response)=>{
  console.log(req.body);
  const {real_estate_name , dividend_price , basedate , paymentdate} = req.body;
  try {
      const result  = await Dividends.create({
          real_estate_name : real_estate_name,
          dividend_price : dividend_price,
          dividend_basedate : basedate,
          dividend_paymentdate : paymentdate,
      })
      res.sendStatus(201);
  } catch (error) {
      console.log(error);
      res.sendStatus(400);
  }
}