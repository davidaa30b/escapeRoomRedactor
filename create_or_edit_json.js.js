const game = JSON.parse(`{
    "game": {
      "game_id": 1,
      "modes": "both",
      "name": "Food game",
      "status": "public",
      "default_language": "en",
      "logo": {
        "internal": "false",
        "data": "#NA",
        "size": "#NA",
        "url": "https://img.freepik.com/premium-vector/fast-food-illustration-set_121223-1482.jpg?w=2000"
      },
      "category": "Social",
      "access_key": "",
      "pauses_number": 1,
      "group_size": "#NA",
      "gamers_age": "#NA",
      "setup_game": {
        "lockers": [
          {
            "id": "1",
            "logo": "assets/images/locks/digit.png",
            "comment": " 1.jpg 2.jpg 3.jpg ",
            "type": "Word Lock",
            "result": "pizza",
            "attempts_number": "1",
            "show_attempts": "true",
            "points": 3,
            "lock_regex": "#NA",
            "force_order": "true",
            "enable_after": "locker-1",
            "resources": [
              {
                "link": "https://www.youtube.com/watch?v=1-SJGQ2HLp8&ab_channel=JamieOliver"
              }
            ]
          },
          {
            "id": "2",
            "logo": "assets/images/locks/word.png",
            "comment": " 1.jpg 2.jpg 3.jpg ",
            "type": "Word Lock",
            "result": "spaghetti",
            "attempts_number": "2",
            "show_attempts": "true",
            "points": 1,
            "lock_regex": "#NA",
            "force_order": "true",
            "enable_after": "locker-2",
            "resources": []
          }
        ],
        "story": {
          "text": "This is a game of foods!",
          "video": "mory video url",
          "resources": [
            {
              "id": "1",
              "filename": {
                "internal": "false",
                "data": "#NA",
                "size": "#NA",
                "url": "https://hips.hearstapps.com/hmg-prod/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1xw:0.843328335832084xh;center,top&resize=1200:*"
              },
              "fileext": "scene.edit.veiw.play.jpg",
              "title": "Mystery 1",
              "text": "Mystery 1",
              "ext": "#NA"
            },
            {
              "id": "2",
              "filename": {
                "internal": "false",
                "data": "#NA",
                "size": "#NA",
                "url": "https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg"
              },
              "fileext": "scene.edit.veiw.play.jpg",
              "title": "Mystery 2",
              "text": "Mystery 2",
              "ext": "#NA"
            }
          ],
          "hints": [
            {
              "id": "11",
              "filename": "#NA",
              "fileext": "#NA",
              "title": "Hint 1 for resource 1",
              "text": "This dish originates from Italy and its base is made of dough."
            },
            {
              "id": "22",
              "filename": "#NA",
              "fileext": "#NA",
              "title": "Hint 1 for resource 2",
              "text": "This dish is laso Italian and is usually boiled in order to prepare."
            }
          ]
        },
        "video": {
          "-src": "http://localhost",
          "#text": "view locker settings tutorial"
        },
        "game_prepare_instructions": "Long text/bulets",
        "game_prepare_instructions_video": "video1.mp4",
        "game_resources": "resources_game1.zip",
        "teacher_tool": {
          "timer": "",
          "hints_number": "2",
          "music": "false",
          "start_timer": {
            "-start_timer": "start_after",
            "#text": "20: 15"
          }
        },
        "reflection_questions": {
          "ol": {
            "li": ["Q1..", "Q2..", "Q3..", "Q4..", "Q5.."]
          }
        },
        "extra_requirements": "ADDITONAL 4-DIGIT LOCK OR USE OF LOCKS APP"
      },
      "extensions": []
    }
  }
  `);

//open in form :
let lockerCount = game.game.setup_game.lockers.length;
let lockerResources = game.game.setup_game.lockers.map(
  (l) => l.resources.length
);
let reflectionQuestionsCount =
  game.game.setup_game.reflection_questions.ol.li.length;

window.addEventListener("load", function () {
  const sectionInputLocksCount = this.document.createElement("section");
  sectionInputLocksCount.innerHTML = `<label>Enter number of locks : <input id="locks-count" type="number" value="${lockerCount}"> </label>`;
  document.body.appendChild(sectionInputLocksCount);

  const inputContainer = document.createElement("section");
  inputContainer.id = "input_container";
  for (let i = 0; i < lockerCount; i++) {
    const section = document.createElement("section");
    section.id = "locker-resources-count";
    section.innerHTML = `<label>Resources count for locker ${
      i + 1
    } <input id="resource-count-${i}" type="number" value = "${
      lockerResources[i]
    }"></label>`;
    inputContainer.appendChild(section);
  }
  const sectionForReflectionQuesCount = document.createElement("section");
  sectionForReflectionQuesCount.innerHTML = `<label>Reflection questions count <input id="ref-ques-count" type="number" value ="${reflectionQuestionsCount}"></label>`;
  inputContainer.appendChild(sectionForReflectionQuesCount);
  document.body.appendChild(inputContainer);

  const gameJsonForm = document.createElement("section");
  gameJsonForm.id = "game_json_form";
  gameJsonForm.innerHTML = "";
  this.document.body.appendChild(gameJsonForm);

  generateSections(lockerCount);

  let locksCountInput = this.document.getElementById("locks-count");
  //onchange
  locksCountInput.addEventListener("input", function () {
    inputContainer.innerHTML = "";
    let newLockerCount = locksCountInput.value;

    for (let i = 0; i < newLockerCount; i++) {
      const section = document.createElement("section");
      section.id = "locker-resources-count";
      section.innerHTML = `<label>Resources count for locker ${
        i + 1
      } <input id="resource-count-${i}" value="${
        lockerResources[i]
      }" type="number" ></label>`;
      inputContainer.appendChild(section);
    }

    const sectionForReflectionQuesCount = document.createElement("section");
    sectionForReflectionQuesCount.innerHTML = `<label>Reflection questions count <input id="ref-ques-count" value="${reflectionQuestionsCount}" type="number"></label>`;
    inputContainer.appendChild(sectionForReflectionQuesCount);

    document.getElementById("game_json_form").innerHTML = "";
    generateSections(newLockerCount);
    //this is to be put in generateSections;
    // for (let i = 0; i < lockerCount; i++) {
    //   lockerResources[i] = document.getElementById(`resource-count-${i}`).value;
    // }
    // reflectionQuestionsCount = document.getElementById("ref-ques-count").value;
  });
});

function generateSections(inputLockerCount) {
  const sectionsContainer = document.getElementById("game_json_form");
  let newLockerResources = [];
  sectionsContainer.innerHTML = `
      <p class="tab1">"game": {</p>
      <p class="tab2">  "game_id": <input id="game-id" value="${game.game.game_id}" type="number" placeholder="Въвете номер на играта!"></p>
      <p class="tab2">    "modes": <input id="modes" value="${game.game.modes}" type="text" placeholder="Въвете тип на играта!"></p>
      <p class="tab2"> "name": <input id="game-name" value="${game.game.name}" type="text" placeholder="Въвете име на играта!"></p>
      <p class="tab2">"status": <input id="game-status" value="${game.game.status}" type="text" placeholder="Въвете стятус на играта!"></p>
      <p class="tab2">"default_language": <input id="def-lan" value="${game.game.default_language}" type="text" placeholder="Въвете език по подразбиране на играта!"></p>
      <p class="tab2">"logo": {</p>
      <p class="tab3">"internal"<input id="logo-internal" value="${game.game.logo.internal}" type="checkbox" placeholder="Въведете информация!"></p>
      <p class="tab3">"data"<input id="logo-data" value="${game.game.logo.data}" type="text" placeholder="Въведете информация!"></p>
      <p class="tab3">"size"<input id="logo-size" value="${game.game.logo.size}" type="text" placeholder="Въведете информация!"></p>
      <p class="tab3">"url"<input id="logo-url" value="${game.game.logo.url}" type="text" placeholder="Въведете информация!"></p>
      <p class="tab2">},</p>
      <p class="tab2">"category": <input id="game-category" value="${game.game.category}" type="text" placeholder="Въвете категория на играта!"></p>
      <p class="tab2">"access_key": <input id="game-access-key" value="${game.game.access_key}" type="text" placeholder="Въвете ключ за достъп до играта!"></p>
      <p class="tab2">"pauses_number": <input id="game-pauses-number" value="${game.game.pauses_number}" type="number" placeholder="Въвете бутон за пауза на играта!"></p>
      <p class="tab2">"group_size": <input id="game-group-size" value="${game.game.group_size}" type="text" placeholder="Въвете брой играчи!" value="#NA"></p>
      <p class="tab2">"gamers_age": <input id="game-gamers-age" value="${game.game.gamers_age}"  type="text" placeholder="Въвете години на играчите!" value="#NA"></p>
      <p class="tab2">"setup_game": {</p>
      <p class="tab3">"lockers": [</p>
  `;

  for (let i = 0; i < inputLockerCount; i++) {
    const sectionDiv = document.createElement("section");
    const id = i < lockerCount ? game.game.setup_game.lockers[i].id : "";
    const logo = i < lockerCount ? game.game.setup_game.lockers[i].logo : "";
    const comment =
      i < lockerCount ? game.game.setup_game.lockers[i].comment : "";
    const type = i < lockerCount ? game.game.setup_game.lockers[i].type : "";
    const result =
      i < lockerCount ? game.game.setup_game.lockers[i].result : "";
    const attempts_number =
      i < lockerCount ? game.game.setup_game.lockers[i].attempts_number : "";
    const show_attempts =
      i < lockerCount ? game.game.setup_game.lockers[i].show_attempts : "";
    const points =
      i < lockerCount ? game.game.setup_game.lockers[i].points : "";
    const lock_regex =
      i < lockerCount ? game.game.setup_game.lockers[i].lock_regex : "";
    const force_order =
      i < lockerCount ? game.game.setup_game.lockers[i].force_order : "";
    const enable_after =
      i < lockerCount ? game.game.setup_game.lockers[i].enable_after : "";

    sectionDiv.className = "lockers";
    let lockerpart1 = `
          <p class="tab4">{</p>
          <p class="tab5">"id": <input id="locker-id${i}" value="${id}" type="text" placeholder="Въвете номер на ключалката!"></p>
          <p class="tab5">"logo": <input id="locker-logo${i}" value="${logo}" type="text" placeholder="Въвете номер на ключалката!"></p>  
          <p class="tab5">"comment": <input id="locker-comment${i}" value="${comment}" type="text" placeholder="Въвете номер на ключалката!"></p>  
          <p class="tab5">"type": <input id="locker-type${i}" value="${type}" type="text" placeholder="Въвете номер на ключалката!"></p>  
          <p class="tab5">"result": <input id="locker-result${i}" value="${result}" type="text" placeholder="Въвете номер на ключалката!"></p>  
          <p class="tab5">"attempts_number": <input id="locker-attempts-number${i}" value="${attempts_number}" type="text" placeholder="Въвете номер на ключалката!"></p>  
          <p class="tab5">"show_attempts": <input id="locker-show-attempts${i}" value="${show_attempts}" type="checkbox"></p>  
          <p class="tab5">"points": <input id="locker-points${i}" value="${points}" type="number" placeholder="Въвете номер на ключалката!"></p>  
          <p class="tab5">"lock_regex": <input id="locker-lock-regex${i}" value="${lock_regex}" type="text" placeholder="Въвете номер на ключалката!"></p>  
          <p class="tab5">"force_order": <input id="locker-force-order${i}" value="${force_order}" type="checkbox"></p>  
          <p class="tab5">"enable_after": <input id="locker-enable-after${i}" value="${enable_after}" type="text" placeholder="Въвете номер на ключалката!"></p>
          <p class="tab5">"resources": [</p>`;

    let resourcesCount = document.getElementById(`resource-count-${i}`).value;
    let lockerpart2 = `<section id='locker-resources-section-${i}'>`;
    newLockerResources[i] = resourcesCount;
    for (let linkCount = 0; linkCount < resourcesCount; linkCount++) {
      const link =
        linkCount < lockerResources[i]
          ? game.game.setup_game.lockers[i].resources[linkCount].link
          : "";

      lockerpart2 += `<p class="tab6">{</p>
        <p class="tab6">"link": <input id="resource${i}-link${linkCount}" value="${link}" type="text" placeholder="Въвете линк!"></p>
        <p class="tab6">}</p>`;
    }

    lockerpart2 = lockerpart2.concat(`</section><p class="tab5">]</p>
      <p class="tab4">}</p>`);

    sectionDiv.innerHTML = lockerpart1.concat(lockerpart2);
    sectionsContainer.appendChild(sectionDiv);

    //reload!! on lock resources!!s
    document
      .getElementById(`resource-count-${i}`)
      .addEventListener("input", () => {
        let curResourcesCount = document.getElementById(
          `resource-count-${i}`
        ).value;
        newLockerResources[i] = curResourcesCount;

        console.log(curResourcesCount);
        console.log(i);

        let part = "";
        for (let linkCount = 0; linkCount < curResourcesCount; linkCount++) {
          const link =
            linkCount < lockerResources[i]
              ? game.game.setup_game.lockers[i].resources[linkCount].link
              : "";

          part += `<p class="tab6">{</p>
      <p class="tab6">"link": <input id="resource${i}-link${linkCount}" value="${link}" type="text" placeholder="Въвете линк!"></p>
      <p class="tab6">}</p>`;
        }
        document.getElementById(`locker-resources-section-${i}`).innerHTML =
          part;
      });
  }

  const storyContainer = document.createElement("section");
  storyContainer.innerHTML = `  <p class="tab3">],</p>
  <p class="tab3">"story": {</p>
  <p class="tab4"> "text": <input id="story-text" value="${game.game.setup_game.story.text}" type="text">, </p>
  <p class="tab4"> "video" :  <input id="story-video" value="${game.game.setup_game.story.video}" type="text">, </p>
  <p class="tab4"> "resources" : [</p>`;
  sectionsContainer.appendChild(storyContainer);

  for (let i = 0; i < inputLockerCount; i++) {
    const sectionDiv1 = document.createElement("section");
    const id =
      i < lockerCount ? game.game.setup_game.story.resources[i].id : "";
    const internal =
      i < lockerCount
        ? game.game.setup_game.story.resources[i].filename.internal
        : "";
    const data =
      i < lockerCount
        ? game.game.setup_game.story.resources[i].filename.data
        : "";
    const size =
      i < lockerCount
        ? game.game.setup_game.story.resources[i].filename.size
        : "";
    const url =
      i < lockerCount
        ? game.game.setup_game.story.resources[i].filename.url
        : "";
    const fileext =
      i < lockerCount ? game.game.setup_game.story.resources[i].fileext : "";
    const title =
      i < lockerCount ? game.game.setup_game.story.resources[i].title : "";
    const text =
      i < lockerCount ? game.game.setup_game.story.resources[i].text : "";
    const ext =
      i < lockerCount ? game.game.setup_game.story.resources[i].ext : "";
    sectionDiv1.className = "resources";
    sectionDiv1.innerHTML = `
          <p class="tab5">{</p>
          <p class="tab6">"id":<input id="story${i}-resource-id" value="${id}" type="text"></p>
          <p class="tab6">"filename": {</p>
          <p class="tab7">"internal"<input id="story${i}-resource-filename-internal" value="${internal}" type="text"></p>
          <p class="tab7">"data"<input id="story${i}-resource-filename-data" value="${data}" type="text"></p>
          <p class="tab7">"size"<input id="story${i}-resource-filename-size" value="${size}" type="text"></p>
          <p class="tab7">"url"<input id="story${i}-resource-filename-url" value="${url}" type="text"></p>
          <p class="tab7">},</p>
          <p class="tab6">"fileext":<input id="story${i}-fileext" value="${fileext}" type="text"></p>
          <p class="tab6">"title":<input id="story${i}-title" value="${title}" type="text"></p>
          <p class="tab6">"text":<input id="story${i}-text" value="${text}" type="text"></p>
          <p class="tab6">"ext":<input id="story${i}-ext" value="${ext}" type="text"></p>
          <p class="tab5">},</p>
          `;
    sectionsContainer.appendChild(sectionDiv1);
  }

  let temp2 = {
    "],": "tab4",
    '"hints": [': "tab4",
  };

  for (var key in temp2) {
    let newParagraph = document.createElement("p");
    newParagraph.innerHTML = key;
    newParagraph.className = temp2[key];
    sectionsContainer.appendChild(newParagraph);
  }

  for (let i = 0; i < inputLockerCount; i++) {
    const sectionDiv2 = document.createElement("section");
    const id = i < lockerCount ? game.game.setup_game.story.hints[i].id : "";
    const filename =
      i < lockerCount ? game.game.setup_game.story.hints[i].filename : "";
    const fileext =
      i < lockerCount ? game.game.setup_game.story.hints[i].fileext : "";
    const title =
      i < lockerCount ? game.game.setup_game.story.hints[i].title : "";
    const text =
      i < lockerCount ? game.game.setup_game.story.hints[i].text : "";
    sectionDiv2.className = "hints";
    sectionDiv2.innerHTML = `
          <p class="tab5">{</p>
          <p class="tab6">"id":<input id="hint${i}-id" value="${id}" type="text"></p>
          <p class="tab6">"filename":<input id="hint${i}-filename" value="${filename}" type="text"></p>
          <p class="tab6">"fileext":<input id="hint${i}-fileext" value="${fileext}" type="text"></p>
          <p class="tab6">"title":<input id="hint${i}-title" value="${title}" type="text"></p>
          <p class="tab6">"text":<input id="hint${i}-text" value="${text}" type="text"></p>
          <p class="tab5">},</p>
          `;
    sectionsContainer.appendChild(sectionDiv2);
  }

  let curReflectionQuestionsCount =
    document.getElementById(`ref-ques-count`).value;

  let refQuestions = "<section id='ref-section'> ";
  for (let refQ = 0; refQ < curReflectionQuestionsCount; refQ++) {
    const ref_quest = game.game.setup_game.reflection_questions.ol.li[refQ];
    refQuestions += `<input id="ref-quest${refQ}" value="${ref_quest}" type="text">`;
  }
  refQuestions += "</section>";

  //reload ref questions section
  document.getElementById("ref-ques-count").addEventListener("input", () => {
    let sectionRefQuest = document.getElementById("ref-section");
    curReflectionQuestionsCount =
      document.getElementById(`ref-ques-count`).value;

    let part = "";
    for (let refQ = 0; refQ < curReflectionQuestionsCount; refQ++) {
      const ref_quest =
        refQ < reflectionQuestionsCount
          ? game.game.setup_game.reflection_questions.ol.li[refQ]
          : "";
      part += `<input id="ref-quest${refQ}" value="${ref_quest}" type="text">`;
    }

    sectionRefQuest.innerHTML = part;
  });

  let temp3 = [
    ["]", "tab4"],
    ["}", "tab3"],
    ['"video": {', "tab3"],
    [
      `"src":<input id="video-src" value="${game.game.setup_game.video["-src"]}" type="text">`,
      "tab4",
    ],
    [
      `"#text":<input id="video-text" value="${game.game.setup_game.video["#text"]}" type="text">`,
      "tab4",
    ],
    ["},", "tab3"],
    [
      `"#game_prepare_instructions":<input id="game-prepare-instructions" value="${game.game.setup_game.game_prepare_instructions}" type="text">`,
      "tab3",
    ],
    [
      `"#game_prepare_instructions_video":<input id="game-prepare-instructions-video" value="${game.game.setup_game.game_prepare_instructions_video}" type="file" accept = ".mp4">`,
      "tab3",
    ],
    [
      `"#game_resources":<input id="game-resources"  value="${game.game.setup_game.game_resources}" type="file" accept=".zip,.rar">`,
      "tab3",
    ],
    ['"#teacher_tool": {', "tab3"],
    [
      `"#timer": <input id="timer" value="${game.game.setup_game.teacher_tool.timer}" type="text">`,
      "tab4",
    ],
    [
      `"#hints_number": <input id="hints-number" value="${game.game.setup_game.teacher_tool.hints_number}" type="text">`,
      "tab4",
    ],
    [
      `"#music": <input id="music" value="${game.game.setup_game.teacher_tool.music}" type="checkbox">`,
      "tab4",
    ],
    ['"#start_timer": {', "tab4"],
    [
      `"-start_timer": <input id="start-timer" value="${game.game.setup_game.teacher_tool.start_timer["-start_timer"]}" type="text">`,
      "tab5",
    ],
    [
      `"#text": <input id="timer-text" value="${game.game.setup_game.teacher_tool.start_timer["#text"]}" type="text">`,
      "tab5",
    ],
    ["}", "tab4"],
    ["},", "tab3"],
    ['"reflection_questions": {', "tab3"],
    ['"ol": {', "tab4"],
    [`"li": [ ${refQuestions}`, "tab5"],
    ["]", "tab4"],
    ["},", "tab3"],
    [
      `"extra_requirements":<input id="extra-req" value="${game.game.setup_game.extra_requirements}" type="text">`,
      "tab3",
    ],
    ["},", "tab2"],
    ['"extensions": [<input id="extensions" type="text">', "tab2"],
    ["]", "tab2"],
    ["}", "tab1"],
  ];

  temp3.forEach((pair) => {
    let text = pair[0];
    let tab = pair[1];
    let newParagraph = document.createElement("p");
    newParagraph.innerHTML = text;
    newParagraph.className = tab;
    sectionsContainer.appendChild(newParagraph);
  });

  const sectionForButton = document.createElement("section");
  sectionForButton.innerHTML =
    '<button id="create-json"> Create json </button>';
  sectionsContainer.appendChild(sectionForButton);

  function createJsonFile() {
    console.log("inside");
    const gameId = document.getElementById("game-id").value;
    const modes = document.getElementById("modes").value;
    const name = document.getElementById("game-name").value;
    const status = document.getElementById("game-status").value;
    const default_language = document.getElementById("def-lan").value;

    const logo_internal = document.getElementById("logo-internal").value;
    const logo_data = document.getElementById("logo-data").value;
    const logo_size = document.getElementById("logo-size").value;
    const logo_url = document.getElementById("logo-url").value;
    const category = document.getElementById("game-category").value;
    const access_key = document.getElementById("game-access-key").value;
    const pauses_number = document.getElementById("game-pauses-number").value;
    const group_size = document.getElementById("game-group-size").value;
    const gamers_age = document.getElementById("game-gamers-age").value;

    let logo = {
      internal: logo_internal,
      data: logo_data,
      size: logo_size,
      url: logo_url,
    };

    let lockers = [];

    for (let lock = 0; lock < inputLockerCount; lock++) {
      const id = document.getElementById(`locker-id${lock}`).value;
      const logo = document.getElementById(`locker-logo${lock}`).value;
      const comment = document.getElementById(`locker-comment${lock}`).value;
      const type = document.getElementById(`locker-type${lock}`).value;
      const result = document.getElementById(`locker-result${lock}`).value;
      const attempts_number = document.getElementById(
        `locker-attempts-number${lock}`
      ).value;
      const show_attempts = document.getElementById(
        `locker-show-attempts${lock}`
      ).value;
      const points = document.getElementById(`locker-points${lock}`).value;
      const lock_regex = document.getElementById(
        `locker-lock-regex${lock}`
      ).value;
      const force_order = document.getElementById(
        `locker-force-order${lock}`
      ).value;
      const enable_after = document.getElementById(
        `locker-enable-after${lock}`
      ).value;

      let resources = [];
      for (let res = 0; res < newLockerResources[lock]; res++) {
        const link = document.getElementById(
          `resource${lock}-link${res}`
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

    const story_text = document.getElementById("story-text").value;
    const story_video = document.getElementById("story-video").value;
    let story_resources = [];
    let story_hints = [];
    for (let lock = 0; lock < lockerCount; lock++) {
      const id_story = document.getElementById(
        `story${lock}-resource-id`
      ).value;
      const filename_internal_story = document.getElementById(
        `story${lock}-resource-filename-internal`
      ).value;
      const filename_data_story = document.getElementById(
        `story${lock}-resource-filename-data`
      ).value;
      const filename_size_story = document.getElementById(
        `story${lock}-resource-filename-size`
      ).value;
      const filename_url_story = document.getElementById(
        `story${lock}-resource-filename-url`
      ).value;
      const fileext_story = document.getElementById(
        `story${lock}-fileext`
      ).value;
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

      const id_hint = document.getElementById(`hint${lock}-id`).value;
      const filename_hint = document.getElementById(
        `hint${lock}-filename`
      ).value;
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
    // const game_prepare_instructions_video = document.getElementById(
    //   `game-prepare-instructions-video`
    // ).file[0].name;
    const game_prepare_instructions_video = "stuff";
    // const game_resources =
    //   document.getElementById(`game-resources`).file[0].name;
    const game_resources = "stuff 2 ";
    const teacher_timer = document.getElementById(`timer`).value;
    const teacher_hints_number = document.getElementById(`hints-number`).value;
    const teacher_music = document.getElementById(`music`).value;
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
    for (let refQ = 0; refQ < curReflectionQuestionsCount; refQ++) {
      ref_ques_arr.push(document.getElementById(`ref-quest${refQ}`).value);
    }

    console.log(ref_ques_arr);

    let reflection_questions = {
      ol: {
        li: ref_ques_arr,
      },
    };

    const extra_requirements = document.getElementById(`extra-req`).value;

    let game = {
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
          extra_requirements: extra_requirements,
        },
        extensions: [],
      },
    };

    const jsonString = JSON.stringify(game);

    const blob = new Blob([jsonString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "new_game.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  document.getElementById("create-json").addEventListener("click", (event) => {
    event.preventDefault();

    createJsonFile();
  });
}
