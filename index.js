var playButton = document.querySelector(".play-pause");
var timerEl = document.querySelector("#timer");
var currentEl = document.querySelector("#current-activity");
var nextEl = document.querySelector("#next-activity");
var audio = new Audio('./assets/243020__plasterbrain__game-start.ogg');

var time;
var restTime = 10;
var exerciseCount = 0;
var workout = [
  {exercise: "jumping jacks", duration: 30},
  {exercise: "wall sit", duration: 30},
  {exercise: "push ups", duration: 30},
  {exercise: "crunches", duration: 30},
  {exercise: "step ups", duration: 30},
  {exercise: "squats", duration: 30},
  {exercise: "tricep dips", duration: 30},
  {exercise: "plank", duration: 30},
  {exercise: "high knees", duration: 30},
  {exercise: "lunges", duration: 30},
  {exercise: "push up and rotation", duration: 30},
  {exercise: "side plank", duration: 30},
  {exercise: "other side plank", duration: 30}
]

let wakeLock = null;

// create an async function to request a wake lock
try {
  wakeLock = await navigator.wakeLock.request('screen');
  statusElem.textContent = 'Wake Lock is active!';
} catch (err) {
  // The Wake Lock request has failed - usually system related, such as battery.
  statusElem.textContent = `${err.name}, ${err.message}`;
}

function main() {

  playButton.style.display = "none";

  currentEl.innerHTML = workout[exerciseCount].exercise;
  nextEl.innerHTML = "";
  time = workout[exerciseCount].duration;
  restFlag = false;

  var doWork = setInterval(function() {

  // if (time = 3) {
  //   audio.play();
  // }

  if (time < 0) {

    if (!restFlag) {
      time = restTime;
      timerEl.innerHTML = "-";
      restFlag = true;
      currentEl.innerHTML = "rest";
      nextEl.innerHTML = "next: " + workout[exerciseCount + 1].exercise;
    } else if (restFlag) {
      restFlag = false;
      exerciseCount++;
      currentEl.innerHTML = workout[exerciseCount].exercise;
      nextEl.innerHTML = "";
      time = workout[exerciseCount].duration;
    }
  }

  if (exerciseCount >= workout.length - 1) {
    clearInterval(doWork);
    currentEl.innerHTML = "end";
    timerEl.innerHTML = "-";
    nextEl.innerHTML = "";

    wakeLock.release()
    .then(() => {
      wakeLock = null;
    });
  }

  timerEl.innerHTML = time;

  time--;

}, 1000)};