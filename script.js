const ingredientes = [
    {id: 1, nome: "Pão Brioche", preco: 3.50, limite: 1, type: 'single'},
    {id: 2, nome: "Pão Australino", preco: 4.50, limite: 1, type: 'single'},
    {id: 3, nome: "Blend Bovino", preco: 12.00, limite: 3, type: 'counter'},
    {id: 4, nome: "Bife de Frango", preco: 10.00, limite: 3, type: 'counter'},
    {id: 5, nome: "Alface", preco: 1.00, limite: 2, type: 'counter'},
    {id: 6, nome: "Tomate", preco: 1.50, limite: 2, type: 'counter'},
    {id: 7, nome: "Cebola Roxa", preco: 1.50, limite: 2, type: 'counter'},
    {id: 8, nome: "Cebola Caramelizada", preco: 2.00, limite: 2, type: 'counter'},
    {id: 8, nome: "Picles de Pepino", preco: 2.80, limite: 2, type: 'counter'},
]
let meuHamburguer = []
const encontrarIngrediente = (id) => ingredientes.find(i => i.id == id);
const paes = document.querySelector('.paes');
const bifes = document.querySelector('.bifes');

function ajustarQuantidade (botao) {

    const acao = botao.dataset.acao;
    const elementoControle = botao.closest('.controle_quantidade');
    const itemID = parseInt(elementoControle.dataset.id);
    const ingredienteData = encontrarIngrediente(itemID);

    let bifeBoi = parseInt(document.querySelector('#qnt-3').textContent);
    let bifeFrango = parseInt(document.querySelector('#qnt-4').textContent);
    let totalBifes = bifeBoi + bifeFrango;
    let spanQuantidade = elementoControle.querySelector('span');
    let itemNoHamburguer = meuHamburguer.find(i => i.id === itemID);
    let quantidadeBifes = parseInt(spanQuantidade.textContent);

    if (acao === 'adicionar' && totalBifes < ingredienteData.limite) {
        quantidadeBifes++;
        spanQuantidade.textContent = quantidadeBifes
        bifeBoi = parseInt(document.querySelector('#qnt-3').textContent);
        bifeFrango = parseInt(document.querySelector('#qnt-4').textContent);
        totalBifes = bifeBoi + bifeFrango;
        if (!itemNoHamburguer) {
            meuHamburguer.push({...ingredienteData, quantidade: quantidadeBifes})
        } else {
            itemNoHamburguer.quantidade = quantidadeBifes
        }
    } else if (acao === 'remover' && quantidadeBifes > 0) {
        quantidadeBifes--;
        spanQuantidade.textContent = quantidadeBifes
        bifeBoi = parseInt(document.querySelector('#qnt-3').textContent);
        bifeFrango = parseInt(document.querySelector('#qnt-4').textContent);
        totalBifes = bifeBoi + bifeFrango;
        if (!itemNoHamburguer) {
            meuHamburguer.push({...ingredienteData, quantidade: quantidadeBifes})
        } else {
            itemNoHamburguer.quantidade = quantidadeBifes
        }
    }

    if (totalBifes === 3) {
        alert("Limite de Bifes Atingido! (3)")
    }

    const card = botao.closest('a');
    selecionarBife({currentTarget: card});

    console.log(`Ação: ${acao}, ItemID: ${itemID},
        Nova Qtd: ${totalBifes}, Frango: ${bifeFrango},
        Boi: ${bifeBoi}, Meu Hamburguer: ${JSON.stringify(meuHamburguer)}`);
}

function selecionarPao(evento) {
    //Encontra a img do pão clicado
    const paoClicado = evento.currentTarget.querySelector('.card_item');
    if (!paoClicado) return;

    //Cria uma lista com todos os elementos dentro do container
    const todosOsCards = paes.querySelectorAll('.card_item');

    //Remove a classe 'pao' de TODOS os cards
    todosOsCards.forEach(card => {
        card.classList.remove('pao');
    });

    //Adiciona a classe 'pao' APENAS ao card clicado
    paoClicado.classList.add('pao');

    meuHamburguer = meuHamburguer.filter(item => item.type !== "single");

    const pao = ingredientes.find(i => i.id == paoClicado.dataset.id);

    meuHamburguer.push({...pao, quantidade: 1});
    
    //Imprime no console qual pão foi selecionado
    console.log(`Pão selecionado: ${paoClicado.alt} Meu Hamburguer: ${JSON.stringify(meuHamburguer)}`);
}

function selecionarBife(evento) {
    const card = evento.currentTarget.closest('.card_item')
    const bifeClicado = evento.currentTarget.querySelector('.card_item');
    if (!bifeClicado) return;

    const todosOsCards = bifes.querySelectorAll('.card_item')
    const controleClicado = evento.currentTarget.querySelector('.controle_quantidade');
    const spanQuantidade = controleClicado.querySelector('span');
    
    let quantidadeAtual = Number(spanQuantidade.textContent);

    todosOsCards.forEach(card => {
        card.classList.remove('bife');
    })

    //Adiciona a classe 'bife' APENAS ao card clicado
    bifeClicado.classList.add('bife');

    //Imprime no console qual bife foi selecionado
    console.log(`Bife Slecionado: ${bifeClicado.alt}, Quanditade: ${quantidadeAtual}`);
}

//Listeners de Eventos (Click) nos containers pai
paes.addEventListener('click', (e) => {
    //Procura o elemento <a> pai mais próximo do clique
    const elementoPai = e.target.closest('a');

    //Verifica se o elemento encontrado é um link que contém um card_item
    if (elementoPai && elementoPai.querySelector('.card_item')){
        //Chama a função passando o elemento <a> como alvo (currentTarget)
        selecionarPao({currentTarget: elementoPai});
    }
});

bifes.addEventListener('click', (e) => {
    //Procura o elemento <a> pai mais próximo do clique

    const botaoClicado = e.target.closest('button');
    const cardClicado = e.target.closest('a');

    if (botaoClicado) {
        ajustarQuantidade(botaoClicado);
        return;
    }

    if (!botaoClicado && cardClicado.querySelector('.card_item')) {
        selecionarBife({currentTarget: cardClicado});
    }
});