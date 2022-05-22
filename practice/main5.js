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
