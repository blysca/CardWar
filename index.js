const suits = ["spades", "hearts", "clubs", "diams"],
  cardFace = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A"
  ],
  fightButton = document.getElementById("btnBattle"),
  fightButton10 = document.getElementById("btnBattle10"),
  p1 = document.querySelector("#player1 .hand"),
  p2 = document.querySelector("#player2 .hand"),
  s1 = document.querySelector("#player1 .score"),
  s2 = document.querySelector("#player2 .score");

let cards = [],
  players = [
    [],
    []
  ],
  firstRun = true,
  gameOver = false,
  r = 0,
  timer;

// event listeners
fightButton.addEventListener("click", battle);
fightButton10.addEventListener("click", function () {
  rounds(10);
});

// event functions
function battle() {
  if (timer) {
    r--;
    outputMessage('Rounds left ' + r);

    if (r < 1) {
      window.clearInterval(timer);
    }
  }

  if (firstRun) {
    firstRun = false;
    buildCards();
    shuffleArray(cards);
    dealCards(cards);
  }

  attack();
}

function rounds(a) {
  r = a;
  timer = setInterval(() => {
    battle()
  }, 100);
}

// functions
function attack() {
  if (!gameOver) {
    let card1 = players[0].shift(),
      card2 = players[1].shift(),
      pot = [card1, card2];

    // 1 update html
    p1.innerHTML = showCard(card1, 0);
    p2.innerHTML = showCard(card2, 0);

    // 2 check winners
    checkWinner(card1, card2, pot);
    // 3 update scores
    s1.innerHTML = players[0].length;
    s2.innerHTML = players[1].length;
  } else {
    outputMessage('Game over');
  }
}

function outputMessage(text) {
  document.getElementById("message").innerHTML = text;
}

function checkWinner(card1, card2, pot) {
  if (players[0].length <= 4 || players[1].length <= 4) {
    gameOver = true;
    return;
  }

  if (card1.cardValue > card2.cardValue) {
    outputMessage('hand 1 wins');
    players[0] = players[0].concat(pot);
  } else if (card1.cardValue < card2.cardValue) {
    outputMessage('hand 2 wins');
    players[1] = players[1].concat(pot);
  } else {
    battlemode(pot);
    outputMessage('battle mode');
  }
}

function battlemode(pot) {
  let card1,
    card2,
    pos = pot.length / 2;

  if (players[0].length < 4 || players[1].length < 4) {
    return;
  } else {
    for (let i = 0; i < 4; i++) {
      card1 = players[0].shift();
      pot = pot.concat(card1);
      p1.innerHTML += showCard(card1, pos + i);
    }
    for (let i = 0; i < 4; i++) {
      card2 = players[1].shift();
      pot = pot.concat(card2);
      p2.innerHTML += showCard(card2, pos + i);
    }

    checkWinner(card1, card2, pot);
  }
}

function showCard(c, p) {
  let move = p * 60,
    bgColor = c.icon === "H" || c.icon === "D" ? "red" : "black",
    bCard =
    `<div
          style='left: ${move}px;'
         class='iCard border rounded p3 ${bgColor} ${c.suit}'
         >
          <div class='cardtop suit'>${c.num} <br></div>
          <div class='cardmid suit'></div>
          <div class='cardbottom suit'>${c.num} <br></div>
        </div>`;

  return bCard;
}

function buildCards() {
  cards = [];
  for (s in suits) {
    let suitNew = suits[s][0].toUpperCase();
    for (n in cardFace) {
      let card = {
        suit: suits[s],
        num: cardFace[n],
        cardValue: parseInt(n) + 2,
        icon: suitNew
      };

      cards.push(card);
    }
  }
}

function shuffleArray(array) {
  for (let x = array.length - 1; x > 0; x--) {
    let ii = Math.floor(Math.random() * (x + 1)),
      temp = array[x];

    array[x] = array[ii];
    array[ii] = temp;
  }

  return array;
}

function dealCards(array) {
  for (let i = 0; i < array.length; i++) {
    let m = i % 2;
    players[m].push(array[i]);
  }
}