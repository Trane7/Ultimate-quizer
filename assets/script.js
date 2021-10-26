const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const questionText = document.querySelector('#questionText')
const scoreText = document.querySelector('#score')
const questionBarFull = document.querySelector('#questionBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question:'Inside which HTML element do we put the JavaScript?',
        choice1: 'JavaScript',
        choice2: 'JS',
        choice3: 'Script',
        choice4: 'Scripting',
        answer: '3',
    },
    {
        question:'What is the correct JavaScript syntax to write "Hello World"?',
        choice1: 'reponse.write("Hello World")',
        choice2: '"Hello World"',
        choice3: 'document.write("Hello World")',
        choice4: '("Hello World")',
        answer: '3',
    },
    {
        question:'Where is the correct place to insert a JavaScript?',
        choice1: 'Both the <head> section and the <body> section',
        choice2: 'The <body> section',
        choice3: 'The <head> section',
        choice4: 'The <footer> section',
        answer: '1',
    },
    {
        question:'An external JavaScript must contain the <script> tag?',
        choice1: 'False',
        choice2: 'True',
        answer: '1',
    },
    {
        question:'How do you create a function?',
        choice1: 'function:myFunction()',
        choice2: 'function = myFunction()',
        choice3: 'function myFunction()',
        choice4: 'myFunction():function',
        answer: '3',
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS =5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    questionText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    questionBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset ['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice =>  {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()