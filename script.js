const categoria = document.querySelector("#category");
const letrasErradas = document.querySelector(".wrongLetters");
const palavraInterface = document.querySelector(".dashes");
const olhos = Array.from(document.querySelectorAll(".eyes"));
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
 
let palavraProposta;
let letrasErradasArray = [];
let indiceBoneco;
const numTentativas = 7;
const opacidadeOlhos = 0.3;
 
const categorias = {
    Frutas: ["Abacaxi", "Melância", "Pêra", "Mamão", "Uva"],
    Profissões:["Advogado", "Engenheiro", "Médico", "Professor"],
    Animais: ["Peixe", "Gato", "Cachorro", "Cavalo","Dinossauro"],
    Cores: ["Branco", "Preto", "Azul", "Vermelho", "Lilás"],
    Carro: ["Celta", "Passat", "Gol", "Vectra", "FiatMobi", "FiatUno"],
    Novelas: ["Rei do gado", "Renascer", "Tropicália", "Felicidade", "RoqueSanteiro"]
};
 
function retornaArrayCategorias() {
    return Object.keys(categorias);
}
 
function retornaCategoria() {
    const arrayCategorias = retornaArrayCategorias();
    let indiceCategoria = Math.floor(Math.random() * arrayCategorias.length);
    return arrayCategorias[indiceCategoria];
}
 
function exibeCategoria() {
    categoria.innerHTML = retornaCategoria();
}
 
function definePalavraProposta() {
    const arrayPalavras = categorias[categoria.innerHTML];
    let indicePalavra = Math.floor(Math.random() * arrayPalavras.length);
    palavraProposta = arrayPalavras[indicePalavra];
    console.log(palavraProposta);
    ocultaPalavra();
}
 
function retornaNumAleatorio(max) {
    return Math.floor(Math.random() * max);
}
 
function ocultaPalavra() {
    let palavraOcultada = "";
    for (let i = 0; i < palavraProposta.length; i++) {
        palavraOcultada += "-";
    }
    exibePalavraInterface(palavraOcultada);
}
 
function exibePalavraInterface(palavra) {
    palavraInterface.innerHTML = palavra;
}
function tentativa(letra) {
    if (palavraProposta.toLowerCase().includes(letra.toLowerCase())) {
        atualizaPalavraInterface(letra.toLowerCase());
    }else {
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML = "Letras erradas:"  + letrasErradasArray;
        if (partesBoneco.length > indiceBoneco) {
            desenhaBoneco();
        }
    }
    verificaFimdeJogo();
}
 function verificaFimdeJogo() {
    if (!palavraInterface.innerHTML.includes("-")) {
        exibePalavraInterface("Você venceu!!!");
        window.removeEventListener("keypress", retornaLetra);
    }else if (letrasErradasArray.length >= numTentativas){
   desenhaOlhos();
   exibePalavraInterface("Você perdeu!!!");
   window.removeEventListener("keypress", retornaLetra);
    }
    
 }
function atualizaPalavraInterface(letra) {
    let palavraAux = "";
    for (let i = 0; i < palavraProposta.length; i++) {
        if (palavraProposta[i].toLowerCase() === letra) {
            palavraAux += palavraProposta[i];
        } else if (palavraInterface.innerHTML[i] !== "-") {
            palavraAux += palavraInterface.innerHTML[i];
        } else {
            palavraAux += "-";
        }
    }
    exibePalavraInterface(palavraAux);
}

 
function retornaLetra(e) {
    tentativa(e.key);
}
 
function desenhaBoneco() {
    if (indiceBoneco < partesBoneco.length) {
        partesBoneco[indiceBoneco].classList.remove("hide");
        indiceBoneco++;
    }
}
 
function desenhaOlhos() {
    olhos.forEach((olho) => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    });
}
 
function ocultaBoneco() {
    olhos.forEach((olho) => {
        olho.style.opacity = opacidadeOlhos;
    });
    partesBoneco.forEach((parteBoneco) => {
        parteBoneco.classList.add("hide");
    });
}
 
function iniciaJogo() {
    indiceBoneco = 0;
    letrasErradasArray = [];
    ocultaBoneco();
    exibeCategoria();
    definePalavraProposta();
    letrasErradas.innerHTML = "Letras erradas:";
    window.addEventListener("keypress", retornaLetra);
}
 
window.addEventListener("load", iniciaJogo);
