const fs = require('fs');
const path = require('path');

class FilesService {

    createNewDirAsync = (dirPath) => {
        try {
            return new Promise(async (res) => {
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
            return new Promise(async (res) => {
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
            return new Promise((res) => {
                fs.access(path.join(filePath), (err) => {
                    return res(err ? false : true);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    // Read file (string encoding)
    readFileAsync = (filePath) => {
        try {
            return new Promise(async (res, rej) => {
                if (await this.isFileExistAsync(filePath)) {
                    fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
                        return res(err ? false : data);
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

    // Read image file (binary encoding)
    readImageAsync = (imagePath) => {
        try {
            return new Promise(async (res, rej) => {
                if (await this.isFileExistAsync(imagePath)) {
                    fs.readFile(imagePath, (err, data) => {
                        return err ? rej(err) : res(data);
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

    readDirectoryAsync = (dirPath) => {
        try {
            return new Promise(async (res, rej) => {
                if (await this.isFileExistAsync(dirPath)) {
                    fs.readdir(dirPath, (err, files) => {
                        return err ? rej(err) : res(files);
                    });
                } else {
                    rej(`Directory in path ${dirPath} doesn't exist.`);
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
                    return err ? rej(err) : res(true);
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
                const jsonContent = JSON.stringify(data);
                fs.writeFile(filePath, jsonContent, (err) => {
                    return err ? rej(err) : res(true);
                })
            });
        } catch (error) {
            throw error;
        }
    }

    renameImageAsync = (oldPath, newPath) => {
        return new Promise((res, rej) => {
            fs.rename(oldPath, newPath, (err) => {
                return err ? rej(err) : res(true);;
            })
        });
    }
}

module.exports = new FilesService();