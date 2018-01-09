function setScaledFont(){
    var el = document.getElementsByClassName("fill");
    for(var i = 0; i < el.length; i++){
      var s  = el[i].offsetWidth,
          f  = 0.24, //0.24
          fs = s * f;
      el[i].style.fontSize = fs + '%'
    }
}
function wrapInnerChildren() {
  var contentBlocks = document.querySelectorAll('.content')[0].children
  for (var i = 0; i < contentBlocks.length; i++) {
    wrapInner(contentBlocks[i], 'div', ['cf', 'min-vh-100-ns', 'w-100', 'flex', 'items-center', 'justify-center']);
    wrapInner(contentBlocks[i].children[0], 'div', ['w-100']);
  }
}

var wrapInner = (parent, wrapper, classes) => {

  if (typeof wrapper === "string") {
    wrapper = document.createElement(wrapper);
    classes.map(item => wrapper.classList.add(item));
  }

  var div = parent.appendChild(wrapper);
  while(parent.firstChild !== wrapper)
      wrapper.appendChild(parent.firstChild);
}

// var allGlyphsEl = document.querySelector('.all-glyphs');
// var allGlyphs = "AÁĂẰǍÂÄÀĀĄÅÃÆBCĆČÇĊDÐĎĐEÉĚÊËĖÈĒĘFGĞĢĠHĦIÍǏÎÏİÌĪĮJKĶLĹĽĻĿŁMḾNŃŇŅŊÑOÓǑÔÖÒŐŌØÕŒPÞQRŔŘŖSŚŠŞȘTŦŤŢȚUÚǓÛÜǗǙǛǕÙŰŪŲŮVWẂŴẄẀXYÝŶŸỲZŹŽŻaáăǎâäàāąåãæbcćčçċdðďđeéěêëėèēęẽfgğģġhħiıíǐîï/idotaccentìīįjȷkķlĺľļŀłmḿnńňņŋñoóǒôöòőōøõœpþqrŕřŗsśšşșßtŧťţțuúǔûüǘǚǜǖùűūųůvwẃŵẅẁxyýŷÿỳzźžżΔΠΩπ0123456789₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹⁄½¼¾⅛⅜⅝⅞*·•:,…!¡#.?¿;/_{}[]()—–-«»‹›„“”‘’‚¢¤$€ƒ£¥+−×÷=≠><≥≤±≈~¬∅∞∫∏∑√∂µ%‰↑↗→↘↓↙←↖↔↕◊@&¶§©®™°|¦†‡^̵̶̷̸̧̨̦̇̀́̋̂̌̆̊̃̄̒´˘ˇ¸ˆ¨˙`˝¯˛˚˜/"
// for (var i = 0; i < allGlyphs.length; i++) {
//   var glyphs = Array.from(allGlyphs[i]).toString();
//   var list = document.createElement("li");
//   list.classList.add('w3', 'h3', 'fl');
//   list.innerHTML = (allGlyphs[i]);
//   wrapInner(list, 'span', ['tc', 'f3', 'dib', 'aspect-ratio', 'aspect-ratio--1x1'])
//   wrapInner(list.children[0], 'li', ['aspect-ratio--object'])
//   allGlyphsEl.appendChild(list);
// }



window.onresize = function () {
  setScaledFont()
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


var range = document.querySelector('#myRange');
var weightParent = document.querySelector('.intro-questions');
var weightIndicator = document.querySelector('.weight-indicator')

var rangeSlider = document.getElementById('slider');

noUiSlider.create(rangeSlider, {
	start: [ 0 ],
	range: {
		'min': [  0 ],
		'max': [ 500 ]
	}
  // ,pips: {
	// 	mode: 'positions',
	// 	values: [0,20,40,60,80,100],
	// 	density: 2,
	// 	stepped: true
	// }
});
rangeSlider.noUiSlider.on('update', function( values, handle ) {
  var percentage = values[handle] / this.options.range.max[0] * 100;
  Object.assign(weightIndicator.style,{transform:'translateX(-' + percentage +'% )', left: percentage + '%' });
  weightParent.className = "intro-questions";
  switch (parseInt(values[handle]/100)) {
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
});


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
  var scrollHeight = expandElem.scrollHeight;
  $( expandElem ).animate({
    top: -scrollHeight + this.getBoundingClientRect().height,
  }, 2000, function() {
    // Animation complete.
  });
  // for(var i = 0, l = children.length; i < l; i++) {
  //   children[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
  //   children[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
  // }
}
function glyphUnHover () {
  var expandElem = this.querySelector('.expand-list')
  expandElem.classList.remove('active')
  $( expandElem ).animate({
    top: 0
  }, 1000, function() {
    // Animation complete.
  });
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
