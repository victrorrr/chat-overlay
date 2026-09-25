import asyncio
import websockets

# Missão 2: Gerenciar os Usuários
# Usamos um 'set' (conjunto) para guardar quem está conectado no momento.
clientes_conectados = set()

async def lidar_com_cliente(websocket):
    """
    Esta função é chamada sempre que um novo usuário se conecta.
    """
    # Adiciona a pessoa que acabou de entrar na nossa lista
    clientes_conectados.add(websocket)
    print(f"Novo usuário conectado! Total na sala: {len(clientes_conectados)}")

    try:
        # Missão 1: Escutar conexões continuamente
        async for mensagem in websocket:
            print(f"Recebido: {mensagem}")
            
            # Missão 3: Distribuir Mensagens (Broadcast)
            # Pega a mensagem recebida e dispara para o Usuário B, C, D...
            for cliente in clientes_conectados:
                # Opcional: Enviar para todos, exceto para quem mandou a mensagem original
                if cliente != websocket:
                    await cliente.send(mensagem)
                    
    except websockets.exceptions.ConnectionClosed:
        print("Um cliente fechou a conexão repentinamente.")
        
    finally:
        # Missão 2 (Continuação): Quando alguém fechar o chat, o Python remove da lista
        clientes_conectados.remove(websocket)
        print(f"Usuário saiu. Total na sala: {len(clientes_conectados)}")

async def iniciar_servidor():
    # Missão 1: Criar o Servidor WebSocket abrindo uma porta no computador
    # "localhost" significa que está rodando na sua própria máquina, na porta 8765
    async with websockets.serve(lidar_com_cliente, "localhost", 8765):
        print("Servidor da Central Telefônica rodando em ws://localhost:8765")
        await asyncio.Future()  # Mantém o servidor rodando para sempre

if __name__ == "__main__":
    # Inicia o loop assíncrono do Python
    asyncio.run(iniciar_servidor())