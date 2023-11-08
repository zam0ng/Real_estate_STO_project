"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Trades extends sequelize_1.Model {
    static initModel(sequelize) {
        Trades.init({
            real_estate_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            buyer_order_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            seller_order_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            trade_price: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            trade_amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
            },
        }, {
            sequelize,
            underscored: false,
            timestamps: true,
            modelName: "Trades",
            tableName: "trades",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Trades;
    }
    static associate(db) {
        Trades.belongsTo(db.Orders, {
            foreignKey: "buyer_order_id",
            targetKey: "id",
        });
        Trades.belongsTo(db.Orders, {
            foreignKey: "seller_order_id",
            targetKey: "id",
        });
    }
}
exports.default = Trades;
