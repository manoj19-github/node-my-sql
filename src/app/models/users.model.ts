import {Model} from "sequelize"
import bcrypt from "bcryptjs"
interface UsersInterface{
    id:string;
    name:string;
    email:string;
    password:string;
}

class Users extends Model<UsersInterface> implements UsersInterface{
    public id!:string;
    public name!:string;
    public email!:string;
    public password!:string;
}

export default (sequelize: any, DataTypes: any) => {
    Users.init({
        id:{
            type:DataTypes.STRING(50),
            allowNull: false,
			primaryKey: true,
            
			autoIncrement: false,
			field: 'id'
        },
        name:{
            type:DataTypes.STRING(50),
            allowNull: false,
			primaryKey: false,
			autoIncrement: false,
			field: 'name'
        },
        email:{
            type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: '',
			primaryKey: false,
			autoIncrement: false,
			field: 'email'
        },
        password:{
            type: DataTypes.STRING(100),
			allowNull: false,
			defaultValue: '',
            set(value:string){
                !!value && this.setDataValue("password",bcrypt.hashSync(value,10))
            },
			primaryKey: false,
			autoIncrement: false,
			field: 'password'

        }
    },{
        sequelize,
        paranoid:true,
        modelName: 'Users',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
        deletedAt:'deleted_at'
    })
    return Users
}

