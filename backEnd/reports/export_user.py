import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import sys

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

def export_users():
    try:
        # Conexão com o banco de dados usando variáveis do .env
        connection_string = f"postgresql+psycopg2://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        
        # Cria o engine do SQLAlchemy
        engine = create_engine(connection_string)
        query = """
        SELECT matricula, nome, email, status, perfil, id_loja
        FROM usuarios
        """

        # Lê os dados da consulta SQL
        df = pd.read_sql_query(query, engine)

        # Substituindo True e False no campo 'status' pelos valores desejados
        df['status'] = df['status'].replace({True: 'Cadastrado', False: 'Aguardando Cadastro'})

        # Tratar valores nulos e garantir que os dados fiquem bem apresentados
        df['id_loja'] = df['id_loja'].fillna(0).astype(int)
        df['matricula'] = df['matricula'].fillna(0).astype(int)
        df['nome'] = df['nome'].fillna('Desconhecido')
        df['email'] = df['email'].fillna('email@desconhecido.com')
        df['status'] = df['status'].fillna('Indefinido')
        df['perfil'] = df['perfil'].fillna('Desconhecido')

        # Cria o diretório para os relatórios, se não existir (relativo à raiz do projeto)
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))  # Caminho relativo à raiz do projeto
        reports_dir = os.path.join(project_root, 'reports')
        os.makedirs(reports_dir, exist_ok=True)

        # Define o caminho para o arquivo CSV
        csv_path = os.path.join(reports_dir, 'usuarios.csv')

        # Adicionando título à primeira linha para melhorar a visualização no Excel
        with open(csv_path, 'w', encoding='utf-8') as file:
            # Escrever um título na primeira linha
            file.write("Relatório de Usuários - Exportação de Dados\n")
            file.write("\n")  # Linha em branco para separar o título dos dados

        # Exportando para CSV com vírgula como separador
        df.to_csv(csv_path, index=False, sep=',', encoding='utf-8', mode='a')

        print(f"Relatório exportado com sucesso: {csv_path}")
        print("STATUS: SUCCESS")
        sys.exit(0)
    
    except Exception as e:
        print(f"Erro ao exportar relatório: {e}")
        print("STATUS: ERROR")
        sys.exit(1)

if __name__ == '__main__':
    export_users()
