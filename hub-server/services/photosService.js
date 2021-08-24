const filesService = require('../services/filesService');
const path = require('path');

class PhotosService {

    PHOTOS_PATH = "assets/photos/files/photos.json";
    UPLOADS_PATH = "assets/photos/uploads";

    // Check if photos.json exist.
    isPhotosJsonExist = async () => {
        try {
            return await filesService.isFileExistAsync(this.PHOTOS_PATH);
        } catch (error) {
            throw error;
        }
    }

    // Create the photos.json file (if doesn't exis).
    initPhotosFile = async () => {
        try {
            if (!await this.isPhotosJsonExist()) {
                await filesService.createNewFileAsync(this.PHOTOS_PATH);
                await filesService.writeToJsonFileAsync(this.PHOTOS_PATH, JSON.parse("[]"));
            }
        } catch (error) {
            throw error;
        }
    }

    // Creates a buffer from base64 and adds a new image file to Uploads directory. 
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

    // Adds the photo data to the json file
    addPhotoToJson = async (updatedPhotoData) => {
        try {
            const photosJson = await this.readPhotosJson();
            photosJson.push(updatedPhotoData);
            return await filesService.writeToJsonFileAsync(this.PHOTOS_PATH, photosJson);
        } catch (error) {
            throw error;
        }
    }

    // Manages the whole 'new photo' procedure 
    addNewPhoto = async (photoData) => {
        try {
            const newPhotoData = await this.addPhotoToUploads(photoData);
            if (newPhotoData) {
                if (await this.addPhotoToJson(newPhotoData)) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

    getAllPhotos = async () => {
        let photosJson = undefined;
        try {
            photosJson = await this.readPhotosJson();
            // Convert photo.src (currently holds the image's path) to base64.
            return await this.convertPathToBase64(photosJson);
        } catch (error) {
            // Will be undefined if the file is empty, with no basic JSON template.
            if (!photosJson) {
                await filesService.writeToJsonFileAsync(this.PHOTOS_PATH, JSON.parse("[]"));
            }
            throw error;
        }
    }

    convertPathToBase64 = async (jsonFileData) => {
        // Convert photo.src (currently path to image) to base64. 
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

    updatePhoto = async (updatedPhoto, fileName) => {
        try {
            // Check if file exists and and get it.
            const photosJson = await this.readPhotosJson();
            const existingPath = path.join(this.UPLOADS_PATH, `${fileName}.png`);
            const existingPhoto = photosJson.find(photo => photo.src === existingPath)

            // If photo not found.
            if (!existingPhoto) {
                throw new Error(`Image ${existingPath} not found.`);
            }

            updatedPhoto.src = existingPath;

            // If existing photo's caption !== updated photo's caption - update image's name.
            if (existingPhoto.caption !== updatedPhoto.caption) {
                const newPath = path.join(this.UPLOADS_PATH, `${updatedPhoto.caption}.png`);
                await filesService.renameImageAsync(existingPath, newPath);
                updatedPhoto.src = newPath;
            }

            // Update the photos json array and re-write it.
            const photoIndex = photosJson.indexOf(existingPhoto);
            photosJson.splice(photoIndex, 1, updatedPhoto); // Replace the found object with the updatedPhoto.
            return await filesService.writeToJsonFileAsync(this.PHOTOS_PATH, photosJson);
        } catch (error) {
            throw error;
        }
    }

    readPhotosJson = async () => {
        return JSON.parse(await filesService.readFileAsync(this.PHOTOS_PATH));
    }
}

module.exports = new PhotosService();