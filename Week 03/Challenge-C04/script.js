const playSound = e => {

  let repeat = event.repeat;
  if (repeat) {
    return;
  }

  // let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
  //       key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  let audio, key;

  if (e.keyCode === undefined) {
    keyCode = e.target.getAttribute("data-key");
    key = document.querySelector(`.key[data-key="${keyCode}"]`);
    audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  } else {
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  }

  if (!key) return;
  audio.currentTime = 0; //Clear the audio before it plays to avoid overlapping
 key.classList.add('pressed');
  

  audio.play();
  console.log("into playSound");

} // end function playSound


const stopSound = e => {
  // let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
  //       key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  let audio, key;

  if (e.keyCode === undefined) {
    keyCode = e.target.getAttribute("data-key");
    key = document.querySelector(`.key[data-key="${keyCode}"]`);
    audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  } else {
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  }


  if (!key) return;
  audio.currentTime = 0; //Clear the audio before it plays to avoid overlapping
  console.log("into stopSound");

}

const clearAnimation = e => {

  let repeat = event.repeat;
  if (repeat) return;

  if (e.propertyName !== 'transform') return;

 e.target.classList.remove('pressed');


  console.log("into clearAnimation");
} //end function clearAnimation


let keys = Array.from(document.querySelectorAll('.key'));

console.log(keys);

keys.forEach(key => {
  key.addEventListener('mousedown', playSound);
  //  key.addEventListener('mouseup', stopSound);
  key.addEventListener('transitionend', clearAnimation);
});


window.addEventListener('keydown', playSound);



