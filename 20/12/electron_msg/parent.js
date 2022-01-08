// This file is required by the parent.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron');

const pReceiveInput = document.querySelector('.p_receive_input');
const pInput = document.querySelector('.p_input');
const pSendBtn = document.querySelector('.p_send_btn');

pSendBtn.addEventListener('click', () => {
  let msg = pInput.value;
  if(!msg) return;
  ipcRenderer.send('asyn-message', {id: 1, msg})
})

ipcRenderer.on('asyn-reply', (event, arg) => {
  const message = `${arg}`;
  if(arg.id === 2){
    pReceiveInput.value = message;
  }
})