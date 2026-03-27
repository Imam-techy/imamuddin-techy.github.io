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