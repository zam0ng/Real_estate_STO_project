import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface real_estatesAttribute {
  subscription_id: number;
  real_estate_name: string;
  currentPrice: number;
  startPrice: number;
  value: BigInt;
}

class Real_estates extends Model<real_estatesAttribute> {
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
        currentPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        startPrice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        value: {
          type: DataTypes.BIGINT,
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
