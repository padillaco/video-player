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

VideoPlayer looks for elements that have a `data-video-trigger` attribute, unless you provide the elements directly (see configuration). These elements alsmo must have a `data-<videoType>-id` attribute.  This is the unique id of the video.  VideoType can be either "youtube" or "vimeo". You can have multiple player button elements.  You can optionally set a `data-video-name` attribute that will be available in the `onPlay` callback.  This is useful for sending Google Analytics Events.  Here's a basic example:

```html
 <button
  data-video-trigger
  data-video-youtube-id="lkajg292"
  data-video-name="MyVideo">Play</button>
```

| Property     | Type   | Description                                                         | Required |
| ------------ | ------ | ------------------------------------------------------------------- | -------- |
| VideoTrigger | null   | Attribute to trigger the player library                             | Yes      |
| VideoId      | string | Id of the video as set via the `data-<videoType>-id` data attribute | Yes      |
| VideoType    | string | Type of the video. Either "youtube" or "vimeo"                      | Yes      |
| VideoName    | string | Name of the video as set via the `data-video-name` data attribute   | No       |

## Configuration

The VideoPlayer is configurable:

| Property         | Type              | Default Value                                     | Description                                                                                                 |
| ---------------- | ----------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| backgroundColor  | string            | rgba(0,0,0,0.8)                                   | The color of the modal overlay. Can be any value that is valid for background-color CSS property.           |
| buttonElements   | Array<DomElement> | document.querySelectorAll('.video-player-button') | An array of DOM elements that will trigger the video player. See player button markup for specific details. |
| closeButtonColor | string            | #ffffff                                           | The color of the modal close button. Can be any value that is valid for color CSS property.                 |
| onPlay           | function          | (videoProps) => {}                                | Callback function executed when a video starts to play.  See Below for videoProps object.                   |
| PlayerWidth      | double            | 0.8888                                            | width of the iFrame as a fraction of the screen width                                                       |


The `onPlay` callback passes a `VideoProps` object with the following data:

```javascript
  {
    videoId: <string>,
    videoName: <string>,
    videoType: <string>
  }
```
