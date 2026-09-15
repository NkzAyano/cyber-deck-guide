import type { Row } from "./types";

export const cmdRows: Row[] = [
  // 📁 Arquivos
  ["dir","Arquivos","Básico","Lista arquivos e pastas do diretório atual.","dir [caminho] [opções]","/a|Inclui ocultos;/s|Recursivo;/b|Formato simples;/o|Ordena","dir /a /o-d|Lista tudo por data","linux:ls -la;termux:ls -la;powershell:Get-ChildItem","arquivos,listar"],
  ["cd","Arquivos","Básico","Muda ou exibe o diretório atual.","cd [caminho]","/d|Muda também de unidade;..|Sobe um nível","cd /d D:\\Projetos|Troca de unidade e pasta","linux:cd;termux:cd;powershell:Set-Location","navegacao"],
  ["md","Arquivos","Básico","Cria um diretório (igual a mkdir).","md nome","—|Cria caminhos aninhados","md logs\\2026|Cria a estrutura","linux:mkdir -p;termux:mkdir -p;powershell:New-Item -ItemType Directory","arquivos,criar"],
  ["mkdir","Arquivos","Básico","Cria diretórios (sinônimo de md).","mkdir nome","—|Aceita vários caminhos","mkdir backup|Cria a pasta","linux:mkdir;termux:mkdir;powershell:New-Item -ItemType Directory","arquivos,criar"],
  ["rd","Arquivos","Básico","Remove um diretório.","rd [opções] nome","/s|Remove conteúdo;/q|Sem confirmação","rd /s /q temp|Remove a pasta inteira","linux:rm -r;termux:rm -r;powershell:Remove-Item -Recurse","arquivos,remover"],
  ["rmdir","Arquivos","Básico","Remove diretórios (sinônimo de rd).","rmdir [/s] [/q] nome","/s|Recursivo;/q|Silencioso","rmdir vazio|Remove pasta vazia","linux:rmdir;termux:rmdir;powershell:Remove-Item","arquivos,remover"],
  ["copy","Arquivos","Básico","Copia arquivos.","copy origem destino","/y|Sobrescreve sem perguntar;/v|Verifica","copy relatorio.txt D:\\Backup|Copia o arquivo","linux:cp;termux:cp;powershell:Copy-Item","arquivos,copiar"],
  ["move","Arquivos","Básico","Move ou renomeia arquivos e pastas.","move origem destino","/y|Sobrescreve automaticamente","move nota.txt D:\\Docs|Move o arquivo","linux:mv;termux:mv;powershell:Move-Item","arquivos,mover"],
  ["del","Arquivos","Básico","Apaga arquivos.","del [opções] arquivo","/f|Força;/q|Sem confirmação;/s|Subpastas","del /q temp\\*.log|Apaga logs temporários","linux:rm;termux:rm;powershell:Remove-Item","arquivos,remover"],
  ["type","Arquivos","Básico","Mostra o conteúdo de um arquivo de texto.","type arquivo","—|Aceita vários arquivos","type C:\\Windows\\System32\\drivers\\etc\\hosts|Lê o hosts","linux:cat;termux:cat;powershell:Get-Content","texto,leitura"],
  ["ren","Arquivos","Básico","Renomeia arquivos e pastas.","ren antigo novo","—|Aceita curingas","ren nota.txt notas.txt|Renomeia","linux:mv;termux:mv;powershell:Rename-Item","arquivos,renomear"],

  // ⚙️ Sistema
  ["systeminfo","Sistema","Básico","Exibe informações completas do sistema e das correções instaladas.","systeminfo [/s host]","/s|Máquina remota;/fo|Formato de saída","systeminfo | find \"Sistema\"|Filtra a saída","linux:uname -a;termux:uname -a;powershell:Get-ComputerInfo","sistema,inventario","Diagnóstico"],
  ["hostname","Sistema","Básico","Mostra o nome da máquina.","hostname","—|Sem parâmetros","hostname|Nome do computador","linux:hostname;termux:hostname;powershell:hostname","sistema"],
  ["ver","Sistema","Básico","Mostra a versão do Windows.","ver","—|Sem parâmetros","ver|Versão do sistema","linux:uname -r;termux:uname -r;powershell:$PSVersionTable","sistema"],
  ["whoami","Sistema","Básico","Mostra o usuário logado, grupos e privilégios.","whoami [/all]","/all|Tudo;/groups|Grupos;/priv|Privilégios","whoami /priv|Privilégios da sessão","linux:id;termux:id;powershell:whoami /all","usuarios,auditoria","Segurança"],
  ["tasklist","Sistema","Básico","Lista os processos em execução.","tasklist [/fi filtro]","/svc|Serviços por processo;/fi|Filtro;/v|Detalhado","tasklist /svc|Processos e serviços","linux:ps aux;termux:ps -ef;powershell:Get-Process","processos","Diagnóstico"],
  ["taskkill","Sistema","Intermediário","Encerra processos por PID ou nome.","taskkill [/pid n | /im nome] [/f]","/f|Força;/t|Inclui filhos;/im|Por nome","taskkill /im notepad.exe|Fecha o bloco de notas","linux:kill/pkill;termux:kill;powershell:Stop-Process","processos"],
  ["driverquery","Sistema","Intermediário","Lista os drivers instalados.","driverquery [/v] [/fo formato]","/v|Detalhado;/si|Drivers assinados","driverquery /si|Verifica assinatura dos drivers","linux:lsmod;termux:-;powershell:Get-WindowsDriver","drivers,inventario","Diagnóstico"],
  ["set","Sistema","Básico","Exibe ou define variáveis de ambiente.","set [nome=valor]","—|Sem valor mostra as variáveis;setx|Persistente","set PATH|Mostra o PATH","linux:export;termux:export;powershell:$env:","variaveis,ambiente"],

  // 🌐 Redes
  ["ipconfig","Redes","Básico","Mostra a configuração de rede do Windows.","ipconfig [/all] [/flushdns]","/all|Detalhes completos;/release|Libera IP;/renew|Renova;/flushdns|Limpa o cache DNS","ipconfig /all|Configuração completa","linux:ip addr;termux:ip addr;powershell:Get-NetIPConfiguration","redes","Networking"],
  ["ping","Redes","Básico","Testa conectividade com um host.","ping [opções] destino","-n|Número de pacotes;-t|Contínuo;-l|Tamanho","ping -n 4 8.8.8.8|Quatro pacotes","linux:ping -c 4;termux:ping -c 4;powershell:Test-Connection","redes,diagnostico","Networking"],
  ["tracert","Redes","Básico","Mostra o caminho até um destino.","tracert [opções] destino","-d|Sem DNS;-h|Máximo de saltos","tracert -d 1.1.1.1|Rota sem resolver nomes","linux:traceroute;termux:traceroute;powershell:Test-NetConnection -TraceRoute","redes,diagnostico","Networking"],
  ["pathping","Redes","Intermediário","Combina tracert e ping medindo perda por salto.","pathping destino","-n|Sem DNS;-q|Consultas por salto","pathping 1.1.1.1|Analisa perda de pacotes","linux:mtr;termux:mtr;powershell:Test-NetConnection","redes,diagnostico","Diagnóstico"],
  ["nslookup","Redes","Básico","Consulta registros DNS.","nslookup nome [servidor]","-type=|Tipo do registro;-debug|Detalhado","nslookup -type=MX exemplo.com|Registros de e-mail","linux:dig;termux:dig;powershell:Resolve-DnsName","dns","OSINT"],
  ["netstat","Redes","Intermediário","Mostra conexões, portas e estatísticas de rede.","netstat [opções]","-a|Todas;-n|Numérico;-o|PID;-b|Executável","netstat -ano | findstr LISTENING|Portas em escuta","linux:ss -tulpn;termux:ss -tuln;powershell:Get-NetTCPConnection","redes,portas","Networking"],
  ["arp","Redes","Intermediário","Exibe e altera a tabela ARP (IP ↔ MAC).","arp [-a] [-d]","-a|Lista a tabela;-d|Apaga entrada","arp -a|Vizinhos da rede local","linux:ip neigh;termux:ip neigh;powershell:Get-NetNeighbor","redes,camada2","Networking"],
  ["route","Redes","Intermediário","Mostra e altera a tabela de rotas.","route [print|add|delete]","print|Lista;add|Adiciona;-p|Persistente","route print|Tabela de rotas","linux:ip route;termux:ip route;powershell:Get-NetRoute","redes,rotas","Networking"],

  // 👤 Usuários
  ["net user","Usuários","Intermediário","Lista, cria e altera contas locais.","net user [nome] [/add|/delete]","/add|Cria;/delete|Remove;/active|Ativa ou desativa","net user|Lista as contas locais","linux:cat /etc/passwd;termux:id;powershell:Get-LocalUser","usuarios","Defesa/SOC"],
  ["net localgroup","Usuários","Intermediário","Gerencia grupos locais e seus membros.","net localgroup [grupo] [usuario] [/add]","/add|Adiciona membro;/delete|Remove","net localgroup administradores|Vê quem é administrador","linux:getent group;termux:groups;powershell:Get-LocalGroupMember","usuarios,privilegios","Segurança"],

  // 🔐 Segurança
  ["netsh","Segurança","Avançado","Configura rede e firewall do Windows pela linha de comando.","netsh contexto comando","advfirewall|Firewall;wlan show profiles|Redes Wi-Fi;interface|Interfaces","netsh advfirewall show allprofiles|Estado do firewall","linux:ufw / iptables;termux:-;powershell:Get-NetFirewallProfile","firewall,redes","Segurança"],
  ["sc","Segurança","Avançado","Controla serviços do Windows.","sc [query|start|stop|config] servico","query|Consulta;qc|Configuração;config|Altera","sc query windefend|Estado do Defender","linux:systemctl;termux:-;powershell:Get-Service","servicos","Defesa/SOC"],
  ["auditpol","Segurança","Avançado","Consulta e define as políticas de auditoria.","auditpol /get|/set /category:...","/get|Consulta;/set|Define;/category|Categoria","auditpol /get /category:*|Política de auditoria atual","linux:auditctl -l;termux:-;powershell:Get-WinEvent","auditoria,logs","Defesa/SOC"],
  ["cipher","Segurança","Avançado","Gerencia criptografia EFS e apaga espaço livre com segurança.","cipher [/e|/d|/w:pasta]","/e|Criptografa;/d|Descriptografa;/w|Limpa espaço livre","cipher /w:C:\\temp|Sobrescreve espaço livre","linux:shred;termux:shred;powershell:-","criptografia,forense","Criptografia"],

  // 💾 Discos
  ["diskpart","Discos","Avançado","Ferramenta interativa de particionamento. Use com muito cuidado.","diskpart","list disk|Lista discos;select|Seleciona;detail|Detalhes","diskpart → list disk|Ver discos sem alterar nada","linux:fdisk/lsblk;termux:-;powershell:Get-Disk","disco,particoes"],
  ["chkdsk","Discos","Intermediário","Verifica e corrige erros no sistema de arquivos.","chkdsk [unidade] [/f] [/r]","/f|Corrige erros;/r|Recupera setores;/scan|Online","chkdsk C: /scan|Verificação sem reiniciar","linux:fsck;termux:-;powershell:Repair-Volume","disco,manutencao","Diagnóstico"],
  ["fsutil","Discos","Avançado","Utilitário avançado de sistema de arquivos.","fsutil comando subcomando","fsinfo|Informações;volume|Espaço livre;file|Arquivos","fsutil volume diskfree C:|Espaço livre","linux:df -h / tune2fs;termux:df -h;powershell:Get-Volume","disco,avancado"],

  // 📜 Diagnóstico
  ["sfc","Diagnóstico","Intermediário","Verifica e repara arquivos de sistema corrompidos.","sfc /scannow","/scannow|Verifica tudo;/verifyonly|Só verifica","sfc /scannow|Repara o sistema","linux:debsums;termux:-;powershell:Repair-WindowsImage","manutencao,reparo","Diagnóstico"],
  ["DISM","Diagnóstico","Avançado","Serviço e reparo da imagem do Windows.","DISM /Online /Cleanup-Image /opção","/CheckHealth|Checagem rápida;/ScanHealth|Análise;/RestoreHealth|Reparo","DISM /Online /Cleanup-Image /CheckHealth|Checa a integridade","linux:-;termux:-;powershell:Repair-WindowsImage","manutencao,reparo","Diagnóstico"],
  ["wevtutil","Diagnóstico","Avançado","Consulta e gerencia logs de eventos pela linha de comando.","wevtutil comando [log]","qe|Consulta eventos;el|Lista logs;cl|Limpa log","wevtutil qe Security /c:5 /rd:true /f:text|Cinco eventos recentes","linux:journalctl;termux:logcat;powershell:Get-WinEvent","logs,auditoria","Logs"],

  // 📝 Scripts
  ["arquivos .bat e .cmd","Scripts","Básico","Arquivos de lote que executam sequências de comandos.","script.bat","@echo off|Oculta os comandos;pause|Aguarda;REM|Comentário","@echo off & ipconfig /all > rede.txt|Salva a configuração","linux:script.sh;termux:script.sh;powershell:script.ps1","scripts,automacao","Automação"],
  ["variáveis (SET)","Scripts","Básico","Define variáveis em scripts de lote.","SET nome=valor","/a|Expressão aritmética;/p|Lê do usuário;%nome%|Uso","SET /a total=2+3|Calcula e guarda","linux:nome=valor;termux:nome=valor;powershell:$nome=valor","variaveis,scripts"],
  ["IF","Scripts","Básico","Condicionais em scripts de lote.","IF [NOT] condição comando","EXIST|Arquivo existe;ERRORLEVEL|Código de saída;==|Comparação","IF EXIST rede.txt echo pronto|Testa o arquivo","linux:if;termux:if;powershell:if","logica,scripts","Automação"],
  ["FOR","Scripts","Intermediário","Laços de repetição em lote.","FOR %%i IN (conjunto) DO comando","/f|Lê arquivos e saídas;/l|Contador;/d|Diretórios","FOR /L %%i IN (1,1,5) DO ping -n 1 10.0.0.%%i|Varre o próprio laboratório","linux:for;termux:for;powershell:foreach","loops,scripts","Automação"],
  ["GOTO","Scripts","Intermediário","Desvia a execução para um rótulo do script.","GOTO rotulo",":rotulo|Define o destino;:eof|Fim do arquivo","GOTO fim|Pula para o rótulo","linux:-;termux:-;powershell:-","scripts,fluxo"],
  ["CALL","Scripts","Intermediário","Chama outro script ou sub-rotina retornando em seguida.","CALL script.bat | CALL :rotulo","—|Preserva o contexto atual","CALL :coleta|Executa a sub-rotina","linux:source;termux:source;powershell:. .\\script.ps1","scripts,fluxo"],
  ["redirecionamento e pipes","Scripts","Básico","Direciona saída para arquivos ou encadeia comandos.","comando > arquivo | comando2",">|Sobrescreve;>>|Anexa;2>&1|Inclui erros;||Encadeia","tasklist | findstr chrome|Filtra a saída","linux:> e |;termux:> e |;powershell:Out-File e |","scripts,shell","Automação"],
];
