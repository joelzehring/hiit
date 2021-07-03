var playButton = document.querySelector(".play-pause");
var timerEl = document.querySelector("#timer");
var currentEl = document.querySelector("#current-activity");
var nextEl = document.querySelector("#next-activity");
var audio = new Audio('./assets/243020__plasterbrain__game-start.ogg');
let playSound;
var time;
var restTime = 10;
var exerciseTime = 30;
var exerciseCount = 0;
var workout = [
  {exercise: "jumping jacks", duration: exerciseTime},
  {exercise: "wall sit", duration: exerciseTime},
  {exercise: "push ups", duration: exerciseTime},
  {exercise: "crunches", duration: exerciseTime},
  {exercise: "step ups", duration: exerciseTime},
  {exercise: "squats", duration: exerciseTime},
  {exercise: "tricep dips", duration: exerciseTime},
  {exercise: "plank", duration: exerciseTime},
  {exercise: "high knees", duration: exerciseTime},
  {exercise: "lunges", duration: exerciseTime},
  {exercise: "push up and rotation", duration: exerciseTime},
  {exercise: "side plank", duration: exerciseTime},
  {exercise: "other side plank", duration: exerciseTime}
]

async function main() {

  let lock

  try {
    lock = await navigator.wakeLock.request('screen');
  } catch (err) {
    // Error or rejection
    console.log('Wake Lock error: ', err);
  }

  playButton.style.display = "none";

  currentEl.innerHTML = workout[exerciseCount].exercise;
  nextEl.innerHTML = "";
  time = workout[exerciseCount].duration;
  restFlag = false;

  var doWork = setInterval(function() {

  if (time > -1) {

    timerEl.innerHTML = time;
    time--;

  } else {

    if (exerciseCount === workout.length - 1) {
      clearInterval(doWork);
      currentEl.innerHTML = "end";
      timerEl.innerHTML = "-";
      nextEl.innerHTML = "";
  
      lock.release()
      .then(() => {
        lock = null;
      });
    } else if (!restFlag) {
      time = restTime;
      timerEl.innerHTML = "-";
      restFlag = true;
      currentEl.innerHTML = "rest";
      nextEl.innerHTML = "next: " + workout[exerciseCount + 1].exercise;
    } else if (restFlag && exerciseCount < workout.length) {
      time = workout[exerciseCount].duration;
      timerEl.innerHTML = "-";
      restFlag = false;
      exerciseCount++;
      currentEl.innerHTML = workout[exerciseCount].exercise;
      nextEl.innerHTML = "";
    }      
  }
  
    if (time === -1) {
      playSound = audio.play();
    }

}, 1000)};

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
});