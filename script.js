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

// Function to enable expand/collapse for news headlines
function setupNewsToggle() {
    const headlines = document.querySelectorAll(".news-headline");

    headlines.forEach((headline) => {
        headline.addEventListener("click", () => {
            const newsItem = headline.parentElement;
            const content = newsItem.querySelector(".news-content");

            // Toggle visibility and styling
            const isVisible = content.style.display === "block";
            content.style.display = isVisible ? "none" : "block";
            newsItem.classList.toggle("expanded", !isVisible);
        });
    });
}

// Function to toggle roster visibility
function setupRosterToggle() {
    const teamNames = document.querySelectorAll(".team-name");

    teamNames.forEach((teamName) => {
        teamName.addEventListener("click", () => {
            const targetTable = document.getElementById(teamName.dataset.target);
            if (targetTable) {
                const isVisible = targetTable.style.display === "table";
                targetTable.style.display = isVisible ? "none" : "table";
            }
        });
    });
}

// Function to enable expand/collapse for blog sections
function setupBlogToggle() {
    const blogTitles = document.querySelectorAll(".blog-title");

    blogTitles.forEach((title) => {
        title.addEventListener("click", () => {
            const targetContent = document.getElementById(title.dataset.target);
            const isVisible = targetContent.style.display === "block";
            targetContent.style.display = isVisible ? "none" : "block";

            // Toggle expanded class for styling
            title.parentElement.classList.toggle("expanded", !isVisible);
        });
    });
}

// Initialize the page after dynamic content is loaded
includeHTML().then(() => {
    setupNewsToggle();
    setupBlogToggle();
    setupRosterToggle();
});
