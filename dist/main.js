const TYPEWRITER = function(txtElement, words, wait = 3000){
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// add method to typewriter
TYPEWRITER.prototype.type = function(){
  let INDEX = this.wordIndex;
  let WORD_TEXT = this.words[INDEX];
  if(this.isDeleting){
    this.txt = WORD_TEXT.substring(0, this.txt.length - 1);
  } else {
    this.txt = WORD_TEXT.substring(0, this.txt.length + 1);
  }

  this.txtElement.textContent = this.txt;

  let typeSpeed = 250;
  if(this.isDeleting) {
    typeSpeed /= 2;
  }

  if(!this.isDeleting && this.txt == WORD_TEXT){
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt == ''){
    this.isDeleting = false;
    if(this.wordIndex < this.words.length - 1){
      this.wordIndex ++;
    } else {
      this.wordIndex = 0;
    };
    typeSpeed = 500;
  }
  setTimeout(()=>{
    this.type();
  }, typeSpeed);
}

// event listener on dom load
document.addEventListener('DOMContentLoaded', init);

// init typewriter effect
function init(){
  const txtElement = document.querySelector('.typewriter-effect');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  new TYPEWRITER(txtElement, words, 2000);
}