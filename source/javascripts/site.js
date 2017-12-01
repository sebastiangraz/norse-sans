function setScaledFont(){
    var el = document.getElementsByClassName("fill");
    for(var i = 0; i < el.length; i++){
      var s  = el[i].offsetWidth,
          f  = 0.24, //0.24
          fs = s * f;
      el[i].style.fontSize = fs + '%'
    }
}



// function recalcTextRepeat() {
//   var expandElem = document.querySelectorAll('.intro-questions > .intro-question > .intro-question-text')
//   var totalWidth = 0;
//
//   for(var i = 0, l = expandElem.length; i < l; i++) {
//     // console.log(expandElem[i].getBoundingClientRect().width);
//     // var text = child[i].innerHTML.repeat(1);
//     // child[i].insertAdjacentHTML('beforeend', text)
//     var fits = Math.floor( window.innerWidth / expandElem[i].offsetWidth )
//     // console.log(expandElem[i]);
//     console.log(  expandElem[i].offsetWidth % window.innerWidth + 'hey');
//
//     var text = expandElem[i].innerHTML.repeat(fits);
//     expandElem[i].insertAdjacentHTML('beforeend', text)
//
//   }
// }



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


// let totalWidths = Array.from(
//   document.querySelectorAll('.intro-question'),
//   nowrap => Array.from(
//     nowrap.children,
//     child => child.offsetWidth
//   ).reduce((total, width) => total + width)
// )
// console.log(totalWidths)



// for (var i = 0; i < totalWidths.length; i++) {
//   console.log(totalWidths[i]);
//   var fits = Math.floor( window.innerWidth / totalWidths[i] )
//   console.log(expandElem[i]);
//   if (fits > 0) {
//     var text = expandElem[i].innerHTML.repeat(fits);
//     expandElem[i].insertAdjacentHTML('beforeend', text)
//   }
// }
//
// $('#hero').each(function(){
//   var child = $(this).children();
//   var t=0;
//     $(this).width(function(i,w){
//       t+=w;
//     });
//   console.log(t);
//   // $(this).each(function() {
//   //   console.log(width += $(this).width())
//   // });
// });
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

var range = document.querySelector('#myRange');
var weightParent = document.querySelector('.intro-questions');
var weightIndicator = document.querySelector('.weight-indicator')

range.oninput = function() {

  console.log(Math.round(this.value/100));
  var percentage = this.value / 500 * 100;

  weightParent.className = "intro-questions";
  Object.assign(weightIndicator.style,{transform:'translateX(-' + percentage +'% )', left: percentage + '%' });

    switch (parseInt(this.value/100)) {
      case 0:
        weightIndicator.innerHTML='Thin'
        weightParent.classList.add('fw2');
        break;
      case 1 :
        weightIndicator.innerHTML='Light'
        weightParent.classList.add('fw3');
        break;
      case 2:
        weightIndicator.innerHTML='Regular'
        weightParent.classList.add('fw4');
        break;
      case 3:
        weightIndicator.innerHTML='Demibold'
        weightParent.classList.add('fw5');
        break;
      default:
        weightIndicator.innerHTML='Bold'
        weightParent.classList.add('fw6');
        break;
    }
}

var textCopy = document.querySelectorAll('.intro-question-text')
for (var i = 0; i < textCopy.length; i++) {
  var text = textCopy[i].innerHTML.repeat(5)
  textCopy[i].insertAdjacentHTML('beforeend', text)
}

var WIN_H,
    WIN_W,
    qFrame = [];

var questions = document.querySelectorAll('.intro-question');
var scrollRequest;
var qScrollPositions = [];
var passiveRepeaters = [];
var repeater;

function initIntroScript() {
  Array.prototype.map.call(questions, function(q, i) {
    addImageHover(i);
  })
  window.addEventListener('resize', resizeHandler);
  resizeHandler();
}

function addImageHover(i) {
  qFrame[i] = 0;
  qScrollPositions[i] = Math.floor(Math.random() * -200);
  questions[i].querySelector('.intro-question-text').style.transform = 'translate3d(' + qScrollPositions[i] + 'px,0,0)';
  questions[i].addEventListener('mouseenter', function() {
    // console.log("mouseenter -> " + i);

    clearInterval(passiveRepeaters[i]);
    repeater = setInterval(function() {
      scrollQuestionText(i);

    }, .001);
  });

  questions[i].addEventListener('mouseleave', function() {
    //console.log("mouseleave -> " + i);
    clearInterval(repeater);
    passiveRepeaters[i] = setInterval(function() {

      scrollQuestionText(i);
    }, 40);
  });

  passiveRepeaters[i] = setInterval(function() {
  	scrollQuestionText(i);
  }, 40);
}

function scrollQuestionText(i) {
  var shift = Math.floor(4 + WIN_W/800) * Math.min(0.2, qFrame[i] / 10);
  cancelAnimationFrame(scrollRequest);
  var el_text = questions[i].querySelector('.intro-question-text');
  qScrollPositions[i] = qScrollPositions[i] - shift;
  if (qScrollPositions[i] < -el_text.clientWidth / 2 - 5) {
    qScrollPositions[i] = 0;
  }
  el_text.style.transform = 'translate3d(' + qScrollPositions[i] + 'px,0,0)'
  qFrame[i]++;
}

initIntroScript();

function resizeHandler() { // NEEDS TO NOT BREAK ON RESIZE
  WIN_W = window.innerWidth;
  WIN_H = window.innerHeight;
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




var rafId = null;
var delay = 150;
var lTime = 0;

function scroll() {
  var scrollTop = $(window).scrollTop();
  var height = $(window).height()
  var visibleTop = scrollTop + height;
  $('.reveal').each(function() {
    var $t = $(this);
    if ($t.hasClass('reveal_visible')) { return; }
    var top = $t.offset().top;
    if (top <= visibleTop) {
      if (top + $t.height() < scrollTop) {
        $t.removeClass('reveal_pending').addClass('reveal_visible');
      } else {
        $t.addClass('reveal_pending');
        if (!rafId) requestAnimationFrame(reveal);
      }
    }
  });
}
function reveal() {
  rafId = null;
  var now = performance.now();

  if (now - lTime > delay) {
    lTime = now;
    var $ts = $('.reveal_pending');
    $($ts.get(0)).removeClass('reveal_pending').addClass('reveal_visible');
  }


  if ($('.reveal_pending').length >= 1) rafId = requestAnimationFrame(reveal);
}

$(scroll);
$(window).scroll(scroll);
