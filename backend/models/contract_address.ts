import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface caAttribute {
  id?: number;
  address: string;
  real_estate_name: string;
  ca_type?: string;
  symbol?: string;
}

class Contract_address extends Model<caAttribute> {
  declare id: number;
  declare address: string;
  declare real_estate_name: string;
  declare ca_type: string;
  declare symbol: string;
  static initModel(sequelize: Sequelize): typeof Contract_address {
    Contract_address.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        real_estate_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ca_type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        symbol: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "Contract_address",
        tableName: "contract_address",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Contract_address;
  }
  static associate(db: DB) {
    db.Contract_address.hasMany(db.Votes, {
      foreignKey: "vote_id",
    });
  }
}

export default Contract_address;
