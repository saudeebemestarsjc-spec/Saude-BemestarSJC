const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}

const shareButton = document.querySelector('#share-button');
const shareStatus = document.querySelector('#share-status');
if (shareButton) {
  shareButton.addEventListener('click', async () => {
    const shareData = {
      title: 'Evento de Saúde & Bem-Estar',
      text: 'Vamos juntos ao Evento de Saúde & Bem-Estar? Dia 17 de outubro, a partir das 16h, no Galo Branco, em São José dos Campos. Entrada gratuita!',
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        shareStatus.textContent = 'Convite copiado! Agora é só enviar para alguém.';
      } else {
        shareStatus.textContent = 'Use o botão “Convidar pelo WhatsApp” para compartilhar o convite.';
      }
    } catch (error) {
      if (error && error.name !== 'AbortError') {
        shareStatus.textContent = 'Não foi possível compartilhar agora. Tente pelo WhatsApp.';
      }
    }
  });
}

const copyButton = document.querySelector('#copy-address');
const copyStatus = document.querySelector('#copy-status');
if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const address = 'Av. Antônio Ferreira Vinhas, 1173, Galo Branco, São José dos Campos – SP';
    try {
      await navigator.clipboard.writeText(address);
      copyStatus.textContent = 'Endereço copiado para a área de transferência.';
    } catch {
      copyStatus.textContent = `Endereço: ${address}`;
    }
  });
}
