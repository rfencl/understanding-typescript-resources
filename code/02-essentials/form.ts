document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form')! as HTMLFormElement | null;
    const inputEl = document.getElementById('user-name')! as HTMLInputElement | null;
  
    // if (!form || !inputEl) {
    //   throw new Error('Form or input element not found!');
    // }
  
    form.addEventListener('submit', (event) => {
        console.log(inputEl?.value); // Logs the current value
        // event.preventDefault(); // Prevents the form from submitting and clearing the input
    });
  });