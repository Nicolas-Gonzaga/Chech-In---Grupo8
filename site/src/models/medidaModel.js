var database = require("../database/config");


function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} cpuPercent, ramPercent, horario as horarioF 
        from LoocaLeitura join Leitura on fkLeitura = Leitura.idLeitura order by fkLeitura 
        desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = /* `select 
        REGISTRO_TEMP, 
        REGISTRO_UMID, 
        REGISTRO_MOMENTO,
        date_format(momento, '%H:%i:%s') as momento_grafico
    from registros  
    order by idRegistros desc limit ${limite_linhas}` */
            `select cpuPercent, ramPercent, horario, date_format(horario, '%H:%i') as horarioF from LoocaLeitura join Leitura on fkLeitura = idLeitura order by fkLeitura desc limit ${limite_linhas}`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarMedidaTotem(fkTotem, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas} cpuPercent, ramPercent, horario as horarioF from 
        LoocaLeitura join Leitura on fkLeitura = Leitura.idLeitura where fkTotem = ${fkTotem} 
        order by fkLeitura desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = /* `select 
        REGISTRO_TEMP, 
        REGISTRO_UMID, 
        REGISTRO_MOMENTO,
        date_format(momento, '%H:%i:%s') as momento_grafico
    from registros  
    order by idRegistros desc limit ${limite_linhas}` */
            `select cpuPercent, ramPercent, horario, date_format(horario, '%H:%i') as horarioF from LoocaLeitura join Leitura on fkLeitura = idLeitura where fkTotem = ${fkTotem} order by fkLeitura desc limit ${limite_linhas}`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function alertar(metrica, frase, componente, totem, fkempresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificar():", metrica, frase, componente, totem, fkempresa);


    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `

        INSERT INTO alerta ( empresa, componente,metrica, descricao, fkTotem) VALUES ( (select nomeEmpresa from empresa where idEmpresa = ${fkempresa}), '${componente}', '${metrica}', '${frase}', '${totem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 cpuPercent, ramPercent, horario as horarioF from 
        LoocaLeitura join Leitura on fkLeitura = Leitura.idLeitura order by fkLeitura;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        // if(local == "dashboardTeste.html"){
        instrucaoSql = /* `select 
        REGISTRO_TEMP, 
        REGISTRO_UMID, 
        REGISTRO_MOMENTO,
        DATE_FORMAT(REGISTRO_MOMENTO,'%H:%i:%s') as momento_grafico
    from registros  
    order by idRegistros desc limit 1` */
            `select cpuPercent, ramPercent, horario, date_format(horario, '%H:%i') as horarioF from LoocaLeitura join Leitura on fkLeitura = idLeitura order by idLeitura desc limit 1`;
        // } else if(window.location.href == "totem1.html"){
        //     instrucaoSql = /* `select 
        //     REGISTRO_TEMP, 
        //     REGISTRO_UMID, 
        //     REGISTRO_MOMENTO,
        //     DATE_FORMAT(REGISTRO_MOMENTO,'%H:%i:%s') as momento_grafico
        // from registros  
        // order by idRegistros desc limit 1` */
        // `select cpuPercent, ramPercent, horario, date_format(horario, '%H:%i') as horarioF from LoocaLeitura join Leitura on fkLeitura = idLeitura join totem on fkTotem = idTotem where fkTotem = 50000  order by idLeitura desc limit 1` ;

        // 
    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarMedidasTempoRealporTotem(fkTotem) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 cpuPercent, ramPercent, horario as horarioF from 
        LoocaLeitura join Leitura on fkLeitura = Leitura.idLeitura where fkTotem = ${fkTotem} 
        order by Leitura.idLeitura desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        // if(local == "dashboardTeste.html"){
        instrucaoSql = /* `select 
        REGISTRO_TEMP, 
        REGISTRO_UMID, 
        REGISTRO_MOMENTO,
        DATE_FORMAT(REGISTRO_MOMENTO,'%H:%i:%s') as momento_grafico
    from registros  
    order by idRegistros desc limit 1` */
            `select cpuPercent, ramPercent, horario, date_format(horario, '%H:%i') as horarioF from LoocaLeitura join Leitura on fkLeitura = idLeitura where fkTotem = ${fkTotem} order by idLeitura desc limit 1`;
        // } else if(window.location.href == "totem1.html"){
        //     instrucaoSql = /* `select 
        //     REGISTRO_TEMP, 
        //     REGISTRO_UMID, 
        //     REGISTRO_MOMENTO,
        //     DATE_FORMAT(REGISTRO_MOMENTO,'%H:%i:%s') as momento_grafico
        // from registros  
        // order by idRegistros desc limit 1` */
        // `select cpuPercent, ramPercent, horario, date_format(horario, '%H:%i') as horarioF from LoocaLeitura join Leitura on fkLeitura = idLeitura join totem on fkTotem = idTotem where fkTotem = 50000  order by idLeitura desc limit 1` ;

        // 
    }
    else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimaMedidaDisco(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 diskPercent from LoocaLeitura join Leitura on Leitura.idLeitura = fkLeitura order by Leitura.idLeitura;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = /* `select 
        REGISTRO_TEMP, 
        REGISTRO_UMID, 
        REGISTRO_MOMENTO,
        DATE_FORMAT(REGISTRO_MOMENTO,'%H:%i:%s') as momento_grafico
    from registros  
    order by idRegistros desc limit 1` */
            `select diskPercent from LoocaLeitura join Leitura on idLeitura = fkLeitura order by idLeitura desc limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mediaT1() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Leitura.fkTotem, LoocaLeitura.idLeitura, LoocaLeitura.cpuPercent, LoocaLeitura.diskPercent, 
        LoocaLeitura.ramPercent from LoocaLeitura join Leitura on fkLeitura = Leitura.idLeitura where Leitura.fkTotem = 50000;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = /* `select 
        REGISTRO_TEMP, 
        REGISTRO_UMID, 
        REGISTRO_MOMENTO,
        DATE_FORMAT(REGISTRO_MOMENTO,'%H:%i:%s') as momento_grafico
    from registros  
    order by idRegistros desc limit 1` */
            `select fkTotem, idLeitura, cpuPercent, diskPercent, ramPercent from Leitura join LoocaLeitura on fkLeitura = idLeitura where fkTotem = 50000;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mediaT2() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Leitura.fkTotem, LoocaLeitura.idLeitura, LoocaLeitura.cpuPercent, LoocaLeitura.diskPercent, 
        LoocaLeitura.ramPercent from LoocaLeitura join Leitura on fkLeitura = Leitura.idLeitura where Leitura.fkTotem = 50001;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = /* `select 
        REGISTRO_TEMP, 
        REGISTRO_UMID, 
        REGISTRO_MOMENTO,
        DATE_FORMAT(REGISTRO_MOMENTO,'%H:%i:%s') as momento_grafico
    from registros  
    order by idRegistros desc limit 1` */
            `select fkTotem, idLeitura, cpuPercent, diskPercent, ramPercent from Leitura join LoocaLeitura on fkLeitura = idLeitura where fkTotem = 50000;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mediaT3() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Leitura.fkTotem, LoocaLeitura.idLeitura, LoocaLeitura.cpuPercent, LoocaLeitura.diskPercent, 
        LoocaLeitura.ramPercent from LoocaLeitura join Leitura on fkLeitura = Leitura.idLeitura where Leitura.fkTotem = 50002;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = /* `select 
        REGISTRO_TEMP, 
        REGISTRO_UMID, 
        REGISTRO_MOMENTO,
        DATE_FORMAT(REGISTRO_MOMENTO,'%H:%i:%s') as momento_grafico
    from registros  
    order by idRegistros desc limit 1` */
            `select fkTotem, idLeitura, cpuPercent, diskPercent, ramPercent from Leitura join LoocaLeitura on fkLeitura = idLeitura where fkTotem = 50000;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dadosHistorico(limite_linhas, fkTotem) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 6 dia, horario, fkTotem, cpuPercent, ramPercent, diskPercent from Leitura 
        join LoocaLeitura on Leitura.idLeitura = LoocaLeitura.fkLeitura 
        where convert(date, dia) = convert(date, getdate()) and fkTotem = ${fkTotem};`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = /* `select 
        REGISTRO_TEMP, 
        REGISTRO_UMID, 
        REGISTRO_MOMENTO,
        date_format(momento, '%H:%i:%s') as momento_grafico
    from registros  
    order by idRegistros desc limit ${limite_linhas}` */
            `select cpuPercent, ramPercent, horario, date_format(horario, '%H:%i') as horarioF from LoocaLeitura join Leitura on fkLeitura = idLeitura order by fkLeitura desc limit ${limite_linhas}`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasMapas() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select t1.*, t4.idUnidade, t4.localUnidade, t5.nomeEmpresa from geolocalizationLeitura t1
        inner join (select max(idLocalization) as idLocalization from geolocalizationLeitura GROUP BY fkTotem) t2
            on t1.idLocalization = t2.idLocalization
        join Totem t3
            on t3.idTotem = t1.fkTotem
        join Unidade t4
            on t3.fkUnidade = t4.idUnidade
        join Empresa t5
            on t4.fkEmpresa = t5.idEmpresa`
    } else {
        console.log("\nEsta API só suporta rodar em ambiente cloud\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function variacaoCordsMapas(valor) {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select t1.* from geolocalizationLeitura t1
        inner join (select max(idLocalization) as idLocalization from geolocalizationLeitura GROUP BY fkTotem, dia) t2
            on t1.idLocalization = t2.idLocalization${valor};`
    } else {
        console.log("\nEsta API só suporta rodar em ambiente cloud\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function temperaturaComparativaMapas() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select t2.minimo, t2.valor, t2.maximo, t1.dia, t2.nome, t1.fkTotem from
        (select idLeitura, t1.horario, t1.dia, t1.fkTotem from
            (select fkTotem, max(horario) as horario, dia from crawlerLeitura, Leitura where crawlerLeitura.fkLeitura = Leitura.idLeitura group by dia, fkTotem)
        t1 join Leitura t2
        on t1.horario = t2.horario and t1.dia = t2.dia) t1
        join crawlerLeitura t2
        on t1.idLeitura = t2.fkLeitura where nome = 'CPU Core' order by t1.dia desc`
    } else {
        console.log("\nEsta API só suporta rodar em ambiente cloud\n")
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function checarMediasTempTotens() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select avg(valor) as media, fkTotem from crawlerLeitura, Leitura where crawlerLeitura.fkLeitura = Leitura.idLeitura and nome = 'CPU Core' group by fkTotem`
    } else {
        console.log("\nEsta API só suporta rodar em ambiente cloud\n")
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}


function buscarEmpresa(fkempresa) {
    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1 diskPercent from LoocaLeitura join Leitura on Leitura.idLeitura = fkLeitura order by Leitura.idLeitura;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = /* `select 
        REGISTRO_TEMP, 
        REGISTRO_UMID, 
        REGISTRO_MOMENTO,
        DATE_FORMAT(REGISTRO_MOMENTO,'%H:%i:%s') as momento_grafico
    from registros  
    order by idRegistros desc limit 1` */
            `select nomeEmpresa from empresa where idEmpresa = ${fkempresa}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function processos() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select * from Processos as t1 join (select distinct Nome, max(id) as id from Processos group by Nome) as t2 on t1.id = t2.id;`
    } else {
        console.log("\nEsta API só suporta rodar em ambiente cloud\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function processosTOP() {
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 3 * from Processos as t1 join (select distinct Nome, max(id) as id from Processos group by Nome) as t2 on t1.id = t2.id order by t1.id desc`
    } else {
        console.log("\nEsta API só suporta rodar em ambiente cloud\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function coletandoPortas() {
    var instrucao = `select top 9 qtdPorta, horario from porta order by idPorta desc;`;
    return database.executar(instrucao);
}

function dadosAlertas(empresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select componente, metrica, descricao, fkTotem, format(horario, 'hh:mm:ss') as horario from alerta where format(horario, 'dd-MM-yyyy') = format(getdate(), 'dd-MM-yyyy') and empresa = '${empresa}'`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `select cpuPercent, ramPercent, horario, date_format(horario, '%H:%i') as horarioF from LoocaLeitura join Leitura on fkLeitura = idLeitura order by fkLeitura desc limit ${limite_linhas}`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function estadoPortas() {
    var instrucao = `select top 9 * from porta where horario != '' order by dia,horario desc ;`;
    return database.executar(instrucao);
}
function contarAlertasDiario(fkTotem) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count (idAlerta) as 'qtdAlertas', componente from alerta where fkTotem = ${fkTotem} and DAY(horario) = DAY(current_timestamp)  group by componente;
        `

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `select cpuPercent, ramPercent, horario, date_format(horario, '%H:%i') as horarioF from LoocaLeitura join Leitura on fkLeitura = idLeitura order by fkLeitura desc limit ${limite_linhas}`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function contarAlertasSemanal(fkTotem) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count (idAlerta) as 'qtdAlertas', componente from alerta where fkTotem = ${fkTotem} and datepart(week, current_timestamp) = datepart(week, horario)  group by componente;
        `

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql =
            `select cpuPercent, ramPercent, horario, date_format(horario, '%H:%i') as horarioF from LoocaLeitura join Leitura on fkLeitura = idLeitura order by fkLeitura desc limit ${limite_linhas}`;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarUltimaMedidaDisco,
    buscarMedidaTotem,
    buscarMedidasTempoRealporTotem,
    mediaT1,
    alertar,
    mediaT2,
    mediaT3,
    dadosHistorico,
    buscarMedidasMapas,
    buscarEmpresa,
    processos,
    coletandoPortas,
    variacaoCordsMapas,
    temperaturaComparativaMapas,
    checarMediasTempTotens,
    dadosAlertas,
    contarAlertasDiario,
    contarAlertasSemanal,
    estadoPortas,
    processosTOP
    
}