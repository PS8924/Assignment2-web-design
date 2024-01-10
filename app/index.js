import '../scss/main.scss';

const personURI = 'todo.json';
const personXHR = new XMLHttpRequest();
personXHR.open('GET', personURI);

/**
 * load the response
 */
personXHR.onload = function () {
    if(this.status === 200){
        const responseText = this.responseText;
        const person = JSON.parse(responseText);
        addTaskContent(person);
        /* On click of close icon, hide that task */
        closeButtonEvent();
        /* On click of close icon, mark the tasks completed */
        markTaskCompleted();
    }
};
personXHR.send();

/**
 * Add person to the list item
 * @param {*} Todo the todo object
 * @param {*} parent the parent element
 */
const createPerson = (person, parent) => {
    const li = document.createElement('li');
    li.textContent = `${person.id} ${person.title}`;
    // parent.appendChild(li);
}

/**
 * load all person to the ordered list elements.
 */

const load = (person) => {
    const ol = document.getElementById('list');
    person.forEach(person => {
        createPerson(person,ol);
    });
    return true;
}

/* new task added code  */
const addTaskContent = (taskArr) => {
    var ul = document.getElementById("allTask");
    for (var i = 0; i < taskArr.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(taskArr[i].title));
        li.id = taskArr[i].id;
        var mainDesc = document.createElement("div");
        mainDesc.id = "viewDetail" + i;
        mainDesc.className = "viewDetail";
        li.appendChild(mainDesc);

        /* If task status is completed then strike thorugh it */
        if (taskArr[i].status == 'completed') {
            li.className = 'checked';
        }
        /* fetch task description */
        var description = document.createElement("div");
        description.className = "viewDetailDiv";
        description.appendChild(document.createTextNode("Description: " + taskArr[i].description));
        mainDesc.appendChild(description);

        /* fetch task due date */
        var dueDate = document.createElement("div");
        dueDate.className = "viewDetailDiv";
        dueDate.appendChild(document.createTextNode("Due Date: " + taskArr[i].due_date));
        mainDesc.appendChild(dueDate);

        /* fetch task due time */
        var dueTime = document.createElement("div");
        dueTime.className = "viewDetailDiv";
        dueTime.appendChild(document.createTextNode("Due Time: " + taskArr[i].time));
        mainDesc.appendChild(dueTime);

        /* Add view button */
        var viewSpan = document.createElement("SPAN");
        var viewTxt = document.createTextNode("Show");
        viewSpan.id = "viewDetails" + i;
        viewSpan.className = "viewDetails";
        viewSpan.appendChild(viewTxt);
        li.appendChild(viewSpan);

        /* close icon */
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        ul.appendChild(li);
    }
}
    
/* remove task */
const closeButtonEvent =() => {
    var close = document.getElementsByClassName("close");
    var viewDetails = document.getElementsByClassName("viewDetails");
    for (var i = 0; i < close.length; i++) {
        /* Onclick of close, remove task */
        close[i].onclick = function () {
            if(confirm("Do you really want to delete this task?")){
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
        /* Onclick of view, See description of task */
        viewDetails[i].onclick = function () {
            var div = this.parentElement;
            if (div.querySelector(".viewDetail").style.display == "none") {
                div.querySelector(".viewDetail").style.display = "block";
            } else {
                div.querySelector(".viewDetail").style.display = "none";
            }
        }
    }
}
 
// Add new todo list code
const addNewTask = () => {
    var taskTitle = document.getElementById("title").value;
    /* validations */
    if (taskTitle === '') {
        alert("Enter correct data!");
    } else {
        var taskDesc = document.getElementById("desc").value;
        var taskDueDate = document.getElementById("dueDate").value;
        var taskDueTime = document.getElementById("dueTime").value;
        /* On click of save store it in json array and add it to html list */
        var newdata = [
            {
                "title": taskTitle,
                "description": taskDesc,
                "due_date": taskDueDate,
                "time": taskDueTime
            },
        ];
        addTaskContent(newdata);
        closeButtonEvent();
        alert("Added successfully!!");
    }
    document.getElementById('title').value = "";
    document.getElementById('desc').value = "";
    document.getElementById('dueDate').value = "";
    document.getElementById('dueTime').value = "";
}

window.addNewTask = addNewTask;
window.showAddTaskSection = showAddTaskSection;