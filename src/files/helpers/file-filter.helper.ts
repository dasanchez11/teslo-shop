import { Request } from 'express';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) {
    callback(new Error('File is empty'), false);
  }

  const fileExtension = file.mimetype.split('/')[1];

  const validExtensions = ['jpg', 'png', 'git', 'jpeg'];

  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  }

  callback(null, false);
};
