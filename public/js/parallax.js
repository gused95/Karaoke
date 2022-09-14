const body = document.getElementById('parallax');
body.addEventListener('mousemove',e=>{
  const banner = document.getElementById('banner');  
  banner.style.bottom = `${e.clientY * 0.1}px`;
  banner.style.right = `${e.clientX * 0.1}px`;
  if(parseFloat(banner.style.right) >100.6){
    banner.style.right='100.6px';  
  }
});
