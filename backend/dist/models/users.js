"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
    static initModel(sequelize) {
        Users.init({
            user_eamil: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            user_pw: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            wallet: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            balance: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            blacklist: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }, {
            sequelize,
            modelName: "Users",
            tableName: "users",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Users;
    }
}
exports.default = Users;
