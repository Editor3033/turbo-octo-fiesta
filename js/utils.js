/* ========================================
   ToolFlow — Utilitários Compartilhados
   ======================================== */

// ===== Notificações Toast =====
const ToastManager = (() => {
  let container;

  function ensureContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function show(message, type = 'success', duration = 3000) {
    const c = ensureContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    toast.innerHTML = `<span>${icons[type] || ''}</span> <span>${message}</span>`;
    c.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  return {
    success: (msg) => show(msg, 'success'),
    error: (msg) => show(msg, 'error'),
    info: (msg) => show(msg, 'info'),
  };
})();

// ===== Área de Transferência =====
async function copyToClipboard(text) {
  if (!text) { ToastManager.error('Nada para copiar'); return false; }
  try {
    await navigator.clipboard.writeText(text);
    ToastManager.success('Copiado para a área de transferência!');
    return true;
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    ToastManager.success('Copiado para a área de transferência!');
    return true;
  }
}

// ===== Download de Arquivo =====
function downloadFile(content, filename, mimeType = 'text/plain') {
  if (!content) { ToastManager.error('Nada para baixar'); return; }
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  ToastManager.success(`${filename} baixado com sucesso`);
}

function downloadBlobFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  ToastManager.success(`${filename} baixado com sucesso`);
}

// ===== Helpers de Armazenamento Local =====
const Storage = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  remove(key) { localStorage.removeItem(key); }
};

// ===== Validação de Formulário =====
function validateNotEmpty(value, fieldName = 'Campo') {
  if (!value || !value.trim()) {
    ToastManager.error(`${fieldName} não pode estar vazio`);
    return false;
  }
  return true;
}

function validateJSON(str) {
  try { JSON.parse(str); return true; }
  catch { return false; }
}

// ===== Debounce =====
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// ===== FAQ Toggle =====
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      // Fechar todos
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

// ===== Menu Mobile =====
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('active'));
  }
}

// ===== Chips de Exemplo =====
function initExampleChips(inputSelector) {
  document.querySelectorAll('.example-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const input = document.querySelector(inputSelector);
      if (input) {
        input.value = chip.textContent || chip.dataset.value;
        input.dispatchEvent(new Event('input'));
      }
    });
  });
}

// ===== Filtro de Busca (homepage) =====
function initSearch() {
  const searchInput = document.getElementById('toolSearch');
  if (!searchInput) return;
  const cards = document.querySelectorAll('.tool-card-wrapper');
  searchInput.addEventListener('input', debounce((e) => {
    const q = e.target.value.toLowerCase();
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  }, 200));
}

// ===== Inicialização Comum =====
document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initMobileMenu();
  initSearch();
  if (typeof initHeaderScroll === 'function') initHeaderScroll();
});
