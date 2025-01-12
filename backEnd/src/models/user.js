const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbconnect");
const sequelizeInstance = dbConnect.Sequelize;
class User extends Model {}
// Sequelize will create this table if it doesn't exist on startup
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "users", // uselowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = User;
// firstName:
//     lastName:
//     emailId:
//     password:
