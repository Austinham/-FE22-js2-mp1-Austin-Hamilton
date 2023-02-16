// let nameValue = ''; 
// let newPlayer = {
//     name: '',
//     score: 0
// };

// async function getHighScoresData() {
//     const url = 'https://highscores-bc347-default-rtdb.europe-west1.firebasedatabase.app/.json';
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data)

//     return data;

// }
// getHighScoresData();

// function getFormData() {
//     const url = 'https://highscores-bc347-default-rtdb.europe-west1.firebasedatabase.app/.json';

//     const formData = {};
//     const inputs = document.querySelectorAll('input');
//     inputs.forEach(input => {
//         formData[input.name] = input.value;
//     });

//     return newPlayer;
// }
// const inputName = document.querySelector('input');
// inputName.addEventListener('change', (e)=> {
//     nameValue = e.target.value; 
// })


// async function postHighScore(newPlayer) {
//     const url = 'https://highscores-bc347-default-rtdb.europe-west1.firebasedatabase.app/.json';


//     const option = {
//         method: "POST",
//         body: JSON.stringify(newPlayer),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//         }
//     }
//     const response = await fetch(url, option);
//     const id = await response.json();
//     console.log(id);

// }


// document.querySelector('#submit-button').addEventListener('click', event => {
//     event.preventDefault();
//     if(nameValue.length > 1){
//         newPlayer.name = nameValue
//     }
//     const formData = getFormData();
//     console.log(newPlayer);
//     postHighScore(newPlayer);
// });



