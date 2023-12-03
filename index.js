function showModal(id) {
   const modal = document.getElementById(id);
   if (modal) {
      modal.showModal();
   } else {
      console.warn("Id for the modal not found in the page:", id);
   }
}

const newProjectBtn = document.getElementById("new-project-btn");
newProjectBtn.addEventListener("click", () => {
   showModal("new-project-modal");
});

const projectForm = document.getElementById("new-project-form");
if (projectForm) {
   projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(projectForm);
      const project = {
         name: formData.get("name"),
         description: formData.get("description"),
         userRole: formData.get("userRole"),
         status: formData.get("status"),
         finishDate: formData.get("finishDate"),
      };
      console.log(project);
   });
} else {
   console.warn("Project form not found");
}
