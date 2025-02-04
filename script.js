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
  
  // New: Function to sort feed items by date
  function setupFeedSort() {
    const feed = document.getElementById('feed');
    const sortSelect = document.getElementById('sortSelect');
    if (!feed || !sortSelect) return;
  
    sortSelect.addEventListener('change', function() {
      const order = sortSelect.value; // "desc" or "asc"
      const items = Array.from(feed.getElementsByClassName('feed-item'));
  
      items.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date'));
        const dateB = new Date(b.getAttribute('data-date'));
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
  
      // Reappend sorted items back to the feed container.
      items.forEach(item => feed.appendChild(item));
    });
  
    // Trigger sorting on page load.
    sortSelect.dispatchEvent(new Event('change'));
  }
  
  // Ensure all toggles are set up once DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    setupBlogToggle();
    setupNewsToggle();
    setupRosterToggle();
    setupImageModal();
    includeHTML();
    setupFeedSort();
  });
  
