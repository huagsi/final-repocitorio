import { PoolClient, Pool } from 'pg';
//SINGLETHON FOR CONNECTION
export class PostgresConnection {
    private static connection: Pool = undefined;
    private client: PoolClient;
    private static _instance: PostgresConnection;

    private constructor() { }

    static getConnection() {
        if (!PostgresConnection.connection) {    
            PostgresConnection.connection = new Pool({
                host: process.env.DB_HOST,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                user: process.env.DB_USER,
                ssl: {
                    rejectUnauthorized: false,
                  }
            });
            PostgresConnection._instance = new PostgresConnection();
        }
        return PostgresConnection._instance;
    }

    connect() {
        return PostgresConnection.connection.connect().then((response)=>{
            this.client = response;
        });   
    }

    execute(sql: string, values: any[] = []) {        
        return this.client.query({
            text: sql,
            values
        });
    }
}