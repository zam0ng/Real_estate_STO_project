"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const orders_1 = __importDefault(require("./orders"));
const trades_1 = __importDefault(require("./trades"));
const users_1 = __importDefault(require("./users"));
const subscriptions_1 = __importDefault(require("./subscriptions"));
const subscriptions_own_1 = __importDefault(require("./subscriptions_own"));
const real_estates_1 = __importDefault(require("./real_estates"));
const real_estates_own_1 = __importDefault(require("./real_estates_own"));
const subscription_application_1 = __importDefault(require("./subscription_application"));
const deposit_drawal_1 = __importDefault(require("./deposit_drawal"));
const dividends_1 = __importDefault(require("./dividends"));
const dividend_details_1 = __importDefault(require("./dividend_details"));
const notices_1 = __importDefault(require("./notices"));
const votes_1 = __importDefault(require("./votes"));
exports.sequelize = new sequelize_1.Sequelize(config_1.config.dev.database, config_1.config.dev.username, config_1.config.dev.password, {
    host: config_1.config.dev.host,
    dialect: "postgres",
});
exports.db = {
    sequelize: exports.sequelize,
    Users: users_1.default,
    Trades: trades_1.default,
    Orders: orders_1.default,
    Subscriptions: subscriptions_1.default,
    Subscriptions_own: subscriptions_own_1.default,
    Real_estates: real_estates_1.default,
    Real_estates_own: real_estates_own_1.default,
    Subscription_application: subscription_application_1.default,
    Deposit_drawal: deposit_drawal_1.default,
    Dividends: dividends_1.default,
    Dividend_details: dividend_details_1.default,
    Notices: notices_1.default,
    Votes: votes_1.default,
};
exports.db.sequelize = exports.sequelize;
exports.db.Orders = orders_1.default;
exports.db.Trades = trades_1.default;
users_1.default.initModel(exports.sequelize);
orders_1.default.initModel(exports.sequelize);
trades_1.default.initModel(exports.sequelize);
subscriptions_1.default.initModel(exports.sequelize);
subscriptions_own_1.default.initModel(exports.sequelize);
real_estates_1.default.initModel(exports.sequelize);
subscription_application_1.default.initModel(exports.sequelize);
deposit_drawal_1.default.initModel(exports.sequelize);
dividends_1.default.initModel(exports.sequelize);
dividend_details_1.default.initModel(exports.sequelize);
notices_1.default.initModel(exports.sequelize);
real_estates_own_1.default.initModel(exports.sequelize);
votes_1.default.initModel(exports.sequelize);
subscriptions_1.default.associate(exports.db);
real_estates_1.default.associate(exports.db);
real_estates_own_1.default.associate(exports.db);
subscriptions_own_1.default.associate(exports.db);
subscription_application_1.default.associate(exports.db);
orders_1.default.associate(exports.db);
trades_1.default.associate(exports.db);
subscriptions_1.default.associate(exports.db);
real_estates_1.default.associate(exports.db);
real_estates_own_1.default.associate(exports.db);
subscriptions_own_1.default.associate(exports.db);
subscription_application_1.default.associate(exports.db);
