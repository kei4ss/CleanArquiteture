import {Author} from "../../domain/Entities/Author"
import {Quote} from "../../domain/Entities/Quote"
import { IAuthor } from "../../domain/Interfaces/IAuthor"
import { IAuthorRepository } from "../../domain/Interfaces/IAuthorRepository"

export class AuthorRepository implements IAuthorRepository {
  /**
   * Criar Autor
   *
   * Cria uma nova instância de Author no banco de dados
   * com os dados informados no payload.
   *
   * @param payload - Dados para criação do autor
   * @returns Retorna o autor criado
   */
    async create(payload: IAuthor): Promise<Author>{
        return Author.create(payload)
    }
    
    async findByPk(pk:number): Promise<Author | null>{
        return Author.findByPk(pk, {
            include: [
                {
                    model: Quote,
                    as: "quotes",
                    attributes: ["id", "quote"]
                }
            ]
        })
    }

    async findAll(): Promise<Author[]>{
        return Author.findAll()
    }

    async deleteByPk(pk:number): Promise<boolean>{
        if(await this.findByPk(pk)){
            await Author.destroy({where: {id: pk}})
            return true
        }
        return false
    }
}

export default new AuthorRepository();