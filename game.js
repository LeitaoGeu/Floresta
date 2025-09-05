document.addEventListener("DOMContentLoaded", () => {
  const story = [
    {
      question: "Você acorda entre os destroços do avião em chamas. A fumaça sobe e o calor aumenta rapidamente.",
      choices: [
        { text: "Correr para longe da fumaça e buscar ar puro", correct: true },
        { text: "Tentar puxar malas presas sob as ferragens", correct: false, death: "As chamas se espalharam e você não conseguiu escapar a tempo." }
      ]
    },
    {
      question: "Você chega a uma clareira próxima. O silêncio é estranho, mas um farfalhar ecoa da mata.",
      choices: [
        { text: "Avançar em direção ao barulho sem hesitar", correct: false, death: "Um predador oculto saltou sobre você da mata fechada." },
        { text: "Subir em uma pedra para ter visão do entorno", correct: true }
      ]
    },
    {
      question: "Do alto da pedra, você avista um riacho brilhando à distância.",
      choices: [
        { text: "Seguir até o riacho pela trilha aberta", correct: true },
        { text: "Ignorar o riacho e entrar pela mata densa", correct: false, death: "Você se perdeu sem orientação e a mata o engoliu." }
      ]
    },
    {
      question: "No riacho a água parece limpa, mas há peixes mortos boiando.",
      choices: [
        { text: "Beber diretamente sem pensar duas vezes", correct: false, death: "A água contaminada envenenou seu corpo em poucas horas." },
        { text: "Improvisar um filtro com folhas antes de beber", correct: true }
      ]
    },
    {
      question: "Enquanto descansa, você ouve vozes humanas distantes.",
      choices: [
        { text: "Ir atrás das vozes sem avaliar", correct: false, death: "Você deu de cara com uma tribo hostil que não perdoou sua imprudência." },
        { text: "Seguir em direção ao som do mar", correct: true }
      ]
    },
    {
      question: "Na costa, restos do avião e madeira estão espalhados.",
      choices: [
        { text: "Construir uma jangada improvisada", correct: true },
        { text: "Acender uma fogueira para atrair atenção", correct: false, death: "A fumaça atraiu caçadores perigosos que te capturaram." }
      ]
    },
    {
      question: "Após dias no mar, um navio aparece ao longe.",
      choices: [
        { text: "Tentar nadar até o navio", correct: false, death: "As correntes o arrastaram antes de chegar perto." },
        { text: "Agitar roupas e fazer fumaça improvisada", correct: true }
      ]
    },
    {
      question: "Você foi resgatado. Após dias de tormento, seus pés tocam a civilização novamente.",
      choices: []
    }
  ];

  let currentStep = 0;
  let timer = 30;
  let timerInterval;

  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const storyEl = document.getElementById("story");
  const gameOverEl = document.getElementById("game-over");
  const gameOverText = document.getElementById("game-over-text");
  const restartBtn = document.getElementById("restart");
  const timerEl = document.getElementById("timer");

  const dieSound = new Audio("sounds/die.mp3");
  const liveSound = new Audio("sounds/live.mp3");
  const chronoSound = new Audio("sounds/cronometro.mp3");
  const tickSound = new Audio("sounds/tick.mp3");
  const dongSound = new Audio("sounds/dong.mp3"); // som final forte

  tickSound.loop = true;

  function loadStep(step) {
    clearInterval(timerInterval);
    stopTick();

    timer = 30;
    updateTimer();

    if (step >= story.length - 1) {
      questionEl.innerText = story[step].question;
      choicesEl.innerHTML = "";
      return;
    }

    questionEl.innerText = story[step].question;
    choicesEl.innerHTML = "";

    story[step].choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.innerText = choice.text;
      btn.onclick = () => handleChoice(choice);
      choicesEl.appendChild(btn);
    });

    startTimer();
  }

  function handleChoice(choice) {
    clearInterval(timerInterval);
    stopTick();

    if (!choice.correct && choice.death) {
      dieSound.play();
      return gameOver(choice.death);
    }

    liveSound.play();
    setTimeout(() => {
      currentStep++;
      loadStep(currentStep);
    }, 600);
  }

  function startTimer() {
    tickSound.volume = 0.3;
    tickSound.play();

    timerInterval = setInterval(() => {
      timer--;
      updateTimer();

      if (timer === 10) {
        tickSound.volume = 0.7;
      }

      if (timer === 5) {
        timerEl.style.transform = "scale(1.3)";
        chronoSound.play();
      }

      if (timer <= 0) {
        clearInterval(timerInterval);
        stopTick();
        dieSound.play();
        dongSound.play(); // toque final dramático
        return gameOver("Enquanto você hesitava, canibais apareceram vindos da mata e te capturaram.");
      }
    }, 1000);
  }

  function stopTick() {
    tickSound.pause();
    tickSound.currentTime = 0;
  }

  function updateTimer() {
    timerEl.innerText = timer;
    if (timer > 5) {
      timerEl.style.transform = "scale(1)";
    }
  }

  function gameOver(text) {
    storyEl.style.display = "none";
    gameOverEl.style.display = "block";
    gameOverText.innerText = text;
  }

  restartBtn.onclick = () => {
    currentStep = 0;
    storyEl.style.display = "block";
    gameOverEl.style.display = "none";
    loadStep(currentStep);
  };

  loadStep(currentStep);
});
