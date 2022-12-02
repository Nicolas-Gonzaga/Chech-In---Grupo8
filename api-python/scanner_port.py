import socket
import mysql.connector
from mysql.connector import errorcode
import time
import pyodbc
import datetime
from datetime import date
from datetime import datetime
import numpy as np


#----------------------------------------------------------------------------------------------------------
#Iniciando a conexão com a Azure

# https://learn.microsoft.com/pt-br/azure/azure-sql/database/connect-query-python?view=azuresql
while True:

    cnxn = pyodbc.connect('Driver={ODBC Driver 13 for SQL Server};Server=tcp:dbekran.database.windows.net,1433;Database=dbeKran;Uid=eKranAdm;Pwd=1sis@grupo6;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
    cursor = cnxn.cursor()


    config = {
    'host':'dbekran',
    'user':'eKranAdm@dbeKran',
    'password':'1sis@grupo6',
    'database':'dbeKran',
    'client_flags': [mysql.connector.ClientFlag.SSL],
    'ssl_ca': './DigiCertGlobalRootG2.crt.pem'
    }
    conn = ''
    #------------------------------------------------------------------------------------------------------------

    # Iniciando conexão com o banco de dados locao

    i = 0

    i = i+1

    #try:
     #   db_connection = mysql.connector.connect(
           # host='localhost', user='root', password='#Gf53503735879', database='ekran')
   # except mysql.connector.Error as error:
        
    #    if error.errno == errorcode.ER_BAD_DB_ERROR:
     #       print("Não encontrei o banco")

      #  elif error.errno == errorcode.ER_ACCESS_DENIED_ERROR:
       ##else:
         #   print(error)

#--------------------------------------------------------------------------------------------------------------


# Iniciando o script com scanner de portas no sistema
#--------------------------------------------------------------------------------------------------------------


    portas = [80,23,8080,443,21,3333,22,3389,3306]


    portas_aberta = 0
    status_porta = []

  
    for i, portaAtual in enumerate(portas): 


            client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client.settimeout(0.1)
            codigo = client.connect_ex (('192.168.15.4', portaAtual))

            
            hora = datetime.now().strftime('%H:%M')
            dia = date.today().strftime('%Y/%m/%d')
       
            if codigo == 10035:
                    
                    portas_aberta += 1
                    status_porta.append(1)
            else:
                    status_porta.append(0)
                

    # ---------------------------------------------------------------------------------------------------------------

    #Realizando os inserts no banco de dados

    #----------------------------------------------------------------------------------------------------------------

    fkTotem = 5000

    while fkTotem <= 5002:
            
        
                for i, portaAtual in enumerate(portas):                
                    
                    cursor = cnxn.cursor()
                    sql = "INSERT INTO porta (fkTotem, qtdPorta, porta, statusPorta,horario,dia) VALUES (?,?,?,?,?,?)"
                    values = [fkTotem,portas_aberta, portaAtual,status_porta[i],hora,dia]
                    print(values)
                    cursor.execute(sql, values)

                    sql = "INSERT INTO statusPorta (portas,porta1,porta2,porta3,porta4,porta5,porta6,porta7,porta8,porta9) VALUES (?,?,?,?,?,?,?,?,?,?)"
                    values = [portaAtual,status_porta[0],status_porta[1],status_porta[2],status_porta[3],status_porta[4],status_porta[5],status_porta[6]
                   ,status_porta[7],status_porta[8]]
                    print(values)
                    cursor.execute(sql, values)

                fkTotem+=1
                
        
        #------------------------------------------------------------------------------------------------------------       
                print(i, "valores inseridos no banco.")
                print("------------------------------------------")
                print("\r")
                cnxn.commit()
                time.sleep(10)
