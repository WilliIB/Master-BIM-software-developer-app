export class UIManager {
  pages: HTMLElement[] = [];

  constructor() {
    const pages = document.getElementsByClassName("page");
    for (const page of pages) {
      page instanceof HTMLElement ? this.pages.push(page) : console.warn("Page not found:", page);
    }
  }

  showPage(page: HTMLElement) {
    page.style.display = "flex";
    const pagesToHidde = this.pages.filter((pageInArray) => pageInArray !== page);
    pagesToHidde.forEach((element) => {
      element.style.display = "none";
    });
  }

  setPageButton(button: HTMLElement, page: HTMLElement) {
    if (!(page instanceof HTMLElement)) {
      console.warn("Page not found");
      return;
    }
    if (!(button instanceof HTMLElement)) {
      console.warn("Button not found");
      return;
    }
    button.addEventListener("click", () => {
      this.showPage(page);
    });
  }

  toggleModalVisibility(id: string) {
    const modal = document.getElementById(id);
    if (modal && modal instanceof HTMLDialogElement) {
      modal.open ? modal.close() : modal.showModal();
    } else {
      console.warn("Id for the modal not found in the page:", id);
    }
  }

  setModalButton(buttonId: string, modalId: string, formId?: string) {
    const btn = document.getElementById(buttonId);

    if (btn) {
      btn.addEventListener("click", () => {
        this.toggleModalVisibility(modalId);
        if (formId) {
          const form = document.getElementById(formId);
          form instanceof HTMLFormElement ? form.reset() : console.warn("No valid form:", formId);
        }
      });
    } else {
      console.warn("Button was not found Id:", buttonId);
    }
  }
}
