import "reflect-metadata"
import { DataSource } from "typeorm"
import { University } from "./entity/University"
import { Department } from "./entity/Department"
import { Specialization } from "./entity/Specialization"
import { Student } from "./entity/Student"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "sss",
    database: "university",
    synchronize: true,
    logging: false,
    entities: [University, Department, Specialization, Student],
    migrations: [],
    subscribers: [],
})
