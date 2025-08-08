// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

// Dynamic text for home page
document.addEventListener('DOMContentLoaded', () => {
    const dynamicTextElement = document.getElementById('dynamic-text');
    const professions = ["Front-End Developer", "Java Developer", "Web Developer", "AI Developer"];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150; // Milliseconds per character
    const deletingSpeed = 100; // Milliseconds per character
    const delayBetweenProfessions = 2000; // Milliseconds before typing next profession or deleting

    function typeWriter() {
        const currentProfession = professions[professionIndex];
        if (isDeleting) {
            // Delete text
            dynamicTextElement.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Type text
            dynamicTextElement.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentProfession.length) {
            // Done typing, set a delay before starting to delete
            speed = delayBetweenProfessions;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Done deleting, move to the next profession
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            speed = 500; // Small delay before typing the next profession
        }

        setTimeout(typeWriter, speed);
    }

    typeWriter();

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
