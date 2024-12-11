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

async function gerarRelatorioUsuario() {
    const scriptPython = path.join(__dirname, '../reports/export_user.py'); 

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

        // Quando o processo Python terminar
        pythonProcess.on('close', () => {
            console.log("Processo Python finalizado.");
        });

        // Finaliza o processo Python e trata o retorno
        pythonProcess.end((err, code, signal) => {
            if (err) {
                console.error(`Erro no processo Python: ${err.message}`);
                return reject(new Error(`Erro inesperado no processo Python: ${err.message}`));
            }

            console.log(`Código de saída do Python: ${code}`);
            const output = stdout.join('\n');

            if (code === 0 && output.includes("STATUS: SUCCESS")) {
                console.log("Processo Python concluído com sucesso.");
                const caminhoArquivo = path.join(__dirname, '../../reports/usuarios.csv'); 
                resolve(caminhoArquivo);
            } else {
                console.error(`Erro no script Python: ${stderr.join('\n')}`);
                reject(new Error(`Erro ao exportar CSV: saída não reconhecida ou código de erro ${code}.`));
            }
        });
    });
}

module.exports = {
    gerarRelatorioUsuario,
};
