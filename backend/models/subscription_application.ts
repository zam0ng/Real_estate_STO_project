import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface subscription_appAttribute {
  subscription_id: number;
  subscription_user_email: string;
  subscription_my_amount: number;
}

class Subscription_application extends Model<subscription_appAttribute> {
  declare subscription_id: number;
  declare subscription_user_email: string;
  declare subscription_my_amount: number;
  static initModel(sequelize: Sequelize): typeof Subscription_application {
    Subscription_application.init(
      {
        subscription_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        subscription_user_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subscription_my_amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Subscription_application",
        tableName: "subscription_application",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Subscription_application;
  }
  static associate(db: DB) {
    db.Subscription_application.belongsTo(db.Subscriptions, {
      foreignKey: "subscription_id",
    });
  }
}

export default Subscription_application;
