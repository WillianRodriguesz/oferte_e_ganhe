import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import sys

# Carregar variáveis de ambiente
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

def export_perfil():
    try:
        connection_string = f"postgresql+psycopg2://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        
        engine = create_engine(connection_string)
        query = """
        SELECT 
            id, funcao
        FROM perfil
        """

        # Lê os dados da consulta SQL
        df = pd.read_sql_query(query, engine)

        df['id'] = df['id'].fillna(0).astype(int)
        df['funcao'] = df['funcao'].fillna('Desconhecida')

        # Cria o diretório para os relatórios, se não existir (relativo à raiz do projeto)
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))  
        reports_dir = os.path.join(project_root, 'reports')
        os.makedirs(reports_dir, exist_ok=True)

        csv_path = os.path.join(reports_dir, 'perfil.csv')

        with open(csv_path, 'w', encoding='utf-8') as file:
            file.write("Relatório de Perfis - Exportação de Dados\n")
            file.write("\n")  

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
    export_perfil()
