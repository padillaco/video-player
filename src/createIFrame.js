export default function createIFrame() {
  const iframe = document.createElement('IFRAME');
  iframe.className = 'video-frame';
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute(
    'allow',
    'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
  );
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('onload', 'showVideoFrame()');
  return iframe;
}
