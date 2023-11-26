import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface txReceiptAttribute {
  id?: number;
  ca: string;
  tx_from: string;
  tx_to: string;
  tx_value: number;
  tx_symbol?: string;
  block_num: number;
  transmission?: string;
}

class Tx_receipt extends Model<txReceiptAttribute> {
  declare id: number;
  declare ca: string;
  declare tx_from: string;
  declare tx_to: string;
  declare tx_value: number;
  declare tx_symbol?: string;
  declare block_num: number;
  declare transmission?: string;
  static initModel(sequelize: Sequelize): typeof Tx_receipt {
    Tx_receipt.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ca: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tx_from: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tx_to: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tx_value: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tx_symbol: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        block_num: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        transmission: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "Tx_receipt",
        tableName: "tx_receipt",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Tx_receipt;
  }
  // static associate(db: DB) {
  //   db.Tx_receipt.belongsTo(db.Tx_block, {
  //     foreignKey: "tx_block_id",
  //   });
  // }
}

export default Tx_receipt;
