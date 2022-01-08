// This file is required by the child.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron');

const cReceiveInput = document.querySelector('.c_receive_input');
const cInput = document.querySelector('.c_input');
const cSendBtn = document.querySelector('.c_send_btn');

cSendBtn.addEventListener('click', () => {
  let msg = cInput.value;
  if(!msg) return;
  ipcRenderer.send('asyn-message', {id: 2, msg})
})

ipcRenderer.on('asyn-reply', (event, arg) => {
  const message = `${arg}`;
  if(arg.id === 1){
    cReceiveInput.value = message;
  }
})