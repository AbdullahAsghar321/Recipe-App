let result1 = document.querySelector('.result')
let searchbtn = document.querySelector(".search-button")
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


searchbtn.addEventListener("click", () => {
    let user_input = document.querySelector(".user-input").value;
    if (user_input.length == 0) {
        result1.innerHTML = `<h3>Type somthing</h3>`
    }
    else {

        fetch(url + user_input)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                let myMeal = data.meals[0]
                console.log(myMeal)
                console.log(myMeal.strMeal)
                console.log(myMeal.strArea)
                console.log(myMeal.strMealThumb)
                console.log(myMeal.strInstructions)

                let count = 1;
                let ingredients = [];

                for (let i in myMeal) {
                    let ingredient = "";
                    let measure = "";
                    if (i.startsWith("strIngredient") && myMeal[i]) {
                        ingredient = myMeal[i]
                        measure = myMeal[`strMeasure` + count];
                        count += 1;
                        ingredients.push(`${measure} ${ingredient}`)
                    }
                    console.log(ingredients)

                    result1.innerHTML = ` <img src=${myMeal.strMealThumb}>

     <div class="details">
     <h2>${myMeal.strMeal}</h2>
     <h4>${myMeal.strArea}</h4>
     </div>
     <div class="ingredient-con"></div>
     <div class="recipe">
     <button id = "hide-recipe">X</button>
     <pre id = "instruction">${myMeal.strInstructions}</pre>
     </div>
     <button class ="show-recipe">View Recipes</button>`;
                    let ingredientcon = document.querySelector(".ingredient-con");
                    let parent = document.createElement("ul")
                    let recipe = document.querySelector(".recipe");
                    let showrecipe = document.querySelector(".show-recipe");
                    let hiderecipe = document.querySelector("#hide-recipe");

                    ingredients.forEach((i) => {
                        let child = document.createElement("li");
                        child.innerHTML = i;
                        parent.appendChild(child)
                        ingredientcon.appendChild(parent);
                    });
                    hiderecipe.addEventListener("click", () => {
                        recipe.style.display = "none";
                    });
                    showrecipe.addEventListener("click", () => {
                        recipe.style.display = "block"
                    })
                }
            })
    }
})

