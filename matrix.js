document.addEventListener("DOMContentLoaded", function(){

const elements=document.querySelectorAll(".type")
const clickSound = document.getElementById("clickSound")

let soundEnabled = false

// 🔥 unlock sound (1st click)
document.addEventListener("click", () => {

  if(!soundEnabled){

    typeSound.play().then(()=>{
      typeSound.pause()
      typeSound.currentTime = 0
    }).catch(()=>{})

    clickSound.play().then(()=>{
      clickSound.pause()
      clickSound.currentTime = 0
    }).catch(()=>{})

    soundEnabled = true
    console.log("Sound Enabled ✅")
  }

})

let index=0

function typeNext(){

if(index>=elements.length) return

let el=elements[index]

let box = el.closest(".box")

if(box){

  // certification ko control karo
  if(box.id === "certification"){

    if(!box.classList.contains("show")){
      box.classList.add("show")
    }

  } else {

    box.classList.add("show")

  }

}

let text=el.getAttribute("data-text") || el.textContent
el.setAttribute("data-text", text)

el.textContent=""
el.style.visibility="visible"

let charIndex=0

function typeChar(){

if(charIndex < text.length){

  el.textContent += text.charAt(charIndex)
  if(soundEnabled){
  typeSound.currentTime = 0
  typeSound.play().catch(()=>{})
}
  charIndex++
  setTimeout(typeChar,15)

}else{

  // 🔥 CERTIFICATE BUTTON SHOW LOGIC
  let parent = el.closest(".cert-item")

  if(parent){
    let btn = parent.querySelector(".cert-link")
    if(btn){
      btn.style.opacity = "1"
      btn.style.pointerEvents = "auto"
    }
  }

  // 🔥 AUTO SCROLL NEXT SECTION (YAHI NAYA CODE HAI)
  let currentBox = el.closest(".box")

// 🔥 check: kya ye last element hai is box ka?
let allInBox = currentBox.querySelectorAll(".type")
let lastElement = allInBox[allInBox.length - 1]

if(el === lastElement){
  let nextBox = currentBox.nextElementSibling

  if(nextBox){
    setTimeout(()=>{
     const yOffset = -80; // navbar height adjust kar (60–100 try kar)
const y = nextBox.getBoundingClientRect().top + window.pageYOffset + yOffset;

window.scrollTo({
  top: y,
  behavior: "smooth"
});
    }, 500)
  }
}

  index++
  setTimeout(typeNext,200)

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

let hue = 0;

function draw(){

// 🔥 TRAIL (always black)
ctx.fillStyle="rgba(0,0,0,0.08)"
ctx.fillRect(0,0,canvas.width,canvas.height)

ctx.font=fontSize+"px monospace"

for(let i=0;i<drops.length;i++){

const text=letters[Math.floor(Math.random()*letters.length)]

// 🔥 EACH NUMBER DIFFERENT COLOR
let color = `hsl(${hue + i*10}, 100%, 60%)`
if(Math.random() > 0.7){
  color = "#00ff9c"
}

ctx.fillStyle = color
ctx.shadowColor = color
ctx.shadowBlur = 6   // glow only numbers

ctx.fillText(text,i*fontSize,drops[i]*fontSize)

if(drops[i]*fontSize>canvas.height && Math.random()>0.975){
drops[i]=0
}

drops[i]++

}

// 🔥 slow smooth change
hue += 0.5
if(hue > 360) hue = 0

// reset shadow
ctx.shadowBlur = 0
}

// 🔥 YE LINE MISSING THI
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


/* ===================== */
/* 3D HOVER EFFECT */
/* ===================== */

document.querySelectorAll(".box").forEach(card => {

  card.addEventListener("mousemove", (e) => {

    let rect = card.getBoundingClientRect()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top

    let centerX = rect.width / 2
    let centerY = rect.height / 2

    let rotateX = -(y - centerY) / 15
    let rotateY = (x - centerX) / 15

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)"
  })

})

/* ===================== */
/* GLOW CURSOR */
/* ===================== */

const cursor = document.getElementById("cursorGlow")

document.addEventListener("mousemove", (e)=>{
  cursor.style.left = e.clientX + "px"
  cursor.style.top = e.clientY + "px"
})

document.querySelectorAll(".cert-link").forEach(link=>{

  link.addEventListener("click", function(e){

    e.preventDefault() // 🔥 stop redirect

    if(soundEnabled){
      clickSound.currentTime = 0
      clickSound.play().catch(()=>{})
    }

    let url = this.href

    // 🔥 delay ke baad open
    setTimeout(()=>{
      window.open(url, "_blank")
    }, 200)

  })

})