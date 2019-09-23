/*-------------playSound on mousedown--------- */
  keys.forEach(key => {
    key.addEventListener('mousedown', function (e) { 
        keyCode = getValueOf("data-key", e);
        var pianoKey = getObjectOf(".key", "data-key", e);
        pianoKey.classList.add('pressed');
        playSound(keyCode);
    });

    /*---------decreaseVolume on MouseUp------ */
    key.addEventListener('mouseup', function (e) { 
        keyCode = e.target.getAttribute("data-key");
        var pianoKey = document.querySelector(`.key[data-key="${keyCode}"]`);
        var audio = document.querySelector(`audio[data-key="${keyCode}"]`);
        if (!pianoKey) return;
        if (audio === null) return;
        pianoKey.classList.remove('pressed');
        var checkBox = document.getElementById('slideThree');
        if (checkBox.checked == true) {
            audio.play();
        } else {
          decreaseVolume(audio);         
        } 
    });

    /*-------------playSound on touchstart--------- */
    key.addEventListener('touchstart', function(e) {
        e.preventDefault();
        let repeat = event.repeat;
        if (repeat) { return; }
        keyCode = e.target.getAttribute("data-key");
        var pianoKey = document.querySelector(`.key[data-key="${keyCode}"]`);
        if (!pianoKey) return;
        pianoKey.classList.add('pressed');
        playSound(keyCode);
    })

    /*-------------decreaseVolume on touchstart--------- */
    key.addEventListener('touchend', function (e) {
        e.preventDefault(); 
        keyCode = e.target.getAttribute("data-key");
        var pianoKey = document.querySelector(`.key[data-key="${keyCode}"]`);
        var audio = document.querySelector(`audio[data-key="${keyCode}"]`);
        if (!pianoKey) return;
        if (audio === null) return;
        pianoKey.classList.remove('pressed');
        var checkBox = document.getElementById('slideThree');
        if (checkBox.checked == true) {
            audio.play();
        } else {
          decreaseVolume(audio);         
        } 
    });
    
  });

  /*------------playSound on keydown----------- */
  document.addEventListener('keydown', function (e) {
        // avoid repeating keystroke.
        let repeat = event.repeat;
        if (repeat) { return; }
        e = e || window.event;
        var key = e.which || e.keyCode;
        var keystring = key.toString();              
        console.log(keycodes.includes(keystring));
        if(keycodes.includes(keystring)) {
          var pianoKey = document.querySelector(`.key[data-key="${key}"]`);
          if (!pianoKey) return;
          pianoKey.classList.add('pressed');
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
          var pianoKey = document.querySelector(`.key[data-key="${key}"]`);
          var audio = document.querySelector(`audio[data-key="${key}"]`);
          if (!pianoKey) return;
          if (audio == null) return;
          pianoKey.classList.remove('pressed');
          var checkBox = document.getElementById('slideThree');
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
   




