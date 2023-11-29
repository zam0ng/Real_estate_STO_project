import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface voteHistoryAttribute {
  id: number;
  vote_id: number;
  user_id: number;
}

class Vote_history extends Model<voteHistoryAttribute> {
  static initModel(sequelize: Sequelize): typeof Vote_history {
    Vote_history.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        vote_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Vote_history",
        tableName: "vote_history",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Vote_history;
  }
  static associate(db: DB) {
    db.Vote_history.belongsTo(db.Votes, {
      foreignKey: "vote_id",
    });
    db.Vote_history.belongsTo(db.Users, {
      foreignKey: "user_id",
    });
  }
}

export default Vote_history;
