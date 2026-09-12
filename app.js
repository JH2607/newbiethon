/* ============================================================
   app.js — 공용 기능 (화면 전환, 새로고침, 현재 로그인 사용자)
   ⚠️ 셋이 같이 있을 때만 수정
   ============================================================ */

// 지금 로그인한 사람의 아이디. A가 로그인 성공 시 여기에 넣습니다.
let currentUserId = null;

// 지금 보고 있는 칸 번호. B가 출발/도착지 지정 시 여기에 넣습니다.
let currentCar = null;


/* 화면 전환 — showScreen(1) / showScreen(2) / showScreen(3) */
function showScreen(n) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  document.getElementById("screen" + n).classList.add("active");
  if (n === 3) refresh();
}

/* 팝업 열기 / 닫기 — openPopup("signupPopup") */
function openPopup(id) {
  document.getElementById(id).classList.add("active");
}
function closePopup(id) {
  document.getElementById(id).classList.remove("active");
}


/* 새로고침 — 화면 3의 내용을 데이터 기준으로 다시 그립니다.
   B와 C는 아래 두 함수만 자기 파일에 만들면 됩니다.
   (아직 안 만들었어도 에러 안 나게 처리해놨습니다) */
function refresh() {
  if (currentCar === null) return;

  document.getElementById("carNumberLabel").textContent = currentCar + "호차";

  if (typeof renderProfiles === "function") renderProfiles(currentCar);  // B
  if (typeof renderSeatMap === "function") renderSeatMap(currentCar);    // C
}


/* 팝업 열기 단축 함수 — index.html 버튼들이 부릅니다 */
function openRoutePopup() { openPopup("routePopup"); }   // B
function openSitPopup()   { openPopup("sitPopup");   }   // C
