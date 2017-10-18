var el = document.getElementById('fill');

el.setScaledFont = function (f) {
    var s = this.offsetWidth,
        fs = s * f;
    this.style.fontSize = fs + '%';
    return this
};

el.setScaledFont(1.557);
window.onresize = function () {
    el.setScaledFont(1.557);
}

var pos = 0;
var ticking = false;

function hero(scroll_pos) {
  scroll_pos = scroll_pos * 0.02
  Object.assign(el.style,{filter:'blur(' + scroll_pos + 'px)', transform:'translateY(-' + scroll_pos * 4 + 'px)'});
  // el.style.filter = "blur(" + scroll_pos + "px)";
  // el.style.color = "hsl(" + scroll_pos + ", 0%, 100%);";
}

window.addEventListener('scroll', function(e) {
  pos = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      hero(pos);
      ticking = false;
    });
    ticking = true;
  }
});

var list = document.querySelector(".weight").children;
var charset = document.querySelector('.charset');

for (var i = 0; i < list.length; i++) {
  list[i].addEventListener("mouseenter", function( event ) {
    var weightItem = event.target.dataset.weight;

    charset.className = "charset pa1"
    charset.classList.toggle(weightItem);
  }, false);
}

function randomDia() {
  var text = "";
  var alphabetdia = "ÓǑÔÖÒŐŌÕ";
  for( var i = 0; i < 1; i++ )
      text += alphabetdia.charAt(Math.floor(Math.random() * alphabetdia.length));
  return text;
}

function randomString() {
    var text = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789∑‰@&†≈£€→↖↔∫";
    for( var i = 0; i < 1; i++ )
        text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    if (text.match(/[a-z]/i)) {
      return text.toUpperCase() + text.toLowerCase();
    }
    else {
      return text;
    }
}

document.querySelectorAll('.random').forEach( function(e){
  setInterval(function(){
      e.innerHTML = randomString();
  },800);
});
document.querySelectorAll('.randomdia').forEach( function(e){
  setInterval(function(){
      e.innerHTML = randomDia();
  },800);
});

// console.log(document.querySelector('#typetester').value)
var playground = document.querySelectorAll('.typetester-playground')
var typetester = document.querySelector('.typetester');

typetester.addEventListener("input", function(e){
  var value = this.value
  playground.forEach(function(e){
    e.innerHTML = value
  });
});

function getRandomInt(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var cycle = document.querySelectorAll('.expand');
cycle.forEach(function(e) {


  e.parentElement.addEventListener("mouseenter", function( event ) {
    var expandElem = this.querySelector('.expand-list')
    var children = expandElem.children;
    expandElem.classList.add('active')
    for (var i = 0; i < children.length; i++) {


      var tableChild = children[i];
      // console.log(tableChild)

      var dimensions = {
        w: tableChild.offsetWidth,
        h: tableChild.offsetHeight
      }
      var position = {
        x: getRandomInt(-300, 300),
        y: getRandomInt(-300, 300)
      }


      Object.assign(tableChild.style,{transform:'translate(' + getRandomInt(-300, 300) + 'px, ' + getRandomInt(-300, 300) + 'px)'});
    }
  })
  e.parentElement.addEventListener("mouseleave", function( event ) {
    var expandElem = this.querySelector('.expand-list')
    expandElem.classList.remove('active')
    var children = expandElem.children;
    for (var i = 0; i < children.length; i++) {
      var tableChild = children[i];
      // console.log(tableChild)
      Object.assign(tableChild.style,{transform:'translate(' + getRandomInt(0, 0) + 'px, ' + getRandomInt(0, 0) + 'px)'});
    }
  })
})
