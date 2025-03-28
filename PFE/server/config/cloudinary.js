import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
    cloud_name: 'dqhff3slu', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.SECRET_API 
});
export default cloudinary;