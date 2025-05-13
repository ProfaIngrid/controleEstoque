// Informações do formulário
//armazenando em variaveis os campos do formulário
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const imagem = document.getElementById("imagem");
const produtoForm = document.getElementById("produto-form");
const notificacao = document.getElementById("notificacao-conteudo");

//escondendo a notificação ate que a função seja chamada
notificacao.style.display = 'none';

//listas para armazenar os dados do formulário
const categorias = [];
const produtos = [];

//função para exibir uma notificação
function exibirNotificacao(mensagem, status){
    //armazenando e variaveis a div e o spam que guardam a mensagem de notificação
    const messageEl = document.getElementById("notificacao-mensagem");

    //o textContent ele é responsável por alterar o texto guardado no messageEl,
    //ou seja, o que esta dentro do span la no HTML
    messageEl.textContent = mensagem;

    //verifica o status da mensagem para estilizar o elemento exibido
    if(status === 'sucesso'){
        notificacao.style.backgroundColor = '#dbead5';
        messageEl.style.color = '#103900';
    }else if(status === 'alerta'){
        notificacao.style.backgroundColor = '#ffffa0';
        messageEl.style.color = '#646600';
    }else if(status == 'erro'){
        notificacao.style.backgroundColor = '#fb6866';
        messageEl.style.color = '#470300';
    }

    notificacao.style.display = 'block';

    //esconde a notificacao depois de 3 segundos
    setTimeout(() => {
        notificacao.style.display = 'none';
    }, 3000);

}

//manipulando o evento de submit do formulário
produtoForm.addEventListener("submit", (event) => {
    //impedir de recarregar a página quando o evento de submit(envio) for chamado 
    event.preventDefault();
    let camposPreenchidos = true;

    //valida se o campo nome esta vazio e exibe uma mensagem
    if(nome.value == ''){
        document.getElementById("erro-nome").style.display = 'block';
        camposPreenchidos = false;
    }else{
        document.getElementById("erro-nome").style.display = 'none';
    }

    //valida se o campo categoria esta vazio e exibe uma mensagem
    if(categoria.value == ''){
        document.getElementById("erro-categoria").style.display = "block";
        camposPreenchidos = false;
    }else {
        document.getElementById("erro-categoria").style.display = "none";
    }

    //valida se o campo preco esta vazio e exibe uma mensagem
    if(preco.value == ''){
        document.getElementById("erro-preco").style.display = "block";
        camposPreenchidos = false;
    }else {
        document.getElementById("erro-preco").style.display = "none";
    }

    //valida se o campo quantidade esta vazio e exibe uma mensagem
    if(quantidade.value == ''){
        document.getElementById("erro-quantidade").style.display = "block";
        camposPreenchidos = false;
    }else {
        document.getElementById("erro-quantidade").style.display = "none";
    }

    //se existir algum campo não preenchido, ele encerra o meu evento, 
    //isso impede que a informação incompleta seja inserida no meu localstorage
    if(camposPreenchidos==false){
        return
    }

    //criando um objeto para armazenar os dados do formulário
    const produtoInserido = {
        nome: nome.value,
        categoria: categoria.value,
        preco: preco.value,
        quantidade: quantidade.value,
        imagem: imagem.value 
    }

    //aguardando esses dados novos na lista
    produtos.push(produtoInserido);

    //guardando a lista no localstorage, transformando os dados para 
    // json usando o JSON.stringify
    localStorage.setItem("nomeProduto", JSON.stringify(produtos));

    //limpando os campos do formulário
    produtoForm.reset();

    exibirNotificacao(`Produto adicionado com sucesso!`, 'sucesso');
    
});
