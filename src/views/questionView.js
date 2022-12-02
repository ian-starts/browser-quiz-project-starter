import {
  ANSWERS_LIST_ID,
  START_OVER_BUTTON_ID,
  NEX_PAGE_BUTTON,
  PREV_PAGE_BUTTON,
  SUBMIT_ANSWER_BUTTON_ID,
  MAX_QUESTIONS,
} from '../constants.js';

/**
 * Create a full question element
 * @returns {Element}
 */
export const createQuestionElement = (index,question) => {
  const element = document.createElement('div');

  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML = String.raw`
  <p> Question :${index +1} :${MAX_QUESTIONS};
    <h1>${question}</h1>

    <div id="${ANSWERS_LIST_ID}">
    </div>

    <button id="${SUBMIT_ANSWER_BUTTON_ID}">
    OK
    </button>

    <button id="${START_OVER_BUTTON_ID}">
      Start over
    </button>

    <button id="${NEX_PAGE_BUTTON}">
    <i class="fa-solid fa-angle-right"></i>
  </button>


    <button id="${PREV_PAGE_BUTTON}">
    <i class="fa-solid fa-angle-left"></i>
  </button>
  `;

  return element;
};
