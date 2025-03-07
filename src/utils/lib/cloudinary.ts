import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";

export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true
  }
});

const options = {
  upload_preset: 'instaClone_preset',
  unsigned: true,
}

export const uploadCloudinary = async (file: string) => {
  return new Promise((resolve, reject) => {
    upload(cld, {
      file,
      options: options,
      callback: (error: any, response: any) => {
        if (error) {
          alert("Error: " + error.message);
          reject(error);
        } else {
          resolve(response);
        }
      },
    });
  });
};

interface CloudinaryOptions {
  transformations?: string;
}

export const getCloudinaryUrl = (publicId: string, options: CloudinaryOptions = {}) => {
  const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const transformations = options?.transformations || "c_fill,w_200,h_200";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
};
