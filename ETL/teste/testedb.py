#conectando no banco
import pyodbc 

conn = "Server=tcp:dbekran.database.windows.net,3306;Database=dbekran;User ID=222-1sis-grupo6@bandtec.com.br;Password=1sis@grupo6;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

cursor = pyodbc.Connection(conn)

