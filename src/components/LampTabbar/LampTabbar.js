export default function LampTabbar(f7, el) {
  if (!el || !f7) return;
  if (typeof el === 'string') {
    el = f7.$(el)[0];
  }
  if (!el) return;

  if (!el.classList.contains('lamp-tabbar')) {
    el.classList.add('lamp-tabbar');
  }
  if (!el.classList.contains('tabbar-highlight')) {
    el.classList.add('tabbar-highlight');
  }

  if (!el.querySelector('.tab-link-highlight')) {
    const highlightEl = document.createElement('span');
    highlightEl.classList.add('tab-link-highlight');
    el.querySelector('.toolbar-inner, .tabbar-inner').appendChild(highlightEl);
    f7.toolbar.setHighlight(el);
  }
  const updateTabbar = () => {
    el.classList.add('lamp-tabbar', 'tabbar-highlight');
    const activeLinkEl = el.querySelector('.tab-link-active');
    if (!activeLinkEl) return;
    const propValue = activeLinkEl.style.getPropertyValue('--lamp-color');
    el.style.setProperty('--active-lamp-color', propValue || '');
  };
  const callback = (mutations) => {
    if (!mutations) return;
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.target &&
        !mutation.target.classList.contains('tab-link')
      ) {
        return;
      }
      updateTabbar();
    });
  };
  const observer = new MutationObserver(callback);

  observer.observe(el.querySelector('.toolbar-inner'), {
    childList: true,
    subtree: true,
    attributes: true,
  });

  updateTabbar();
}
