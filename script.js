gsap.from(".hero-text",{
y:50,
opacity:0,
duration:1.2
});

gsap.from(".hero img",{
scale:1.1,
duration:1.5
});

gsap.from(".card",{
scrollTrigger:{
trigger:".cards",
start:"top 80%"
},
y:50,
opacity:0,
duration:1,
stagger:.2
});
