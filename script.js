const todoInput = document.querySelector('#todo-input');
const creatTodo = function () {
  const todoList = document.querySelector('#todo-list');
  const newLi = document.createElement('li'); //createEleent를 사용하여 dom의 노드를 생성
  const newSpan = document.createElement('span');
  const newBtn = document.createElement('button');
  console.log(newBtn);

  newBtn.addEventListener('click', () => {
    //버튼을 클릭했을 때
    newLi.classList.toggle('complete'); //새로 생성된 newLi 태그에 complete 클래스를 추가
    //toggle을 사용함으로써 처음에 버튼을 클릭하면 클래스가 생성되고 한 번 더 누르면 삭제
  });

  newSpan.textContent = todoInput.value;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan); //newLi의 자식노드로 newSpan을 설정
  todoList.appendChild(newLi); //ul 태그 변수 todoList의 자식 노드로 newLi를 설정
  todoInput.value = ''; //input 창에 텍스트 입력 후 그 공간이 리스트에 입력되면 자동으로 빈 공간으로 만들어줌
  console.log(newLi);
};

const keyCodeCheck = function () {
  //엔터키 누를 때 밑의 조건문 실행
  if (window.event.keyCode === 13 && todoInput.value !== '') {
    creatTodo();
  }
};
