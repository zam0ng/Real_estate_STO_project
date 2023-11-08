import { Sequelize, DataTypes, Model } from "sequelize";
import Orders from "./orders";
import { DB } from "../models/";

interface tradesAttributes {
  real_estate_name: string;
  buyer_order_id: number;
  seller_order_id: number;
  trade_price: number;
  trade_amount: number;
}

class Trades extends Model<tradesAttributes> implements tradesAttributes {
  real_estate_name!: string;
  buyer_order_id!: number;
  seller_order_id!: number;
  trade_price!: number;
  trade_amount!: number;

  static initModel(sequelize: Sequelize): typeof Trades {
    Trades.init(
      {
        real_estate_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        buyer_order_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        seller_order_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        trade_price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        trade_amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Trades",
        tableName: "trades",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );

    return Trades;
  }
  static associate(db: DB) {
    Trades.belongsTo(db.Orders, {
      foreignKey: "buyer_order_id",
      targetKey: "id",
    });
    Trades.belongsTo(db.Orders, {
      foreignKey: "seller_order_id",
      targetKey: "id",
    });
  }
}
export default Trades;