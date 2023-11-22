import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface txReceiptAttribute {
  id: number;
  tx_block_id: number;
  tx_from: string;
  tx_to: string;
  tx_value: number;
  tx_symbol?: string;
}

class Tx_receipt extends Model<txReceiptAttribute> {
  declare id: number;
  declare tx_block_id: number;
  declare tx_from: string;
  declare tx_to: string;
  declare tx_value: number;
  declare tx_symbol?: string;
  static initModel(sequelize: Sequelize): typeof Tx_receipt {
    Tx_receipt.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        tx_block_id: {
          type: DataTypes.INTEGER,
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
  static associate(db: DB) {
    db.Tx_receipt.belongsTo(db.Tx_block, {
      foreignKey: "tx_block_id",
    });
  }
}

export default Tx_receipt;
