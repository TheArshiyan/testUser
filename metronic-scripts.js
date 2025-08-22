// Metronic Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Metronic components
    initializeComponents();
    
    // Handle responsive sidebar
    handleResponsiveSidebar();
    
    // Initialize tooltips and popovers
    initializeTooltips();
    
    // Handle menu interactions
    handleMenuInteractions();
    
    // Initialize progress animations
    initializeProgressAnimations();
    
});

// Initialize Metronic Components
function initializeComponents() {
    console.log('Metronic Dashboard initialized');
    
    // Initialize any dropdowns
    const dropdownElements = document.querySelectorAll('[data-kt-menu-trigger]');
    dropdownElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            // Handle dropdown logic here
        });
    });
}

// Handle Responsive Sidebar
function handleResponsiveSidebar() {
    const sidebar = document.getElementById('kt_app_sidebar');
    const toggleBtn = document.querySelector('[data-kt-app-sidebar-toggle]');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Close sidebar on outside click for mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 1200) {
            const sidebar = document.getElementById('kt_app_sidebar');
            const isClickInsideSidebar = sidebar && sidebar.contains(e.target);
            const isToggleBtn = e.target.closest('[data-kt-app-sidebar-toggle]');
            
            if (!isClickInsideSidebar && !isToggleBtn && sidebar) {
                sidebar.classList.remove('show');
            }
        }
    });
}

// Initialize Tooltips
function initializeTooltips() {
    // Initialize Bootstrap tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Handle Menu Interactions
function handleMenuInteractions() {
    const menuLinks = document.querySelectorAll('.kt-menu-link');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            menuLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Store active menu item in localStorage
            localStorage.setItem('activeMenuItem', this.getAttribute('href') || this.textContent.trim());
        });
    });
    
    // Restore active menu item on page load
    const activeMenuItem = localStorage.getItem('activeMenuItem');
    if (activeMenuItem) {
        const activeLink = Array.from(menuLinks).find(link => 
            link.getAttribute('href') === activeMenuItem || 
            link.textContent.trim() === activeMenuItem
        );
        if (activeLink) {
            menuLinks.forEach(l => l.classList.remove('active'));
            activeLink.classList.add('active');
        }
    }
}

// Initialize Progress Animations
function initializeProgressAnimations() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Animate progress bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Chart Functionality
function initializeCharts() {
    // Placeholder for chart initialization
    // This would typically integrate with Chart.js, ApexCharts, or similar
    const chartContainers = document.querySelectorAll('.kt-mixed-widget-14-chart');
    
    chartContainers.forEach(container => {
        // Add click handler for chart placeholder
        const showChartBtn = container.querySelector('.btn-light-primary');
        if (showChartBtn) {
            showChartBtn.addEventListener('click', function() {
                // Simulate chart loading
                container.innerHTML = `
                    <div class="d-flex align-items-center justify-content-center h-100">
                        <div class="text-center">
                            <div class="spinner-border text-primary mb-3" role="status">
                                <span class="visually-hidden">در حال بارگذاری...</span>
                            </div>
                            <p class="text-muted fs-6">در حال بارگذاری نمودار...</p>
                        </div>
                    </div>
                `;
                
                // Simulate chart load after 2 seconds
                setTimeout(() => {
                    container.innerHTML = `
                        <div class="d-flex align-items-center justify-content-center h-100">
                            <div class="text-center">
                                <i class="bi bi-check-circle-fill fs-3x text-success mb-3"></i>
                                <p class="text-success fs-6">نمودار با موفقیت بارگذاری شد</p>
                            </div>
                        </div>
                    `;
                }, 2000);
            });
        }
    });
}

// Alert Dismissal
document.addEventListener('click', function(e) {
    if (e.target.matches('[data-bs-dismiss="alert"]')) {
        const alert = e.target.closest('.kt-alert');
        if (alert) {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }
    }
});

// Utility Functions
const KTUtil = {
    // Animate counter numbers
    animateCounter: function(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + (element.dataset.suffix || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    },
    
    // Show notification
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 90px; left: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
};

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCharts);

// Export for global access
window.KTUtil = KTUtil;