import { Sequelize, DataTypes, Model } from "sequelize";
import { DB } from ".";

interface historyAttribute {
  dividend_id: number;
  user_email: string;
  real_estate_name: string;
  amount: number;
}

class Real_estates_own_history extends Model<historyAttribute> {
  static initModel(sequelize: Sequelize): typeof Real_estates_own_history {
    Real_estates_own_history.init(
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
        modelName: "Real_estates_own_history",
        tableName: "real_estates_own_history",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Real_estates_own_history;
  }
  static associate(db: DB) {
    db.Real_estates_own_history.belongsTo(db.Dividends, {
      foreignKey: "dividend_id",
    });
  }
}

export default Real_estates_own_history;
