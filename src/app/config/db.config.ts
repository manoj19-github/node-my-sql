export default{
    Host:"localhost",
    User:process.env.user??"root",
    Password:process.env.password??"",
    DB:process.env.db??"node-prac",
    Dialect:process.env.dialect??"mysql",
	Logging: true,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};

