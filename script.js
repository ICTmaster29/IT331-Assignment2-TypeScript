var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = this.loadTasks();
        this.initializeElements();
        this.setupEventListeners();
        this.renderTasks();
    }
    TaskManager.prototype.initializeElements = function () {
        this.elements = {
            taskInput: document.getElementById('taskInput'),
            addButton: document.getElementById('addButton'),
            taskList: document.getElementById('taskList'),
            filterInput: document.getElementById('filterInput')
        };
    };
    TaskManager.prototype.setupEventListeners = function () {
        var _this = this;
        this.elements.addButton.addEventListener('click', function () { return _this.addTask(); });
        this.elements.taskInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter')
                _this.addTask();
        });
        this.elements.filterInput.addEventListener('input', function () { return _this.filterTasks(); });
    };
    TaskManager.prototype.loadTasks = function () {
        var storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    };
    TaskManager.prototype.saveTasks = function () {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    };
    TaskManager.prototype.addTask = function () {
        var taskText = this.elements.taskInput.value.trim();
        if (taskText) {
            var task = {
                id: Date.now(),
                text: taskText
            };
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
            this.elements.taskInput.value = '';
        }
    };
    TaskManager.prototype.deleteTask = function (id) {
        this.tasks = this.tasks.filter(function (task) { return task.id !== id; });
        this.saveTasks();
        this.renderTasks();
    };
    TaskManager.prototype.filterTasks = function () {
        var filterText = this.elements.filterInput.value.toLowerCase();
        var filteredTasks = this.tasks.filter(function (task) {
            return task.text.toLowerCase().includes(filterText);
        });
        this.renderTasks(filteredTasks);
    };
    TaskManager.prototype.renderTasks = function (tasksToRender) {
        var _this = this;
        if (tasksToRender === void 0) { tasksToRender = this.tasks; }
        this.elements.taskList.innerHTML = '';
        tasksToRender.forEach(function (task) {
            var li = document.createElement('li');
            li.className = 'task-item';
            li.textContent = task.text;
            li.addEventListener('click', function () { return _this.deleteTask(task.id); });
            _this.elements.taskList.appendChild(li);
        });
    };
    return TaskManager;
}());
// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    new TaskManager();
});
