const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__content .section__description", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".hotel__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".steps__card", {
  ...scrollRevealOption,
  interval: 500,
});

const inspiration = document.querySelector(".inspiration__wrapper");
const inspirationImages = Array.from(inspiration.children);

inspirationImages.forEach((item) => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  inspiration.appendChild(duplicateNode);
});

ScrollReveal().reveal(".property__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".trip__card", {
  ...scrollRevealOption,
  interval: 500,
});






// ====== Booking Form Submission ======
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(bookingForm));

    try {
      const response = await fetch("http://localhost:5000/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to a new page after successful booking
        window.location.href = "booking-success.html";
      } else {
        // Show error message on the same page
        const message = document.getElementById("message");
        message.style.color = "red";
        message.textContent = data.message || "Something went wrong!";
      }
    } catch (error) {
      console.error("Error:", error);
      const message = document.getElementById("message");
      message.style.color = "red";
      message.textContent = "Something went wrong. Please try again.";
    }
  });
}
