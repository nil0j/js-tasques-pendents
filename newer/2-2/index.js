// Tasca 1. Treballarem amb els següents dos endpoints de l'API Json Placeholder:
// https://jsonplaceholder.typicode.com/users
// https://jsonplaceholder.typicode.com/posts
// 	El segon endpoint permet filtrar posts per userId:
// 	https://jsonplaceholder.typicode.com/posts?userId=1
// 
// Programa la funció fetchPosts() que:
//  Demani al primer endpoint la llista d'usuaris.
//  Per cada usuari rebut, demani al segon endpoint la seva llista de posts.
//  Crei una llista de posts (només el títl) de cada usuari a dins de la llista HTML #user-posts.

async function getUsers() {
    const url = "https://jsonplaceholder.typicode.com/users"
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        Array.from(json).map(user => { getUserPosts(user.id).then(r => { user.posts = r }) });
        return json
    } catch (error) {
        console.error(error.message);
    }
}

async function getUserPosts(userId) {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json
    } catch (error) {
        console.error(error.message);
    }
}

function printUsers(users) {
    let mainUl = document.createElement("ul")
    users.forEach(user => {
        let userLi = document.createElement("li")
        userLi.innerHTML = user.name

        // ni idea de per que no va,
        // sembla un bug de l'interpretador de js
        console.log(user, user.posts)
        if (user.posts != undefined) {
            let userUl = document.createElement("ul")
            Array.from(user.post).forEach(post => {
                let postLi = document.createElement("li")
                postLi.innerHTML = post.title
                userUl.append(postLi)
            })
            mainUl.append(userUl)
        }

        mainUl.append(userLi)
    })
    document.body.append(mainUl)
}

async function start() {
    const users = await getUsers()
    console.log(users)
    printUsers(users)
}

start()
