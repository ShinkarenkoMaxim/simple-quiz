// Setup tailwind config
tailwind.config = {
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
};

// Set bot to ready state
Telegram.WebApp.ready();

// Get personalized data from Telegram
let initData = Telegram.WebApp.initData || '';

// Init state of button
const sendBtn = document.getElementById('sendanswer');
sendBtn.disabled = true;

let rightAsnwersCounter = 0;
let questionCounter = 0;
const MAX_QUESTIONS = 3;
const questions = [
  {
    question: 'What country has the highest life expectancy?',
    answers: ['Hong Kong', 'Switzerland', 'Singapore', 'Italy'],
    rightAnswer: 0,
  },
  {
    question: 'The tallest building in the world is located in which city?',
    answers: ['Dubai', 'New York', 'Shanghai', 'None of the above'],
    rightAnswer: 0,
  },
  {
    question: 'Which country do cities of Perth, Adelade & Brisbane belong to',
    answers: ['USA', 'Greece', 'Australia'],
    rightAnswer: 2,
  },
];

const changeAnswer = (e) => {
  sendBtn.disabled = false;
};

const disableForm = (isDisable) => {
  const answers = document.querySelector('#answers').children;

  for (const el of answers) {
    const inputs = el.getElementsByTagName('input');
    const labels = el.getElementsByTagName('label');

    for (const input of inputs) {
      input.disabled = isDisable;
    }

    for (const label of labels) {
      label.disabled = isDisable;
      label.classList.toggle('opacity-50');
    }
  }
};

const getNewQuestion = () => {
  questionCounter++;

  // If quiz is ended - return back
  if (questionCounter > MAX_QUESTIONS) {
    sendAnswer();
    return;
  }

  const questionsIndex = questionCounter - 1;
  const currentQuestion = questions[questionsIndex];

  // Update progress
  const progressText = document.getElementById('progress-text');
  const progressBarFull = document.getElementById('progressbar-full');
  progressText.innerText = `${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // Update question and answers
  const answersContainer = document.getElementById('answers');
  const question = document.getElementById('question');

  question.innerText = currentQuestion.question;
  answersContainer.innerHTML = '';

  currentQuestion.answers.map((answer, k) => {
    const answerId = `answer-${k + 1}`;
    const itemContainer = document.createElement('div');

    const input = document.createElement('input');
    input.name = 'answer';
    input.type = 'radio';
    input.id = `answer-${k + 1}`;
    input.dataset.id = k;
    input.classList.add(
      'rounded-full',
      'h-4',
      'w-4',
      'border',
      'border-gray-300',
      'bg-white',
      'checked:bg-blue-600',
      'checked:border-blue-600',
      'focus:outline-none',
      'transition',
      'duration-200',
      'mt-1',
      'align-top',
      'bg-no-repeat',
      'bg-center',
      'bg-contain',
      'float-left',
      'mr-2',
      'cursor-pointer'
    );

    const label = document.createElement('label');
    label.htmlFor = answerId;
    label.innerText = answer;
    label.classList.add('inline-block', 'text-gray-800');

    itemContainer.appendChild(input);
    itemContainer.appendChild(label);

    answersContainer.appendChild(itemContainer);
  });
};

const sendAnswer = () => {
  // If user visited by not inline keyboard we can't reply him with backend
  if (!initData) {
    const result = `Right answers: ${rightAsnwersCounter} of ${MAX_QUESTIONS}`;
    Telegram.WebApp.sendData(result);
    Telegram.WebApp.close();
  } else {
    const data = JSON.stringify({
      _auth: initData,
      result: rightAsnwersCounter,
    });

    fetch('/api/sendAnswer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    }).then((res) => {
      const response = res.json();
    });
  }
};

// When button is clicked check answer and send next question else send data to server
sendBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const checkedAnswer = parseInt(
    document.querySelector('input[name=answer]:checked').dataset.id
  );
  const currentQuestion = questions[questionCounter - 1];
  if (checkedAnswer === currentQuestion.rightAnswer) {
    rightAsnwersCounter++;
  }

  disableForm(true);

  sendBtn.disabled = true;

  getNewQuestion();
});

window.addEventListener('load', (e) => {
  getNewQuestion();
});
