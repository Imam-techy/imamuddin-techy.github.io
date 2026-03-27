var canvas=document.getElementById("matrix");
var ctx=canvas.getContext("2d");

canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

var letters="01";
letters=letters.split("");

var fontSize=14;
var columns=canvas.width/fontSize;

var drops=[];

for(var x=0;x<columns;x++)
{
 drops[x]=1;
}

function draw()
{
 ctx.fillStyle="rgba(0,0,0,0.05)";
 ctx.fillRect(0,0,canvas.width,canvas.height);

 ctx.fillStyle="#0F0";
 ctx.font=fontSize+"px monospace";

 for(var i=0;i<drops.length;i++)
 {
  var text=letters[Math.floor(Math.random()*letters.length)];

  ctx.fillText(text,i*fontSize,drops[i]*fontSize);

  if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)
  {
   drops[i]=0;
  }

  drops[i]++;
 }
}

setInterval(draw,33);

const lines = [
"> initializing_security_profile...",
"> loading_network_engineer_data...",
"> scanning_network_modules...",
"> activating_security_dashboard...",
"> portfolio_status: ONLINE"
];

const terminal = document.getElementById("terminal");

let lineIndex = 0;
let charIndex = 0;

function typeLine(){

if(lineIndex >= lines.length) return;

let line = lines[lineIndex];

if(charIndex < line.length){

terminal.innerHTML += line.charAt(charIndex);
charIndex++;

setTimeout(typeLine,40);

}else{

terminal.innerHTML += "<br>";
lineIndex++;
charIndex = 0;

setTimeout(typeLine,400);

}

}


typeLine();


const input = document.getElementById("commandInput");
const output = document.getElementById("terminalOutput");