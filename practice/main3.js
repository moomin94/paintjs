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
