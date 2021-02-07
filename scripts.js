const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal-list");
const recipeBtn = document.querySelector(".recipe-btn");
const mealDetailsContent = document.getElementById("meal-details-content");

// get recipe list
const getMealList = () => {
  let searchInputValue = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputValue}`
    // i have used search query
  )
    .then((res) => res.json())
    .then((data) => {
      let mealHTML = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          mealHTML += `
                        <div class="meal-item" data-id="${meal.idMeal}">
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food" >
                            </div>

                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `;
        });
        mealList.classList.remove("notFound");
      } else {
        mealHTML = `<h1>Sorry, nothing found related to your search.</h1>`;
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = mealHTML;
    });
};

// get recipe of the meal
const getMealRecipe = (event) => {
  //   event.preventDefault();
  const checkRecipeBtn =
    event.target.parentElement.parentElement.parentElement.parentElement;
  //   console.log(checkRecipeBtn);

  if (checkRecipeBtn.classList.contains("recipe-btn")) {
    let mealItem = event.target.parentElement.parentElement;
    // console.log(mealItem);

    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => mealRecipeContainer(data.meals));
  }
};

// meal recipe container
const mealRecipeContainer = (meal) => {
  //   console.log(meal);
  meal = meal[0];
  //   console.log(meal);
  let mealRecipeHTML = `
        <img src="${meal.strMealThumb}" alt="">
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <h4 class = "recipe-category">Type: ${meal.strCategory}</h4>
        <div class = "recipe-instruct">
            <h3>Ingredients:</h3>
            <p><i class="fas fa-check-square"></i> ${meal.strIngredient1}</p>
            <p><i class="fas fa-check-square"></i> ${meal.strIngredient2}</p>
            <p><i class="fas fa-check-square"></i> ${meal.strIngredient3}</p>
            <p><i class="fas fa-check-square"></i> ${meal.strIngredient4}</p>
            <p><i class="fas fa-check-square"></i> ${meal.strIngredient5}</p>
            <p><i class="fas fa-check-square"></i> ${meal.strIngredient6}</p>
            <p><i class="fas fa-check-square"></i> ${meal.strIngredient7}</p>
            <p><i class="fas fa-check-square"></i> ${meal.strIngredient8}</p>
            <p><i class="fas fa-check-square"></i> ${meal.strIngredient9}</p>
            <p><i class="fas fa-check-square"></i> ${meal.strIngredient10}</p>
        </div>
    `;
  mealDetailsContent.innerHTML = mealRecipeHTML;
  mealDetailsContent.parentElement.classList.add("showRecipe");
};

// event listener
searchBtn.addEventListener("click", getMealList);
recipeBtn.addEventListener("click", getMealRecipe);
