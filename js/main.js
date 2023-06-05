const LISTA_NOUN = document.getElementById('meaning-noun-list')
const LISTA_VERB = document.getElementById('meaning-verb-list')
const SOURCE = document.getElementById('source')
const SOURCE_TITLE = document.querySelector('.source')
const INPUT = document.getElementById('input-word')
const NOUN = document.getElementById('noun')
const VERB = document.getElementById('verb')
const SIN = document.querySelectorAll('.mean-syn')
const MEAN_SYN = document.querySelectorAll('.mean-syn')
const AUDIO = document.getElementById('audio')
const MAIN = document.querySelector('main')
const FOOTER = document.querySelector('footer')

const FORM = document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${INPUT.value}`)
    .then(response => {return response.json()})
    .then(data => {
      limpaForm()  
      limpaTela()  
      verificaNounVerb(data)
    })
})

function limpaTela() {
  NOUN.innerHTML = ''
  LISTA_NOUN.innerHTML = ''
  VERB.innerHTML = ''
  LISTA_VERB.innerHTML = ''
  MEAN_SYN[0].innerHTML = ''
  MEAN_SYN[1].innerHTML = ''
}

function limpaForm() {
  INPUT.value = ''
}

function verificaNounVerb(data) {
  for(let i = 0; i < data[0].meanings.length; i++) {
    //verifica se a palavra tem substantivo
    if(data[0].meanings[i].partOfSpeech === 'noun') {
      const template = `
        <div class="separator">${data[0].meanings[i].partOfSpeech}</div>
      `
      NOUN.innerHTML = `${template}`
      MEAN_SYN[0].innerHTML = 'Meaning'
      for(let j = 0; j < data[0].meanings[i].definitions.length; j++) {
        const noun = `
        <li>${data[0].meanings[i].definitions[j].definition}</li>
      `
        LISTA_NOUN.insertAdjacentHTML('beforeend', noun)
      }
    }
    //verifica se a palavra tem verbo
    if(data[0].meanings[i].partOfSpeech === 'verb') {
      const template = `
        <div class="separator">${data[0].meanings[i].partOfSpeech}</div>
      `
      VERB.innerHTML = `${template}`
      MEAN_SYN[1].innerHTML = 'Meaning'
      for(let k = 0; k < data[0].meanings[i].definitions.length; k++) {
        const verb = `
        <li>${data[0].meanings[i].definitions[k].definition}</li>
      `
        LISTA_VERB.insertAdjacentHTML('beforeend', verb)
      }
    }
    //verifica se a palavra tem url
    if(data[0].sourceUrls) {
      SOURCE_TITLE.classList.add('display-on')
      SOURCE.setAttribute('href', `${data[0].sourceUrls[0]}`)
      SOURCE.setAttribute('target', '_blank')
      SOURCE.innerHTML = data[0].sourceUrls[0]
    }
  }
}