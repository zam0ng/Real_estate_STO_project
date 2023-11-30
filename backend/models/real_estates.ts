import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface real_estatesAttribute {
  id?: number;
  subscription_id: number;
  real_estate_name: string;
  current_price: number;
  start_price: number;
  value: number;
  token_name: string;
}

class Real_estates extends Model<real_estatesAttribute> {
  declare id?: number;
  declare subscription_id: number;
  declare real_estate_name: string;
  declare current_price: number;
  declare start_price: number;
  declare value: number;
  declare token_name: string;
  static initModel(sequelize: Sequelize): typeof Real_estates {
    Real_estates.init(
      {
        subscription_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        real_estate_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        current_price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        start_price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        value: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        token_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Real_estates",
        tableName: "real_estates",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Real_estates;
  }
  static associate(db: DB) {
    db.Real_estates.belongsTo(db.Subscriptions, {
      foreignKey: "subscription_id",
    });
    db.Real_estates.hasMany(db.Real_estates_own, {
      foreignKey: "real_estate_id",
    });
  }
}

export default Real_estates;
