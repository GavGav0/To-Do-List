// Store folders and tasks
var folders = [];

// Add Folder
function addFolder() {
  var folderInput = document.getElementById("folderInput");

  if (folderInput.value === "") {
    alert("Please enter a folder name.");
    return;
  }

  var folder = {
    name: folderInput.value,
    tasks: []
  };

  folders.push(folder);

  renderFolders();
  folderInput.value = "";
}

// Render Folders
function renderFolders() {
  var foldersDiv = document.getElementById("folders");
  foldersDiv.innerHTML = "";

  folders.forEach(function(folder, index) {
    var folderContainer = document.createElement("div");
    folderContainer.classList.add("folder-container");

    var folderHeader = document.createElement("h3");
    folderHeader.textContent = folder.name;

    var deleteFolderBtn = document.createElement("button");
    deleteFolderBtn.textContent = "Delete Folder";
    deleteFolderBtn.onclick = function() {
      deleteFolder(index);
    };

    var taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.placeholder = "Enter task";
    taskInput.classList.add("task-input");

    var addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task";
    addTaskBtn.onclick = function() {
      addTask(index, taskInput);
    };

    var taskList = document.createElement("ul");
    taskList.classList.add("task-list");

    folder.tasks.forEach(function(task, taskIndex) {
      var taskItem = document.createElement("li");

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.onchange = function() {
        toggleTaskCompletion(index, taskIndex, checkbox.checked);
      };

      var taskText = document.createElement("span");
      taskText.textContent = task.name;

      var deleteTaskBtn = document.createElement("button");
      deleteTaskBtn.textContent = "Delete";
      deleteTaskBtn.onclick = function() {
        deleteTask(index, taskIndex);
      };

      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskText);
      taskItem.appendChild(deleteTaskBtn);

      taskList.appendChild(taskItem);
    });

    var clearCompletedBtn = document.createElement("button");
    clearCompletedBtn.textContent = "Clear Completed";
    clearCompletedBtn.onclick = function() {
      clearCompletedTasks(index);
    };

    folderContainer.appendChild(folderHeader);
    folderContainer.appendChild(deleteFolderBtn);
    folderContainer.appendChild(taskInput);
    folderContainer.appendChild(addTaskBtn);
    folderContainer.appendChild(taskList);
    folderContainer.appendChild(clearCompletedBtn);

    foldersDiv.appendChild(folderContainer);
  });
}

// Add Task
function addTask(folderIndex, taskInput) {
  var taskName = taskInput.value.trim();

  if (taskName === "") {
    alert("Please enter a task name.");
    return;
  }

  var folder = folders[folderIndex];
  folder.tasks.push({
    name: taskName,
    completed: false
  });

  renderFolders();
  taskInput.value = "";
}

// Delete Task
function deleteTask(folderIndex, taskIndex) {
  var folder = folders[folderIndex];
  folder.tasks.splice(taskIndex, 1);
  renderFolders();
}

// Toggle Task Completion
function toggleTaskCompletion(folderIndex, taskIndex, completed) {
  var folder = folders[folderIndex];
  folder.tasks[taskIndex].completed = completed;
}

// Clear Completed Tasks
function clearCompletedTasks(folderIndex) {
  var folder = folders[folderIndex];
  folder.tasks = folder.tasks.filter(function(task) {
    return !task.completed;
  });
  renderFolders();
}

// Delete Folder
function deleteFolder(folderIndex) {
  folders.splice(folderIndex, 1);
  renderFolders();
}

// Initial render
renderFolders();
