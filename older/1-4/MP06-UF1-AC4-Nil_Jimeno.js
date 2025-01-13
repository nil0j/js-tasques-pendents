function createList() {
    let ul = document.createElement("ul")
    
    let json = `{
        "Birds": {},
        "Potatoes": {},
        "Eggs": {}
    }`
    
    let object = JSON.parse(json)

    
    Object.entries(object).forEach(entry => {
        let li = document.createElement("li")
        li.innerHTML = entry[0]
        ul.appendChild(li)
    })

    document.body.appendChild(ul)
}


function createList2() {
    let ul = document.createElement("ul")
    let json = `{
        "Birds": {
            "Flying": {},
            "Not flying": {}
        },
        "Potatoes": {},
        "Eggs": {
            "Fried": {},
            "Boiled": {}
        }
    }`
    let object = JSON.parse(json)
    
    Object.entries(object).forEach(entry => {
        let li = document.createElement("li")
        li.innerHTML = entry[0]

        if (Object.entries(entry[1]).length > 0) {
            let innerUl = document.createElement("ul")

            Object.entries(entry[1]).forEach(entry => {
                let innerLi = document.createElement("li")
                innerLi.innerHTML = entry[0]
                innerUl.append(innerLi)
            })

            li.appendChild(innerUl)
        }
        
        ul.appendChild(li)
    })

    document.body.appendChild(ul)
}

function updateList(json, color) {
    if (document.getElementById("list") != null) {
        document.getElementById("list").remove()
    }

    let object = JSON.parse(json)
    let div = document.createElement("div")
    div.id = "list"
    div.style.color = color

    function clickEffects(li, ul) {
        if (li.style.color != "yellow") {
            li.style.color = "yellow"
        } else {
            li.style.color = color
        }

        const clone = li.cloneNode(true)
        clone.addEventListener("click", _ => clickEffects(clone, ul))
        clone.addEventListener("contextmenu", _ => clone.remove())
        ul.appendChild(clone)
    }

    function newUl(obj) {
        let ul = document.createElement("ul")
        ul.style.color = color
        Object.entries(obj).forEach(entry => {
            let li = document.createElement("li")
            li.innerHTML = entry[0]

            if (Object.entries(entry[1]).length > 0) {
                let innerUl = newUl(entry[1])
                li.appendChild(innerUl)
            } else {
                li.addEventListener("click", _ => clickEffects(li, ul))
                li.addEventListener("contextmenu", _ => li.remove())
            }
            
            ul.appendChild(li)
        })
        return ul
    }

    let ul = newUl(object)
    div.appendChild(ul)
    document.body.appendChild(div)
}

function printUl() {
}


let initialJson = `{
    "Birds": {
        "Flying": {},
        "Not flying": {}
    },
    "Potatoes": {},
    "Eggs": {
        "Fried": {},
        "Boiled": {}
    }
}`

let textarea = document.createElement("textarea")
textarea.value = initialJson
document.body.appendChild(textarea)

let colorInput = document.createElement("input")
colorInput.type = "color"
document.body.appendChild(colorInput)

let convert = document.createElement("button")
convert.innerText = "Convert"
convert.addEventListener("click", _ => {
    updateList(textarea.value, colorInput.value)
})
document.body.appendChild(convert)
