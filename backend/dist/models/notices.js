"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Notices extends sequelize_1.Model {
    static initModel(sequelize) {
        Notices.init({
            category: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            notice_title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            notice_content: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            notice_writer: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Notices",
            tableName: "notices",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Notices;
    }
}
exports.default = Notices;
