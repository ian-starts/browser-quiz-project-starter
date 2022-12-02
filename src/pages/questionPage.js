import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  START_OVER_BUTTON_ID,
  USER_INTERFACE_ID,
  SUBMIT_ANSWER_BUTTON_ID,
  NEX_PAGE_BUTTON,
  PREV_PAGE_BUTTON,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { initWelcomePage } from './welcomePage.js';

let data =
  window.localStorage.getItem('quizData') !== null
    ? JSON.parse(window.localStorage.getItem('quizData'))
    : JSON.parse(JSON.stringify(quizData));

if (window.localStorage.getItem('quizData') !== null) {
  console.log('data restored from localStorage');
} else {
  console.log('localStorage is empty');
}

export const initQuestionPage = () => {
  // Selecting user interface
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  if (data.currentQuestionIndex >= data.questions.length) {
    data.currentQuestionIndex = 0;
  }

  const currentQuestion = data.questions[data.currentQuestionIndex];

  //Getting the question text
  const questionElement = createQuestionElement(quizData.currentQuestionIndex,currentQuestion.text);

  userInterface.appendChild(questionElement);

// Selecting the answer list
  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  //Creating answer list and add Data key attribute
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answerElement.addEventListener(
      'click',
      selectAnswer(currentQuestion, answerElement, key)
    );
    answersListElement.appendChild(answerElement);
    if (
      data.questions[data.currentQuestionIndex].submitted === true &&
      data.questions[data.currentQuestionIndex].selected === key
    ) {
      answerElement.classList.add('selected');
      checkAnswer(currentQuestion);
    }
  }

    //Selecting the progress bar
  // const progressBarFull = document.getElementById('progressBarFull');
  // const progressBarIndicator = currentIndex + 1;
  // progressBarFull.style.width = `${(progressBarIndicator / MAX_QUESTIONS) * 100}%`;

  document
      .getElementById(NEXT_QUESTION_BUTTON_ID)
      .addEventListener('click', nextQuestion);

  document
    .getElementById(START_OVER_BUTTON_ID)
    .addEventListener('click', startOver);

  document
    .getElementById(SUBMIT_ANSWER_BUTTON_ID)
    .addEventListener('click', submitAnswer(currentQuestion));

  document.getElementById(NEX_PAGE_BUTTON).addEventListener('click', nextPage);

  document.getElementById(PREV_PAGE_BUTTON).addEventListener('click', prevPage);
};

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  initQuestionPage();
};

const startOver = () => {
  window.localStorage.clear();
  console.log('localStorage is cleared');
  data = JSON.parse(JSON.stringify(quizData));
  initWelcomePage();
};

const selectAnswer = (currentQuestion, answerElement, key) => () => {
  if (currentQuestion.submitted === false) {
    if (
      Object.keys(currentQuestion.answers).includes(currentQuestion.selected)
    ) {
      const prevAnswer = document.querySelector('.selected');
      prevAnswer.classList.remove('selected');
    }
    currentQuestion.selected = key;
    answerElement.classList.add('selected');
  } else {
    alert('You cannot change your answer!');
  }
};

const submitAnswer = (currentQuestion) => () => {
  if (
    Object.keys(currentQuestion.answers).includes(currentQuestion.selected) &&
    currentQuestion.submitted === false
  ) {
    currentQuestion.submitted = true;
    checkAnswer(currentQuestion);
    saveAnswers();
  }
};

const saveAnswers = () => {
  window.localStorage.setItem('quizData', JSON.stringify(data));
};

const checkAnswer = (currentQuestion) => {
  const selectedAnswer = document.querySelector('.selected');
  selectedAnswer.classList.remove('selected');
  if (currentQuestion.selected === currentQuestion.correct) {
    selectedAnswer.classList.add('right');
  } else {
    selectedAnswer.classList.add('wrong');
  }
};

const nextPage = () => {
  data.currentQuestionIndex = data.currentQuestionIndex + 1;

  initQuestionPage();
};

const prevPage = () => {
  data.currentQuestionIndex = data.currentQuestionIndex - 1;

  initQuestionPage();
};
