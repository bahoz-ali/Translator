const apiKey = '97c719b1ac654022b3804a3a2df209a3';
const endPoint = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`;

const mealList = document.querySelector('.all');
const nameInput = document.querySelector('#name');
const answer = document.querySelector('#answer');
const doBtn = document.getElementById('do');
const activity = document.getElementById('activity')

const getAgeByName = async (name) => {
  const endPoint = 'https://api.agify.io/?name=' + name;
  const response = await fetch(endPoint);
  const age = await response.json();

  return age;
};

async function getSomeFoods() {
  let data;
  try {
    const response = await fetch(endPoint);
    data = await response.json();
    if (data.recipes) return data.recipes;
    return [];
  } catch (error) {
    return [];
  }
}

function createMealElement(data) {
  const { title, summary, image } = data;

  const div = document.createElement('div');
  div.classList.add('card');

  div.innerHTML = `<div class="card-header">
          <img
            src="${image}"
            alt="rover"
          />
        </div>
        <div class="card-body">
          <h4>${title}</h4>
          <p>${summary}</p>
        </div>`;

  return div;
}

async function displayAllMeals() {
  const meals = await getSomeFoods();

  meals.forEach((m) => {
    const mealE = createMealElement(m);

    mealList.appendChild(mealE);
  });
}

displayAllMeals();

async function displayAge() {
  const data = await getAgeByName(nameInput.value);
  console.log(data);

  if (data.age > 40) answer.innerHTML = data.age;
}

async function translate() {
  const url =
    'https://google-translate1.p.rapidapi.com/language/translate/v2/detect';

  const encodedParams = new URLSearchParams();
  encodedParams.append('q', 'English is hard, but detectably so');

  const options = {
    method: 'POST',
    body: encodedParams,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': 'e25cdbd2d7msh988e5521db83004p109351jsn7aa7f1b8d152',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
}

doBtn.addEventListener('click', async () => {
  const response = await fetch('http://www.boredapi.com/api/activity/');
  const data = await response.json();

  console.log('hello', data);

  activity.innerHTML = data.activity
});
