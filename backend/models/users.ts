import { Sequelize, Model, DataTypes } from "sequelize";

interface UserAttributes {
  user_eamil: string;
  user_pw: string;
  wallet: string;
  balance: number;
  using_balance: number;
  blacklist: boolean;
}

class Users extends Model<UserAttributes> {
  static initModel(sequelize: Sequelize): typeof Users {
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
          allowNull: false,
        },
        using_balance : {
          type: DataTypes.INTEGER,
          defaultValue : 0
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
    return Users;
  }
}

export default Users;
