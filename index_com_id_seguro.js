const express = require('express')
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'aula_conexao_node_pg'
});

const app = express()

app.use(express.json())

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'select * from empresas where id = $1 or id = $2';
        const params = [id, 2];

        const resultado = await pool.query(query, params);

        return res.json(resultado.rows[0])

    } catch (error){
        console.log(error.message);
    }
    
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})