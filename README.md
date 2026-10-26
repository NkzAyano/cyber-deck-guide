# Cyber Deck GUIDE

Crie um aplicativo mobile chamado CYBER DECK NKZ, uma central completa de consulta e aprendizado de comandos para Linux, Termux, Windows PowerShell e Windows CMD, voltada para programação, administração de sistemas, redes e cibersegurança ética.

🖥️ SISTEMAS

O aplicativo deve ter 4 áreas principais:

🐧 LINUX 📱 TERMUX 🔵 POWERSHELL ⚫ CMD

Cada sistema deve possuir seus próprios comandos, exemplos, parâmetros e explicações.

🐧 LINUX

Organizar em categorias:

📁 Arquivos

ls, cd, pwd, cp, mv, rm, mkdir, touch, find, locate, tree, file, stat

🔐 Permissões

chmod, chown, chgrp, umask, sudo, su, id, groups

⚙️ Sistema

uname, hostname, uptime, free, df, du, lsblk, lscpu, mount, ps, top, htop

🔄 Processos

ps, top, htop, kill, pkill, pgrep, jobs, bg, fg

🌐 Redes

ip, ss, ping, traceroute, tracepath, dig, nslookup, host, curl, wget

🔥 Firewall

ufw, iptables, nft, firewall-cmd

📦 Pacotes

apt, apt-get, dpkg, pacman, dnf, rpm, apk

📝 Texto e logs

cat, less, head, tail, grep, sed, awk, cut, sort, uniq, wc, journalctl

🔑 Criptografia

openssl, gpg, sha256sum, sha512sum, md5sum, base64

🐚 Bash

variáveis, if, loops, funções, pipes, redirecionamento, scripts e automação.

📱 TERMUX

Criar uma área específica para Android/Termux.

📦 Pacotes

pkg, apt, apt update, apt upgrade, pkg install, pkg search

📱 Android

termux-setup-storage termux-api termux-open termux-share termux-battery-status

🐍 Programação

python pip node npm clang git

🌐 Redes

ping ip ss curl wget ssh scp

🛠️ Ferramentas

nano vim grep find tar zip unzip

Mostrar claramente quais comandos são específicos do Termux e quais são comandos Linux que também funcionam no Termux.

🔵 POWERSHELL

Organizar em categorias:

📁 Arquivos

Get-ChildItem Set-Location New-Item Copy-Item Move-Item Remove-Item Get-Content Set-Content

⚙️ Sistema

Get-ComputerInfo Get-Process Stop-Process Get-Service Start-Service Stop-Service Get-WindowsUpdate

👤 Usuários

Get-LocalUser New-LocalUser Remove-LocalUser Get-LocalGroup Add-LocalGroupMember

🌐 Redes

Get-NetIPConfiguration Get-NetIPAddress Get-NetAdapter Test-Connection Test-NetConnection Resolve-DnsName Get-NetTCPConnection

🔐 Segurança

Get-MpComputerStatus Get-MpThreat Get-NetFirewallProfile Get-NetFirewallRule

📜 Logs

Get-WinEvent

📦 Software

Get-Package Find-Package Install-Package

🧠 PowerShell avançado

pipes objetos variáveis loops funções scripts .ps1 aliases módulos

⚫ CMD

Organizar em categorias:

📁 Arquivos

dir cd md mkdir rd rmdir copy move del type ren

⚙️ Sistema

systeminfo hostname ver whoami tasklist taskkill driverquery set

🌐 Redes

ipconfig ping tracert pathping nslookup netstat arp route hostname

👤 Usuários

whoami net user net localgroup

🔐 Segurança

netsh sc auditpol cipher

💾 Discos

diskpart chkdsk fsutil

📜 Diagnóstico

sfc DISM wevtutil

📝 Scripts

.bat .cmd variáveis IF FOR GOTO CALL SET redirecionamento pipes

🔎 PESQUISA GLOBAL

Criar uma barra:

🔎 Pesquisar comando, ferramenta ou conceito...

Exemplo:

Pesquisar ping

Mostrar:

Linux

ping 8.8.8.8


Termux

ping 8.8.8.8


PowerShell

Test-Connection 8.8.8.8


CMD

ping 8.8.8.8


Explicar a diferença entre cada implementação.

🛡️ CIBERSEGURANÇA

Criar uma seção transversal aos quatro sistemas:

🌐 Networking
🔎 Diagnóstico
🔐 Segurança
📜 Logs
🧪 CTF/Laboratório
🕵️ OSINT
🌐 Web Security
🔑 Criptografia
🛡️ Defesa/SOC
🐚 Automação

Para ferramentas de pentest, mostrar finalidade, instalação, sintaxe e exemplos somente para laboratório próprio, CTF ou sistemas autorizados.

📚 CADA COMANDO DEVE TER

Ao abrir um comando:

Nome: Get-NetTCPConnection

Sistema: PowerShell

Categoria: Networking

Descrição: explicação simples.

Sintaxe:

Get-NetTCPConnection


Parâmetros: explicar os principais.

Exemplo seguro: demonstrar utilização em máquina própria.

Alternativas:

Linux

Termux

CMD

Nível: Básico / Intermediário / Avançado.

Botões:

📋 Copiar ⭐ Favoritar 📖 Ver documentação 🧪 Adicionar aos estudos

📊 SISTEMA DE ESTUDO

Criar progresso para cada sistema:

🐧 Linux — 0% 📱 Termux — 0% 🔵 PowerShell — 0% ⚫ CMD — 0%

Criar níveis:

Nível 1 — Fundamentos ↓ Nível 2 — Sistema ↓ Nível 3 — Redes ↓ Nível 4 — Segurança ↓ Nível 5 — Automação ↓ Nível 6 — Cibersegurança ↓ Nível 7 — CTF/Laboratório

Adicionar quizzes e desafios seguros.

🎨 DESIGN

Visual cyber/terminal profissional:

Dark mode

Interface mobile-first

Cards

Terminal estilizado

Fonte monoespaçada nos comandos

Animações leves

Busca rápida

Ícones para cada sistema

Navegação simples

Favoritos

Histórico

Progresso

Tela inicial:

CYBER DECK NKZ

Linux • Termux • PowerShell • CMD

[ 🔎 Pesquisar comando... ]

SISTEMAS

🐧 Linux
📱 Termux
🔵 PowerShell
⚫ CMD

CATEGORIAS

🌐 Redes
🔐 Segurança
📁 Arquivos
⚙️ Sistema
🐚 Shell
📦 Pacotes
📜 Logs
🧪 CTF
🔑 Criptografia

COMANDO DO DIA

Mostrar um comando diferente todos os dias.

🗃️ BANCO DE DADOS

Não deixar os comandos presos diretamente na interface.

Criar uma estrutura de dados, preferencialmente JSON, contendo:

nome

sistema

categoria

descrição

sintaxe

parâmetros

exemplos

alternativas

nível

tags

Assim será possível adicionar centenas ou milhares de comandos posteriormente sem alterar a interface.

O aplicativo deve ser funcional, rápido, responsivo e preparado para crescer como uma grande enciclopédia de terminal para programação e cibersegurança.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cyber-deck-guide.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c702efb4-d723-4543-958a-60a1053c529b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
