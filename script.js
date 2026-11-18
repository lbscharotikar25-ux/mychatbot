const $ = (selector) => document.querySelector(selector);
const messages = $('#messages');
const chatForm = $('#chatForm');
const chatInput = $('#chatInput');
const toast = $('#toast');

const jokes = [
  'Why did the computer go to the doctor? It had a virus! 🦠',
  'Why was the maths book sad? It had too many problems! 📘',
  'What do you call a bear with no teeth? A gummy bear! 🐻',
  'Why did the student eat their homework? The teacher said it was a piece of cake! 🍰',
  'What is a computer’s favourite snack? Microchips! 💻'
];
const facts = [
  'Octopuses have three hearts! 🐙',
  'A group of flamingos is called a flamboyance! 🦩',
  'Honey never spoils when stored properly. 🍯',
  'A day on Venus is longer than its year! 🪐',
  'Sharks existed before trees! 🦈',
  'Your brain uses about 20% of your body’s energy. 🧠',
  'Some turtles can breathe through their bottoms! 🐢'
];
const randomQuestions = [
  'What would happen if humans could fly? 🪽',
  'If you could invent a new school subject, what would it be? 🎨',
  'Why do stars twinkle in the night sky? ✨',
  'What would Earth look like if it had two moons? 🌙',
  'If animals could talk, which one would be the funniest? 🦜',
  'How would you build a city under the sea? 🌊'
];

function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}
function addMessage(text, who = 'bot') {
  const row = document.createElement('div');
  row.className = `message-row ${who === 'user' ? 'user-row' : 'bot-row'}`;
  const avatar = document.createElement('div');
  avatar.className = 'tiny-avatar';
  avatar.textContent = who === 'user' ? '🧑‍🎓' : '🤖';
  const wrap = document.createElement('div');
  wrap.className = 'bubble-wrap';
  const sender = document.createElement('span');
  sender.className = 'sender';
  sender.textContent = who === 'user' ? 'You' : 'BuddyAI';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  const time = document.createElement('time');
  time.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  wrap.append(sender, bubble, time);
  row.append(avatar, wrap);
  messages.append(row);
  messages.scrollTop = messages.scrollHeight;
}
function getReply(raw) {
  const q = raw.toLowerCase();
  if (/\b(hi|hello|hey|hii|howdy)\b/.test(q)) return 'Hey hey! 😄 So happy you are here. What would you like to explore today?';
  if (q.includes('joke') || q.includes('funny') || q.includes('laugh')) return pick(jokes);
  if (q.includes('fact') || q.includes('surprise me')) return `Here's a cool fact: ${pick(facts)}`;
  if (q.includes('sky') && q.includes('blue')) return 'Sunlight has many colours. Tiny particles in our atmosphere scatter blue light more than most other colours, so the sky looks blue! 🌈';
  if (q.includes('what is ai') || q.includes('artificial intelligence')) return 'AI means Artificial Intelligence. It is technology that helps computers do tasks that usually need human thinking, like understanding language, spotting patterns and answering questions. 🤖';
  if (q.includes('2 + 2') || q.includes('2+2')) return 'That one is easy-peasy! 2 + 2 = 4. ⭐';
  if (q.includes('capital of india')) return 'The capital of India is New Delhi. 🇮🇳';
  if (q.includes('red planet')) return 'Mars is called the Red Planet because iron-rich dust on its surface gives it a reddish colour. 🔴';
  if (q.includes('photosynthesis')) return 'Photosynthesis is how green plants make their food. They use sunlight, water and carbon dioxide to make sugar and release oxygen. 🌱';
  if (q.includes('gravity')) return 'Gravity is the force that pulls objects towards each other. Earth’s gravity keeps us on the ground and helps the Moon orbit Earth. 🌍';
  if (q.includes('water') && (q.includes('boil') || q.includes('boiling'))) return 'At normal air pressure, pure water boils at 100°C (212°F). 💧';
  if (q.includes('thank')) return 'You are very welcome, superstar! Keep those questions coming. 💙';
  if (q.includes('help')) return 'Of course! Try asking me about science, maths, computers, space, animals, jokes or fun facts. You can also tap one of the activity buttons. ✨';
  if (q.includes('who are you') || q.includes('your name')) return 'I’m BuddyAI, your friendly student sidekick! I love curious questions, quizzes and silly jokes. 🤖';
  return `That's a super question! 🌟 Here's a thought: ${raw.replace(/[?!.]+$/, '')} is worth exploring step by step. Try adding a subject or a little more detail, and I'll do my best to help. Remember, asking questions is how learning begins!`;
}
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) { showToast('Type a question first 😊'); return; }
  addMessage(text, 'user');
  chatInput.value = '';
  const sendButton = chatForm.querySelector('button');
  sendButton.disabled = true;
  sendButton.textContent = 'Thinking…';
  setTimeout(() => {
    addMessage(getReply(text));
    sendButton.disabled = false;
    sendButton.innerHTML = 'Send <span>➤</span>';
    chatInput.focus();
  }, 450);
});
document.querySelectorAll('.suggestion').forEach(button => button.addEventListener('click', () => {
  chatInput.value = button.textContent.replace(/\s[🌈😂🤖]$/, '');
  chatForm.requestSubmit();
}));

function setView(name) {
  document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view.id === `${name}View`));
  document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.view === name));
  window.scrollTo({top: 0, behavior: 'smooth'});
}
document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
document.querySelectorAll('.activity-link').forEach(button => button.addEventListener('click', () => {
  const action = button.dataset.action;
  if (action === 'quiz' || action === 'fun') setView(action);
  if (action === 'joke') { setView('chat'); addMessage(pick(jokes)); }
}));
$('#helpButton').addEventListener('click', () => showToast('BuddyAI is a student-friendly demo chatbot. Be curious and have fun!'));
$('#newFact').addEventListener('click', () => $('#dailyFact').textContent = pick(facts));
$('#randomButton').addEventListener('click', () => $('#randomQuestion').textContent = pick(randomQuestions));
$('#jokeButton').addEventListener('click', () => $('#jokeResult').textContent = pick(jokes));
$('#factButton').addEventListener('click', () => $('#funFact').textContent = pick(facts));

// Mini quiz
const quiz = [
  {emoji:'🔴', question:'Which planet is known as the Red Planet?', options:['Venus','Mars','Jupiter','Saturn'], answer:'Mars', explain:'Mars looks reddish because of iron-rich dust on its surface.'},
  {emoji:'🌱', question:'Which gas do plants absorb from the air?', options:['Oxygen','Helium','Carbon dioxide','Hydrogen'], answer:'Carbon dioxide', explain:'Plants use carbon dioxide, water and sunlight during photosynthesis.'},
  {emoji:'🧮', question:'What is 9 × 7?', options:['56','63','72','69'], answer:'63', explain:'9 multiplied by 7 equals 63. Great maths!' },
  {emoji:'🌊', question:'What is the largest ocean on Earth?', options:['Atlantic','Indian','Arctic','Pacific'], answer:'Pacific', explain:'The Pacific Ocean is the largest and deepest ocean.'},
  {emoji:'💻', question:'What does CPU stand for?', options:['Central Processing Unit','Computer Power Utility','Core Program User','Central Print Unit'], answer:'Central Processing Unit', explain:'The CPU processes instructions and is often called the computer’s brain.'}
];
let quizIndex = 0;
let score = 0;
let answered = false;
function renderQuestion() {
  const item = quiz[quizIndex];
  answered = false;
  $('#quizProgress').textContent = `QUESTION ${quizIndex + 1} OF ${quiz.length}`;
  $('#score').textContent = score;
  $('#progressBar').style.width = `${(quizIndex / quiz.length) * 100}%`;
  $('#quizEmoji').textContent = item.emoji;
  $('#quizQuestion').textContent = item.question;
  $('#quizFeedback').textContent = '';
  $('#nextQuestion').disabled = true;
  $('#nextQuestion').textContent = quizIndex === quiz.length - 1 ? 'See my result →' : 'Next question →';
  const answers = $('#answers');
  answers.innerHTML = '';
  item.options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.textContent = option;
    button.addEventListener('click', () => chooseAnswer(button, option));
    answers.append(button);
  });
}
function chooseAnswer(button, choice) {
  if (answered) return;
  answered = true;
  const item = quiz[quizIndex];
  const correct = choice === item.answer;
  if (correct) score++;
  document.querySelectorAll('.answer-option').forEach(option => {
    option.disabled = true;
    if (option.textContent === item.answer) option.classList.add('correct');
  });
  if (!correct) button.classList.add('wrong');
  $('#score').textContent = score;
  $('#quizFeedback').textContent = `${correct ? '🎉 Correct! ' : '💡 Good try! '}${item.explain}`;
  $('#nextQuestion').disabled = false;
}
$('#nextQuestion').addEventListener('click', () => {
  if (!answered) return;
  if (quizIndex < quiz.length - 1) { quizIndex++; renderQuestion(); }
  else {
    $('#quizProgress').textContent = 'QUIZ COMPLETE';
    $('#progressBar').style.width = '100%';
    $('#quizEmoji').textContent = score === quiz.length ? '🏆' : '🌟';
    $('#quizQuestion').textContent = `You scored ${score} out of ${quiz.length}!`;
    $('#answers').innerHTML = '';
    $('#quizFeedback').textContent = score === quiz.length ? 'Perfect score! You are a quiz champion!' : 'Awesome effort! Every quiz makes your brain stronger.';
    $('#nextQuestion').textContent = 'Play again ↻';
    $('#nextQuestion').onclick = () => { quizIndex = 0; score = 0; $('#nextQuestion').onclick = null; renderQuestion(); };
  }
});
renderQuestion();
$('#dailyFact').textContent = pick(facts);
