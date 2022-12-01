#conectando no banco
import pyodbc 

server = 'dbekran.database.windows.net'
database = 'dbekran'
username = '{222-1sis-grupo6@bandtec.com.br}'
password = '{1sis@grupo6}'
driver = '{ODBC Driver 18 for SQL Server}' 

cnxn = pyodbc.connect(
    DRIVER='{ODBC Driver 18 for SQL Server}',
    SERVER='dbekran.database.windows.net',
    DATABASE='dbekran',
    UID='222-1sis-grupo6@bandtec.com.br@dbekran.database.windows.net',
    PWD='1sis@grupo6',
    Trusted_connection='yes'
    #Integrated_Security='false'
)

#connection = pyodbc.connect(cnxn) 