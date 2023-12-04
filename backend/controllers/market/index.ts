import { Request, Response } from "express";
import Subscriptions from "../../models/subscriptions";
import Real_estates from "../../models/real_estates";
import { sequelize } from "../../models";
import Dividends from "../../models/dividends";
import { db } from "../../models";
import Notices from "../../models/notices";
import Trades from "../../models/trades";
import { Op, QueryTypes } from "sequelize";

export const marketSubscription = async (req: Request, res: Response) => {
  // // console.log("marketSubscription / get 요청 들어옴?");

  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const day = new Date().getDate().toString().padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;

  try {
    const result = await Subscriptions.findAll({
      where: { subscription_status: "start" },
      limit: 1,
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "subscription_img_1",
        "subscription_totalprice",
        "subscription_description",
        "subscription_name",
        "subscription_order_amount",

        [
          sequelize.literal(
            `DATE_PART('day', (DATE_TRUNC('day', subscription_end_date) - '${currentDate}'::timestamp))`
          ),
          "subscription_restdate",
        ],
      ],
    });

    if (result.length > 0) {
      res.json(result);
    } else {
      const result = await Subscriptions.findAll({
        where: { subscription_status: "pending" },
        limit: 1,
        order: [["createdAt", "DESC"]],
        attributes: [
          "id",
          "subscription_img_1",
          "subscription_totalprice",
          "subscription_description",
          "subscription_name",
          "subscription_order_amount",

          [
            sequelize.literal(
              `DATE_PART('day', (DATE_TRUNC('day', subscription_end_date) - '${currentDate}'::timestamp))`
            ),
            "subscription_restdate",
          ],
        ],
      });

      if (result.length > 0) {
        res.json(result);
      } else {
        res.send("예정,진행중인 청약없음");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const marketTradelist = async (req: Request, res: Response) => {
  // // console.log("marketTradelist / get 요청 들어옴?");

  try {
    // sequelize 에서 컬럼간의 연산을 수행할 때는 주로 sequelize.literal를 사용
    const result = await Real_estates.findAll({
      attributes: [
        // (현재값(value) / 시작가 * 100) - 100
        "start_price",
        "current_price",

        // ⭐⭐ 값들이 int 로 선언되어 소수점 계산이 안되서 계산식 순서를 바꿈
        [
          sequelize.literal(
            "CASE WHEN start_price = 0 THEN 0 ELSE ((current_price * 100) / start_price) - 100 END"
          ),
          "fluctuation_rate",
        ],
        [
          sequelize.literal(
            "CASE WHEN value = 0 THEN 0 ELSE ((current_price * 100) / value) - 100 END"
          ),
          "rating",
        ],
      ],
      include: [
        {
          model: Subscriptions,
          attributes: [
            "subscription_img_1",
            "subscription_name",
            "subscription_description",
          ],
        },
      ],
      raw: true,
    });

    // console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const marketDetail = async (req: Request, res: Response) => {
  // console.log("marketDetail get요청 들어옴?");
  const { name } = req.params;
  // // console.log(name);
  try {
    const result = await Real_estates.findAll({
      where: { real_estate_name: name },

      attributes: [
        "current_price",
        // "start_price",
        "value",
        [
          sequelize.literal(
            "CASE WHEN start_price = 0 THEN 0 ELSE ((current_price * 100) / start_price) - 100 END"
          ),
          "fluctuation_rate",
        ],
        [
          sequelize.literal(
            "CASE WHEN value = 0 THEN 0 ELSE ((current_price * 100) / value) - 100 END"
          ),
          "rating",
        ],
      ],
      include: [
        {
          model: Subscriptions,
          attributes: [
            "subscription_img_1",
            "subscription_img_2",
            "subscription_img_3",
            "subscription_img_4",
            "subscription_img_5",
            "subscription_description",
            "subscription_name",
            "subscription_address",
          ],
        },
      ],
      raw: true,
    });
    const result2 = await Dividends.findAll({
      where: { real_estate_name: name },
      attributes: [
        "dividend_price",
        "dividend_basedate",
        "dividend_paymentdate",
      ],
      raw: true,
    });
    const mergeobj = { ...result[0], ...result2[0] };
    res.json(mergeobj);
  } catch (error) {
    console.log(error);
  }
};

export const detailDividend = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    // // console.log(name);
    const result = await Dividends.findAll({
      where: {
        real_estate_name: name,
      },

      attributes: [
        "dividend_basedate",
        "dividend_paymentdate",
        "dividend_price",
      ],

      order: [["createdAt", "DESC"]],
      raw: true,
    });

    // // console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

// 건물정보
export const budlingInfo = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const result = await Subscriptions.findOne({
      where: {
        subscription_name: name,
      },
      attributes: [
        "floors",
        "purpose",
        "main_purpose",
        "area",
        "all_area",
        "build_area",
        "floor_area",
        "completion",
      ],
      raw: true,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

// 발행정보
export const publishInfo = async (req: Request, res: Response) => {
  const { name } = req.params;
  // // console.log(name);
  try {
    const result = await Subscriptions.findOne({
      where: {
        subscription_name: name,
      },

      attributes: [
        "subscription_name",
        "subscription_address",
        "stock_type",
        "publisher",
        "subscription_totalsupply",
        "subscription_offering_price",
        "subscription_totalprice",
        "subscription_start_date",
        "subscription_end_date",
      ],
      raw: true,
    });

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

//공시, 공지사항
export const boardInfo = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const result = await Notices.findAll({
      where: {
        real_estate_name: name,
      },
      attributes: [
        "id",
        "category",
        "notice_title",
        "createdAt",
        "real_estate_name",
      ],
      raw: true,
    });

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const detailBoardInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  // // console.log(id);
  try {
    const result = await Notices.findOne({
      where: {
        id: id,
      },
      attributes: ["category", "notice_title", "notice_content", "createdAt"],
      raw: true,
    });
    // // console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const dayQuote = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    // console.log(name);

    // 등락가 를 위해 시작가 가져오기
    const startPrice: { start_price: number } | null =
      (await Real_estates.findOne({
        where: {
          real_estate_name: name,
        },
        attributes: ["start_price"],
        raw: true,
      })) as { start_price: number } | null;

    console.log(startPrice);

    // const nowDate = new Date();
    // // 오전 9시 장시작
    // const startDate = new Date(
    //   Date.UTC(
    //     nowDate.getUTCFullYear(),
    //     nowDate.getUTCMonth(),
    //     nowDate.getUTCDate(),
    //     0,
    //     0,
    //     0
    //   )
    // );
    // // 오후 6시 장마감
    // const endDate = new Date(
    //   Date.UTC(
    //     nowDate.getUTCFullYear(),
    //     nowDate.getUTCMonth(),
    //     nowDate.getUTCDate(),
    //     9,
    //     0,
    //     0
    //   )
    // );
    // 현재 한국 시간을 얻기 위해 UTC offset을 적용
    const nowDate = new Date();

    // 현재 날짜의 자정 (UTC 기준)
    const startDate = new Date(
      Date.UTC(
        nowDate.getUTCFullYear(),
        nowDate.getUTCMonth(),
        nowDate.getUTCDate(),
        0,
        0,
        0
      )
    );

    // 현재 날짜의 오후 24시 (자정 다음날 00시, UTC 기준)
    const endDate = new Date(
      Date.UTC(
        nowDate.getUTCFullYear(),
        nowDate.getUTCMonth(),
        nowDate.getUTCDate() + 1, // 다음 날로 이동
        0,
        0,
        0
      )
    );

    // endDate를 하루 전으로 설정하여 오후 24시로 조정
    endDate.setUTCSeconds(endDate.getUTCSeconds() - 1);

    console.log(startDate.toISOString());
    console.log(endDate.toISOString());

    const result = await Trades.findAll({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
        real_estate_name: name,
      },
      attributes: [
        "trade_price",
        "trade_amount",
        [
          sequelize.literal(`trade_price-${startPrice?.start_price}`),
          "rises_falls",
        ],
        "createdAt",
      ],
      order: [["createdAt", "DESC"]],
      raw: true,
    });
    // // console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const daliyQuote = async (req: Request, res: Response) => {
  const { name } = req.params;
  // // console.log(name);

  try {
    const query = `
                SELECT 
            latest_trades.real_estate_name,
            latest_trades.trade_price,
            latest_trades.next_trade_price,
            latest_trades.date,
            daily_totals.total_price,
            (latest_trades.trade_price - latest_trades.next_trade_price) as fluctuation_price
        FROM (
            SELECT 
                real_estate_name,
                trade_price,
                COALESCE(LEAD(trade_price) OVER (ORDER BY DATE("createdAt") DESC, "createdAt" DESC), 5000) as next_trade_price,
                DATE("createdAt") as date
            FROM (
                SELECT DISTINCT ON (real_estate_name, DATE("createdAt"))
                    real_estate_name,
                    trade_price,
                    "createdAt"
                FROM trades
                WHERE real_estate_name = '${name}'
                ORDER BY real_estate_name, DATE("createdAt"), "createdAt" DESC
            ) as filtered_trades
        ) as latest_trades
        JOIN (
            SELECT 
                DATE("createdAt") as date,
                SUM(trade_price * trade_amount) as total_price
            FROM trades
            WHERE real_estate_name = '${name}'
            GROUP BY DATE("createdAt")
        ) as daily_totals ON latest_trades.date = daily_totals.date
        ORDER BY latest_trades.date DESC;
        `;

    const result = await sequelize.query(query, {});
    // // console.log(result);
    res.json(result[0]);
  } catch (error) {
    console.log(error);
  }
};
