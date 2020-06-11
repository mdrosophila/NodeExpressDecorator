import {Response, Request, NextFunction} from "express";
import {get, post, controller, use, bodyValidator} from "./decorators";

function logger(req: Request, res: Response, next: NextFunction) {
    console.log("Request was made!");
    next();
}

@controller("/auth")
class LoggingController {
    @get("/login")
    @use(logger)
    getLogin(req: Request, res: Response): void {
        res.send(`
    <form method="POST">
        <div>
            <label>Email</label>
            <input name="email" />
        </div>
        <div>
            <label>Password</label>
            <input name="password" type="password" />
        </div>
        <button>Submit</button>
    </form>
        `);
    }
    @post("/login")
    @bodyValidator("email", "password")
    postLogin (req: Request, res: Response): void {
        const { email, password } = req.body;
        if (email && password && email === "hi@hi.com" && password === "password") {
            if (req.session) {
                req.session.loggedIn = true;
            }
            res.redirect("/");
        }
        else {
            res.send("Invalid email or password");
        }
    }

    @get("/logout")
    getLogout (req: Request, res: Response) {
        if (req.session) {
            req.session.loggedIn = null;
        }
        res.redirect("/");
    }
}

