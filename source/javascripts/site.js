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

    charset.className = "charset"
    charset.classList.toggle(weightItem);
  }, false);
}

function randomString() {
    var text = "";
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
