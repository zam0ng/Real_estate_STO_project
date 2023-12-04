import { Sequelize } from "sequelize";
import { config } from "../config";
import Orders from "./orders";
import Trades from "./trades";
import Users from "./users";
import Subscriptions from "./subscriptions";
import Subscriptions_own from "./subscriptions_own";
import Real_estates from "./real_estates";
import Real_estates_own from "./real_estates_own";
import Subscription_application from "./subscription_application";
import Deposit_drawal from "./deposit_drawal";
import Dividends from "./dividends";
import Dividend_details from "./dividend_details";
import Notices from "./notices";
import Votes from "./votes";
import Real_estates_own_history from "./real_estates_own_history";
import Contract_address from "./contract_address";
import Tx_block from "./tx_block";
import Tx_receipt from "./tx_receipt";
import Vote_history from "./vote_history";

export const sequelize = new Sequelize(
  config.dev.database!,
  config.dev.username!,
  config.dev.password!,
  {
    host: config.dev.host!,
    dialect: "postgres",
    logging: false,
  }
);

export interface DB {
  sequelize: Sequelize;
  Users: typeof Users;
  Orders: typeof Orders;
  Trades: typeof Trades;
  Subscriptions: typeof Subscriptions;
  Subscriptions_own: typeof Subscriptions_own;
  Real_estates: typeof Real_estates;
  Real_estates_own: typeof Real_estates_own;
  Subscription_application: typeof Subscription_application;
  Deposit_drawal: typeof Deposit_drawal;
  Dividends: typeof Dividends;
  Dividend_details: typeof Dividend_details;
  Notices: typeof Notices;
  Votes: typeof Votes;
  Real_estates_own_history: typeof Real_estates_own_history;
  Contract_address: typeof Contract_address;
  Tx_block: typeof Tx_block;
  Tx_receipt: typeof Tx_receipt;
  Vote_history: typeof Vote_history;
}

export const db: DB = {
  sequelize,
  Users,
  Trades,
  Orders,
  Subscriptions,
  Subscriptions_own,
  Real_estates,
  Real_estates_own,
  Subscription_application,
  Deposit_drawal,
  Dividends,
  Dividend_details,
  Notices,
  Votes,
  Real_estates_own_history,
  Contract_address,
  Tx_block,
  Tx_receipt,
  Vote_history,
};

db.sequelize = sequelize;
db.Orders = Orders;
db.Trades = Trades;

Users.initModel(sequelize);
Orders.initModel(sequelize);
Trades.initModel(sequelize);
Subscriptions.initModel(sequelize);
Subscriptions_own.initModel(sequelize);
Real_estates.initModel(sequelize);
Subscription_application.initModel(sequelize);
Deposit_drawal.initModel(sequelize);
Dividends.initModel(sequelize);
Dividend_details.initModel(sequelize);
Notices.initModel(sequelize);
Real_estates_own.initModel(sequelize);
Contract_address.initModel(sequelize);
Votes.initModel(sequelize);
Vote_history.initModel(sequelize);
Real_estates_own_history.initModel(sequelize);
Tx_block.initModel(sequelize);
Tx_receipt.initModel(sequelize);

Users.associate(db);
Subscriptions.associate(db);
Real_estates.associate(db);
Real_estates_own.associate(db);
Subscriptions_own.associate(db);
Subscription_application.associate(db);
// Orders.associate(db);
// Trades.associate(db);
Dividends.associate(db);
Dividend_details.associate(db);
Real_estates_own_history.associate(db);
Subscriptions.associate(db);
Real_estates.associate(db);
Real_estates_own.associate(db);
Subscriptions_own.associate(db);
Subscription_application.associate(db);
Contract_address.associate(db);
// Tx_block.associate(db);
// Tx_receipt.associate(db);
Votes.associate(db);
Vote_history.associate(db);
