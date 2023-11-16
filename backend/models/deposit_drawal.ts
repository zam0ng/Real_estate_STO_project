import { Sequelize, DataTypes, Model } from "sequelize";

interface depositAttribute {
  user_email: string;
  status: string;
  price: number;
  balance: number;
}

class Deposit_drawal extends Model<depositAttribute> {
  declare user_email: string;
  declare status: string;
  declare price: number;
  declare balance: number;
  static initModel(sequelize: Sequelize): typeof Deposit_drawal {
    Deposit_drawal.init(
      {
        user_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        balance: {
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
