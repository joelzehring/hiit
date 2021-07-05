var exListEl = document.querySelector(".exercise-list");
var exDisplayEl = document.querySelector(".exercise-display");
var exUnorderedEl = document.querySelector(".exercises-unordered");
var timerEl = document.querySelector("#timer");
var currentEl = document.querySelector("#current-activity");
var nextEl = document.querySelector("#next-activity");
var audio = new Audio('./assets/243020__plasterbrain__game-start.ogg');
let playSound;
var time;
var restTime = 10;
var exerciseTime = 30;
var exerciseCount = 0;
var workouts = [
  {
    id: 1,
    title: "OG",
    tasks: [
      { exercise: "jumping jacks", duration: exerciseTime },
      { exercise: "wall sit", duration: exerciseTime },
      { exercise: "push ups", duration: exerciseTime },
      { exercise: "crunches", duration: exerciseTime },
      { exercise: "step ups", duration: exerciseTime },
      { exercise: "squats", duration: exerciseTime },
      { exercise: "tricep dips", duration: exerciseTime },
      { exercise: "plank", duration: exerciseTime },
      { exercise: "high knees", duration: exerciseTime },
      { exercise: "lunges", duration: exerciseTime },
      { exercise: "push up and rotation", duration: exerciseTime },
      { exercise: "side plank", duration: exerciseTime },
      { exercise: "other side plank", duration: exerciseTime }
    ]
  },
  {
    id: 2,
    title: "Abs",
    tasks: [
      { exercise: "crunches", duration: exerciseTime },
      { exercise: "plank", duration: exerciseTime },
      { exercise: "box jumps", duration: exerciseTime },
      { exercise: "side plank", duration: exerciseTime },
      { exercise: "other side plank", duration: exerciseTime },
      { exercise: "russian twist", duration: exerciseTime }
    ]
  }
]

exDisplayEl.style.display = "none";

workouts.forEach(item => {
  var exerciseCard = document.createElement("div");
  exerciseCard.classList.add("row");
  exerciseCard.innerHTML = `
    <div class="col s12">
      <div class="card grey darken-3">
        <div class="card-content white-text">
          <span class="card-title">${item.title}</span>
        </div>
        <div class="card-action">
          <a class="play-exercise"><i class="material-icons" data-id="${item.id}">play_arrow</i></a>
          <a class="edit-exercise"><i class="material-icons" data-id="${item.id}">edit</i></a>
        </div>
      </div>
    </div>
  `;
  exListEl.appendChild(exerciseCard);
});

async function main(exerciseId) {

  let lock

  try {
    lock = await navigator.wakeLock.request('screen');
  } catch (err) {
    // Error or rejection
    console.log('Wake Lock error: ', err);
  }

  exListEl.style.display = "none";
  exDisplayEl.style.display = "block";

  var workout = workouts.filter((item) => item.id == exerciseId)[0];

  currentEl.innerHTML = workout.tasks[exerciseCount].exercise;
  nextEl.innerHTML = "";
  time = workout.tasks[exerciseCount].duration;
  restFlag = false;

  var doWork = setInterval(function () {

    if (time > -1) {

      timerEl.innerHTML = time;
      time--;

    } else {

      if (exerciseCount === workout.tasks.length - 1) {
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
        nextEl.innerHTML = "next: " + workout.tasks[exerciseCount + 1].exercise;
      } else if (restFlag && exerciseCount < workout.tasks.length) {
        time = workout.tasks[exerciseCount].duration;
        timerEl.innerHTML = "-";
        restFlag = false;
        exerciseCount++;
        currentEl.innerHTML = workout.tasks[exerciseCount].exercise;
        nextEl.innerHTML = "";
      }
    }

    if (time === -1) {
      playSound = audio.play();
    }

  }, 1000)
};

document.addEventListener("click", function(e) {
  main(e.target.dataset.id);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});