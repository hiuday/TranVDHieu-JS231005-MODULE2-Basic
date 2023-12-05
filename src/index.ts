interface Note {
  id: number;
  title: string;
  content: string;
  comment: Comment[];
}
interface Comment {
  id: number;
  comment: string;
}

const note: Note[] = [];
if (!JSON.parse(localStorage.getItem("notes") as string)) {
  localStorage.setItem("notes", JSON.stringify(note));
}
function getNote(): Note[] {
  const textNote: string = localStorage.getItem("notes") || "[]";
  return JSON.parse(textNote);
}
function setNote(Notes: Note[]): void {
  localStorage.setItem("notes", JSON.stringify(Notes));
}
class Notetext implements Note {
  id: number;
  title: string;
  content: string;
  comment: Comment[];
  constructor(
    id: number,
    title: string,
    content: string,
    comment: Comment[] = []
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.comment = comment;
  }
  render(): void {
    const noteList: Note[] = getNote();
    const noteBody: HTMLElement = document.querySelector(
      ".container"
    ) as HTMLElement;
    let noteHTML = "";
    noteList.forEach((item: Note, index: number) => {
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
      </div>
        `;
    });
    noteBody.innerHTML = noteHTML;
  }
  addNote(): void {
    const myInputTitle: HTMLInputElement = document.getElementById(
      "input-title"
    ) as HTMLInputElement;
    const myTextarea: HTMLTextAreaElement = document.getElementById(
      "content"
    ) as HTMLTextAreaElement;
    const inputTitle = myInputTitle.value;
    const textareaContent = myTextarea.value;
    const noteAdd = getNote();
    let objInput: Note = {
      id: Date.now(),
      title: inputTitle,
      content: textareaContent,
      comment: [],
    };
    noteAdd.push(objInput);
    setNote(noteAdd);
  }
  renderComment(id: number): void {
    let noteList: Note[] = getNote();
    let commentBody: HTMLElement = document.getElementById(
      "collapseExample"
    ) as HTMLElement;
    let textareaHTML = "";
    noteList.forEach((item: any, index: number) => {
      textareaHTML += `
      <div class="card card-body" id="comment-inner">
      ${item.comment}
      </div>
    </div>
      `;
    });
    commentBody.innerHTML = textareaHTML;
  }
  // addComment(id: number): void {
  //   let noteList: Note[] = getNote();
  //   const myComment: HTMLTextAreaElement = document.getElementById(
  //     "message-text"
  //   ) as HTMLTextAreaElement;
  //   const textareaComment = myComment.value;
  //   let noteAdd = getNote();
  //   let objTextarea: Comment = {
  //     id: Date.now(),
  //     comment: textareaComment,
  //   };
  //   noteAdd.push(objTextarea);
  //   setNote(noteAdd);
  // }
}

const renderNote = new Notetext(0, "", "", []);
renderNote.render();
function addNote() {
  renderNote.addNote();
  renderNote.render();
}
