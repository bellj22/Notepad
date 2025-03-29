/* Function to create a new note popup*/
function popup() {
    if (document.getElementById("popupContainer")) return;
    const popupContainer = document.createElement("div");

    popupContainer.innerHTML = `
    <div id="popupContainer">
        <h1>New Note</h1>
        <textarea id="note-text" placeholder="Enter your note..."></textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="createNote()">Create Note</button>
            <button id="closeBtn" onclick="closePopup()">Close</button>
        </div>
    </div>
    `;
    document.body.appendChild(popupContainer);
}

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    if (popupContainer) {
        popupContainer.remove();
    }
}

function createNote() {
    const noteText = document.getElementById('note-text').value.trim();
    if (noteText === '') return;

    const note = { 
        id: Date.now(), 
        text: noteText,
        color: getRandomColor() // Assign a random color
    };
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);

    localStorage.setItem('notes', JSON.stringify(notes));

    closePopup();
    displayNotes();
}

/* Functions to display notes */
function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.style.backgroundColor = note.color; // Apply saved color

        listItem.innerHTML = `
        <span>${note.text}</span>
        <div id="noteBtns-container">
            <button id="editBtn" onclick="editNote(${note.id})"><i class="fa-solid fa-pen"></i></button>
            <button id="deleteBtn" onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        notesList.appendChild(listItem);
    });
}


/* Editing notes Functions*/

function editNote(noteId) {
    if (document.getElementById("editing-container")) return;

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.id == noteId);

    if (!noteToEdit) return;

    const editingPopup = document.createElement("div");
    editingPopup.id = "editing-container";

    editingPopup.innerHTML = `
    <div id="popupBox">
        <h1>Edit Note</h1>
        <textarea id="note-text">${noteToEdit.text}</textarea>
        <div id="btn-container">
            <button id="submitBtn" onclick="updateNote(${noteId})">Done</button>
            <button id="closeBtn" onclick="closeEditPopup()">Cancel</button>
        </div>
    </div>
    `;

    document.body.appendChild(editingPopup);
}

function closeEditPopup() {
    const editingPopup = document.getElementById("editing-container");
    if (editingPopup) {
        editingPopup.remove();
    }
}

function updateNote(noteId) {
    const noteText = document.getElementById('note-text').value.trim();
    if (noteText === '') return;

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes = notes.map(note => 
        note.id == noteId ? { ...note, text: noteText } : note
    );

    localStorage.setItem('notes', JSON.stringify(notes));

    closeEditPopup();
    displayNotes();
}

/* Deleting Notes */
function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId); // Corrected noteId parameter

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

/* Random color generator */
function getRandomColor() {
    const colors = ["#ffe4a1", "#c8842c", "#348932", "#863445"];
    return colors[Math.floor(Math.random() * colors.length)];
}

displayNotes();
