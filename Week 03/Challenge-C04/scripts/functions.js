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
          
/*Receives the event of Listener and attribute (string) */             
function getValueOf(atrr, event) {
    return event.target.getAttribute(atrr);
}

/*Select the object of the item (tag) that was clicked, keydown or touch.
The returned object contains all the attributes where the key that
 was pressed is located (includes classes, ids, etc) */
function getObjectOf(tag, atrr, event) {
    var value = getValueOf(atrr, event);
    var objectSelector = document.querySelector(`${tag}[${atrr}="${value}"]`);
    if (!objectSelector) {
        return; 
        } else {
         return objectSelector;}
  }
 
 /*----------show musical notes ------------- */
 function showMusicalNotes (e) {
    if (e.keyCode === undefined) {
      let note = e.target.getAttribute("id");
      if (notes.includes(note)) {
        showText(); 
        document.getElementById("musicalnote").innerHTML =`${note}`;
        let indexNote = notes.indexOf(note)
        document.getElementById("musicalnote").style.color = colors[indexNote];
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

/*-----playSound function-----*/
function playSound (keycode) {
    var audio = document.querySelector(`audio[data-key="${keycode}"]`);
    if (audio === null) return;
    audio.currentTime = 0; // prevent overlapping in sounds
    audio.volume = 1;
    audio.play();
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
