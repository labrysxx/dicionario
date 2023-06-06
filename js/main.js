const LISTA_NOUN = document.getElementById('meaning-noun-list')
const LISTA_VERB = document.getElementById('meaning-verb-list')
const LISTA_ADJ = document.getElementById('adjective-list')
const INPUT = document.getElementById('input-word')
const NOUN = document.getElementById('noun')
const VERB = document.getElementById('verb')
const ADJ = document.getElementById('adjective')
const MEAN_SYN = document.querySelectorAll('.mean-syn')

const AUDIO = document.getElementById('audio').addEventListener('click', () => {
  let playAudio = new Audio(`${audio[0]}`)
  playAudio.play()
})

const FORM = document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${INPUT.value}`)
  .then(response => {return response.json()})
  .then(data => {
    console.log(data)
    limpaForm()  
    limpaDados()  
    populaAudio(data)
    verificaNounVerb(data)
    word(data)
  })
})

let audio = Array()

function limpaDados() {
  NOUN.innerHTML = ''
  LISTA_NOUN.innerHTML = ''
  VERB.innerHTML = ''
  LISTA_VERB.innerHTML = ''
  ADJ.innerHTML = ''
  LISTA_ADJ.innerHTML = ''
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

function verificaNounVerb(data) {
  for(let i = 0; i < data[0].meanings.length; i++) {
    //verifica se a palavra é substantivo
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
    //verifica se a palavra é um adjetivo
    if(data[0].meanings[i].partOfSpeech === 'adjective') {
      const template = `
        <div class="separator">${data[0].meanings[i].partOfSpeech}</div>
      `
      ADJ.innerHTML = `${template}`
      MEAN_SYN[1].innerHTML = 'Meaning'
      for(let j = 0; j < data[0].meanings[i].definitions.length; j++) {
        const adj = `
        <li>${data[0].meanings[i].definitions[j].definition}</li>
      `
        LISTA_ADJ.insertAdjacentHTML('beforeend', adj)
      }
    }
    //verifica se a palavra é verbo
    if(data[0].meanings[i].partOfSpeech === 'verb') {
      const template = `
        <div class="separator">${data[0].meanings[i].partOfSpeech}</div>
      `
      VERB.innerHTML = `${template}`
      MEAN_SYN[2].innerHTML = 'Meaning'
      for(let k = 0; k < data[0].meanings[i].definitions.length; k++) {
        const verb = `
        <li>${data[0].meanings[i].definitions[k].definition}</li>
      `
        LISTA_VERB.insertAdjacentHTML('beforeend', verb)
      }
    }
    //verifica se a palavra tem url
    if(data[0].sourceUrls) {
      const SOURCE = document.getElementById('source')
      const SOURCE_TITLE = document.querySelector('.source')
      SOURCE_TITLE.classList.add('display-on')
      SOURCE.setAttribute('href', `${data[0].sourceUrls[0]}`)
      SOURCE.setAttribute('target', '_blank')
      SOURCE.innerHTML = data[0].sourceUrls[0]
    }
  }
}