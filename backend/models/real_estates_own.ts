import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface real_estates_ownAttribute {
  id?: number;
  user_email: string;
  wallet?: string;
  real_estate_id: number;
  real_estate_name: string;
  price: number;
  amount: number;
  possible_quantity: number;
}

class Real_estates_own extends Model<real_estates_ownAttribute> {
  declare id?: number;
  declare user_email: string;
  declare wallet: string;
  declare real_estate_id: number;
  declare real_estate_name: string;
  declare price: number;
  declare amount: number;
  declare possible_quantity: number;
  static initModel(sequelize: Sequelize): typeof Real_estates_own {
    Real_estates_own.init(
      {
        user_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        wallet: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        real_estate_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        real_estate_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        possible_quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Real_estates_own",
        tableName: "real_estates_own",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Real_estates_own;
  }
  static associate(db: DB) {
    db.Real_estates_own.belongsTo(db.Real_estates, {
      foreignKey: "real_estate_id",
      targetKey: "id",
    });
  }
}

export default Real_estates_own;
