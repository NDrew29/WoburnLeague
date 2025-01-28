// Dynamically load header and footer
async function includeHTML() {
    const header = await fetch('header.html').then(res => res.text());
    const footer = await fetch('footer.html').then(res => res.text());
    document.querySelector('header').outerHTML = header;
    document.querySelector('footer').outerHTML = footer;

    // Highlight active link
    const links = document.querySelectorAll('.header nav ul li a');
    const currentPath = window.location.pathname.split('/').pop();
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

includeHTML();
