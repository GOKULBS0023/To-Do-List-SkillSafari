
const taskForm = document.getElementById("new__task-form");

const pendingTask = ["Pending Task"];
const completeTask = ["Completed Task"];

const now = new Date();

let date = if (now.getDate()>10) {
  return now.getDate()
} else {
  return (`0${now.getDate()}`});
};
let month = if (now.getMonth()+ > 10) {
  return now.getMonth();
}else{
  return (`0${now.getMonth()+1}`);
};
let year = now.getFullYear();
let year = now.getFullYear();


const fullDate = date+"-"+month+"-"+year;

document.getElementById("header").innerHTML = `<h1 class="heading">${fullDate}</h1>`

  
function pendingTaskFn(){
    document.getElementById("pending-heading").innerHTML = ``;
    document.getElementById("pending-heading").innerHTML = `<h2 id="pending-heading "class="h2">Pending Tasks</h2><span class="count">(${pendingTask.length})</span>`
    pendingTask.forEach((task)=>{
        let taskElement  = `
        <div class="pending__task-form form" id="pending__task-${pendingTask.indexOf(task) + 1}">
        <input type="checkbox" class="checkbox">
        <input type="text" name="new" class="pending__task-input form__input" autocomplete="off" value="${task}" min-cols="1">
        <div class="pending__task-button form__button delete__button">Delete</div>
        </div>`;
        document.getElementById("pending-heading").insertAdjacentHTML("beforeend",taskElement);
    });
    changeHappen();
}
function completeTaskFn(){
    document.getElementById("complete-heading").innerHTML = ``;
    document.getElementById("complete-heading").innerHTML = `<h2 id="complete-heading"class="h2">Completed Tasks</h2><span class="count">(${completeTask.length})</span>`
    completeTask.forEach((task)=>{
        let taskElement  = `
        <div class="complete__task-form form" id="complete__task-${completeTask.indexOf(task) + 1}">
        <input type="checkbox" class="checkbox" checked>
        <input type="text" name="new" class="complete__task-input form__input" autocomplete="off" value="${task}" disabled>
        <div class="complete__task-button form__button delete__button">Delete</div>
        </div>`;
        document.getElementById("complete-heading").insertAdjacentHTML("beforeend",taskElement);
    });
    changeHappen();
}





function addNewTask(e){
    e.preventDefault();

    if (this[0].value != '') {
        pendingTask.unshift(this[0].value);
        pendingTaskFn();    
    } else{
        alert("Kindly enter a valid task!");
        pendingTaskFn();    

    }
    this[0].value = "";
}

taskForm.addEventListener('submit', addNewTask);

function changeHappen(){
    var deleteButtons = document.querySelectorAll(".delete__button");

    deleteButtons.forEach((button)=>{
        button.addEventListener('click', deleteTask);
    });

    var editTask = document.querySelectorAll(".pending__task-input");

    editTask.forEach((task)=>{
        task.addEventListener('change', taskEdit);
    });
    var checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', toggleTask);
    });
    
}

function deleteTask(){
    if (this.parentElement.classList.contains("pending__task-form") ) {
        const index = pendingTask.indexOf(this.previousElementSibling.value);
        pendingTask.splice(index, 1);
      } else if (this.parentElement.classList.contains("complete__task-form") ){
        const index = completeTask.indexOf(this.previousElementSibling.value);
        completeTask.splice(index, 1);
      }
    this.parentElement.remove();
    pendingTaskFn();
    completeTaskFn();
}

function taskEdit(){
    const index = pendingTask.indexOf(this.value);

        this.addEventListener("change", (()=>{
        pendingTask[index] = this.value;
        if (!this.value) {
            this.parentElement.remove();
            const index = pendingTask.indexOf(this.previousElementSibling.value);
            pendingTask.splice(index, 1);
        }
    }));
    
}

function toggleTask(){
    if (this.checked) {
        this.parentElement.remove();
        const index = pendingTask.indexOf(this.nextElementSibling.value);
        pendingTask.splice(index, 1);
        completeTask.push(this.nextElementSibling.value);
        console.log(pendingTask, completeTask);
    } else {
        this.parentElement.remove();
        const index = completeTask.indexOf(this.nextElementSibling.value);
        completeTask.splice(index, 1);
        pendingTask.push(this.nextElementSibling.value);
        console.log(pendingTask, completeTask);
    }
    pendingTaskFn();
    completeTaskFn();
}

pendingTaskFn();
completeTaskFn();
