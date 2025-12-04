import QRCode from 'qrcode';

const generateQRCode = (canvasId: string, url: string): void => {
      QRCode.toCanvas(document.getElementById(canvasId), url, {
          margin: 2,
          width: 150,
          color: {
              dark: '#1e3a8a',
              light: '#ffffff'
              }
      }, function (error) {
        if (error) {
        console.error('QR Code generation failed for ' + url, error);
        }
      });
};
export default generateQRCode;