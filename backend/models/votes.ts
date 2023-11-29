import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface voteAttribute {
  real_estate_name: string;
  // subscription_totalsupply: number;
  vote_title: string;
  // vote_content: string;
  // vote_amount: number;
  vote_start_date: Date;
  vote_end_date: Date;
  // vote_result: string;
}

class Votes extends Model<voteAttribute> {
  static initModel(sequelize: Sequelize): typeof Votes {
    Votes.init(
      {
        real_estate_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        // subscription_totalsupply: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        // },
        vote_title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        // vote_content: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        // vote_amount: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        // },
        vote_start_date: {
          type: DataTypes.DATE,
        },
        vote_end_date: {
          type: DataTypes.DATE,
        },
        // vote_result: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
      },
      {
        sequelize,
        modelName: "Votes",
        tableName: "votes",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Votes;
  }
  static associate(db: DB) {
    db.Votes.hasMany(db.Vote_history, {
      foreignKey: "vote_id",
    });
  }
}

export default Votes;
