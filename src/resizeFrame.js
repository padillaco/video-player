export default function resizeVideoFrame(frameCenter) {
  console.log('resizing');
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  let centerWidth = 0.88888 * winWidth;
  const centerHeightMax = 0.88888 * winHeight;
  let centerHeight = 0.5625 * centerWidth;

  if (centerHeight > centerHeightMax) {
    centerHeight = centerHeightMax;
    centerWidth = centerHeight * 1.7778;
  }

  frameCenter.style.width = `${centerWidth}px`;
  frameCenter.style.height = `${centerHeight}px`;
}
