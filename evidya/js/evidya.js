const avatar = document.querySelector('.avatar');
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.querySelector('.sidebar-toggle');

avatar.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    toggleButton.classList.toggle('show');
});

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    toggleButton.classList.toggle('show');
});