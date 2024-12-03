// ==UserScript==
// @name         YT Music Pause After Current Song
// @namespace    http://tampermonkey.net/
// @version      2023-12-28
// @description  Stop playing music after the current song
// @author       pnicto
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

function timeToSeconds(time) {
  const [minutes, seconds] = time.split(":");
  return Number(minutes) * 60 + Number(seconds);
}

(function () {
  "use strict";

  let btn = document.createElement("button");

  btn.textContent = "Stop after current song";
  btn.id = "stop-after-current-song";

  btn.style.position = "fixed";
  btn.style.padding = "10px";
  btn.style.bottom = "400px";
  btn.style.right = "10px";

  document.body.appendChild(btn);

  btn.addEventListener("click", function () {
    const duration = document
      .querySelector("#progress-bar")
      .getAttribute("aria-valuetext");

    const [current, total] = duration.split(" of ");

    const currentSeconds = timeToSeconds(current);
    const totalSeconds = timeToSeconds(total);
    const left = totalSeconds - currentSeconds;
    console.log("Added timeout for", left, "seconds");

    setTimeout(
      function () {
        var pauseBtn = document.getElementById("play-pause-button");
        if (pauseBtn) {
          pauseBtn.click();
        }
      },
      (left - 2) * 1000,
    );
  });
})();
