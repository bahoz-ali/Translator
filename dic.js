const translation = document.querySelector('.translation');
const textToBeTranslate = document.querySelector('#text');
const translateBtn = document.querySelector('#translate-btn');

async function translate2(value) {
  let url = 'https://microsoft-translator-text.p.rapidapi.com/translate';
  url += `?to[0]=ku&api-version=3.0&profanityAction=noAction&textType=plain`;

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'e25cdbd2d7msh988e5521db83004p109351jsn7aa7f1b8d152',
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    },
    body: JSON.stringify([{ Text: value }]),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);

  const result = data[0].translations[0].text;
  return result;
}

translateBtn.addEventListener('click', async () => {
  const text = textToBeTranslate.innerHTML.replace(
    /\<div\>|\<br\>|\<\/div\>/g,
    ' '
  );

  console.log(text);
  const result = await translate2(text);
  console.log('text: ', result);
  translation.innerHTML = result;
});
