let game;
if (gameContent === "empty") {
  game = {
    game: {
      game_id: 1,
      modes: "",
      name: "",
      status: "",
      default_language: "",
      logo: {
        internal: false,
        data: "",
        size: "",
        url: "",
      },
      category: "",
      access_key: "",
      pauses_number: "",
      group_size: "",
      gamers_age: "",
      setup_game: {
        lockers: [],
        story: {
          text: "",
          video: "",
          resources: [],
          hints: [],
        },
        video: {
          "-src": "",
          "#text": "",
        },
        game_prepare_instructions: "",
        game_prepare_instructions_video: "",
        game_resources: "",
        teacher_tool: {
          timer: "",
          hints_number: "",
          music: false,
          start_timer: {
            "-start_timer": "",
            "#text": "",
          },
        },
        reflection_questions: {
          ol: {
            li: [],
          },
        },
        extra_requirements: "",
      },
      extensions: [],
    },
  };
} else {
  game = gameContent;
}

function createJsonFile(
  lockerCount,
  lockerResources,
  refQuesCount,
  extensionsCount
) {
  const gameId = 1;
  const modes = document.getElementById("modes").value;
  const name = document.getElementById("game_name").value;
  const status = document.getElementById("game_status").value;
  const default_language = document.getElementById("game_def_lan").value;

  const logo_internal = document.getElementById("logo_internal").checked;
  const logo_data = document.getElementById("logo_data").value;
  const logo_size = document.getElementById("logo_size").value;
  const logo_url = document.getElementById("logo_url").value;
  const category = document.getElementById("game_category").value;
  const access_key = document.getElementById("game_access_key").value;
  const pauses_number = document.getElementById("game_pauses_number").value;
  const group_size = document.getElementById("game_group_size").value;
  const gamers_age = document.getElementById("game_gamers_age").value;

  let logo = {
    internal: logo_internal,
    data: logo_data,
    size: logo_size,
    url: logo_url,
  };

  let lockers = [];

  for (let lock = 0; lock < lockerCount; lock++) {
    const id = lock + 1;
    const logo = document.getElementById(`logo_lock_${lock}`).value;
    const type = document.getElementById(`type_lock_${lock}`).value;
    const result = document.getElementById(`result_lock_${lock}`).value;
    const attempts_number = document.getElementById(
      `number_attempts_lock_${lock}`
    ).value;
    const show_attempts = document.getElementById(
      `show_attempts_lock_${lock}`
    ).checked;
    const points = document.getElementById(`points_lock_${lock}`).value;
    const lock_regex = document.getElementById(`regex_lock_${lock}`).value;
    const force_order = document.getElementById(
      `force_order_lock_${lock}`
    ).checked;
    const enable_after = document.getElementById(
      `enable_after_lock_${lock}`
    ).value;

    let resources = [];
    let resLen = result.length;
    let comment = "";
    for (let i = 0; i < resLen; i++) {
      const fileImage = document.getElementById(
        `image_input_file_${i}_lock_${lock}`
      );
      comment += fileImage.value;
      comment += " ";
    }

    for (let res = 0; res < lockerResources[lock]; res++) {
      const link = document.getElementById(
        `resources_${res}_locker_${lock}`
      ).value;
      resources.push({ link: link });
    }

    lockers.push({
      id: id,
      logo: logo,
      comment: comment,
      type: type,
      result: result,
      attempts_number: attempts_number,
      show_attempts: show_attempts,
      points: points,
      lock_regex: lock_regex,
      force_order: force_order,
      enable_after: enable_after,
      resources: resources,
    });
  }

  const story_text = document.getElementById("story_text").value;
  const story_video = document.getElementById("story_video").value;
  let story_resources = [];
  let story_hints = [];
  for (let lock = 0; lock < lockerCount; lock++) {
    const id_story = lock + 1;
    const filename_internal_story = document.getElementById(
      `story${lock}-resource-filename-internal`
    ).checked;
    const filename_data_story = document.getElementById(
      `story${lock}-resource-filename-data`
    ).value;
    const filename_size_story = document.getElementById(
      `story${lock}-resource-filename-size`
    ).value;
    const filename_url_story = document.getElementById(
      `story${lock}-resource-filename-url`
    ).value;
    const fileext_story = document.getElementById(`story${lock}-fileext`).value;
    const title_story = document.getElementById(`story${lock}-title`).value;
    const text_story = document.getElementById(`story${lock}-text`).value;
    const ext_story = document.getElementById(`story${lock}-ext`).value;
    story_resources.push({
      id: id_story,
      filename: {
        internal: filename_internal_story,
        data: filename_data_story,
        size: filename_size_story,
        url: filename_url_story,
      },
      fileext: fileext_story,
      title: title_story,
      text: text_story,
      ext: ext_story,
    });

    const id_hint = lock + 1;
    const filename_hint = document.getElementById(`hint${lock}-filename`).value;
    const fileext_hint = document.getElementById(`hint${lock}-fileext`).value;
    const title_hint = document.getElementById(`hint${lock}-title`).value;
    const text_hint = document.getElementById(`hint${lock}-text`).value;

    story_hints.push({
      id: id_hint,
      filename: filename_hint,
      fileext: fileext_hint,
      title: title_hint,
      text: text_hint,
    });
  }

  let story = {
    text: story_text,
    video: story_video,
    resources: story_resources,
    hints: story_hints,
  };

  const video_src = document.getElementById(`video-src`).value;
  const video_text = document.getElementById(`video-text`).value;

  let video = {
    "-src": video_src,
    "#text": video_text,
  };

  const game_prepare_instructions = document.getElementById(
    `game-prepare-instructions`
  ).value;

  const gameInputPrepareInstructionsVideo = document.getElementById(
    `game-prepare-instructions-video`
  );

  const game_prepare_instructions_video =
    gameInputPrepareInstructionsVideo.files.length > 0
      ? gameInputPrepareInstructionsVideo.files[0].name
      : game.game.setup_game.game_prepare_instructions_video;

  const gameInputResources = document.getElementById(`game-resources`);

  const game_resources =
    gameInputResources.files.length > 0
      ? gameInputResources.files[0].name
      : game.game.setup_game.game_resources;

  const teacher_timer = document.getElementById(`timer`).value;
  const teacher_hints_number = story_hints.length;
  const teacher_music = document.getElementById(`music`).checked;
  let teacher_tool = {
    timer: teacher_timer,
    hints_number: teacher_hints_number,
    music: teacher_music,
    start_timer: {
      "-start_timer": document.getElementById(`start-timer`).value,
      "#text": document.getElementById(`timer-text`).value,
    },
  };

  let ref_ques_arr = [];
  for (let refQ = 0; refQ < refQuesCount; refQ++) {
    ref_ques_arr.push(document.getElementById(`ref_ques_${refQ}`).value);
  }

  let reflection_questions = {
    ol: {
      li: ref_ques_arr,
    },
  };

  let extensionsArr = [];
  for (let i = 0; i < extensionsCount; i++) {
    const lockerld = this.document.getElementById(`select_lock_ext_${i}`).value;
    const openUrlOutput = this.document.getElementById(
      `open-url-output-${i}`
    ).value;
    const backUrlOutput = this.document.getElementById(
      `back-url-output-${i}`
    ).value;
    const icon = this.document.getElementById(`ext_logo_${i}`).value;
    const title = this.document.getElementById(`title_ext_${i}`).value;
    const gameName = this.document.getElementById(`game_name`).value;
    const openUrlInput = this.document.getElementById(
      `open_url_text_${i}`
    ).value;
    const backUrlInput = this.document.getElementById(
      `back_url_text_${i}`
    ).value;

    const answerInput = document.getElementById(`returned_ans_${i}`).value;

    extensionsArr.push({
      id: i,
      lockerId: lockerld,
      open_url: openUrlOutput,
      back_url: backUrlOutput,
      icon: icon,
      title: title,
      params1: {
        open_url: openUrlInput,
        app: gameName,
        gameId: "100XX",
        username: username,
        pass: "123",
        return_pass: "456",
        mistery: story_resources[i].title,
        ui_lang: default_language,
        game_lang: default_language,
        ui_theme: "dark",
      },
      params2: {
        back_url: backUrlInput,
        gameId: gameName,
        username: username,
        return_pass: "456",
        mistery: story_resources[i].title,
        answer: answerInput,
      },
    });
  }

  let gameNew = {
    game: {
      game_id: gameId,
      modes: modes,
      name: name,
      status: status,
      default_language: default_language,
      logo: logo,
      category: category,
      access_key: access_key,
      pauses_number: pauses_number,
      group_size: group_size,
      gamers_age: gamers_age,
      setup_game: {
        lockers: lockers,
        story: story,
        video: video,
        game_prepare_instructions: game_prepare_instructions,
        game_prepare_instructions_video: game_prepare_instructions_video,
        game_resources: game_resources,
        teacher_tool: teacher_tool,
        reflection_questions: reflection_questions,
        extra_requirements: "",
      },
      extensions: extensionsArr,
    },
  };

  return gameNew;
}

function downloadJsonFile(
  lockerCount,
  lockerResources,
  refQuesCount,
  extensionsCount,
  documentAction
) {
  let gameNew = createJsonFile(
    lockerCount,
    lockerResources,
    refQuesCount,
    extensionsCount
  );
  let jsonString = "";

  if (documentAction === "text") {
    jsonString = document
      .getElementById("text-area-editor")
      .value.replace(/\n/g, "");
  } else {
    gameNew = createJsonFile(
      lockerCount,
      lockerResources,
      refQuesCount,
      extensionsCount
    );
    jsonString = JSON.stringify(gameNew);
  }
  const blob = new Blob([jsonString], { type: "application/json" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "new_game.json";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

async function saveGameJson(
  lockerCount,
  lockerResources,
  refQuesCount,
  extensionsCount,
  documentAction
) {
  let gameNew;
  let jsonString = "";
  if (documentAction === "text") {
    jsonString = document
      .getElementById("text-area-editor")
      .value.replace(/\n/g, "");
    gameNew = JSON.parse(jsonString);
  } else {
    gameNew = createJsonFile(
      lockerCount,
      lockerResources,
      refQuesCount,
      extensionsCount
    );
    jsonString = JSON.stringify(gameNew);
  }

  const formData = new FormData();
  formData.append("name", gameNew.game.name);
  formData.append("content", jsonString);
  formData.append("status", gameNew.game.status);
  formData.append("category", gameNew.game.category);

  return fetch("../controllers/saveGameJsonController.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("JSON saved successfully!");
        document.getElementById(
          "output-action"
        ).innerHTML = `<section class="success-message-action">The ${game.game.name} was uploaded successfully.</section>`;
        return { success: true, message: "JSON saved successfully!" };
      } else {
        console.log("Error saving JSON:", data.errors);

        document.getElementById("error-action").innerHTML = `
        <section class="error-message-action">
        <section>${data.errors.nameError}</section>
        <section>${data.errors.statusError}</section>
        <section>${data.errors.filePathError}</section>
        <section>${data.errors.categoryError}</section>
        </section>`;
        return {
          success: false,
          message: "Error saving JSON: " + data.error,
        };
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return {
        success: false,
        message: "An error occurred while saving JSON.",
      };
    });
}
async function updateGameJson(
  lockerCount,
  lockerResources,
  refQuesCount,
  extensionsCount,
  documentAction
) {
  let gameNew;
  let jsonString = "";
  if (documentAction === "text") {
    jsonString = document
      .getElementById("text-area-editor")
      .value.replace(/\n/g, "");
    gameNew = JSON.parse(jsonString);
  } else {
    gameNew = createJsonFile(
      lockerCount,
      lockerResources,
      refQuesCount,
      extensionsCount
    );
    jsonString = JSON.stringify(gameNew);
  }

  const formData = new FormData();
  formData.append("id", gameId);
  formData.append("name", gameNew.game.name);
  formData.append("content", jsonString);
  formData.append("status", gameNew.game.status);
  formData.append("category", gameNew.game.category);

  return fetch("../controllers/updateGameJsonController.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("JSON updated successfully!");
        document.getElementById(
          "output-action"
        ).innerHTML = `<section class="success-message-action">The ${game.game.name} was updated successfully.</section>`;

        return { success: true, message: "JSON saved successfully!" };
      } else {
        console.log("Error updated JSON:", data.errors);
        document.getElementById("error-action").innerHTML = `
        <section class="error-message-action">
        <section>${data.errors.nameError}</section>
        <section>${data.errors.statusError}</section>
        <section>${data.errors.filePathError}</section>
        <section>${data.errors.categoryError}</section></section>`;
        return {
          success: false,
          message: "Error updated JSON: " + data.error,
        };
      }
    })
    .catch((error) => {
      console.log("Error:", error);
      return {
        success: false,
        message: "An error occurred while updated JSON.",
      };
    });
}

let documentAction = "form";
function goBackForm() {
  documentAction = "form";
  document.getElementById("game_json_form").classList.remove("hidden");
  document.getElementById("note-pad-edit-button").classList.remove("hidden");
  document.getElementById("text-area-json").innerHTML = "";
}

//open in form : INITIAL DATA//////////////////////////////////////////////////////
let oldLockerCount = game.game.setup_game.lockers.length;
let oldHintsCount = game.game.setup_game.story.hints.length;
let oldLockerResources = game.game.setup_game.lockers.map(
  (l) => l.resources.length
);
let oldReflectionQuestionsCount =
  game.game.setup_game.reflection_questions.ol.li.length;
let oldExtensionsCount = game.game.extensions.length;
//////////////////////////////////////////////////////////////////////////////////
window.addEventListener("load", function () {
  generateForm(
    oldLockerCount,
    oldLockerResources,
    oldHintsCount,
    oldReflectionQuestionsCount,
    oldExtensionsCount
  );
});

function generateForm(
  lockerCount,
  lockerResources,
  hintsCount,
  refQuesCount,
  extensionsCount
) {
  const gameSection = this.document.getElementById("game_json_form");
  const sectionGeneralForGame = this.document.createElement("section");
  sectionGeneralForGame.id = "general_section_game";
  sectionGeneralForGame.className = "info_section_game";
  sectionGeneralForGame.innerHTML = `<strong> Game information </strong>
  <label>Modes: <select id="modes">
  <option value="both">Both</option>
  </select></label>
  <label>Name: <input id="game_name" class="input_values"  value="${
    game.game.name
  }" type="text"></label>
  <label>Status: <select id="game_status">
  <option value="public">Public</option>
  <option value="private">Private</option>
  </select></label>
  <label>Default language: <select id="game_def_lan">
  <option value="bg" ${
    game.game.default_language === "bg" ? "selected" : ""
  }>Bulgarian</option>
  <option value="en" ${
    game.game.default_language === "en" ? "selected" : ""
  }>English</option>
  </select></label>

  <label>Category: <select id="game_category">
  <option value="Social">Social</option>
  </select></label>
  <label>Access key: <input id="game_access_key" class="input_values"  value="${
    game.game.access_key
  }" type="text" ></label>
  <label>Pauses number: <input id="game_pauses_number" class="input_values"  value="${
    game.game.pauses_number
  }" type="text" ></label>
  <label>Group size: <input id="game_group_size" class="input_values"  value="${
    game.game.group_size
  }" type="text"  ></label>
  <label>Gamers age: <input id="game_gamers_age" class="input_values"  value="${
    game.game.gamers_age
  }"  type="text" ></label>
  <div class="logo-section">
  <label>Logo: </label>
  <label>Internal<input id="logo_internal" class="input_values"  type="checkbox" ${
    game.game.logo.internal === true ? "checked" : ""
  }></label>
  <label>Data<input id="logo_data" class="input_values"  value="${
    game.game.logo.data
  }" type="text"></label>
  <label>Size<input id="logo_size" class="input_values"  value="${
    game.game.logo.size
  }" type="text"></label>
  <label>Url<input id="logo_url" class="input_values"  value="${
    game.game.logo.url
  }" type="text"></label>
  </div>`;
  gameSection.appendChild(sectionGeneralForGame);

  const sectionInputLocksCount = this.document.createElement("section");
  sectionInputLocksCount.innerHTML = `<label>Enter number of locks for story resources : <input class="data_count" id="locks_count" type="number" value="${lockerCount}"> </label>`;
  gameSection.appendChild(sectionInputLocksCount);

  const sectionStoryForGame = this.document.createElement("section");
  sectionStoryForGame.id = "story_section_game";
  sectionStoryForGame.classList.add("info_section_game");
  sectionStoryForGame.innerHTML = `
  <section id="story_main_section" class = "info_section_game">
  <strong> Story </strong> 
  <label> Text: <input class="input_values" id="story_text" value="${game.game.setup_game.story.text}" type="text"> </label>
  <label> Video:  <input class="input_values" id="story_video" value="${game.game.setup_game.story.video}" type="text"> </label>
  </section>
  <label> Resources generated ${lockerCount}: <section id="story_resources" class="data_contains"> </section> </label>`;
  gameSection.appendChild(sectionStoryForGame);

  const sectionStoryResources = document.getElementById("story_resources");

  const lockersContainer = this.document.createElement("section");
  lockersContainer.id = "lockers_container";
  lockersContainer.innerHTML = `<strong>Lockers generated are ${lockerCount}</strong>`;
  lockersContainer.classList.add("info_section_game");
  lockersContainer.classList.add("data_contains");
  const options = [];
  for (let i = 0; i < lockerCount; i++) {
    const internal =
      i < oldLockerCount
        ? game.game.setup_game.story.resources[i].filename.internal
        : "";
    const data =
      i < oldLockerCount
        ? game.game.setup_game.story.resources[i].filename.data
        : "";
    const size =
      i < oldLockerCount
        ? game.game.setup_game.story.resources[i].filename.size
        : "";
    const url =
      i < oldLockerCount
        ? game.game.setup_game.story.resources[i].filename.url
        : "";
    const fileext =
      i < oldLockerCount ? game.game.setup_game.story.resources[i].fileext : "";
    const title =
      i < oldLockerCount ? game.game.setup_game.story.resources[i].title : "";
    const text =
      i < oldLockerCount ? game.game.setup_game.story.resources[i].text : "";
    const ext =
      i < oldLockerCount ? game.game.setup_game.story.resources[i].ext : "";

    const sectionStoryResource = document.createElement("section");
    sectionStoryResource.id = `story_resource_${i}`;
    sectionStoryResource.classList.add("locker_section");
    sectionStoryResource.innerHTML = `<strong> Resource for locker ${
      i + 1
    } </strong>
    <div class="logo-section">
    <label>Filename: </label>
    <label>Internal: <input id="story${i}-resource-filename-internal" ${
      internal === true ? "checked" : ""
    }  type="checkbox"></label>
    <label>Data: <input id="story${i}-resource-filename-data" value="${data}" type="text"></label>
    <label>Size: <input id="story${i}-resource-filename-size" value="${size}" type="text"></label>
    <label>Url: <input id="story${i}-resource-filename-url" value="${url}" type="text"></label>
    <div>
    <label>Fileext:<input id="story${i}-fileext" value="${fileext}" type="text"></label>
    <label>Title:<input id="story${i}-title" value="${title}" type="text"></label>
    <label>Text:<input id="story${i}-text" value="${text}" type="text"></label>
    <label>Ext:<input id="story${i}-ext" value="${ext}" type="text"></label>
    <button id="preview_button_story_resource_${i}">Preview story resource </button>`;

    const logo = i < oldLockerCount ? game.game.setup_game.lockers[i].logo : "";
    const type = i < oldLockerCount ? game.game.setup_game.lockers[i].type : "";
    const result =
      i < oldLockerCount ? game.game.setup_game.lockers[i].result : "";
    const attempts_number =
      i < oldLockerCount ? game.game.setup_game.lockers[i].attempts_number : "";
    const show_attempts =
      i < oldLockerCount ? game.game.setup_game.lockers[i].show_attempts : "";
    const points =
      i < oldLockerCount ? game.game.setup_game.lockers[i].points : "";
    const lock_regex =
      i < oldLockerCount ? game.game.setup_game.lockers[i].lock_regex : "";
    const force_order =
      i < oldLockerCount ? game.game.setup_game.lockers[i].force_order : "";
    const lockerResourseCount = i < oldLockerCount ? lockerResources[i] : "";

    const sectionLocker = document.createElement("section");
    sectionLocker.id = `locker_info_${i}`;
    sectionLocker.classList.add("locker_section");
    sectionLocker.innerHTML = `<strong> Locker ${i + 1} </strong> 
    <section>
    <label>Resources count : <input class="input_values" id="resource_count_${i}" type="number" value = "${lockerResourseCount}"></label> 
    <label>Resources :<hr/><section id="resources_locker_${i}"> </section></label>
    <label>Logo : <input  class="input_values" type="text" id="logo_lock_${i}" value="${logo}"> </label>
    <label>Type : <select id="type_lock_${i}">
    <option value="Word Lock">Word Lock</option> 
    <option value="Directions Lock">Directions Lock</option> 
    </select> </label>
    <label>Attempts: <input class="input_values" id="number_attempts_lock_${i}" value="${attempts_number}" type="number"/> </label>
    <label>Show attempts: <input id="show_attempts_lock_${i}"  type="checkbox"${
      show_attempts === true ? "checked" : ""
    }/> </label>
    <label>Points: <input class="input_values" id="points_lock_${i}" value="${points}" type="number"/> </label>
    <label>Regex: <input class="input_values" id="regex_lock_${i}" value="${lock_regex}" type="text"/> </label>
    <label>Force order: <input  id="force_order_lock_${i}" ${
      force_order === true ? "checked" : ""
    } type="checkbox"/> </label>
    <label>Enable after: <select id="enable_after_lock_${i}" />  
    </select> </label>
    <label>Result : <input class="input_values" id="result_lock_${i}" value="${result}" type="text" /> </label>
    <label>Locker input files :<hr/> <section id="locker_input_files_${i}"></section></label>
    <button id="preview_button_lock_${i}">Preview lock </button>`;
    options.push({
      value: `locker-${i + 1}`,
      text: `Locker ${i + 1}`,
    });

    lockersContainer.appendChild(sectionLocker);
    sectionStoryResources.appendChild(sectionStoryResource);
  }
  gameSection.appendChild(lockersContainer);

  for (let i = 0; i < lockerCount; i++) {
    const selectLocks = document.getElementById(`enable_after_lock_${i}`);
    options.forEach((option) => {
      const enable_after_flag =
        i < oldLockerCount
          ? game.game.setup_game.lockers[i].enable_after === option.value
          : false;

      const newOption = document.createElement("option");
      newOption.value = option.value;
      newOption.text = option.text;
      newOption.selected = enable_after_flag;
      selectLocks.appendChild(newOption);
    });
    const resultInput = document.getElementById(`result_lock_${i}`);
    let resultLength = resultInput.value.length;

    const lockerInputFileSection = document.getElementById(
      `locker_input_files_${i}`
    );

    resultInput.addEventListener("input", function (event) {
      resultLength = parseInt(event.target.value.length);
      lockerInputFileSection.innerHTML = "";
      for (let j = 0; j < resultLength; j++) {
        const fileLabel = document.createElement("label");
        fileLabel.htmlFor = `image_input_file_${j}_lock_${i}`;
        fileLabel.textContent = `File url ${j + 1}:`;

        const fileInput = document.createElement("input");
        fileInput.type = "text";
        fileInput.id = `image_input_file_${j}_lock_${i}`;
        fileInput.className = "input_values";

        lockerInputFileSection.append(fileLabel);
        lockerInputFileSection.append(fileInput);
      }
    });

    for (let j = 0; j < resultLength; j++) {
      const fileLabel = document.createElement("label");
      fileLabel.htmlFor = `image_input_file_${j}_lock_${i}`;
      fileLabel.textContent = `File url ${j + 1}:`;

      const fileInput = document.createElement("input");
      fileInput.type = "text";
      fileInput.id = `image_input_file_${j}_lock_${i}`;
      fileInput.className = "input_values";

      lockerInputFileSection.append(fileLabel);
      lockerInputFileSection.append(fileInput);
    }
    const resourcesSection = this.document.getElementById(
      `resources_locker_${i}`
    );
    const resourcesCountInput = this.document.getElementById(
      `resource_count_${i}`
    );

    let resourcesCount = resourcesCountInput.value;

    resourcesCountInput.addEventListener("input", function (event) {
      resourcesCount = parseInt(event.target.value);

      resourcesSection.innerHTML = "";

      for (let j = 0; j < resourcesCount; j++) {
        const resource =
          j < oldLockerResources[i]
            ? game.game.setup_game.lockers[i].resources[j].link
            : "";

        const resourceInputLabel = document.createElement("label");
        resourceInputLabel.htmlFor = `resources_${j}_locker_${i}`;
        resourceInputLabel.textContent = `Resource ${j + 1}:`;

        const resourceInput = document.createElement("input");
        resourceInput.className = "input_values";
        resourceInput.type = "text";
        resourceInput.id = `resources_${j}_locker_${i}`;
        resourceInput.value = resource;
        resourcesSection.append(resourceInputLabel);
        resourcesSection.append(resourceInput);
      }
    });

    for (let j = 0; j < resourcesCount; j++) {
      const link =
        j < oldLockerResources[i]
          ? game.game.setup_game.lockers[i].resources[j].link
          : "";
      const resourceInputLabel = document.createElement("label");
      resourceInputLabel.htmlFor = `resources_${j}_locker_${i}`;
      resourceInputLabel.textContent = `Resource ${j + 1}:`;

      const resourceInput = document.createElement("input");
      resourceInput.className = "input_values";
      resourceInput.type = "text";
      resourceInput.id = `resources_${j}_locker_${i}`;
      resourceInput.value = link;
      resourcesSection.append(resourceInputLabel);
      resourcesSection.append(resourceInput);
    }
  }

  for (let i = 0; i < lockerCount; i++) {
    let childWindow = null;

    const previewButtonLock = document.getElementById(
      `preview_button_lock_${i}`
    );

    previewButtonLock.addEventListener("click", function () {
      const attemptsNumberInput = document.getElementById(
        `number_attempts_lock_${i}`
      );
      const pointsLockInput = document.getElementById(`points_lock_${i}`);
      const logoInput = document.getElementById(`logo_lock_${i}`);
      const resultInput = document.getElementById(`result_lock_${i}`);
      let resultLength = resultInput.value.length;

      //window stuff :
      // Open a new window with a specified URL
      childWindow = window.open(
        "about:blank",
        "childWindow",
        "width=1196,height=896"
      );

      // Write content to the new window
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
            <h2>Lock ${i + 1} Preview</h2>
            <p>Logo </p>
            <div class="image-container" id="image-container-logo">
            <img src="${logoInput.value}"/>
            </div>
            <p>Combination is ${resultInput.value}</p>
            <div class="image-container" id="image-container-lock">
            </div>
            <p>Attemps: ${attemptsNumberInput.value},Points:${
          pointsLockInput.value
        }</p>
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
          const fileImage = document.getElementById(
            `image_input_file_${j}_lock_${i}`
          );
          const imgElement = childWindow.document.createElement("img");
          imgElement.src = fileImage.value;
          imgElement.id = "img_" + j;
          imgElement.setAttribute("draggable", true);
          imagesSection.appendChild(imgElement);
        }
        childWindow.addDragDropListeners();
      }
    });

    const previewButtonStoryResource = document.getElementById(
      `preview_button_story_resource_${i}`
    );
    previewButtonStoryResource.addEventListener("click", function () {
      const storyResourceUrl = document.getElementById(
        `story${i}-resource-filename-url`
      );
      const storyTitle = document.getElementById(`story${i}-title`);
      childWindow = window.open(
        "about:blank",
        "childWindow",
        "width=1196,height=896"
      );

      // Write content to the new window
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
            <h2>${storyTitle.value}</h2>
            <div class="image-container" id="image-container-story">
            <img src="${storyResourceUrl.value}"/>
            </div>
           
           
        </body>
        </html>`);
      }
    });
  }

  const sectionInputHintsCount = this.document.createElement("section");
  sectionInputHintsCount.innerHTML = `<label>Enter number of hints for story : <input class="data_count" id="hints_count" type="number" value="${hintsCount}"> </label>`;
  gameSection.appendChild(sectionInputHintsCount);
  const hintsContainer = this.document.createElement("section");

  hintsContainer.id = "hints_container";
  hintsContainer.classList.add("info_section_game");
  hintsContainer.classList.add("data_contains");

  const hintsCounterInput = document.getElementById("hints_count");
  hintsCounterInput.addEventListener("input", function (event) {
    hintsCount = parseInt(event.target.value);
    hintsContainer.innerHTML = `<strong>Hints for Story are ${hintsCount}</strong>`;
    for (let i = 0; i < hintsCount; i++) {
      const filename =
        i < oldLockerCount ? game.game.setup_game.story.hints[i].filename : "";
      const fileext =
        i < oldLockerCount ? game.game.setup_game.story.hints[i].fileext : "";
      const title =
        i < oldLockerCount ? game.game.setup_game.story.hints[i].title : "";
      const text =
        i < oldLockerCount ? game.game.setup_game.story.hints[i].text : "";

      const hintSection = document.createElement("section");
      hintSection.id = `hint_section_${i}`;
      hintSection.className = "locker_section";
      hintSection.innerHTML = `
      <label>Filename: <input id="hint${i}-filename" value="${filename}" type="text"> </label>
      <label>Fileext: <input id="hint${i}-fileext" value="${fileext}" type="text"> </label>
      <label>Title: <input id="hint${i}-title" value="${title}" type="text"></label>
      <label>Text: <input id="hint${i}-text" value="${text}" type="text"></label>`;
      hintsContainer.appendChild(hintSection);
    }
  });

  hintsContainer.innerHTML = `<strong>Hints for Story are ${hintsCount}</strong>`;

  for (let i = 0; i < hintsCount; i++) {
    const filename =
      i < oldLockerCount ? game.game.setup_game.story.hints[i].filename : "";
    const fileext =
      i < oldLockerCount ? game.game.setup_game.story.hints[i].fileext : "";
    const title =
      i < oldLockerCount ? game.game.setup_game.story.hints[i].title : "";
    const text =
      i < oldLockerCount ? game.game.setup_game.story.hints[i].text : "";

    const hintSection = document.createElement("section");
    hintSection.id = `hint_section_${i}`;
    hintSection.className = "locker_section";
    hintSection.innerHTML = `
    <label>Filename: <input id="hint${i}-filename" value="${filename}" type="text"> </label>
    <label>Fileext: <input id="hint${i}-fileext" value="${fileext}" type="text"> </label>
    <label>Title: <input id="hint${i}-title" value="${title}" type="text"></label>
    <label>Text: <input id="hint${i}-text" value="${text}" type="text"></label>`;
    hintsContainer.appendChild(hintSection);
  }

  gameSection.appendChild(hintsContainer);

  const videoContainer = this.document.createElement("section");
  videoContainer.id = "video_container";
  videoContainer.className = "info_section_game";
  videoContainer.innerHTML = `<strong>Video properties </strong>
  <label>Source:<input id="video-src" value="${
    game.game.setup_game.video["-src"]
  }" type="text"> </label>
  <label>Text :<input id="video-text" value="${
    game.game.setup_game.video["#text"]
  }" type="text"> </label>
  <label>Game prepare instructions: <input id="game-prepare-instructions" value="${
    game.game.setup_game.game_prepare_instructions
  }" type="text"> </label>
  <label>Game prepare instructions video: <input id="game-prepare-instructions-video"  type="file" accept = ".mp4">  <span>Initial file : ${
    game.game.setup_game.game_prepare_instructions_video
  } </span></label>
  <label>Game resources: <input id="game-resources"  type="file" accept=".zip,.rar"> <span>Initial file : ${
    game.game.setup_game.game_resources
  } </span> </label>
  <div class="logo-section">
    <label>Teacher tools </label>
    <label>Timer: <input id="timer" value="${
      game.game.setup_game.teacher_tool.timer
    }" type="text"></label>
    <label>Music: <input id="music" ${
      game.game.setup_game.teacher_tool.music === true ? "checked" : ""
    } " type="checkbox"> </label>
  </div>  
  <div class="logo-section"> 
    <label>Start timer </label>
    <label> Start timer: <input id="start-timer" value="${
      game.game.setup_game.teacher_tool.start_timer["-start_timer"]
    }" type="text"> </label>
    <label> Text: <input id="timer-text" value="${
      game.game.setup_game.teacher_tool.start_timer["#text"]
    }" type="text"> </label>
  </div>
  `;
  gameSection.appendChild(videoContainer);

  const sectionRefQuesCount = this.document.createElement("section");
  sectionRefQuesCount.innerHTML = `<label>Enter number of reflection questions : <input class="data_count" id="ref_ques_count" type="number" value="${refQuesCount}"> </label>`;
  gameSection.appendChild(sectionRefQuesCount);

  const refQuestionsSection = this.document.createElement("section");
  refQuestionsSection.id = "ref_ques_section";
  refQuestionsSection.className = "info_section_game";

  const refQuesCounterInput = document.getElementById("ref_ques_count");
  refQuesCounterInput.addEventListener("input", function (event) {
    refQuesCount = parseInt(event.target.value);
    refQuestionsSection.innerHTML = "<strong> Reflection Questions </strong>";
    for (let j = 0; j < refQuesCount; j++) {
      const refQuestionLabel = document.createElement("label");
      refQuestionLabel.htmlFor = `ref_ques_${j}`;
      refQuestionLabel.textContent = `Question ${j + 1}:`;

      const ref_quest =
        j < oldReflectionQuestionsCount
          ? game.game.setup_game.reflection_questions.ol.li[j]
          : "";

      const refQuestion = document.createElement("input");
      refQuestion.type = "text";
      refQuestion.id = `ref_ques_${j}`;
      refQuestion.className = "input_values";
      refQuestion.value = ref_quest;
      refQuestionsSection.append(refQuestionLabel);
      refQuestionsSection.append(refQuestion);
    }
  });

  refQuestionsSection.innerHTML = "<strong> Reflection Questions </strong>";

  for (let j = 0; j < refQuesCount; j++) {
    const refQuestionLabel = document.createElement("label");
    refQuestionLabel.htmlFor = `ref_ques_${j}`;
    refQuestionLabel.textContent = `Question ${j + 1}:`;

    const ref_quest =
      j < oldReflectionQuestionsCount
        ? game.game.setup_game.reflection_questions.ol.li[j]
        : "";

    const refQuestion = document.createElement("input");
    refQuestion.type = "text";
    refQuestion.id = `ref_ques_${j}`;
    refQuestion.className = "input_values";
    refQuestion.value = ref_quest;
    refQuestionsSection.append(refQuestionLabel);
    refQuestionsSection.append(refQuestion);
  }

  gameSection.appendChild(refQuestionsSection);

  ////////////////////////Extensions///////////////////////////////////////////
  const expsSection = this.document.createElement("section");
  expsSection.innerHTML = `<label>Enter number of extensions : <input class="data_count" id="extentions" type="number" value=${extensionsCount}> </label>`;
  gameSection.appendChild(expsSection);
  const extContainer = this.document.createElement("section");
  gameSection.appendChild(extContainer);

  for (let i = 0; i < extensionsCount; i++) {
    const extensionSection = document.createElement("section");
    extensionSection.id = `ext_section_game_${i}`;
    extensionSection.className = "info_section_game";
    const open_url =
      i < oldExtensionsCount ? game.game.extensions[i].params1.open_url : "";
    const back_url =
      i < oldExtensionsCount ? game.game.extensions[i].params2.back_url : "";
    const icon = i < oldExtensionsCount ? game.game.extensions[i].icon : "";
    const title = i < oldExtensionsCount ? game.game.extensions[i].title : "";
    extensionSection.innerHTML = `<strong> Extension information ${
      i + 1
    }</strong>
      <label> lockerld: <select id="select_lock_ext_${i}"></select></label>
      <label> Open url: <input value=${open_url} id="open_url_text_${i}" type="text" class="input_values"></label>
      <label> Back url: <input value=${back_url} id="back_url_text_${i}" type="text" class="input_values"></label>
      <label>Icon<input value=${icon} id="ext_logo_${i}" class="input_values"   type="text"></label>
      <label> Title: <input value=${title} id="title_ext_${i}" type="text" class="input_values"></label>
      <button id="preview_button_ext_${i}">Preview ext </button>
      <label>answer <input id="returned_ans_${i}" type="text" class="input_values" readonly></label>
      <section>
      <label> Output</label>
      <label>open_url output : <input class="input_special" id="open-url-output-${i}"  readonly></label>
      <label>back_url output : <input class="input_special" id="back-url-output-${i}" readonly></label>
      </section>`;

    extContainer.appendChild(extensionSection);

    const previewButtonExt = document.getElementById(`preview_button_ext_${i}`);

    previewButtonExt.addEventListener("click", function () {
      const logoInput = document.getElementById(`ext_logo_${i}`);
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
      }
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
                  <label>Add answer:<input id="answ" type="text"/></label>
                  <button id="sendData">Send ans Back</button>
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
    
                      document.getElementById('sendData').addEventListener('click',function(){
                        const answer_input = document.getElementById('answ').value + ${i};
                        
                          if (window.opener) {
                            window.opener.postMessage(answer_input,"*");
                            closeWindow();
                            }
                      });
              
    
                      addDragDropListeners();
                  </script>
              </body>
              </html>`);
      }
    });
  }
  for (let i = 0; i < extensionsCount; i++) {
    const selectLocks = document.getElementById(`select_lock_ext_${i}`);
    let key = 0;
    options.forEach((option) => {
      const newOption = document.createElement("option");
      newOption.value = key;
      newOption.text = option.text;
      const selected =
        i < oldExtensionsCount
          ? game.game.extensions[i].lockerId === key
          : false;
      newOption.selected = selected;
      key++;
      selectLocks.appendChild(newOption);
    });
  }

  // Move the message event listener outside the loop
  window.addEventListener("message", function (event) {
    const received_data = event.data;

    // Loop through all the input elements and update only the matching one
    for (let i = 0; i < extensionsCount; i++) {
      const answerInput = document.getElementById(`returned_ans_${i}`);
      const lockerld = this.document.getElementById(
        `select_lock_ext_${i}`
      ).value;
      const openUrl = this.document.getElementById(`open_url_text_${i}`).value;
      const backUrl = this.document.getElementById(`back_url_text_${i}`).value;
      const title = this.document.getElementById(`title_ext_${i}`).value;
      const gameName = this.document.getElementById(`game_name`).value;
      const openUrlOutput = this.document.getElementById(
        `open-url-output-${i}`
      );
      const backUrlOutput = this.document.getElementById(
        `back-url-output-${i}`
      );
      if (typeof received_data === "string") {
        const lastChar = received_data.charAt(received_data.length - 1);
        const lastNumber = parseInt(lastChar, 10);
        if (lastNumber === i) {
          openUrlOutput.value = `${openUrl}?app=${gameName}&gameId=${1}&username=${username}|&mystery=${lockerld}`;
          backUrlOutput.value = `${backUrl}?gameId=${1}&UserName=${username}&MysteryIndex=${lockerld}&Answer=${received_data.slice(
            0,
            -1
          )}`;
          answerInput.value = received_data.slice(0, -1);
          console.log(i, received_data.slice(0, -1));
        }
      }
    }
  });

  const extCountInput = document.getElementById("extentions");
  extCountInput.addEventListener("input", function () {
    extensionsCount = extCountInput.value;
    extContainer.innerHTML = "";
    for (let i = 0; i < extensionsCount; i++) {
      const extensionSection = document.createElement("section");
      extensionSection.id = `ext_section_game_${i}`;
      extensionSection.className = "info_section_game";
      extensionSection.innerHTML = `<strong> Extension information ${
        i + 1
      }</strong>
        <label> lockerld: <select id="select_lock_ext_${i}"></select></label>
        <label> Open url: <input id="open_url_text_${i}" type="text" class="input_values"></label>
        <label> Back url: <input id="back_url_text_${i}" type="text" class="input_values"></label>
        <label>Icon<input id="ext_logo_${i}" class="input_values"   type="text"></label>
        <label> Title: <input id="title_ext_${i}" type="text" class="input_values"></label>
        <button id="preview_button_ext_${i}">Preview ext </button>
        <label>answer <input id="returned_ans_${i}" type="text" class="input_values" readonly></label>
        <section>
        <label> Output</label>
        <label>open_url output : <input class="input_special" id="open-url-output-${i}"  readonly></label>
        <label>back_url output : <input class="input_special" id="back-url-output-${i}" readonly></label>
        </section>`;

      extContainer.appendChild(extensionSection);

      const previewButtonExt = document.getElementById(
        `preview_button_ext_${i}`
      );

      previewButtonExt.addEventListener("click", function () {
        const logoInput = document.getElementById(`ext_logo_${i}`);
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
        }
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
                    <label>Add answer:<input id="answ" type="text"/></label>
                    <button id="sendData">Send ans Back</button>
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
      
                        document.getElementById('sendData').addEventListener('click',function(){
                          const answer_input = document.getElementById('answ').value + ${i};
                          
                            if (window.opener) {
                              window.opener.postMessage(answer_input,"*");
                              closeWindow();
                              }
                        });
                
      
                        addDragDropListeners();
                    </script>
                </body>
                </html>`);
        }
      });
    }
    for (let i = 0; i < extensionsCount; i++) {
      const selectLocks = document.getElementById(`select_lock_ext_${i}`);
      let key = 0;
      options.forEach((option) => {
        const newOption = document.createElement("option");
        newOption.value = key;
        newOption.text = option.text;
        key++;
        selectLocks.appendChild(newOption);
      });
    }

    // Move the message event listener outside the loop
    window.addEventListener("message", function (event) {
      const received_data = event.data;

      // Loop through all the input elements and update only the matching one
      for (let i = 0; i < extensionsCount; i++) {
        const answerInput = document.getElementById(`returned_ans_${i}`);
        const lockerld = this.document.getElementById(
          `select_lock_ext_${i}`
        ).value;
        const openUrl = this.document.getElementById(
          `open_url_text_${i}`
        ).value;
        const backUrl = this.document.getElementById(
          `back_url_text_${i}`
        ).value;
        const title = this.document.getElementById(`title_ext_${i}`).value;
        const gameName = this.document.getElementById(`game_name`).value;
        const openUrlOutput = this.document.getElementById(
          `open-url-output-${i}`
        );
        const backUrlOutput = this.document.getElementById(
          `back-url-output-${i}`
        );
        if (typeof received_data === "string") {
          const lastChar = received_data.charAt(received_data.length - 1);
          const lastNumber = parseInt(lastChar, 10);
          if (lastNumber === i) {
            openUrlOutput.value = `${openUrl}?app=${gameName}&gameId=${1}&username=${username}|&mystery=${lockerld}`;
            backUrlOutput.value = `${backUrl}?gameId=${1}&UserName=${username}&MysteryIndex=${lockerld}&Answer=${received_data.slice(
              0,
              -1
            )}`;
            answerInput.value = received_data.slice(0, -1);
            console.log(i, received_data.slice(0, -1));
          }
        }
      }
    });
  });

  ////////////////////////////////////////////////////////////////////////////

  const currentLockerCountInput = document.getElementById("locks_count");

  currentLockerCountInput.addEventListener("input", function (event) {
    lockerCount = parseInt(event.target.value);
    lockersContainer.innerHTML = `<strong>Lockers generated are ${lockerCount}</strong>`;
    lockersContainer.classList.add("info_section_game");
    lockersContainer.classList.add("data_contains");
    const options = [];
    for (let i = 0; i < lockerCount; i++) {
      const internal =
        i < oldLockerCount
          ? game.game.setup_game.story.resources[i].filename.internal
          : "";
      const data =
        i < oldLockerCount
          ? game.game.setup_game.story.resources[i].filename.data
          : "";
      const size =
        i < oldLockerCount
          ? game.game.setup_game.story.resources[i].filename.size
          : "";
      const url =
        i < oldLockerCount
          ? game.game.setup_game.story.resources[i].filename.url
          : "";
      const fileext =
        i < oldLockerCount
          ? game.game.setup_game.story.resources[i].fileext
          : "";
      const title =
        i < oldLockerCount ? game.game.setup_game.story.resources[i].title : "";
      const text =
        i < oldLockerCount ? game.game.setup_game.story.resources[i].text : "";
      const ext =
        i < oldLockerCount ? game.game.setup_game.story.resources[i].ext : "";

      const sectionStoryResource = document.createElement("section");
      sectionStoryResource.id = `story_resource_${i}`;
      sectionStoryResource.classList.add("locker_section");
      sectionStoryResource.innerHTML = `<strong> Resource for locker ${
        i + 1
      } </strong>
      <div class="logo-section">
      <label>Filename: </label>
      <label>Internal: <input id="story${i}-resource-filename-internal" ${
        internal === true ? "checked" : ""
      }  type="checkbox"></label>
      <label>Data: <input id="story${i}-resource-filename-data" value="${data}" type="text"></label>
      <label>Size: <input id="story${i}-resource-filename-size" value="${size}" type="text"></label>
      <label>Url: <input id="story${i}-resource-filename-url" value="${url}" type="text"></label>
      <div>
      <label>Fileext:<input id="story${i}-fileext" value="${fileext}" type="text"></label>
      <label>Title:<input id="story${i}-title" value="${title}" type="text"></label>
      <label>Text:<input id="story${i}-text" value="${text}" type="text"></label>
      <label>Ext:<input id="story${i}-ext" value="${ext}" type="text"></label>
      <button id="preview_button_story_resource_${i}">Preview story resource </button>`;

      const logo =
        i < oldLockerCount ? game.game.setup_game.lockers[i].logo : "";
      const type =
        i < oldLockerCount ? game.game.setup_game.lockers[i].type : "";
      const result =
        i < oldLockerCount ? game.game.setup_game.lockers[i].result : "";
      const attempts_number =
        i < oldLockerCount
          ? game.game.setup_game.lockers[i].attempts_number
          : "";
      const show_attempts =
        i < oldLockerCount ? game.game.setup_game.lockers[i].show_attempts : "";
      const points =
        i < oldLockerCount ? game.game.setup_game.lockers[i].points : "";
      const lock_regex =
        i < oldLockerCount ? game.game.setup_game.lockers[i].lock_regex : "";
      const force_order =
        i < oldLockerCount ? game.game.setup_game.lockers[i].force_order : "";
      const lockerResourseCount = i < oldLockerCount ? lockerResources[i] : "";

      const sectionLocker = document.createElement("section");
      sectionLocker.id = `locker_info_${i}`;
      sectionLocker.classList.add("locker_section");
      sectionLocker.innerHTML = `<strong> Locker ${i + 1} </strong> 
      <section>
      <label>Resources count : <input class="input_values" id="resource_count_${i}" type="number" value = "${lockerResourseCount}"></label> 
      <label>Resources :<hr/><section id="resources_locker_${i}"> </section></label>
      <label>Logo : <input  class="input_values" type="text" id="logo_lock_${i}" value="${logo}"> </label>
      <label>Type : <select id="type_lock_${i}">
      <option value="Word Lock">Word Lock</option> 
      <option value="Directions Lock">Directions Lock</option> 
      </select> </label>
      <label>Attempts: <input class="input_values" id="number_attempts_lock_${i}" value="${attempts_number}" type="number"/> </label>
      <label>Show attempts: <input id="show_attempts_lock_${i}"  type="checkbox"${
        show_attempts === true ? "checked" : ""
      }/> </label>
      <label>Points: <input class="input_values" id="points_lock_${i}" value="${points}" type="number"/> </label>
      <label>Regex: <input class="input_values" id="regex_lock_${i}" value="${lock_regex}" type="text"/> </label>
      <label>Force order: <input  id="force_order_lock_${i}" ${
        force_order === true ? "checked" : ""
      } type="checkbox"/> </label>
      <label>Enable after: <select id="enable_after_lock_${i}" />  
      </select> </label>
      <label>Result : <input class="input_values" id="result_lock_${i}" value="${result}" type="text" /> </label>
      <label>Locker input files :<hr/> <section id="locker_input_files_${i}"></section></label>
      <button id="preview_button_lock_${i}">Preview lock </button>`;
      options.push({
        value: `locker-${i + 1}`,
        text: `Locker ${i + 1}`,
      });

      lockersContainer.appendChild(sectionLocker);
      sectionStoryResources.appendChild(sectionStoryResource);
    }

    for (let i = 0; i < lockerCount; i++) {
      const selectLocks = document.getElementById(`enable_after_lock_${i}`);
      options.forEach((option) => {
        const enable_after_flag =
          i < oldLockerCount
            ? game.game.setup_game.lockers[i].enable_after === option.value
            : false;

        const newOption = document.createElement("option");
        newOption.value = option.value;
        newOption.text = option.text;
        newOption.selected = enable_after_flag;
        selectLocks.appendChild(newOption);
      });
      const resultInput = document.getElementById(`result_lock_${i}`);
      let resultLength = resultInput.value.length;

      const lockerInputFileSection = document.getElementById(
        `locker_input_files_${i}`
      );

      resultInput.addEventListener("input", function (event) {
        resultLength = parseInt(event.target.value.length);
        lockerInputFileSection.innerHTML = "";
        for (let j = 0; j < resultLength; j++) {
          const fileLabel = document.createElement("label");
          fileLabel.htmlFor = `image_input_file_${j}_lock_${i}`;
          fileLabel.textContent = `File url ${j + 1}:`;

          const fileInput = document.createElement("input");
          fileInput.type = "text";
          fileInput.id = `image_input_file_${j}_lock_${i}`;
          fileInput.className = "input_values";

          lockerInputFileSection.append(fileLabel);
          lockerInputFileSection.append(fileInput);
        }
      });

      for (let j = 0; j < resultLength; j++) {
        const fileLabel = document.createElement("label");
        fileLabel.htmlFor = `image_input_file_${j}_lock_${i}`;
        fileLabel.textContent = `File url ${j + 1}:`;

        const fileInput = document.createElement("input");
        fileInput.type = "text";
        fileInput.id = `image_input_file_${j}_lock_${i}`;
        fileInput.className = "input_values";

        lockerInputFileSection.append(fileLabel);
        lockerInputFileSection.append(fileInput);
      }
      const resourcesSection = this.document.getElementById(
        `resources_locker_${i}`
      );
      const resourcesCountInput = this.document.getElementById(
        `resource_count_${i}`
      );

      let resourcesCount = resourcesCountInput.value;

      resourcesCountInput.addEventListener("input", function (event) {
        resourcesCount = parseInt(event.target.value);

        resourcesSection.innerHTML = "";

        for (let j = 0; j < resourcesCount; j++) {
          const resource =
            j < oldLockerResources[i]
              ? game.game.setup_game.lockers[i].resources[j].link
              : "";

          const resourceInputLabel = document.createElement("label");
          resourceInputLabel.htmlFor = `resources_${j}_locker_${i}`;
          resourceInputLabel.textContent = `Resource ${j + 1}:`;

          const resourceInput = document.createElement("input");
          resourceInput.className = "input_values";
          resourceInput.type = "text";
          resourceInput.id = `resources_${j}_locker_${i}`;
          resourceInput.value = resource;
          resourcesSection.append(resourceInputLabel);
          resourcesSection.append(resourceInput);
        }
      });

      for (let j = 0; j < resourcesCount; j++) {
        const link =
          j < oldLockerResources[i]
            ? game.game.setup_game.lockers[i].resources[j].link
            : "";
        const resourceInputLabel = document.createElement("label");
        resourceInputLabel.htmlFor = `resources_${j}_locker_${i}`;
        resourceInputLabel.textContent = `Resource ${j + 1}:`;

        const resourceInput = document.createElement("input");
        resourceInput.className = "input_values";
        resourceInput.type = "text";
        resourceInput.id = `resources_${j}_locker_${i}`;
        resourceInput.value = link;
        resourcesSection.append(resourceInputLabel);
        resourcesSection.append(resourceInput);
      }
    }

    for (let i = 0; i < lockerCount; i++) {
      let childWindow = null;

      const previewButtonLock = document.getElementById(
        `preview_button_lock_${i}`
      );

      previewButtonLock.addEventListener("click", function () {
        const attemptsNumberInput = document.getElementById(
          `number_attempts_lock_${i}`
        );
        const pointsLockInput = document.getElementById(`points_lock_${i}`);
        const logoInput = document.getElementById(`logo_lock_${i}`);
        const resultInput = document.getElementById(`result_lock_${i}`);
        let resultLength = resultInput.value.length;

        //window stuff :
        // Open a new window with a specified URL
        childWindow = window.open(
          "about:blank",
          "childWindow",
          "width=1196,height=896"
        );

        // Write content to the new window
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
              <h2>Lock ${i + 1} Preview</h2>
              <p>Logo </p>
              <div class="image-container" id="image-container-logo">
              <img src="${logoInput.value}"/>
              </div>
              <p>Combination is ${resultInput.value}</p>
              <div class="image-container" id="image-container-lock">
              </div>
              <p>Attemps: ${attemptsNumberInput.value},Points:${
            pointsLockInput.value
          }</p>
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
            const fileImage = document.getElementById(
              `image_input_file_${j}_lock_${i}`
            );
            const imgElement = childWindow.document.createElement("img");
            imgElement.src = fileImage.value;
            imgElement.id = "img_" + j;
            imgElement.setAttribute("draggable", true);
            imagesSection.appendChild(imgElement);
          }
          childWindow.addDragDropListeners();
        }
      });

      const previewButtonStoryResource = document.getElementById(
        `preview_button_story_resource_${i}`
      );
      previewButtonStoryResource.addEventListener("click", function () {
        const storyResourceUrl = document.getElementById(
          `story${i}-resource-filename-url`
        );
        const storyTitle = document.getElementById(`story${i}-title`);
        childWindow = window.open(
          "about:blank",
          "childWindow",
          "width=1196,height=896"
        );

        // Write content to the new window
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
              <h2>${storyTitle.value}</h2>
              <div class="image-container" id="image-container-story">
              <img src="${storyResourceUrl.value}"/>
              </div>
             
             
          </body>
          </html>`);
        }
      });
    }
  });

  ////////////////////////TextArea////////////////////////////////////////////
  const textAreaButton = this.document.getElementById("note-pad-edit-button");

  textAreaButton.addEventListener("click", function () {
    documentAction = "text";
    textAreaButton.classList.add("hidden");
    gameSection.className = "hidden";
    const textArea = document.getElementById("text-area-json");
    const gameNew = createJsonFile(
      lockerCount,
      lockerResources,
      refQuesCount,
      extensionsCount
    );
    textArea.innerHTML = `<textarea id="text-area-editor" style="width: 100%; height: 400px;">${JSON.stringify(
      gameNew,
      null,
      4
    )} </textarea>
    <button class="reload-button" onclick="goBackForm()">Back</button>`;
  });
  //////////////////////Footer//////////////////////////////////////////////
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
  sectionForDownloadOrSaveJsonButton.innerHTML = `<button id="download-json" class="button-download"> Download json </button>
     <button id="save-json" class="hidden button-action"> Save json </button>
     <button id="update-json" class="hidden button-action"> Update json </button>
     `;
  footer.appendChild(sectionForDownloadOrSaveJsonButton);

  document
    .getElementById("download-json")
    .addEventListener("click", (event) => {
      downloadJsonFile(
        lockerCount,
        lockerResources,
        refQuesCount,
        extensionsCount,
        documentAction
      );
      event.preventDefault();
    });

  if (gameContent === "empty") {
    document.getElementById("save-json").classList.remove("hidden");
    document.getElementById("save-json").addEventListener("click", (event) => {
      saveGameJson(
        lockerCount,
        lockerResources,
        refQuesCount,
        extensionsCount,
        documentAction
      );
      event.preventDefault();
    });
  } else {
    document.getElementById("update-json").classList.remove("hidden");
    document
      .getElementById("update-json")
      .addEventListener("click", (event) => {
        updateGameJson(
          lockerCount,
          lockerResources,
          refQuesCount,
          extensionsCount,
          documentAction
        );
        event.preventDefault();
      });
  }

  const footerSection = document.createElement("section");
  footerSection.className = "footer-create-edit-json";
  footerSection.innerHTML = "<p>2024 . All rights reserved.</p>";
  footer.appendChild(footerSection);
}
