import { Request, Response } from "express";
import { Op, QueryTypes } from "sequelize";
import { db } from "../../models";

interface AddRequest extends Request {
  user_email?: string;
  wallet?: string;
}

// 입금하기
export const depositBalance = async (req: Request, res: Response) => {
  console.log("hi??");
  const transaction = await db.sequelize.transaction();
  try {
    console.log(req.body);
    const { user_email } = req.body as AddRequest;
    const { price } = req.body;

    const user = await db.Users.findOne({
      where: { user_email: user_email },
      raw: true,
    });

    if (!user) return res.status(404).send("없는 유저 입니다.");

    if (user?.blacklist) return res.status(404).send("관리자에게 문의 하세요.");
    // console.log(user.balance)
    // console.log(typeof user.balance)
    // console.log(price)
    // console.log(typeof price)
    await db.Deposit_drawal.create(
      {
        user_email: user.user_email,
        status: "입금",
        price: Number(price),
        balance: user.balance + Number(price),
      },
      { transaction }
    );

    await db.Users.update(
      {
        balance: user.balance + Number(price),
        // using_balance: user.using_balance + price,
      },
      { where: { user_email: user.user_email }, transaction }
    );

    await transaction.commit();
    return res.status(200).send("입금 완료");
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).send("서버 오류 발생");
  }
};
// 출금하기
export const withDrawal = async (req: Request, res: Response) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { user_email } = req.body as AddRequest;

    const { price } = req.body;

    const user = await db.Users.findOne({
      where: { user_email: user_email },
      raw: true,
    });

    if (!user) return res.status(404).send("없는 유저 입니다.");

    if (user?.blacklist) return res.status(404).send("관리자에게 문의 하세요.");

    // if (user.using_balance < price) {
    //   await transaction.rollback();
    //   return res.status(400).send("금액이 모자릅니다.");
    // }

    await db.Deposit_drawal.create(
      {
        user_email: user.user_email,
        status: "출금",
        price: Number(price),
        balance: user.balance - Number(price),
      },
      { transaction }
    );

    await db.Users.update(
      {
        balance: user.balance - Number(price),
        // using_balance: user.using_balance - price,
      },
      {
        where: { user_email: user.user_email },
        transaction,
      }
    );

    await transaction.commit();
    return res.status(200).send("출금 완료");
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res.status(500).send("서버 오류 발생");
  }
};

// 지갑 저장
export const registWallet = async (req: Request, res: Response) => {
  try {
    const { user_email, wallet } = req.body;

    const result = await db.Users.update(
      { wallet: wallet },
      { where: { user_email: user_email } }
    );

    if (result) return res.status(200).send(true);
    else return res.send(false);
  } catch (error) {
    console.error(error);
  }
};

// 유저 정보 보내주기
export const userInfo = async (req: Request, res: Response) => {
  try {
    const user_email = req.query.user_email as string;

    const result = await db.Users.findOne({
      attributes: [
        "user_profile_img",
        "user_email",
        "wallet",
        "balance",
        "using_balance",
      ],
      where: { user_email: user_email },
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("Not found");
  } catch (error) {
    console.error(error);
  }
};

// 내 잔액 보여주기
export const myBalance = async (req: Request, res: Response) => {
  try {
    const user_email = req.query.user_email as string;

    const result = await db.Users.findOne({
      attributes: ["balance"],
      where: { user_email: user_email },
      raw: true,
    });

    // // console.log(result);

    if (result) return res.status(200).json(result);
    else return res.status(404).send("Not found");
  } catch (error) {
    console.error(error);
  }
};

// 입금액 보여주기
export const totalDeposit = async (req: Request, res: Response) => {
  try {
    const user_email = req.query.user_email as string;

    const result = await db.Deposit_drawal.findAll({
      attributes: [
        "user_email",
        [db.sequelize.fn("sum", db.sequelize.col("price")), "price"],
      ],
      where: { [Op.and]: [{ user_email: user_email }, { status: "입금" }] },
      group: "user_email",
      raw: true,
    });

    if (result) res.status(200).json(result);
    else res.status(404).send("입금 이력이 없습니다.");
    return;
  } catch (error) {
    console.error(error);
  }
};

// 출금액 보여주기
export const totalDrawal = async (req: Request, res: Response) => {
  try {
    const user_email = req.query.user_email as string;

    const result = await db.Deposit_drawal.findAll({
      attributes: [
        "user_email",
        [db.sequelize.fn("sum", db.sequelize.col("price")), "price"],
      ],
      where: { [Op.and]: [{ user_email: user_email }, { status: "출금" }] },
      group: "user_email",
      raw: true,
    });

    if (result) res.status(200).json(result);
    else res.status(404).send("출금 이력이 없습니다.");
    return;
  } catch (error) {
    console.error(error);
  }
};

// 입출금 내역 보여주기
// 보류
export const transactionList = async (req: Request, res: Response) => {
  try {
    const user_email = req.query.user_email as string;

    const result = await db.Deposit_drawal.findAll({
      attributes: ["status", "price", "balance", "createdAt"],
      where: { user_email: user_email },
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("Not found");
  } catch (error) {
    console.error(error);
  }
};

// 총 손익 보여주기
export const sumProfitLost = async (req: Request, res: Response) => {
  try {
    const user_email = req.query.user_email as string;

    type ProfitLoss = {
      total_profit_loss: number;
      total_amount: number;
      profit_loss_ratio: number;
      balance: number;
    };

    const user = await db.Users.findOne({
      where: { user_email: `${user_email}` },
      attributes: ["balance"],
      raw: true,
    });

    if (!user) return res.status(404).send("empty");

    const total_buy: any = await db.Real_estates_own.findAll({
      attributes: [
        [
          db.sequelize.fn("sum", db.sequelize.literal("price * amount")),
          "total_buy",
        ],
      ],
      where: { user_email: user_email },
      raw: true,
    });

    const profit_loss_amount = (await db.Real_estates_own.findAll({
      attributes: [
        [
          db.sequelize.fn(
            "SUM",
            db.sequelize.literal(`(current_price * amount - price * amount)`)
          ),
          "total_profit_loss",
        ],
      ],
      include: [
        {
          model: db.Real_estates,
          attributes: [],
        },
      ],
      where: {
        user_email: `${user_email}`,
      },
      group: ["user_email"],
      raw: true,
    })) as [] as ProfitLoss[];

    const result = profit_loss_amount.map((item) => {
      const profit_loss_float = parseFloat(
        (
          ((Number(total_buy[0].total_buy) + item.total_profit_loss) /
            Number(total_buy[0].total_buy)) *
            100 -
          100
        ).toFixed(2)
      );

      return {
        total_profit_loss: item.total_profit_loss,
        appraise_balance:
          Number(total_buy[0].total_buy) + item.total_profit_loss,
        profit_loss_ratio: profit_loss_float,
        balance: user.balance,
        total_buy: total_buy[0],
      };
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 종목별 자산 정보
export const assetInformation = async (req: Request, res: Response) => {
  try {
    const user_email = req.query.user_email as string;

    const result = await db.Real_estates_own.findAll({
      attributes: [
        "real_estate_name",
        [db.sequelize.literal("price"), "price"],
        "amount",
        [
          // db.sequelize.literal(`(current_price * amount - price * amount - current_price * amount)`),
          db.sequelize.literal(`(current_price * amount - price * amount)`),
          "valuation",
        ],
        [db.sequelize.literal(`(current_price)`), "present_price"],
        // [db.sequelize.literal(`(current_price * amount)`), "present_price"],

        "possible_quantity",
        [
          db.sequelize.literal(
            `ROUND((((current_price * amount - price * amount) / (price * amount)) * 100)::numeric, 2)`
          ),
          // [db.sequelize.literal(`(current_price - price) / price * 100`),

          "rate_of_return",
        ],
      ],
      include: [
        {
          model: db.Real_estates,
          attributes: [],
        },
      ],
      where: {
        user_email: `${user_email}`,
      },
      raw: true,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 배당금
export const dividendList = async (req: Request, res: Response) => {
  try {
    const user_email = req.query.user_email as string;

    const query = `
      select 
        c.real_estate_name, 
        c.user_email, 
        c.dividend_price, 
        c.amount,
        c.anticipation_dividend,
        c.dividend_status,
        c.dividend_basedate,
        c.dividend_paymentdate,
        d.total_anticipation_dividend
      from (
        select 
        a.real_estate_name, 
        b.user_email, 
        a.dividend_price, 
        b.amount,
        (a.dividend_price * b.amount) as anticipation_dividend,
        a.dividend_status,
        DATE(a.dividend_basedate) as dividend_basedate, 
        DATE(a.dividend_paymentdate) as dividend_paymentdate
      from dividends a 
        inner join real_estates_own_history b ON a.id = b.dividend_id
      where b.user_email = '${user_email}'
      ) as c
      join (
      select 
        SUM(a.dividend_price * b.amount) as total_anticipation_dividend
      from dividends a 
        inner join real_estates_own_history b ON a.id = b.dividend_id
      where b.user_email = '${user_email}' and a.dividend_status = '지급 완료'
      ) as d on true;`;

    const result = await db.sequelize.query(query, {
      replacements: { user_email: user_email },
      type: QueryTypes.SELECT,
    });

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};

// 내 투표 목록
// export const voteList = async (req: Request, res: Response) => {
//   try {
//     type Votes = {
//       id: number;
//       real_estate_name: string;
//       real_estate_img: string;
//       vote_title: string;
//       vote_start_date: Date;
//       vote_end_date: Date;
//       vote_amount: number;
//       subscription_totalsupply: number;
//     };

//     const real_estate_img = await db.Subscriptions.findAll({
//       attributes: ["subscription_img_1", "subscription_name"],
//       where: { subscription_status: "success" },
//       raw: true,
//     });

//     // console.log("real_estate_img : ", real_estate_img);
//   } catch (error) {
//     console.error(error);
//   }
// };

// 내 청약 목록
export const subscriptionList = async (req: Request, res: Response) => {
  try {
    const user_email = req.query.user_email as string;
    const wallet = await db.Users.findOne({
      where : {
        user_email : user_email,
      },
      attributes :[
        'wallet'
      ],
      raw : true,
    })

    const query = `
      select a.id,
        a.subscription_name,
        a.subscription_img_1,
        a.subscription_totalsupply,
        a.subscription_order_amount,
        DATE(b."createdAt") as application_date , 
        DATE(a.subscription_end_date AT TIME ZONE 'Asia/Seoul') as subscription_end_date, 
        b.amount, 
        a.subscription_offering_price,
        (a.subscription_offering_price * b.amount) as refund_price
      from subscriptions a join subscriptions_own b 
          on a.id = b.subscription_id
      where b.wallet = '${wallet?.wallet}'`;

      const result = await db.sequelize.query(query, {
        replacements: { user_email: user_email },
        type: QueryTypes.SELECT,
      });
      console.log("result+_+_+_+_",result);

    if (result) return res.status(200).json(result);
    else return res.status(404).send("empty");
  } catch (error) {
    console.error(error);
  }
};
