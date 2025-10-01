// importando express
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
// cria aplicação
const app = express();
app.use(express.json());
app.use(cors());
// permite identação e
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

app.post("/alunos", async (req, res) => {
    try {
        const {
            nome,
            cpf,
            cep = null,
            uf = null,
            rua = null,
            numero = null,
            complemento = null
        } = req.body;

        // Validação obrigatória
        if (!nome || !cpf) {
            return res.status(400).json({ msg: "Nome e CPF são obrigatórios" });
        }

        // Inserção no banco
        const sql = `
            INSERT INTO alunos (nome, cpf, cep, uf, rua, numero, complemento)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const parametros = [nome, cpf, cep, uf, rua, numero, complemento];
        const [resultado] = await conexao.execute(sql, parametros);

        // Buscar aluno recém-inserido
        const [novo] = await conexao.execute(
            `SELECT * FROM alunos WHERE id = ?`,
            [resultado.insertId]
        );

        // Resposta com mensagem de sucesso + dados
        return res.status(201).json({
            "mensagem": "Aluno cadastrado com sucesso",
            aluno: novo[0]
        });

    } catch (error) {
        console.error("Erro ao inserir aluno:", error.message);
        return res.status(500).json({ erro: "Erro ao inserir aluno" });
    }
});



app.get("/alunos/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const [retorno] = await conexao.execute("SELECT * FROM alunos WHERE id = ?", [id]);
        res.status(220).json(retorno);
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro ao buscar aluno." });
    }
})



app.delete("/alunos/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const [resultado] = await conexao.execute("DELETE FROM alunos WHERE id = ?", [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }

        res.status(200).json({ msg: "Aluno excluído com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao excluir aluno" });
    }
});

app.put("/alunos/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { nome, cpf, cep = null, uf = null, rua = null, numero = null, complemento = null } = req.body;

        if (!nome || !cpf) 
            return res.status(400).json({ msg: "Nome e CPF são obrigatórios" });

        const sql = `
            UPDATE alunos
            SET nome = ?, cpf = ?, cep = ?, uf = ?, rua = ?, numero = ?, complemento = ?
            WHERE id = ?`;

        const parametros = [nome, cpf, cep, uf, rua, numero, complemento, id];

        const [resultado] = await conexao.execute(sql, parametros);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Aluno não encontrado" });
        }

        const [atualizado] = await conexao.execute(`SELECT * FROM alunos WHERE id = ${id}`);
        res.status(200).json(atualizado[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar aluno" });
    }
});



app.listen(porta, () => console.log(`Servidor rodando http://localhost:${porta}/`));


