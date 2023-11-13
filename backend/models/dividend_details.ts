import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface dividend_detailAttribute {
  real_estate_name: string;
  dividend_id: number;
  dividend_basedate: Date;
  dividend_paymentdate: Date;
  dividend_user_email: string;
  dividend_amount: number;
}

class Dividend_details extends Model<dividend_detailAttribute> {
  static initModel(sequelize: Sequelize): typeof Dividend_details {
    Dividend_details.init(
      {
        real_estate_name: { type: DataTypes.STRING, allowNull: false },
        dividend_id: { type: DataTypes.INTEGER, allowNull: false },
        dividend_basedate: { type: DataTypes.DATE, allowNull: false },
        dividend_paymentdate: { type: DataTypes.DATE, allowNull: false },
        dividend_user_email: { type: DataTypes.STRING, allowNull: false },
        dividend_amount: { type: DataTypes.INTEGER, allowNull: false },
      },
      {
        sequelize,
        modelName: "Dividend_details",
        tableName: "dividend_details",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Dividend_details;
  }
  static associate(db: DB) {
    db.Dividend_details.belongsTo(db.Dividends, {
      foreignKey: "dividend_id",
    });
  }
}

export default Dividend_details;
