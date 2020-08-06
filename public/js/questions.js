function checkBlanks(module, question) {
  let correct = true;
  for (const input of event.path[1].getElementsByTagName('input')) {
    if (input.value === input.placeholder) {
      input.classList.add('correct');
      input.classList.remove('incorrect');
      input.disabled = true;
    } else {
      input.classList.add('incorrect');
      input.classList.remove('correct');
      correct = false;
    }
  }
  if (correct) {
    event.target.disabled = true;
    axios.get('/updatedb', {
      params: {
        module: module,
        question: question
      }
    });
  }
}
