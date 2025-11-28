🍔 Build Your Burger - CRAFT BURGUER
📋 Descrição do Projeto
O Build Your Burger é uma aplicação web interativa que permite aos usuários montarem seus próprios hambúrgueres personalizados de forma dinâmica. Desenvolvido como trabalho acadêmico, o sistema simula uma experiência real de customização de lanches em uma hamburgueria artesanal.

🎯 Objetivo
Criar uma interface intuitiva onde o usuário pode selecionar ingredientes, visualizar o pedido em tempo real e receber feedback imediato sobre suas escolhas.

🚀 Funcionalidades Principais
Seleção de Ingredientes por Categoria: Pães, carnes, queijos, extras e saladas

Sistema de Limites Inteligente: Controle de quantidades máximas por item e categoria

Resumo em Tempo Real: Visualização instantânea do pedido e valor total

Sistema de Observações: Campo para adicionar instruções especiais

Horário de Funcionamento Dinâmico: Verificação automática do status da loja

Feedback Visual: Animações e mensagens de confirmação

🛠 Tecnologias Utilizadas
HTML5 - Estrutura semântica

CSS3 - Grid, Flexbox, Animações e Keyframes

JavaScript - Manipulação DOM, Eventos, Estruturas de Dados

📁 Estrutura do Projeto
text
build-your-burger/
│
├── index.html          # Estrutura principal
├── style.css           # Estilos e animações
├── script.js           # Lógica da aplicação
├── img/               # Imagens dos ingredientes
│   ├── logo.png
│   ├── pao_brioche.png
│   ├── bife_boi.png
│   └── ...
└── README.md

⚙️ Instalação e Execução
Clone o repositório:

bash
git clone [url-do-repositorio]
Acesse o diretório:

bash
cd build-your-burger
Execute o projeto:

Abra o arquivo index.html em qualquer navegador moderno

Ou use um servidor local:

bash
python -m http.server 8000
# Acesse: http://localhost:8000

🎮 Como Usar
Selecione o pão: Clique em um dos pães disponíveis (seleção única)

Adicione carnes: Use os botões + e - para controlar as quantidades (máximo 3 no total)

Escolha queijos e extras: Adicione até o limite permitido por item

Inclua saladas: Alguns itens são gratuitos!

Adicione observações: Clique no botão para incluir instruções especiais

Confirme o pedido: Visualize o resumo final e confirme

✅ Requisitos Técnicos Atendidos
HTML Semântico
Uso de <header>, <section>, <button> com atributos ARIA

Estrutura acessível e bem organizada

CSS com Grid e Flex
Grid Layout:

Layout principal com grid-template-columns

Grade de ingredientes com repeat(3, 1fr)

Flexbox:

Header centralizado

Controles de quantidade

Botões de ação

Animações (6 implementadas)
slideInHeader - Entrada do cabeçalho

resumoEnter - Aparecimento do resumo

press - Efeito de clique nos botões

hover_efeito - Hover nos cards

.selecionado - Destaque visual

Transições de cor e transform

JavaScript
Arrays: ingredientes, horarioLoja, meuHamburguer

Objetos: Estrutura completa de ingredientes com propriedades

Manipulação DOM:

atualizarResumo() - Criação dinâmica de elementos

gerenciarObservacao() - Formulário dinâmico

Eventos: click e DOMContentLoaded

CSS via JS: classList.add/remove, element.style

🎯 Destaques Técnicos

Sistema de Limites

javascript

// Limite por categoria (ex: carnes)
const limiteCarnes = 3;

// Limite por item individual
{id: 3, nome: "Blend Bovino", preco: 12.00, limite: 3, categoria: 'carne'}

Horário de Funcionamento Inteligente

Verificação automática baseada no horário real

Cálculo de horários que passam da meia-noite

Mensagens dinâmicas de status

Feedback Visual

Mensagens toast para confirmações e erros

Estados visuais para itens selecionados

Animações de entrada e interação

👥 Desenvolvido por
GUSTAVO RIBEIRO CARPANEZ - gustavocarpanez@hotmail.com

PEDRO PAULO REIS RODRIGUES - E-MAIL

📄 Licença
Este projeto foi desenvolvido para fins acadêmicos na disciplina de Desenvolvimento Web.