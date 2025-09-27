async function getRecipe() {
  const dish = document.getElementById("dishInput").value.trim();
  const resultDiv = document.getElementById("recipeResult");

  if (!dish) {
    resultDiv.innerHTML = "<p>Please enter a dish name!</p>";
    return;
  }

  const apiKey = "Your-API-Key"; // 🔹 Replace with your Spoonacular key
  const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${dish}&number=3&addRecipeInformation=true&apiKey=${apiKey}`;

  try {
    // Single API call
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      resultDiv.innerHTML = "<p>No recipe found. Try another dish.</p>";
      return;
    }

    let recipesHtml = "";
    data.results.forEach(recipe => {
      // Ingredients
      let ingredientsList = "";
      recipe.extendedIngredients.forEach(item => {
        ingredientsList += `<li>${item.original}</li>`;
      });

      recipesHtml += `
        <div class="recipe-card">
          <h2>${recipe.title}</h2>
          <h3>Ingredients:</h3>
          <ul>${ingredientsList}</ul>
          <h3>Instructions:</h3>
          <p>${recipe.instructions || "Instructions not available."}</p>
          <hr>
        </div>
      `;
    });

    resultDiv.innerHTML = recipesHtml;

  } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching recipe. Please try again later.</p>";
    console.error("Error fetching recipe:", error);
  }
}
