import { v4 as uuidv4 } from "uuid";

export type ProjectStatus = "pending" | "active" | "finished";
export type UserRole = "architect" | "engineer" | "developer";

export interface IProject {
  name: string;
  description: string;
  status: ProjectStatus;
  userRole: UserRole;
  finishDate: Date;
}

export class Project implements IProject {
  name: string;
  description: string;
  status: ProjectStatus;
  userRole: UserRole;
  finishDate: Date;

  ui: HTMLDivElement;
  id: string;
  initials: string;
  cost: number = 0;
  progress: number = 0;

  constructor(data: IProject) {
    this.id = uuidv4();

    for (const key in data) {
      this[key] = data[key];
    }
    this.setInitials();
    this.setUi();
  }

  setUi() {
    if (this.ui) {
      return;
    }
    this.ui = document.createElement("div");
    this.ui.className = "project-card";
    this.ui.innerHTML = `<div class="card-header">
      <p style="background-color: #ca8134; padding: 10px; border-radius: 8px; aspect-ratio: 1;">${this.initials}</p>
      <div>
        <h5>${this.name}</h5>
        <p>${this.description}</p>
      </div>
    </div>
    <div class="card-content">
      <div class="card-property">
        <p style="color: #969696;">Status</p>
        <p>${this.status}</p>
      </div>
      <div class="card-property">
        <p style="color: #969696;">Role</p>
        <p>${this.userRole}</p>
      </div>
      <div class="card-property">
        <p style="color: #969696;">Cost</p>
        <p>$${this.cost}</p>
      </div>
      <div class="card-property">
        <p style="color: #969696;">Estimated Progress</p>
        <p>${this.progress}</p>
      </div>
    </div>`;
  }

  setInitials() {
    const words = this.name.split(" ");
    if (words.length > 1) {
      const firstLetter = words[0].slice(0, 1);
      const secondLetter = words[1].slice(0, 1);
      const initials = firstLetter + secondLetter;
      this.initials = initials.toUpperCase();
    } else {
      const initials = this.name.slice(0, 2);
      this.initials = initials.toUpperCase();
    }
  }
}
