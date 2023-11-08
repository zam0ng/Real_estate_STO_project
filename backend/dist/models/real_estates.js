"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Real_estates extends sequelize_1.Model {
    static initModel(sequelize) {
        Real_estates.init({
            subscription_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            real_estate_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            current_price: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            start_price: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            value: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Real_estates",
            tableName: "real_estates",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Real_estates;
    }
    static associate(db) {
        db.Real_estates.belongsTo(db.Subscriptions, {
            foreignKey: "subscription_id",
        });
        db.Real_estates.hasMany(db.Real_estates_own, {
            foreignKey: "real_estate_id",
        });
    }
}
exports.default = Real_estates;
