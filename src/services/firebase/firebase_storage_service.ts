import admin from 'firebase-admin';
import { Service } from 'typedi';
import { resizeImage } from '../../helpers/image_resize_helper';

/**
 * A service class for uploading files to Firebase Cloud Storage.
 */
@Service()
class FirebaseStorageService {
  /**
   * Uploads a file to Firebase Cloud Storage and returns the URL of the uploaded file.
   * @param file - The file to be uploaded.
   * @param uid - The unique identifier of the user who uploaded the file.
   * @param isImage - A boolean indicating whether the file is an image.
   * @param compressImage - A boolean indicating whether the image should be compressed before uploading.
   * @returns The URL of the uploaded file, or null if the upload failed.
   * @throws An error if the file is not an image and `isImage` is true.
   */
  public async uploadFile(
    file: Express.Multer.File,
    uid: string,
    isImage?: boolean,
    compressImage?: boolean,
  ): Promise<string | Error> {
    // Get a reference to the default Cloud Storage bucket
    const bucket = admin.storage().bucket();

    // Add current timestamp to the filename
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}${file.originalname}`;

    // Create a reference to the file
    const fileRef = bucket.file(`${uid}/${fileName}`);

    // If the file is an image and `compressImage` is true, resize the image before uploading.
    if (isImage) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        throw new Error('Only image files are allowed');
      }
      if (compressImage) {
        const resizedImage = await resizeImage(file.buffer);
        await fileRef.save(resizedImage);
      } else {
        await fileRef.save(file.buffer);
      }
    } else {
      // If the file is not an image, simply upload the file.
      await fileRef.save(file.buffer);
    }

    // TODO: remove fixed expiry date
    // Get the URL of the uploaded file
    const [url] = await fileRef.getSignedUrl({
      action: 'read',
      expires: '03-09-9999',
    });

    return url;
  }
}

export default FirebaseStorageService;
