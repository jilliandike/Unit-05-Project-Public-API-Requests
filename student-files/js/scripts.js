let people = [];
const gallery = document.querySelector('.gallery');

//FETCH DATA

//Function formatting credit to https://teamtreehouse.com/workspaces/42270699#
async function getPeople() {
    const response = await fetch(
      'https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob'
    );
    people = await response.json();
    // console.log(people);
    displayPeople(people.results);
    return people;
  }

//DISPLAY DATA GALLERY

// Uses the API response data to display 12 random users, along with some basic information for each
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


