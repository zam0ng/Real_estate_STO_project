"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Subscriptions_own extends sequelize_1.Model {
    static initModel(sequelize) {
        Subscriptions_own.init({
            user_email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            subscription_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Subscriptions_own",
            tableName: "subscriptions_own",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Subscriptions_own;
    }
    static associate(db) {
        db.Subscriptions_own.belongsTo(db.Subscriptions, {
            foreignKey: "subscription_id",
            targetKey: "id",
        });
    }
}
exports.default = Subscriptions_own;
