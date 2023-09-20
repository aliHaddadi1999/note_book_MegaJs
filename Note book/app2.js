const notelist = document.querySelector(".notes");

// eventListener function

eventlisteners();
function eventlisteners() {
  //click on submit for enter new note
  document.querySelector(".input").addEventListener("submit", newNote);

  //function remove button for Delete that targeted li tag
  document.querySelector(".notes").addEventListener("click", removeBtn);

  //adding note to local Storege
  document.addEventListener("DOMContentLoaded", lSOnLoad);
}

// Give new note and adding in to the notelist
function newNote(e) {
  e.preventDefault();
  //give value from textarea
  const note = document.querySelector(".note_book_input").value;

  //make remove button for notes from noteList adding calss to a tag
  const removeBtn = document.createElement("a");
  removeBtn.textContent = "x";
  removeBtn.classList = "remove_btn";

  // create li tag for note list and adding  class to li tag
  const liTag = document.createElement("li");
  liTag.classList = "li_list";

  // adding note and remove button to li tag
  liTag.appendChild(document.createTextNode(note));
  liTag.appendChild(removeBtn);

  // adding new li to the note list
  notelist.appendChild(liTag);

  // send new note to adding  to local storage
  addNoteToLS(note);

  // empety text area after click for next note
  /*this.reset()*/

  // successful message in time adding note to note list
  alert("The note was successfully registered!");
}

// function for remove button function
function removeBtn(e) {
  // Solving the bubble problem relative to the rest of the li tag area
  if (e.target.classList.contains("remove_btn")) {
    e.target.parentElement.remove();

    removeNoteFromLocalStorege(e.target.parentElement.textContent)
  }
}

//get note from local stotage
function getNoteFromLS() {
  let notes;
  const getNoteFromLS = localStorage.getItem("notes");

  //cheaking local storage value
  if (getNoteFromLS === null) {
    notes = [];
  } else {
    notes = JSON.parse(getNoteFromLS);
  }

  return notes;
}

//add note to local Storege
function addNoteToLS(note) {
  const notes = getNoteFromLS();

  //adding new note to array
  notes.push(note);

  //send new note list to lacal storage
  localStorage.setItem("notes", JSON.stringify(notes));
}

// adding notes my notes from LS - reloading time
function lSOnLoad() {
  const notes = getNoteFromLS();

  notes.forEach(function (note){
    const removeBtn = document.createElement("a");
    removeBtn.textContent = "x";
    removeBtn.classList = "remove_btn";

    // create li tag for note list and adding  class to li tag
    const liTag = document.createElement("li");
    liTag.classList = "li_list";

    // adding note and remove button to li tag
    liTag.appendChild(document.createTextNode(note));
    liTag.appendChild(removeBtn);

    // adding new li to the note list
    notelist.appendChild(liTag);
  })
}

function removeNoteFromLocalStorege(noteContent) {

  //choese a delete note 
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



