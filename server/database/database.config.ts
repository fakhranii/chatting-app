import "reflect-metadata";
import { DataSource } from "typeorm";

export const DataBaseSource = new DataSource({
    type: "mysql", // Change this to your database type, e.g., 'mysql'
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // Set to false in production
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // logging: true,
    // entities: [__dirname + '/../entities/*.entity{.ts,.js}'],

    // subscribers: [],
    // migrations: [],
});

export function DatabaseConnection() {
    // DataBaseSource.connect(); // Deprecated: use .initialize method instead
    DataBaseSource.initialize()
        .then(() => {
            console.log("Database connected! Database Name: " + process.env.DB_NAME);
        })
        .catch((error) => console.error("Error during Data Source initialization:", error));
}
