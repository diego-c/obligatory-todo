let form = document.querySelector('div#todo-wrapper > form[method="POST"]');
let todos = document.querySelectorAll("ul > li");
let input = document.querySelector("#todo-wrapper > form:nth-child(2) > input:nth-child(1)");
let list = document.querySelector("section > ul");
let todosTxt = document.querySelectorAll("section > ul > li > p");
let spinner = document.querySelector("header > i.material-icons");

todos.forEach(todo => todo.classList.add("slideTodos"));
spinner.classList.add("spin");

todosTxt.forEach(txt => {
  txt.addEventListener("click", showFullTxt);
});

function showFullTxt() {
  let xhr = new XMLHttpRequest();
  // get text full text content for the specific todo by ID
}

spinner.addEventListener("click", function() {
  if (!this.classList.contains("spin")) {
    this.classList.remove("despin");
    this.classList.add("spin");
    form.classList.remove("slideForm");
    input.classList.remove("slideInput");
    form.classList.add("slideFormReverse");
    form.classList.add("slideInputReverse");
  } else {
    this.classList.remove("spin");
    this.classList.add("despin");
    form.classList.remove("slideFormReverse");
    form.classList.remove("slideInputReverse");
    form.classList.add("slideForm");
    input.classList.add("slideInput");
  }
});

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    // fetch post request
    let todoTxt = input.value;

    let h = new Headers();

    h.set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    const form = document.querySelector("form[action='/']");
    let formData = new FormData();
    formData.append('todo', todoTxt);

    fetch('/', {
      method: 'POST',
      headers: h,
      body: formData          
    })
    .then(response => {
      if (response.ok) {
       console.log(`POST / for TODO: ${todoTxt}\n`);
       console.log(response); 
       
       // create li for todo with form, buttons and text
       /*
       let li = document.createElement('li');

       let priorityForm = document.createElement('form');
       priorityForm.setAttribute('method', 'POST');
       priorityForm.setAttribute('action', '/');

       let priorityBtn = document.createElement('button');
        */
       
      } else {      
      throw new Error("Oops, couldn't POST todo!");
      }
    })
    .catch(err => console.log(err.message));


    /*
    // AJAX
    let todoTxt = input.value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:1337/", true);
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );

    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("request done for " + input.value);
        let todo = document.createElement("li");

        let todoSpan = document.createElement("p");
        todoSpan.textContent = todoTxt;
        
        todo.appendChild(todoSpan);

        let dl = document.createElement("i");
        dl.classList.add("material-icons");
        dl.textContent = "delete";
        todo.insertBefore(dl, todoSpan);

        let important = document.createElement("i");
        important.classList.add("material-icons");
        important.textContent = "access_alarm";
        todo.insertBefore(important, dl);

        let done = document.createElement("i");
        done.classList.add("material-icons");
        done.textContent = "done";
        todo.appendChild(done);

        list.appendChild(todo);
        input.value = "";
      }
    };
    xhr.send("todo=" + todoTxt);

    */
  }
});
