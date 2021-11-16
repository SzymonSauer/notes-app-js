const addBtn = document.querySelector('.add');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtns = document.getElementsByClassName('delete-note');
const deleteAllBtn = document.querySelector('.delete-all');

const noteArea = document.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');
const category = document.querySelector('#category');
const color = document.querySelector('#color');
const textarea = document.querySelector('#text');
const error = document.querySelector('.error');

let selectedValue;
let cardID = 0;
let editedNote;
let info;

const openPanel = () => {
	notePanel.style.display = 'flex';
};

const closePanel = () => {
	notePanel.style.display = 'none';
	error.style.visibility = 'hidden';
	textarea.value = '';
	notecolor.selectedIndex = 0;
};

const addNote = () => {
	if (
		textarea.value !== '' &&
		category.value !== '' &&
		category.value.length < 10
	) {
		createNote();
		error.style.visibility = 'hidden';
	} else {
		error.style.visibility = 'visible';
	}
};

const createNote = () => {
	const newNote = document.createElement('div');
	newNote.classList.add('note');
	newNote.setAttribute('id', cardID);
	noteArea.appendChild(newNote);

	newNote.innerHTML = `
        <div class="note-header">
        <h3 class="note-title">${category.value}</h3>
		<h4 class="note-color" style="display: none;">${color.value}</h4>
        <button class="edit-note" onclick="editNote(${cardID})">
			<i class="fas fa-highlighter"></i>
		</button>
		<button class="delete-note" onclick="deleteNote(${cardID})">
            <i class="fas fa-times icon"></i>
        </button>
        </div>
        <div class="note-body">
            ${textarea.value}
        </div>
    `;

	cardID++;
	textarea.value = '';
	category.value = '';
	color.selectedIndex = 0;
	notePanel.style.display = 'none';
	checkColor(newNote);
};

const selectValue = () => {
	selectedValue = color.options[color.selectedIndex].text;
};

const checkColor = (note) => {
	switch (selectedValue) {
		case 'Red':
			note.style.backgroundColor = 'rgb(209,31,31)';
			break;
		case 'Green':
			note.style.backgroundColor = 'rgb(0,153,51)';
			break;
		case 'Blue':
			note.style.backgroundColor = 'rgb(51,51,255)';
			break;
		case 'Grey':
			note.style.backgroundColor = 'rgb(128,128,128)';
			break;
	}
};

const deleteNote = (id) => {
	const noteToDelete = document.getElementById(id);
	noteArea.removeChild(noteToDelete);
};

const deleteAllNotes = () => {
	noteArea.textContent = '';
};

const editNote = (id) => {
	const editedNote = document.getElementById(id);
	console.log(editedNote);
	notePanel.style.display = 'flex';
	textarea.value = editedNote.textContent;
};

const changeNote = () => {
	if (textarea.value !== '') {
		editedNote.textContent = textarea.value;
	} else {
		info.innerHTML =
			'Check if you have completed the fields correctly and selected the color.';
	}
};

addBtn.addEventListener('click', openPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', addNote);
saveBtn.addEventListener('click', changeNote);
deleteAllBtn.addEventListener('click', deleteAllNotes);
