// src/pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import cloudinary from '@/utils/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();

  form.uploadDir = path.join(process.cwd(), 'public', 'uploads');
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the files' });
    }

    if (!files.photos || !Array.isArray(files.photos)) {
      return res.status(400).json({ error: 'No photos provided' });
    }

    try {
      const uploadPromises = files.photos.map((file: formidable.File) =>
        cloudinary.uploader.upload(file.path, {
          folder: '3d-models', // Specify the folder in Cloudinary
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, // Use the upload preset
        })
      );

      const uploadResults = await Promise.all(uploadPromises);

      const modelGenerationUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`;

      const response = await fetch(modelGenerationUrl, {
        method: 'POST',
        body: JSON.stringify({
          file: uploadResults.map(result => result.secure_url),
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, // Adjust according to your Cloudinary settings
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const modelResult = await response.json();

      if (response.ok) {
        return res.status(200).json({ message: '3D model generated successfully', modelUrl: modelResult.secure_url });
      } else {
        return res.status(500).json({ error: 'Failed to generate 3D model', details: modelResult });
      }

    } catch (error) {
      return res.status(500).json({ error: 'An error occurred during upload', details: error });
    }
  });
}
