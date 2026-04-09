import { Router, Request, Response} from "express";

import { AuthorService } from "../../application/AuthorService";
import AuthorRepository  from "../../infraestructure/repositories/AuthorRepository";
import { Result } from "src/application/Result";
import {handleServiceResult, sendError} from "../../application/utils/controllerUtils"

const authorService = new AuthorService(AuthorRepository);
const AuthorController:Router = Router()

// GET /api/authors/
AuthorController.get("/", async (req:Request, res:Response)=>{
    try{
        const result:Result = await authorService.getAllAuthors()
        return handleServiceResult(res, result)
    }catch(err){
        const error = err instanceof Error ? err : Error(String(err))
        console.error("Erro ao retornar todos os autores! ", error)
        sendError(res, 500, "Problemas encontrados ao retornar autores")
    }
})

// GET /api/authors/:id
AuthorController.get("/:id", async (req:Request, res:Response)=>{
    try{
        const {id} = req.params
        const numberId:number = Number(id)
        const result:Result = await authorService.getById(numberId)
        return handleServiceResult(res, result)
    }catch(err){
        const error = err instanceof Error ? err : Error(String(err))
        console.error("Erro ao retornar autor ", error)
        sendError(res, 500, "Problemas encontrados ao retornar autor")
    } 
})

// POST /api/authors/
AuthorController.post("/", async (req:Request, res:Response)=>{
    try{
        const body = req.body;
        const result = await authorService.createAuthor(body)
        return handleServiceResult(res, result)
    }catch(err){
        const error = err instanceof Error ? err : Error(String(err))
        console.error("Erro ao criar um novo autor ", error)
        sendError(res, 500, "Problemas encontrados ao criar novo autor")
    }
})

// DELETE /api/authors/:id
AuthorController.delete("/:id", async (req:Request, res: Response)=>{
    try{
        const id = Number(req.params.id)
        const result = await authorService.deleteAuthor(id)
        return handleServiceResult(res, result)
    }catch(err){
        const error = err instanceof Error ? err : Error(String(err))
        console.error(`[${new Date()}] ERRO: deletar usuário`, error)
        sendError(res, 500, "Erro ao iniciar processo de exclusão")
    }
})

export default AuthorController