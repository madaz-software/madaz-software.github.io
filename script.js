// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    // Check if the clicked element is the WhatsApp icon
    if (e.target.classList.contains("whatsapp-icon")) {
      e.preventDefault();
      e.stopPropagation();

      // Redirect to WhatsApp
      const whatsappUrl =
        "https://wa.me/5531984722959?text=Olá,%20vim%20pelo%20site!";
      window.open(whatsappUrl, "_blank");
      return;
    }

    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .timeline-item, .value-item"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !message) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    // Format message for WhatsApp
    let whatsappMessage = `Olá! Vim pelo site da Madaz e gostaria de entrar em contato.\n\n`;
    whatsappMessage += `📋 *Dados do Contato:*\n`;
    whatsappMessage += `👤 Nome: ${name}\n`;
    whatsappMessage += `📧 E-mail: ${email}\n`;
    if (company) {
      whatsappMessage += `🏢 Empresa: ${company}\n`;
    }
    whatsappMessage += `\n💬 *Mensagem:*\n${message}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp URL with your number
    const whatsappUrl = `https://wa.me/5531984722959?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    // Show success message
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Redirecionando...";
    submitBtn.disabled = true;

    // Reset form after a short delay
    setTimeout(() => {
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Floating cards animation enhancement
document.addEventListener("DOMContentLoaded", () => {
  const floatingCards = document.querySelectorAll(".floating-card");

  floatingCards.forEach((card, index) => {
    // Add random delay to create more natural movement
    const randomDelay = Math.random() * 2;
    card.style.animationDelay = `${randomDelay}s`;

    // Add hover effect
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.05)";
      card.style.transition = "all 0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Service cards hover effect
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const icon = card.querySelector(".service-icon");
      icon.style.transform = "scale(1.1) rotate(5deg)";
      icon.style.transition = "all 0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
      const icon = card.querySelector(".service-icon");
      icon.style.transform = "scale(1) rotate(0deg)";
    });
  });
});

// Portfolio items hover effect
document.addEventListener("DOMContentLoaded", () => {
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const image = item.querySelector(".portfolio-image");
      image.style.transform = "scale(1.05)";
      image.style.transition = "all 0.3s ease";
    });

    item.addEventListener("mouseleave", () => {
      const image = item.querySelector(".portfolio-image");
      image.style.transform = "scale(1)";
    });
  });
});

// Timeline items animation
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 200);
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.6s ease";
    timelineObserver.observe(item);
  });
});

// WhatsApp button functionality
document.addEventListener("DOMContentLoaded", () => {
  const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
  const phoneNumber = "+5511999999999"; // Replace with actual phone number

  whatsappLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const message = "Olá! Gostaria de saber mais sobre os serviços da MADAZ.";
      const whatsappUrl = `https://wa.me/${phoneNumber.replace(
        /\D/g,
        ""
      )}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    });
  });
});

// Scroll to top functionality
document.addEventListener("DOMContentLoaded", () => {
  // Create scroll to top button
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.visibility = "visible";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.visibility = "hidden";
    }
  });

  // Scroll to top when clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effect
  scrollToTopBtn.addEventListener("mouseenter", () => {
    scrollToTopBtn.style.transform = "scale(1.1)";
  });

  scrollToTopBtn.addEventListener("mouseleave", () => {
    scrollToTopBtn.style.transform = "scale(1)";
  });
});

// Performance optimization: Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Add loading states for better UX
document.addEventListener("DOMContentLoaded", () => {
  // Add loading class to elements that should animate in
  const loadingElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .timeline-item"
  );
  loadingElements.forEach((el) => {
    el.classList.add("loading");
  });

  // Remove loading class when element comes into view
  const loadingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded");
          loadingObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  loadingElements.forEach((el) => {
    loadingObserver.observe(el);
  });
});

// Console welcome message
console.log(`
🚀 MADAZ - Consultoria em Software
Desenvolvido com ❤️ para impulsionar seu negócio

Contato: contato@madaz.com.br
WhatsApp: +55 (11) 99999-9999
`);

// Error handling for form submission
window.addEventListener("error", (e) => {
  console.error("Erro detectado:", e.error);
});

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
