const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const textarea = document.getElementById('textarea').value;
  const size = document.getElementById('size').value;

  if(textarea === '') {
    alert('Please enter text');
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQRCode(textarea, size);

      setTimeout(() => {
        const saveText = qr.querySelector('img').src;
        createSaveBtn(saveText);
      }, 50)
    }, 1000);
  }
}

const generateQRCode = (textarea, size) => {
  const qrcode = new QRCode('qrcode', {
    text: textarea,
    width: size,
    height: size
  });
}

const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block';
}

const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none';
}

const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if(saveBtn) saveBtn.remove();
}

const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList = 'bg-red-400 hover:bg-red-500 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save';
  document.getElementById('generated').appendChild(link);
}

form.addEventListener('submit', onGenerateSubmit);