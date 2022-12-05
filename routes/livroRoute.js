const express = require("express");
const routes = express.Router();
const LivroModel = require("../models/LivroModel");
const auth = require("../middlewares/autenticacao");

routes.get("/livro/listar", auth, async function (req, res) {
    const listaLivros = await LivroModel.find();
    res.render("livro_listar", { listaLivros });
})

routes.get("/livro/cadastrar", auth, function (req, res) {
    res.render("livro_cadastrar");
})

routes.post("/livro/cadastrar", auth, async function (req, res) {
    const dados = req.body;
    const novaPessoa = new LivroModel({
        codigo: dados.codigo,
        nome: dados.nome,
        autor: dados.autor
    });
    await novaPessoa.save();

    res.redirect("/livro/listar");
});

routes.get("/livro/detalhar/:codigo", auth, async function (req, res) {
    const codigo = req.params.codigo;
    const resultado = await LivroModel.findOne({ codigo: codigo });
    res.render("livro_detalhar", { resultado });
});

routes.get("/livro/atualizar/:codigo", auth, async function (req, res) {
    const codigo = req.params.codigo;
    const resultado = await LivroModel.findOne({ codigo: codigo });
    res.render("livro_atualizar", { resultado });
});

routes.post("/livro/atualizar/", auth, async function (req, res) {
    const livro = req.body;
    await LivroModel.findOneAndUpdate({ codigo: livro.codigo }, {
        nome: livro.nome,
        autor: livro.autor
    });
    res.redirect("/livro/listar");
});

routes.get("/livro/deletar/:codigo", auth, async function (req, res) {
    const codigo = req.params.codigo;
    await LivroModel.findOneAndDelete({ codigo: codigo });
    res.redirect("/livro/listar");
});

module.exports = routes;