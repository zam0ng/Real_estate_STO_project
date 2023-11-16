import { Sequelize, Model, DataTypes } from "sequelize";

interface UserAttributes {
  user_profile_img: string;
  user_email: string;
  user_pw: string;
  wallet: string;
  balance: number;
  using_balance: number;
  blacklist: boolean;
}

class Users extends Model<UserAttributes> {
  declare user_email: string;
  declare balance: number;
  declare using_balance: number;
  declare blacklist: boolean;
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
        using_balance: {
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
    return Users;
  }
}

export default Users;
