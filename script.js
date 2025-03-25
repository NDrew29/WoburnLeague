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

// Unified function to enable expand/collapse for feed items
function setupFeedToggle() {
  document.querySelectorAll('.feed-title').forEach(title => {
    title.addEventListener('click', () => {
      const content = title.nextElementSibling;
      if (content && content.classList.contains('feed-content')) {
        const isVisible = content.style.display === 'block';
        content.style.display = isVisible ? 'none' : 'block';
        title.classList.toggle('expanded', !isVisible);
      }
    });
  });
}

// Function to toggle roster visibility and update team-name styling
function setupRosterToggle() {
  document.querySelectorAll(".team-name").forEach((teamName) => {
    teamName.addEventListener("click", () => {
      const targetTable = document.getElementById(teamName.dataset.target);
      if (targetTable) {
        const isVisible = targetTable.style.display === "table";
        targetTable.style.display = isVisible ? "none" : "table";
        // Toggle "active" class for styling (highlight when open)
        if (!isVisible) {
          teamName.classList.add("active");
        } else {
          teamName.classList.remove("active");
        }
      }
    });
  });
}

// Function to enable image modal for team images
function setupImageModal() {
  document.querySelectorAll(".team img").forEach(img => {
    img.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.classList.add("image-modal");
      modal.innerHTML = `
        <div class="modal-content">
          <img src="${img.src}" alt="${img.alt}">
          <span class="close">&times;</span>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector(".close").addEventListener("click", () => {
        modal.remove();
      });

      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.remove();
        }
      });
    });
  });
}

// Optional: Set up bracket interactivity (e.g., highlighting on click)
function setupBracketInteractivity() {
  document.querySelectorAll('.bracket .matchup').forEach(matchup => {
    matchup.addEventListener('click', () => {
      matchup.classList.toggle('highlighted');
    });
  });
}

// Set up all functionality once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setupFeedToggle();
  setupRosterToggle();
  setupImageModal();
  includeHTML();
  // Initialize bracket interactivity if a bracket is present
  if (document.querySelector('.bracket')) {
    setupBracketInteractivity();
  }
});
