// Variables
const listaTweets = document.querySelector('#lista-tweets');

// Event Listeners

eventListener(); 


function eventListener(){
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    listaTweets.addEventListener('click', borrarTweet);
}


// Funciones
function agregarTweet(e){
    e.preventDefault();  // Para que no nos abra el action

    const tweet = document.getElementById('tweet').value; // Leer el valor del textarea

    // Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';


    const li = document.createElement('li');  // Crear Lista
    li.innerText = tweet; // que sea igual al valor del Tweet
    li.appendChild(botonBorrar); // Unirla al botón de borrar tweet

    listaTweets.appendChild(li); // unirlos

    agregarTweetLocalStorage(tweet); 

}


function borrarTweet (e){
    e.preventDefault(); 
    
    if(e.target.className === 'borrar-tweet'){
        console.log(e.target.parentElement.remove());
    }

}


function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.push(tweet);

localStorage.setItem('tweets', JSON.stringify(tweets) ); // Convertimos de Json a string


}

function obtenerTweetsLocalStorage(){
    let tweets;

    if(localStorage.getItem('tweets') === null){
        tweets = []; // Inicializamos un array vacio para allí meter los tweets
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets') ); // convertimos a JSON para poder almacenar
    }
    return tweets; // regresame los tweets
}