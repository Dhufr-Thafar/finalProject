const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbconnect");
const sequelizeInstance = dbConnect.Sequelize;

class Post extends Model { }
// Sequelize will create this table if it doesn't exist on startup
    Post.init({
        user: {
            type: DataTypes.STRING, 
            allowNull: false, 
            required: true
        },

        tweet: {
            type: DataTypes.STRING, 
            allowNull: false, 
            required: true
        }
    },
    {
        sequelize: sequelizeInstance, modelName: 'posts', // uselowercase plural format
        timestamps: true, 
        freezeTableName: true
    }
)
module.exports = Post;
// firstName: 
//     lastName: 
//     emailId: 
//     password: