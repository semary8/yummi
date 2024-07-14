"use strict";

const openIcon = document.getElementById("openIcon");
const closeIcon = document.getElementById("closeIcon");
const leftSide = document.getElementById("leftSide");
const secondNav = document.getElementById("secondNav");
const rowData = document.getElementById("rowData");
const mealGategory = document.getElementById("gategories");
const areaMeal = document.getElementById("areaMeal");
const mealIngredients = document.getElementById("mealIngredients");
const contactUs = document.getElementById("contactUs");
const SearchLink = document.getElementById("SearchLink");

// ===================== loading screen ========================
document.addEventListener("mouseover", function () {
  $(".loading").fadeOut(500);
});
// .......... open and close sidebar................//
openIcon.addEventListener("click", function () {
  openLeftSide();
});
closeIcon.addEventListener("click", function () {
  closLeftSide();
});

function openLeftSide() {
  leftSide.classList.remove("d-none");
  openIcon.classList.add("d-none");
  closeIcon.classList.remove("d-none");
}

function closLeftSide() {
  leftSide.classList.add("d-none");
  openIcon.classList.remove("d-none");
  closeIcon.classList.add("d-none");
}

// ------------------- search by name--------------------//
const searchNameInput = document.querySelector(".nameSearch");
if (searchNameInput) {
  searchNameInput.addEventListener("keyup", (event) =>
    searchByName(event.target.value)
  );
}

// ------------------- search by first letter--------------------//
const searchFletterInput = document.querySelector(".fletterSearch");
if (searchFletterInput) {
  searchFletterInput.addEventListener("keyup", (event) =>
    searchByFirstLetter(event.target.value)
  );
}

async function searchByName(term) {
  if (term.trim() === "") {
    displayMeals([]);
    return;
  }

  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    res = await res.json();
    if (res.meals) {
      displayMeals(res.meals);
    } else {
      displayMeals([]);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    displayMeals([]);
  }
}

async function searchByFirstLetter(letter) {
  if (letter.trim() === "" || letter.length > 1) {
    displayMeals([]);
    return;
  }

  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    res = await res.json();
    if (res.meals) {
      displayMeals(res.meals);
    } else {
      displayMeals([]);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    displayMeals([]);
  }
}

function displayMeals(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
    
      <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
            <h3>${arr[i].strMeal}</h3>
          </div>
        </div>
      </div>
    `;
  }

  if (rowData) {
    rowData.innerHTML = cartoona;
  } else {
    console.error("Element with id 'rowData' not found.");
  }
}

function getMealDetails(idMeal) {
  console.log(`Fetching details for meal id: ${idMeal}`);
}

// ----------------- display meal search  -------------------------------//
SearchLink.addEventListener("click", function () {
  displaySearch();
});

function displaySearch() {
  rowData.innerHTML = `
    <div class="form-floating mb-3 nameSearchDiv">
      <input
        type="text"
        class="form-control nameSearch"
        id="nameSearch"
        placeholder="Search by name"
      />
      <label for="floatingInput">Search By Name</label>
    </div>
    <div class="form-floating mb-3 fletterSearchDiv" >
      <input
        type="text"
        class="form-control fletterSearch"
        id="floatingInput"
        placeholder="Search by first letter"
        maxlength="1"
      />
      <label for="floatingInput">Search by first letter</label>
    </div>
  `;

  const searchNameInput = document.querySelector(".nameSearch");
  if (searchNameInput) {
    searchNameInput.addEventListener("keyup", (event) =>
      searchByName(event.target.value)
    );
  }

  const searchFletterInput = document.querySelector(".fletterSearch");
  if (searchFletterInput) {
    searchFletterInput.addEventListener("keyup", (event) =>
      searchByFirstLetter(event.target.value)
    );
  }
}

// ------------------ display categories -----------------------------//
mealGategory.addEventListener("click", function () {
  mealCategories();
  closLeftSide();
});

async function mealCategories() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const res = await response.json();
  console.log(res);
  if (res.categories) {
    displayCategories(res.categories);
  }
}

function displayCategories(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3">
        <img
          src="${arr[i].strCategoryThumb}"
          alt="meal"
          class="img-fluid rounded-3"
        />
        <h3 class="text-white">${arr[i].strCategory}</h3>
      </div>
    `;
  }

  document.getElementById("rowData").innerHTML = cartoona;
}

// ---------------------- display meal areas -----------------------------//
areaMeal.addEventListener("click", function () {
  mealAreas();
  closLeftSide();
});

async function mealAreas() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const res = await response.json();
  console.log(res);
  if (res.meals) {
    displayAreas(res.meals);
  }
}

function displayAreas(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 text-center">
        <i class="fa-solid fa-earth-africa fa-2x text-white"></i>
        <h3 class="text-white">${arr[i].strArea}</h3>
      </div>
    `;
  }

  document.getElementById("rowData").innerHTML = cartoona;
}

// ---------------------- display meal ingredients -----------------------------//
mealIngredients.addEventListener("click", function () {
  mealByIngredients();
  closLeftSide();
});

async function mealByIngredients() {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const res = await response.json();
  console.log(res);
  if (res.meals) {
    displayIngredients(res.meals.slice(0, 20));
  }
}

function displayIngredients(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-lg-3 text-center">
        <i class="fa-solid fa-drumstick-bite fa-2x text-white"></i>
        <h3 class="text-white">${arr[i].strIngredient}</h3>
        <p class="text-white">${arr[i].strDescription
          .split(" ")
          .slice(0, 20)
          .join(" ")}</p>
      </div>
    `;
  }

  document.getElementById("rowData").innerHTML = cartoona;
}

// ---------------------- contact us -----------------------------//
contactUs.addEventListener("click", function () {
  showContacts();
  closLeftSide();
});

function showContacts() {
  rowData.innerHTML = `
    <div class="col-lg-6 d-flex">
      <div class="form-floating mb-3 nameInputDiv">
        <input
          type="text"
          class="form-control"
          id="nameInput"
          placeholder="write your name"
          required
        />
        <label for="nameInput">Name</label>
        <p class="errorName text-danger bg-danger-subtle rounded-3 mt-1 d-none">Special characters and numbers not allowed</p>
      </div>
      <div class="form-floating mb-3 emailInputDiv">
        <input
          type="email"
          class="form-control"
          id="emailInput"
          placeholder="write your email"
          required
        />
        <label for="emailInput">Email</label>
        <p class="errorEmail text-danger bg-danger-subtle rounded-3 mt-1 d-none">Email not valid *example@yyy.zzz</p>
      </div>
    </div>
    <div class="col-lg-6 d-flex">
      <div class="form-floating mb-3 phoneInputDiv">
        <input
          type="tel"
          class="form-control"
          id="phoneInput"
          placeholder="write your phone"
          required
        />
        <label for="phoneInput">Phone</label>
        <p class="errorPhone text-danger bg-danger-subtle rounded-3 mt-1 d-none">Enter valid Phone Number</p>
      </div>
      <div class="form-floating mb-3 ageInputDiv">
        <input
          type="number"
          class="form-control"
          id="ageInput"
          placeholder="write your age"
          required
        />
        <label for="ageInput">Age</label>
        <p class="errorAge text-danger bg-danger-subtle rounded-3 mt-1 d-none">Enter valid age</p>
      </div>
    </div>
    <div class="col-lg-6 d-flex">
      <div class="form-floating mb-3 passwordInputDiv">
        <input
          type="password"
          class="form-control"
          id="passwordInput"
          placeholder="write your password"
          required
        />
        <label for="passwordInput">Password</label>
        <p class="errorPassword text-danger bg-danger-subtle rounded-3 mt-1 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
      </div>
      <div class="form-floating mb-3 retypepasswordInputDiv">
        <input
          type="password"
          class="form-control"
          id="repasswordInput"
          placeholder="write re-password"
          required
        />
        <label for="repasswordInput">Retype Password</label>
        <p class="errorRePassword text-danger bg-danger-subtle rounded-3 mt-1 d-none">Passwords do not match</p>
      </div>
      <button type="button" class="btn btn-outline-danger" disabled>
        Submit
      </button>
    </div>
  `;

  const nameInput = document.querySelector("#nameInput");
  if (nameInput) {
    nameInput.addEventListener("keyup", validateUserName);
  }

  const emailInput = document.querySelector("#emailInput");
  if (emailInput) {
    emailInput.addEventListener("keyup", validateEmail);
  }

  const phoneInput = document.querySelector("#phoneInput");
  if (phoneInput) {
    phoneInput.addEventListener("keyup", validatePhone);
  }

  const ageInput = document.querySelector("#ageInput");
  if (ageInput) {
    ageInput.addEventListener("keyup", validateAge);
  }

  const passwordInput = document.querySelector("#passwordInput");
  if (passwordInput) {
    passwordInput.addEventListener("keyup", validatePassword);
  }

  const repasswordInput = document.querySelector("#repasswordInput");
  if (repasswordInput) {
    repasswordInput.addEventListener("keyup", validateRePassword);
  }
}

function validateUserName() {
  const nameInput = document.querySelector("#nameInput");
  const errorMsg = document.querySelector(".errorName");
  const regex = /^[A-Z][a-z]{2,15}$/;

  if (regex.test(nameInput.value.trim())) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    if (errorMsg) {
      errorMsg.classList.add("d-none");
    }
  } else {
    nameInput.classList.remove("is-valid");
    nameInput.classList.add("is-invalid");
    if (errorMsg) {
      errorMsg.classList.remove("d-none");
    }
  }
  if (nameInput.value == "") {
    errorMsg.classList.add("d-none");
    nameInput.classList.remove("is-invalid");
  }
}

function validateEmail() {
  const emailInput = document.querySelector("#emailInput");
  const errorMsg = document.querySelector(".errorEmail");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regex.test(emailInput.value.trim())) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    if (errorMsg) {
      errorMsg.classList.add("d-none");
    }
  } else {
    emailInput.classList.remove("is-valid");
    emailInput.classList.add("is-invalid");
    if (errorMsg) {
      errorMsg.classList.remove("d-none");
    }
  }
  if (emailInput.value == "") {
    errorMsg.classList.add("d-none");
    emailInput.classList.remove("is-invalid");
  }
}

function validatePhone() {
  const phoneInput = document.querySelector("#phoneInput");
  const errorMsg = document.querySelector(".errorPhone");
  const regex = /^\d{11}$/;

  if (regex.test(phoneInput.value.trim())) {
    phoneInput.classList.add("is-valid");
    phoneInput.classList.remove("is-invalid");
    if (errorMsg) {
      errorMsg.classList.add("d-none");
    }
  } else {
    phoneInput.classList.remove("is-valid");
    phoneInput.classList.add("is-invalid");
    if (errorMsg) {
      errorMsg.classList.remove("d-none");
    }
  }
  if (phoneInput.value == "") {
    errorMsg.classList.add("d-none");
    phoneInput.classList.remove("is-invalid");
  }
}

function validateAge() {
  const ageInput = document.querySelector("#ageInput");
  const errorMsg = document.querySelector(".errorAge");
  const age = parseInt(ageInput.value.trim());

  if (age >= 18 && age <= 100) {
    ageInput.classList.add("is-valid");
    ageInput.classList.remove("is-invalid");
    if (errorMsg) {
      errorMsg.classList.add("d-none");
    }
  } else {
    ageInput.classList.remove("is-valid");
    ageInput.classList.add("is-invalid");
    if (errorMsg) {
      errorMsg.classList.remove("d-none");
    }
  }
  if (ageInput.value == "") {
    errorMsg.classList.add("d-none");
    ageInput.classList.remove("is-invalid");
  }
}

function validatePassword() {
  const passwordInput = document.querySelector("#passwordInput");
  const errorMsg = document.querySelector(".errorPassword");
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regex.test(passwordInput.value.trim())) {
    passwordInput.classList.add("is-valid");
    passwordInput.classList.remove("is-invalid");
    if (errorMsg) {
      errorMsg.classList.add("d-none");
    }
  } else {
    passwordInput.classList.remove("is-valid");
    passwordInput.classList.add("is-invalid");
    if (errorMsg) {
      errorMsg.classList.remove("d-none");
    }
  }
  if (passwordInput.value == "") {
    errorMsg.classList.add("d-none");
    passwordInput.classList.remove("is-invalid");
  }
}

function validateRePassword() {
  const passwordInput = document.querySelector("#passwordInput");
  const repasswordInput = document.querySelector("#repasswordInput");
  const errorMsg = document.querySelector(".errorRePassword");

  if (
    passwordInput.value === repasswordInput.value &&
    repasswordInput.value.trim() !== ""
  ) {
    repasswordInput.classList.add("is-valid");
    repasswordInput.classList.remove("is-invalid");
    if (errorMsg) {
      errorMsg.classList.add("d-none");
    }
  } else {
    repasswordInput.classList.remove("is-valid");
    repasswordInput.classList.add("is-invalid");
    if (errorMsg) {
      errorMsg.classList.remove("d-none");
    }
  }
  if (repasswordInput.value == "") {
    errorMsg.classList.add("d-none");
    repasswordInput.classList.remove("is-invalid");
  }
}
