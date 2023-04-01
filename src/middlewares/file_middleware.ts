import multer from 'multer';

const fileFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 40 * 1024 * 1024 },
  fileFilter: fileFilter,
});

// export const uploadPostImage = upload.array("images", 10);
// export const uploadProfileImage = upload.fields([
//   {
//     name: "profilePic",
//     maxCount: 1,
//   },
//   {
//     name: "avatarPic",
//     maxCount: 1,
//   },
//   {
//     name: "bannerPic",
//     maxCount: 1,
//   },
// ]);
