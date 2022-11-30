package app

import banco.Conexao
import banco.Query
import banco.QueryCreate
import com.github.britooo.looca.api.core.Looca
import org.json.JSONObject
import org.jsoup.Jsoup
import java.io.File
import java.time.LocalDate
import java.time.LocalTime

fun main() {
    val tipoBanco = 3
    // MySQL = 1
    // H2 = 2
    // SqlServer = 3

    val cursor = Query(Conexao().getJdbcTemplate(tipoBanco))
    Thread.sleep(500)

    if(tipoBanco != 3) {QueryCreate(Conexao().getJdbcTemplate(tipoBanco)).createTable(tipoBanco)}

    var fkTotem = 50000
        while (true) {
        val hora = LocalTime.now().toString().substring(0, 8)
        var data = "${LocalDate.now()}"
        data = data.substring(0, 4) + "/" + data.substring(5, 7) + "/" + data.substring(8, 10)
        println("Criando novo insert em Leitura: \r\n$fkTotem  $data  $hora \r\n")
        Thread.sleep(500)
        val lista2 = jsonCrawlerKotlin(cursor, tipoBanco)
        val lista = apiBrabaEkran()
        cursor.insertLeitura(hora, data, fkTotem)
        println("Iniciando processos de inserção do WebCrawler:\r\n")
        println("Nome | Mínimo | Valor | Máximo | fkLeitura | fkSeção")
        Thread.sleep(500)
        lista2.forEach {
            cursor.insertCrawler(it, cursor.selectIdLeitura(hora, data))
        }
        println("\r\n\r\nInserção única do Looca:\r\n")
        println("cpuPercent | diskPercent | ramPercent | fkLeitura")
        Thread.sleep(500)
        cursor.insertLooca(lista, cursor.selectIdLeitura(hora, data))
        fkTotem++
        if (fkTotem == 50004) {fkTotem = 50000}

        println("RECOMEÇANDO O LOOP...\r\n")
    }
}

fun jsonCrawlerKotlin(cursor:Query, tipoBanco:Int):MutableList<List<String>> {
    println("Iniciando API do WebCrawler na porta 8085...")

    val ls = mutableListOf<List<String>>()

    if(tipoBanco != 3) {QueryCreate(Conexao().getJdbcTemplate(tipoBanco)).createTable(tipoBanco)}

    JSONObject(
        JSONObject(
            Jsoup.connect("http://localhost:8085/data.json").ignoreContentType(true).execute().body()
        ).getJSONArray("Children")[0].toString()
    ).getJSONArray("Children").forEach { it1 ->
        val tier1 = JSONObject(it1.toString())
        if (cursor.checarComponente((tier1.get("Text")).toString())) {
            cursor.insertComponente((tier1.get("Text")).toString())
        }
        if (tier1.getJSONArray("Children").length() > 0) {
            tier1.getJSONArray("Children").forEach { it2 ->
                val tier2 = JSONObject(it2.toString())
                if (cursor.checarSecao((tier2.get("Text")).toString())) {
                    cursor.insertSecao((tier2.get("Text")).toString(), cursor.selectIdComponente((tier1.get("Text")).toString()))
                }
                if (tier2.getJSONArray("Children").length() > 0) {
                    tier2.getJSONArray("Children").forEach { it3 ->
                        val tier3 = JSONObject(it3.toString())
                        if (cursor.checarSecao((tier3.get("Text")).toString())) {
                            cursor.insertSubsecao((tier3.get("Text")).toString(), cursor.selectIdSecao((tier2.get("Text")).toString()), cursor.selectIdComponente((tier1.get("Text")).toString()))
                        }
                        if (tier3.getJSONArray("Children").length() > 0) {
                            tier3.getJSONArray("Children").forEach { it4 ->
                                val i = mutableListOf<String>()
                                arrayListOf(
                                    JSONObject(it4.toString()).get("Text").toString(),
                                    JSONObject(it4.toString()).get("Min").toString(),
                                    JSONObject(it4.toString()).get("Value").toString(),
                                    JSONObject(it4.toString()).get("Max").toString()
                                ).forEach {
                                    i += if (it.indexOf(",") != -1) {
                                        val f = if (it.indexOf(" ") == -1) {
                                            it.length
                                        } else {
                                            it.indexOf(" ")
                                        }
                                        "${it.substring(0, it.indexOf(","))}.${it.substring(it.indexOf(",") + 1, f)}"
                                    } else {
                                        if (it.indexOf("RPM") != -1) {
                                            it.substring(0, it.indexOf(" "))
                                        } else {
                                            it
                                        }
                                    }
                                }
                                i += cursor.selectIdSecao(tier3.get("Text").toString()).toString()
                                ls += i
                            }
                        } else {
                            val i = mutableListOf<String>()
                            arrayListOf(
                                JSONObject(it3.toString()).get("Text").toString(),
                                JSONObject(it3.toString()).get("Min").toString(),
                                JSONObject(it3.toString()).get("Value").toString(),
                                JSONObject(it3.toString()).get("Max").toString()
                            ).forEach {
                                i += if (it.indexOf(",") != -1) {
                                    val f = if (it.indexOf(" ") == -1) {
                                        it.length
                                    } else {
                                        it.indexOf(" ")
                                    }
                                    "${it.substring(0, it.indexOf(","))}.${it.substring(it.indexOf(",") + 1, f)}"
                                } else {
                                    if (it.indexOf("RPM") != -1) {
                                        it.substring(0, it.indexOf(" "))
                                    } else {
                                        it
                                    }
                                }
                            }
                            i += cursor.selectIdSecao(tier3.get("Text").toString()).toString()
                            ls += i
                        }
                    }
                }
            }
        }
    }
    return ls
}

fun apiBrabaEkran():MutableList<String> {
    println("Iniciando API do Looca... \r\n")

    val looca = Looca()
    val particao: File = if (looca.sistema.sistemaOperacional == "Windows") {
        File("C:");} else {
        File("/")
    }

    val disco = 100 - ((particao.freeSpace.toDouble()/1024/1024/1024) * 100 / (looca.grupoDeDiscos.discos[0].tamanho.toDouble()/1024/1024/1024))
    val ram = 100 - ((looca.memoria.disponivel.toDouble()/1024/1024/1024) * 100 / (looca.memoria.total.toDouble()/1024/1024/1024))
    val valoresPadroes = mutableListOf<Double>(looca.processador.uso, disco, ram)

    val lista = mutableListOf<String>()
    for (f in 0 until valoresPadroes.size) {
        val formatado = String.format("%.2f", valoresPadroes[f])
        val index = formatado.indexOf(",")
        lista += if (index != -1) {
            formatado.substring(0, index) + "." + formatado.substring(index + 1)
        } else {
            formatado
        }
    }
    return lista
}