import { Request, Response } from "express";
import { db } from "../../models";

export const allList = async (req: Request, res: Response) => {
  try {
    const result = await db.Subscriptions.findAll({
      attributes: [
        "subscription_img",
        "subscription_name",
        "subscription_address",

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
        "subscription_status",
      ],
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

export const subsciptionDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.Subscriptions.findAll({
      attributes: [
        "subscription_img",
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
      where: { id },
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

export const subscriptionApplication = async (req: Request, res: Response) => {
  try {
    type GetUserBalance = {
      user_email: string;
      wallet: string;
      balance: number;
      using_balance: number;
      blacklist: boolean;
    };
    const { id, user_email, amount } = req.body;
    const application_amount = 5000 * amount;

    const getUserBalance = (await db.Users.findOne({
      attributes: [
        "user_email",
        "wallet",
        "balance",
        "using_balance",
        "blacklist",
      ],
      where: { user_email: user_email },
      raw: true,
    })) as Object as GetUserBalance;

    if (getUserBalance.using_balance < application_amount)
      return res.send("금액이 모자랍니다.");

    const userBalanceUpdate = await db.Users.update(
      {
        using_balance: getUserBalance.using_balance - application_amount,
      },
      { where: { user_email: user_email } }
    );

    const result = await db.Subscription_application.create({
      subscription_id: id,
      subscription_user_email: user_email,
      subscription_my_amount: amount,
    });

    if (result) return res.status(200).send("청약 성공");
    else return res.send("청약 실패");
  } catch (error) {
    console.error(error);
  }
};
