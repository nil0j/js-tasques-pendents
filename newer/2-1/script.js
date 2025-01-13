// Tasca 1. Des d'un script principal de JS (script.js) volem carregar un segon script (1.js), per fer servir la funció funcion1 des de l'script principal.
// Per carregar l'script secundari (1.js) podem fer servir la següent funció loadScript, que crea un element HTML amb el tag `script' i configura el seu atribut `src', abans d'afegir-lo al DOM.
async function loadScript(src) {
    return new Promise((resolve, reject) => {
        /* ex4 */ if (src == "") { reject() }
        let script = document.createElement('script');
        script.src = src;
        document.head.append(script);
        script.onload = resolve
    })
}

// Sobre el comentari al document: no tots els llenguatges d'alt nivell son no-bloquejants
/* task2.1 */ async function sleep(miliseconds){
    await new Promise((resolve) => {setTimeout(resolve, miliseconds)});

    //prompt(miliseconds)
}

async function start() {
    // ex1: No troba la funcio
    // ex2: Si aquesta funcio amb callback s'esta executant a l'script principal, clarament no funcionara perque la funcio 1 segueix sense estar definida.
    /* ex3 */ //await Exercise.loadScript('1.js',()=>pt2());
    loadScript("1.js")
        .then(pt2)
        //.catch(_ => {console.log("non")})
}

async function pt2() {
    /* ex3 */ funcion1()
    /* ex4 */ console.log(funcion1())
    /* task2.1 */ sleep(1000).then(_ => {console.log("sleep done")})
}

start()
