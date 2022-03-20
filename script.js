var carta1 = {
  nome: "Bulbasauro",
  imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  atributos: {
    ataque: 7,
    defesa: 8,
    magia: 6
  }
};

var carta2 = {
  nome: "Darth Vader",
  imagem:
    "https://minhaseriefavorita.com/wp-content/uploads/2022/02/darthvader.jpg",
  atributos: {
    ataque: 9,
    defesa: 7,
    magia: 3
  }
};

var carta3 = {
  nome: "Shiryu de Dragão",
  imagem:
    "https://img.elo7.com.br/product/zoom/2B30902/camiseta-shiryu-de-dragao-fullprint-nerd.jpg",
  atributos: {
    ataque: 5,
    defesa: 9,
    magia: 7
  }
};
var carta4 = {
  nome: "Pikachu",
  imagem:
    "https://conteudo.imguol.com.br/c/entretenimento/58/2017/05/30/pikachu-nervoso-1496159464346_v2_450x450.png",
  atributos: {
    ataque: 7,
    defesa: 2,
    magia: 7
  }
};
var carta5 = {
  nome: "Batman",
  imagem:
    "https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2022/02/28/1303576951-batman-pattinson.jpg",
  atributos: {
    ataque: 4,
    defesa: 7,
    magia: 1
  }
};
var carta6 = {
  nome: "Homem de Ferro",
  imagem:
    "https://static3.tcdn.com.br/img/img_prod/460977/pre_venda_busto_homem_de_ferro_iron_man_marvel_mark_iii_life_size_sideshow_43864_1_20201211173537.jpg",
  atributos: {
    ataque: 5,
    defesa: 8,
    magia: 2
  }
};

var cartas = [carta1, carta2, carta3, carta4, carta5, carta6];
var cartasMaquina = [];
var indiceCartaMaquina;
var cartaJogador;
var indiceCartaJogador;

function sortearCartas() {
  limparCartas();
  cartas = [carta1, carta2, carta3, carta4, carta5, carta6];
  cartasMaquina = [];
  var numeroDeCartas = cartas.length;
  var indiceCartas = parseInt(Math.random() * numeroDeCartas);
  cartasMaquina.push(cartas[indiceCartas]);
  cartas.splice(indiceCartas, 1);

  numeroDeCartas = cartas.length;
  indiceCartas = parseInt(Math.random() * numeroDeCartas);
  cartasMaquina.push(cartas[indiceCartas]);
  cartas.splice(indiceCartas, 1);

  numeroDeCartas = cartas.length;
  indiceCartas = parseInt(Math.random() * numeroDeCartas);
  cartasMaquina.push(cartas[indiceCartas]);
  cartas.splice(indiceCartas, 1);

  calculaNumeroDeCartas();

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogarCarta").disabled = false;
}

function escolherUmaCartaJogador() {
  var numeroCartaJogador = cartas.length;
  numeroCartaJogador = parseInt(Math.random() * numeroCartaJogador);
  indiceCartaJogador = numeroCartaJogador;
  CartaJogador = cartas[numeroCartaJogador];
  return CartaJogador;
}

function escolherUmaCartaMaquina() {
  var numeroCartaMaquina = cartasMaquina.length;
  numeroCartaMaquina = parseInt(Math.random() * numeroCartaMaquina);
  indiceCartaMaquina = numeroCartaMaquina;
  var CartaMaquina = cartasMaquina[numeroCartaMaquina];
  return CartaMaquina;
}

function JogarUmaCarta() {
  limparCartas();
  cartaJogador = escolherUmaCartaJogador();

  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;
  // divCartaJogador.style.backgroundImage = "url(" + cartaJogador.imagem + ")"
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";
  for (var atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaJogador.atributos[atributo] +
      "<br>";
  }
  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;
  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
  document.getElementById("btnJogarCarta").disabled = true;
  document.getElementById("btnJogar").disabled = false;
}

function obtemAtributoSelecionado() {
  var radioAtributos = document.getElementsByName("atributo");

  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked == true) {
      return radioAtributos[i].value;
    }
  }
}

function jogar() {
  var atributoSelecionado = obtemAtributoSelecionado();
  var cartaMaquina = escolherUmaCartaMaquina();
  var divResultado = document.getElementById("resultado");
  if (
    cartaJogador.atributos[atributoSelecionado] >
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = "<p class='resultado-final'>Venceu</p>";
    cartas.push(cartasMaquina[indiceCartaMaquina]);
    cartasMaquina.splice(indiceCartaMaquina, 1);
  } else if (
    cartaJogador.atributos[atributoSelecionado] <
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = "<p class='resultado-final'>Perdeu</p>";
    cartasMaquina.push(cartas[indiceCartaJogador]);
    cartas.splice(indiceCartaJogador, 1);
  } else {
    htmlResultado = "<p class='resultado-final'>Empatou</p>";
  }
  divResultado.innerHTML = htmlResultado;

  document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnJogarCarta").disabled = false;
  calculaNumeroDeCartas();
  exibirCartaMaquina(cartaMaquina);
}

function exibirCartaMaquina(cartaMaquina) {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";

  var opcoesTexto = "";
  for (var atributo in cartaMaquina.atributos) {
    opcoesTexto +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaMaquina.atributos[atributo] +
      "</p>";
  }
  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`;
  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function calculaNumeroDeCartas() {
  var numeroDeCartasMaquina = document.getElementById("nmrCartasMaquina");
  numeroDeCartasMaquina.innerHTML = "Número de cartas " + cartasMaquina.length;
  var numeroDeCartasJogador = document.getElementById("nmrCartasJogador");
  numeroDeCartasJogador.innerHTML = "Número de cartas " + cartas.length;
  if (cartas.length == 0 || cartasMaquina.length == 0) {
    document.getElementById("btnJogarCarta").disabled = true;
    document.getElementById("btnSortear").disabled = false;
  }
}

function limparCartas() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = `url(${" "})`;
  var divCartaJogador = document.getElementById("carta-jogador");
  divCartaJogador.style.backgroundImage = `url(${" "})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">';

  var opcoesTexto = " ";
  divCartaMaquina.innerHTML = moldura;
  divCartaJogador.innerHTML = moldura;

  var limparResultado = document.getElementById("resultado");
  limparResultado.innerHTML = " ";
}