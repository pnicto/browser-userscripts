// ==UserScript==
// @name         Fix twitter embed
// @namespace    http://tampermonkey.net/
// @version      2023-12-17
// @description  Fix twitter embeds to use a different share url
// @author       pnicto
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  var btn = document.createElement("button");
  btn.innerHTML = "Change clipboard";
  btn.id = "embed-share";

  btn.style.position = "fixed";
  btn.style.padding = "10px";
  btn.style.bottom = "10px";
  btn.style.right = "10px";

  document.body.appendChild(btn);

  btn.addEventListener("click", function () {
    navigator.clipboard
      .readText()
      .then((contents) => {
        const URL = contents.replace("https://x", "https://fixupx");
        navigator.clipboard.writeText(URL).catch((err) => {
          console.error("Failed to copy: ", err);
        });
      })
      .catch((err) => {
        console.error("Failed reading contents", err);
      });
  });
})();
