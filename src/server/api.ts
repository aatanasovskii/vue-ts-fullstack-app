import {remultExpress} from "remult/remult-express";
import {Task} from "@/shared/task";
import {TasksController} from "@/shared/TasksController";
import { createPostgresConnection } from "remult/postgres";

export const api = remultExpress({
    entities: [Task],
    controllers: [TasksController],
    getUser: (req) => req.session!["user"],
    // dataProvider: createPostgresConnection({
    //     connectionString: process.env["POSTGRES_CONNECTION_STRING"] || "jdbc:postgresql://localhost:5432/postgres"
    // })
})
