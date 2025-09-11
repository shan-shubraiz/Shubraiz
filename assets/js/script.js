// Smooth scroll for Learn More button
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Contact form interactivity
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('form-message').textContent = 'Thank you for reaching out! I will get back to you soon.';
    form.reset();
  });
}

// Responsive nav (for mobile)
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('nav ul');
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', function() {
    nav.classList.toggle('active');
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