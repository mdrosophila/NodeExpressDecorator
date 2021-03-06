import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

import { AppRouter } from "./AppRouter";
import "./controller/LoggingController";
import "./controller/RootController";

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieSession({ keys: ["this can be any string"] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
    console.log("listening on port 3000");
});