function addIngredient() {
  const ingredientList = document.querySelector(".ingredientList");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "recipe[ingredients][]";
  input.placeholder = "ingredient...";
  ingredientList.appendChild(input);
  ingredientList.append(document.createElement("br"));
}

function addStep() {
  const stepsList = document.querySelector(".stepsList");
  const textarea = document.createElement("textarea");
  textarea.name = "recipe[steps][]";
  textarea.placeholder = "step...";
  stepsList.appendChild(textarea);
  stepsList.appendChild(document.createElement("br"));
}
