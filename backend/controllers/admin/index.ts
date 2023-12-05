import express, { Express, Request, Response, Router } from "express";
import { Model, Op, QueryTypes } from "sequelize";
import { db } from "../../models";
import Notices from "../../models/notices";
import Dividends from "../../models/dividends";
import Subscriptions from "../../models/subscriptions";
import Contract_address from "../../models/contract_address";
import Real_estates_own from "../../models/real_estates_own";
import Subscriptions_own from "../../models/subscriptions_own";
import { group } from "console";
import Real_estates from "../../models/real_estates";
import Users from "../../models/users";
import { myEmitter } from "../../middleware/eventEmitter";

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

interface UserCount {
  date: string;
  userCount: number;
}

interface TotalAmount {
  date: string;
  total_price: number;
}

interface MonthlyIncome {
  monthly_income: number;
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
    // today.setMonth(today.getMonth() + 1);
    for (let i = 0; i < 10; i++) {
      today.setMonth(today.getMonth() - 1);
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      const create_month = month < 10 ? `0${month}` : `${month}`;
      ten_date[i] = `${year}-${create_month}`;
    }
  }

  let real_estate_names = result.map((item) => item.real_estate_name);
  let new_real_estate_names = [...new Set(real_estate_names)];

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

    // real_estate_names = [];
    // new_real_estate_names = [];
    // today = new Date();
  });

  return all_result;
}

const ten_days = getTenDate();
// 10일치 정보를 받아오는데
function getTenDate() {
  const dates = [];
  const today = new Date();

  const yesterday = today.setDate(today.getDate() - 1);

  const ten_days_ago = new Date(yesterday);

  ten_days_ago.setDate(ten_days_ago.getDate() - 10);

  const start = new Date(ten_days_ago);
  const end = new Date(yesterday);

  for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
    dates.push(new Date(day));
  }

  return dates;
}

// 매물 전체 정보
export const realEstatesList = async (req: Request, res: Response) => {
  try {
    type Subscription = {
      subscription_img_1: string;
      subscription_name: string;
      subscription_description: string;
      current_price: number;
      total_amount?: number;
    };

    const result = await db.Subscriptions.findAll({
      attributes: [
        "subscription_img_1",
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
          [Op.between]: [week_ago, day_earlier],
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
      subscription_img_1: string;
      real_estate_name: string;
      trade_price: number;
      created_at: Date;
    };

    type GetSubscriptionImg = {
      subscription_img_1: string;
      subscription_name: string;
    };

    const getSubscriptionImgs = (await db.Subscriptions.findAll({
      attributes: ["subscription_img_1", "subscription_name"],
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
      if (findimg) rs.subscription_img_1 = findimg.subscription_img_1;
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

// 블랙리스트 등록
export const blackListAdd = async (req: Request, res: Response) => {
  console.log("req.body", req.body);

  try {
    const { user_email } = req.body;

    const result = await db.Users.update(
      { blacklist: true },
      { where: { user_email: user_email } }
    );

    if (result) return res.status(200).send(true);
    else return false;
  } catch (error) {
    console.error(error);
  }
};

// 블랙리스트 해제
export const blackListDel = async (req: Request, res: Response) => {
  try {
    const { user_email } = req.body;

    const result = await db.Users.update(
      { blacklist: false },
      { where: { user_email: user_email } }
    );

    if (result) return res.status(200).send(true);
    else return false;
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
          db.sequelize.fn("date_trunc", "month", db.sequelize.col("createdAt")),
          "YYYY-MM"
        ),
      ],
      order: [[db.sequelize.col("trade_date"), "DESC"]],
      where: {
        createdAt: {
          [Op.gte]: tenMonthsAgo,
        },
      },
      raw: true,
    })) as [] as TradeDate[];

    // // console.log(result);

    const all_result = await setRealEstateAmount(result, "month");

    if (result?.length) return res.status(200).json(all_result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 매물 관리 페이지 (매물 관련 전체 데이터 넘겨주기)
export const realEstateManagement = async (req: Request, res: Response) => {
  try {
    const result = await db.Subscriptions.findAll({
      attributes: [
        "id",
        "subscription_img_1",
        "subscription_name",
        "subscription_description",
        "subscription_status",
        [
          db.sequelize.literal(
            "((subscription_order_amount * 100 / subscription_totalsupply))"
          ),
          "achievement_rate",
        ],
        "subscription_totalprice",
        [
          db.sequelize.literal(
            "subscription_offering_price * subscription_order_amount"
          ),
          "contest_totalprice",
        ],
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.col("subscription_start_date"),
            "YYYY-MM-DD"
          ),
          "subscription_start_date",
        ],
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.col("subscription_end_date"),
            "YYYY-MM-DD"
          ),
          "subscription_end_date",
        ],
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.col("subscription_result_date"),
            "YYYY-MM-DD"
          ),
          "subscription_result_date",
        ],
      ],
      order :[
        ['id','ASC']
      ],
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 매물 관리 상세 페이지
export const realEstateDetail = async (req: Request, res: Response) => {
  try {
    const real_estate_id = req.params.id as string;

    const result = await db.Subscriptions.findOne({
      attributes: [
        "id",
        "subscription_img_1",
        "subscription_img_2",
        "subscription_img_3",
        "subscription_img_4",
        "subscription_img_5",
        "subscription_name",
        "subscription_address",
        "subscription_totalprice",
        "subscription_totalsupply",
        "subscription_description",
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.col("subscription_start_date"),
            "YYYY-MM-DD"
          ),
          "subscription_start_date",
        ],
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.col("subscription_end_date"),
            "YYYY-MM-DD"
          ),
          "subscription_end_date",
        ],
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.col("subscription_result_date"),
            "YYYY-MM-DD"
          ),
          "subscription_result_date",
        ],
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.col("subscription_building_date"),
            "YYYY-MM-DD"
          ),
          "subscription_building_date",
        ],
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.col("subscription_trading_start_date"),
            "YYYY-MM-DD"
          ),
          "subscription_trading_start_date",
        ],
        "subscription_order_amount",
        "subscription_offering_price",
        "subscription_status",
        "floors",
        "purpose",
        "main_purpose",
        "area",
        "all_area",
        "build_area",
        "floor_area",
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.col("completion"),
            "YYYY-MM-DD"
          ),
          "completion",
        ],
        "stock_type",
        "publisher",
      ],
      where: { id: real_estate_id },
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 토큰 내/외부 전송
export const transferInOutList = async (req: Request, res: Response) => {
  try {
    // const query = `
    // select
    //   CASE
    //     WHEN u.wallet = tr.tx_from THEN tr.tx_from
    //     WHEN u.wallet = tr.tx_to THEN tr.tx_to
    //   END as tx_wallet, tr.tx_symbol, tr.transmission, count(tr.transmission) as cnt
    // from  tx_receipt tr
    //   join users u ON u.wallet = tr.tx_from OR u.wallet = tr.tx_to
    //   group by tx_wallet, tr.tx_symbol, tr.transmission;`;

    // const result = await db.sequelize.query(query, {
    //   type: QueryTypes.SELECT,
    // });
    const result = await db.Tx_receipt.findAll({
      attributes: [
        "tx_from",
        "tx_to",
        "tx_value",
        "tx_symbol",
        "block_num",
        "transmission",
        "createdAt",
      ],
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 컨트랙트 주소 가져오기
export const contractAddressList = async (req: Request, res: Response) => {
  try {
    const result = await db.Contract_address.findAll({
      attributes: ["id", "address", "real_estate_name", "symbol"],
      where: { ca_type: "token" },
      raw: true,
    });

    if (result) return res.status(200).send(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 10일치 회원 가입 정보
export const tenDateJoinList = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);
    const ten_days_ago = new Date(yesterday);
    ten_days_ago.setDate(ten_days_ago.getDate() - 10);

    const result = (await db.Users.findAll({
      attributes: [
        [
          db.sequelize.fn(
            "to_char",
            db.sequelize.fn("date", db.sequelize.col("createdAt")),
            "YYYY-MM-DD"
          ),
          "date",
        ],
        [db.sequelize.fn("count", db.sequelize.col("id")), "userCount"],
      ],
      where: {
        createdAt: {
          [Op.between]: [ten_days_ago, yesterday],
        },
      },
      raw: true,
      group: ["date"],
    })) as [] as UserCount[];

    const userCounts = new Map(
      result.map((item) => [item.date, item.userCount])
    );

    const ten_day_user_count = ten_days.map(
      (date) => date.toISOString().split("T")[0]
    );

    const _userCounts = ten_day_user_count.map((date) => {
      return userCounts.get(date) || 0;
    });

    if (_userCounts) return res.status(200).json(_userCounts);
    else return res.status(404).send(_userCounts);
  } catch (error) {
    console.error(error);
  }
};

// 10일치 거래 대금 정보
export const tenDateTransactionPrice = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);
    const ten_days_ago = new Date(yesterday);
    ten_days_ago.setDate(ten_days_ago.getDate() - 10);

    const result = (await db.Trades.findAll({
      attributes: [
        [db.sequelize.fn("date", db.sequelize.col("createdAt")), "date"],
        [
          db.sequelize.fn(
            "sum",
            db.sequelize.literal("trade_price * trade_amount")
          ),
          "total_price",
        ],
      ],
      where: {
        createdAt: {
          [Op.between]: [ten_days_ago, yesterday],
        },
      },
      group: [db.sequelize.fn("date", db.sequelize.col("createdAt"))],
      order: [[db.sequelize.fn("date", db.sequelize.col("createdAt")), "DESC"]],
      raw: true,
    })) as [] as TotalAmount[];

    const total_amount = new Map(
      result.map((item) => [item.date, item.total_price])
    );

    const ten_day_total_amount = ten_days.map(
      (date) => date.toISOString().split("T")[0]
    );

    const _total_amount = ten_day_total_amount.map((date) => {
      return total_amount.get(date) || 0;
    });

    if (_total_amount) return res.status(200).json(_total_amount);
    else return res.status(404).send(_total_amount);
  } catch (error) {
    console.error(error);
  }
};

// 월 예상 수익
export const monthlyIncome = async (req: Request, res: Response) => {
  try {
    const today = new Date();

    const first_year_month = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 1)
    );

    const last_year_month = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 2, 0)
    );

    const result = (await db.Trades.findAll({
      attributes: [
        [
          db.sequelize.literal(
            "ROUND(sum((trade_price * trade_amount)) * 0.0022, 2)"
          ),
          "monthly_income",
        ],
      ],
      where: {
        createdAt: {
          [Op.between]: [first_year_month, last_year_month],
        },
      },
      group: [
        db.sequelize.fn("date_trunc", "month", db.sequelize.col("createdAt")),
      ],
      raw: true,
    })) as [] as MonthlyIncome[];

    const monthly_incomes = result.map(
      (item: MonthlyIncome) => item.monthly_income
    );

    if (result) return res.status(200).json(monthly_incomes[0]);
    else return res.status(404).send([0]);
  } catch (error) {
    console.error(error);
  }
};

// 등록된 매물 이름
export const realEstateNameList = async (req: Request, res: Response) => {
  try {
    const result = await db.Subscriptions.findAll({
      attributes: ["subscription_name"],
      where: {
        subscription_status: "success",
      },
      raw: true,
    });

    const names = result.map((item) => item.subscription_name);

    if (names) return res.status(200).json(names);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 재영 어드민 부분
const imgPathArr = new Array(5).fill("");
export const realEstateSubmit = async (req: Request, res: Response) => {
  console.log("realEstateSubmit 들어오니?");
  // // console.log("test",req.body);
  // // console.log(req.files);

  // ⭐ ts에서 length를 사용하려면 아래 구문이 필요함 있는지 && 배열형태인지 ⭐
  if (req.files && Array.isArray(req.files)) {
    for (let index = 0; index < req.files.length; index++) {
      imgPathArr[index] = req.files[index].path;
    }
  }
  // console.log("++++++++",req.body);

  const {
    name,
    address,
    symbol,
    totalprice,
    totalsupply,
    description,
    start_date,
    end_date,
    result_date,
    building_date,
    trading_start_date,
    order_amount,
    offering_price,
    status,
    floors,
    purpose,
    mainpurpose,
    area,
    all_area,
    build_area,
    floor_area,
    completion,
    stock_type,
    publisher,
  } = req.body;

  try {
    const id = await Subscriptions.count();
    
    const result = await Subscriptions.create({
      id:id+1,
      subscription_img_1: imgPathArr[0],
      subscription_img_2: imgPathArr[1],
      subscription_img_3: imgPathArr[2],
      subscription_img_4: imgPathArr[3],
      subscription_img_5: imgPathArr[4],
      subscription_name: name,
      subscription_symbol: symbol,
      subscription_address: address,
      subscription_totalprice: totalprice,
      subscription_totalsupply: totalsupply,
      subscription_description: description,
      subscription_start_date: start_date,
      subscription_end_date: end_date,
      subscription_result_date: result_date,
      subscription_building_date: building_date,
      subscription_trading_start_date: trading_start_date,
      subscription_order_amount: order_amount,
      subscription_offering_price: offering_price,
      subscription_status: status,
      floors: floors,
      purpose: purpose,
      main_purpose: mainpurpose,
      area: area,
      all_area: all_area,
      build_area: build_area,
      floor_area: floor_area,
      completion: completion,
      stock_type: stock_type,
      publisher: publisher,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }

  // subscription_img_1 varchar // 매물 이미지
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
  // // console.log(req.body);
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
    // console.log(result);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};


// 게시글(공지/공시) 받아오기 by ✅DJ.테스트
export const noticesList = async (req : Request , res : Response) => {
  try {
    const noticeList = await Notices.findAll({
      order :[
        ['id','ASC']
      ]
    })
    res.status(200).json(noticeList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
}

export const dividendSubmit = async (req: Request, res: Response) => {
  // console.log("dividendSubmit+_+_+_+_",req.body);
  const { real_estate_name, dividend_price, basedate, paymentdate } = req.body;
  const month = paymentdate.slice(5, 7);
  try {
    const result = await Dividends.create({
      real_estate_name: real_estate_name,
      dividend_price: dividend_price,
      dividend_basedate: basedate,
      dividend_paymentdate: paymentdate,
      dividend_status : "예정",
    });

    await Notices.create({
      category: "공시",
      notice_title: `${month}월 배당금 지급 안내`,
      notice_content: `안녕하세요. bounceSto입니다.. \n 아래와 같이 ${real_estate_name} ${month} 월 배당금 지급 관련하여 안내해 드립니다. \n 1. 건물명 : ${real_estate_name} \n 2. 예상 배당금 : ${dividend_price}원 \n 3. 배당기준일 : ${basedate} \n 4. 지급예정일 : ${paymentdate} \n 5. 배당종류 : 현금배당`,
      notice_writer: "admin",
      real_estate_name: real_estate_name,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const subscription = async (req: Request, res: Response) => {
  try {
    const subscription = await Subscriptions.findAll();
    res.status(200).json(subscription);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const subscriptionDetail = async (req: Request, res: Response) => {
  try {
    const subscriptionDetail = await Subscriptions.findByPk(req.params.id);
    // console.log("subscriptionDetail" , subscriptionDetail)
    res.status(200).json(subscriptionDetail);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const caRegister = async (req: Request, res: Response) => {
  // console.log(req.body);
  console.log("caRegister 들어ㅗㅇㅁ>");
  const { address, real_estate_name, symbol } = req.body;
  try {
    await Contract_address.create({
      address: address,
      real_estate_name: real_estate_name,
      symbol: symbol,
      ca_type: "token",
    });
    myEmitter.emit("contractsChecx`kEvent");

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
    // console.log("caRegister에서 오류",error);
  }
};

// 청약자 리스트
export const subscriptionList = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id+_+_+_+_+",id);
  try {
    const result = await Subscriptions_own.findAll({
      where: {
        subscription_id: id,
      },
      attributes: ["wallet", "amount"],
      order: [["id", "ASC"]],

      include: [
        {
          model: Subscriptions,
          attributes: [
            "subscription_name",
            "subscription_totalsupply",
            "subscription_symbol",
            "subscription_building_date",
          ],
        },
      ],
      raw: true,
    });
    console.log("result+_+_",result);

    const estateInfo = result.slice(0, 1).map((el: any) => ({
      "Subscription.subscription_name": el["Subscription.subscription_name"],
      "Subscription.subscription_totalsupply":
        el["Subscription.subscription_totalsupply"],
      "Subscription.subscription_symbol":
        el["Subscription.subscription_symbol"],
      "Subscription.subscription_building_date":
        el["Subscription.subscription_building_date"],
    }));

    const wallet_list = result.map((el: any) => el.wallet);
    const amount_list = result.map((el: any) => el.amount);

    console.log(wallet_list);
    console.log(amount_list);

    const email_list: any = [];

    for (const element of wallet_list) {
      const emails = await Users.findOne({
        where: {
          wallet: element,
        },
        attributes: ["user_email"],
        raw: true,
      });
      email_list.push(emails?.user_email);
    }

    console.log("---------", email_list);
    // const email_list = emails.map(el=>el.user_email);

    const data = await Subscriptions.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "subscription_name",
        "subscription_offering_price",
        "subscription_symbol",
      ],
      raw: true,
    });
    // console.log(data?.id);
    // console.log(data?.subscription_name);
    // console.log(data?.subscription_symbol);
    // console.log(data?.subscription_offering_price);

    // real_estates 생성
    await Real_estates.create({
      subscription_id: data!.id,
      real_estate_name: data!.subscription_name,
      current_price: data!.subscription_offering_price,
      start_price: data!.subscription_offering_price,
      // 건물가치는 임의 지정
      value: 5500,
      token_name: data!.subscription_symbol,
    });

    const estateId = await Real_estates.findOne({
      where: {
        real_estate_name: data!.subscription_name,
      },
      attributes: ["id"],
      raw: true,
    });
    // // console.log(estateId);

    // real_estates_own 에 넣어주기.
    email_list.forEach(async (element: any, index: number) => {
      await Real_estates_own.create({
        user_email: element,
        wallet: wallet_list[index],
        real_estate_id: estateId!.id as number,
        real_estate_name: data!.subscription_name,
        price: data!.subscription_offering_price,
        amount: amount_list[index],
        possible_quantity: amount_list[index],
      });
    });
    console.log("_+_+_+_+_+_")
    console.log(estateInfo);
    console.log(wallet_list);
    console.log(amount_list);
    console.log("_+_+_+_+_+_")

    res.json({ estateInfo, wallet_list, amount_list });
  } catch (error) {
    res.sendStatus(400);
    // console.log("subscriptionList 에서 오류",error);
  }
};



// users 테이블에서 모든 속성 받아오기 by DJ 임시 (1202)
export const allUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await Users.findAll({
      raw: true,
      order: [["id", "ASC"]],
    });
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


export const statusUpdate = async(req : Request, res : Response)=>{
  console.log(req.params);
  const {name} = req.params;
  try {
    await Subscriptions.update({
      subscription_status : 'success'
    },{
      where :{
        subscription_name : name,
      }
    })
    res.send();
  } catch (error) {
    console.log("statusUpdate에서 오류남",error);
  }
}
