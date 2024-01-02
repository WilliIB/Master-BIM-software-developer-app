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

   newDefaultProject() {
      const data :IProject = {
         name: "Default project",
         description: "Default project description",
         status: "pending",
         userRole: "architect",
         finishDate: new Date(),
      };
      const project = new Project(data);
      this.ui.append(project.ui);
      this.list.push(project);
      console.log(project)
   }
}
