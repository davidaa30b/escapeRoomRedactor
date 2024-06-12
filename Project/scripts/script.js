function setPasswordVisible() {
  document.addEventListener("DOMContentLoaded", function () {
    var showPasswordCheckbox = document.getElementById("showPassword");
    var passwordField = document.getElementById("password");

    if (showPasswordCheckbox && passwordField) {
      showPasswordCheckbox.addEventListener("change", function () {
        if (this.checked) {
          passwordField.type = "text";
        } else {
          passwordField.type = "password";
        }
      });
    }
  });
}

setPasswordVisible();
