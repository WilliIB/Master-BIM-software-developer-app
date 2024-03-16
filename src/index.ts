import { IProject, ProjectStatus, UserRole } from "./classes/Project";
import { ProjectsManager } from "./classes/ProjectsManager";
import { UIManager } from "./classes/UiManager";

const uiManager = new UIManager();
const projectsListUI = document.getElementById("projects-list") as HTMLElement;
const projectsManager = new ProjectsManager(projectsListUI);


const projectsButton = document.getElementById("projects-button");
const projectsPage = document.getElementById("projects-page");
if (projectsButton && projectsPage instanceof HTMLElement) {
  uiManager.setPageButton(projectsButton, projectsPage);
}

const userButton = document.getElementById("users-button");
const usersPage = document.getElementById("users-page");
if (userButton && usersPage instanceof HTMLElement) {
  uiManager.setPageButton(userButton, usersPage);
}

uiManager.setModalButton("new-project-btn", "new-project-modal");
uiManager.setModalButton("cancel-project-btn", "new-project-modal", "new-project-form");

projectsManager.newDefaultProject();

const projectForm = document.getElementById("new-project-form");
if (projectForm && projectForm instanceof HTMLFormElement) {
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(projectForm);
    const projectData: IProject = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      userRole: formData.get("userRole") as UserRole,
      status: formData.get("status") as ProjectStatus,
      finishDate: new Date(formData.get("finishDate") as string),
    };
    try {
      const project = projectsManager.newProject(projectData);
      projectForm.reset();
      uiManager.toggleModalVisibility("new-project-modal");
    } catch (error) {
      const errorMessage = document.getElementById("error-message") as HTMLElement;
      errorMessage.textContent = error.message;
      uiManager.toggleModalVisibility("error-modal");
    }
  });
} else {
  console.warn("Project form not found");
}

const exportProjectsBtn = document.getElementById("export-projects-btn");
if (exportProjectsBtn) {
  exportProjectsBtn.addEventListener("click", () => {
    projectsManager.exportToJSON();
  });
}

const importProjectsBtn = document.getElementById("import-projects-btn");
if (importProjectsBtn) {
  importProjectsBtn.addEventListener("click", () => {
    projectsManager.importFromJSON();
  });
}
