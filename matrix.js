document.addEventListener("DOMContentLoaded", function(){

const elements=document.querySelectorAll(".type")

let index=0

function typeNext(){

if(index>=elements.length) return

let el=elements[index]

let box=el.closest(".box")

if(box){
box.classList.add("show")
}

let text=el.textContent

el.textContent=""

el.style.visibility="visible"

let charIndex=0

function typeChar(){

if(charIndex<text.length){

el.textContent+=text.charAt(charIndex)

charIndex++

setTimeout(typeChar,15)

}else{

index++

setTimeout(typeNext,300)

}

}

typeChar()

}

typeNext()

})

function matrix(canvas){

const ctx=canvas.getContext("2d")

canvas.height=window.innerHeight
canvas.width=canvas.offsetWidth

const letters="01"
const fontSize=14
const columns=canvas.width/fontSize

const drops=[]

for(let i=0;i<columns;i++){
drops[i]=1
}

function draw(){

ctx.fillStyle="rgba(0,0,0,0.05)"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="#00ff9c"
ctx.font=fontSize+"px monospace"

for(let i=0;i<drops.length;i++){

const text=letters[Math.floor(Math.random()*letters.length)]

ctx.fillText(text,i*fontSize,drops[i]*fontSize)

if(drops[i]*fontSize>canvas.height && Math.random()>0.975){
drops[i]=0
}

drops[i]++

}

}

setInterval(draw,33)

}

matrix(document.getElementById("matrixLeft"))
matrix(document.getElementById("matrixRight"))


/* SCROLL PROGRESS BAR */

window.addEventListener("scroll",function(){

let scrollTop=document.documentElement.scrollTop

let height=document.documentElement.scrollHeight - document.documentElement.clientHeight

let scrolled=(scrollTop/height)*100

document.getElementById("progressBar").style.width=scrolled+"%"

})


/* SCROLL REVEAL */

function reveal(){

let reveals=document.querySelectorAll(".reveal")

for(let i=0;i<reveals.length;i++){

let windowHeight=window.innerHeight

let elementTop=reveals[i].getBoundingClientRect().top

let elementVisible=120

if(elementTop < windowHeight - elementVisible){

reveals[i].classList.add("active")

}

}

}

window.addEventListener("scroll",reveal)


/* MOUSE CYBER TRAIL */

const trailCanvas=document.getElementById("trail")

const tctx=trailCanvas.getContext("2d")

trailCanvas.width=window.innerWidth
trailCanvas.height=window.innerHeight

let trail=[]

document.addEventListener("mousemove",function(e){

trail.push({x:e.clientX,y:e.clientY})

if(trail.length>20){
trail.shift()
}

})

function drawTrail(){

tctx.clearRect(0,0,trailCanvas.width,trailCanvas.height)

for(let i=0;i<trail.length;i++){

tctx.beginPath()

tctx.arc(trail[i].x,trail[i].y,3,0,Math.PI*2)

tctx.fillStyle="#00ff9c"

tctx.fill()

}

requestAnimationFrame(drawTrail)

}

drawTrail()

/* SCROLL REVEAL */

function reveal(){

let reveals=document.querySelectorAll(".reveal")

for(let i=0;i<reveals.length;i++){

let windowHeight=window.innerHeight
let elementTop=reveals[i].getBoundingClientRect().top
let elementVisible=120

if(elementTop < windowHeight - elementVisible){

reveals[i].classList.add("active")

}

}

}

window.addEventListener("scroll",reveal)



/* SKILL BAR ANIMATION */

function skillAnimation(){

let skills=document.querySelectorAll(".bar div")

skills.forEach(skill=>{

let width=skill.getAttribute("style")

skill.style.width=width

})

}

window.addEventListener("scroll",skillAnimation)

/* CLICK EFFECT */

document.addEventListener("mousedown",function(e){

let ripple=document.createElement("div")

ripple.className="click-ripple"

ripple.style.left=e.clientX+"px"
ripple.style.top=e.clientY+"px"

document.body.appendChild(ripple)

setTimeout(function(){

ripple.remove()

},600)

})