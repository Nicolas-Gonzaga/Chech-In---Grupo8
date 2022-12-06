var database = require("../database/config")

function coletandoPortas() {
    var instrucao = `select top 7 idPorta, portaAberta from porta order by idPorta desc;`;
    return database.executar(instrucao);
}


module.exports = {
    coletandoPortas
};