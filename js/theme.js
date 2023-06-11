let toggle = document.getElementById("toggle");
toggle.addEventListener("change", toggleDarkMode);

function toggleDarkMode() {
  let body = document.body;
  let form = document.querySelector('form');
  let input = document.querySelector('#input-word');
  let mean_syn = document.querySelectorAll('.mean-syn')
  let source = document.querySelector('.source')
  let text = document.querySelectorAll('.text')
  let subtitle = document.querySelectorAll('.separator')
  body.classList.toggle("dark-mode-body");
  form.classList.toggle('dark-mode-nav');
  input.classList.toggle('dark-mode-nav');
  source.classList.toggle('mean-syn-dark')
  for(let i = 0; i < mean_syn.length; i++) {
    mean_syn[i].classList.toggle('mean-syn-dark')
  }
  for(let i = 0; i < text.length; i++) {
    text[i].classList.toggle('dark-mode-body')
  }
  for(let i = 0; i < subtitle.length; i++) {
    subtitle[i].classList.toggle('dark-mode-sub')
  }
}
