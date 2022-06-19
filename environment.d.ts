declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT:string|undefined;
        db_host:string|undefined;
        user:string|undefined;
        db:string|undefined;
        dialect:string|undefined;
        JWT_SECRET_KEY:string;
      }
    }
}
export {}