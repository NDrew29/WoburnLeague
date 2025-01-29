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

// Function to enable expand/collapse for blog sections
function setupBlogToggle() {
    document.querySelectorAll(".blog-title").forEach((title) => {
        title.addEventListener("click", () => {
            const targetId = title.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                const isVisible = targetContent.style.display === "block";
                targetContent.style.display = isVisible ? "none" : "block";

                // Toggle expanded class for styling
                title.classList.toggle("expanded", !isVisible);
            }
        });
    });
}

// Function to enable expand/collapse for news headlines
function setupNewsToggle() {
    document.querySelectorAll(".news-headline").forEach((headline) => {
        headline.addEventListener("click", () => {
            const newsItem = headline.parentElement;
            const content = newsItem.querySelector(".news-content");

            if (content) {
                const isVisible = content.style.display === "block";
                content.style.display = isVisible ? "none" : "block";
                newsItem.classList.toggle("expanded", !isVisible);
            }
        });
    });
}

// Function to toggle roster visibility
function setupRosterToggle() {
    document.querySelectorAll(".team-name").forEach((teamName) => {
        teamName.addEventListener("click", () => {
            const targetTable = document.getElementById(teamName.dataset.target);
            if (targetTable) {
                const isVisible = targetTable.style.display === "table";
                targetTable.style.display = isVisible ? "none" : "table";
            }
        });
    });
}

// Ensure all toggles are set up once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    setupBlogToggle();
    setupNewsToggle();
    setupRosterToggle();
    includeHTML();
});
