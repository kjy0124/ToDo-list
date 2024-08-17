const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

const creatTodo = function () {
  const newLi = document.createElement('li'); //createEleent를 사용하여 dom의 노드를 생성
  const newSpan = document.createElement('span');
  const newBtn = document.createElement('button');

  newBtn.addEventListener('click', () => {
    //버튼을 클릭했을 때
    newLi.classList.toggle('complete'); //새로 생성된 newLi 태그에 complete 클래스를 추가
    //toggle을 사용함으로써 처음에 버튼을 클릭하면 클래스가 생성되고 한 번 더 누르면 삭제
    saveItemsFn();
  });

  newLi.addEventListener('dblclick', () => {
    //버튼을 더블 클릭 했을 때 리스트 삭제
    newLi.remove();
  });

  newSpan.textContent = todoInput.value;
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
  //각 리스트를 저장하고 있는 배열을 로컬스토리지에 저장
  //JSON : 객체나 배열 자체를 문자열로 변환해줄 수 있는 데이터 포멧
  localStorage.setItem('saved-items', JSON.stringify(savesItems));
};
