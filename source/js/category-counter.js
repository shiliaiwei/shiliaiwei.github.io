document.addEventListener('DOMContentLoaded', function() {
    // Get all resource cards
    const cards = document.querySelectorAll('.resource-card');
    
    // Create an object to store category counts
    const categoryCounts = {};
    
    // Count items in each category
    cards.forEach(card => {
        const categorySpan = card.querySelector('.category');
        if (categorySpan) {
            const category = categorySpan.textContent.trim();
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
    });
    
    // Update filter buttons with counts
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        // Get the category from the button's data-filter attribute
        const category = button.getAttribute('data-filter').toUpperCase();
        const count = category === 'ALL' ? cards.length : (categoryCounts[category] || 0);
        
        // Create and append count element
        const countElement = document.createElement('span');
        countElement.className = 'category-count';
        countElement.textContent = count;
        button.appendChild(countElement);
    });
});