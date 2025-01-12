/*
El codi estava en castella, l'he hagut de reescriure.

Considera llegir el seguent article sobre hotlinking:
https://risingthumb.xyz/Writing/Blog/Avoid_Hotlinking

Hi havia problemes menors amb el CSS, l'HTML i el JS,
pero no son tan importants.
*/

window.onload = () => {
    createCards(philosophers)

    let form = document.querySelector('.create-card-form')
    form.addEventListener('submit', createNewCard)

    let sortButtons = document.querySelectorAll('.sort-btn')
    sortButtons[0].addEventListener('click', sortCardsAZ )
    sortButtons[1].addEventListener('click', sortCardsZA )

    let saveButton = document.querySelector('.save-btn')
    let loadButton = document.querySelector('.load-btn')
    saveButton.addEventListener('click', saveCards )
    loadButton.addEventListener('click', loadCards )

}

function createCards(philosophers) {
    philosophers.forEach((philosopher) => {
        // Creamos tarjeta vacía
        let card = document.createElement('div')
        card.classList.add('card')
        // Creamos imagen
        let picture = document.createElement('img')
        picture.src = philosopher.picture
        picture.alt = `Picture of ${philosopher.name}`
        picture.classList.add("picture")
        card.append(picture)

        // Creamos caja de informacion
        let information = document.createElement('div')
        information.classList.add('card-info')
        card.append(information)
        // Creamos título
        let title = document.createElement('h3')
        title.classList.add('name')
        title.innerHTML = philosopher.name
        information.append(title)
        // Creamos fila de información (info-row)
        let rowInfo = document.createElement('div')
        rowInfo.classList.add('info-row')
        information.append(rowInfo)

        // Añadimos info del país a filaInfo
        let countryInfo = document.createElement('div')
        countryInfo.classList.add('info-country')

        let countryInfoFlag = document.createElement('img')
        countryInfoFlag.src = philosopher.country.flag

        let countryInfoName = document.createElement('span')
        countryInfoName.innerHTML = philosopher.country.name

        countryInfo.append(countryInfoFlag)
        countryInfo.append(countryInfoName)
        rowInfo.append(countryInfo)

        // Añadimos info de la corriente a filaInfo
        let current = document.createElement('div')
        current.classList.add('info-current')
        let currentName = document.createElement('span')
        currentName.innerHTML = "Corriente: " + philosopher.current

        current.append(currentName)
        rowInfo.append(current)

        // Añadimos info del arma a filaInfo
        let weapon = document.createElement('div')
        weapon.classList.add('info-weapon')
        let weaponName = document.createElement('span')
        weaponName.innerHTML = "Arma: " + philosopher.weapon

        weapon.append(weaponName)
        rowInfo.append(weapon)


        // Añadimos caja de habilidades
        let skills = document.createElement('div')
        skills.classList.add('skills')
        information.append(skills)
        // Añadimos una a una las habilidades
        for (let skillInfo of philosopher.skills) {
            // Añadimos una caja de habilidad
            let skill = document.createElement("div")
            skill.classList.add('skill')
            skills.append(skill)

            // Añadimos contenido caja de habilidad
            // 1.Icono de habilidad
            let skillImage = document.createElement("img")
            
            let getImage = _ => {
                switch (skillInfo.skill) {
                    case "Sabiduría": return "static/skills/sabedoria.webp"
                    case "Oratoria": return "static/skills/agilidade.webp"
                    case "Lógica": return "static/skills/chance.webp"
                    case "Innovación": return "static/skills/inteligencia.webp"
                }
            }
            skillImage.src = getImage()
            skill.append(skillImage)

            // 2.Etiqueta de habilidad
            let skillName = document.createElement("span")
            skillName.classList.add('skill-name')
            skillName.innerHTML = skillInfo.skill
            skill.append(skillName)

            // 3.Barra de habilidad
            let skillBar = document.createElement("div")
            skillBar.classList.add('skill-bar')
            skill.append(skillBar)

            let level = document.createElement("div")
            level.classList.add('level')
            level.style.width = `${100 * skillInfo.level / 5}%`
            skillBar.append(level)
        }

        // Añadimos tarjeta creada al contenedor de tarjetas
        let container = document.querySelector('.cards-container')
        container.append(card)

        // Delete button
        let deleteButton = document.createElement("div")
        deleteButton.classList.add("delete-button")
        deleteButton.innerHTML = "&#x2716"
        information.append(deleteButton)

        deleteButton.addEventListener("click", _ => { removeCard(card) })
    })
}

function removeCard(card) {
    card.remove()
}

function sortCardsAZ(_) {
    let cards = getSortedCards()
    printCards(cards)
}

function sortCardsZA(_) {
    let cards = getSortedCards().reverse()
    printCards(cards)
}

function getSortedCards() {
    let cards = Array.from(document.querySelectorAll('.card'))
    return cards.sort((cardA, cardB) => {
        let name1 = cardA.querySelector('h3').innerHTML
        let name2 = cardB.querySelector('h3').innerHTML
        return name1.localeCompare(name2)
    })
}

function printCards(sortedCards) {
    let cards = Array.from(document.querySelectorAll('.card'))
    cards.map(card => card.remove)
    let container = document.querySelector('.cards-container')
    sortedCards.forEach(card => { container.append(card) })
}

function createNewCard(event) {
    event.preventDefault()
    let newPhilosopher = {
        name: document.querySelector('.create-card-form .name').value,
        picture: document.querySelector('.create-card-form .picture').value,
        country: {
            name: document.querySelector('.create-card-form .country').value,
            flag: document.querySelector('.create-card-form .flag').value,
        },
        current: document.querySelector('.create-card-form .current').value,
        weapon: document.querySelector('.create-card-form .weapon').value,

        skills: [{
            skill: "Sabiduría",
            level: document.querySelector('.create-card-form .wisdom').value,
        },
        {
            skill: "Oratoria",
            level: document.querySelector('.create-card-form .oratory').value,
        },
        {
            skill: "Lógica",
            level: document.querySelector('.create-card-form .logic').value,
        },
        {
            skill: "Innovación",
            level: document.querySelector('.create-card-form .innovation').value,
        }]
    }

    document.querySelectorAll('.create-card-form input').forEach(c => { c.value = "" })
    createCards([newPhilosopher])
}

function parseCards(cards) {
    console.log(cards)
    let parsedPhilosophers = []

    for (let card of cards) {
        let levels = Array.from(card.querySelectorAll('.level'))
            .map(l => {return l.style.width.substring(0, l.style.width.indexOf('%'))})
            .map(s => {return Number(s) * 5 / 100})
        console.log(levels)

        parsedPhilosophers.push({
            name: card.querySelector('.name').innerHTML,
            picture: card.querySelector('.picture').src,
            country: {
                name: card.querySelector('.info-country span').innerHTML,
                flag: card.querySelector('.info-country img').src,
            },
            current: card.querySelector('.info-current').innerHTML.substring(17),
            weapon: card.querySelector('.info-weapon').innerHTML.substring(12),

            skills: [{
                skill: "Sabiduría",
                level: levels[0],
            },
            {
                skill: "Oratoria",
                level: levels[1],
            },
            {
                skill: "Lógica",
                level: levels[2],
            },
            {
                skill: "Innovación",
                level: levels[3],
            }]
        })
    }
    return parsedPhilosophers
}

function saveCards() {
    let cards = Array.from(document.querySelectorAll('.card'))
    localStorage.setItem('cards', JSON.stringify(parseCards(cards)))
}

function loadCards() {
    let cards = JSON.parse(localStorage.getItem("cards"))
    Array.from(document.getElementsByClassName("card")).map(card => {card.remove()})
    createCards(cards)
}

const philosophers = [
    {
        name: "Plato",
        picture: "static/philosophers/plato.jpg",
        country: {
            name: "Grecia",
            flag: "static/flags/greece.png"
        },
        current: "Idealismo",
        weapon: "Dialéctica",
        skills: [{
            skill: "Sabiduría",
            level: 4
        },
        {
            skill: "Oratoria",
            level: 4
        },
        {
            skill: "Lógica",
            level: 3
        },
        {
            skill: "Innovación",
            level: 4
        }]
    },
    {
        name: "Aristóteles",
        picture: "static/philosophers/aristotle.jpg",
        country: {
            name: "Grecia",
            flag: "static/flags/greece.png"
        },
        current: "Naturalismo",
        weapon: "Lógica",
        skills: [{
            skill: "Sabiduría",
            level: 4
        },
        {
            skill: "Oratoria",
            level: 3
        },
        {
            skill: "Lógica",
            level: 4
        },
        {
            skill: "Innovación",
            level: 3
        }
        ]
    },
    {
        name: "Descartes",
        picture: "static/philosophers/descartes.jpg",
        country: {
            name: "Francia",
            flag: "static/flags/france.png"
        },
        current: "Racionalismo",
        weapon: "Meditación",
        skills: [{
            skill: "Sabiduría",
            level: 3
        },
        {
            skill: "Oratoria",
            level: 3
        },
        {
            skill: "Lógica",
            level: 2
        },
        {
            skill: "Innovación",
            level: 3
        }
        ]
    },
    {
        name: "Kant",
        picture: "static/philosophers/kant.jpg",
        country: {
            name: "Alemania",
            flag: "static/flags/germany.png"
        },
        current: "Trascendentalismo",
        weapon: "Crítica",
        skills: [{
            skill: "Sabiduría",
            level: 3
        },
        {
            skill: "Oratoria",
            level: 2
        },
        {
            skill: "Lógica",
            level: 3
        },
        {
            skill: "Innovación",
            level: 3
        }
        ]
    },
    {
        name: "Hume",
        picture: "static/philosophers/hume.jpg",
        country: {
            name: "Escocia",
            flag: "static/flags/scotland.png"
        },
        current: "Empirismo",
        weapon: "Escepticismo",
        skills: [{
            skill: "Sabiduría",
            level: 3
        },
        {
            skill: "Oratoria",
            level: 3
        },
        {
            skill: "Lógica",
            level: 3
        },
        {
            skill: "Innovación",
            level: 3
        }
        ]
    },
    {
        name: "Arendt",
        picture: "static/philosophers/arendt.jpg",
        country: {
            name: "Alemania",
            flag: "static/flags/germany.png"
        },
        current: "Fenomenología",
        weapon: "Parresía",
        skills: [{
            skill: "Sabiduría",
            level: 3
        },
        {
            skill: "Oratoria",
            level: 2
        },
        {
            skill: "Lógica",
            level: 2
        },
        {
            skill: "Innovación",
            level: 3
        }
        ]
    },
    {
        name: "Nietzche",
        picture: "static/philosophers/nietzche.jpg",
        country: {
            name: "Alemania",
            flag: "static/flags/germany.png"
        },
        current: "Nietzscheanismo",
        weapon: "Crítica",
        skills: [{
            skill: "Sabiduría",
            level: 3
        },
        {
            skill: "Oratoria",
            level: 1
        },
        {
            skill: "Lógica",
            level: 4
        },
        {
            skill: "Innovación",
            level: 5
        }
        ]
    }
]
