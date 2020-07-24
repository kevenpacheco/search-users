let allUsers;
let filtrar;
let usersList;
let data;

window.addEventListener('load', () => {
    usersList = document.querySelector('.users');
    data = document.querySelector('.data');
    
    fetchUsers()
})

async function fetchUsers() {
    const res =  await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();

    allUsers = json.results.map(user => {
        const {name, dob, gender, picture} = user;

        return {
            name: name.first + ' ' + name.last,
            age: dob.age,
            gender,
            picture: picture.medium
        }
    });

    doFilter()
}

function doFilter() {
    let input = document.querySelector('input');
    let button = document.querySelector('button');

    input.addEventListener('keyup', () => {
        if (input.value !== "") {
            button.disabled = false
        }else {button.disabled = true}
        return button.value = input.value;
    })
        
    button.addEventListener('click', filterValue)
    
    function filterValue() {
        filtrar = allUsers.filter(person => {
            return (person.name).toLowerCase().indexOf((button.value).toLowerCase()) !== -1;
        })
        
        usersList.innerHTML = ' ';
        data.innerHTML = ' ';
        
        render()
    }
}

function render() {
    renderPeopleList();
    renderStatistics();
}

function renderPeopleList() {
    let usersHTML = `<h2>${filtrar.length} User(s) Found</h2>`;

    filtrar.forEach(user => {
        const {name, age, gender, picture} = user;

        let userHTML = `
        <div class="user">
            <img src='${picture}'>
            <p>${name}</p>
            <p>${age} anos</p>
        </div>
        `;

        usersHTML += userHTML;
    })

    usersList.innerHTML += usersHTML;
}

function renderStatistics() {
    let numberOfMen = filtrar.filter(user => user.gender === "male").length;
    let numberOfWoman = filtrar.filter(user => user.gender === "female").length;
    sumOfAges = filtrar.reduce((accumulator, current) => { return accumulator + current.age},0);
    let averangeAges = media()
    
    let statistic = `
    <p>Male: ${numberOfMen}</p>
    <p>Female: ${numberOfWoman}</p>
    <p>Sum of ages: ${sumOfAges}</p>
    <p>Average ages: ${averangeAges.toFixed(2)}</p>
    `;
    
    data.innerHTML += statistic;
}

let sumOfAges;

function media() {
    if(sumOfAges === 0 && filtrar.length === 0) {
        return 0;
    } else {
        return sumOfAges / filtrar.length;
    }
}