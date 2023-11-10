"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Dividends extends sequelize_1.Model {
    static initModel(sequelize) {
        Dividends.init({
            real_estate_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            dividend_price: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            dividend_basedate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            dividend_paymentdate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Dividends",
            tableName: "dividends",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Dividends;
    }
}
exports.default = Dividends;
