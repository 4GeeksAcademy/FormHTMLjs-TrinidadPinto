document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("paymentForm");
  const formError = document.getElementById("formError");

  formError.style.display = "none";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelectorAll(".text-danger.error-msg").forEach(el => el.remove());
    document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));

    const showError = (input, message) => {
      const error = document.createElement("div");
      error.className = "text-danger error-msg mb-1";
      error.innerText = message;
      input.classList.add("is-invalid");
      input.parentNode.insertBefore(error, input);
    };

    const cardNumber = document.getElementById("name");
    const cvc = document.getElementById("inputPassword");
    const amountGroup = document.getElementById("amount-group");
    const firstName = document.getElementById("FirstName");
    const lastName = document.getElementById("LastName");
    const city = document.getElementById("City");
    const postalCode = document.getElementById("PostalCode");
    const stateSelect = document.querySelector("select");
    const radios = document.querySelectorAll('input[name="inlineRadioOptions"]');
    const cardOptions = document.getElementById("card-options");
    const comment = document.getElementById("comment");

    let isValid = true;

    document.querySelectorAll(".error-msg").forEach(e => e.remove());
    document.querySelectorAll(".is-invalid").forEach(e => e.classList.remove("is-invalid"));

    if (cardNumber.value.trim().length !== 16 || isNaN(cardNumber.value)) {
      showError(cardNumber, "El número de tarjeta debe tener 16 dígitos.");
      isValid = false;
    }

    if (cvc.value.trim().length < 3 || isNaN(cvc.value)) {
      showError(cvc, "El CVC debe tener al menos 3 números.");
      isValid = false;
    }

    if (amount.value.trim() === "" || isNaN(amount.value)) {
      const error = document.createElement("div");
      error.className = "text-danger error-msg mb-1";
      error.innerText = "El monto debe ser un número válido.";
      amountGroup.parentNode.insertBefore(error, amountGroup);
      amount.classList.add("is-invalid");
      isValid = false;
    }

    if (firstName.value.trim() === "") {
      showError(firstName, "El nombre es obligatorio.");
      isValid = false;
    }

    if (lastName.value.trim() === "") {
      showError(lastName, "El apellido es obligatorio.");
      isValid = false;
    }

    if (city.value.trim() === "") {
      showError(city, "La ciudad es obligatoria.");
      isValid = false;
    }

    if (stateSelect.value === "Pick a state") {
      showError(stateSelect, "Debes seleccionar un estado.");
      isValid = false;
    }

    if (postalCode.value.trim() === "" || isNaN(postalCode.value)) {
      showError(postalCode, "El código postal es obligatorio y debe ser numérico.");
      isValid = false;
    }

    const selectedRadio = Array.from(radios).some(radio => radio.checked);
    if (!selectedRadio) {
      showError(cardOptions, "Debes seleccionar un tipo de tarjeta.");
      isValid = false;
    }

    if (comment.value.trim().length === 0) {
      const error = document.createElement("div");
      error.className = "text-danger error-msg mb-1";
      error.innerText = "El campo de mensaje no puede estar vacío.";
      comment.parentNode.insertBefore(error, comment);
      comment.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      formError.style.display = "block";
    } else {
      
      formError.style.display = "none";
      alert("Formulario enviado correctamente ✅");
      form.reset();
    }
  });

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      
      const errorMsg = cardOptions.parentNode.querySelector(".error-msg");
      if (errorMsg) errorMsg.remove();

      cardOptions.classList.remove("is-invalid");
    });
  });
});
