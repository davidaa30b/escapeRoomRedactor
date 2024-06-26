const expsSection = this.document.createElement("section");
expsSection.innerHTML = `<label>Enter number of extensions : <input class="data_count" id="extentions" type="number"> </label>`;
gameSection.appendChild(expsSection);
const extContainer = this.document.createElement("section");

const extCountInput = document.getElementById("extentions");

extCountInput.addEventListener("input", function (event) {
  extContainer.innerHTML = "";
  for (let i = 0; i < extCountInput.value; i++) {
    const extensionSection = document.createElement("section");
    extensionSection.id = `ext_section_game_${i}`;
    extensionSection.className = "info_section_game";
    extensionSection.innerHTML = `<strong> Ext information ${i + 1}</strong>
        <label> id: <input value="1" type='number'></label>
         <label> lockerld: <input value="${game.game.lockers}"></label>
         <label> open_url: <input id="open_url_text_${i}" type="text"></label>
         <label> back_url: <input type="text"></label>
         <label>image<input id="preview_button_ext_logo_${i}" class="input_values"  value="${
      game.game.logo.data
    }" type="text"></label>
        <label> title: <input type="text"></label>
        <button id="preview_button_ext_${i}">Preview ext </button>
        <section class="info_section_game">
        <label> params1</label>
        <label>open_url: <input type="text"></label>
        <label>app <input type="text"></label>
        <label>game_id <input id="gameid_${i}"type="text"></label>
        <label>username <input id="username_${i}" type="text"></label>
        <label>pass <input type="text"></label>
        <label>return_pass <input type="text"></label>
        <label>ui_lang <input type="text"></label>
        <label>game_lang <input type="text"></label>
        </section>
        <section class="info_section_game">
        <label> params2</label>
        <label>back_url: <input type="text"></label>
        <label>game_id <input type="text"></label>
        <label>username <input type="text"></label>
        <label>return_pass <input type="text"></label>
        <label>mystery <input type="text"></label>
        <label>asnwer <input id="returned_ans_${i}" type="text"></label>
        <section>`;
    extContainer.appendChild(extensionSection);

    const previewButtonExt = document.getElementById(`preview_button_ext_${i}`);

    previewButtonExt.addEventListener("click", function () {
      const logoInput = document.getElementById(`preview_button_ext_logo_${i}`);
      const open_url_txt = document.getElementById(`open_url_text_${i}`);

      if (open_url_txt.value) {
        childWindow = window.open(
          open_url_txt.value.trim(),
          "childWindow",
          "width=1196,height=896"
        );
      } else {
        childWindow = window.open(
          "about::blank",
          "childWindow",
          "width=1196,height=896"
        );
        if (childWindow) {
          childWindow.document.write(`
                <html>
                <head>
                    <title>Ext preview</title>
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
                    <h2>Ext preview</h2>
                    <p>Logo </p>
                    <div class="image-container" id="image-container-logo">
                    <img src="${logoInput.value}"/>
                    </div>
                    <label>Add answer:<input id="answ" type="text"></label>
                    <button onclick="sendDataBack()">Send ans Back</button>
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
      
                        function sendDataBack() {
                            const answer_input = document.getElementById('answ').value;
                            console.log(answer_input);
                            if (window.opener) {
                                window.opener.postMessage(answer_input, '*');
                                closeWindow();
                            }
                        }
      
                        addDragDropListeners();
                    </script>
                </body>
                </html>`);
        }

        window.addEventListener("message", function (event) {
          const received_data = event.data;
          document.getElementById(`returned_ans_${i}`).value = received_data;
        });
      }
    });
  }
});
