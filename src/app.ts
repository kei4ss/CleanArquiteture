import express, {Express, Router, Request, Response} from "express";
import AuthorController from "./presentation/controllers/AuthorController";
import QuoteController from "./presentation/controllers/QuoteController";

const app: Express = express()
app.use(express.json())

// Rotas da API
const routes = Router()
routes.use("/authors", AuthorController)
routes.use("/quotes", QuoteController)

// Começo de rota para acessar os enpoints
app.use("/api", routes)


export default app