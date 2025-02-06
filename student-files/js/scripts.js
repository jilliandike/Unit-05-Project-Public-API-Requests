let people = [];
const gallery = document.querySelector('.gallery');
const modalContent = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-container');
const closeBtn = document.querySelector('.modal-close-btn');


//Credit for function formatting in this file to TeamTreehouse lessons:
//Practice Fetch API and Practice DOM Manipulation: Modal

//FETCH DATA

//Fetches the picture and info for 12 random users
async function getPeople() {
    const response = await fetch(
      'https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob'
    );
    people = await response.json();
    console.log(people); //remove upon polish
    displayPeople(people.results);
    return people;
  }

//DISPLAY DATA GALLERY

// Uses the API response data to display random users along with some basic information for each
function displayPeople(people) {
    const galleryHTML = people
    .map(
        (person) => `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${person.picture.large} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="card-text">${person.email}</p>
                    <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                </div>
            </div>
        `
    )
    .join('');
    gallery.insertAdjacentHTML('beforeend', galleryHTML)
};

getPeople();

//DISPLAY MODAL

//Opens the modal when a person is clicked LOGS THE CLICKED PERSON
gallery.addEventListener('click', (event) => {
    const personCard = event.target.closest('.card');

    if(!personCard) return;

    const clickedPerson = personCard.querySelector("#name").textContent.split(' ');
    console.log(clickedPerson); //remove upon polish
    const person = people.results.find(
        (person) => person.name.first && person.name.last === clickedPerson
    );
    displayPersonModal(person);
});

//Adds the person's information to the modal NOT WORKING - ERROR IN THE INTERPOLATION
function displayPersonModal(person){
    let personModalHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${person.picture.thumbnail} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="modal-text">${person.email}</p>
                    <p class="modal-text cap">${person.location.city}</p>
                    <hr>
                    <p class="modal-text">${person.phone}</p>
                    <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                    <p class="modal-text">Birthday: ${person.dob.date}</p>
            </div>
        </div>
    `;
    // modalContainer.innerHTML = personModalHTML; 
    gallery.insertAdjacentHTML('beforeend', personModalHTML);
}