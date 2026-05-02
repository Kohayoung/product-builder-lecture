function getBallClass(num) {
  if (num <= 10) return 'range1';
  if (num <= 20) return 'range2';
  if (num <= 30) return 'range3';
  if (num <= 40) return 'range4';
  return 'range5';
}

function generateOneSet(includeBonus) {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  const main = Array.from(numbers).sort((a,b)=>a-b);
  let bonus = null;
  if (includeBonus) {
    do {
      bonus = Math.floor(Math.random() * 45) + 1;
    } while (numbers.has(bonus));
  }
  return { main, bonus };
}

function generateLotto() {
  const includeBonus = document.getElementById('bonusCheck').checked;
  const container = document.getElementById('results');
  container.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const { main, bonus } = generateOneSet(includeBonus);
    const setDiv = document.createElement('div');
    setDiv.className = 'result-set';
    const numbersDiv = document.createElement('div');
    numbersDiv.className = 'numbers';

    main.forEach(num => {
      const ball = document.createElement('div');
      ball.className = 'ball ' + getBallClass(num);
      ball.innerText = num;
      numbersDiv.appendChild(ball);
    });

    if (includeBonus && bonus !== null) {
      const bonusBall = document.createElement('div');
      bonusBall.className = 'ball bonus ' + getBallClass(bonus);
      bonusBall.innerText = bonus;
      numbersDiv.appendChild(bonusBall);
    }

    setDiv.appendChild(numbersDiv);
    container.appendChild(setDiv);
  }
}

// Theme Toggle Logic
function toggleTheme() {
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const currentTheme = html.getAttribute('data-theme');
  
  if (currentTheme === 'light') {
    html.removeAttribute('data-theme');
    themeBtn.innerText = '🌙 다크 모드';
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    themeBtn.innerText = '☀️ 화이트 모드';
    localStorage.setItem('theme', 'light');
  }
}

// Load saved theme
window.onload = () => {
  const savedTheme = localStorage.getItem('theme');
  const themeBtn = document.getElementById('themeBtn');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeBtn.innerText = '☀️ 화이트 모드';
  }
};
