const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 800;

function resizeRoomImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Lütfen geçerli bir görsel dosyası seç."));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      reject(new Error("Görsel boyutu en fazla 10 MB olabilir."));
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const scale = Math.min(
        MAX_WIDTH / image.width,
        MAX_HEIGHT / image.height,
        1,
      );

      const width = Math.round(image.width * scale);
      const height = Math.round(image.height * scale);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      if (!context) {
        URL.revokeObjectURL(imageUrl);
        reject(new Error("Görsel işlenemedi. Lütfen başka bir görsel seç."));
        return;
      }

      context.drawImage(image, 0, 0, width, height);

      const resizedImage = canvas.toDataURL("image/webp", 0.8);
      const isLowResolution = image.width < 600 || image.height < 400;

      URL.revokeObjectURL(imageUrl);
      resolve({ resizedImage, isLowResolution });
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Görsel açılamadı. Lütfen başka bir görsel seç."));
    };

    image.src = imageUrl;
  });
}

export default resizeRoomImage;
