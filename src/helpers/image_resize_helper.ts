import sharp from 'sharp';

/**
 * Resizes an image to a maximum file size of 1 MB and returns the resized image as a Buffer.
 * @param inputImage - The image to be resized as a Buffer.
 * @returns A Buffer containing the resized image.
 */
export async function resizeImage(inputImage: Buffer): Promise<Buffer> {
  // Create a Sharp instance for the input image
  const image = sharp(inputImage);

  // Get the metadata of the input image (e.g. width, height, size)
  const imageMetadata = await image.metadata();

  // Set the maximum file size for the resized image to 1 MB
  const maxSize = 1000000; // 1 MB in bytes

  // Calculate the width and height of the resized image based on the maximum file size
  let width = imageMetadata.width!;
  let height = imageMetadata.height!;
  let factor = 1;

  if (imageMetadata.size! > maxSize) {
    factor = Math.sqrt(maxSize / imageMetadata.size!);
    width = Math.round(width * factor);
    height = Math.round(height * factor);
  }

  // Resize the input image to the calculated width and height
  const resizedImage = image.resize(width, height).toBuffer();

  // Return the resized image as a Buffer
  return resizedImage;
}
