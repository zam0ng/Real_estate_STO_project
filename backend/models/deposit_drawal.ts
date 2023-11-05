import { Sequelize, DataTypes, Model } from "sequelize";

interface depositAttribute {
  real_estates_name: string;
  dividend_basedate: Date;
  dividend_paymentdate: Date;
  dividend_user_email: string;
  dividend_amount: number;
}

class Deposit_drawal extends Model<depositAttribute> {
  static initModel(sequelize: Sequelize): typeof Deposit_drawal {
    Deposit_drawal.init(
      {
        real_estates_name: {
          type: DataTypes.STRING,
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
        dividend_user_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dividend_amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Deposit_drawal",
        tableName: "deposit_drawal",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Deposit_drawal;
  }
}

export default Deposit_drawal;