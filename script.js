async function getRecipe() {
  const dish = document.getElementById("dishInput").value.trim();
  const resultDiv = document.getElementById("recipeResult");

  if (!dish) {
    resultDiv.innerHTML = "<p>Please enter a dish name!</p>";
    return;
  }

  const query = `
    query {
      recipe(name: "${dish}") {
        name
        ingredients
        instructions
      }
    }
  `;

  try {
    const response = await fetch("https://indian-recipes-graphql.vercel.app/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const result = await response.json();
    const recipe = result.data.recipe;

    if (!recipe) {
      resultDiv.innerHTML = "<p>No recipe found. Try another dish.</p>";
      return;
    }

    let ingredientsList = "";
    recipe.ingredients.forEach(item => {
      ingredientsList += `<li>${item}</li>`;
    });

    resultDiv.innerHTML = `
      <h2>${recipe.name}</h2>
      <h3>Ingredients:</h3>
      <ul>${ingredientsList}</ul>
      <h3>Instructions:</h3>
      <p>${recipe.instructions}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>Error fetching recipe. Please try again later.</p>";
  }
}
