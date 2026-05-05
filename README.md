# Choque Econômico — Manual do Operador

Choque Econômico é um jogo de simulação econômica para grupos de 1 a 4 participantes, desenvolvido para a PUC Aberta 2026. O jogo é operado localmente, sem necessidade de internet, e funciona inteiramente no navegador. Em caso de dificuldades durante o evento, consulte diretamente a seção [Solução de Problemas](#solução-de-problemas).

---

## Solução de Problemas

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Janela preta com mensagem "Node.js nao encontrado" | Node.js não está instalado no computador | Instale o Node.js LTS em https://nodejs.org/ e execute `Iniciar.bat` novamente |
| Nenhuma janela do navegador abre | O navegador padrão bloqueou abertura automática | Copie o endereço exibido na janela preta do terminal e cole manualmente no navegador |
| Painel do operador exibe "Aguardando" e não atualiza | As duas janelas estão em navegadores diferentes, ou o operador foi aberto antes do jogo | Abra ambas as janelas no mesmo navegador; se necessário, feche o painel e abra novamente pelo endereço correto |
| Mensagem "Nenhuma porta livre entre 5174 e 5190" | Todas as portas do intervalo estão ocupadas por outros processos | Feche outros servidores ou reinicie o computador e tente novamente |
| Tela em branco no navegador | O arquivo `dist\index.html` está ausente ou a pasta `dist` está incompleta | Verifique se a pasta `dist` contém `index.html` e `operador.html`; se não, solicite o pacote completo ao responsável técnico |
| Jogo para de responder após a pausa | Estado inconsistente entre as janelas | Pressione **Espaço** no painel do operador para retomar; se não responder, use **Reiniciar** |

---

## Pré-requisitos

- Windows 10 ou Windows 11
- Node.js LTS (v18 ou superior) instalado — https://nodejs.org/
- Navegador moderno: Google Chrome, Microsoft Edge ou Firefox (versão recente)
- Resolução mínima recomendada: 1920 × 1080 (16:9)
- As duas janelas (jogo e painel do operador) devem ser abertas **no mesmo navegador**

> **Versão Portable:** se estiver usando a pasta `Choques-Economicos-Jogo-Portable`, o Node.js já está incluído e não precisa ser instalado separadamente.

---

## Como Iniciar

1. Abra a pasta `Choques-Economicos-Jogo`.
2. Clique duas vezes em **`Iniciar.bat`**.
3. Uma janela preta (terminal) será aberta. Aguarde até aparecer a mensagem com os dois endereços.
4. O navegador abrirá automaticamente com duas janelas: a tela do jogo e o painel do operador.
5. Posicione a tela do jogo na TV ou projetor (modo tela cheia: tecla **F11**).
6. Mantenha o painel do operador no notebook do responsável.
7. **Não feche a janela preta do terminal** enquanto o evento estiver em andamento.

**Para encerrar o servidor:** clique na janela preta do terminal e pressione **Ctrl+C**, ou feche a janela diretamente.

---

## Endereços

O servidor escolhe automaticamente a primeira porta disponível entre 5174 e 5190. A porta exata é exibida na janela do terminal ao iniciar. Substitua `PORTA` pelo número informado.

| Tela | Endereço |
|---|---|
| Jogo (TV / projetor) | `http://127.0.0.1:PORTA/` |
| Painel do operador (notebook) | `http://127.0.0.1:PORTA/operador.html` |

---

## Fluxo de Telas

O jogo percorre as fases abaixo em ordem. As fases de rodada (9–17) repetem-se 4 vezes.

| # | Fase | O que aparece na tela | Ação disponível para o operador |
|---|---|---|---|
| 1 | Atração | Tela idle animada (logotipo / ranking do dia) | Nenhuma — aguarda o grupo se apresentar |
| 2 | Menu principal | Botões: Jogar, Como funciona, Demo, Ranking, Créditos | Nenhuma |
| 3 | Como funciona | Slideshow com 5 slides explicativos | Nenhuma |
| 4 | Seleção de modo | Escolha do nível: Vida Real, Estrategista ou Economista | Nenhuma |
| 5 | Seleção de formato | Escolha do grupo: individual, dupla, trio ou quarteto | Nenhuma |
| 6 | Cadastro de participantes | Campo para digitar o nome de cada jogador | Nenhuma |
| 7 | Perfis iniciais | Cada jogador escolhe seu perfil: Conservador, Equilibrado, Foco em Educação ou Agressivo | Nenhuma |
| 8 | Confirmação | Resumo das configurações antes de iniciar | Nenhuma |
| 9 | Preparar rodada | Contagem regressiva 3–2–1 (3 s, automático) | Pausar / Avançar |
| 10 | Introdução da rodada | Título "RODADA X/4" com tema (2 s, automático) | Pausar / Avançar |
| 11 | Choque econômico | Descrição do choque da rodada (30 s de leitura) | Pausar / Avançar |
| 12 | Ordem de jogada | Nome do jogador que responde a seguir | Pausar / Avançar |
| 13 | Decisão | 4 opções (A / B / C / D) com timer de 10 s por jogador | Pausar / Selecionar opção remotamente pelo teclado |
| 14 | Decisões registradas | Confirmação de que todas as respostas foram salvas (3 s) | Pausar / Avançar |
| 15 | Impacto | Resultados financeiros da rodada (5 s, automático) | Pausar / Avançar |
| 16 | Análise | Card educacional explicando o choque | Avançar (manual) |
| 17 | Ranking parcial | Classificação após a rodada com histórico (3 s, automático) | Pausar / Avançar |
| 18 | Ranking final | Ranking final com animação de troféu (automático) | Pausar / Avançar |
| 19 | Medalhas | Selos e medalhas revelados sequencialmente | Avançar para revelar próxima medalha |
| 20 | Replay | Botões: Jogar novamente, Menu, Demo, Rankings | Nenhuma |
| 21 | Ranking do dia | Histórico de todas as partidas da sessão atual | Nenhuma |
| 22 | Créditos | Créditos do jogo | Nenhuma |

---

## Painel do Operador

### Botões de comando

| Botão | Fases disponíveis | Efeito |
|---|---|---|
| **Pausar jogo / Retomar jogo** | Rodadas 9–17 e Rankings 18–19 | Congela ou libera todos os timers do jogo; o estado dos participantes é preservado |
| **Reiniciar** | Qualquer fase após o início da partida | Reinicia a partida com o mesmo grupo e configurações; útil se um grupo precisar recomeçar |
| **Próximo grupo** | Qualquer fase após o início da partida | Encerra a sessão atual e retorna à tela de cadastro de participantes para o próximo grupo |

### Informações em tempo real

| Campo | Descrição |
|---|---|
| Status | Aguardando / Pausado / Ao vivo |
| Tela atual | Nome da fase em que o jogo se encontra |
| Rodada | Número da rodada atual (ex.: 2/4) |
| Timer | Segundos restantes na fase atual (fica vermelho abaixo de 3 s) |
| Progresso | Percentual de conclusão da partida atual |
| Participantes | Lista com o status de cada jogador: **Respondendo**, **OK** ou **Aguardando** |
| Respondendo agora | Nome do jogador que está na vez de decidir |
| Sessões iniciadas | Contagem de partidas iniciadas desde que o servidor foi aberto |
| Última atualização | Horário da última sincronização entre jogo e painel |

---

## Atalhos de Teclado

Os atalhos abaixo funcionam quando o foco está no **painel do operador** (janela `operador.html`).

| Tecla | Ação |
|---|---|
| **Enter** | Avança para a próxima fase (equivalente ao avanço automático antecipado) |
| **Espaço** | Alterna entre pausar e retomar o jogo |
| **A** ou **1** | Seleciona a opção A para o jogador atual (somente na fase Decisão) |
| **B** ou **2** | Seleciona a opção B para o jogador atual (somente na fase Decisão) |
| **C** ou **3** | Seleciona a opção C para o jogador atual (somente na fase Decisão) |
| **D** ou **4** | Seleciona a opção D para o jogador atual (somente na fase Decisão) |

> Os atalhos de opção (A–D / 1–4) não funcionam enquanto o cursor estiver em um campo de texto.

---

## Operando Múltiplos Grupos

Não é necessário reiniciar o servidor entre grupos. O fluxo recomendado é:

1. Ao término de uma partida, a tela de Replay (fase 20) é exibida automaticamente.
2. Clique em **Próximo grupo** no painel do operador **ou** aguarde o grupo clicar em "Jogar novamente" na tela do jogo.
3. O jogo retorna à tela de cadastro de participantes (fase 6).
4. O novo grupo insere os nomes e inicia normalmente.
5. O contador de sessões no painel é incrementado automaticamente.

O histórico de todas as partidas do dia fica disponível em **Ranking do dia** (fase 21), acessível pelo menu principal.

---

## Tutorial em Imagens

A pasta `Tutorial Operadores/` contém um guia visual com 5 imagens de referência.

| Imagem | Conteúdo |
|---|---|
| `01.png` | Iniciando o servidor — como executar o `Iniciar.bat` e identificar os endereços na janela do terminal |
| `02.png` | Visão geral do painel do operador — identificação dos três painéis (Status, Participantes, Comandos) |
| `03.png` | Fase de decisão — tela do jogo com as 4 opções e uso dos atalhos de teclado para seleção remota |
| `04.png` | Controles durante a rodada — uso dos botões Pausar, Reiniciar e Próximo grupo em situações reais |
| `05.png` | Troca de grupo — fluxo para encerrar uma sessão e preparar o jogo para o próximo grupo sem reiniciar |

---

## Estrutura da Pasta

```
Choques-Economicos-Jogo/
├── Iniciar.bat              ← execute este arquivo para iniciar o jogo
├── server.js                ← servidor local (não editar)
├── Tutorial Operadores/     ← guia visual em imagens (5 imagens)
└── dist/
    ├── index.html           ← tela principal do jogo (TV / projetor)
    ├── operador.html        ← painel do operador (notebook)
    └── assets/              ← imagens, fontes e scripts compilados (não editar)
```
