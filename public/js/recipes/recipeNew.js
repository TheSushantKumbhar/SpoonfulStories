function addIngredient() {
  const ingredientList = document.querySelector(".ingredientList");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "recipe[ingredients][]";
  input.placeholder = "ingredient...";
  input.required = true;
  ingredientList.appendChild(input);
  ingredientList.append(document.createElement("br"));
}

function addStep() {
  const stepsList = document.querySelector(".stepsList");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "recipe[steps][]";
  input.placeholder = "step...";
  input.required = true;
  stepsList.appendChild(input);
  stepsList.appendChild(document.createElement("br"));
}
