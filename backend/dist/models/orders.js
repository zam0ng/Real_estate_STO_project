"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Orders extends sequelize_1.Model {
    static initModel(sequelize) {
        Orders.init({
            user_email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            real_estate_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            order_type: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            order_status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            order_price: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            order_amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            possible_amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            underscored: false,
            timestamps: true,
            modelName: "Orders",
            tableName: "orders",
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Orders;
    }
    static associate(db) {
        Orders.hasMany(db.Trades, {
            foreignKey: "buyer_order_id",
            sourceKey: "id",
        });
        Orders.hasMany(db.Trades, {
            foreignKey: "seller_order_id",
            sourceKey: "id",
        });
    }
}
exports.default = Orders;
