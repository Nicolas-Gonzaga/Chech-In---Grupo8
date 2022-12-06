import socket


portas = [21,23,80,443,8080,3333,22,3389,3306]

portas_aberta = 0
status_porta = 1


for porta in portas:

        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.settimeout(0.1)
        codigo = client.connect_ex (('192.168.15.3', porta))


        if codigo == 10035:
            
            portas_aberta += 1
            status_porta = 0
       
        print(portas_aberta)
        print(status_porta)
        