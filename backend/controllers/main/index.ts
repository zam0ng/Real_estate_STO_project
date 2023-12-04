import { Request, Response } from "express";
import { sequelize } from "../../models";
import Subscriptions from "../../models/subscriptions";
import Real_estates from "../../models/real_estates";
import Trades from "../../models/trades";
import Dividends from "../../models/dividends";
import { Op } from "sequelize";

const year = new Date().getFullYear();
const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
const day = new Date().getDate().toString().padStart(2, "0");
const currentDate = `${year}-${month}-${day}`;

// 메인 청약 배너
export const mainBanner = async (req: Request, res: Response) => {
  // // console.log("main 배너 요청 들어오니?");
  try {
    const result = await Subscriptions.findAll({
      where: { subscription_status: "start" },
      limit: 1,
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        "subscription_img_1",
        "subscription_description",
        "subscription_name",

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
          "subscription_description",
          "subscription_name",

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

// 주요지수 매물정보
export const mainRealEstate = async (req: Request, res: Response) => {
  // // console.log("mainRealEstate 들어오니?");
  try {
    const result = await Real_estates.findAll({
      attributes: [
        "real_estate_name",
        "current_price",
        [sequelize.literal("current_price-start_price"), "difference"],
        [
          sequelize.literal("((current_price*100)/start_price)-100"),
          "fluctuation_rate",
        ],
      ],
      raw: true,
    });

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

// 거래량
export const tradingVolumeRN = async (req: Request, res: Response) => {
  // console.log("tradingVolumeRN 들어오니>");
  try {
    const result = await Trades.findAll({
      attributes: [
        "real_estate_name",
        [sequelize.literal(`DATE_TRUNC('day',"createdAt")`), "date"],
        [sequelize.literal(`SUM(trade_price * trade_amount)`), "totalprice"],
      ],

      order: [["totalprice", "DESC"]],

      group: ["real_estate_name", "date"],
      raw: true,
      having: sequelize.where(
        sequelize.fn("DATE_TRUNC",sequelize.literal(`'day'`),sequelize.col("createdAt")),"=",currentDate),
    });
    // console.log(result);
    const estateNames = result.map((item) => item.real_estate_name);

    const findOneResults = await Promise.all(
      estateNames.map(async (name) => {
        return await Real_estates.findOne({
          where: {
            real_estate_name: name,
          },
          attributes: [
            "current_price",
            [
              sequelize.literal("((current_price*100)/start_price)-100"),
              "fluctuation_rate",
            ],
          ],
          include: [
            {
              model: Subscriptions,
              attributes: ["subscription_img_1"],
            },
          ],
          raw: true,
        });
      })
    );

    const mergeobj = result.map((el, idx) => ({
      ...el,
      ...findOneResults[idx],
    }));
    // console.log(mergeobj);
    res.json(mergeobj);
  } catch (error) {
    console.log(error);
  }
};

// 급상승
export const suddenIncrement = async (req: Request, res: Response) => {
  // // console.log("suddenIncrement 들어오니??");
  try {
    const result = await Real_estates.findAll({
      attributes: [
        "real_estate_name",
        "current_price",
        [
          sequelize.literal("((current_price*100)/start_price)-100"),
          "fluctuation_rate",
        ],
      ],

      include: [
        {
          model: Subscriptions,
          attributes: ["subscription_img_1"],
        },
      ],

      order: [["fluctuation_rate", "DESC"]],
      raw: true,
    });
    // // console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

// 급하락
export const suddenDecrement = async (req: Request, res: Response) => {
  // // console.log("suddenDecrement 들어오니??");
  try {
    const result = await Real_estates.findAll({
      attributes: [
        "real_estate_name",
        "current_price",
        [
          sequelize.literal("((current_price*100)/start_price)-100"),
          "fluctuation_rate",
        ],
      ],

      include: [
        {
          model: Subscriptions,
          attributes: ["subscription_img_1"],
        },
      ],

      order: [["fluctuation_rate", "ASC"]],
      raw: true,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

//이달의 배당
export const rateOfReturn = async (req: Request, res: Response) => {
  // console.log("rateOfReturn 들어오니?");
  try {
    interface DividendResult {
      real_estate_name: string;
      dividend_price: number;
    }

    const result: DividendResult[] = (await Dividends.findAll({
      attributes: ["real_estate_name", "dividend_price"],
      where: {
        dividend_paymentdate: {
          [Op.gte]: `${year}-${month}`,
        },
      },
      order: [["dividend_price", "DESC"]],
      raw: true,
    })) as [];
    // console.log(result);
    const estateName = result.map((item) => item.real_estate_name);

    const findOneResult = await Promise.all(
      estateName.map(async (name) => {
        return await Subscriptions.findOne({
          where: {
            subscription_name: name,
          },
          attributes: ['id',"subscription_img_1"],
          raw: true,

          include :[
            {
              model : Real_estates,
              attributes : ['current_price'],
              where : {
                real_estate_name : name,
              }            
            }
          ]
        });
      })
    );
    // // console.log(result);
    // console.log(findOneResult);
    const mergeobj = result.map((el, idx) => ({
      ...el,
      ...findOneResult[idx],
    }));
    // console.log(mergeobj);
    res.json(mergeobj);
  } catch (error) {
    console.log(error);
  }
};

export const mainSearch = async (req: Request, res: Response) => {
  // // console.log("mainSearch 들어옴?");
  try {
    const result = await Real_estates.findAll({
      attributes: ["id", "real_estate_name"],
      raw: true,
    });

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
