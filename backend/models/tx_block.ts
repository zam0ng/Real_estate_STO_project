import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface txBlockAttribute {
  id: number;
  blocknumber: number;
}

class Tx_block extends Model<txBlockAttribute> {
  declare id: number;
  declare blocknumber: number;
  static initModel(sequelize: Sequelize): typeof Tx_block {
    Tx_block.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        blocknumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Tx_block",
        tableName: "tx_block",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Tx_block;
  }
  static associate(db: DB) {
    db.Tx_block.hasMany(db.Tx_receipt, {
      foreignKey: "tx_block_id",
    });
  }
}

export default Tx_block;
