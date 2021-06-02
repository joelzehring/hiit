var timerEl = document.querySelector("#timer");
var currentEl = document.querySelector("#current-activity");
var nextEl = document.querySelector("#next-activity");
var time;
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

var main = setInterval(function() {
  console.log("Hello");
  exerciseCount++;
  if (exerciseCount >= workout.length - 1) {
    clearInterval(main);
  }
}, 1000);