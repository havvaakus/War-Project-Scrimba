let deckId
let computerScore = 0
let myScore = 0
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const cardsContainer = document.getElementById("cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            deckId = data.deck_id
            console.log (deckId)
        })
}

newDeckBtn.addEventListener("click", handleClick)


drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => { 
            cardsContainer.children[0].innerHTML = `
                <img src= ${data.cards[0].image} class="card"/>
            `
            document.getElementById("cards").children[1].innerHTML = `
                <img src= ${data.cards[1].image} class="card"/>
            `
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText

            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if (computerScore > myScore) {
                    header.textContent = "The computer won the game !"
                } else if (computerScore < myScore) {
                    header.textContent = "You won the game !"
                } else {
                    header.textContent = "It's a tie game !"
                }
            }
        })
})

function determineCardWinner (card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer Score: ${computerScore}`
        return ("Computer wins!")
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My Score: ${myScore}`
        return ("You win!")
    } else {
    return ("War!")
    }
}






// Other option I thought
// drawCardBtn.addEventListener("click", () => {
//     fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
//         .then(res => res.json())
//         .then(data => {
//             cardsContainer.children[0].innerHTML = `
//                 <img src=${data.cards[0].image} class="card" />
//             `
//             cardsContainer.children[1].innerHTML = `
//                 <img src=${data.cards[1].image} class="card" />
//             `
//             const remainText = data.remaining
//             remaining.textContent = "Remaining: " + remainText
//             const card1 = data.cards[0]
//             const card2 = data.cards[1]
//             const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
//             "10", "JACK", "QUEEN", "KING", "ACE"]
//             const card1ValueIndex = valueOptions.indexOf(card1.value)
//             const card2ValueIndex = valueOptions.indexOf(card2.value)
            
//             if (card1ValueIndex > card2ValueIndex) {
//                 header.textContent =  "Card 1 wins!"
//             } else if (card1ValueIndex < card2ValueIndex) {
//                 header.textContent =  "Card 2 wins!"
//             } else {
//                 header.textContent =  "War!"
//             }
//         })
// })





