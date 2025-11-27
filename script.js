//ARRAY DE INGREDIENTES DISPONÍVEIS
const ingredientes = [
    {id: 1, nome: "Pão Brioche", preco: 3.50, limite: 1, categoria: 'pao'},
    {id: 2, nome: "Pão Australino", preco: 4.50, limite: 1, categoria: 'pao'},
    {id: 3, nome: "Blend Bovino", preco: 12.00, limite: 3, categoria: 'carne'},
    {id: 4, nome: "Bife de Frango", preco: 10.00, limite: 3, categoria: 'carne'},
    {id: 5, nome: "Bacon", preco: 4.00, limite: 2, categoria: 'extra'},
    {id: 6, nome: "Ovo", preco: 2.50, limite: 2, categoria: 'extra'},
    {id: 7, nome: "Mussarela", preco: 3.20, limite: 3, categoria: 'queijo'},
    {id: 8, nome: "Queijo Prato", preco: 3.80, limite: 3, categoria: 'queijo'},
    {id: 9, nome: "Creme de Gorgonzola", preco: 5.30, limite: 1, categoria: 'queijo'},
    {id: 10, nome: "Catupiry", preco: 4.90, limite: 1, categoria: 'queijo'},
    {id: 11, nome: "Cheddar Cremoso", preco: 4.90, limite: 1, categoria: 'queijo'},
    {id: 12, nome: "Alface", preco: 0.00, limite: 1, categoria: 'salada'},
    {id: 13, nome: "Tomate", preco: 0.00, limite: 1, categoria: 'salada'},
    {id: 14, nome: "Cebola Roxa", preco: 1.50, limite: 2, categoria: 'salada'},
    {id: 15, nome: "Cebola Caramelizada", preco: 2.00, limite: 2, categoria: 'salada'},
    {id: 16, nome: "Picles de Pepino", preco: 2.80, limite: 2, categoria: 'salada'},
]

//ARRAY PARA A VERIFICAÇÃO DO HORÁRIO DE FUNCIONAMENTO
const horarioLoja = [
    {abre: "18:00", fecha: "03:00"}, //domingo
    {abre: null, fecha: null}, //segunda
    {abre: null, fecha: null}, //terça
    {abre: null, fecha: null}, //quarta
    {abre: "17:30", fecha: "01:00"}, //quinta
    {abre: "18:00", fecha: "02:00"}, //sexta
    {abre: "18:00", fecha: "03:30"} // sábado
];
const nomeDias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

//LISTAGEM DE ITENS DO HAMBURGUER
let meuHamburguer = []

//BUSCADOR DE ITENS E LIMITADOR DE QUANTIDADE CONJUGADA
const encontrarIngrediente = (id) => ingredientes.find(i => i.id == id);
const limiteCarnes = 3;

//CONTROLADOR DO HORÁRIO DE FUNCIONAMENTO
function horarioFuncionamento () {
    const agora = new Date();
    const diaAtual = agora.getDay(); //retorna de 0 a 6 para os dias da semana
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();
    const horarioHoje = horarioLoja[diaAtual]; //pega o horário de funcionamento do dia atual
                                            //na lista de horario da loja
    const horarioOntem = horarioLoja[(diaAtual + 6) % 7];
    let mensagemFuncionamento = ""
    if (horarioHoje.abre) {
        const hAtualEmMin = (horaAtual * 60 + minutoAtual)
        //Mapeia a hora e minuto de aberture como numero
        //Utiliza um acumulador para calcular, iniciando em 0
        //Calcula acc*60 e soma m=hora (primeiro argumento)
        //Depois acc=hora ¬ acc*60 e soma m=minuto (segundo argumento)
        //Temos hora*60+minuto
        const hAbreEmMin = horarioHoje.abre.split(':').map(Number).reduce((h, m) => h*60 + m, 0);
        const hFechaEmMin = horarioHoje.fecha.split(':').map(Number).reduce((h, m) => h*60 +m, 0);
        let hFechaEmMinOntem = 0
        if (horarioOntem.abre) {
            const [hfechaOntem, minFechaOntem] = horarioOntem.fecha.split(':').map(Number);
            hFechaEmMinOntem = hfechaOntem*60 + minFechaOntem + 24*60;
        }
        if (hAtualEmMin < hAbreEmMin) {
            if ((hAtualEmMin + 24*60) <= hFechaEmMinOntem) {
                mensagemFuncionamento = "🟢 Loja Aberta";
            } else {
                mensagemFuncionamento = `🔴 Loja Fechada no momento, abrimos às ${horarioHoje.abre}`;
            }
        } else {
            if (hAtualEmMin <= hFechaEmMin) {
                mensagemFuncionamento = "🟢 Loja Aberta";
            } else {
                mensagemFuncionamento = `🔴 Loja Fechada no momento, abrimos às ${horarioHoje.abre}`;
            }
        }
    } else {
        let proximoDia = (diaAtual + 1) % 7;
        while (!horarioLoja[proximoDia].abre) {
            proximoDia = (proximoDia + 1) % 7;
        }
        mensagemFuncionamento = `🔴 Loja Fechada no momento. Abrimos ${nomeDias[proximoDia]} às ${horarioLoja[proximoDia].abre}h.`
    }
    return mensagemFuncionamento;
}

//CONTROLADOR DA QUANTIDADE DE ITENS NO MEUHAMBURGUER
function alterarQuantidade(evento) {
    const elemento = evento.target.closest('.item');
    const itemID = Number(elemento.dataset.id);
    const limiteItem = Number(encontrarIngrediente(itemID).limite);
    const ingredienteData = encontrarIngrediente(itemID);
    const itemNoHamburguer = meuHamburguer.find(i => i.id === itemID);
    const botao = evento.target.closest('button');
    const resumo = document.querySelector('.resumo')
    
    if (botao) {
        const acao = botao.dataset.acao;
        if (acao === 'adicionar') {
            if (!itemNoHamburguer) {
                meuHamburguer.push({...ingredienteData, quantidade: 1});
            } else {
                if (itemNoHamburguer.quantidade === limiteItem) {
                    alert(`Limite desse item atingido! (${limiteItem})`);
                } else {
                    const qntcarnes = meuHamburguer
                    .filter(i => i.categoria === 'carne')
                    .reduce((acumulador, item) => acumulador + item.quantidade, 0);
                    if (ingredienteData.categoria === 'carne') {
                        if (qntcarnes > 2) {
                            alert("Limite de carnes atingido! (3)")
                            return;
                        } else {
                            itemNoHamburguer.quantidade++;
                        }
                    } else {
                        itemNoHamburguer.quantidade++;
                    }
                }
            }
        } else if (acao === 'remover') {
            if (!itemNoHamburguer) {
                return;
            } else {
                if (itemNoHamburguer.quantidade === 1) {
                    meuHamburguer = meuHamburguer.filter(item => item.id != itemID)
                } else {
                    itemNoHamburguer.quantidade--;
                }
            }
        }
        console.log(meuHamburguer)
        }
}

//CONTROLADOR DO SPAN QUANTIDADE
function atualizarDOM() {
    document.querySelectorAll('.controle_quantidade').forEach(div => {
        const id = Number(div.dataset.id);
        const span = div.querySelector('span');
        const item = meuHamburguer.find(i => i.id === id);
        const quantidade = item?.quantidade ?? 0;
        if (Number(span.textContent) != quantidade) {
            span.textContent = quantidade;
        }
    })
}

//CONTROLADOR DO ESTILO DE ITENS SELECIONADOS
function atualizarEstilos() {
    document.querySelectorAll('.card_item').forEach(card => {
        const id = Number(card.dataset.id);
        const item = meuHamburguer.find(i => i.id === id);
        const quantidade = item?.quantidade ?? 0;
        if (quantidade != 0) {
            card.classList.add('selecionado');
        } else {
            card.classList.remove('selecionado');
        }
    })
}

//CONTROLADOR DA COMANDA DO CLIENTE
function atualizarResumo () {
    const divResumo = document.querySelector('.resumo')
    divResumo.classList.add('opacidade')
    divResumo.querySelectorAll('p').forEach(p => {
        p.remove();
    })
    divResumo.querySelectorAll('div').forEach(div => {
        div.remove();
    })
    let precoItem = 0
    meuHamburguer.forEach(item => {
        const pItem = document.createElement('p');
        const pValor = document.createElement('p');
        const nome = item.nome;
        const quantidade = item.quantidade;
        const valor = item.preco;
        pItem.textContent = `${nome} x ${quantidade}`;
        pValor.textContent = `R$ ${(valor*quantidade).toFixed(2).replace(".", ",")}`
        precoItem = Number(precoItem) + Number((valor*quantidade).toFixed(2))
        divResumo.appendChild(pItem);
        divResumo.appendChild(pValor);
    })
    const pPreco = document.createElement('div')
    pPreco.textContent = `Total: R$ ${precoItem.toFixed(2).replace(".", ",")}`
    divResumo.appendChild(pPreco);
}

//CONTROLADOR DO PAO SELECIONADO - ITEM EXCLUSIVO E OBRIGATÓRIO
function selecionarPao(evento) {
    //Encontra a div do pão clicado
    const elemento = evento.target.closest('.item-pao');

    if (!elemento) return;

    //Cria uma lista com todos os elementos dentro do container
    const id = Number(elemento.dataset.id)

    //Remove a classe 'selecionado' de TODOS os cards
    document.querySelectorAll('.item-pao .card_item').forEach(pao => 
        pao.classList.remove('selecionado')
    );

    //Adiciona a classe 'selecionado' APENAS ao card clicado
    const cardDoElemento = elemento.querySelector('.card_item');
    if (cardDoElemento) cardDoElemento.classList.add('selecionado');

    const pao = encontrarIngrediente(id)

    meuHamburguer = meuHamburguer.filter(i => i.categoria != 'pao')
    meuHamburguer.push({...pao, quantidade: 1});

    console.log (meuHamburguer)
}

//LISTENER DO GRUPO PÃES
document.querySelector('.paes').addEventListener('click', (evento) => {
    selecionarPao(evento);
    atualizarDOM()
    atualizarResumo();
});

//LISTENER DOS GRUPOS NÃO PÃES
document.querySelectorAll('.grupo:not(.paes)').forEach(grupo => grupo.addEventListener('click', (evento) => {
    alterarQuantidade(evento);
    atualizarDOM();
    atualizarEstilos()
    atualizarResumo();
    })
);

//LISTENER PARA VERIFICAR O HORÁRIO DE FUNCIONAMENTO NO LOAD DA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    const mensagem = horarioFuncionamento();
    document.querySelector('.status_loja').textContent = mensagem;
})