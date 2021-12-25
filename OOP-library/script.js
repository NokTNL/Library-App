"use strict";

class Book {
  constructor(properties = {}) {
    // Alternative to this.XXX = XXX syntax.
    Object.assign(this, properties); // Just copying all the properties: https://stackoverflow.com/questions/41486848/es6-class-constructor-shortcut-for-setting-instance-properties/41487016
    // Fine-grain tuning on properties names can be done by object destructuring to the above
    this.info = function () {
      console.log(this);
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
  }
}

class Library {
  constructor() {
    this.listOfBooks = [];
  }

  // called by event listener, no need assign this = event trigerring element
  addBook = () => {
    const form = document.getElementById("new-book-form");
    //Extract information from the form
    const properties = {};
    for (const prop of ["title", "author", "pages"]) {
      properties[prop] = form[prop].value;
    }
    properties["read"] = form.read.checked;

    const book = new Book(properties);
    this.listOfBooks.push(book);
    this.renderList();
  };

  removeBook = (event) => {
    const index = event.target.closest(".book").dataset.arrayIndex; // extract book index
    this.listOfBooks.splice(index, 1);
    this.renderList();
  };

  toggleReadStatus = (event) => {
    const index = event.target.closest(".book").dataset.arrayIndex;
    this.listOfBooks[index].read = !this.listOfBooks[index].read; // toggle read status
    this.renderList(); /****** can upgrade to just changing that book */
  };

  renderList = () => {
    const bookListEl = document.getElementById("book-list");
    bookListEl.innerHTML = "";
    for (let index = 0; index < this.listOfBooks.length; index++) {
      // meta-data of that bookEl
      const bookEl = document.createElement("li");
      bookEl.className = "book";
      bookEl.dataset.arrayIndex = index;
      // Format the book properties
      let { title, author, pages, read } = this.listOfBooks[index];
      title = title || "(No Title)";
      author = author || "(unknown)";
      pages = pages || "(unknown)";
      let readText = new Map([
        [true, "Read"],
        [false, "Not read"],
      ]);
      bookEl.innerHTML = `
      <ul>
        <li class="book-title">${title}</li>
        <li class="book-author">written by ${author}</li>
        <li class="book-pages">${pages} pages</li>
        <li class="book-read">
          Status: ${readText.get(read)}
          <button>${readText.get(!read)}</button>
        </li>
        <li class="remove-book"><button>Remove Book</button></li>
      </ul>
      `;
      bookListEl.appendChild(bookEl);
      // Activate buttons
      const removeBookButton = bookEl.querySelector(".remove-book button");
      removeBookButton.addEventListener("click", this.removeBook);
      const toggleReadButton = bookEl.querySelector(".book-read button");
      toggleReadButton.addEventListener("click", this.toggleReadStatus);
    }
  };
}

class Main {
  // Initiation code
  static init() {
    this.library = new Library(); // de-facto global library
    this._activateButtons();
  }

  // Associate button to displaying the form
  static _activateButtons() {
    const newBookButton = document.getElementById("new-book-button");
    newBookButton.addEventListener("click", () => {
      document.getElementById("new-book-form").style.display = "block";
    });
    const addBookButton = document.getElementById("add-book-botton");
    addBookButton.addEventListener("click", this.library.addBook);
  }
}

// Main flow
Main.init();
