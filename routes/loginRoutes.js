const express = require("express");
const routes = express.Router();
const Atendente = require("../models/PessoaModel");

routes.post("/login", async function (req, res) {
    const usuario = req.body;
    const atendente = await Atendente.findOne({ codigo: usuario.codigo });
    if (atendente) {
        if (usuario.codigo == atendente.codigo) {
            req.session.autenticacao = usuario.codigo;
            res.redirect("/");
        } else {
            res.render("login");
        }
    }
});

routes.get("/login", function (req, res) {
    if (req.session.autenticacao) {
        res.redirect("/");
    } else {
        res.render("login");
    }
});

module.exports = routes;