import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface subscriptions_ownAttribute {
  user_email: string;
  subscriptions_id: number;
  amount: number;
}

class Subscriptions_own extends Model<subscriptions_ownAttribute> {
  static initModel(sequelize: Sequelize): typeof Subscriptions_own {
    Subscriptions_own.init(
      {
        user_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subscriptions_id: {
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
      foreignKey: "subscriptions_id",
      targetKey: "id",
    });
  }
}

export default Subscriptions_own;
