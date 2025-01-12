const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbconnect");
const sequelizeInstance = dbConnect.Sequelize;
class Following extends Model {}
// Sequelize will create this table if it doesn't exist on startup
Following.init(
  {
    follower: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    followee: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "following", // uselowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = Following;