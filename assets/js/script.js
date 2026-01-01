// Smooth scroll for Learn More button
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Responsive nav (for mobile), modals, forms
document.addEventListener('DOMContentLoaded', function() {
  // Hamburger toggle
  document.querySelectorAll('.hamburger-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('nav ul').classList.toggle('active');
    });
  });

  // Scroll to about
  document.querySelectorAll('.scroll-to-about').forEach(btn => {
    btn.addEventListener('click', () => {
      scrollToSection('about-section');
    });
  });

  // Modal close buttons
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'none';
    });
  });

  // Modal background click to close
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  // Resume request button
  const resumeBtn = document.getElementById('resumeRequestBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      document.getElementById('resumeModal').style.display = 'flex';
    });
  }

  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const data = new FormData(contactForm);
      fetch('https://formspree.io/f/xrblwlnb', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          document.getElementById('thankYouModal').style.display = 'flex';
          contactForm.reset();
        } else {
          response.json().then(data => {
            alert(data.error || 'There was a problem submitting your message.');
          });
        }
      })
      .catch(() => {
        alert('There was a problem submitting your message.');
      });
    });
  }

  // Copy code functionality
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
      const codeId = this.getAttribute('data-code-id');
      if (codeId) {
        const codeElement = document.getElementById(codeId);
        if (codeElement) {
          const text = codeElement.textContent;
          navigator.clipboard.writeText(text).then(() => {
            // Optional: Show feedback
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            setTimeout(() => {
              this.textContent = originalText;
            }, 2000);
          }).catch(err => {
            console.error('Failed to copy: ', err);
          });
        }
      }
    });
  });

  // Download image functionality
  document.querySelectorAll('.download-image-btn').forEach(button => {
    button.addEventListener('click', function() {
      const imgId = this.getAttribute('data-img-id');
      if (imgId) {
        const img = document.getElementById(imgId);
        if (img) {
          const link = document.createElement('a');
          link.href = img.src;
          link.download = img.alt || 'image.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    });
  });
})

// scripts.js

function downloadPDF() {
  const main = document.querySelector('main');
  const opt = {
    margin:       0.2,
    filename:     'blast-using-python.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  const feedback = document.getElementById('pdf-feedback');
  feedback.innerText = '';

  html2pdf().set(opt).from(main).save()
    .then(function() {
      feedback.innerText = 'PDF downloaded successfully!';
      feedback.style.color = '#219150';
      setTimeout(() => { feedback.innerText = ''; }, 2500);
    })
    .catch(function(err) {
      feedback.innerText = 'PDF download failed. Please try again.';
      feedback.style.color = '#b71c1c';
    });
}



    const canvas = document.getElementById("dnaCanvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");

      function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      let t = 0;
      function drawDNA() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const midX = canvas.width / 2;
        const midY = canvas.height / 2;
        const length = 200;
        const spacing = 10;

        for (let i = -length; i < length; i += spacing) {
          let y = midY + i;
          let x1 = midX + Math.sin(i * 0.05 + t) * 80;
          let x2 = midX + Math.sin(i * 0.05 + t + Math.PI) * 80;

          ctx.beginPath();
          ctx.arc(x1, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#689071";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x2, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#0F2A1D";
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = "rgba(0,0,0,0.2)";
          ctx.stroke();
        }

        t += 0.05;
        requestAnimationFrame(drawDNA);
      }
      drawDNA();
    }

    function scrollToSection(id) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }


document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav-links").classList.toggle("active");
});

var $easyzoom = $('.easyzoom').easyZoom();

document.getElementById("emailBtn").onclick = function() {
  window.location.href = "mailto:shubraizshan@gmail.com?subject=Request%20for%20Resume%2FCV";
};