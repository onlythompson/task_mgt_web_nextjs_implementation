import { TaskPriority, TaskStatus } from "./TaskEnum";

export class Category {
  constructor(private name: string, private description?: string) {}

  getName(): string {
    return this.name;
  }

  getDescription(): string | undefined {
    return this.description;
  }
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  category: Category;
  createdByUserId: string;
}