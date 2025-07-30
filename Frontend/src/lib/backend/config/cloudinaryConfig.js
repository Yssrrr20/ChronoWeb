// src/lib/backend/config/cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dkchjb0st', 
  api_key: process.env.CLOUDINARY_API_KEY || '375375945785333',           
  api_secret: process.env.CLOUDINARY_API_SECRET || 'd08kNujb1Utaa6eB5nB8M_jwMLY'   
});

export default cloudinary;