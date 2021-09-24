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
        <img class="avatar" src="${picture.large}" alt="employee image" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
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

// Search Employees
let inputSearch = document.querySelector('#search');
let employeeName = document.querySelectorAll('.card h2');

const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
  
    employeeName.forEach(boxData => {
      const text = boxData.textContent.toLowerCase();
      const box = boxData.parentElement.parentElement;
  
      if(text.includes(searchTerm)) {
        box.style.display = "";
      } else {
        box.style.display = "none";
      }
    });
  }
  inputSearch.addEventListener('keyup', handleSearch);
  

// const handleSearch = () => {
//     const searchTerm = inputSearch.value.toLowerCase();
    
//     employeeName.forEach(boxText => {
//       const text = boxText.textContent.toLowerCase();
//       const box = boxText.parentElement.parentElement;
      
//       if(text.includes(searchTerm)) {
//         box.style.display = "block";
//       } else {
//         box.style.display = "none";  
//       }
//     })
  
//   };
