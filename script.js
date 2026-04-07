// Smooth scroll for nav links
const links = document.querySelectorAll('nav a');

const closeNavMenu = () => {
  navLinks.classList.remove('active');
  hamburger.classList.remove('active');
};

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
    if(navLinks.classList.contains('active')) {
      closeNavMenu();
    }
  });
});

// Scroll fade-in animation
const faders = document.querySelectorAll('.hero, .skills, .work, .contact');

const appearOptions = {
  threshold: 0.2
};
// Navbar toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active'); // slide in menu
  hamburger.classList.toggle('active'); // morph hamburger to X 
});

document.addEventListener('click', (event) => {
  const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
  if(navLinks.classList.contains('active') && !isClickInsideNav) {
    closeNavMenu();
  }
});

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Custom cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
const words = ["Frontend Developer", "UI Designer", "Web Creator"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {

  if (i < words.length) {
    if (!isDeleting && j <= words[i].length) {
      currentWord = words[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      currentWord = words[i].substring(0, j--);
    }

    typing.textContent = currentWord;

    if (j === words[i].length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }

    if (j === 0) {
      isDeleting = false;
      i++;
      if (i === words.length) i = 0;
    }
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

(function(){
  emailjs.init("fwC2Nm4V84-i900t");
})();

const form = document.querySelector(".contact-form");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // prevent page reload
   if (!form.checkValidity()) {
    return; 
  }
  const cards = document.querySelectorAll(".tech-card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (position < screenHeight - 50) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

  emailjs.sendForm("service_g5xeq6q", "template_jb5hfcm", this)
    .then(() => {
      alert("Message sent successfully 🚀");
      form.reset(); // clear form after success
    }, (error) => {
      alert("Failed to send message ❌ Check console for details.");
      console.log(error); // detailed error info
    });
});
