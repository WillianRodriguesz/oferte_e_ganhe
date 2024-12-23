const { PythonShell } = require('python-shell');
const path = require('path');
const os = require('os');

// Caminho do executável do Python (verifica o SO)
const pythonExecutable = os.platform() === 'win32'
    ? path.join(__dirname, '../../.venv/Scripts/python.exe')  
    : path.join(__dirname, '../../.venv/bin/python');  

PythonShell.defaultOptions = {
    pythonPath: pythonExecutable,
};

// Função genérica para rodar qualquer script Python
async function gerarRelatorio(scriptNome, arquivoSaida) {
    const scriptPython = path.join(__dirname, `../reports/${scriptNome}`); 

    return new Promise((resolve, reject) => {
        const pythonProcess = new PythonShell(scriptPython, {
            pythonOptions: ['-u'], // '-u' para saída imediata
        });

        let stdout = [];
        let stderr = [];

        console.log(`Executando script Python: ${scriptPython}`);
        console.log(`Usando Python executável: ${pythonExecutable}`);

        // Captura a saída padrão (stdout)
        pythonProcess.on('message', (message) => {
            console.log(`stdout: ${message}`);
            stdout.push(message);
        });

        // Captura a saída de erro (stderr)
        pythonProcess.on('stderr', (stderrMessage) => {
            console.error(`stderr: ${stderrMessage}`);
            stderr.push(stderrMessage);
        });

        pythonProcess.on('close', () => {
            console.log("Processo Python finalizado.");
        });

        pythonProcess.end((err, code, signal) => {
            if (err) {
                console.error(`Erro no processo Python: ${err.message}`);
                return reject(new Error(`Erro inesperado no processo Python: ${err.message}`));
            }

            console.log(`Código de saída do Python: ${code}`);
            const output = stdout.join('\n');

            if (code === 0 && output.includes("STATUS: SUCCESS")) {
                console.log("Processo Python concluído com sucesso.");
                const caminhoArquivo = path.join(__dirname, `../../reports/${arquivoSaida}`);
                resolve(caminhoArquivo);
            } else {
                console.error(`Erro no script Python: ${stderr.join('\n')}`);
                reject(new Error(`Erro ao exportar CSV: saída não reconhecida ou código de erro ${code}.`));
            }
        });
    });
}

// Funções específicas para cada relatório

async function gerarRelatorioEstoque() {
    return gerarRelatorio('export_estoque.py', 'estoque.csv');
}

async function gerarRelatorioPerfis() {
    return gerarRelatorio('export_perfis.py', 'perfil.csv');
}

async function gerarRelatorioRecebimento() {
    return gerarRelatorio('export_recebimento.py', 'recebimento.csv');
}

async function gerarRelatorioTalao() {
    return gerarRelatorio('export_talao.py', 'talao.csv');
}

async function gerarRelatorioUsuario() {
    return gerarRelatorio('export_user.py', 'usuarios.csv');
}
module.exports = {
    gerarRelatorioEstoque,
    gerarRelatorioPerfis,
    gerarRelatorioRecebimento,
    gerarRelatorioTalao,
    gerarRelatorioUsuario
};
