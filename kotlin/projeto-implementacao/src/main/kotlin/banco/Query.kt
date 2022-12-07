package banco

import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate

class Query (private val jdbcTemplate: JdbcTemplate) {
    fun insertComponente(nome:String) {
        jdbcTemplate.update("""
            insert into crawlerComponente (nome) values
            (?)
        """, nome)
    }
    fun insertSecao(nome:String, fkComponente:Int) {
        jdbcTemplate.update("""
            insert into crawlerSecao (nome, fkComponente) values
            (?, ?)
        """, nome, fkComponente)
    }
    fun insertSubsecao(nome:String, fkSecao:Int, fkComponente:Int) {
        jdbcTemplate.update("""
            insert into crawlerSecao (nome, fkSubsecao, fkComponente) values
            (?, ?, ?)
        """, nome, fkSecao, fkComponente)
    }
    fun insertLeitura(hora:String, dia:String, fkTotem:Int) {
        jdbcTemplate.update("""
            insert into Leitura (horario, dia, fkTotem) values
            (?, ?, ?)
        """, hora, dia, fkTotem)
    }
    fun insertLooca(valores:MutableList<String>, fkLeitura:Int) {
        jdbcTemplate.update("""
            insert into loocaLeitura (cpuPercent, diskPercent, ramPercent, mbUpload, mbDownload, fkLeitura) values
            (?, ?, ?, ?, ?, ?)
        """, valores[0], valores[1], valores[2], valores[3], valores[4], fkLeitura)
        println("${valores[0]} - ${valores[1]} - ${valores[2]} - ${valores[3]} - ${valores[4]} - $fkLeitura\r\n")
    }
    fun insertCrawler(valores:List<String>, fkLeitura:Int) {
        jdbcTemplate.update("""
            insert into crawlerLeitura (nome, minimo, valor, maximo, fkLeitura, fkSecao) values
            (?, ?, ?, ?, ?, ?)
        """, valores[0], valores[1], valores[2], valores[3], fkLeitura, valores[4])
        print("${valores[0]} - ${valores[1]} - ${valores[2]} - ${valores[3]} - $fkLeitura - ${valores[4]}\r\n")
    }

    fun selectIdComponente(nome: String):Int {
        return jdbcTemplate.queryForObject(
            "select idComponente from crawlerComponente where nome = ?",
            BeanPropertyRowMapper(dataComponente::class.java),
            nome
        )!!.idComponente
    }
    fun checarComponente(nome: String):Boolean {
        return jdbcTemplate.queryForObject(
            "select count(*) from crawlerComponente where nome = ?",
            Int::class.java,
            nome
        ) == 0
    }
    fun selectIdSecao(nome: String):Int {
        return jdbcTemplate.queryForObject(
            "select idSecao from crawlerSecao where nome = ?",
            BeanPropertyRowMapper(dataSecao::class.java),
            nome
        )!!.idSecao
    }
    fun checarSecao(nome: String):Boolean {
        return jdbcTemplate.queryForObject(
            "select count(*) from crawlerSecao where nome = ?",
            Int::class.java,
            nome
        ) == 0
    }
    fun selectIdLeitura(hora:String, data:String):Int {
        return jdbcTemplate.queryForObject(
            "select idLeitura from Leitura where horario = ? and dia = ?",
            BeanPropertyRowMapper(dataLeitura::class.java),
            hora, data
        )!!.idLeitura
    }
}

class QueryCreate (private val jdbcTemplate: JdbcTemplate) {
    fun createTable(tipoBanco:Int) {
        if (tipoBanco == 1) {
            jdbcTemplate.execute("""
            SET GLOBAL time_zone = '+3:00';
    """)// Essa função é importante pois essa library de MySQL depende de usar o msm fuso horario que o software!!
            jdbcTemplate.execute("""
        create table IF NOT EXISTS Leitura(
        idLeitura INT PRIMARY KEY AUTO_INCREMENT,
        hora CHAR(8),
        dia CHAR(10),
        fkTotem INT
        );
    """)
            jdbcTemplate.execute("""
        create table IF NOT EXISTS loocaLeitura(
        idLooca INT PRIMARY KEY AUTO_INCREMENT,
        cpuPercent decimal(5,2),
        ramPercent decimal(5,2),
        diskPercent decimal(5,2),
        mbUpload decimal(7,3),
        mbDownload decimal(7,3),
        fkLeitura INT,
        foreign key (fkLeitura) references Leitura(idLeitura)
        );
    """)
            jdbcTemplate.execute("""
        create table IF NOT EXISTS crawlerComponente(
        idComponente INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45)
        );
    """)
            jdbcTemplate.execute("""
        create table IF NOT EXISTS crawlerSecao(
        idSecao INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45),
        fkComponente INT,
        fkSecao INT,
        foreign key (fkSecao) references crawlerSecao(idSecao),
        foreign key (fkComponente) references crawlerComponente(idComponente)
        );
    """)
            jdbcTemplate.execute("""
        create table IF NOT EXISTS crawlerLeitura(
        idLeitura INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45),
        minimo DECIMAL(9,3),
        valor DECIMAL(9,3),
        maximo DECIMAL(9,3),
        fkLeitura int,
        foreign key (fkLeitura) references Leitura(idLeitura),
        fkSecao INT,
        foreign key (fkSecao) references crawlerSecao(idSecao)
        );
    """)
        } else if (tipoBanco == 2) {
            jdbcTemplate.execute("""
        create table IF NOT EXISTS Leitura(
        idLeitura INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        hora CHAR(8),
        dia CHAR(10),
        fkTotem INT
        );
    """)
            jdbcTemplate.execute("""
        create table IF NOT EXISTS loocaLeitura(
        idLooca INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        cpuPercent decimal(5,2),
        ramPercent decimal(5,2),
        diskPercent decimal(5,2),
        mbUpload decimal(7,3),
        mbDownload decimal(7,3),
        fkLeitura INT,
        foreign key (fkLeitura) references Leitura(idLeitura)
        );
    """)
            jdbcTemplate.execute("""
        create table IF NOT EXISTS crawlerComponente(
        idComponente INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        nome VARCHAR(45)
        );
    """)
            jdbcTemplate.execute("""
        create table IF NOT EXISTS crawlerSecao(
        idSecao INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        nome VARCHAR(45),
        fkComponente INT,
        fkSubsecao INT,
        foreign key (fkSecao) references crawlerSecao(idSecao),
        foreign key (fkComponente) references crawlerComponente(idComponente)
        );
    """)
            jdbcTemplate.execute("""
        create table IF NOT EXISTS crawlerLeitura(
        idLeitura INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        nome VARCHAR(45),
        minimo DECIMAL(9,3),
        valor DECIMAL(9,3),
        maximo DECIMAL(9,3),
        fkLeitura int,
        foreign key (fkLeitura) references Leitura(idLeitura),
        fkSecao INT,
        foreign key (fkSecao) references crawlerSecao(idSecao)
        );
    """)
        }
    }
}