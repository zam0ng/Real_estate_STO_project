"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Dividend_details extends sequelize_1.Model {
    static initModel(sequelize) {
        Dividend_details.init({
            real_estate_name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            dividend_basedate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
            dividend_paymentdate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
            dividend_user_email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            dividend_amount: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        }, {
            sequelize,
            modelName: "Dividend_details",
            tableName: "dividend_details",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Dividend_details;
    }
}
exports.default = Dividend_details;
