// 일단 캔버스가 있어야하고
const canvas = document.querySelector("#jsCanvas");
// canvas에 getContext("2d") 메소드 호출하여 컨텐츠를 담을수 있게 해줌
// 그걸 ctx라는 변수에 담아 선언.
const ctx = canvas.getContext("2d");

// canvas의 width , height값 주기
const INITIAL_SIZE = 600;
canvas.width = INITIAL_SIZE;
canvas.height = INITIAL_SIZE;

// 먼저 ctx의 선색, 선굵기, 배경색 주기 strokeStyle, lineWidth, fillStyle
//저장할때 배경색 안칠하면 배경이 투명하게 저장되는걸 확인했기 때문에
//제일 위에 canvas의 배경색인 fillStyle 지정하고 fillRect로 사각형 만들어주기
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 600, 600);
ctx.strokeStyle = "#272727";
ctx.lineWidth = 2.5;
ctx.fillStyle = "#272727";

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
  //filling 함수 주러 왔습니다.
  canvas.addEventListener("click", handleCanvasClick);
  //save 함수 주러 왔습니다.
  // canvas.addEventListener("contextmenu", handleCM);
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
  //선을 긋다가 놓으면 fill이 되는 현상때문에 아예 캔버스에 마우스 클릭하는 순간
  //filling=true 상태면 걍 fill해버리기
  if (filling) {
    ctx.fillRect(0, 0, 600, 600);
  }
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

// 각 색 div를 colors라는 변수에 담고 선언
//가져올땐 getElementByClassName으로..!
const colors = document.getElementsByClassName("jsColor");

//console.log(colors) 해보면 해당 클래스를 가진 div가 9개니깐 html collection이 나옴.
// console.log(colors);

// 우리는 이걸 array로 바꿔줄건데 바꿔주는 메소드는 Array.from(변수)
//그 배열에 각각의 아이템들에게 해당 아이템 클릭했을때의 함수를 지정해줘야 하므로 forEach메소드 + 이벤트리스너사용
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

// 핸들러 함수를 선언 -> color라는 변수에 해당 클릭한 div의 target의 style의 backgroundColor를 담아 준다.
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  //콘텍스트의 선색은 div의 backgroundColor와 동일해야 하므로 color를 할당해줌.
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//선 굵기 조절해주자! type=range인 input을 가지고 오자
const range = document.querySelector(".controls__range input");

// 해당 input을 조절해줄때마다 -> "input"할때마다 이벤트가 발생해야 하므로 이벤트 리스너 주기!
if (range) {
  range.addEventListener("input", handleRangeChange);
}

//콘텍스트의 선굵기 lineWidth는 조절된(옮겨진) range의 value값과 동일해야 함!
function handleRangeChange(event) {
  ctx.lineWidth = event.target.value;
}

//버튼에 있는 글자 fill을 paint로 바꿔주기!!
//일단 fill을 누르면 filling (채워지는 상태인거고) 글자는 paint로 바뀐다
//기본값이 paint준비상태이고 flling 상태는 아니니깐 일단은 false값
let filling = false;

// 일단 fill적힌 버튼을 변수로 선언해줌
const mode = document.getElementById("jsMode");

// mode 버튼을 클릭하면 fill을 paint로 바꿔준다
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

//클릭할때마다 fill ↔ paint 왔다갔다 하는 함수!
//일단 filling이 지금 false값이야.(버튼에 글자는 fill). 근데 클릭을 해.
//그럼 false값일때 우리는 버튼안의 텍스트를 paint로 바꿔줄거야. 그리고 filling값에 !filling값을 집어넣어. 그럼 지금상황은?
// filling은 true야.
//이때 다시 클릭을 해 . 그럼 filling값이 true일때 일어날일 -> else안에 선언.
// paint 글자를 다시 fill로 바꿔줘. 그리고 filling값을 다시 !filling값으로 바꿔. 그럼 true에서 false로 변했어! 짱짱!
function handleModeClick() {
  if (!filling) {
    mode.innerText = "paint";
    filling = !filling;
  } else {
    mode.innerText = "fill";
    filling = !filling;
  }
}

//그다음에 우리가 fill을 눌렀을때 canvas를 클릭하면 canvas전체가 선택한div색으로 바껴야해!
//아까 canvas addEventListener 해줬던 곳으로 올라가자!
//if(canvas) { canvas.addEventListener("click", handleCanvasClick)}
//아까 handleColorClick 함수 선언한 곳으로 가자!
//function handleColorClick(event) { ctx.fillStyle = color;}
//클릭했을때 이벤트리스너 추가하고 + colorclick 함수에 fillStyle도 color로 넣어주고
//다시 아래로 내려왔음! 함수를 선언하자
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, 600, 600);
  }
}

//근데 선을 긋다가 놓으면 fill이 되는 현상때문에
//아예 캔버스에 마우스 클릭하는 순간 filling=true 상태면 걍 fill해버리기
//그래서 startPainting함수안에도 해당 내용 넣어주기
// function startPainting() { if (filling) { ctx.fillRect(0, 0, 600, 600);}}

//save 버튼 클릭했을때 저장되게 하자!!
// 일단 캔버스 우클릭했을때 나오는 목록 제거 - 기본함수 제거!
// 캔버스 관련된 이벤트니깐 위로 올라가자!
// if (canvas) {canvas.addEventListener("contextmenu", handleCM);}
function handleCM(event) {
  event.preventDefault();
}
// ↑ 우클릭해도 목록 안나온다! save 버튼 클릭 유도

const saveBtn = document.getElementById("jsSave");

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
//함수 선언 전에 배경없이 paint로만 그리면 배경이 투명한 png파일이 됨..!
//그러니 위에서 ctx의 fillStyle과 fillRect의 기본값을 미리 줘야함.!
// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, 600, 600);

//save버튼 클릭했을때 일어날 함수 선언!
//HTMLCanvasElement.toDataURL() 이용!!!! 기본값은 png, ("image/jpeg") 넣어줄수있음
//canvas에 toDataURL() 메소드를 사용하면 지정된 포맷의 이미지 표현을 포함한 data URL을 반환함.
//그리고 나서 a태그를 만들어주는데 어디 넣어줄 필요 없고 자동으로 click되게 만들거임.
//그 a태그에 연결되는 url이 바로 아까 toDataURL에서 얻었던 url임.
// a.href = canvas.toDataURL(); a.download = "이미지명";
//그리고 나서 자동으로 클릭되게 해줌 a.click(); 그럼 끝!
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "CUTE PAINT 🧑‍🎨";
  link.click();
}
