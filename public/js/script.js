function toggleMenu() {
  const checkBoxMenu = document.getElementById('bt_menu');
  const navMenu = document.getElementById('nav-menu');
  checkBoxMenu.addEventListener('change', (e) => {
    if (e.target.checked) {
      navMenu.classList.add('menu-show');
    } else {
      navMenu.classList.remove('menu-show');
    }
  });
}

toggleMenu();
