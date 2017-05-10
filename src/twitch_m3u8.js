// Function based from code [https://github.com/uupaa/M3U8.js/blob/master/lib/M3U8.js]
// by
//

function ParseTwitchM3U8(data) {
  const mediaObjectList = {};
  let lastMediaObjectId = '';

  // extract a key=val and return
  // { "key": "val" }
  function extractKeyVal(d) {
    const keyvalList = [];

    d.split(',').forEach((e) => {
      const keyval = e.split('=');
      keyvalList[keyval[0]] = keyval[1];
    });
    return keyvalList;
  }

  // #EXT-X-MEDIA:TYPE=VIDEO,GROUP-ID="chunked",NAME="720p60 (source)",AUTOSELECT=YES,DEFAULT=YES
  function parseMedia(line) {
    const mediaData = extractKeyVal(line);
    const mediaId = mediaData['GROUP-ID'];

    // We're not interested in audio.
    if (mediaId === 'audio_only') {
      return;
    }

    //
    //
    mediaObjectList[mediaId] = mediaObjectList[mediaId] || {};

    //
    mediaObjectList[mediaId].id = mediaId;
    mediaObjectList[mediaId].name = mediaData.NAME;
    mediaObjectList[mediaId].autoselect = mediaData.AUTOSELECT === 'YES';
    mediaObjectList[mediaId].default = mediaData.DEFAULT === 'YES';

    //
    lastMediaObjectId = mediaId;
  }

  // #EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=3045976,RESOLUTION=1280x720,CODECS="",VIDEO="chunked"
  function parseStreamInfo(line) {
    const streamData = extractKeyVal(line);

    // We're not interested in audio.
    if (streamData.VIDEO === 'audio_only') {
      return;
    }

    // The VIDEO data is the same as Group-ID
    const mediaId = streamData.VIDEO;

    //
    mediaObjectList[mediaId] = mediaObjectList[mediaId] || {};

    //
    mediaObjectList[mediaId].bandwidth = streamData.BANDWIDTH;
    mediaObjectList[mediaId].resolution = streamData.RESOLUTION;
    mediaObjectList[mediaId].codecs = streamData.CODECS.split(',');

    //
    lastMediaObjectId = mediaId;
  }

  //
  const lines = data.trim().replace(/(\r\n|\r|\n)+/g, '\n').replace(/['"]+/g, '').split('\n');

  //
  lines.forEach((line) => {
    //
    if (/^#EXT/.test(line)) {
      const keyval = line.split(':'); // "key:value" -> [key, value]
      const key = keyval[0];
      const val = keyval[1];

      switch (key) {
        case '#EXT-X-MEDIA':
          parseMedia(val);
          break;
        case '#EXT-X-STREAM-INF':
          parseStreamInfo(val);
          break;
        default:
          break;
      }
    } else if (/^https/.test(line)) {
      mediaObjectList[lastMediaObjectId].url = line;
    }
  });

  // w
  return mediaObjectList;
}

export default ParseTwitchM3U8;
