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
