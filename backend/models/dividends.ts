import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface dividendAttribute {
  real_estate_name: string;
  dividend_price: number;
  dividend_basedate: Date;
  dividend_paymentdate: Date;
  dividend_status?: string;
}

class Dividends extends Model<dividendAttribute> {
  declare real_estate_name: string;
  declare dividend_price: number;
  declare dividend_basedate: Date;
  declare dividend_paymentdate: Date;
  declare dividend_status?: string;

  static initModel(sequelize: Sequelize): typeof Dividends {
    Dividends.init(
      {
        real_estate_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dividend_price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        dividend_basedate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        dividend_paymentdate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        dividend_status: {
          type: DataTypes.STRING,
          defaultValue: "예정",
        },
      },
      {
        sequelize,
        modelName: "Dividends",
        tableName: "dividends",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Dividends;
  }
  static associate(db: DB) {
    db.Dividends.hasMany(db.Dividend_details, {
      foreignKey: "dividend_id",
    });
    db.Dividends.hasMany(db.Real_estates_own_history, {
      foreignKey: "dividend_id",
    });
  }
}

export default Dividends;
