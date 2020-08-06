const questionCount = [1, 5, 5, 5, 5, 5];

const lengthstring = document.getElementById('progress');

progress = lengthstring.innerHTML.split(",")

const moduleElements = document.getElementById('modules-container').children;

for (let i = 0; i < moduleElements.length; i++) {
  let progressNumber = moduleElements[i].getElementsByClassName('progress')[0];
  let progressBar = moduleElements[i].getElementsByClassName('progress-bar')[0];

  let completion = Math.round(progress[i] / questionCount[i] * 100) || 0;
  progressNumber.innerHTML = progressBar.style.width = `${completion}%`;
}

document.getElementById('progress').remove();
