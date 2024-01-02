import { IProject, ProjectStatus, UserRole } from "./classes/Project";
import { ProjectsManager } from "./classes/ProjectsManager";

const projectsListUI = document.getElementById("projects-list") as HTMLElement;
const projectsManager = new ProjectsManager(projectsListUI);

function toggleModalVisibility(id: string) {
   const modal = document.getElementById(id);
   if (modal && modal instanceof HTMLDialogElement) {
      modal.open ? modal.close() : modal.showModal();
   } else {
      console.warn("Id for the modal not found in the page:", id);
   }
}

function modalButtonSet(buttonId: string, modalId: string, formId?: string) {
   const btn = document.getElementById(buttonId);

   if (btn) {
      btn.addEventListener("click", () => {
         toggleModalVisibility(modalId);
         if (formId) {
            const form = document.getElementById(formId);
            form instanceof HTMLFormElement
               ? form.reset()
               : console.warn("No valid form:", formId);
         }
      });
   } else {
      console.warn("Button was not found Id:", buttonId);
   }
}

modalButtonSet("new-project-btn", "new-project-modal");
modalButtonSet("cancel-project-btn", "new-project-modal", "new-project-form");

projectsManager.newDefaultProject()

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
      const project = projectsManager.newProject(projectData);
      projectForm.reset();
      toggleModalVisibility("new-project-modal");
   });
} else {
   console.warn("Project form not found");
}
