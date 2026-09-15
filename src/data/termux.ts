import type { Row } from "./types";

/** Comandos exclusivos do Termux/Android (marcados com termuxOnly) */
export const termuxOnlyNames = new Set([
  "pkg",
  "termux-setup-storage",
  "termux-api",
  "termux-open",
  "termux-share",
  "termux-battery-status",
  "termux-clipboard-get",
  "tsu",
]);

export const termuxRows: Row[] = [
  // 📦 Pacotes
  ["pkg","Pacotes","Básico","Gerenciador oficial do Termux, um invólucro amigável do apt.","pkg [comando] [pacote]","install|Instala;search|Procura;upgrade|Atualiza tudo;uninstall|Remove;list-installed|Lista instalados","pkg upgrade|Atualiza o ambiente;pkg install nmap|Instala ferramenta","linux:apt install;powershell:Install-Package;cmd:winget install","termux,pacotes"],
  ["apt","Pacotes","Básico","Gerenciador de pacotes por baixo do pkg, também funciona no Termux.","apt [comando] [pacote]","update|Atualiza índices;upgrade|Atualiza pacotes;install|Instala","apt update && apt upgrade|Atualiza tudo","linux:apt;powershell:Install-Package;cmd:winget","termux,pacotes"],
  ["pkg search","Pacotes","Básico","Procura pacotes disponíveis nos repositórios do Termux.","pkg search termo","—|Aceita parte do nome","pkg search python|Procura pacotes Python","linux:apt search;powershell:Find-Package;cmd:winget search","termux,pacotes,busca"],

  // 📱 Android
  ["termux-setup-storage","Android","Básico","Concede ao Termux acesso ao armazenamento do Android e cria ~/storage.","termux-setup-storage","—|Pede a permissão do sistema","termux-setup-storage|Libera acesso aos arquivos","linux:-;powershell:-;cmd:-","termux,android,armazenamento"],
  ["termux-api","Android","Intermediário","Conjunto de comandos que expõem recursos do Android (requer o app Termux:API).","termux-<recurso> [opções]","termux-camera-photo|Foto;termux-sms-list|SMS;termux-location|GPS","pkg install termux-api|Instala o pacote","linux:-;powershell:-;cmd:-","termux,android,api"],
  ["termux-open","Android","Básico","Abre um arquivo ou URL com o aplicativo padrão do Android.","termux-open [--send] alvo","--send|Compartilha;--chooser|Escolhe o app","termux-open relatorio.pdf|Abre o PDF","linux:xdg-open;powershell:Start-Process;cmd:start","termux,android"],
  ["termux-share","Android","Básico","Compartilha um arquivo pelo menu de compartilhamento do Android.","termux-share [-a acao] arquivo","-a send|Envia;-a view|Visualiza","termux-share -a send notas.txt|Compartilha o arquivo","linux:-;powershell:-;cmd:-","termux,android"],
  ["termux-battery-status","Android","Básico","Mostra o estado da bateria em JSON.","termux-battery-status","—|Saída JSON (use com jq)","termux-battery-status|Nível e temperatura","linux:upower -i;powershell:Get-CimInstance Win32_Battery;cmd:powercfg /batteryreport","termux,android,monitoramento"],
  ["tsu","Android","Avançado","Abre um shell root no Termux em dispositivos com root.","tsu","—|Requer dispositivo com root","tsu|Vira root (se disponível)","linux:sudo -i;powershell:Start-Process -Verb RunAs;cmd:runas","termux,android,privilegios"],

  // 🐍 Programação
  ["python","Programação","Básico","Interpretador Python disponível no Termux.","python [arquivo.py]","-m|Executa módulo;-c|Executa código;-V|Versão","python -m http.server 8080|Servidor local de testes","linux:python3;powershell:python;cmd:python","programacao,python"],
  ["pip","Programação","Básico","Instala bibliotecas Python.","pip [comando] pacote","install|Instala;list|Lista;freeze|Exporta versões;-U|Atualiza","pip install requests|Instala biblioteca","linux:pip3;powershell:pip;cmd:pip","programacao,python"],
  ["node","Programação","Básico","Runtime JavaScript no Android.","node [arquivo.js]","-e|Executa código;-v|Versão","node -e \"console.log(1+1)\"|Executa código inline","linux:node;powershell:node;cmd:node","programacao,javascript"],
  ["npm","Programação","Básico","Gerenciador de pacotes do Node.js.","npm [comando]","install|Instala;init|Cria projeto;run|Executa script","npm install -g http-server|Instala global","linux:npm;powershell:npm;cmd:npm","programacao,javascript"],
  ["clang","Programação","Intermediário","Compilador C/C++ padrão do Termux.","clang [opções] arquivo.c","-o|Nome de saída;-Wall|Avisos;-g|Depuração","clang -Wall -o app app.c|Compila o programa","linux:gcc;powershell:cl;cmd:cl","programacao,c"],
  ["git","Programação","Básico","Controle de versão distribuído.","git [comando]","clone|Copia repositório;status|Estado;commit -m|Salva;push|Envia","git clone https://github.com/user/repo|Clona projeto","linux:git;powershell:git;cmd:git","git,versionamento"],

  // 🌐 Redes
  ["ping","Redes","Básico","Testa conectividade com um host (igual ao Linux).","ping [-c N] destino","-c|Número de pacotes;-i|Intervalo","ping -c 4 8.8.8.8|Testa a internet","linux:ping -c 4;powershell:Test-Connection;cmd:ping","redes,diagnostico","Networking"],
  ["ip","Redes","Intermediário","Mostra interfaces e endereços de rede do dispositivo.","ip [addr|route|link]","addr|Endereços;route|Rotas","ip -br addr|IPs do celular","linux:ip addr;powershell:Get-NetIPConfiguration;cmd:ipconfig","redes","Networking"],
  ["ss","Redes","Intermediário","Lista conexões e portas em escuta.","ss [-tuln]","-t|TCP;-u|UDP;-l|Escutando;-n|Numérico","ss -tuln|Portas abertas no aparelho","linux:ss -tulpn;powershell:Get-NetTCPConnection;cmd:netstat -ano","redes,portas","Networking"],
  ["curl","Redes","Intermediário","Faz requisições HTTP a partir do Android.","curl [opções] url","-I|Cabeçalhos;-s|Silencioso;-o|Salva em arquivo","curl -I https://exemplo.com|Cabeçalhos da resposta","linux:curl;powershell:Invoke-WebRequest;cmd:curl","http,api","Web Security"],
  ["wget","Redes","Básico","Baixa arquivos pela linha de comando.","wget [opções] url","-c|Continua;-O|Nome de saída","wget https://exemplo.com/arq.zip|Baixa o arquivo","linux:wget;powershell:Invoke-WebRequest -OutFile;cmd:curl -o","download"],
  ["ssh","Redes","Intermediário","Conecta a servidores remotos com segurança.","ssh [usuario@]host","-p|Porta;-i|Chave privada;-v|Verboso","ssh -p 2222 ana@192.168.0.10|Conecta ao seu servidor","linux:ssh;powershell:ssh;cmd:ssh","redes,acesso,seguranca","Networking"],
  ["scp","Redes","Intermediário","Copia arquivos entre máquinas via SSH.","scp [opções] origem destino","-r|Recursivo;-P|Porta","scp arquivo.txt ana@192.168.0.10:~|Envia arquivo","linux:scp;powershell:scp;cmd:scp","redes,transferencia"],

  // 🛠️ Ferramentas
  ["nano","Ferramentas","Básico","Editor de texto simples no terminal.","nano arquivo","Ctrl+O|Salva;Ctrl+X|Sai;Ctrl+W|Busca","nano config.txt|Edita o arquivo","linux:nano;powershell:notepad;cmd:notepad","editor"],
  ["vim","Ferramentas","Intermediário","Editor modal poderoso.","vim arquivo","i|Modo inserção;:wq|Salva e sai;/|Busca","vim script.sh|Edita o script","linux:vim;powershell:vim;cmd:-","editor"],
  ["grep","Ferramentas","Básico","Filtra texto por padrão (idêntico ao Linux).","grep [opções] padrão arquivo","-i|Ignora caixa;-r|Recursivo;-n|Linha","grep -rn 'token' .|Procura no projeto","linux:grep;powershell:Select-String;cmd:findstr","busca,texto"],
  ["find","Ferramentas","Intermediário","Busca arquivos no armazenamento do dispositivo.","find caminho -name padrão","-name|Nome;-type|Tipo;-size|Tamanho","find ~/storage -name '*.pdf'|Acha PDFs","linux:find;powershell:Get-ChildItem -Recurse;cmd:dir /s","busca,arquivos"],
  ["tar","Ferramentas","Intermediário","Empacota e extrai arquivos .tar/.tar.gz.","tar [opções] arquivo.tar.gz alvo","-czf|Cria compactado;-xzf|Extrai;-tf|Lista","tar -czf backup.tar.gz ~/projetos|Cria backup","linux:tar;powershell:Compress-Archive;cmd:tar","compactacao,backup"],
  ["zip","Ferramentas","Básico","Compacta arquivos no formato ZIP.","zip [opções] saida.zip arquivos","-r|Recursivo;-e|Com senha","zip -r fotos.zip ~/storage/dcim|Compacta pasta","linux:zip;powershell:Compress-Archive;cmd:tar -a -c -f","compactacao"],
  ["unzip","Ferramentas","Básico","Extrai arquivos ZIP.","unzip [opções] arquivo.zip","-d|Pasta de destino;-l|Lista o conteúdo","unzip pacote.zip -d ~/destino|Extrai na pasta","linux:unzip;powershell:Expand-Archive;cmd:tar -x -f","compactacao"],
];
