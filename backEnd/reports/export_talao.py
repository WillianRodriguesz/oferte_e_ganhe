import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import sys

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

def export_talao():
    try:
        connection_string = f"postgresql+psycopg2://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        
        engine = create_engine(connection_string)
        query = """
        SELECT 
            id, numero_remessa, qtd_talao, destinatario, remetente, status, 
            data_envio, data_prevista, data_recebimento, observacao
        FROM talao
        """

        df = pd.read_sql_query(query, engine)

        df['id'] = df['id'].fillna(0).astype(int)
        df['numero_remessa'] = df['numero_remessa'].fillna('N/A')
        df['qtd_talao'] = df['qtd_talao'].fillna(0).astype(int)
        df['destinatario'] = df['destinatario'].fillna('Desconhecido')
        df['remetente'] = df['remetente'].fillna('Desconhecido')
        df['status'] = df['status'].fillna('Indefinido')
        df['data_envio'] = df['data_envio'].fillna(pd.NaT)
        df['data_prevista'] = df['data_prevista'].fillna(pd.NaT)
        df['data_recebimento'] = df['data_recebimento'].fillna(pd.NaT)
        df['observacao'] = df['observacao'].fillna('Sem observações')

        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))  
        reports_dir = os.path.join(project_root, 'reports')
        os.makedirs(reports_dir, exist_ok=True)

        csv_path = os.path.join(reports_dir, 'talao.csv')

        with open(csv_path, 'w', encoding='utf-8') as file:
            file.write("Relatório de Talões - Exportação de Dados\n")
            file.write("\n")  

        df.to_csv(csv_path, index=False, sep=',', encoding='utf-8', mode='a')

        print(f"Relatório exportado com sucesso: {csv_path}")
        print("STATUS: SUCCESS")
        sys.exit(0)
    
    except Exception as e:
        print(f"Erro ao exportar relatório: {e}")
        print("STATUS: ERROR")
        sys.exit(1)

if __name__ == '__main__':
    export_talao()
