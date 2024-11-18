function togglePassword(element) {
  if (element.previousElementSibling.type === 'password') {
    element.previousElementSibling.type = 'text';
    element.children[0].classList.remove('fa-eye');
    element.children[0].classList.add('fa-eye-slash');
  } else {
    element.previousElementSibling.type = 'password';
    element.children[0].classList.remove('fa-eye-slash');
    element.children[0].classList.add('fa-eye');
  }
}

window.togglePassword = togglePassword;