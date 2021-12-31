const canvas = document.querySelector(".myCanvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);


var lastX;
var lastY;
var mouseX;
var mouseY;
var isMouseDown=false;

let array = [];
let index = -1;

// getting the selected colour
var  colour = document.querySelector(".picker");
function getColour(){
    
    return (colour.value);  
}
//getting the size
var size = document.querySelector(".size-box");
function getSize(){
    return size.value;
}

// drawing start

function start(e){
    
    ctx.beginPath();
    mouseX=parseInt(e.clientX);
    mouseY=parseInt(e.clientY);

    lastX=mouseX;
    lastY=mouseY;
    isMouseDown=true;
  }
  
  function stop(e){
    ctx.closePath();
    mouseX=parseInt(e.clientX);
    mouseY=parseInt(e.clientY);
    isMouseDown=false;

    if (e.type != 'mouseout') {
      array.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
      index++;
    }
  }
  
  function out(e){
    ctx.closePath();
    mouseX=parseInt(e.clientX);
    mouseY=parseInt(e.clientY);
    isMouseDown=false;
  }
  
  function draw(e){
    // checks the mode wheter it is pen spray or eraser
    if(isMouseDown){
      mouseX=parseInt(e.clientX);
      mouseY=parseInt(e.clientY);
      
      if(mode=="pen"){
        ctx.strokeStyle = getColour();
        ctx.lineWidth = getSize();
        ctx.lineCap = "round";
        ctx.globalCompositeOperation = 'source-over';
        
        ctx.lineTo(mouseX,mouseY);
        ctx.stroke();  
      
      }
  
      else{
        ctx.globalCompositeOperation="destination-out";
        ctx.lineWidth = getSize();
        ctx.arc(lastX,lastY,8,0,Math.PI*2,false);
        ctx.fill();
      }
      lastX=mouseX;
      lastY=mouseY;
    }
}
canvas.addEventListener("mousedown" , start);
canvas.addEventListener("mouseup" , stop);
canvas.addEventListener("mouseout" , out);
canvas.addEventListener("mousemove", draw);

// for mobile and tablet
canvas.addEventListener("touchstart", start);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stop);

var mode="pen";
document.querySelector("#pen").addEventListener("click" , function(){mode = "pen"});

document.querySelector("#eraser").addEventListener("click" , function(){mode = "eraser"});

// undo button

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  array = [];
  index = -1;
}

function undo() {
  if (index <= 0) {
      clearCanvas();
  } else {
      index -= 1;
      array.pop();
      ctx.putImageData(array[index], 0, 0);
  }
}
  













