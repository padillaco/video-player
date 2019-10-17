# VideoPlayer

A simple modal video player that supports both YouTube and Vimeo.

## Installation

```javascript
npm install @padillaco/video-player
```

## Usage

```javascript
  import VideoPlayer from '@padillaco/video-player'


  new VideoPlayer(config);
```

Elements that trigger the video modal must have a `data-<videoType>-id` attribute.  This is the unique id of the video.  VideoId can be either "youtube" or "vimeo". They must also have the class `video-player-button`, unless you supply the button elements through the configuration (see configuration section below).  You can have multiple player button elements.  By default, the player will look for all elements with the class `video-player-button`.  You can optionally set a `data-video-name` attribute that will be available in the `onPlay   callback.  This is useful for sending Google Analytics Events.  Here's a basic example:


```html
 <button class="video-player-button" video-youtube-id="lkajg292" data-video-name="MyVideo">Play</button>
```

## Configuration

The VideoPlayer is configurable:

| Property         | Type              | Default Value                                     | Description                                                                                                 |
|------------------|-------------------|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| backgroundColor  | string            | rgba(0,0,0,0.8)                                   | The color of the modal overlay. Can be any value that is valid for background-color CSS property.       |
| buttonElements   | Array<DomElement> | document.querySelectorAll('.video-player-button') | An array of DOM elements that will trigger the video player. See player button markup for specific details. |
| closeButtonColor | string            | #ffffff                                           | The color of the modal close button. Can be any value that is valid for color CSS property.                  |
| onPlay           | function          | (videoProps) => {}                                | Callback function executed when a video starts to play.  See Below for videoProps object.                   |
| PlayerWidth      | double            | 0.8888                                            | width of the iFrame as a fraction of the screen width                                                        |


`VideoProps` Object

|  Property |  Type  | Description |
|-----------|--------| ----------- |
| VideoId   | string | Id of the video as set via the `data-<videoType>-id` data attribute |
| VideoType | string | Type of the video. Either "youtube" or "vimeo" |
| VideoName | string | Name of the video as set via the `data-video-name` data attribute |