export default function resizeVideoFrame(frameCenter, playerWidth) {
  console.log(playerWidth);
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  let centerWidth = playerWidth * winWidth;
  const centerHeightMax = playerWidth * winHeight;
  let centerHeight = 0.5625 * centerWidth;

  if (centerHeight > centerHeightMax) {
    centerHeight = centerHeightMax;
    centerWidth = centerHeight * 1.7778;
  }

  frameCenter.style.width = `${centerWidth}px`;
  frameCenter.style.height = `${centerHeight}px`;
}
