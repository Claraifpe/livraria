const express = require("express");
const session = require("express-session");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://beatriz:220104Bia_777@cluster0.evcl7jf.mongodb.net/?retryWrites=true&w=majority");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(session({
    secret: "123"
}));
app.use(express.static("public"));
//ROTAS
const auth = require("./middlewares/autenticacao");
app.use(require("./routes/livroRoute"));
app.use(require("./routes/atendenteRoute"));
app.use(require("./routes/loginRoutes"));


//PAGINA INICIAL
app.get("/", auth, function (req, res) {
    res.render("index");
});
//----------------------------

//ROTA DE ERRO
app.use(function (req, res) {
    res.status(404).render("404");
});

//ESCUTA
app.listen(999, function () {
    console.log("Servidor iniciado");
});