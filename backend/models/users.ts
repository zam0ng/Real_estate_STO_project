// Connect 파일이랑 다르게 한번 해봄

import { Sequelize, Model, DataTypes } from "sequelize";

interface UserAttributes {
  user_eamil: string;
  user_pw: string;
  wallet: string;
  balance: number;
  blacklist: boolean;
}

class Users extends Model<UserAttributes> {
  declare user_eamil: string;
  declare user_pw: string;
  declare wallet: string;
  declare balance: number;
  declare blacklist: boolean;
}

function userInitModel(sequelize: Sequelize) {
  Users.init(
    {
      user_eamil: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_pw: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wallet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      blacklist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
}

export { Users, userInitModel };
