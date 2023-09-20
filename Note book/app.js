//variabel//
const notelist = document.querySelector(".notes");
//event//

//functine//
eventlisteners();
function eventlisteners() {
  //eventListener for enter new note
  document.querySelector(".input").addEventListener("submit", newNote);

  //eventListener for remove li
  document.querySelector(".notes").addEventListener("click", removeLiNote);

  //eventListener for enter new note in localStorage
  document.addEventListener("DOMContentLoaded", lSOnLoad);
}

function newNote(e) {
  // dont let refresh web
  e.preventDefault();

  //give new note value
  const note = document.querySelector(".note_book_input").value;

  //add remove botton
  const removeBtn = document.createElement("a");
  removeBtn.textContent = "X";
  removeBtn.classList = "remove_btn";

  // create new li for new note
  const li = document.createElement("li");
  li.classList = "li_list";

  //add new note value and remove btn in li
  li.appendChild(document.createTextNode(note));
  li.appendChild(removeBtn);

  // add new li in notes
  notelist.appendChild(li);

  this.reset();

  alert("یادداشت با موفقیت ثبت شد !");

  addNoteToLS(note);
}
// remove note from list
function removeLiNote(e) {
  if (e.target.classList.contains("remove_btn")) {
    e.target.parentElement.remove();
  }

  //remove note from local storege
  removeNoteFromLocalStorege(e.target.parentElement.textContent);
}

//add notes from localStorege
function addNoteToLS(note) {
  //get the note from local toreage
  const notes = getNoteFromLS();

  // add new note to notes array
   notes.push(note);

  //add new notes array to the local strage
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNoteFromLS() {
  let notes;

  let getFromLS = localStorage.getItem("notes");
  if (getFromLS === null) {
    notes = [];
  } else {
    notes = JSON.parse(getFromLS);
  }
  return notes;
}

function lSOnLoad() {
  const notes = getNoteFromLS();

  console.log(notes);

  //print each item of array
  notes.forEach(function (note) {
    const removeBtn = document.createElement("a");
    removeBtn.textContent = "X";
    removeBtn.classList = "remove_btn";

    const li = document.createElement("li");
    li.classList = "li_list";
    li.appendChild(document.createTextNode(note));
    li.appendChild(removeBtn);

    notelist.appendChild(li);
  });
}

function removeNoteFromLocalStorege(noteContent) {
  const noteDelete = noteContent.substring(0, noteContent.length - 1);

  const notesFromLS = getNoteFromLS();

  notesFromLS.forEach(function (note, index) {
    if (note === noteDelete) {
      notesFromLS.splice(index, 1);
    }
  });
  localStorage.setItem("notes", JSON.stringify(notesFromLS));

  console.log(noteDelete);
  console.log(notesFromLS);
}
