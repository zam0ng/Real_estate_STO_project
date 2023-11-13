import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from "../models";

interface historyAttribute {
  dividend_id: number;
  user_email: string;
  real_estate_name: string;
  amount: number;
}

class PropertyOwnHistory extends Model<historyAttribute> {
  static initModel(sequelize: Sequelize): typeof PropertyOwnHistory {
    PropertyOwnHistory.init(
      {
        dividend_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        real_estate_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "Property_own_history",
        tableName: "property_own_history",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return PropertyOwnHistory;
  }
  static associate(db: DB) {
    db.Dividends.belongsTo(db.PropertyOwnHistory, {
      foreignKey: "dividend_id",
    });
  }
}

export default PropertyOwnHistory;
