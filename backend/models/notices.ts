import { Sequelize, DataTypes, Model } from "sequelize";

interface noticeAttribute {
  id? : number;
  category: string;
  notice_title: string;
  notice_content: string;
  notice_writer: string;
  real_estate_name : string;
}

class Notices extends Model<noticeAttribute> {
  static initModel(sequelize: Sequelize): typeof Notices {
    Notices.init(
      {
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        notice_title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        notice_content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        notice_writer: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        real_estate_name:{
          type: DataTypes.STRING,
          allowNull : false,
        }
      },
      {
        sequelize,
        modelName: "Notices",
        tableName: "notices",
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
    return Notices;
  }
}

export default Notices;