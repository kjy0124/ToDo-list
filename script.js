const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

//로컬 스토리지에서 데이터를 꺼내오기
//JSON.parse : 문자열로 변환된 데이터가 JSON데이터 포멧을 가지고 있다면 원본 데이터 형태로 다시 변환
const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));

const creatTodo = function (storageData) {
  //위 매개 변수 전달 인자를 받기 위한 변수 storageData
  let todoContents = todoInput.value;
  if (storageData) {
    //만약 현재 매개변수로 전달 받는 스토리지 데이터가 존재한다면
    todoContents = storageData.contents; //todoContents를 스토리지 데이터에 콘텐츠로 변환
  }

  const newLi = document.createElement('li'); //createEleent를 사용하여 dom의 노드를 생성
  const newSpan = document.createElement('span');
  const newBtn = document.createElement('button');

  newBtn.addEventListener('click', () => {
    //버튼을 클릭했을 때
    newLi.classList.toggle('complete'); //새로 생성된 newLi 태그에 complete 클래스를 추가
    //toggle을 사용함으로써 처음에 버튼을 클릭하면 클래스가 생성되고 한 번 더 누르면 삭제
    saveItemsFn();
  });

  //리스트에서 취소 줄이 그어져있는 상태에서 새로고침을 했을 때 그 취소 줄이 없어지지 않도록 하는 조건문
  if (storageData?.complete) {
    //?undefined인 storageData 값에 complete를 찾으려고 시도를 해서 에러 발생함
    //위와 같은 에러가 나오지 않기위해 ?(옵셔널체이닝)를 사용
    //? 사용하게 되면 storageData가 undefined거나 다른 값인 경우에는 complete를 찾지 않음
    ////if (storageData && storageData.complete) {와 같음

    //complete 상태가 true라면, 즉 취소 줄이 그어져있는 상태라면
    newLi.classList.add('complete');
  }

  newLi.addEventListener('dblclick', () => {
    //버튼을 더블 클릭 했을 때 리스트 삭제
    newLi.remove();
    saveItemsFn(); //더블 클릭하여 리스트를 삭제한 후 새로고침 했을 때 남아있지 않도록 하기 위해 함수 호출
  });

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan); //newLi의 자식노드로 newSpan을 설정
  todoList.appendChild(newLi); //ul 태그 변수 todoList의 자식 노드로 newLi를 설정
  todoInput.value = ''; //input 창에 텍스트 입력 후 그 공간이 리스트에 입력되면 자동으로 빈 공간으로 만들어줌
  saveItemsFn();
};

const keyCodeCheck = function () {
  //엔터키 누를 때 밑의 조건문 실행
  if (window.event.keyCode === 13 && todoInput.value !== '') {
    creatTodo();
  }
};

//전체 삭제를 위한 함수
const deleteAll = function () {
  const liList = document.querySelectorAll('li');
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn(); //전체 삭제를 헀음에도 불구하고 새로고침 했을 때 리스트가 남아있을 것을 대비
};

//리스트 데이터 저장을 위한 함수
const saveItemsFn = function () {
  const savesItems = []; //리스트 데이터를 담을 배열

  //todoList의 자식요소 길이만큼 반복
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector('span').textContent, //todoList의 자식요소 개수만큼 반복하되 그 자식요소의 span의 textContent를 저장
      complete: todoList.children[i].classList.contains('complete'),
      /*todoList의 children의 i번째 li 태그가 가지고 있는 class 안에 
      complete라고 하는 class가 존재 하는지 안하는지를 이 반복문에 담아줌
      사용자가 버튼을 클릭했을 때 complete 값은 true 클릭하지 않았으면 false를 반환
      */
    };
    savesItems.push(todoObj); //배열 안에 객체가 push
  }

  //아래 코든느 삼항 연산자
  // 조건문 ? 조건문이 성립할 때 실행 : 조건문이 성립안할 때 실행
  savesItems.length === 0
    ? localStorage.removeItem('saved-items')
    : localStorage.setItem('saved-items', JSON.stringify(savesItems));

  //만약 로컬스토리지가 빈 배열이라면
  // if (savesItems.length === 0) {
  //   localStorage.removeItem('saved-items'); //빈 배열 메모리 공간 모두 삭제
  // } else {
  //   //각 리스트를 저장하고 있는 배열을 로컬스토리지에 저장
  //   //JSON : 객체나 배열 자체를 문자열로 변환해줄 수 있는 데이터 포멧
  //   localStorage.setItem('saved-items', JSON.stringify(savesItems));
  // }
};

//호이스팅이 발생하지 않도록 하기 위해서 표현식 함수인 createTodo 함수 아래쪽으로 코드 배치
//savedTodoList에서 saved-items라는 키를 가진 데이터가 존재 하는지 안하는지 확인하는 조건문
//로컬스토리지에서 가져온 데이터가 존재한다면 실행
if (savedTodoList) {
  //savedTodoList는 배열이므로 이 배열의 길이만큼 반복
  for (let i = 0; i < savedTodoList.length; i++) {
    //밑 코드를 사용하여 creatTodo 함수로 매개 변수 전달인자 넣어줌
    creatTodo(savedTodoList[i]);
  }
}

const weatherSearch = function (position) {
  console.log(position.latitude);
  console.log(position.longitude);
  const openweatherRes = fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${position.latitude}&lon=${position.longitude}&appid=65092784818426e0fce6d8b68d6844fa`
  );
  console.log(openweatherRes);
};

//현재 위치 정보 가져오기
const accessToGeo = function (position) {
  const positionObj = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  weatherSearch(positionObj);
};

const askForLocation = function () {
  //콜백함수로 객체를 유일한 매개변수로 받음
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    console.log('에러가 발생하였습니다.');
  });
};
askForLocation();
