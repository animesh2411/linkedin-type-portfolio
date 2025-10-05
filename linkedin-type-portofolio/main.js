// Dark mode toggle logic...
const toggle = document.getElementById('modeToggle');
const icon = document.getElementById('modeIcon');

function setMode(dark) {
  document.body.classList.toggle('dark-mode', dark);
  icon.innerHTML = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 21h6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-19a7 7 0 0 1 7 7c0 2.386-1.198 4.25-2.64 5.708-.651.644-1.36 1.344-1.36 2.292V17a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-.001c0-.948-.709-1.648-1.36-2.292C5.198 13.25 4 11.386 4 9a7 7 0 0 1 7-7zm0 2a5 5 0 0 0-5 5c0 1.661.857 3.048 2.072 4.263C11.07 13.622 11.683 14.195 12 14.874c.317-.679.93-1.252 2.928-3.611C16.143 12.048 17 10.661 17 9a5 5 0 0 0-5-5z"/></svg>`;
  localStorage.setItem('darkMode', dark ? '1' : '0');
}
(function () {
  let dark = localStorage.getItem('darkMode');
  if (dark === null) {
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches ? '1' : '0';
  }
  setMode(dark === '1');
})();
toggle.addEventListener('click', () => {
  setMode(!document.body.classList.contains('dark-mode'));
});

// Wait for images helper
function waitForImagesToLoad(element, callback) {
  const images = element.querySelectorAll('img');
  let loaded = 0;
  const count = images.length;
  if (count === 0) { callback(); return; }
  images.forEach(img => {
    if (img.complete && img.naturalHeight !== 0) {
      loaded++;
      if (loaded === count) callback();
    } else {
      img.addEventListener('load', check, { once: true });
      img.addEventListener('error', check, { once: true });
    }
  });
  function check() {
    loaded++;
    if (loaded === count) callback();
  }
}

document.getElementById('downloadBtn').addEventListener('click', function () {
  const element = document.getElementById('resume-content') || document.body; // use a wrapper if you have it
  waitForImagesToLoad(element, function() {
    setTimeout(function() { // <-- Add a short delay for final rendering
      const opt = {
        margin: 0.2,
        filename: 'animesh2411-resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }, 100); // 500ms delay – adjust if needed
  });
});;