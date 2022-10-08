
let answer = Math.floor(Math.random() * 100) + 1 //正確答案
let guessCount = 1 //回合數
const guesses = document.querySelector('.guesses')
const lastResult = document.querySelector('.lastResult')
const feedBack = document.querySelector('.feedback')
const LowOrHi = document.querySelector('.lowOrHi')

const guessSubmit = document.querySelector('.guessSubmit')
const guessField = document.querySelector('.guessField')


let resetButton

function checkGuess() {
    let userGuess = Number(guessField.value)
    if (guessCount === 1) {
        guesses.textContent = '猜過的答案: '
    }
    guesses.textContent += userGuess + '  '

    if (!(Number.isInteger(userGuess))) {
        lastResult.textContent = '猜錯了🥺'
        feedBack.style.backgroundColor = 'red'
        LowOrHi.textContent = '!!!請輸入一個整數!!!'
    } else if (userGuess < 1 || userGuess > 100) {
        lastResult.textContent = '猜錯了🥺'
        feedBack.style.backgroundColor = 'red'
        LowOrHi.textContent = '!!!答案介於到100之間!!!'
    } else if (userGuess === answer) {
        lastResult.textContent = '!!!恭喜你答對了😃!!!'
        feedBack.style.backgroundColor = 'green'
        LowOrHi.textContent = ''
        setGameOver()
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!你輸了!!!'
        setGameOver()
    } else {
        lastResult.textContent = '猜錯了🥺'
        feedBack.style.backgroundColor = 'red'
        if (userGuess < answer) {
            LowOrHi.textContent = '!!!太小了!!!'
        } else if (userGuess > answer) {
            LowOrHi.textContent = '!!!太大了!!!'
        }
    }

    guessCount++
    guessField.value = ''
    // 將文字輸入游標設在輸入框內 讓玩家可以直接輸入下一個答案
    guessField.focus()
}

//注意這裡呼叫函式時不要加入括號
guessSubmit.addEventListener('click', checkGuess)


function setGameOver() {
    guessField.disabled = true
    guessSubmit.disabled = true
    resetButton = document.createElement('button')
    resetButton.textContent = '再來一局！'
    document.body.appendChild(resetButton)
    resetButton.addEventListener('click', resetGame)
}

function resetGame() {
    guessCount = 1
    let resetParas = document.querySelectorAll('.resultParas p')
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = ''
    }

    resetButton.parentNode.removeChild(resetButton)

    guessField.disabled = false
    guessSubmit.disabled = false
    guessField.value = ''
    guessField.focus()

    feedBack.style.backgroundColor = ''
    answer = Math.floor(Math.random() * 100) + 1
}
