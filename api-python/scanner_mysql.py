import socket
import mysql.connector
from mysql.connector import errorcode
import time
#import pyodbc
import datetime
from datetime import date
from datetime import datetime


#----------------------------------------------------------------------------------------------------------
#Iniciando a conexão com a Azure

# https://learn.microsoft.com/pt-br/azure/azure-sql/database/connect-query-python?view=azuresql


    #cnxn = pyodbc.connect('Driver={ODBC Driver 13 for SQL Server};Server=tcp:dbekran.database.windows.net,1433;Database=dbeKran;Uid=eKranAdm;Pwd=1sis@grupo6;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
    #cursor = cnxn.cursor()


    #config = {
    #'host':'dbekran',
    #'user':'eKranAdm@dbeKran',
    #'password':'1sis@grupo6',
    #'database':'dbeKran',
    #'client_flags': [mysql.connector.ClientFlag.SSL],
    #'ssl_ca': './DigiCertGlobalRootG2.crt.pem'
    #}
    #conn = ''
    #------------------------------------------------------------------------------------------------------------

    # Iniciando conexão com o banco de dados locao

i = 0

i = i+1
try:
         db_connection = mysql.connector.connect(host="localhost", user="root", passwd="#Gf53503735879", database="ekran")
         print("Connection established")
except mysql.connector.Error as err:
         if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
             print("Something is wrong with the user name or password")
         elif err.errno == errorcode.ER_BAD_DB_ERROR:
             print("Database does not exist")
         else:
             print(err)
else:
           db_connection.close()
#--------------------------------------------------------------------------------------------------------------


# Iniciando o script com scanner de portas no sistema
#--------------------------------------------------------------------------------------------------------------

portas = [80,23,8080,443,21,3333,22,3389,3306]


portas_aberta = 0
status_porta = []

    
for i, portaAtual in enumerate(portas): 


                client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                client.settimeout(0.1)
                codigo = client.connect_ex (('10.18.33.1', portaAtual))

                
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
                        
                        cursor = db_connection.cursor()
                        sql = "INSERT INTO porta (fkTotem,horario,dia, qtdPorta, portas, statusPorta) VALUES (?,?,?,?,?,?)"
                        values = [fkTotem,hora,dia,portas_aberta,portaAtual,status_porta[i]]
                        print(values)
                        cursor.execute(sql, values)

                    fkTotem+=1
                    
            
            #------------------------------------------------------------------------------------------------------------       
                    print(i, "valores inseridos no banco.")
                    print("------------------------------------------")
                    print("\r")
                    time.sleep (30)
                    db_connection.commit()
                    db_connection.close()
                    #cnxn.commit()
