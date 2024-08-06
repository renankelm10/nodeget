const http = require(`http`)

const server = http.createServer((req, res) => {

  res.statusCode = 200; 
  res.setHeader(`content-type`, `text/plain` );
  res.end(`hello-word\n`); 
})
server.listen(3000, "127.0.0.1", () => {

    console.log("servidor rodando em htttp://localhost:3000/");
})