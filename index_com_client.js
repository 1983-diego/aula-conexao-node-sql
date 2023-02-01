const express = require('express')
const { Client } = require('pg')

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'aula_conexao_node_pg'
    })

    try {
        await client.connect()

        const resultado = await client.query('select * from empresas');

        await client.end();

        return res.json(resultado);
        //return res.json(resultado.rows)

    } catch (error){
        console.log(error.message);
    }
    
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})