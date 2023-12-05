"use strict";
const note = [];
if (!JSON.parse(localStorage.getItem("notes"))) {
    localStorage.setItem("notes", JSON.stringify(note));
}
function getNote() {
    const textNote = localStorage.getItem("notes") || "[]";
    return JSON.parse(textNote);
}
function setNote(Notes) {
    localStorage.setItem("notes", JSON.stringify(Notes));
}
class Notetext {
    constructor(id, title, content, comment = []) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.comment = comment;
    }
    render() {
        const noteList = getNote();
        const noteBody = document.querySelector(".container");
        let noteHTML = "";
        noteList.forEach((item, index) => {
            noteHTML += `
        <div class="container-comment">
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@mdo"
        >
          Bình luận
        </button>
        <p id="comment">${item.comment.length}bình luận</p>
        <div class="collapse" id="collapseExample">
          <div class="card card-body"></div>
        </div>
      </div>
        `;
        });
        noteBody.innerHTML = noteHTML;
    }
    addNote() {
        const myInputTitle = document.getElementById("input-title");
        const myTextarea = document.getElementById("content");
        const inputTitle = myInputTitle.value;
        const textareaContent = myTextarea.value;
        const noteAdd = getNote();
        let objInput = {
            id: Date.now(),
            title: inputTitle,
            content: textareaContent,
            comment: [],
        };
        noteAdd.push(objInput);
        setNote(noteAdd);
    }
}
const renderNote = new Notetext(0, "", "", []);
renderNote.render();
function addNote() {
    renderNote.addNote();
    renderNote.render();
}
