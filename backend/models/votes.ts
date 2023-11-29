import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface voteAttribute {
  real_estate_name: string;
  vote_id: number;
  vote_title: string;
  vote_start_date: Date;
  vote_end_date: Date;
}

class Votes extends Model<voteAttribute> {
  declare real_estate_name: string;
  declare vote_id: number;
  declare vote_title: string;
  declare vote_start_date: Date;
  declare vote_end_date: Date;
  static initModel(sequelize: Sequelize): typeof Votes {
    Votes.init(
      {
        real_estate_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        vote_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        vote_title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        vote_start_date: {
          type: DataTypes.DATE,
        },
        vote_end_date: {
          type: DataTypes.DATE,
        },
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
    db.Votes.belongsTo(db.Contract_address, {
      foreignKey: "vote_id",
    });
  }
}

export default Votes;
