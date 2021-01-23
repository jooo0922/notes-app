'use strict';

const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
  notes.forEach(note => {
    addNewNote(note);
  });
}

addBtn.addEventListener('click', () => {
  addNewNote();
});

function addNewNote(text = ''){ // 기본값이 '' nullString인 text라는 아이를 parameter로 받음.
  const note = document.createElement('div'); 
  note.classList.add('note');

  note.innerHTML = `
    <div class="notes">
      <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="main ${text ? '' : 'hidden'}"></div>
      <textarea class="main ${text ? 'hidden' : ''}"></textarea>
    </div> 
  `;

  // 왜냐면 우리가 선택하려는 element들이 전부 note안에 담긴 HTMLString이니까
  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');

  // notesE1의 자식노드들 중에서 가져오라는 뜻.
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea'); // tagname 선택할때는 .class 이렇게 안쓰고 그냥 'tagname' 만 씀.

  textArea.value = text;
  main.innerHTML = marked(text);

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden'); 
    textArea.classList.toggle('hidden');
  });

  deleteBtn.addEventListener('click', () => {
    // ChildNode.remove() 메소드는 이를 포함하는 트리로부터 객체를 제거합니다.
    note.remove();

    updateLS();
  });

  // input 이벤트는 <input>, <select> 및 <textarea> 요소의 value 속성이 바뀔 때마다 발생한다.
  textArea.addEventListener('input', (e) => {
    const{ value } = e.target;
    // Destructuring Assignment
    // const value = e.target.value 를 축약해서 표현한 것임. es6 문법!

    main.innerHTML = marked(value);
    // marked.js를 사용한거임. html 마크업 언어보다 좀 더 쉽게 사용할 수 있는 마크다운 문법을 지원하는 라이브러리 

    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS(){
  const notesText = document.querySelectorAll('textarea');

  const notes = [];

  notesText.forEach(note => {
    notes.push(note.value);
  });

  localStorage.setItem('notes', JSON.stringify(notes));
}







