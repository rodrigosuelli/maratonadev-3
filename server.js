const express = require('express');
const app = express();

//*configurar o servidor para apresentar aquivos estáticos
app.use(express.static('public'));

//* habilitar body do formulário
app.use(express.urlencoded({ extended: true }));

//*configurar a conexão com o banco de dados
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});

//*configurando a template engine
const nunjucks = require('nunjucks');
nunjucks.configure('./', {
    express: app,
    noCache: true,
})

//*rotas
app.get('/', (req, res) => {
    db.query("SELECT * FROM donors", (err, result) => {
        if (err) return res.send('Erro de banco de dados');

        const donors = result.rows;
        res.render('index.html', { donors });
    })
});

app.post('/', (req, res) => {
    //pegar dados do formulário
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if (name == '' || email == '' || blood == '') {
        return res.send('Todos os campos são obrigatórios.');
    }

    //inserir valores no banco de dados
    const query = `INSERT INTO donors ("name", "email", "blood")
    VALUES ($1, $2, $3)`;

    const values = [name, email, blood];

    db.query(query, values, (err) => {
        if (err) return res.send('erro no banco de dados');

        return res.redirect('/');
    });

});

app.listen(3000);
