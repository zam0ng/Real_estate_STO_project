import { Request, Response } from "express";
import { db } from "../../models";

interface AddRequest extends Request {
  userEmail?: string;
  wallet?: string;
}

// 청약 리스트 보여주기
export const allList = async (req: Request, res: Response) => {
  try {
    const result = await db.Subscriptions.findAll({
      attributes: [
        "id",
        "subscription_img_1",
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
        "subscription_description",
        "subscription_status",
        [db.sequelize.col("start_price"), "start_price"],
      ],
      include: {
        model: db.Real_estates,
        attributes: [],
      },
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 청약 상세페이지 내용 보내주기
export const subsciptionDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.Subscriptions.findAll({
      attributes: [
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
      where: { id },
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 청약 등록
export const subscriptionApplication = async (req: Request, res: Response) => {
  const transaction = await db.sequelize.transaction();

  try {
    type GetUserInfo = {
      user_email: string;
      wallet: string;
      balance: number;
      using_balance: number;
      blacklist: boolean;
    };
    // const { userEmail } = req as AddRequest;
    // const { id, user_email, amount } = req.body;
    const { id, amount, user_email } = req.body;
    const application_amount = 5000 * amount;

    const subscription_rate_check =
      (await db.Subscriptions.findOne({
        attributes: [
          [
            db.sequelize.literal(`"subscription_totalsupply" * 0.3`),
            "subscription_rate",
          ],
        ],
        where: { id: id },
        raw: true,
      })) ?? 0;

    if (subscription_rate_check < amount)
      return res.send("전체 공급량의 30% 이상 구매 할 수 없습니다.");

    const get_user_application = await db.Subscription_application.findAll({
      attributes: [
        [
          db.sequelize.fn("sum", db.sequelize.col("subscription_my_amount")),
          "application",
        ],
      ],
      where: { subscription_user_email: user_email },
      group: "user_email",
      raw: true,
    });

    if (get_user_application + amount > subscription_rate_check)
      return res.send("전체 공급량의 30% 이상 구매 할 수 없습니다.");

    const get_user_info = (await db.Users.findOne({
      attributes: [
        "user_email",
        "wallet",
        "balance",
        "using_balance",
        "blacklist",
      ],
      where: { user_email: user_email },
      raw: true,
    })) as Object as GetUserInfo;

    if (get_user_info.blacklist) return res.send("관리자에게 문의하세요.");
    if (get_user_info.using_balance < application_amount)
      return res.send("금액이 모자랍니다.");

    const user_balance_update = await db.Users.update(
      {
        using_balance: get_user_info.using_balance - application_amount,
      },
      { where: { user_email: user_email }, transaction }
    );

    const insert_subscription_application =
      await db.Subscription_application.create(
        {
          subscription_id: id,
          subscription_user_email: user_email,
          subscription_my_amount: amount,
        },
        { transaction }
      );

    const update_subscription_order_amount = await db.Subscriptions.update(
      {
        subscription_order_amount: db.sequelize.literal(
          `subscription_order_amount + ${amount}`
        ),
      },
      { where: { id: id }, transaction }
    );

    await transaction.commit();
    if (update_subscription_order_amount)
      return res.status(200).send("청약 성공");
    else return res.send("청약 실패");
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.send("청약 실패");
  }
};

// 내 잔액 가져오기
export const getBalance = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.body as AddRequest;
    // const user_email = req.query.user_email as string;

    const result = await db.Users.findOne({
      attributes: ["using_balance"],
      where: { user_email: userEmail },
      raw: true,
    });

    const using_balance = result?.using_balance;

    if (result) return res.status(200).json(using_balance);
    else return res.status(404).send("not found");
  } catch (error) {
    console.error(error);
  }
};
