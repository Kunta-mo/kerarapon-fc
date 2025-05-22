document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav ul li a");
  const sections = document.querySelectorAll(".content-section");
  
 // Set 'Home' as active on load by default (or whichever you want)
  const defaultActive = document.querySelector('nav ul li a[data-section="home"]');
  if (defaultActive) defaultActive.classList.add("active");


  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");

      // Hide all sections
      sections.forEach(section => {
        section.style.display = "none";
      });

      // Show the selected section
      const activeSection = document.getElementById(target);
      if (activeSection) {
        activeSection.style.display = "block";
      }

// Remove active class from all links
      links.forEach(link => link.classList.remove("active"));
      // Add active class to clicked link
      link.classList.add("active");
    });
  });
});
