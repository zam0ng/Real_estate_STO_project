import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface subscriptions_ownAttribute {
  wallet: string;
  subscription_id: number;
  amount: number;
}

class Subscriptions_own extends Model<subscriptions_ownAttribute> {
  static initModel(sequelize: Sequelize): typeof Subscriptions_own {
    Subscriptions_own.init(
      {
        // 이거 user_wallet 으로 바꿔야함 ! 💪
        wallet: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subscription_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Subscriptions_own",
        tableName: "subscriptions_own",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Subscriptions_own;
  }
  static associate(db: DB) {
    db.Subscriptions_own.belongsTo(db.Subscriptions, {
      foreignKey: "subscription_id",
      targetKey: "id",
    });
  }
}

export default Subscriptions_own;
