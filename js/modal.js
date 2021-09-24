let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=us`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');


// fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))
// display employees
function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" alt="employee-image">
            <div class="text-container">
                <h2 class="name employee-name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        `
    });
    gridContainer.innerHTML = employeeHTML;
}

// display modal
function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
    <div class="modal-index" data-index="${index}">
        <img class="avatar" src="${picture.large}" alt="employee image" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <span id="left-arrow"><</span><span id="right-arrow">></span>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }  
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

overlay.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal-index');
    const index = modal.getAttribute('data-index');
    const modalRight = document.querySelector('#right-arrow');
    const modalLeft = document.querySelector('#left-arrow');
    let newIndex;
    if (e.target === modalRight && index === '11') {
        displayModal(0);
    } if (e.target === modalRight) {
        newIndex = parseInt(index) + 1;
        displayModal(newIndex);
    }
    if (e.target === modalLeft && index === '0') {
        displayModal(11);
    } else if (e.target === modalLeft) {
        newIndex = parseInt(index) - 1;
        displayModal(newIndex);
    }
});
// Search Employees
// NB I got a lot of help on this from the slack Office Hours and
// https://www.w3schools.com/howto/howto_js_filter_lists.asp
// https://www.geeksforgeeks.org/search-bar-using-html-css-and-javascript/
let inputSearch = document.querySelector('#search');
let employeeName = document.getElementsByClassName('name');

const handleSearch = () => {
    let search = inputSearch.value.toLowerCase();
    
    for (i = 0; i < employeeName.length; i++) {
        let dataCap = employeeName[i].innerHTML.toLowerCase();
        if (!dataCap.includes(search)) {
            employeeName[i].parentNode.parentNode.style.display = "none";
        }
        else {
            employeeName[i].parentNode.parentNode.style.display = "flex";
        }       
    }

} 


