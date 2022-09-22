let cards = []
let sum = 0
let cardsBot = []
let sumBot
let hasBlackJack = false
let isAlive = true
let message = ""

let gameStarted = false
let gameFinished = false

let messageEl = document.querySelector("#messageEl")

/*Cartas e somas do jogadores*/
let sumEl = document.querySelector("#sumEl")
let cardsEl = document.querySelector("#cardsEl")
let cardsBotEl = document.querySelector("#cardsBot")
let sumBotEl = document.querySelector("#sumBot")

/*sistema de aposta*/
let addBtn = document.querySelector(".add5")
addBtn.addEventListener("click", add)

let subBtn = document.querySelector(".sub5")
subBtn.addEventListener("click", sub)

let betBtn = document.querySelector("#betBtn")
betBtn.addEventListener("click", bet)

let doneBtn = document.querySelector("#doneBtn")
doneBtn.addEventListener("click", fdone)

let betTxt = document.querySelector("#betTxt")
let betValue = 0

let betFirst = false

/*informações do jogador*/
let player = {
    name: prompt(`what's your name?`),
    chips: 200,
}

if (player.name == "") {
    player.name = "Player"
}

let playerEl = document.getElementById("playerEl")
playerEl.textContent = `${player.name}: $${player.chips}`


let playBtn = document.querySelector("#playBtn").addEventListener("click", startGame)

function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 13) + 1
    if (randomCard > 10) {
        return 10
    } else if (randomCard === 1) {
        return 11
    } else {
        return randomCard
    }
}

function startGame() {
    if (betFirst == false) {
        alert(`bet first...`)
    }else if(gameStarted == true) {
        alert(`Game started`)
    } else {
        clear()
        if (cards.length > 0) {
            alert(`Game has already started`)
        } else {
            cards.push(getRandomCard())
            cards.push(getRandomCard())
            cardsBot.push(getRandomCard())
            cardsBot.push("?")
            for (let i = 0; i < cards.length; i += 1) {
                sum += cards[i]
            }
            renderGame()
            gameStarted = true
        }
    }
}

function renderGame() {
    cardsEl.textContent = `Cards: `
    cardsBotEl.textContent = `Cards: `
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += `${cards[i]} `
    }
    for (let i = 0; i < cardsBot.length; i++) {
        cardsBotEl.textContent += `${cardsBot[i]} `
    }
    sumEl.textContent = `Sum : ${sum}`
    sumBotEl.textContent = `Sum:${cardsBot[0]}`
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "Wow! you've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

let newCard = document.querySelector("#newCard").addEventListener("click", function addCard() {
    if (cards.length == 0) {
        alert(`Start the Game`)
    } else if (isAlive === true && hasBlackJack === false) {
        let card3 = getRandomCard();
        cards.push(card3)
        sum += card3;
        renderGame()
    } else {
        alert(`Start again`)
    }
})

function clear() {
    let sumEl = document.querySelector("#sumEl")
    let cardsEl = document.querySelector("#cardsEl")
    let cardsBotEl = document.querySelector("#cardsBot")
    let sumBotEl = document.querySelector("#sumBot")
    sum = 0
    sumBot = 0
    cards = []
    cardsBot = []
    hasBlackJack = false
    isAlive = true

    sumEl.textContent = `Sum:`
    sumBotEl.textContent = `Sum:`
    cardsEl.textContent = `Cards:`
    cardsBotEl.textContent = `Cards:`
}

/*Sistema do Bot*/
function bot() {
    /*Remover "?" */
    if (cardsBot[1] == "?") {
        cardsBot.pop()
        cardsBot.push(getRandomCard())
    }
    /*Soma das cartas */
    sumBot = 0
    for (let i = 0; i < cardsBot.length; i += 1) {
        sumBot += cardsBot[i]
    }
    /*Lógica*/
    if ((sumBot > sum && sumBot <= 21) || sum > 21) {
        loseGame()
    } else if (sum > sumBot && sum <= 21) {
        cardsBot.push(getRandomCard())
        bot()
    } else if (sumBot == sum && sum <= 11) {
        cardsBot.push(getRandomCard())
        bot()
    } else if (sumBot == sum) {
        drawGame()
    } else {
        wonGame()
    }
    /*demonstra ao jogador */
    cardsBotEl.textContent = `Cards: `
    for (let i = 0; i < cardsBot.length; i++) {
        cardsBotEl.textContent += `${cardsBot[i]} `
    }
    sumBotEl.textContent = `Sum:${sumBot}`
}


/*Sitema de aposta */
function add() {
    betValue += 5
    betTxt.textContent = `Bet: $${betValue}`
}

function sub() {
    betValue -= 5
    betTxt.textContent = `Bet: $${betValue}`
}

function bet() {
    if (betValue <= 0) {
        alert(`Please bet`)
    } else if (betValue > player.chips) {
        alert(`Don't have chips for this bet`)
        betValue = player.chips
        betTxt.textContent = `Bet: $${betValue}`
    } else {
        betFirst = true
        player.chips -= betValue
        playerEl.textContent = `${player.name}: $${player.chips}`
        gameStarted = false
        fbet()
        clear()
    }

}

function wonGame() {
    player.chips += betValue *2
    
    playerEl.textContent = `${player.name}: $${player.chips}`
    betFirst = false
    gameFinished = true
}

function drawGame() {
    betFirst = false
    gameFinished = true
    player.chips += betValue
    playerEl.textContent = `${player.name}: $${player.chips}`
}

function loseGame() {
    if (player.chips == 0) {
        setTimeout(function resetGame() {
            alert(`You lose all your chips, star again...`)
            player.chips = 200
            playerEl.textContent = `${player.name}: $${player.chips}`
        }, 1000)
    }
    playerEl.textContent = `${player.name}: $${player.chips}`
    betFirst = false
    gameFinished = true
}


function fdone() {
    if (gameStarted == false) {
        alert(`Start the game`)
    } else {
        addBtn.classList.remove("hide")
        subBtn.classList.remove("hide")
        betBtn.classList.remove("hide")
        doneBtn.classList.add("hide")

        bot()
    }
}

function fbet() {
    addBtn.classList.add("hide")
    subBtn.classList.add("hide")
    betBtn.classList.add("hide")
    doneBtn.classList.remove("hide")
}