"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Real_estates_own extends sequelize_1.Model {
    static initModel(sequelize) {
        Real_estates_own.init({
            user_email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            real_estate_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            real_estate_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            possible_quantity: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            token_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Real_estates_own",
            tableName: "real_estates_own",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Real_estates_own;
    }
    static associate(db) {
        db.Real_estates_own.belongsTo(db.Real_estates, {
            foreignKey: "real_estates_id",
            targetKey: "id",
        });
    }
}
exports.default = Real_estates_own;
