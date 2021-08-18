const fs = require('fs');
const path = require('path');

class FilesService {

    createNewDirAsync = (dirPath) => {
        try {
            return new Promise(async (res, rej) => {
                if (!await this.isFileExistAsync(dirPath)) {
                    fs.mkdir(path.join(dirPath), (err) => {
                        return res(err ? false : true);
                    });
                }
                res(true);
            });
        } catch (error) {
            throw error;
        }
    }

    createNewFileAsync = (filePath) => {
        try {
            return new Promise(async (res, rej) => {
                if (!await this.isFileExistAsync(filePath)) {
                    fs.open(path.join(filePath), "w", async (err) => {
                        return res(err ? false : true);
                    });
                }
                res(true);
            });
        } catch (error) {
            throw error;
        }
    }

    isFileExistAsync = (filePath) => {
        try {
            return new Promise((res, rej) => {
                fs.access(path.join(filePath), (err) => {
                    return res(err ? false : true);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    readFileAsync = (filePath) => {
        try {
            return new Promise(async (res, rej) => {
                if (await this.isFileExistAsync(filePath)) {
                    fs.readFile(filePath, {encoding: "utf8"}, (err, data) => {
                        if (err) {
                            return rej(err);
                        } else {
                            return res(data);
                        }
                    });
                }
                else {
                    rej(`File ${filePath} doesn't exist.`);
                }
            });
        } catch (error) {
            throw error;
        }
    }

    readImageAsync = (imagePath) => {
        try {
            return new Promise(async (res, rej) => {
                if (await this.isFileExistAsync(imagePath)) {
                    fs.readFile(imagePath, (err, data) => {
                        if (err) {
                            return rej(err);
                        } else {
                            return res(data);
                        }
                    });
                }
                else {
                    rej(`File ${imagePath} doesn't exist.`);
                }
            });
        } catch (error) {
            throw error;
        }
    }

    writeBufferToImageAsync = (filePath, data) => {
        try {
            return new Promise(async (res, rej) => {
                if (await this.isFileExistAsync(filePath)) {
                    return res(false);
                }
                fs.writeFile(filePath, data, (err) => {
                    if (err) {
                        return rej(err)
                    }
                    res(true);
                })
            });
        } catch (error) {
            throw error;
        }
    }

    writeToJsonFileAsync = (filePath, data) => {
        try {
            return new Promise((res, rej) => {
                // Convert data to JSON.
                let jsonContent = JSON.stringify(data);
                fs.writeFile(filePath, jsonContent, (err) => {
                    if (err) {
                        return rej(err)
                    }
                    res(true);
                })
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new FilesService();