import { DataTypes, Model, Sequelize } from "sequelize";
import Trades from "./trades";

interface OrdersAttributes {
  id? : number;
  user_email: string;
  real_estate_name: string;
  order_type: string;
  order_status: string;
  order_price: number;
  order_amount: number;
  possible_amount: number;
}

class Orders extends Model<OrdersAttributes> implements OrdersAttributes {
  id!: number;
  user_email!: string;
  real_estate_name!: string;
  order_type!: string;
  order_status!: string;
  order_price!: number;
  order_amount!: number;
  possible_amount!: number;

  static initModel(sequelize: Sequelize): typeof Orders {
    Orders.init(
      {
        id : {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        real_estate_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        order_type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        // 미체결 : 0, 체결 : 1 , 취소 : 2
        order_status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        order_price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        order_amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        possible_amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Orders",
        tableName: "orders",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );

    return Orders;
  }
  // static associate(db: { Trades: typeof Trades }) {
  //   Orders.hasMany(db.Trades, {
  //     foreignKey: "buyer_order_id",
  //     sourceKey: "id",
  //   });
  //   Orders.hasMany(db.Trades, {
  //     foreignKey: "seller_order_id",
  //     sourceKey: "id",
  //   });
  // }
}
export default Orders;
