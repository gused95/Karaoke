const body = document.getElementById('parallax');
body.addEventListener('mousemove',e=>{
  const banner = document.getElementById('banner');  
  banner.style.bottom = `${e.clientY * 0.1}px`;
  banner.style.right = `${e.clientX * 0.1}px`;
  if(banner.style.right >"53.8px"){
    banner.style.right='53.8px';  
  }
})
