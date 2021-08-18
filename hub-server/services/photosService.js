const filesService = require('../services/filesService');
const path = require('path');

class PhotosService {

    PHOTOS_PATH = "assets/photos/files/photos.json";
    UPLOADS_PATH = "assets/photos/uploads";

    isPhotosFileExist = async () => {
        try {
            return await filesService.isFileExistAsync(this.PHOTOS_PATH);
        } catch (error) {
            throw error;
        }
    }

    // Create the photos.json file
    initPhotosFile = async () => {
        try {
            if (!await this.isPhotosFileExist()) {
                await filesService.createNewFileAsync(this.PHOTOS_PATH);
                await filesService.writeToJsonFileAsync(this.PHOTOS_PATH, JSON.parse(`{"photos": []}`));
            }
        } catch (error) {
            throw error;
        }
    }

    addPhotoToUploads = async (photoData) => {
        try {
            const data = photoData.src.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(data, "base64");
            const imagePath = path.join(this.UPLOADS_PATH, `${photoData.caption}.png`);
            const result = await filesService.writeBufferToImageAsync(`${imagePath}`, buffer);
            if (result) {
                photoData.src = imagePath;
                return photoData;
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }

    addPhotoToJson = async (updatedPhotoData) => {
        try {
            let fileData = JSON.parse(await filesService.readFileAsync(this.PHOTOS_PATH));
            fileData.photos.push(updatedPhotoData);
            return await filesService.writeToJsonFileAsync(this.PHOTOS_PATH, fileData);
        } catch (error) {
            throw error;
        }
    }

    addNewPhoto = async (photoData) => {
        try {
            let newPhotoData = await this.addPhotoToUploads(photoData);
            if (newPhotoData) {
                if (await this.addPhotoToJson(newPhotoData)) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    getAllPhotos = async () => {
        let fileData = undefined;
        try {
            fileData = JSON.parse(await filesService.readFileAsync(this.PHOTOS_PATH));
            fileData.photos = await this.convertPathToBase64(fileData.photos);
            return fileData.photos;
        } catch (error) {
            // Will be undefined if the file is empty, with no basic JSON template.
            if (fileData === undefined) {
                await filesService.writeToJsonFileAsync(this.PHOTOS_PATH, JSON.parse(`{"photos": []}`));
            }
            throw error;
        }
    }

    convertPathToBase64 = async (jsonFileData) => {
        try {
            const promises = jsonFileData.map(async photo => {
                let bufResult = await filesService.readImageAsync(photo.src);
                let result = bufResult.toString("base64");
                photo.src = "data:image/png;base64," + result;
                return photo;
            });
            return await Promise.all(promises);
        } catch (error) {
            throw error;
        }
    }

    updatePhotos = async () => {
        // When a photo was changed.
        // Basically, read the Json file and override it's settings
        // If an image's caption was changed, override the photo too.  
    }

}

module.exports = new PhotosService();