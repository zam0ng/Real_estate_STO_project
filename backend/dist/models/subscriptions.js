"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status_enum = void 0;
const sequelize_1 = require("sequelize");
// typescirpt는 enum에 관한 지식이 없답니다
var status_enum;
(function (status_enum) {
    status_enum["panding"] = "panding";
    status_enum["start"] = "start";
    status_enum["success"] = "success";
    status_enum["failure"] = "failure";
})(status_enum || (exports.status_enum = status_enum = {}));
class Subscriptions extends sequelize_1.Model {
    static initModel(sequelize) {
        Subscriptions.init({
            subscription_img: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            subscription_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            subscription_address: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            subscription_totalprice: {
                type: sequelize_1.DataTypes.BIGINT,
                defaultValue: 0,
            },
            subscription_totalsupply: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0,
            },
            subscription_description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            subscription_start_date: { type: sequelize_1.DataTypes.DATE, allowNull: false },
            subscription_end_date: { type: sequelize_1.DataTypes.DATE, allowNull: false },
            subscription_result_date: { type: sequelize_1.DataTypes.DATE, allowNull: false },
            subscription_building_date: { type: sequelize_1.DataTypes.DATE, allowNull: false },
            subscription_trading_start_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            subscription_order_amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            subscription_offering_price: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
            },
            subscription_status: {
                type: sequelize_1.DataTypes.ENUM,
                values: ["pading", "start", "success", "failure"],
                allowNull: false,
            },
            floors: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            purpose: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            main_purpose: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            area: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            all_area: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            build_area: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            floor_area: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            completion: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            stock_type: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            publisher: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Subscriptions",
            tableName: "subscriptions",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Subscriptions;
    }
    static associate(db) {
        db.Subscriptions.hasMany(db.Subscriptions_own, {
            foreignKey: "subscription_id",
        });
        db.Subscriptions.hasMany(db.Real_estates, {
            foreignKey: "subscription_id",
        });
        db.Subscriptions.hasMany(db.Subscription_application, {
            foreignKey: "subscription_id",
        });
    }
}
exports.default = Subscriptions;
