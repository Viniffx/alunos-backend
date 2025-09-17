// importando express
const express = require("express");
const mysql = require("mysql2/promise");
// cria aplicação
const app = express();
// formata o json
app.set('json spaces', 2)
app.use(express.json())
const porta = 3000;
const conexao = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "senai2025",
    database: "escola_db",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

app.get("/alunos", async (req, res) => {
    try {
        const [retorno] = await conexao.query("SELECT * FROM alunos")
        //console.log(retorno)
        res.status(200).json(retorno)
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro ao consultar alunos."})
    } 
})

/*app.get("/alunos/:id",(req,res) =>{
    const id = parseInt(req.params.id)
    const aluno = alunos.find( (aluno => aluno.id === id))    
    if(aluno){
        res.json(aluno)
    }else{
        res.status(404).json(
            {erro: "Aluno não encontrado"}
        )
    }
})*/


app.post("/alunos", async (req, res) => {
    try {
        const {nome, cpf, cep= null,
            uf = null, rua = null,
            numero = null, complemento= null
        } = req.body;

        if(!nome || !cpf) 
            return res.status(400).json({msg : "Nome e cpf são obrigatorio"})
        const sql = `
            INSERT INTO alunos (nome,cpf,cep, uf, rua , numero, complemento)
            VALUES  (?, ?, ?, ?, ?, ?, ?)`;

        const parametro = [nome, cpf, cep, uf, rua, numero, complemento]

        const [resultado] = await conexao.execute(sql,parametro)
        console.log(resultado)

        const [novo] = await conexao.execute(`SELECT * FROM alunos WHERE id =  ${resultado.insertId}`)
        res.status(201).json(novo[0]);
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({erro : "Erro ao inserir alunos"});
    }

})

/*app.delete("/alunos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const indice = alunos.findIndex(a => a.id === id)
    if( indice === -1){
        return res.status(404).json({
            mensagem :"Aluno não encontrado"
        })
    }
    console.log(indice)
    alunos.splice(indice,1);
    res.status(204).json({
        mensagem: "Aluno deletado com sucesso!"
    }) 
})*/

app.listen(porta, () => console.log(`Servidor rodando http://localhost:${porta}/`));