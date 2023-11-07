import {DataTypes, Model, Sequelize } from "sequelize";
import Trades  from "./trades";

interface OrdersAttributes {
    user_email : string,
    real_estates_name : string,
    order_type : string,
    order_status : string,
    order_price : Number,
    order_amount : Number,
    possible_amount : Number,
}

class Orders extends Model<OrdersAttributes> implements OrdersAttributes{
    user_email! : string;
    real_estates_name! : string;
    order_type! : string;
    order_status! : string;
    order_price! : Number;
    order_amount! : Number;
    possible_amount! : Number;


static initModel(sequelize : Sequelize): typeof Orders {
    
Orders.init(
    {
        user_email :{
            type : DataTypes.STRING,
            allowNull : false,
        },
        real_estates_name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        order_type : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        order_status : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        order_price : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        order_amount : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        possible_amount : {
            type : DataTypes.INTEGER,
            allowNull : false,
        }
    },{
        sequelize,
        underscored : false,
        timestamps : true,
        modelName : "Orders",
        tableName : "orders",
        charset : "utf8",
        collate : "utf8_general_ci"

    }
)
    
    return Orders;
}
    static associate(db : {Trades : typeof Trades}){
        Orders.hasMany(db.Trades, { foreignKey: 'buyer_order_id', sourceKey: 'id' });
        Orders.hasMany(db.Trades, { foreignKey: 'seller_order_id', sourceKey: 'id' });
    }
}
export default Orders;