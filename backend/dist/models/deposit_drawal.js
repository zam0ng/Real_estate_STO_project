"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Deposit_drawal extends sequelize_1.Model {
    static initModel(sequelize) {
        Deposit_drawal.init({
            user_email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            balance: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Deposit_drawal",
            tableName: "deposit_drawal",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Deposit_drawal;
    }
}
exports.default = Deposit_drawal;
