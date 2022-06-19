import { OperatorsAliases, Sequelize } from 'sequelize';
import config from "../config/db.config"
import Users from "./users.model"
const sequelize=new Sequelize(
    config.DB,config.User,config.Password
    ,{
        host:config.Host,
        dialect:"mysql",        
	    logging: config.Logging,
	    pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
	    }
})
const db:any={}
db.sequelize=sequelize;
db.Sequelize=Sequelize;
db.Users=Users(sequelize,Sequelize)

export default db
