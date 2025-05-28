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

     async uploadImage(fileBuffer: Buffer): Promise<any> {
        return new Promise((resolve, reject) => {
            const uploadStream = v2.uploader.upload_stream(
                { folder: 'courses' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            
            streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
    }
}