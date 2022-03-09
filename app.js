document.addEventListener("DOMContentLoaded", () => {
  // 모든 엘레멘트, 이미지가 로드되야 사용가능

  const BLANK =
    "https://raw.githubusercontent.com/kubowania/memory-game/master/images/blank.png";
  const WHITE =
    "https://raw.githubusercontent.com/kubowania/memory-game/master/images/white.png";

  const cardArray = [
    {
      name: "fries",
      img: "https://raw.githubusercontent.com/kubowania/memory-game/master/images/fries.png",
    },
    {
      name: "cheeseburger",
      img: "https://raw.githubusercontent.com/kubowania/memory-game/master/images/cheeseburger.png",
    },
    {
      name: "hotdog",
      img: "https://raw.githubusercontent.com/kubowania/memory-game/master/images/hotdog.png",
    },
    {
      name: "ice-cream",
      img: "https://raw.githubusercontent.com/kubowania/memory-game/master/images/ice-cream.png",
    },
    {
      name: "milkshake",
      img: "https://raw.githubusercontent.com/kubowania/memory-game/master/images/milkshake.png",
    },
    {
      name: "pizza",
      img: "https://raw.githubusercontent.com/kubowania/memory-game/master/images/pizza.png",
    },
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

    card.setAttribute("src", BLANK);
    card.setAttribute("draggable", false);
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);

    // 배열의 개수만큼 img태그 생성 후 grid의 자식으로 삽입
    grid.appendChild(card);
  });

  function flipCard() {
    const cardId = this.getAttribute("data-id");
    const selectedCard = doubleCardArray[cardId];

    cardsChosen.push(selectedCard.name);
    cardsChosenIds.push(cardId);
    this.setAttribute("src", selectedCard.img);

    if (cardsChosen.length === 2) {
      setTimeout(() => {
        const cards = document.querySelectorAll("img");
        const optionOneId = cardsChosenIds[0];
        const optionTwoId = cardsChosenIds[1];

        if (optionOneId === optionTwoId) {
          cards[optionOneId].setAttribute("src", BLANK);
          cards[optionTwoId].setAttribute("src", BLANK);
          alert("You have clicked the same image!");
        }

        if (cardsChosen[0] === cardsChosen[1]) {
          cards[optionOneId].setAttribute("src", WHITE);
          cards[optionTwoId].setAttribute("src", WHITE);
          cards[optionOneId].removeEventListener("click", flipCard);
          cards[optionTwoId].removeEventListener("click", flipCard);
          cardsWon.push(cardsChosen);
          alert("You found a match");
        } else {
          cards[optionOneId].setAttribute("src", BLANK);
          cards[optionTwoId].setAttribute("src", BLANK);
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
