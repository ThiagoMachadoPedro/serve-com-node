baixar packot json
npm init

instalar express para gerenciar aplicação web
install express --save


para nossa apricação não para no servidor
npm install nodemon -g

para rodar servidor nodemon index.js


facilitador de ciriar varias rotas
npm install consign --save

const express = require('express')
const consign = require('consign')
const bodyParse = require('body-parser');


let app = express();


app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

consign().include('routes').into(app);


app.listen(3000, "127.0.0.1", () => {
  console.log("servidor rodando");
});



//instalando baco NEDB
npm install nedb --save

let NeDB = require('nedb');
let db = new NeDB({
  filename:'user.db',
  autoload: true,
});

//validação de dados antes do post
npm install express-validator --save
