"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Votes extends sequelize_1.Model {
    static initModel(sequelize) {
        Votes.init({
            real_estate_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            subscription_totalsupply: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            vote_title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            vote_content: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            vote_amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            vote_start_date: {
                type: sequelize_1.DataTypes.DATE,
            },
            vote_end_date: {
                type: sequelize_1.DataTypes.DATE,
            },
            vote_result: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Votes",
            tableName: "votes",
            timestamps: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
        return Votes;
    }
}
exports.default = Votes;
