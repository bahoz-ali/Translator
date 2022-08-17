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
    'X-RapidAPI-Key': '6aa4aeabfcmshd46ef8b482c1622p1541b2jsne7988d0e92d6',
    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
  },
    body: JSON.stringify([{ Text: value }]),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  // console.log(data);

  const result = data[0]?.translations[0]?.text;

  if (!result || typeof result == 'undefined')
    return 'ببورە بەڕێز مانگانە ڕیگەم پێدراوە تەنیا ٣٠٠ لاپەڕە بکرێتەوە کوردی بۆیە تا مانگێکی تر ناتوانیی هیچ بکەیتەوە بە کوردی، یان دەێت من مانگانە ٦٠ دۆلاریان پێبدەم بۆئەوەی وەرگێڕەکە ڕانەگرن';

  return result;
}

translateBtn.addEventListener('click', async () => {
  const text = textToBeTranslate.value;

  console.log(text);
  const result = await translate2(text);
  console.log('text: ', result);
  translation.innerHTML = result;
});

// This function automatically run after the page is opened s
function websiteVisits(response) {
  document.querySelector('#visits').textContent = response.value;
}
