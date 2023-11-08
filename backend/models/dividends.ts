import { Sequelize, DataTypes, Model } from "sequelize";

interface dividendAttribute {
  real_estate_name: string;
  dividend_price: number;
  dividend_basedate: Date;
  dividend_paymentdate: Date;
}

class Dividends extends Model<dividendAttribute> {
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
}

export default Dividends;
