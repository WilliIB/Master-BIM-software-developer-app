import { IProject, Project } from "./Project";

export class ProjectsManager {
   list: Project[] = [];
   ui: HTMLElement;

   constructor(container: HTMLElement) {
      this.ui = container;
   }

   newProject(data: IProject) {
      const project = new Project(data);
      this.ui.append(project.ui);
      this.list.push(project);
      return project;
   }

   getProject(id: string) {
      const project = this.list.find((project) => project.id === id);
      return project;
   }

   getProjectByName(name: string) {
      const project = this.list.find((project) => project.name === name);
      return project;
   }

   deleteProject(id: string) {
      const project = this.getProject(id);
      if (!project) {
         return;
      }
      project.ui.remove();

      const remaining = this.list.filter((project) => project.id !== id);
      this.list = remaining;
   }

   getTotalCost() {
      const sum = this.list.reduce(
         (accumulator, project) => accumulator + project.cost,
         0
      );
      return sum;
   }

   exportToJSON() {}

   importFromJSON() {}

   newDefaultProject() {
      const data: IProject = {
         name: "Default project",
         description: "Default project description",
         status: "pending",
         userRole: "architect",
         finishDate: new Date(),
      };
      const project = new Project(data);
      this.ui.append(project.ui);
      this.list.push(project);
      console.log(project);
   }
}
