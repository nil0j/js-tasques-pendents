window.onload = () => {
    // Crear tarjetas
    createCards(philosophers)

    // Crear handlers para los botones de control
    let cardCreationButton = document.querySelector('.create-btn');
    cardCreationButton.addEventListener('click', createNewCard);
}

function createCards(philosophers) {
    philosophers.forEach((philosopher) => {
        // Creamos tarjeta vacía
        let card = document.createElement('div');
        card.classList.add('card');
        // Creamos imagen
        let picture = document.createElement('img');
        picture.src = philosopher.picture;
        picture.alt = `Picture of ${philosopher.name}`;
        picture.classList.add("photo");
        card.append(picture);

        // Creamos caja de informacion
        let information = document.createElement('div');
        information.classList.add('card-info');
        card.append(information);
        // Creamos título
        let title = document.createElement('h3');
        title.classList.add('name');
        title.innerHTML = philosopher.name;
        information.append(title);
        // Creamos fila de información (info-row)
        let rowInfo = document.createElement('div');
        rowInfo.classList.add('info-row');
        information.append(rowInfo);

        // Añadimos info del país a filaInfo
        let countryInfo = document.createElement('div');
        countryInfo.classList.add('info-pais');

        let countryInfoFlag = document.createElement('img');
        countryInfoFlag.src = philosopher.country.flag;

        let countryInfoName = document.createElement('span');
        countryInfoName.innerHTML = philosopher.country.name

        countryInfo.append(countryInfoFlag)
        countryInfo.append(countryInfoName)
        rowInfo.append(countryInfo);

        // Añadimos info de la corriente a filaInfo
        let current = document.createElement('div');
        current.classList.add('info-current');
        let currentName = document.createElement('span');
        currentName.innerHTML = "Corriente: " + philosopher.current

        current.append(currentName)
        rowInfo.append(current);

        // Añadimos info del arma a filaInfo
        let weapon = document.createElement('div');
        weapon.classList.add('info-weapon');
        let weaponName = document.createElement('span');
        weaponName.innerHTML = "Arma: " + philosopher.weapon

        weapon.append(weaponName)
        rowInfo.append(weapon);


        // Añadimos caja de habilidades
        let skills = document.createElement('div');
        skills.classList.add('skills');
        information.append(skills);
        // Añadimos una a una las habilidades
        for (let skillInfo of philosopher.skills) {
            // Añadimos una caja de habilidad
            let skill = document.createElement("div")
            skill.classList.add('skill');
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
            skillName.classList.add('skill-name');
            skillName.innerHTML = skillInfo.skill
            skill.append(skillName)

            // 3.Barra de habilidad
            let skillBar = document.createElement("div")
            skillBar.classList.add('skill-bar');
            skill.append(skillBar)

            let level = document.createElement("div")
            level.classList.add('level');
            level.style.width = `${100 * skillInfo.level / 5}%`;
            skillBar.append(level)
        }

        // Añadimos tarjeta creada al contenedor de tarjetas
        let container = document.querySelector('.cards-container');
        container.append(card);

        // Delete button
        let deleteButton = document.createElement("div")
        deleteButton.classList.add("delete-button")
        deleteButton.innerHTML = "&#x2716"
        information.append(deleteButton);

        deleteButton.addEventListener("click", _ => { removeCard(card) })
    })
}

function removeCard(card) {
    card.remove()
}

function sortCardsAlphabetically() {
    let cards = Array.from(document.querySelectorAll('.card'));
    let sortedCards = cards.sort((cardA, cardB) => {
        let name1 = cardA.querySelector('h3').innerHTML;
        let name2 = cardB.querySelector('h3').innerHTML;
        return name1.localeCompare(name2);
    });

    // Eliminar totes les targetes de l'array 'tarjeta'
    // Completar codi

    // Afegir 'tarjetasOrdenadas' al contenidor de cards
    let container = document.querySelector('.cards-container');
    // Completar codi
}

function sortCardsReverseAlphabetically() {
}

function createNewCard(event) {
    event.preventDefault();
    let newPhilosopher = {};
    newPhilosopher.name = document.querySelector('.create-card-form .name').value;
    newPhilosopher.picture = document.querySelector('.create-card-form .picture').value;
    newPhilosopher.country = {};
    newPhilosopher.country.name = document.querySelector('.create-card-form .country').value;
    // Completar la función

    // crearTarjetas(nuevoFilosofo);
}

function parseCards(cards) {
    let parsedPhilosophers = [];
    for (let card of cards) {
        let philosopher = {};
        philosopher.name = card.querySelector('.name').innerHTML;
        philosopher.picture = card.querySelector('.picture').src;
        philosopher.country = {};
        // Completar funció

        let skills = card.querySelectorAll('.skill');
        for (let skill of skills) {
            let saveSkill = {};
            // Completar funció
        }
        parsedPhilosophers.push(philosopher);
    }
    return parsedPhilosophers;
}

function saveCards() {
    let cards = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('cards', JSON.stringify(parseCards(cards)));
}


function loadCards() {
}

const countries = {
    france: {
        name: "Francia",
        flag: "static/flags/france.png"
    },
    germany: {
        name: "Alemania",
        flag: "static/flags/germany.png",
    },
    greece: {
        name: "Grecia",
        flag: "static/flags/greece.png"
    },
    scotland: {
        name: "Escocia",
        flag: "static/flags/scotland.png"
    },
}

const philosophers = [
    {
        name: "Plato",
        picture: "static/philosophers/plato.jpg",
        country: countries.greece,
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
        }
        ]
    },
    {
        name: "Aristóteles",
        picture: "static/philosophers/aristotle.jpg",
        country: countries.greece,
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
        country: countries.france,
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
        country: countries.germany,
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
        country: countries.scotland,
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
        country: countries.germany,
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
        country: countries.germany,
        current: "Nietzscheanism",
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
