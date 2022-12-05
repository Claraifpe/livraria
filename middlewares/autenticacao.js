function verificarAutenticacao(request, response, next) {
    if (request.session.autenticacao != undefined) {
        next();
    } else {
        response.redirect("/login");
    }
};

module.exports = verificarAutenticacao; 