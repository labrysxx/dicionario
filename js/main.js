const LISTA_NOUN = document.getElementById('meaning-noun-list')
const LISTA_VERB = document.getElementById('meaning-verb-list')
const LISTA_SYN = document.getElementById('syn-result')
const INPUT = document.getElementById('input-word')
const NOUN = document.getElementById('noun')
const VERB = document.getElementById('verb')
const MEAN_SYN = document.querySelectorAll('.mean-syn')
const SYN = document.querySelector('.syn')
const EMPTY = document.getElementById('empty')
let audio = Array()
let syn = Array()

const AUDIO = document.getElementById('audio').addEventListener('click', () => {
  let playAudio = new Audio(`${audio[0]}`)
  playAudio.play()
})

const FORM = document.querySelector('form')

FORM.addEventListener('submit', (e) => {
  e.preventDefault()
  verificaInputVazio()
  verificaExistePalavra()
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${INPUT.value}`)
  .then(response => {return response.json()})
  .then(data => {
    limpaForm()  
    limpaDados()  
    populaAudio(data)
    verificaNounVerb(data)
    word(data)
  })
})

window.addEventListener('DOMContentLoaded', () => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/keyboard`)
  .then(response => {return response.json()})
  .then(data => {
    limpaForm()  
    limpaDados()  
    populaAudio(data)
    verificaNounVerb(data)
    word(data)
  })
  .catch(error => {
    console.log(error)
  })
})

function limpaDados() {
  NOUN.innerHTML = ''
  LISTA_NOUN.innerHTML = ''
  VERB.innerHTML = ''
  LISTA_VERB.innerHTML = ''
  LISTA_SYN.innerHTML = ''
  MEAN_SYN[0].innerHTML = ''
  MEAN_SYN[1].innerHTML = ''
  MEAN_SYN[2].innerHTML = ''
  limpaArrayAudio()
}

function limpaArrayAudio() {
  for(let j = 0; j <= audio.length; j++) {
    audio.pop()
  }
}

function limpaForm() {
  INPUT.value = ''
}

function populaAudio(data) {
  for(let i = 0; i < data[0].phonetics.length; i++) {
    if(data[0].phonetics[i].audio !== '') {
      audio.push(data[0].phonetics[i].audio)
    }
  }
}

function word(data) {
  let phonetic = Array()
  const WORD = document.getElementById('word')
  const PRONUNCIA = document.getElementById('pronuncia')
  WORD.innerHTML = `${data[0].word}`
  for(let i = 0; i < data[0].phonetics.length; i ++) {
    if(data[0].phonetics[i].text !== undefined) {
      phonetic.push(data[0].phonetics[i].text)
    }
  }
  PRONUNCIA.innerHTML = `${phonetic[0]}`
}

function verificaExistePalavra() {
  if(INPUT.value === '') {
    FORM.style.cssText = 'border: 1px solid #FF5252'
    EMPTY.style.display = "block"
  }
}

function verificaInputVazio() {
  if(INPUT.value !== '') {
    FORM.style.cssText = 'border: none'
    EMPTY.style.display = 'none'
  }
}

function verificaNounVerb(data) {
  for(let m = 0; m < data.length; m++) {
    for(let i = 0; i < data[m].meanings.length; i++) {
      //verifica se a palavra é substantivo
      if(data[m].meanings[i].partOfSpeech === 'noun') {
        const template = `
        <div class="separator">noun</div>
        `
        NOUN.innerHTML = `${template}`
        MEAN_SYN[0].innerHTML = 'Meaning'
        for(let j = 0; j < data[m].meanings[i].definitions.length; j++) {
          const noun = `
          <li>${data[m].meanings[i].definitions[j].definition}</li>
          `
          LISTA_NOUN.insertAdjacentHTML('beforeend', noun)
        }
      }
      if(data[m].meanings[i].synonyms.length !== 0) {
        MEAN_SYN[1].innerHTML = 'Synonyms'
        for(let j = 0; j < data[m].meanings[i].synonyms.length; j++) {
          const syn = `
          <li class="space-syn">${data[m].meanings[i].synonyms[j]}</li>
          `
          LISTA_SYN.insertAdjacentHTML('beforeend', syn)
        }
      }
      //verifica se a palavra é verbo
      if(data[m].meanings[i].partOfSpeech === 'verb') {
        const template = `
        <div class="separator">verb</div>
        `
        VERB.innerHTML = `${template}`
        MEAN_SYN[2].innerHTML = 'Meaning'
        for(let k = 0; k < data[m].meanings[i].definitions.length; k++) {
          const verb = `
          <li>${data[m].meanings[i].definitions[k].definition}</li>
          `
          LISTA_VERB.insertAdjacentHTML('beforeend', verb)
        }
      }
      //verifica se a palavra tem url
      if(data[m].sourceUrls) {
        const SOURCE = document.getElementById('source')
        const SOURCE_TITLE = document.querySelector('.source')
        SOURCE_TITLE.classList.add('display-on')
        SOURCE.setAttribute('href', `${data[m].sourceUrls[0]}`)
        SOURCE.setAttribute('target', '_blank')
        SOURCE.innerHTML = data[m].sourceUrls[0]
      }
    }
  }
}

function inputFocus() {
  INPUT.addEventListener('click', () => {
    FORM.classList.add('form-clicked')
  })
  
  INPUT.addEventListener('blur', () => {
    FORM.classList.remove('form-clicked')
  })
}

inputFocus()