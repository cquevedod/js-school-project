var keys = Array.from(document.querySelectorAll('.key')); /*Save in an array, the objects whose class is "key" */
let keycodes = keys.map((key) => key.dataset.key); /*Obtain the data keys and save in an array */
let notes = keys.map((key) => key.id); /*Save the musical notes in array "notes" */

let colors = ["aqua", "chartreuse", "blue", "red", "mediumblue", "yellow",
              "orangered", "dodgerblue", "deepskyblue", "deeppink", "greenyellow",
              "spreengreen", "aquamarine", "coral", "darkgrey", "tomato", "sporinggreen",
              "palegreen", "#ff0084", "#bce0ee", "#ff920a", "1f3b08", "ff4805", "#207ce5" ];


/*--------------------playSound on mousedown------------- */
  keys.forEach(key => {
    key.addEventListener('mousedown', function (e) { 
        keyCode = e.target.getAttribute("data-key");
        var keynumber = document.querySelector(`.key[data-key="${keyCode}"]`);
        var audio = document.querySelector(`audio[data-key="${keyCode}"]`);
        if (!keynumber) return;
        if (audio === null) return;
        audio.currentTime = 0; // prevent overlapping in sounds
        audio.volume = 1;
        audio.play();
        keynumber.classList.add('pressed');
      
    });

    /*--------------------FadeVolume on MouseUp------------- */
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
            var volume = 100;
            var fadeVolume = setInterval(function() {
                volume -= 10;
                audio.volume = volume / 100;
                console.log(volume);
                if(volume === 0) {
                    clearInterval(fadeVolume);
                  
                }  
            }, 20);
          
        } 
    });
  
  });

  /*--------------------playSound on keydown------------- */
  document.addEventListener('keydown', function (e) {
      // avoid repeating keystroke.
      let repeat = event.repeat;
      if (repeat) { return; }
      e = e || window.event;
      var key = e.which || e.keyCode;
      var keystring = key.toString();               /*convert datakey to String to properly compare with strings of object keycodes */
      console.log(keycodes.includes(keystring));
      if(keycodes.includes(keystring)) {
         var keynumber = document.querySelector(`.key[data-key="${key}"]`);
         var audio = document.querySelector(`audio[data-key="${key}"]`);
         if (!keynumber) return;
         if (audio === null) return;
         audio.volume = 1;
         audio.currentTime = 0;
         audio.play();
         keynumber.classList.add('pressed');
       } else {
            return; // Avoid error when off piano key is pressed
       }
  
   });

  /*--------------------FadeVolume on keyup------------- */
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
            var volume = 100;
            var fadeVolume = setInterval(function(){
                volume -= 10;
                audio.volume = volume / 100;
                console.log(volume);
                if(volume === 0) {
                  clearInterval(fadeVolume);

                }
            }, 20);
           }  
       }
   
   });

   /*--------------------show musical notes ------------- */
function showMusicalNotes (e) {
  if (e.keyCode === undefined) {
      let note = e.target.getAttribute("id");
      if (notes.includes(note)) {
        document.getElementById("musicalnote").innerHTML =`${note}`;
        document.getElementById("musicalnote").style.color = colors[notes.indexOf(note)];

      } else {
        return;
        }

  } else {
    e = e || window.event;
    var key = e.which || e.keyCode;
    var keystring = key.toString();
    if (keycodes.includes(keystring)) {
      var noteindex =  keycodes.indexOf(keystring);
      console.log(noteindex);
      var musicalnote = notes[noteindex]; 
      console.log(`La nota correspondiente es ${musicalnote}`);
      document.getElementById("musicalnote").innerHTML =`${musicalnote}`;
      document.getElementById("musicalnote").style.color = colors[noteindex];
    } else {
        return;
    }
  }

}


  document.addEventListener("keydown", showMusicalNotes);
  document.addEventListener('mousedown', showMusicalNotes);


