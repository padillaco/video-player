function appendModal(el, closeButtonColor, backgroundColor) {
  const modal = document.createElement('div');
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('tabindex', '-1');
  modal.classList.add('video-frame-wrapper');
  modal.style.backgroundColor = backgroundColor;
  modal.innerHTML = `
    <button class="video-frame-close"  tabindex="-1">
      <svg role="img" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" aria-labellby="video-modal-close-title">
        <title id="video-modal-close-title">Close Video Modal</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
              <g transform="translate(-1407.000000, -19.000000)" stroke="${closeButtonColor} " stroke-width="2">
                  <g>
                      <g id="close-button" transform="translate(1408.000000, 20.000000)">
                          <path d="M12,0 L0,12" id="Path"></path>
                          <path d="M0,0 L12,12" id="Path"></path>
                      </g>
                  </g>
              </g>
          </g>
      </svg>
    </button>
    <div class="video-frame-center"></div>
  `;
  el.appendChild(modal);
}

export default appendModal;
