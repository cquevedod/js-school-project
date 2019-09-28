(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _this = void 0;

/* 
Code snippet taken from: https://codepen.io/zFunx/pen/dvJQEY 
Credits: zFunx Web Developement Ideas
Youtube channel: https://www.youtube.com/channel/UCU5SqAfXADk50eOjQqdsVlA ======
 */
var textOverImages = document.getElementsByClassName("onClickTextOverImage");
var previousTextOverImage;

for (var i = 0; i < textOverImages.length; i++) {
  textOverImages[i].onclick = function () {
    var classes = _this.classList;

    if (classes.contains("show")) {
      classes.remove("show");
    } else {
      if (previousTextOverImage != null) previousTextOverImage.classList.remove("show");
      previousTextOverImage = _this;
      classes.add("show");
    }
  };
}

function stopPropagation(event) {
  event.stopPropagation();
}

},{}]},{},[1]);
