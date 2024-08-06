const express = require(`express`);
const app = express();
const port = 3000;
const fs = require(`fs`);

app.use(express.json());
let contatos = require("./contactos.json");

app.get(`/`, (req, res) => {
  res.send(`voce esta na rota principal !!!`);
});
app.post(`/contatos/criar-contato`, (req, res) => {
  const { nome, email, id } = req.body;

  if (!id || !nome || !email) {
    return res.status(400).send("todos os dados devem estar preechidos");
  }
  contatos.push({
    id: parseInt(id),
    nome,
    email
  });
  fs.writeFileSync("./contactos.json", JSON.stringify(contatos));
  res.status(201).json(contatos);
});

app.put("/contatos/atualizar-contato/:id", (req, res) => {
  const { nome, email } = req.body;
  const index = contatos.findIndex((c) => c.id === parseInt(req.params.id));
  //se o contato for encontrado
  if (index != -1) {
    contatos[index].nome = nome;
    contatos[index].email = email;

    fs.writeFileSync("./contatos.json", JSON.stringify(contatos));
    res.status(201).json(contatos);
  } else {
    res.status(404).send("contatos nao enontrados");
  }
});

app.listen(port, () => {
  console.log("servidor rodando em htttp://localhost:3000/");
});
