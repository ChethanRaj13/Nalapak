async function getRecipe() {
  const dish = document.getElementById("dishInput").value.trim();
  const resultDiv = document.getElementById("recipeResult");

  if (!dish) {
    resultDiv.innerHTML = "<p>Please enter a dish name!</p>";
    return;
  }

  const apiKey = "Your - api - key"; // 🔹 Replace with your Spoonacular key
  const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${dish}&number=3&apiKey=${apiKey}`;

  try {
    // Step 1: Search recipes
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.results || searchData.results.length === 0) {
      resultDiv.innerHTML = "<p>No recipe found. Try another dish.</p>";
      return;
    }

    let recipesHtml = "";

    // Step 2: Fetch details for each recipe
    for (let recipe of searchData.results) {
      const detailsUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      // Ingredients
      let ingredientsList = "";
      detailsData.extendedIngredients.forEach(item => {
        ingredientsList += `<li>${item.original}</li>`;
      });

      recipesHtml += `
        <div class="recipe-card">
          <h2>${detailsData.title}</h2>
          <h3>Ingredients:</h3>
          <ul>${ingredientsList}</ul>
          <h3>Instructions:</h3>
          <p>${detailsData.instructions || "Instructions not available."}</p>
          <hr>
        </div>
      `;
    }

    resultDiv.innerHTML = recipesHtml;

  } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching recipe. Please try again later.</p>";
    console.error("Error fetching recipe:", error);
  }
}
