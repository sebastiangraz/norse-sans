function setScaledFont(){
    var el = document.getElementsByClassName("fill");
    for(var i = 0; i < el.length; i++){
      var s  = el[i].offsetWidth,
          f  = 0.24,
          fs = s * f;
      el[i].style.fontSize = fs + '%'
    }
} setScaledFont()

function hero(scroll_pos) {
  var el = document.getElementsByClassName("black-shiny");
  for (var i = 0; i < el.length; i++) {
    Object.assign(el[i].style,{background:'-webkit-linear-gradient(' + scroll_pos * .2 + 'deg, #000 30%, #444 60%)', webkitBackgroundClip: 'text'});
  }
}

function parallax() {
  var ticking = false,
      pos = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      hero(pos);
      ticking = false;
    });
    ticking = true;
  }
}


window.onresize = function () {
    setScaledFont()
}

window.addEventListener('scroll', function(e) {
  parallax()
});

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}


Array.prototype.sum = function(selector) {
    if (typeof selector !== 'function') {
        selector = function(item) {
            return item;
        }
    }
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += parseFloat(selector(this[i]));
    }
    return sum;
};

var expandElem = document.querySelector('#hero')
var child = expandElem.children;
var totalWidth = 0;

for(var i = 0, l = child.length; i < l; i++) {
  var text = child[i].innerHTML.repeat(1);
  child[i].insertAdjacentHTML('beforeend', text)
  // console.log(child[i].childNodes)

  NodeList.prototype.forEach = Array.prototype.forEach
  var children = child[i].childNodes;
  children.forEach(function(item){
      return item.offsetWidth;
  });

  console.log(children[1])
}
// for (var i = 0; i < child.length; i++) {
//
// }


// var arr = document.querySelector('#hero').childNodes
// console.log(arr)

// var new_array = arr.map(function callback(currentValue, index, array) {
//   var rect = currentValue.getBoundingClientRect().width;
//   console.log(rect)
// })

// var maxWidth= Math.max.apply(Math, new_array);
// console.log(maxWidth)

// var list = document.querySelector(".weight").children;
// var charset = document.querySelector('.charset');
//
// for (var i = 0; i < list.length; i++) {
//   list[i].addEventListener("click", function( event ) {
//     var weightItem = event.target.dataset.weight;
//
//     charset.className = "charset pa1"
//     charset.classList.toggle(weightItem);
//   }, false);
// }

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
  },810);
});
document.querySelectorAll('.randomdia').forEach( function(e){
  setInterval(function(){
      e.innerHTML = randomDia();
  },790);
});

// console.log(document.querySelector('#typetester').value)
// var playground = document.querySelectorAll('.typetester-playground')
// var typetester = document.querySelector('.typetester');
//
// typetester.addEventListener("input", function(e){
//   var value = this.value
//   playground.forEach(function(e){
//     e.innerHTML = value
//   });
// });


// var elem = document.querySelector('.charset');
// var iso = new Isotope( elem, {
//   // options
//   itemSelector: '.glyph',
//   percentPosition: true,
//   layoutMode: 'masonry'
// });

function getRandomInt(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function isTouchDevice() {
  return 'ontouchstart' in document.documentElement;
}

function glyphHover () {
  var expandElem = this.querySelector('.expand-list')
  var children = expandElem.children;
  expandElem.classList.add('active')
  for(var i = 0, l = children.length; i < l; i++) {
    children[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
    children[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
  }
}
function glyphUnHover () {
  var expandElem = this.querySelector('.expand-list')
  expandElem.classList.remove('active')
}

var cycle = document.querySelectorAll('.expand');

cycle.forEach(function(e) {
  e.parentElement.addEventListener("mouseenter", glyphHover, false)
  e.parentElement.addEventListener("mouseleave", glyphUnHover, false)
  if (isTouchDevice()) {
    e.parentElement.addEventListener("click", glyphHover, false)
  }
})
