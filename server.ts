import {setupAssociations} from "./src/infraestructure/assossiations/associations"

import app from "./src/app"
import sequelize from "./src/infraestructure/database/database"

const PORT:number = 3000

const bootstrap = async() => {
    try{
        console.log("🎲🎲 CONFIGURAÇÃO DE BANCO DE DADOS 🎲🎲")

        // Autenticar e sincronizar banco de dados
        await sequelize.authenticate()
        console.log(" ✅ Banco de dados conectado!")

        // Carrega as associações
        setupAssociations()
        console.log(" ✅ Associações criadas")

        // e sincroniza os modelos do banco de dados
        await sequelize.sync();
        console.log(" ✅ Modelos sincronizados!")

        console.log("\n")

        console.log("😬 INICIANDO SERVIDOR 😬")
        app.listen(PORT, ()=>{
            console.log(` 😁 Servidor rodando em http://localhost:${PORT} 😁`)
        })
    }catch(err){
        const error = err instanceof Error ? err : new Error(String(err));
        console.log("😡 Um erro ocorreu ao iniciar o servidor: ", error);
        process.exit(1)
    }
}

bootstrap();