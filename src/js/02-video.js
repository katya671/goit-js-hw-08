import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

const savedTime = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (savedTime) {
  player.setCurrentTime(savedTime);
}

function onTimeUpdate(currentTime) {
  const currentTimeSeconds = currentTime.seconds;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTimeSeconds));
}

player.on('timeupdate', throttle(onTimeUpdate, 1000));
