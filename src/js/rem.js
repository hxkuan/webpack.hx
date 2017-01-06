// document.documentElement.style.fontSize = $(document.documentElement).width()/3.75 + 'px';
// $(window).on('resize', function() {
//   document.documentElement.style.fontSize = $(document.documentElement).width()/3.75 + 'px';
// })

document.documentElement.style.fontSize = document.documentElement.clientWidth /3.75 + 'px';
window.onresize= function() {
  document.documentElement.style.fontSize = document.documentElement.clientWidth/3.75 + 'px';
};