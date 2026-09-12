<script src="data.js"></script>
<script src="main.js"></script>
/* ============================================================
   data.js  —  팀 공용 데이터 파일
   ⚠️ 이 파일은 A만 수정합니다. B와 C는 읽기만 하세요.
   ⚠️ 구조를 바꿔야 하면 반드시 셋이 모여서 같이 바꿉니다.
   ============================================================ */


/* ------------------------------------------------------------
   1. 6호선 역 목록
   배열 순서 = 실제 열차가 지나가는 순서입니다.
   그래서 인덱스(번호)를 비교하면 "누가 먼저 내리는지"를
   바로 알 수 있어요. 이게 우리 앱의 핵심입니다.
   ------------------------------------------------------------ */
const LINE6 = [
  // 응암순환 구간
  "응암", "역촌", "불광", "독바위", "연신내", "구산",
  // 본선
  "새절", "증산", "디지털미디어시티", "월드컵경기장",
  "마포구청", "망원", "합정", "상수", "광흥창", "대흥",
  "공덕", "효창공원앞", "삼각지", "녹사평", "이태원",
  "한강진", "버티고개", "약수", "청구", "신당", "동묘앞",
  "창신", "보문", "안암", "고려대", "월곡", "상월곡",
  "돌곶이", "석계", "태릉입구", "화랑대", "봉화산", "신내"
];


/* ------------------------------------------------------------
   2. 회원 정보 (잘 안 바뀌는 정보)
   ------------------------------------------------------------ */
let USERS = [
  { id: "jh2607",  pw: "1234", name: "정현",  age: 22, gender: "남",
    pregnant: false, elderly: false },

  { id: "minji",   pw: "1234", name: "민지",  age: 29, gender: "여",
    pregnant: true,  elderly: false },   // 임산부 → 연핑크 카드

  { id: "grandpa", pw: "1234", name: "김철수", age: 71, gender: "남",
    pregnant: false, elderly: true  },   // 노약자 → 연노랑 카드

  { id: "sujin",   pw: "1234", name: "수진",  age: 24, gender: "여",
    pregnant: false, elderly: false },

  { id: "dohyun",  pw: "1234", name: "도현",  age: 26, gender: "남",
    pregnant: false, elderly: false },

  { id: "yeeun",   pw: "1234", name: "예은",  age: 21, gender: "여",
    pregnant: false, elderly: false }
];


/* ------------------------------------------------------------
   3. 탑승 상태 (계속 바뀌는 정보)
   USERS 와는 id 로 연결됩니다.
   seat 이 null 이고 sitting 이 false 면 = 서서 대기 중
   ------------------------------------------------------------ */
let RIDES = [
  { id: "jh2607",  from: "합정",  to: "안암",   car: 3, seat: 7,    sitting: true  },
  { id: "minji",   from: "망원",  to: "공덕",   car: 3, seat: 12,   sitting: true  },
  { id: "grandpa", from: "응암",  to: "석계",   car: 3, seat: 21,   sitting: true  },
  { id: "sujin",   from: "합정",  to: "이태원", car: 3, seat: 4,    sitting: true  },
  { id: "dohyun",  from: "상수",  to: "신당",   car: 3, seat: null, sitting: false },
  { id: "yeeun",   from: "대흥",  to: "고려대", car: 5, seat: 9,    sitting: true  }
];


/* ------------------------------------------------------------
   4. 저장 / 불러오기
   브라우저를 새로고침해도 데이터가 안 날아가게 합니다.
   데이터를 바꾼 뒤에는 반드시 saveAll() 을 호출하세요!
   ------------------------------------------------------------ */
function saveAll() {
  localStorage.setItem("USERS", JSON.stringify(USERS));
  localStorage.setItem("RIDES", JSON.stringify(RIDES));
}

function loadAll() {
  const u = localStorage.getItem("USERS");
  const r = localStorage.getItem("RIDES");
  if (u) USERS = JSON.parse(u);
  if (r) RIDES = JSON.parse(r);
}

// 저장된 게 꼬였을 때 위 가짜 데이터로 되돌리는 버튼용.
// 시연 직전에 한 번 눌러서 깨끗한 상태로 시작하세요.
function resetAll() {
  localStorage.clear();
  location.reload();
}

// 페이지가 열리면 자동으로 불러오기
loadAll();


/* ------------------------------------------------------------
   5. 도우미 함수 — B와 C는 이것만 쓰면 됩니다
   ------------------------------------------------------------ */

// 아이디로 회원 정보 찾기
function findUser(id) {
  return USERS.find(u => u.id === id);
}

// 아이디로 탑승 상태 찾기
function findRide(id) {
  return RIDES.find(r => r.id === id);
}

// 회원가입 — 성공하면 true, 아이디 중복이면 false
function addUser(user) {
  if (findUser(user.id)) return false;
  USERS.push(user);
  saveAll();
  return true;
}

// 로그인 확인 — 맞으면 회원 객체, 틀리면 null
function checkLogin(id, pw) {
  const u = findUser(id);
  return (u && u.pw === pw) ? u : null;
}

// 출발/도착지·칸번호 지정
function setRoute(id, from, to, car) {
  let ride = findRide(id);
  if (!ride) {
    ride = { id, from, to, car, seat: null, sitting: false };
    RIDES.push(ride);
  } else {
    ride.from = from;
    ride.to = to;
    ride.car = car;
  }
  saveAll();
}

// 착석 처리
function sitDown(id, seatNo) {
  const ride = findRide(id);
  if (!ride) return false;
  ride.seat = seatNo;
  ride.sitting = true;
  saveAll();
  return true;
}

// 일어서기 (내릴 때)
function standUp(id) {
  const ride = findRide(id);
  if (!ride) return false;
  ride.seat = null;
  ride.sitting = false;
  saveAll();
  return true;
}

/* --- B가 프로필 리스트 만들 때 쓰는 함수 ---
   특정 칸에 있는 사람들을 회원정보 + 탑승정보 합쳐서 돌려줍니다.
   예: getPeopleInCar(3)
   → [{ id, name, pregnant, elderly, from, to, seat, sitting }, ...] */
function getPeopleInCar(carNo) {
  return RIDES
    .filter(r => r.car === carNo)
    .map(r => ({ ...findUser(r.id), ...r }));
}

/* --- C가 좌석배치도 색칠할 때 쓰는 함수 ---
   그 칸에서 이미 점유된 좌석번호 배열을 돌려줍니다.
   예: getTakenSeats(3) → [4, 7, 12, 21] */
function getTakenSeats(carNo) {
  return RIDES
    .filter(r => r.car === carNo && r.sitting && r.seat !== null)
    .map(r => r.seat);
}

/* --- 우리 앱의 핵심 기능 ---
   역 이름을 인덱스(몇 번째 역인지)로 바꿉니다.
   숫자가 작을수록 먼저 내리는 사람이에요.
   예: stationIndex("합정") → 12 */
function stationIndex(station) {
  return LINE6.indexOf(station);
}

/* 특정 칸 사람들을 "먼저 내리는 순서"로 정렬해서 돌려줍니다.
   B는 이걸로 프로필 리스트를 정렬하면 됩니다.
   맨 위에 뜨는 사람 = 제일 먼저 내리는 사람 = 그 앞에 서면 되는 사람! */
function getPeopleSortedByExit(carNo) {
  return getPeopleInCar(carNo)
    .sort((a, b) => stationIndex(a.to) - stationIndex(b.to));
}

/* 나보다 먼저 내리는 사람만 골라내기 (선택 기능)
   예: whoLeavesBeforeMe(3, "안암") */
function whoLeavesBeforeMe(carNo, myDestination) {
  const myIdx = stationIndex(myDestination);
  return getPeopleInCar(carNo)
    .filter(p => p.sitting && stationIndex(p.to) < myIdx)
    .sort((a, b) => stationIndex(a.to) - stationIndex(b.to));
}
