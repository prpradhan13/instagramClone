import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";

export const cld = new Cloudinary({
  cloud: {
    cloudName: 'gymaurcode'
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