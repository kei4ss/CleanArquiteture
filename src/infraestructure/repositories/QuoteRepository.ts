import Quote from "../../domain/Entities/Quote"
import { Author } from "../../domain/Entities/Author";
import {IQuote} from "../../domain/Interfaces/IQuote"
import {IQuoteRepository} from "../../domain/Interfaces/IQuoteRepository"

export class QuoteRepository implements IQuoteRepository {
  /**
   * Criar citação
   *
   * @param payload - Dados da citação
   * @returns Retorna a citação criada
   */
  async create(payload: IQuote): Promise<Quote> {
    return Quote.create(payload);
  }
 
  /**
   * Encontrar citação pelo ID
   *
   * @param pk - ID da citação
   * @returns Retorna a citação ou null se não encontrada
   */
  async findByPk(pk: number): Promise<Quote | null> {
    return Quote.findByPk(pk, {
      attributes: ["id", "quote"],
      include:[
        {
          model: Author,
          as: "said_by",
          attributes: ["id", "name"]
        }
      ],
    });
  }
 
  /**
   * Encontrar todas as citações
   *
   * @returns Retorna lista de citações
   */
  async findAll(): Promise<Quote[]> {
    return Quote.findAll();
  }
 
  /**
   * Deletar citação pelo ID
   *
   * @param pk - ID da citação
   * @returns Retorna true se deletada, false caso contrário
   */
  async delete(pk: number): Promise<boolean> {
    const quote = await this.findByPk(pk);
    if (quote) {
      await Quote.destroy({ where: { id: pk } });
      return true;
    }
    return false;
  }
}

export default new QuoteRepository()