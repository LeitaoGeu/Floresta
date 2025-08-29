const storyEl = document.getElementById('story');
const choice1Btn = document.getElementById('choice1');
const choice2Btn = document.getElementById('choice2');

// Estrutura simples da história
const story = {
    start: {
        text: "Você está na floresta densa, ouvindo os sons da natureza ao seu redor. Dois caminhos aparecem à sua frente.",
        choices: [
            { text: "Seguir o caminho da esquerda", next: "leftPath" },
            { text: "Seguir o caminho da direita", next: "rightPath" }
        ]
    },
    leftPath: {
        text: "Você encontra um arbusto cheio de frutas brilhantes. Parece seguro para comer?",
        choices: [
            { text: "Comer as frutas", next: "eatFruits" },
            { text: "Ignorar e continuar", next: "ignoreFruits" }
        ]
    },
    rightPath: {
        text: "O caminho está coberto por cipós e trepadeiras. Você pode tentar escalar ou seguir por baixo.",
        choices: [
            { text: "Escalar os cipós", next: "climbVines" },
            { text: "Passar por baixo dos cipós", next: "crawlUnder" }
        ]
    },
    eatFruits: {
        text: "As frutas são deliciosas, mas logo você sente sono... Você desmaia e acorda em casa, seguro.",
        choices: [
            { text: "Recomeçar aventura", next: "start" },
            { text: "Terminar", next: "end" }
        ]
    },
    ignoreFruits: {
        text: "Você continua e encontra um rio cristalino, onde pode beber água e descansar.",
        choices: [
            { text: "Beber água e descansar", next: "rest" },
            { text: "Seguir sem parar", next: "keepWalking" }
        ]
    },
    climbVines: {
        text: "Você escala e descobre uma clareira linda com flores raras e pássaros coloridos.",
        choices: [
            { text: "Explorar a clareira", next: "exploreClearing" },
            { text: "Voltar para o começo", next: "start" }
        ]
    },
    crawlUnder: {
        text: "Ao passar por baixo, você encontra um ninho de pássaros e decide observar sem ser visto.",
        choices: [
            { text: "Continuar observando", next: "observeNest" },
            { text: "Voltar para o começo", next: "start" }
        ]
    },
    rest: {
        text: "Você descansa e recupera as forças, pronto para novas aventuras.",
        choices: [
            { text: "Recomeçar aventura", next: "start" },
            { text: "Terminar", next: "end" }
        ]
    },
    keepWalking: {
        text: "Sem descansar, você fica exausto e decide voltar para casa.",
        choices: [
            { text: "Recomeçar aventura", next: "start" },
            { text: "Terminar", next: "end" }
        ]
    },
    exploreClearing: {
        text: "Você encontra uma antiga cabana abandonada. Dentro, há um mapa do tesouro!",
        choices: [
            { text: "Seguir o mapa", next: "followMap" },
            { text: "Ignorar o mapa e voltar", next: "start" }
        ]
    },
    observeNest: {
        text: "Você observa os filhotes crescerem e aprende muito sobre a vida na floresta.",
        choices: [
            { text: "Recomeçar aventura", next: "start" },
            { text: "Terminar", next: "end" }
        ]
    },
    followMap: {
        text: "Seguindo o mapa, você encontra um baú com tesouros da floresta. Parabéns!",
        choices: [
            { text: "Recomeçar aventura", next: "start" },
            { text: "Terminar", next: "end" }
        ]
    },
    end: {
        text: "Obrigado por jogar a aventura na floresta! Até a próxima.",
        choices: []
    }
};

// Função para atualizar a história na tela
function updateStory(node) {
    const current = story[node];
    storyEl.textContent = current.text;

    if (current.choices.length === 0) {
        // Sem escolhas, esconder botões
        choice1Btn.style.display = 'none';
        choice2Btn.style.display = 'none';
    } else {
        choice1Btn.style.display = 'inline-block';
        choice2Btn.style.display = 'inline-block';

        choice1Btn.textContent = current.choices[0].text;
        choice2Btn.textContent = current.choices[1].text;

        choice1Btn.onclick = () => updateStory(current.choices[0].next);
        choice2Btn.onclick = () => updateStory(current.choices[1].next);
    }
}

// Começa o jogo
updateStory('start');
