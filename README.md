# REST_API_framed
a basic rest api that uses framework like express, mongoose. used as a base to create rest api


// le info sono codificate in oggetti JSON, devono
// essere prima parsate per potervi accedere,
// L'oggetto JSON viene ingobato nel body della 
// richiesta
/* creiamo un nuovo oggetto Data con i valori che
    // vengono immessi dall'utente nel body della richiesta
    var data = new Data(req.body);
    // salvataggio del dato nel db
    data.save();*/

    // metodo alternativo di mongoose, crea e salva con
    // un solo comando, il comando restituisce una promise
    // quindi possiamo collegare un then() per far finire
    // di eseguire il comando prima di passare a un nuovo
    // lavoro. in questo caso si conferma all'utente nel
    // fronte end che l'op ha avuto successo rimandando i 
    // all'utente
    // la promise di mongoose è deprecata quindi deve 
// essere settata a quella variabile. 
// la promise è la funzione di callback di una funzione
// SYNC VS ASYNC
/*esistono tre modi per agire in modo asincrono:
    0) [vanilla js] == XMLHttpRequest() ;
    1) [Callback] == ('', function(){}), una funzione 
                    chiamata come se fosse un parametro;
ES6.2) [Promises] == .then(function).catch(function(err)), 
                     un oggetto che rappresenta un processo
                     non ancora completamente eseguito;
ES6.3) [Generators] == function* name (){}, funzioni che 
                        possono essere messe in pausa tramite
                        la parola yield; 
ES6.4) [Async/Await] == async await , queste due parole vengono
                        usate per rendere una funzione asincrona
                        e fermare una linea di codice 
                        rispettivamente. Usa una struttura 
                        try{} catch(err){} per gestire gli error;

*/ 

/*MIDDLEWARE
Questo file viene eseguito sequenzialmente, dunque 
l'ordine con cui vengono disposti i middleware è 
importante. Viene usato .use per richiedere tutto il 
middleware ovvero codice che viene eseguito tra una
richiesta e una risposta. i middleware usati sono :
    -body parser, trasforma le informazioni contenute
     nel body della risposta codificate in JSON in un
     oggetto;

    -routes, elencano i vari URL a cui la API risponde;

    - 404

    -error handlers, devono seguire le routes.

    -server starter

*/
//dice a express di usare il file richiesto per le routes
// il primo parametro fissa una particella che viene 
// anteposta prima di ogni URL della richiesta
// utile se si vuole creare un api

//request listener process.env.port serve per alcuni frame
// che contengono l'applicazione, è opzionale, ma necessaria
// per il normale funzionamento di una app commerciale essendo
// hostata in un server