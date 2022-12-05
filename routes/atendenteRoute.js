const express = require("express");
const routes = express.Router();
const PessoaModel = require("../models/PessoaModel");
const auth = require("../middlewares/autenticacao");

routes.get("/atendente/listar", auth, async function (req, res) {
    const listaPessoas = await PessoaModel.find();
    res.render("atendente_listar", { listaPessoas });
})

routes.get("/atendente/cadastrar", auth, function (req, res) {
    res.render("atendente_cadastrar");
})

routes.post("/atendente/cadastrar", auth, async function (req, res) {
    const dados = req.body;
    const novaPessoa = new PessoaModel({
        codigo: dados.codigo,
        nome: dados.nome,
        idade: dados.idade
    });
    await novaPessoa.save();
    res.redirect("/atendente/listar");
});

routes.get("/atendente/detalhar/:codigo", auth, async function (req, res) {
    const codigo = req.params.codigo;
    const resultado = await PessoaModel.findOne({ codigo: codigo });
    res.render("atendente_detalhar", { resultado });
});

routes.get("/atendente/atualizar/:codigo", auth, async function (req, res) {
    const codigo = req.params.codigo;
    const resultado = await PessoaModel.findOne({ codigo: codigo });
    res.render("atendente_atualizar", { resultado });
});

routes.post("/atendente/atualizar/", auth, async function (req, res) {
    const atendente = req.body;
    await PessoaModel.findOneAndUpdate({ codigo: atendente.codigo }, {
        nome: atendente.nome,
        idade: atendente.idade
    });
    res.redirect("/atendente/listar");
});

routes.get("/atendente/deletar/:codigo", auth, async function (req, res) {
    const codigo = req.params.codigo;
    await PessoaModel.findOneAndDelete({ codigo: codigo });
    res.redirect("/atendente/listar");
});

module.exports = routes;