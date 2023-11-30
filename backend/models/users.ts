import { Sequelize, Model, DataTypes } from "sequelize";
import { DB } from "../models";

interface UserAttributes {
  user_profile_img: string;
  user_email: string;
  wallet: string;
  balance: number;
  using_balance: number;
  blacklist: boolean;
  createdAt?: Date;
}

class Users extends Model<UserAttributes> {
  declare user_profile_img: string;
  declare user_email: string;
  declare wallet: string;
  declare balance: number;
  declare using_balance: number;
  declare blacklist: boolean;
  declare createdAt: Date;
  static initModel(sequelize: Sequelize): typeof Users {
    Users.init(
      {
        user_profile_img: {
          type: DataTypes.STRING,
        },
        user_email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        wallet: {
          type: DataTypes.STRING,
        },
        balance: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        using_balance: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
        blacklist: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        modelName: "Users",
        tableName: "users",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Users;
  }
  static associate(db: DB) {
    db.Users.hasMany(db.Vote_history, {
      foreignKey: "user_id",
    });
  }
}

export default Users;
