"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Subscription_application extends sequelize_1.Model {
    static initModel(sequelize) {
        Subscription_application.init({
            subscription_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            subscription_user_email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            subscription_my_amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Subscription_application",
            tableName: "subscription_application",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Subscription_application;
    }
    static associate(db) {
        db.Subscriptions.belongsTo(db.Subscription_application, {
            foreignKey: "subscription_id",
        });
    }
}
exports.default = Subscription_application;
