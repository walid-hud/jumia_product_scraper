type modal_kind = "error" | "warning"
interface modal_options {
    title: string;
    message: string;
    kind: modal_kind;
    confirmText?: string;
}

const $ = <T extends Element>(selector: string) =>
    document.querySelector<T>(selector);

const modal = $<HTMLElement>('#global-modal') ;
const modalTitle = $<HTMLElement>('#modal-title') ;
const modalMessage = $<HTMLElement>('#modal-message') ;
const modalConfirm = $<HTMLButtonElement>('#modal-confirm') ;
const modalReload = $<HTMLButtonElement>('#modal-reload') ;
function showModal(options: modal_options): void {
  const { title, message, kind, confirmText = 'continue' } = options;
  if (!modal || !modalTitle || !modalMessage) {
    console.error('Modal elements not found');
    return;
  }
  // Remove all modal type classes
  modal.classList.remove('hidden', 'modal-error', 'modal-warning');
  
  // Add the appropriate type class
  modal.classList.add(`modal-${kind}`);
  modalTitle.textContent = title + ' ';
  modalMessage.textContent = message;
  // Set button text
  if (modalConfirm) {
    modalConfirm.textContent = confirmText;
  }
}

function hideModal(): void {
  if (!modal) {
    console.error('Modal element not found');
    return;
  }

  modal.classList.add('hidden');
  modal.classList.remove('modal-error', 'modal-warning');
}

modalConfirm?.addEventListener('click', hideModal);
modalReload?.addEventListener('click', () => location.reload());
modal?.addEventListener('click', (e) => {
  if (e.target === modal) {
    hideModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal?.classList.contains('hidden')) {
    hideModal();
  }
});

function start_scroll_objerver(callback:()=>Promise<void> , observed:HTMLElement){
const sentinel = document.createElement('div');
sentinel.id = 'scroll-sentinel';
observed.appendChild(sentinel);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(async(entry) => {
      if (entry.isIntersecting) {
        await callback();
      }
    });
  },
  {
    root: null, 
    rootMargin: '100px', 
    threshold: 0
  }
);
observer.observe(sentinel);
}


export {hideModal , showModal ,start_scroll_objerver, type modal_options}
