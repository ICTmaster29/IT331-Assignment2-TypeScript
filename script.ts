// Interface for task objects
interface Task {
    id: number;
    text: string;
}

// Interface for TaskManager elements
interface TaskManagerElements {
    taskInput: HTMLInputElement;
    addButton: HTMLButtonElement;
    taskList: HTMLUListElement;
    filterInput: HTMLInputElement;
}

class TaskManager {
    private tasks: Task[];
    private elements: TaskManagerElements;

    constructor() {
        this.tasks = this.loadTasks();
        this.initializeElements();
        this.setupEventListeners();
        this.renderTasks();
    }

    private initializeElements(): void {
        this.elements = {
            taskInput: document.getElementById('taskInput') as HTMLInputElement,
            addButton: document.getElementById('addButton') as HTMLButtonElement,
            taskList: document.getElementById('taskList') as HTMLUListElement,
            filterInput: document.getElementById('filterInput') as HTMLInputElement
        };
    }

    private setupEventListeners(): void {
        this.elements.addButton.addEventListener('click', () => this.addTask());
        this.elements.taskInput.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.elements.filterInput.addEventListener('input', () => this.filterTasks());
    }

    private loadTasks(): Task[] {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    private saveTasks(): void {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    private addTask(): void {
        const taskText = this.elements.taskInput.value.trim();
        if (taskText) {
            const task: Task = {
                id: Date.now(),
                text: taskText
            };
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
            this.elements.taskInput.value = '';
        }
    }

    private deleteTask(id: number): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    private filterTasks(): void {
        const filterText = this.elements.filterInput.value.toLowerCase();
        const filteredTasks = this.tasks.filter(task => 
            task.text.toLowerCase().includes(filterText)
        );
        this.renderTasks(filteredTasks);
    }

    private renderTasks(tasksToRender: Task[] = this.tasks): void {
        this.elements.taskList.innerHTML = '';
        
        tasksToRender.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.textContent = task.text;
            li.addEventListener('click', () => this.deleteTask(task.id));
            this.elements.taskList.appendChild(li);
        });
    }
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});