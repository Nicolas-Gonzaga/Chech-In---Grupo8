  
import socket
#import mysql.connector
#from mysql.connector import errorcode
import time
#import pyodbc
import datetime
from datetime import date
from datetime import datetime

portas = [3333,23,8080,443,21,3333,22,3389,3306]

portas_aberta = 0
status_porta = []


for porta in portas: 


    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.settimeout(0.1)
    codigo = client.connect_ex (('192.168.15.2', porta))


    if codigo == 10035:
            
            portas_aberta += 1
            status_porta.append(1)
    else:
             status_porta.append(0)
        
    hora = datetime.now().strftime('%H:%M')
    dia = date.today().strftime('%Y/%m/%d')


    while True:

        for qtd_porta,porta_atual  in enumerate(portas):
                
                if codigo == 10035:
                
                    qtd_porta += 1

        print(qtd_porta)
           
           

