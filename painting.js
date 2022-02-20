const canvas=document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const range = document.getElementById("jsRange");
const jsPallets = Array.from(document.getElementsByClassName("pallet"));
const mode = document.getElementById("jsMode");
const colorOpt = document.getElementById("jsColor");
const save = document.getElementById("jsSave");

ctx.fillStyle="#fff";
ctx.fillRect(0, 0, 500, 500);
ctx.strokeStyle="#000";
ctx.fillStyle="#000";
ctx.lineWidth=2.5;

function changeRange (event) {
    ctx.lineWidth = event.target.value;
}

if (range) {
    document.addEventListener("input", changeRange);
}

function fill(){
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

if (mode) {
    mode.addEventListener("click", fill);
}

function colorOption(){
    if (colorPallet === true) {
        colorPallet = false;
        colorOpt.innerText = "Color1";
        jsPallets.forEach(eachcolor => eachcolor.classList.toggle("hidden"));
    } else {
        colorPallet = true;
        colorOpt.innerText = "Color2";
        jsPallets.forEach(eachcolor => eachcolor.classList.toggle("hidden"));
    }
}

if (colorOpt) {
    colorOpt.addEventListener("click", colorOption);
}

function startFilling() {
    if (filling === true) {
        ctx.fillRect(0, 0, 500, 500);
    } else {
        ctx.stroke();
    }
}

function imageSave() {
    const imgUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = "img";
    link.click();
}

if (save) {
    save.addEventListener("click", imageSave);
}

function colorPick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

jsPallets.forEach(jsPallet => jsPallet.addEventListener("click", colorPick));

let painting = false;
let filling = false;
let colorPallet = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x,y)
    }else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function startPainting(evemt){
    painting=true;
}

function stopPainting(evemt){
    painting=false;
}

function menuDefault(event) {
    event.preventDefault();
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", startFilling);
    canvas.addEventListener("contextmenu", menuDefault);

}
