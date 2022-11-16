var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 6;

    var idAquario = req.params.idAquario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idAquario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function alertar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var metrica = req.body.metricaServer;
    var frase = req.body.fraseServer;
    var componente = req.body.componenteServer;
    var totem = req.body.fkTotemServer;

    // Faça as validações dos valores

    if (metrica== undefined) {
        res.status(400).send("Dados não chegaram aqui.");
    } else if (frase == undefined) {
        res.status(400).send("Frase não chegou aqui.");
    } 
     else if (componente == undefined) {
        res.status(400).send("Componente não chegou aqui.");
    } 
     else if (totem == undefined) {
        res.status(400).send("Totem não definido.");
    } 
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js

    medidaModel.alertar(metrica, frase, componente, totem)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nNão passa da controller! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function buscarMedidasEmTempoReal(req, res) {

    var idAquario = req.params.idAquario;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function buscarMedidasTempoRealporTotem(req, res) {

    var fkTotem = req.params.fkTotem;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasTempoRealporTotem(fkTotem).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidaTotem(req, res) {
var fkTotem = req.params.fkTotem
    console.log(fkTotem)
    const limite_linhas = 6;


    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidaTotem(fkTotem, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimaMedidaDisco(req, res){
    var idAquario = req.params.idAquario;
    

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarUltimaMedidaDisco(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function mediaT1(req, res) {
        console.log(`Recuperando medidas em tempo real`);
    
        medidaModel.mediaT1().then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }

    function mediaT2(req, res) {
        console.log(`Recuperando medidas em tempo real`);
    
        medidaModel.mediaT2().then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }

    function mediaT3(req, res) {
        console.log(`Recuperando medidas em tempo real`);
    
        medidaModel.mediaT3().then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarUltimaMedidaDisco,
    buscarMedidaTotem,
    buscarMedidasTempoRealporTotem,
    mediaT1,
<<<<<<< HEAD
    alertar
=======
    mediaT2,
    mediaT3
>>>>>>> c899d3e197d699df8e5a2131be7ce0b74466ef41
}