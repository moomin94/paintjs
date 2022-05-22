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
}
