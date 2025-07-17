document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('user-form');
    var inputEl = document.getElementById('user-name');
    // if (!form || !inputEl) {
    //   throw new Error('Form or input element not found!');
    // }
    form.addEventListener('submit', function (event) {
        console.log(inputEl === null || inputEl === void 0 ? void 0 : inputEl.value); // Logs the current value
        // event.preventDefault(); // Prevents the form from submitting and clearing the input
    });
});
