let card1 = getRandomCard()
        let card2 = getRandomCard()
        let cards = []
        let sum = 0
        let hasBlackJack = false
        let isAlive = true
        let message = ""

        let messageEl = document.querySelector("#messageEl")
        let sumEl = document.querySelector("#sumEl")
        let cardsEl = document.querySelector("#cardsEl")

        let player = {
            name: "Lucas",//prompt(`what's your name?`),
            chips: 200,
        }
        if(player.name == ""){
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
            clear()
            if(cards.length >0){
                alert(`Game has already started`)
            }else{
                cards.push(getRandomCard())
                cards.push(getRandomCard())
                for (let i = 0; i < cards.length; i += 1) {
                    sum += cards[i]
                }
                renderGame()
            }
            
        }

        function renderGame() {
            cardsEl.textContent = `Cards: `
            for (let i = 0; i < cards.length; i++) {
                cardsEl.textContent += `${cards[i]} `
            }
            sumEl.textContent = `Sum : ${sum}`
            if (sum <= 20) {
                message = "Do you want to draw a new card?"
            } else if (sum === 21) {
                message = "Wow! you've got Blackjack!"
                hasBlackJack = true
                wonGame()
            } else {
                message = "You're out the game!"
                isAlive = false
                loseGame()
            }
            messageEl.textContent = message
        }

        let newCard = document.querySelector("#newCard").addEventListener("click", function addCard() {
            if (cards.length == 0){
                alert(`Start the Game`)
            }else if(isAlive === true && hasBlackJack === false) {
                let card3 = getRandomCard();
                cards.push(card3)
                sum += card3;
                renderGame()
            }
            else {
                alert(`Start again`)
            }
        })
        function clear(){
            if(cards.length>0 &&(hasBlackJack === true || isAlive === false) ){
                sum = 0
                cards = []
                hasBlackJack = false
                isAlive = true
            }
        }

        function wonGame(){
            player.chips +=10
            playerEl.textContent = `${player.name}: $${player.chips}`
        }
        function loseGame(){
            player.chips -=5
            if(player.chips == 0){
                setTimeout( function resetGame(){
            alert(`You lose all your chips, star again...`)
                player.chips = 200
                playerEl.textContent = `${player.name}: $${player.chips}`
        },1000)
            }
            playerEl.textContent = `${player.name}: $${player.chips}`
        }
    