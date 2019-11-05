// Variables
const listaTweets = document.querySelector('#lista-tweets');

// Event Listeners

eventListener(); 


function eventListener(){
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    
    listaTweets.addEventListener('click', borrarTweet);

    // contenido Cargado
    // carga cuando todo el documento ha finalizado de cargarse y lea los datos
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


// Funciones
function agregarTweet(e){
    e.preventDefault();  // Para que no nos abra el action
    
    const tweet = document.getElementById('tweet').value; // Leer el valor del textarea

        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';


        const li = document.createElement('li');  // Crear Lista
        li.innerText = tweet; // que sea igual al valor del Tweet
        li.appendChild(botonBorrar); // Unirla al botón de borrar tweet

        listaTweets.appendChild(li); // unirlos

    agregarTweetLocalStorage(tweet); 

}

// Tener funciones pequeñas que hagan tareas específicas

function borrarTweet (e){
    e.preventDefault(); 
    
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove(); // Instrucción de eliminar
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }

}

// cargar datos del localStprage
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

   // Imprimir usando forEach

    tweets.forEach(function(tweet){
       // Crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';


        const li = document.createElement('li');  // Crear Lista
        li.innerText = tweet; // que sea igual al valor del Tweet
        li.appendChild(botonBorrar); // Unirla al botón de borrar tweet

        listaTweets.appendChild(li); // unirlos
    });

}

// agrega tweet a LocalStorage

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.push(tweet);

localStorage.setItem('tweets', JSON.stringify(tweets) ); // Convertimos de Json a string


}
// comprobar que hay elementos en LocalStorage
// Funcion importante que retorna tanto si esta vacio el array de tweets como si esta lleno
function obtenerTweetsLocalStorage(){
    let tweets;

    if(localStorage.getItem('tweets') === null){
        tweets = []; // Inicializamos un array vacio para allí meter los tweets
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets') ); // convertimos a JSON para poder almacenar
    }
    return tweets; // regresame los tweets
}

// Eliminar tweet de Local Storage
function borrarTweetLocalStorage(tweet){
  let tweets, tweetBorrar; // viene como parametro de la funcion de borrarTweet()
  // Elimina la X del tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1); // metodo para cortar el string

tweets = obtenerTweetsLocalStorage();

tweets.forEach(function(tweet, index){
    if(tweetBorrar === tweet){
        tweets.splice(index, 1); // Toma la posicion del array y que tan lejos quiero ir. cuantos elementos despues de esa posicion quiero eliminar
    }
});

localStorage.setItem('tweets', JSON.stringify(tweets) );
}