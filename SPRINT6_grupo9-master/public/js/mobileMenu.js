window.addEventListener("load", () => {
  const triggerButton = document.getElementById("trigger");
  const nav = document.getElementById("mobileNav");
  

  triggerButton.addEventListener("click", () => {
    if (triggerButton) {      
      nav.classList.toggle("mobileNav-block");
    }
  });
});
