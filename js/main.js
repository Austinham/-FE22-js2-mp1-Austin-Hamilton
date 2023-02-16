const playerChoiceReader = document.querySelector('#player-picked');
const cpuChoiceReader = document.querySelector('#cpu-picked');
const playerResult = document.querySelector('#player-result');
const cpuResult = document.querySelector('#cpu-result');
const result = document.querySelector('#result');
let btns = document.querySelectorAll('#rock, #paper, #scissors');
const playerInputName = document.querySelector("#player-name-input");
const h2PlayerName = document.querySelector("#player-name");
const submitButton = document.querySelector("#submit-button");
const gameLength = 3;
let playerName = "";

// När man klickar på ens namn så blir input synlig så att man kan skriva nytt namn
h2PlayerName.addEventListener('click', function () {
    playerInputName.style.display = "block"
    submitButton.style.display = "block"
    h2PlayerName.style.display = "none"
})

// när man klickar enter eller på submit knappen så 
// försvinner dem för att visa namnet i h2 element 
submitButton.addEventListener('click', function (event) {
    event.preventDefault()
    // console.log(playerInputName.value)
    playerName = playerInputName.value;
    h2PlayerName.innerHTML = playerName + " :"
    playerInputName.style.display = "none"
    submitButton.style.display = "none"
    h2PlayerName.style.display = "block"
    playerResult.innerText = '0';

    for (let i = 0; i <= 2; i++) {
        btns[i].disabled = false;
    }
})

// loopaar över knapparna och lägger till en event listener
// så att när knapppen trycks så ska ikonen i dens innerHTML
// 
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function (event) {
        // får id:n från den knappen som blir ned tryckt
        id = '#' + event.target.id
        // hämtar ikonen av den knappen som blir ned tryckt 
        // sätter ikonen i player choice reder element
        playerChoiceReader.innerHTML = document.querySelector(id).innerHTML

        machineDecision(i)
    })
}

// slumpmässig val
function machineDecision(playerChoice) {
    machineChoice = Math.floor(Math.random() * btns.length)
    cpuChoiceReader.innerHTML = btns[machineChoice].innerHTML
    compare(playerChoice, machineChoice)
}

function compare(playerChoice, machineChoice) {
    // Alla sätt spelaren kan vinna
    // index 0 = sten, 1 = papper, 2 = sax
    if (playerChoice == 0 && machineChoice == 2 ||
        playerChoice == 1 && machineChoice == 0 ||
        playerChoice == 2 && machineChoice == 1) {
        // Vi över poängen med 1 för spelaren, eftersom den vann rudnan
        playerResult.innerHTML = parseInt(playerResult.innerHTML) + 1;
        result.innerHTML = "Winner";
    } else if (playerChoice == machineChoice) {
        // Spelara spelar lika med maskinen
        result.innerHTML = "Draw";
    } else {
        // Vi över poängen med 1 för cpu, 
        // ifall spelaren ej vinner eller spelare lika
        cpuResult.innerHTML = parseInt(cpuResult.innerHTML) + 1;
        result.innerHTML = "Loose";
    }




    let playerPoints = parseInt(playerResult.innerHTML)
    let cpuPoints = parseInt(cpuResult.innerHTML)


    if (cpuPoints >= 1) {
        result.innerHTML = "MACHINE wins! Final score:" + playerPoints;

        postHighScore(playerPoints)

        setTimeout(() => {

            reset()
        }, 1000)



        for (let i = 0; i <= 2; i++) {
            btns[i].disabled = true;
        }
    }
}


function reset() {

    for (let i = 0; i <= 2; i++) {
        btns[i].disabled = false;
    }



    submitButton.disabled = false;

    for (let i = 0; i < btns.length; i++) {
        if (btns[i] !== submitButton) {
            btns[i].disabled = true;
        }
    }

    playerInputName.style.display = "block"
    submitButton.style.display = "block"

    playerResult.innerHTML = 0;
    cpuResult.innerHTML = 0;
    result.innerHTML = '';

}

const scoreUrl = 'https://highscores-bc347-default-rtdb.europe-west1.firebasedatabase.app/highestscore.json';


async function getData() {

    try {
        const response = await fetch(scoreUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('get data..', data)
        displayScoreInfo(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        result.innerHTML = `Error: ${error.message}`;
    }


    // const response = await fetch(scoreUrl);
    // const data = await response.json();
    // console.log('get data..', data)

    // displayScoreInfo(data)
}
getData();


async function displayScoreInfo(data) {

    try {
        const arr = [];

        const array = Object.values(data);

        const highestScoreContainer = document.querySelector('#highScore-con');
        array.sort((a, b) => b.score - a.score);

        document.getElementById("highScore-con").innerHTML = ""; // rensar listan

        array.slice(0, 5).forEach((item) => {
            const info = document.createElement('h3');
            info.innerText = `${item.name}: ${item.score}`;
            highestScoreContainer.appendChild(info);
            console.log(item);
        });
    } catch (error) {
        console.error(error);
    }

}


async function postHighScore(playerPoints) {


    try {
        const obj = {
            name: playerName,
            score: playerPoints
        };
        const option = {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        };
        const response = await fetch(scoreUrl, option);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const id = await response.json();
        await getData();
        console.log(id);
    } catch (error) {
        console.error('Error posting high score:', error);
    }


    
}
const resetBtn = document.getElementById("resetScores");

resetBtn.addEventListener('click',()=>{
    deleteHighScores();
})

async function deleteHighScores() {
    try {
      const option = {
        method: 'DELETE',
      };

      document.getElementById("highScore-con").innerHTML = "";
      const response = await fetch(scoreUrl, option);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('High scores deleted successfully');
      await getData();
    } catch (error) {
      console.error('Error deleting high scores:', error);
    }
  }
