# REST_API_framed
una rest api che usa frameworks come express, mongoose, body parser. creata come esercizio.


 le info sono codificate in oggetti JSON in mongo,
 devono quindi essere prima parsate per potervi accedere,
 L'oggetto JSON viene ingobato nel body della 
 richiesta(req)


 la promise di mongoose è deprecata quindi deve 
 essere settata a quella globale. 
 

SYNC VS ASYNC
  esistono tre modi per agire in modo asincrono:
      0) [vanilla js] == XMLHttpRequest() ;
      1) [Callback] == ('', function(){}), una funzione 
                      chiamata come se fosse un parametro;
  ES6.2) [Promises] == .then(function).catch(function(err)), 
                      un oggetto che rappresenta un processo
                      non ancora completamente eseguito;
  ES6.3) [Generators] == function* name (){}, funzioni che 
                          possono essere messe in pausa tramite
                          la parola yield; 
  ES6.4) [Async/Await] == async await , queste due parole                           vengono usate per rendere una                             funzione asincrona e fermare una                          linea di codice rispettivamente.
                          Usa una struttura 
                          try{} catch(err){} per gestire gli error;


MIDDLEWARE
i file js vengono eseguiti sequenzialmente, dunque 
l'ordine con cui vengono disposti i middleware è 
importante. Viene usato .use per richiedere tutto il 
middleware ovvero codice che viene eseguito tra una
richiesta e una risposta. i middleware usati sono :

    - body parser, trasforma le informazioni contenute
      nel body della risposta codificate in JSON in un
      oggetto;

    - routes, elencano i vari URL a cui la API risponde;

    - joi, oggetto che permette di validare i dati in arrivo dal client;

    - 404

    - error handlers, devono seguire le routes.

 poi il server viene fatto partire (app.js)


.use(/api, routes) dice a express di usare il file richiesto per le routes, il primo parametro fissa una particella che viene anteposta prima di ogni URL della richiesta. utile se si vuole creare un api

process.env.port è una variabile globale trovata in alcuni ambienti server collegata all porte adibita all'ascolto

AUTENTICAZIONE
nella api viene usato il middleware joi che permette di validare dei valori quando si crea un nuovo useri dati in arrivo dal client. i file joi sono allinterno della cartella helpers
 
JSON Web Token
per garantire la sicurezza durante lo scambio di informazioni tra client e server vengono usati i JWT, i JSON Web Token, degli oggetti JSON che contengono informazioni legate alla sicurezza. le informazioni che è possibile passare nell'oggetto aiutano permettono di conoscere il client con cui si sta comunicando e verificare se qualcuno ha intercettato il token e lo ha modificato. i JWT sono composti da tre parti:
  -headers
  -payload
  -signature
le tre parti vengono gestite tramite un modulo chiamato jsonwebtoken. il modulo permette di creare facilmente il token dando la possibilita di usare tre modi per scrivere il payload. 
  -registered, permette di usare delle informazioni prestabilite ad esempio issued, un nome solitamente il nome del server o dell'applicazione 
  -public
  -private
l'header e la signature vengono gestite dal modulo.

PASSPORT
passport usa una delle molte strategie che mette a disposizione per implementare l'autorizzazione. quella basata sui token richiede di specificare le parti del token e rispondere con l'utente