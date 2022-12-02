#conectando no banco
import pyodbc 
import textwrap

def Conexao():

        # variaveis de conexao
        driver ='{ODBC Driver 18 for SQL Server}'
        server_name = 'dbekran'
        database_name = 'dbeKran'
        server = '{server_name}.database.windows.net,1433'.format(server_name=server_name)
        username = 'eKranAdm'
        password = '1sis@grupo6'
        # definindo banco url 
        connection_string = textwrap.dedent('''
        Driver={driver};
        Server={server};
        Database={database};
        Uid={username};
        Pwd={password};
        Encrypt=yes;
        TrustedServerCertificate=no;
        Connection Timeout=10;
        '''.format(
            driver=driver,
            server=server,
            database=database_name,
            username=username,
            password=password
        )) 

        cnxn:pyodbc.Connection = pyodbc.connect(connection_string) 

        global crsr
        crsr = cnxn.cursor()
        print("Conectado ao banco de dados: Ekran")

def Select():
    
    try:
        crsr.execute('''
                     SELECT * FROM PROCESSOS;
                     ''')
        print("Deu certo")
        
    except pyodbc.Error as err:
                crsr.rollback()
                print("Something went wrong: {}".format(err))
    
    
    crsr.commit()    
    
Conexao()
Select()