// 1. Saca por consola todo el contenido del body sin utilizar ningún método de document
let html;

async function getData(callback) {
    await fetch("ac5.html")
        .then(response => response.text())
        .then((htmlContent) => {
            const parser = new DOMParser()
            const dom = parser.parseFromString(htmlContent, 'text/html')
            const bodyContent = dom.querySelector('body').innerHTML
            return bodyContent
        })
        .then(data => callback(data))
        .catch(error => console.error(error))
}
getData((data) => {
    console.log("ex 1", data)
})

// 2. Saca por consola el texto del elemento #titulo sin utilizar ningún método de document
console.log("ex 2", titulo)

// 3. Saca el contenido del tercer li usando el método querySelector
console.log("ex 3", document.querySelector('ul > li'))

// 4. Saca el contenido del tercer li usando el método querySelectorAll
console.log("ex 4", document.querySelectorAll('ul > li')[2])

// 5. Que ocurre cuando se ejecuta este comando. ¿Por qué?
// let elementos = document.querySelector('li');
// elementos[2].remove();
//
// which one of the 2 commands?
// - first one: gets the first element in the query
// - second one: attempts to print the value of the index 2 (nonexistant)

// 6. Que ocurre cuando se ejecuta este comando. ¿Por qué?
// let lista = document.querySelectorAll('ul');
// lista.remove();
//
// there's 2 commands, not one:
// - first one: gets a nodelist that contains elements
// - second one: attempts to call the function remove from nodelist (nonexistant)

// 7. Accede a la lista ul y borra el segundo de sus hijos, utilizando su propiedad children
document.getElementsByTagName('ul')[0].children[1].remove()


// 8. Accede a la lista ul y borra el segundo de sus hijos, utilizando su propiedad childNodes
Array.from(document.getElementsByTagName('ul')[0].childNodes).filter(node => node.nodeName == "LI")[1].remove()


// 9. Completa este código para que se ponga de color azul el hermano siguiente al primer elemento de la lista

// we ran out of LIs
{
    let li = document.createElement("li")
    li.textContent = "NO HAY MAS LIs"
    li.className = "item"
    document.getElementsByTagName('ul')[0].appendChild(li)
}
////////////////////////////////////////////

// code line that cannot be removed
let element = document.querySelector('li:first-child');

// haskell-like operation to get the next LI
let getNextLi = (element) => {
    let next = element.nextSibling
    return next.nodeName == "LI" ? next : getNextLi(next)
}
getNextLi(element).style.color="blue"


// 10. Completa este código para que se pongan de color azul él y todos sus hermanos

// change of wording suggestion:
// Completa este código para que se pongan de color azul el primer elemento de la lista y todos sus hermanos

// code line that cannot be removed
let elemento = document.querySelector('li:first-child');

// haskell-like operation to get all LIs
let getAllSiblings = (current, LiList = []) => {
    let next = current.nextSibling
    if (current.nodeName == "LI") LiList.push(current)
    if (next == undefined) return LiList
    return getAllSiblings(next, LiList)
}
getAllSiblings(element).forEach(s => s.style.color="blue")


// 11. ¿Por qué no podemos acceder así al atributo 'tema' del #título?
// let titulo = document.querySelector('#titulo');
// console.log(titulo.tema);

// The first line of code is incompatible with exercise 2.
// Imagine creating a custom attribute named "innerHTML". It would be incompatible with the interpreter's rules, that's why we can't


// 12. Saca por consola el valor del atributo 'tema' del #título
console.log("ex 12", titulo.getAttribute("tema"))


// 13. Añade al título el atributo 'cfgs' con valor 'daw'
titulo.setAttribute("cfgs", "daw")


// 14. Cambia el id del h3 sin utilizar el método setAttribute

// Change of wording suggestion:
// 14. Cambia el id del titulo sin utilizar el método setAttribute
titulo.id = "title"


// 15. ¿Este código añade correctamente la classe 'elem' a los elementos de la lista?
// let elementos = document.querySelectorAll('.item');
// for (let elemento of elementos){
//     elemento.className = "elem";
// }

// No it doesn't, it replaces all classes for this one


// 16. Añade correctamente a los elementos de la lista la clase "item"

// Are you sure this is what you wanted? The item class, not the element class?
Array.from(document.getElementsByClassName("item")).map(li => li.classList.add("item"))


// 17. ¿Es correcta la salida por consola?
// let primerElemento= document.querySelectorAll('.item')[0];
// primerElemento.classList.add("elem");
// console.log(primerElemento.className);

// The output is always correct, unless there's a bug in the interpreter.
// I don't get what is being asked here


// 18. Añade un Cuarto Elemento al final de la lista

// *3rd element, we don't have that many
{
    let li = document.createElement("li")
    li.textContent = "haz ver que este es el cuarto"
    li.className = "item"
    document.getElementsByTagName('ul')[0].appendChild(li)
}


// 19. Añade un Elemento Cero al principio de la lista
{
    let li = document.createElement("li")
    li.textContent = "este se ha colado"
    li.className = "item"
    document.getElementsByTagName('ul')[0].insertBefore(li, document.querySelector("ul > li"))
}


// 20. Duplica el Tercer Elemento a continuación de éste en la lista
{
    let og = document.getElementsByClassName("item")[2]
    let clone = og.cloneNode(true)
    document.getElementsByTagName('ul')[0].insertBefore(clone, document.getElementsByClassName("item")[3])
}
