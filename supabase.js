const { createClient } = supabase;
const mySupabase = createClient('https://nrxjmfurruizoaevsnod.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yeGptZnVycnVpem9hZXZzbm9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkxNDk1ODQsImV4cCI6MTk2NDcyNTU4NH0.KrAQ1wlr9An24Xzu_fnVFnjHB0UjuaF52JFBdhLrBIA')

let currentQuestion = 0;
let allQuestions;

async function loadDatabase() {
    const { data, error } = await mySupabase.from('Questions').select()
    console.log("Data",data)

    allQuestions = data

    setCurrentQuestion()
}

function setCurrentQuestion() {
    
    document.getElementById("title").innerHTML = allQuestions[currentQuestion].question

    var result = ""
    allQuestions[currentQuestion].answers.forEach((element, index) => {
        let myAnswer = '<button id="btn-'+index+'" onclick="checkAnswer('+index+')" class="btn btn-outline-primary" type="button">'+element+'</button>'
        result = result + myAnswer

        console.log("DALE", result)
    });

    document.getElementById("answers").innerHTML = result

    document.getElementById("total").innerHTML = "Pregunta " + (currentQuestion + 1) + " de " + allQuestions.length
}

function nextQuestion() {
    currentQuestion += 1
    setCurrentQuestion()
}

function checkAnswer(pos) {
    
    if (pos == allQuestions[currentQuestion].correct) {
        console.log("Respuesta correcta")
        document.getElementById("btn-"+ pos).classList.remove('btn-outline-primary')
        document.getElementById("btn-"+ pos).classList.add('btn-success')
    } else {
        console.error("Respuesta incorrecta")
        document.getElementById("btn-"+ pos).classList.remove('btn-outline-primary')
        document.getElementById("btn-"+ pos).classList.add('btn-danger')

        document.getElementById("btn-"+ allQuestions[currentQuestion].correct).classList.remove('btn-outline-primary')
        document.getElementById("btn-"+ allQuestions[currentQuestion].correct).classList.add('btn-success')
    }

}

loadDatabase();