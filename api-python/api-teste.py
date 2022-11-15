import psutil
import mysql.connector
import time
from mysql.connector import errorcode

i = 0
while True: 
    i += 1
    try:
        db_connection = mysql.connector.connect(
            host='localhost', user='root', password='HEnriquecam01', database='ekran')
    except mysql.connector.Error as error:
        if error.errno == errorcode.ER_BAD_DB_ERROR:
            print("Não encontrei o banco")
        elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Credenciais erradas")
        else:
            print(error)

    cursor = db_connection.cursor()
    print(i, "Inserindo no banco:")
    print("------------------------------------------")
    # print("PID | Nome | CpuPercent | MemoryPercent")
    for x in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent']):
        values = [x.info['pid'], x.info['name'], "%0.2f" % x.info['cpu_percent'], "%0.2f" % x.info['memory_percent']]
        sql = "INSERT INTO Leitura (PID, Nome, CpuPercent, MemoryPercent) VALUES (%s,%s,%s,%s)"
        print(values)
        cursor.execute(sql, values)
        db_connection.commit()
        time.sleep(0.1)

    
    db_connection.close()
    time.sleep(3)