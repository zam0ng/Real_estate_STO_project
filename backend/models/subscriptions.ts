import { Sequelize, DataTypes, Model, Association } from "sequelize";
import { DB } from "../models";

// typescirpt는 enum에 관한 지식이 없답니다
export enum status_enum {
  pending = "pending", // 청약 시작 전
  start = "start", // 청약 시작
  success = "success", // 청약 성공
  failure = "failure", // 청약 실패
}

interface SubscriptionsAttribute {
  id?: number;
  subscription_img_1: string;
  subscription_img_2: string;
  subscription_img_3: string;
  subscription_img_4: string;
  subscription_img_5: string;
  subscription_name: string;
  subscription_symbol: string;
  subscription_address: string;
  subscription_totalprice: bigint;
  subscription_totalsupply: number;
  subscription_description: string;
  subscription_start_date: Date;
  subscription_end_date: Date;
  subscription_result_date: Date;
  subscription_building_date: Date;
  subscription_trading_start_date: Date;
  subscription_order_amount: number;
  subscription_offering_price: number;
  subscription_status: string;
  floors: string;
  purpose: string;
  main_purpose: string;
  area: number;
  all_area: number;
  build_area: number;
  floor_area: number;
  completion: Date;
  stock_type: string;
  publisher: string;
}

class Subscriptions extends Model<SubscriptionsAttribute> {
  declare id: number;
  declare subscription_name: string;
  declare subscription_symbol: string;
  declare subscription_offering_price: number;
  declare subscription_img_1: string;
  declare subscription_img_2: string;
  declare subscription_img_3: string;
  declare subscription_img_4: string;
  declare subscription_img_5: string;
  declare subscription_start_date: Date;
  declare subscription_end_date: Date;
  declare subscription_result_date: Date;
  declare subscription_building_date: Date;
  declare subscription_trading_start_date: Date;
  declare completion: Date;
  static initModel(sequelize: Sequelize): typeof Subscriptions {
    Subscriptions.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        subscription_img_1: {
          type: DataTypes.STRING,
        },
        subscription_img_2: {
          type: DataTypes.STRING,
        },
        subscription_img_3: {
          type: DataTypes.STRING,
        },
        subscription_img_4: {
          type: DataTypes.STRING,
        },
        subscription_img_5: {
          type: DataTypes.STRING,
        },
        subscription_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subscription_symbol: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subscription_address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subscription_totalprice: {
          type: DataTypes.BIGINT,
          defaultValue: 0,
        },
        subscription_totalsupply: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        subscription_description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        subscription_start_date: { type: DataTypes.DATE, allowNull: false },
        subscription_end_date: { type: DataTypes.DATE, allowNull: false },
        subscription_result_date: { type: DataTypes.DATE, allowNull: false },
        subscription_building_date: { type: DataTypes.DATE, allowNull: false },
        subscription_trading_start_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        subscription_order_amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        subscription_offering_price: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        subscription_status: {
          type: DataTypes.ENUM,
          values: ["pending", "start", "success", "failure"],
          allowNull: false,
        },
        floors: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        purpose: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        main_purpose: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        area: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        all_area: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        build_area: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        floor_area: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        completion: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        stock_type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        publisher: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Subscriptions",
        tableName: "subscriptions",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Subscriptions;
  }

  static associate(db: DB) {
    db.Subscriptions.hasMany(db.Subscriptions_own, {
      foreignKey: "subscription_id",
    });
    db.Subscriptions.hasMany(db.Real_estates, {
      foreignKey: "subscription_id",
    });
    db.Subscriptions.hasMany(db.Subscription_application, {
      foreignKey: "subscription_id",
    });
  }
}

export default Subscriptions;
