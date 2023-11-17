import express, { Express, Request, Response, Router } from "express";
import { Op } from "sequelize";
import { db } from "../../models";
import Notices from "../../models/notices";
import Dividends from "../../models/dividends";
import Subscriptions from "../../models/subscriptions";

// 정현이형 어드민 부분
type TradeDate = {
  real_estate_name: string;
  trade_amount: string;
  trade_date: string;
};

interface RealEstateAmount {
  [key: string]: {
    ten_date: string[];
    ten_amount: number[];
  };
}

function getDayInfo(info: string) {
  const today = new Date();
  const yearStart = new Date(today.getFullYear(), 0, 1).getTime();

  if (info === "week") {
    const days = Math.floor(
      (today.getTime() - yearStart) / (24 * 60 * 60 * 1000) + 1
    );

    const weekNum = Math.ceil(days / 7);

    return weekNum;
  }
  if (info === "month") {
    const month = today.setMonth(today.getMonth() - 10);
    return month;
  }
}

function setRealEstateAmount(result: TradeDate[], info: string) {
  const today = new Date();

  let ten_date: string[] = [];
  let all_result: RealEstateAmount[] = [];

  if (info === "day") {
    for (let i = 0; i < 10; i++) {
      const days = new Date(today.setDate(today.getDate() - 1));

      let year = days.getFullYear();
      let month = days.getMonth() + 1;
      let day = days.getDate();
      const create_day = day < 10 ? `0${day}` : `${day}`;
      const create_month = month < 10 ? `0${month}` : `${month}`;
      ten_date[i] = `${year}-${create_month}-${create_day}`;
    }
  } else if (info === "week") {
    let find_week = today.getDay();
    let find_monday;

    if (find_week === 1) find_monday = 0;
    else if (find_week === 0) find_monday = -6;
    else find_monday = 1 - find_week;

    today.setDate(today.getDate() + find_monday);
    for (let i = 0; i < 10; i++) {
      // if (i === 0) today.setDate(today.getDate());
      // else today.setDate(today.getDate() - 7);
      today.setDate(today.getDate() - 7);
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      const create_day = day < 10 ? `0${day}` : `${day}`;
      const create_month = month < 10 ? `0${month}` : `${month}`;
      ten_date[i] = `${year}-${create_month}-${create_day}`;
    }
  } else {
    const today = new Date();

    today.setMonth(today.getMonth() + 1);

    for (let i = 0; i < 10; i++) {
      today.setMonth(today.getMonth() - 1);
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      const create_month = month < 10 ? `0${month}` : `${month}`;
      ten_date[i] = `${year}-${create_month}`;
    }
  }

  const real_estate_names = result.map((item) => item.real_estate_name);
  const new_real_estate_names = [...new Set(real_estate_names)];

  new_real_estate_names.forEach((real) => {
    const find_real_estate_names = result.filter(
      (item) => item.real_estate_name == real
    );

    let ten_amount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const insert_ten_days_amount = find_real_estate_names.map((item) => {
      const getIndexOf = ten_date.indexOf(item.trade_date);
      if (getIndexOf < 0) return;
      else ten_amount[getIndexOf] = parseInt(item.trade_amount);
    });

    let real_estate_object: RealEstateAmount = {
      [real]: {
        ten_date: ten_date,
        ten_amount: ten_amount,
      },
    };
    all_result.push(real_estate_object);
  });

  return all_result;
}

// 매물 전체 정보
export const realEstatesList = async (req: Request, res: Response) => {
  try {
    type Subscription = {
      subscription_img: string;
      subscription_name: string;
      subscription_description: string;
      current_price: number;
      total_amount?: number;
    };

    const result = await db.Subscriptions.findAll({
      attributes: [
        "subscription_img",
        "subscription_name",
        "subscription_description",
        [db.sequelize.col("Real_estates.current_price"), "current_price"],
      ],
      include: [
        {
          model: db.Real_estates,
          attributes: [],
        },
      ],
      where: { subscription_status: "success" },
      raw: true,
    });

    const day_earlier = new Date();
    const week_ago = new Date();

    week_ago.setDate(day_earlier.getDate() - 7);

    const weeklyDate = await db.Trades.findAll({
      attributes: [
        "real_estate_name",
        [
          db.sequelize.fn("sum", db.sequelize.col("trade_amount")),
          "total_amount",
        ],
      ],
      where: {
        createdAt: {
          [Op.between]: [day_earlier, week_ago],
        },
      },
      group: "real_estate_name",
      raw: true,
    });

    const resultUnknown = result as [] as Subscription[];

    resultUnknown.forEach((sub) => {
      const matchWeeklyData = weeklyDate.find(
        (wd) => wd.real_estate_name === sub.subscription_name
      );
      if (matchWeeklyData) sub.total_amount = matchWeeklyData.total_amount;
      else sub.total_amount = 0;
    });

    if (result?.length) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 현재 진행 중인 공모 정보
export const subscriptionPending = async (req: Request, res: Response) => {
  try {
    const result = await db.Subscriptions.findAll({
      attributes: [
        "subscription_name",
        "subscription_totalprice",
        [
          db.sequelize.literal(
            `"subscription_offering_price" * "subscription_order_amount"`
          ),
          "subscription_order_totalprice",
        ],
      ],
      where: { subscription_status: "pending" },
    });

    if (result?.length) res.status(200).json(result);
    else res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 총 이용자 수
export const usersList = async (req: Request, res: Response) => {
  try {
    const result = await db.Users.findAll();

    if (result?.length) return res.status(200).json(result.length);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 최근 거래 내역 (3개)
export const recentTradeList = async (req: Request, res: Response) => {
  try {
    type RecentTrade = {
      subscription_img: string;
      real_estate_name: string;
      trade_price: number;
      created_at: Date;
    };

    type GetSubscriptionImg = {
      subscription_img: string;
      subscription_name: string;
    };

    const getSubscriptionImgs = (await db.Subscriptions.findAll({
      attributes: ["subscription_img", "subscription_name"],
      raw: true,
    })) as [] as GetSubscriptionImg[];

    const result = (await db.Trades.findAll({
      attributes: ["real_estate_name", "trade_price", "createdAt"],
      order: [["id", "desc"]],
      limit: 3,
      raw: true,
    })) as [] as RecentTrade[];

    // const resultRecent = result as [] as RecentTrade[];

    result.forEach((rs) => {
      const findimg = getSubscriptionImgs.find(
        (sub) => sub.subscription_name === rs.real_estate_name
      );
      if (findimg) rs.subscription_img = findimg.subscription_img;
    });

    if (result?.length) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 블랙리스트 보여주기
export const blackList = async (req: Request, res: Response) => {
  try {
    const result = await db.Users.findAll({
      attributes: ["user_profile_img", "user_email"],
      where: { blacklist: true },
      raw: true,
    });

    if (result?.length) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 매물별 거래량 차트 (일)
export const tradeDayList = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const ten_days_ago = new Date(today);

    ten_days_ago.setDate(ten_days_ago.getDate() - 10);

    const result = (await db.Trades.findAll({
      attributes: [
        "real_estate_name",
        [
          db.sequelize.fn("sum", db.sequelize.col("trade_amount")),
          "trade_amount",
        ],
        [db.sequelize.fn("DATE", db.sequelize.col("createdAt")), "trade_date"],
      ],
      group: [
        "real_estate_name",
        db.sequelize.fn("DATE", db.sequelize.col("createdAt")),
      ],
      where: {
        createdAt: {
          [Op.between]: [ten_days_ago, today],
        },
      },
      raw: true,
    })) as [] as TradeDate[];

    const all_result = await setRealEstateAmount(result, "day");

    if (result?.length) return res.status(200).json(all_result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};
// 매물별 거래량 차트 (주)
export const tradeWeekList = async (req: Request, res: Response) => {
  try {
    const tenWeeksAgo = getDayInfo("week");

    const result = (await db.Trades.findAll({
      attributes: [
        "real_estate_name",
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.fn(
              "date_trunc",
              "week",
              db.sequelize.col("createdAt")
            ),
            "YYYY-MM-DD"
          ),
          "trade_date",
        ],
        [
          db.sequelize.fn("sum", db.sequelize.col("trade_amount")),
          "trade_amount",
        ],
      ],
      group: [
        "real_estate_name",
        db.sequelize.fn(
          "to_char",
          db.sequelize.fn("date_trunc", "week", db.sequelize.col("createdAt")),
          "YYYY-MM-DD"
        ),
      ],
      order: [[db.sequelize.col("trade_date"), "DESC"]],
      where: {
        createdAt: {
          [Op.gte]: tenWeeksAgo,
        },
      },
      raw: true,
    })) as [] as TradeDate[];

    const all_result = await setRealEstateAmount(result, "week");

    if (result) return res.status(200).json(all_result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};
// 매물별 거래량 차트 (월)
export const tradeMonthList = async (req: Request, res: Response) => {
  try {
    const tenMonthsAgo = getDayInfo("month");

    const result = (await db.Trades.findAll({
      attributes: [
        "real_estate_name",
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.fn(
              "date_trunc",
              "month",
              db.sequelize.col("createdAt")
            ),
            "YYYY-MM"
          ),
          "trade_month",
        ],
        [
          db.sequelize.fn("sum", db.sequelize.col("trade_amount")),
          "trade_amount",
        ],
      ],
      group: [
        "real_estate_name",
        db.sequelize.fn(
          "to_char",
          db.sequelize.fn("date_trunc", "month", db.sequelize.col("createdAt")),
          "YYYY-MM"
        ),
      ],
      order: [[db.sequelize.col("trade_month"), "DESC"]],
      where: {
        createdAt: {
          [Op.gte]: tenMonthsAgo,
        },
      },
      raw: true,
    })) as [] as TradeDate[];

    const all_result = await setRealEstateAmount(result, "month");

    if (result?.length) return res.status(200).json(all_result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 재영 어드민 부분
const imgPathArr = new Array(5).fill("");
export const realEstateSubmit = async (req: Request , res : Response) =>{
  console.log("req🚀🚀" , req)
  console.log("realEstateSubmit 들어오니?");
  // console.log("test",req.body);
  // console.log(req.files);
  
  // ⭐ ts에서 length를 사용하려면 아래 구문이 필요함 있는지 && 배열형태인지 ⭐
  if (req.files && Array.isArray(req.files)) {
    for (let index = 0; index < req.files.length; index++) {
      imgPathArr[index] = req.files[index].path;
    }
  }
  console.log("++++++++",req.body);

  const{ name,address,totalprice,totalsupply,description,
          start_date,end_date,result_date,building_date,trading_start_date,
          order_amount,offering_price,status,floors,purpose,mainpurpose,area,
          all_area,build_area,floor_area,completion,stock_type,publisher
      } = req.body;

  try {
      const result = await Subscriptions.create({
          subscription_img : imgPathArr[0],
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
          all_area : all_area,
          build_area : build_area,
          floor_area : floor_area,
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
};

export const noticeSubmit = async (req: Request, res: Response) => {
  // console.log(req.body);
  const { category, title, content, real_estate_name } = req.body;
  const writer: string = "admin";
  // const htmlText = req.body.content.replace(/\n/g, '<br>');
  try {
    const result = await Notices.create({
      category: category,
      notice_title: title,
      notice_content: content,
      notice_writer: writer,
      real_estate_name: real_estate_name,
    });
    console.log(result);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const dividendSubmit = async (req: Request, res: Response) => {
  console.log(req.body);
  const {real_estate_name , dividend_price , basedate , paymentdate} = req.body;
  const month = paymentdate.slice(5,7);
  try {
      const result  = await Dividends.create({
          real_estate_name : real_estate_name,
          dividend_price : dividend_price,
          dividend_basedate : basedate,
          dividend_paymentdate : paymentdate,
      })

      await Notices.create({
        category : "공시",
        notice_title : `${month}월 배당금 지급 안내`,
        notice_content : `안녕하세요. 카사입니다. \n 아래와 같이 ${real_estate_name} ${month} 월 배당금 지급 관련하여 안내해 드립니다. \n 1. 건물명 : ${real_estate_name} \n 2. 예상 배당금 : ${dividend_price}원 \n 3. 배당기준일 : ${basedate} \n 4. 지급예정일 : ${paymentdate} \n 5. 배당종류 : 현금배당`,
        notice_writer : "admin",
        real_estate_name : real_estate_name,
      })
      res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
