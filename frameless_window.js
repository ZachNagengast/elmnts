function initSoundButton(buttonId, sound) {
  var elem = document.getElementById(buttonId);
  if (!elem)
    return;
  elem.src = sound + "-stop.png";

  var currentSound = new Audio(sound + ".mp3");
  var vol = document.getElementById(sound+ "-vol");
  vol.style.visibility='hidden';
  elem.onclick = function() {
      if (currentSound.duration > 0 && !currentSound.paused) {
        //sound stopped
        console.log("Stopping: " + sound);
        elem.textContent = "Play " + sound;
        vol.style.visibility='hidden';
        elem.src = sound + "-stop.png";
        currentSound.pause();
      } else{
        //sound started
        console.log("Playing: " + sound + " at " + currentSound.volume);
        elem.textContent = "Stop " + sound;
        vol.style.visibility='visible';
        elem.src = sound + "-play.png";
        currentSound.play();
        var loop = setInterval(
          function() {
            console.log(currentSound.currentTime);
            currentSound.volume = vol.value/100;
            if (currentSound.currentTime > currentSound.duration - 1 ) {
              currentSound.currentTime = 0;
              console.log("Restarted: " + sound);
            }
            if (currentSound.paused) {
              clearInterval(loop);
            }
          }, 250);
    }
  };
}


function updateCheckbox() {
  var top_checkbox = document.getElementById("top-box");
  var bottom_checkbox = document.getElementById("bottom-box");
  var left_checkbox = document.getElementById("left-box");
  var right_checkbox = document.getElementById("right-box");
  if (top_checkbox.checked || bottom_checkbox.checked) {
    left_checkbox.disabled = true;
    right_checkbox.disabled = true;
  } else if (left_checkbox.checked || right_checkbox.checked) {
    top_checkbox.disabled = true;
    bottom_checkbox.disabled = true;
  } else {
    left_checkbox.disabled = false;
    right_checkbox.disabled = false;
    top_checkbox.disabled = false;
    bottom_checkbox.disabled = false;
  }
}

function initTitlebar(checkboxId, titlebar_name, titlebar_icon_url, titlebar_text) {
  // var elem = document.getElementById(checkboxId);
  // if (!elem)
  //   return;
  // elem.onclick = function() {
  // }

  addTitlebar(titlebar_name, titlebar_icon_url, titlebar_text);
  
}

window.onfocus = function() { 
  console.log("focus");
  focusTitlebars(true);
};

window.onblur = function() { 
  console.log("blur");
  focusTitlebars(false);
};

window.onresize = function() {
  updateContentStyle();
};

window.onload = function() {

  // initTitlebar("top-box", "top-titlebar", "elmnts-16.png", "Elmnts");
  initTitlebar("top-box", "top-titlebar", "", "");
  initSoundButton("rain-button", "rain");
  initSoundButton("fire-button", "fire");
  initSoundButton("river-button", "river");
  initSoundButton("forest-button", "forest");

  initDonate("donateButton");
  
  updateContentStyle();
};

function initDonate(donateId) {
  var elem = document.getElementById(donateId);
  if (!elem)
    return;
  elem.onclick = function() {
    console.log("donate pressed");
    google.payments.inapp.buy({
    parameters: {env: 'prod'},
    jwt: "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwMjExODYxNTc3NTI0NTkzODUyOCIsImF1ZCI6Ikdvb2dsZSIsInR5cCI6Imdvb2dsZS9wYXltZW50cy9pbmFwcC9pdGVtL3YxIiwiaWF0IjoxMzg3MTc1NTU5LCJleHAiOjEzODcyNjE5NTksInJlcXVlc3QiOnsiY3VycmVuY3lDb2RlIjoiVVNEIiwicHJpY2UiOiIuOTkiLCJuYW1lIjoiRWxtbnRzIERvbmF0aW9uICIsInNlbGxlckRhdGEiOiJzb21lIG9wYXF1ZSBkYXRhIiwiZGVzY3JpcHRpb24iOiJUaGFua3MgZm9yIHlvdXIgYXBwcmVjaWF0aW9uLCB5b3VcdTAwMjdyZSBhd2Vzb21lISJ9fQ.m3B45CBQJbs5v0mLCJjay7qFG1Xx3_t8AfMUAEiIohI",
    success: function() { 
      // window.alert('Thank you for donating!');
      console.log("donate succeeded");
    },
    failure: function() { }
  })
};
 
}
