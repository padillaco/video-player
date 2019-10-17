/** Video Player public API:
  - new VideoPlayer(config):
      - buttonElements []<elements>: DOM elements that will triger a video play (default: elements with'videoPlayer-button' class).
      - closeOnEscape boolen: close modal when user presses escape key (default: true)
      - closeButtonColor string: color of the modal close button;
      - modalBackgroundColor string: color of the modal background
      - modalBackgroundOpacity number: opacity of the modal
      - fixBodyOnPlay boolean: sets the body element to position: fixed when modal is open (default: true)
      - playerWidth number: percentage of the viewport the player should take up (default: 88)
      - onPlay function(videoId, videoName): function that executes when a video starts to play.
      - onStop function(videoId, videoName): function that executes when a video stops playing.
*/

import appendModal from './appendModal';
import createIFrame from './createIFrame';
import resizeVideoFrame from './resizeFrame';
import initBooleanProp from './initBooleanProp';
import './optimizedResize';
import './styles.css';

import {
  defaultClasses,
  videoTypes,
  playerWidth,
  closeButtonColor,
  backgroundColor,
  onPlay
} from './defaultConfig';

class VideoPlayer {
  constructor(config = {}) {
    this.buttonElements = this._setButtonElements(config);
    this.closeOnEscape = initBooleanProp(config, 'closeOnEscape', true);
    this.fixBodyOnPlay = initBooleanProp(config, 'fixBodyOnPlay', true);
    this.closeButtonColor = config.closeButtonColor || closeButtonColor;
    this.backgroundColor = config.backgroundColor || backgroundColor;
    this.playerWidth = config.playerWidth || playerWidth;
    this.videoActive = false;
    this.videoType = null;
    this.videoId = null;
    this.videoName = null;
    appendModal(document.body, this.closeButtonColor, this.backgroundColor);
    this.frameWrapper = this._setFrameWrapper();
    this.frameCenter = this._setFrameCenter();
    this.frameClose = this._setFrameClose();
    this.onPlay = config.onPlay || onPlay;
    this._setEventListeners(config);
    window.showVideoFrame = () => {
      const { videoName, videoId, videoType } = this;
      this.videoFrameActive = true;
      this.onPlay({ videoName, videoId, videoType });
      resizeVideoFrame(this.frameCenter);
      if (this.fixBodyOnPlay) document.body.style = 'position: fixed';
    };
  }

  _setFrameWrapper = () => {
    return document.querySelector(`.${defaultClasses.frameWrapper}`);
  };

  _setFrameCenter = () => {
    return document.querySelector(`.${defaultClasses.frameCenter}`);
  };

  _setFrameClose = () => {
    return document.querySelector(`.${defaultClasses.frameClose}`);
  };

  _setButtonElements = config => {
    if (config.buttonElements) return config.buttonElements;
    const els = document.querySelectorAll(`[data-video-trigger]`);
    if (els.length === 0) {
      console.warn('VideoPlayer Error: No Button Elements could be found');
    }
    return els;
  };

  _setEventListeners = () => {
    this.frameClose.addEventListener('click', this.hideVideoFrame);
    this.buttonElements.forEach(el => {
      el.addEventListener('click', this._playVideo);
    });

    if (this.closeOnEscape) {
      window.addEventListener('keyup', this.closeVideoOnEscape);
    }
    window.addEventListener('optimizedResize', this.resizeVideoFrame);
  };

  closeVideoOnEscape = e => {
    if (e.key == 'Escape' && this.videoFrameActive) {
      this.hideVideoFrame();
    }
  };

  _playVideo = ({ currentTarget }) => {
    if (!this.videoActive) {
      for (let type of videoTypes) {
        if (currentTarget.dataset[`${type}Id`]) {
          this.videoId = currentTarget.dataset[`${type}Id`];
          this.videoType = type;
          this.videoName = currentTarget.dataset.videoName;
        }
      }

      if (this.videoId.length > 0) {
        this._loadModal();
      } else {
        console.error('VideoId could not be found on target: ', currentTarget);
      }
    }
  };

  _loadModal = () => {
    if (this.videoFrame) {
      this.videoFrame.remove();
    }

    this.videoFrame = createIFrame();

    if (this.videoType === 'youtube') {
      this.videoFrame.src = `https://www.youtube.com/embed/${this.videoId}?autoplay=1&rel=0`;
    } else if (this.videoType === 'vimeo') {
      this.videoFrame.src = `https://player.vimeo.com/video/${this.videoId}?autoplay=1`;
    }
    this.frameCenter.appendChild(this.videoFrame);
    this.frameWrapper.className += ' -active -visible';
    this.frameWrapper.setAttribute('aria-hidden', 'false');
    this.frameWrapper.setAttribute('tabindex', '0');
    this.frameClose.setAttribute('aria-hidden', 'false');
    this.frameClose.setAttribute('tabindex', '0');
  };

  hideVideoFrame = () => {
    if (this.fixBodyOnPlay) document.body.style = 'position: static';
    this.frameWrapper.className = this.frameWrapper.className.replace(
      /\s+?-visible/,
      ''
    );

    clearTimeout(this.videoFrameWrapperTimeout);
    this.videoFrameTimeout = setTimeout(() => {
      this.frameWrapper.className = this.frameWrapper.className.replace(
        /\s+?-active/,
        ''
      );
      this.videoFrame.remove();
      this.videoFrameActive = false;
    }, 420);
  };
}

export default VideoPlayer;
