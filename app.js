document.addEventListener("DOMContentLoaded", () => {
  // 모든 엘레멘트, 이미지가 로드되야 사용가능

  const cardArray = [
    "fries",
    "cheeseburger",
    "hotdog",
    "ice-cream",
    "milkshake",
    "pizza",
  ];

  const doubleCardArray = [...cardArray, ...cardArray];

  doubleCardArray.sort(() => 0.5 - Math.random()); // 셔플

  const grid = document.querySelector("#grid");
  const result = document.querySelector("#result");
  let cardsChosen = [];
  let cardsChosenIds = [];
  const cardsWon = [];

  doubleCardArray.forEach((_, i) => {
    const card = document.createElement("img");

    card.setAttribute("src", "images/blank.png");
    card.setAttribute("draggable", false);
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);

    // 배열의 개수만큼 img태그 생성 후 grid의 자식으로 삽입
    grid.appendChild(card);
  });

  function flipCard() {
    const cardId = this.getAttribute("data-id");

    cardsChosen.push(doubleCardArray[cardId]);
    cardsChosenIds.push(cardId);
    this.setAttribute("src", `images/${doubleCardArray[cardId]}.png`);

    if (cardsChosen.length === 2) {
      setTimeout(() => {
        const cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];

        if (optionOneId === optionTwoId) {
          cards[optionOneId].setAttribute("src", "images/blank.png");
          cards[optionTwoId].setAttribute("src", "images/blank.png");
          alert("You have clicked the same image!");
        }

        if (cardsChosen[0] === cardsChosen[1]) {
          cards[optionOneId].setAttribute("src", "images/white.png");
          cards[optionTwoId].setAttribute("src", "images/white.png");
          cards[optionOneId].removeEventListener("click", flipCard);
          cards[optionTwoId].removeEventListener("click", flipCard);
          cardsWon.push(cardsChosen);
          alert("You found a match");
        } else {
          cards[optionOneId].setAttribute("src", "images/blank.png");
          cards[optionTwoId].setAttribute("src", "images/blank.png");
          alert("Sorry try again!");
        }

        cardsChosen = [];
        cardsChosenIds = [];
        result.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length) {
          result.textContent = "Congratulations you found them all!";
        }
      }, 500);
    }
  }
});
