// src/lib/utils/cropImage.js

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); 
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Memotong gambar di sisi klien (browser) menggunakan Canvas API.
 * @param {string} imageSrc - Data URI dari gambar
 * @param {Object} pixelCrop - Objek {x, y, width, height} dari area crop dalam piksel
 * @param {number} rotation - Rotasi gambar dalam derajat
 * @returns {Promise<Blob>} - Promise yang me-resolve ke Blob gambar yang sudah di-crop
 */

export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const rotRad = getRadianAngle(rotation);

  // set canvas size to match the bounding box of the rotated image
  const { width: imageWidth, height: imageHeight } = image;
  const sWidth = imageWidth * Math.abs(Math.cos(rotRad)) + imageHeight * Math.abs(Math.sin(rotRad));
  const sHeight = imageWidth * Math.abs(Math.sin(rotRad)) + imageHeight * Math.abs(Math.cos(rotRad));

  canvas.width = sWidth;
  canvas.height = sHeight;

  // translate canvas context to a central point to allow rotation
  ctx.translate(sWidth / 2, sHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(1, 1); // Normal scale
  ctx.translate(-imageWidth / 2, -imageHeight / 2);

  // draw the image on canvas
  ctx.drawImage(image, 0, 0);

  // get cropped image data
  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  // set canvas to the cropped image size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // put the cropped data onto the new canvas
  ctx.putImageData(data, 0, 0);

  // Return a Promise that resolves with a Blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg'); 
  });
}