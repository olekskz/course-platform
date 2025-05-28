import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as streamifier from 'streamifier';
@Injectable()
export class CloudinaryService {
    constructor(private configService: ConfigService) {
        v2.config({
            cloud_name: this.configService.get<string>('CLOUDINARY_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_SECRET'),
        })
    }

    async uploadImage(fileBuffer: Buffer): Promise<{ url: string; public_id: string }> {
      return new Promise((resolve, reject) => {
        const uploadStream = v2.uploader.upload_stream(
          { folder: 'courses' },
          (error, result) => {
            if (error || !result) {
              return reject(error || new Error("No result returned from Cloudinary"));
            }
        
            resolve({
              url: result.secure_url,
              public_id: result.public_id
            });
          }
        );
    
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    }


    async deleteImage(publicId: string): Promise<void> {
      await v2.uploader.destroy(publicId);
}
}