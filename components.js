function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    })
    .catch(err => console.error("Error loading " + file, err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "Components/header.html");
  loadComponent("banner", "Components/banner.html");
  loadComponent("education", "Components/education.html");
  loadComponent("technologies", "Components/technologies.html");
  loadComponent("projects", "Components/projects.html");
  loadComponent("contact", "Components/contact.html");
  loadComponent("footer", "Components/footer.html");
});
