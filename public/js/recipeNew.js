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

document.querySelector("form").addEventListener("submit", function (event) {
  let formIsValid = true;

  // Validate each field and add/remove the invalid class as needed
  function validateField(field, message) {
    if (
      field.value.trim() === "" ||
      (field.id === "title" && field.value.trim().length < 3)
    ) {
      markInvalid(field, message);
      formIsValid = false;
    } else {
      clearInvalid(field);
    }
  }

  // Mark field as invalid
  function markInvalid(field, message) {
    field.classList.add("invalid");
    let error = field.parentNode.querySelector(".invalid-message");
    if (!error) {
      error = document.createElement("div");
      error.className = "invalid-message";
      error.innerText = message;
      field.parentNode.appendChild(error);
    }
  }

  // Clear invalid state
  function clearInvalid(field) {
    field.classList.remove("invalid");
    const error = field.parentNode.querySelector(".invalid-message");
    if (error) {
      error.remove();
    }
  }

  // Select fields to validate
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const image = document.getElementById("img");
  const ingredients = document.querySelectorAll(
    "input[name='recipe[ingredients][]']"
  );
  const steps = document.querySelectorAll("textarea[name='recipe[steps][]']");

  // Validate each field
  validateField(title, "Title is required and must be at least 3 characters.");
  validateField(description, "Description is required.");
  validateField(image, "Image URL is required.");

  ingredients.forEach((ingredient, index) => {
    validateField(ingredient, `Ingredient ${index + 1} is required.`);
  });

  steps.forEach((step, index) => {
    validateField(step, `Step ${index + 1} is required.`);
  });

  // Prevent form submission if there are validation errors
  if (!formIsValid) {
    event.preventDefault();
  }
});
