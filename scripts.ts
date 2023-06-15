/* eslint-disable no-undef */
/* eslint-disable max-len */
// Iterating the questions and display them into UI
// eslint-disable-next-line no-use-before-define, no-undef

/* eslint-disable max-len */
// Creating an array with objects - each object contains an interview question and its status (true or false)
// eslint-disable-next-line no-unused-vars


const interviewQuestions = [
  { question: 'Explain event delegation', status: true },
  { question: "What's the difference between a variable that is: null, undefined or undeclared?", status: true },
  { question: 'What are the differences between ES6 class and ES5 function constructors?', status: false },
  { question: 'Can you describe the main difference between the Array.forEach() loop and Array.map() methods and why you would pick one versus the other?', status: true },
  { question: "Explain 'hoisting'", status: true },
  { question: 'What is the difference between while and do-while loops in JavaScript?', status: false },
  { question: 'What is the difference between == and ===?', status: true },
  { question: 'What are the differences between variables created using let, var or const?', status: true },
  { question: 'How can you share code between files?', status: false },
];

iterateAllQuestions(interviewQuestions);

interface InterviewQuestionProps {
  question: string; 
  status: boolean; 
}

// Creating a function to determine either the status of the question if true or false - in either case assigning an appropriate status icon & description
function showStatus(interviewQuestion: InterviewQuestionProps) {
  if (interviewQuestion.status) {
    return `
        <span class="icon has-text-success">
        <ion-icon name="checkmark-circle-outline"></ion-icon>
        </span>
        <span>Understood</span>`;
  }
  return `
        <span class="icon has-text-danger">
            <ion-icon name="close-circle-outline"></ion-icon>
        </span>
        <span>Didn't understand</span>`;
}

// Creating a function that will iterate all questions listed above into a specified HTML format including the question & its status
function iterateAllQuestions(interviewQuestions: InterviewQuestionProps[]) {
  interviewQuestions.forEach((interviewQuestion: InterviewQuestionProps, i: number) => {
    document.getElementById('cards')?.insertAdjacentHTML(
      'beforeend',
      `
        <div class="columns is-desktop is-centered">
        <div class="column is-8">
        <div class="card">
        <div class="card-content">
            <div class="content">${i + 1}. ${interviewQuestion.question}</div>
            <div class="icon-text" data-question="${i}">${showStatus(interviewQuestion)}</div>
        </div>
        </div>
        </div>
        </div>
        `,
    );
  });
}

// Creating a function that will hide questions that I understood and only show the ones that didnot
function renderHideQuestionsThatUnderstood() {
  // document.getElementById('cards').innerHTML = '';
  const cards = document.getElementById('cards') as HTMLInputElement; 
  cards.innerHTML = '';

  const checkbox = document.getElementById('checkbox') as HTMLInputElement;
  if (checkbox.checked) {
    const arrayQuestionsDidnotUnderstand = interviewQuestions.filter((interviewQuestion) => !interviewQuestion.status);
    iterateAllQuestions(arrayQuestionsDidnotUnderstand);
  } else {
    iterateAllQuestions(interviewQuestions);
  }
  // eslint-disable-next-line no-use-before-define
  subscribe();
}

// Creating a function that will add a new question into an array
// eslint-disable-next-line no-unused-vars
function submitNewQuestion() {
  // document.getElementById('cards').innerHTML = '';
  const cards = document.getElementById('cards') as HTMLInputElement; 
  cards.innerHTML = '';

  const resetInputValue = document.getElementById('inputQuestion') as HTMLInputElement; 

  const checkbox = document.getElementById('checkbox') as HTMLInputElement;
  const newQuestion = document.getElementById('inputQuestion') as HTMLInputElement;
  if (checkbox.checked) {
    interviewQuestions.push({ question: newQuestion.value, status: false });
    const arrayQuestionsDidnotUnderstand = interviewQuestions.filter((interviewQuestion) => !interviewQuestion.status);
    iterateAllQuestions(arrayQuestionsDidnotUnderstand);

    // document.getElementById('inputQuestion').value = '';
    resetInputValue.value = ''; 
  } else {
    interviewQuestions.push({ question: newQuestion.value, status: false });
    iterateAllQuestions(interviewQuestions);
    // document.getElementById('inputQuestion').value = '';
    resetInputValue.value = ''; 
  }
}

// Creating a function that will change a status of the question in UI
function changeStatus(id: number) {
  const currentQuestion = interviewQuestions[id];
  currentQuestion.status = !currentQuestion.status;
  renderHideQuestionsThatUnderstood();
}

// Creating a function that will run a status change function when clicked on a selected DOM element
function subscribe() {
  document.querySelectorAll('#cards > div .icon-text').forEach((el) => {
    const id = (el as HTMLElement).dataset.question;
    el.addEventListener('click', () => {
      changeStatus(Number(id));
    });
  });
}
subscribe();
