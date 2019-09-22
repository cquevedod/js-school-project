/*Save in an array, the objects whose class is "key" */
var keys = Array.from(document.querySelectorAll('.key'));
/*Obtain the data keys and save in an array */ 
let keycodes = keys.map((key) => key.dataset.key);
/*Save the musical notes in array "notes" */ 
let notes = keys.map((key) => key.id); 

let colors = ["aqua", "chartreuse", "blue", "red",
              "mediumblue", "yellow", "orangered", 
              "dodgerblue", "deepskyblue", "deeppink",
              "greenyellow", "spreengreen", "aquamarine",
               "coral", "darkgrey", "tomato", "sporinggreen",
               "palegreen", "#ff0084", "#bce0ee", "#ff920a",
               "1f3b08", "ff4805", "#207ce5" ];

function playSound (keycode) {
      var audio = document.querySelector(`audio[data-key="${keycode}"]`);
      if (audio === null) return;
      audio.currentTime = 0; // prevent overlapping in sounds
      audio.volume = 1;
      audio.play();
}             

/*-------------playSound on mousedown--------- */
  keys.forEach(key => {
    key.addEventListener('mousedown', function (e) { 
        keyCode = e.target.getAttribute("data-key");
        var keynumber = document.querySelector(`.key[data-key="${keyCode}"]`);
        if (!keynumber) return;
        keynumber.classList.add('pressed');
        playSound(keyCode);

    });

    /*---------decreaseVolume on MouseUp------ */
    key.addEventListener('mouseup', function (e) { 
        keyCode = e.target.getAttribute("data-key");
        var keynumber = document.querySelector(`.key[data-key="${keyCode}"]`);
        var audio = document.querySelector(`audio[data-key="${keyCode}"]`);
        if (!keynumber) return;
        if (audio === null) return;
        keynumber.classList.remove('pressed');
        var checkBox = document.getElementById("sustain");
        if (checkBox.checked == true) {
            audio.play();
        } else {
          decreaseVolume(audio);         
        } 
    });

    key.addEventListener('touchstart', function(e) {
        e.preventDefault();
        let repeat = event.repeat;
        if (repeat) { return; }
        keyCode = e.target.getAttribute("data-key");
        var keynumber = document.querySelector(`.key[data-key="${keyCode}"]`);
        if (!keynumber) return;
        keynumber.classList.add('pressed');
        playSound(keyCode);
    })

    key.addEventListener('touchend', function (e) {
      e.preventDefault(); 
      keyCode = e.target.getAttribute("data-key");
      var keynumber = document.querySelector(`.key[data-key="${keyCode}"]`);
      var audio = document.querySelector(`audio[data-key="${keyCode}"]`);
      if (!keynumber) return;
      if (audio === null) return;
      keynumber.classList.remove('pressed');
      var checkBox = document.getElementById("sustain");
      if (checkBox.checked == true) {
          audio.play();
      } else {
        decreaseVolume(audio);         
      } 
  });

//   key.addEventListener('touchmove', function(e) {
//     e.preventDefault();
//     let repeat = event.repeat;
//     if (repeat) { return; }
//     keyCode = e.target.getAttribute("data-key");
//     var keynumber = document.querySelector(`.key[data-key="${keyCode}"]`);
//     var audio = document.querySelector(`audio[data-key="${keyCode}"]`);
//     if (!keynumber) return;
//     if (audio === null) return;
//     audio.currentTime = 0; // prevent overlapping in sounds
//     audio.volume = 1;
//     audio.play();
//     keynumber.classList.add('pressed');
// })
  
  });

  /*------------playSound on keydown----------- */
  document.addEventListener('keydown', function (e) {
      // avoid repeating keystroke.
      let repeat = event.repeat;
      if (repeat) { return; }
      e = e || window.event;
      var key = e.which || e.keyCode;
       /*convert datakey to String to properly compare with strings of object keycodes */
      var keystring = key.toString();              
      console.log(keycodes.includes(keystring));
      if(keycodes.includes(keystring)) {
         var keynumber = document.querySelector(`.key[data-key="${key}"]`);
         if (!keynumber) return;
         keynumber.classList.add('pressed');
         playSound(key);
       } else {
            return; // Avoid error when off piano key is pressed
       }
  
   });

  /*---------decreaseVolume on keyup--------- */
  document.addEventListener('keyup', function(e){
      var key = e.which || e.keyCode;
      var keystring = key.toString(); 
      if(keycodes.includes(keystring)){
         var keynumber = document.querySelector(`.key[data-key="${key}"]`);
         var audio = document.querySelector(`audio[data-key="${key}"]`);
         if (!keynumber) return;
         if (audio == null) return;
         keynumber.classList.remove('pressed');
         var checkBox = document.getElementById('sustain');
         if (checkBox.checked == true) {
            audio.play();
         } else {
            decreaseVolume(audio);  
           }  
       }
   
   });

  

/*--show musical notes when mousedown, keydown or touch a key----*/
   document.addEventListener("keydown", showMusicalNotes);
   document.addEventListener('mousedown', showMusicalNotes);
   document.addEventListener("touchstart", showMusicalNotes);
   

 /*----------show musical notes ------------- */
function showMusicalNotes (e) {
      if (e.keyCode === undefined) {
        let note = e.target.getAttribute("id");
        if (notes.includes(note)) {
          showText(); 
          document.getElementById("musicalnote").innerHTML =`${note}`;
          let indexNote = notes.indexOf(note)
          document.getElementById("musicalnote").style.color = colors[indexNote];
          // document.getElementById(`${note}`).style.color = colors[indexNote];

        } else { return; }

      } else {
        e = e || window.event;
        var key = e.which || e.keyCode;
        var keystring = key.toString();
        if (keycodes.includes(keystring)) {
          showText();
          var indexNote =  keycodes.indexOf(keystring);
          console.log(indexNote);
          var musicalnote = notes[indexNote]; 
          document.getElementById("musicalnote").innerHTML =`${musicalnote}`;
          document.getElementById("musicalnote").style.color = colors[indexNote];
          // document.getElementById(`${musicalnote}`).style.color = colors[indexNote];
        } else { return; }
      }

 }

/*-----decreaseVolume function (piano default mode)-----*/
function decreaseVolume (sound) {
      if (sound === null) return;
      var volume = 100;
      var decreaseVol = setInterval(function() {
          volume -= 10;
          sound.volume = volume / 100;
          console.log(volume);
          if(volume === 0) {
            clearInterval(decreaseVol);       
          }  
      }, 20);
}

/*------show an indication text about musical notes------------- */
function showText() {
    document.getElementById("message").innerHTML =`See below the notes pressed`;
}



