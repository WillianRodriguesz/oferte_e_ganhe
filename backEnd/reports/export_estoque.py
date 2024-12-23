import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import sys

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))

def export_estoque():
    try:
        connection_string = f"postgresql+psycopg2://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
        
        engine = create_engine(connection_string)
        query = """
        SELECT 
            loja.cod_unidade AS id_loja,
            estoque.id AS id_estoque,
            estoque.qtd_atual,
            estoque.qtd_minima,
            estoque.qtd_maxima,
            estoque.status
        FROM Loja AS loja
        JOIN Estoque AS estoque ON loja.id_estoque = estoque.id;
        """

        df = pd.read_sql_query(query, engine)
        df['id_loja'] = df['id_loja'].fillna(0).astype(int)
        df['id_estoque'] = df['id_estoque'].fillna(0).astype(int)
        df['qtd_atual'] = df['qtd_atual'].fillna(0).astype(int)
        df['qtd_minima'] = df['qtd_minima'].fillna(0).astype(int)
        df['qtd_maxima'] = df['qtd_maxima'].fillna(0).astype(int)
        df['status'] = df['status'].fillna('Indefinido')

        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))  # Caminho relativo à raiz do projeto
        reports_dir = os.path.join(project_root, 'reports')
        os.makedirs(reports_dir, exist_ok=True)

        csv_path = os.path.join(reports_dir, 'estoque.csv')

        # Adicionando título à primeira linha para melhorar a visualização no Excel
        with open(csv_path, 'w', encoding='utf-8') as file:
            file.write("Relatório de Estoque - Exportação de Dados\n")
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
    export_estoque()
