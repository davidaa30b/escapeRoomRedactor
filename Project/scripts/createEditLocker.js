window.addEventListener("load", function () {
  generateLocker();
});

function generateLocker() {
  const lockersContainer = document.getElementById("locker_form");

  lockersContainer.classList.add("info_section_game");
  lockersContainer.classList.add("data_contains");

  const logo = "";
  const type = "";
  const result = "";
  const attempts_number = "";
  const show_attempts = "";
  const points = "";
  const lock_regex = "";
  const force_order = "";
  const lockerResourseCount = "";

  //Creating locker

  lockersContainer.innerHTML = `<strong>Locker</strong> 
      <section>
      <label>Resources count : <input class="input_values" id="resource_count" type="number" value = "${lockerResourseCount}"></label> 
      <label>Resources :<hr/><section id="resources_locker"> </section></label>
      <label>Logo : <input  class="input_values" type="text" id="logo_lock" value="${logo}"> </label>
      <label>Type : <input class="input_values" id="type_lock"  type="text" value="${type}"> </label>
      <label>Attempts: <input class="input_values" id="number_attempts_lock" value="${attempts_number}" type="number"/> </label>
      <label>Show attempts: <input id="show_attempts_lock"  type="checkbox"${
        show_attempts === true ? "checked" : ""
      }/> </label>
      <label>Points: <input class="input_values" id="points_lock" value="${points}" type="number"/> </label>
      <label>Regex: <input class="input_values" id="regex_lock" value="${lock_regex}" type="text"/> </label>
      <label>Force order: <input  id="force_order_lock" ${
        force_order === true ? "checked" : ""
      } type="checkbox"/> </label>

      <label>Result : <input class="input_values" id="result_lock" value="${result}" type="text" /> </label>
      <label>Locker input files :<hr/> <section id="locker_input_files"></section></label>
      <button id="preview_button_lock">Preview lock </button>`;

  const resultInput = document.getElementById(`result_lock`);
  let resultLength = resultInput.value.length;

  const lockerInputFileSection = document.getElementById(`locker_input_files`);

  resultInput.addEventListener("input", function (event) {
    resultLength = parseInt(event.target.value.length);
    lockerInputFileSection.innerHTML = "";
    for (let j = 0; j < resultLength; j++) {
      const fileLabel = document.createElement("label");
      fileLabel.htmlFor = `image_input_file_${j}_lock`;
      fileLabel.textContent = `File url ${j + 1}:`;

      const fileInput = document.createElement("input");
      fileInput.type = "text";
      fileInput.id = `image_input_file_${j}_lock`;
      fileInput.value = "";
      fileInput.className = "input_values";

      lockerInputFileSection.append(fileLabel);
      lockerInputFileSection.append(fileInput);
    }
  });

  for (let j = 0; j < resultLength; j++) {
    const fileLabel = document.createElement("label");
    fileLabel.htmlFor = `image_input_file_${j}_lock`;
    fileLabel.textContent = `File url ${j + 1}:`;

    const fileInput = document.createElement("input");
    fileInput.type = "text";
    fileInput.id = `image_input_file_${j}_lock`;
    fileInput.value = "";

    fileInput.className = "input_values";

    lockerInputFileSection.append(fileLabel);
    lockerInputFileSection.append(fileInput);
  }
  const resourcesSection = this.document.getElementById(`resources_locker`);
  const resourcesCountInput = this.document.getElementById(`resource_count`);

  let resourcesCount = resourcesCountInput.value;

  resourcesCountInput.addEventListener("input", function (event) {
    resourcesCount = parseInt(event.target.value);
    resourcesSection.innerHTML = "";
    for (let j = 0; j < resourcesCount; j++) {
      const resource = "";

      const resourceInputLabel = document.createElement("label");
      resourceInputLabel.htmlFor = `resources_${j}_locker`;
      resourceInputLabel.textContent = `Resource ${j + 1}:`;

      const resourceInput = document.createElement("input");
      resourceInput.className = "input_values";
      resourceInput.type = "text";
      resourceInput.id = `resources_${j}_locker`;
      resourceInput.value = resource;
      resourcesSection.append(resourceInputLabel);
      resourcesSection.append(resourceInput);
    }
  });

  for (let j = 0; j < resourcesCount; j++) {
    const link = "";
    const resourceInputLabel = document.createElement("label");
    resourceInputLabel.htmlFor = `resources_${j}_locker`;
    resourceInputLabel.textContent = `Resource ${j + 1}:`;

    const resourceInput = document.createElement("input");
    resourceInput.className = "input_values";
    resourceInput.type = "text";
    resourceInput.id = `resources_${j}_locker`;
    resourceInput.value = link;
    resourcesSection.append(resourceInputLabel);
    resourcesSection.append(resourceInput);
  }

  let childWindow = null;

  const previewButtonLock = document.getElementById(`preview_button_lock`);

  previewButtonLock.addEventListener("click", function () {
    const attemptsNumberInput = document.getElementById(`number_attempts_lock`);
    const pointsLockInput = document.getElementById(`points_lock`);
    const logoInput = document.getElementById(`logo_lock`);
    const resultInput = document.getElementById(`result_lock`);
    let resultLength = resultInput.value.length;

    //window stuff :
    // Open a new window with a specified URL
    childWindow = window.open(
      "about:blank",
      "childWindow",
      "width=1196,height=896"
    );

    if (childWindow) {
      childWindow.document.write(`
          <html>
          <head>
              <title>Lock Preview</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f0f8ff;
                      color: #333;
                      margin: 0;
                      padding: 20px;
                  }
                  h2 {
                      color: #007bff;
                      text-align: center;
                  }
                  p {
                      font-size: 20px;
                      text-align: center;
                      margin: 10px 0;
                  }
                  .image-container {
                      display: flex;
                      flex-wrap: wrap;
                      justify-content: center;
                      margin-top: 20px;
                      padding: 10px;
                      border-radius: 10px;
                      background-color: #fff;
                  }
                  .image-container img {
                      width: 200px;
                      height: 200px;
                      margin: 10px;
                      border-radius: 10px;
                      border: 2px solid #ddd;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      transition: transform 0.2s ease-in-out;
                      cursor: move;
                  }
                  .image-container img:hover {
                      transform: scale(1.05);
                      border-color: #007bff;
                  }
                  button {
                      display: block;
                      margin: 20px auto;
                      padding: 10px 20px;
                      background-color: #007bff;
                      color: #fff;
                      border: none;
                      border-radius: 5px;
                      font-size: 16px;
                      cursor: pointer;
                  }
                  button:hover {
                      background-color: #0056b3;
                  }
              </style>
          </head>
          <body>
              <h2>Lock Preview</h2>
              <p>Logo </p>
              <div class="image-container" id="image-container-logo">
              <img src="${logoInput.value}"/>
              </div>
              <p>Combination is ${resultInput.value}</p>
              <div class="image-container" id="image-container-lock">
              </div>
              <p>Attemps: ${attemptsNumberInput.value},Points:${pointsLockInput.value}</p>
              <script>
                  function closeWindow() {
                      window.close(); // Close the child window
                  }
                  
                  function allowDrop(event) {
                      event.preventDefault();
                  }
  
                  function drag(event) {
                      event.dataTransfer.setData("text", event.target.id);
                  }
  
                  function drop(event) {
                      event.preventDefault();
                      var data = event.dataTransfer.getData("text");
                      var target = event.target;
                      if (target.tagName === "IMG") {
                          var draggedElement = document.getElementById(data);
                          var container = target.parentNode;
                          var draggedIndex = Array.prototype.indexOf.call(container.children, draggedElement);
                          var targetIndex = Array.prototype.indexOf.call(container.children, target);
                          if (draggedIndex < targetIndex) {
                              container.insertBefore(draggedElement, target.nextSibling);
                          } else {
                              container.insertBefore(draggedElement, target);
                          }
                      }
                  }
  
                  // Add event listeners to each image
                  function addDragDropListeners() {
                      const images = document.querySelectorAll('.image-container img');
                      images.forEach(img => {
                          img.addEventListener('dragstart', drag);
                          img.addEventListener('drop', drop);
                          img.addEventListener('dragover', allowDrop);
                      });
                  }
                  
                  addDragDropListeners();
              </script>
          </body>
          </html>
            `);
      const imagesSection = childWindow.document.getElementById(
        "image-container-lock"
      );

      imagesSection.innerHTML = "";
      for (let j = 0; j < resultLength; j++) {
        const fileImage = document.getElementById(`image_input_file_${j}_lock`);
        const imgElement = childWindow.document.createElement("img");
        imgElement.src = fileImage.value;
        imgElement.id = "img_" + j;
        imgElement.setAttribute("draggable", true);
        imagesSection.appendChild(imgElement);
      }
      childWindow.addDragDropListeners();
    }
  });

  const footer = document.getElementById("ending");

  const outputSection = document.createElement("section");
  outputSection.id = "output-action";
  outputSection.innerHTML = ``;
  footer.appendChild(outputSection);

  const errorSection = document.createElement("section");
  errorSection.id = "error-action";
  errorSection.innerHTML = "";
  footer.appendChild(errorSection);

  const sectionForDownloadOrSaveJsonButton = document.createElement("section");
  sectionForDownloadOrSaveJsonButton.innerHTML = `<button id="download-locker" class="button-download"> Download locker </button>
     <button id="save-locker" class="hidden button-action"> Save locker </button>
     <button id="update-locker" class="hidden button-action"> Update locker </button>
     `;
  footer.appendChild(sectionForDownloadOrSaveJsonButton);

  document
    .getElementById("download-locker")
    .addEventListener("click", (event) => {
      event.preventDefault();
    });

  if (locker === "empty") {
    document.getElementById("save-locker").classList.remove("hidden");
    document
      .getElementById("save-locker")
      .addEventListener("click", (event) => {
        saveLocker();
        event.preventDefault();
      });
  } else {
    document.getElementById("update-locker").classList.remove("hidden");
    document
      .getElementById("update-locker")
      .addEventListener("click", (event) => {
        event.preventDefault();
      });
  }

  const footerSection = document.createElement("section");
  footerSection.className = "footer-create-edit-json";
  footerSection.innerHTML = "<p>2024 . All rights reserved.</p>";
  footer.appendChild(footerSection);
}

function createLocker() {
  let newLocker;
  const logo = document.getElementById(`logo_lock`).value;
  const type = document.getElementById(`type_lock`).value;
  const result = document.getElementById(`result_lock`).value;
  const attempts_number = document.getElementById(`number_attempts_lock`).value;
  const show_attempts = document.getElementById(`show_attempts_lock`).checked;
  const points = document.getElementById(`points_lock`).value;
  const lock_regex = document.getElementById(`regex_lock`).value;
  const force_order = document.getElementById(`force_order_lock`).checked;

  let resources = [];
  let resLen = result.length;
  let comment = [];
  for (let i = 0; i < resLen; i++) {
    const fileImage = document.getElementById(`image_input_file_${i}_lock`);
    comment.push(fileImage.value);
    console.log(fileImage.value);
  }

  const lockerResources = this.document.getElementById(`resource_count`).value;
  console.log(lockerResources);
  for (let res = 0; res < lockerResources; res++) {
    const link = document.getElementById(`resources_${res}_locker`).value;
    resources.push({ link: link });
  }

  newLocker = {
    logo: logo,
    comment: comment,
    type: type,
    result: result,
    attempts_number: attempts_number,
    show_attempts: show_attempts,
    points: points,
    lock_regex: lock_regex,
    force_order: force_order,
    enable_after: "",
    resources: resources,
  };

  return newLocker;
}

async function saveLocker() {
  let newLocker = createLocker();
  const formData = new FormData();
  formData.append("regex", newLocker.lock_regex);
  formData.append("answer", newLocker.result);
  formData.append("urlsNum", newLocker.comment.length);
  formData.append("logo", newLocker.logo);
  formData.append("usrls", JSON.stringify(newLocker.comment));
  formData.append("type", newLocker.type);
  formData.append("attemptsNumber", newLocker.attempts_number);
  formData.append("showAttempts", newLocker.show_attempts);
  formData.append("points", newLocker.points);
  formData.append("forceOrder", newLocker.force_order);
  formData.append("resourcesNum", newLocker.resources.length);
  formData.append("resources", JSON.stringify(newLocker.resources));

  return fetch("../controllers/saveLockerController.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Locker saved successfully!");
        document.getElementById(
          "output-action"
        ).innerHTML = `<section class="success-message-action">The ${newLocker.type} was uploaded successfully.</section>`;
        return { success: true, message: "Locker saved successfully!" };
      } else {
        console.log("Error saving Locker:", data.errors);

        document.getElementById("error-action").innerHTML = `
        <section class="error-message-action">
        <section>Error occurred saving locker!</section>
        </section>`;
        return {
          success: false,
          message: "Error saving Locker: " + data.error,
        };
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return {
        success: false,
        message: "An error occurred while saving Locker.",
      };
    });
}
