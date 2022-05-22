// 일단 캔버스가 있어야하고
const canvas = document.querySelector("#jsCanvas");
// canvas에 getContext("2d") 메소드 호출하여 컨텐츠를 담을수 있게 해줌
// 그걸 ctx라는 변수에 담아 선언.
const ctx = canvas.getContext("2d");

// canvas의 width , height값 주기
const INITIAL_SIZE = 600;
canvas.width = INITIAL_SIZE;
canvas.height = INITIAL_SIZE;

// ctx의 선색, 선굵기 주기 strokeStyle, lineWidth
ctx.strokeStyle = "#272727";
ctx.lineWidth = 2.5;

// painting이라는 변할수 있는 변수를 false값을 주고 선언
// 클릭을해야 그려지므로 그때 painting 은 true값이 됨.
let painting = false;

// canvas에 마우스 이벤트리스너들을 추가해줌.!
// mousemove(마우스가 움직일때 - painting이 false/true일때 처리되는 함수), mousedown(마우스가 화면을 클릭했을때 - painting이 true인 함수),
// mouseup(마우스가 화면에서 떼졌을때 - painting이 false인 함수), mouseleave(마우스가 화면밖으로 나갔을때 - painting이 false인 함수)
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

// mousemove될때 일어날 함수는
// 일단 마우스의 x, y 좌표값이 필요함!
// 해당 event의 offsetX와 offsetY값 활용
// 일단 painting이 false일때는 ctx의 메소드를 이용
// 1.출발점을 초기화시켜주는 메소드 beginPath() 2.출발점을 좌표로 옮기는 메소드 moveTo()
// 그후 painting이 true가 되면
// 1.도착점을 좌표로 옮기는 메소드 lineTo() 2.그림을 그려주는 메소드 stroke()
function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
