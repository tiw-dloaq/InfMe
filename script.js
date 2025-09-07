document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing animation for terminal
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const commands = [
            'npm install creativity',
            'git commit -m "Add innovation"',
            'docker run --rm -it passion',
            'kubectl apply -f dreams.yaml',
            'terraform apply -auto-approve'
        ];
        
        let commandIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeCommand() {
            const currentCommand = commands[commandIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentCommand.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentCommand.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentCommand.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                commandIndex = (commandIndex + 1) % commands.length;
            }
            
            setTimeout(typeCommand, isDeleting ? 50 : 100);
        }
        
        typeCommand();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section, .project-card, .skill-category, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const isPlus = finalValue.includes('+');
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                let currentValue = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(currentValue) + (isPlus ? '+' : '') + (isPercentage ? '%' : '');
                }, 30);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
});

// API Code Editor Functions
function copyCode() {
    const codeTextarea = document.getElementById('apiCode');
    const code = codeTextarea.value;
    
    if (!code.trim()) {
        alert('No code to copy!');
        return;
    }
    
    navigator.clipboard.writeText(code).then(() => {
        // Show success feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.background = 'var(--accent-color)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
        alert('Failed to copy code. Please try again.');
    });
}

function clearCode() {
    const codeTextarea = document.getElementById('apiCode');
    const codePreview = document.getElementById('codePreview');
    
    codeTextarea.value = '';
    codePreview.textContent = '// Your code will appear here with syntax highlighting';
    
    // Show confirmation
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Cleared!';
    btn.style.background = 'var(--secondary-color)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 2000);
}

function formatCode() {
    const codeTextarea = document.getElementById('apiCode');
    let code = codeTextarea.value;
    
    if (!code.trim()) {
        alert('No code to format!');
        return;
    }
    
    try {
        // Basic JavaScript formatting
        code = code
            .replace(/\s*{\s*/g, ' {\n    ')
            .replace(/;\s*/g, ';\n')
            .replace(/\s*}\s*/g, '\n}\n')
            .replace(/,\s*/g, ',\n    ')
            .replace(/\n\s*\n/g, '\n')
            .trim();
        
        codeTextarea.value = code;
        updateCodePreview();
        
        // Show success feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Formatted!';
        btn.style.background = 'var(--accent-color)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    } catch (error) {
        alert('Failed to format code. Please check your syntax.');
    }
}

function updateCodePreview() {
    const codeTextarea = document.getElementById('apiCode');
    const codePreview = document.getElementById('codePreview');
    
    const code = codeTextarea.value;
    
    if (code.trim()) {
        codePreview.textContent = code;
        // Trigger Prism syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightElement(codePreview);
        }
    } else {
        codePreview.textContent = '// Your code will appear here with syntax highlighting';
    }
}

// Real-time code preview update
document.addEventListener('DOMContentLoaded', function() {
    const codeTextarea = document.getElementById('apiCode');
    if (codeTextarea) {
        codeTextarea.addEventListener('input', updateCodePreview);
        
        // Initial preview update
        updateCodePreview();
    }
});

// Theme toggle functionality (bonus feature)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// API Documentation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for API documentation buttons
    const apiDocBtns = document.querySelectorAll('.api-doc-btn');
    apiDocBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const apiCard = this.closest('.api-card');
            const apiName = apiCard.querySelector('.api-name').textContent;
            const endpoint = apiCard.querySelector('.endpoint-url').textContent;
            
            // Show a modal or alert with more detailed documentation
            showApiDocumentation(apiName, endpoint, apiCard);
        });
    });
    
    // Add copy functionality for API endpoints
    const endpointUrls = document.querySelectorAll('.endpoint-url');
    endpointUrls.forEach(url => {
        url.addEventListener('click', function() {
            navigator.clipboard.writeText(this.textContent).then(() => {
                showToast('Endpoint copied to clipboard!');
            });
        });
        
        // Add cursor pointer to indicate clickable
        url.style.cursor = 'pointer';
        url.title = 'Click to copy endpoint';
    });
});

function showApiDocumentation(apiName, endpoint, apiCard) {
    // Create a modal or detailed view
    const modal = document.createElement('div');
    modal.className = 'api-modal';
    modal.innerHTML = `
        <div class="api-modal-content">
            <div class="api-modal-header">
                <h2>${apiName}</h2>
                <button class="api-modal-close">&times;</button>
            </div>
            <div class="api-modal-body">
                <div class="api-detail-section">
                    <h3>Endpoint</h3>
                    <code class="api-endpoint-detail">${endpoint}</code>
                    <button class="btn btn-small" onclick="copyToClipboard('${endpoint}')">Copy Endpoint</button>
                </div>
                <div class="api-detail-section">
                    <h3>Example Usage</h3>
                    <pre class="api-usage-example">// JavaScript Fetch API
fetch('${endpoint}', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));</pre>
                </div>
                <div class="api-detail-section">
                    <h3>cURL Example</h3>
                    <pre class="api-curl-example">curl -X GET "${endpoint}" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json"</pre>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .api-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
        }
        
        .api-modal-content {
            background: var(--bg-card);
            border-radius: 12px;
            border: 1px solid var(--border-color);
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .api-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .api-modal-header h2 {
            color: var(--text-primary);
            margin: 0;
        }
        
        .api-modal-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .api-modal-close:hover {
            color: var(--primary-color);
        }
        
        .api-modal-body {
            padding: 1.5rem;
        }
        
        .api-detail-section {
            margin-bottom: 2rem;
        }
        
        .api-detail-section h3 {
            color: var(--text-primary);
            margin-bottom: 1rem;
        }
        
        .api-endpoint-detail {
            display: block;
            background: var(--bg-darker);
            padding: 1rem;
            border-radius: 6px;
            color: var(--primary-color);
            font-family: 'JetBrains Mono', monospace;
            margin-bottom: 1rem;
            word-break: break-all;
        }
        
        .api-usage-example,
        .api-curl-example {
            background: var(--bg-darker);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 1rem;
            color: var(--text-primary);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            overflow-x: auto;
            white-space: pre-wrap;
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.api-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(modalStyles);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(modalStyles);
        }
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Console easter egg
console.log(`
🚀 Welcome to the developer console!
👨‍💻 This website was built with modern web technologies
🎨 Feel free to explore the code and make it your own
📧 Contact: your.email@example.com
`);

// Add some fun animations on page load
window.addEventListener('load', function() {
    // Animate the hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Animate the code window
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        codeWindow.style.opacity = '0';
        codeWindow.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            codeWindow.style.transition = 'opacity 1s ease, transform 1s ease';
            codeWindow.style.opacity = '1';
            codeWindow.style.transform = 'translateX(0)';
        }, 800);
    }
});
