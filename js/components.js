/* ========================================
   ToolFlow — Componentes Compartilhados
   Cabeçalho, Rodapé, Ferramentas Relacionadas, FAQ
   ======================================== */

function getBasePath() {
  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  if (depth <= 1) return '.';
  return Array(depth).fill('..').join('/');
}

function renderHeader(base = '.') {
  return `
  <header class="site-header">
    <div class="container header-inner">
      <a href="/index.html" class="logo">
        <svg viewBox="0 0 28 28" fill="none"><defs><linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs><rect width="28" height="28" rx="8" fill="url(#logoGrad)"/><path d="M8 9h12M8 14h8M8 19h10" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
        ToolFlow
      </a>
      <nav>
        <ul class="nav-links">
          <li><a href="/index.html">Início</a></li>
          <li><a href="/categories/seo-tools.html">SEO</a></li>
          <li><a href="/categories/text-tools.html">Texto</a></li>
          <li><a href="/categories/developer-tools.html">Desenvolvedor</a></li>
          <li><a href="/categories/image-tools.html">Imagem</a></li>
          <li><a href="/about.html">Sobre</a></li>
        </ul>
      </nav>
      <button class="mobile-menu-btn" aria-label="Menu">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
    <div class="mobile-nav">
      <a href="/index.html">Início</a>
      <a href="/categories/seo-tools.html">Ferramentas SEO</a>
      <a href="/categories/text-tools.html">Ferramentas de Texto</a>
      <a href="/categories/developer-tools.html">Ferramentas para Desenvolvedores</a>
      <a href="/categories/image-tools.html">Ferramentas de Imagem</a>
      <a href="/categories/generators-tools.html">Geradores</a>
      <a href="/categories/converter-tools.html">Conversores</a>
      <a href="/about.html">Sobre</a>
    </div>
  </header>`;
}

function renderFooter(base = '.') {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/index.html" class="logo" style="color:#fff">
            <svg viewBox="0 0 28 28" fill="none" width="28" height="28"><defs><linearGradient id="logoGradF" x1="0" y1="0" x2="28" y2="28"><stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs><rect width="28" height="28" rx="8" fill="url(#logoGradF)"/><path d="M8 9h12M8 14h8M8 19h10" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
            ToolFlow
          </a>
          <p>Ferramentas online rápidas e gratuitas para criadores de conteúdo, desenvolvedores e trabalho digital do dia a dia. Tudo roda no seu navegador — sem uploads, sem cadastro.</p>
        </div>
        <div class="footer-col">
          <h4>Ferramentas</h4>
          <a href="/tools/seo/slug-generator.html">Gerador de Slug</a>
          <a href="/tools/text/word-counter.html">Contador de Palavras</a>
          <a href="/tools/developer/json-formatter.html">Formatador JSON</a>
          <a href="/tools/image/jpeg-compressor.html">Compressor JPEG</a>
          <a href="/tools/generators/qr-code-generator.html">Gerador de QR Code</a>
        </div>
        <div class="footer-col">
          <h4>Categorias</h4>
          <a href="/categories/seo-tools.html">Ferramentas SEO</a>
          <a href="/categories/text-tools.html">Ferramentas de Texto</a>
          <a href="/categories/developer-tools.html">Ferramentas para Devs</a>
          <a href="/categories/image-tools.html">Ferramentas de Imagem</a>
          <a href="/categories/generators-tools.html">Geradores</a>
          <a href="/categories/converter-tools.html">Conversores</a>
        </div>
        <div class="footer-col">
          <h4>Empresa</h4>
          <a href="/about.html">Sobre</a>
          <a href="/privacy.html">Política de Privacidade</a>
          <a href="/terms.html">Termos de Uso</a>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} ToolFlow. Todos os direitos reservados. Feito com ♥ para produtividade.
      </div>
    </div>
  </footer>`;
}

function renderRelatedTools(tools, base = '.') {
  if (!tools || !tools.length) return '';
  const cards = tools.map(t => `
    <a href="/${t.path}" class="card tool-card">
      <div class="tool-icon ${t.iconClass}">${t.icon}</div>
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
      <span class="card-arrow">Usar ferramenta →</span>
    </a>
  `).join('');
  return `<section class="related-tools"><div class="container"><h2>Ferramentas Relacionadas</h2><div class="grid-3">${cards}</div></div></section>`;
}

/* Header scroll effect */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

/* Initialize header scroll on load */
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderScroll);
  } else {
    initHeaderScroll();
  }
}
