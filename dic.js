const translation = document.querySelector('.translation');
const textToBeTranslate = document.querySelector('#text');
const translateBtn = document.querySelector('#translate-btn');

let cashEnglishText = '';
let cashKurdishText = '';

async function translate2(value) {
  let url = 'https://microsoft-translator-text.p.rapidapi.com/translate';
  url += `?to[0]=ku&api-version=3.0&profanityAction=noAction&textType=plain`;

  if (value.length >= 600)
    return ` تکایە بەڕێز هەوڵبدە کەمتر لە ${value.length} .پیت بکەوە کوردی، واتە هەوڵبدە نزیک 600 پیت بکەوە کوردی هەرجارێک`;

  if (cashEnglishText == value) return cashKurdishText;

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '6aa4aeabfcmshd46ef8b482c1622p1541b2jsne7988d0e92d6',
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    },
    body: JSON.stringify([{ Text: value }]),
  };

  cashEnglishText = value;

  const response = await fetch(url, options);
  const data = await response.json();
  // console.log(data);

  const result = data[0]?.translations[0]?.text;
  cashKurdishText = result;

  if (!result || typeof result == 'undefined')
    return 'ببورە بەڕێز مانگانە ڕیگەم پێدراوە تەنیا ٣٠٠ لاپەڕە بکرێتەوە کوردی بۆیە تا مانگێکی تر ناتوانیی هیچ بکەیتەوە بە کوردی، یان دەێت من مانگانە ٦٠ دۆلاریان پێبدەم بۆئەوەی وەرگێڕەکە ڕانەگرن';

  return result;
}

translateBtn.addEventListener('click', async () => {
  const text = textToBeTranslate.value;
  const result = await translate2(text);

  translation.innerHTML = result;
});

// This function automatically run after the page is opened s
function websiteVisits(response) {
  document.querySelector('#visits').textContent = response.value;
}
