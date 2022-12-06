import pyodbc
server = 'dbekran.database.windows.net'
database = 'dbeKran'
username = 'eKranAdm'
password = '1sis@grupo6'
#define our connection string
cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server}; \
                     SERVER=' + server + '; \
                     DATABASE='+ database + '; \
                     USERNAME=' + username + '; \
                     PASSWORD=' + password + '; \
                     Trusted_Connection=yes;')
#create the connection cursor
cursor = cnxn.cursor()
#definer our insert query
insert_query = '''INSERT INTO td_price_data ( close_price , high , low , open_price , volume , day_value )
                VALUES ( ? , ? , ? , ? , ? , ? );'''