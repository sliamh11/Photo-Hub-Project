const filesService = require('../services/filesService');

class ConfigService {

    CONFIG_PATH = "assets/files/config.json";
    VIEWS_PATH = "assets/files/views.json";
    CATEGORIES_PATH = "assets/files/categories.json";

    // Init main system directories
    initSystemFiles = async () => {
        try {
            const dirsArray = ["assets", "assets/files", "assets/photos", "assets/photos/uploads", "assets/photos/files"];
            dirsArray.forEach(async (path) => {
                await filesService.createNewDirAsync(path);
            });
            await this.initConfigFiles();
        } catch (error) {
            throw error;
        }
    }

    // Initialize basic configuration files
    initConfigFiles = async () => {
        try {
            await this.createConfigFiles();
            await this.setBasicDataConfigFiles();
        } catch (error) {
            // 
            console.log(`In initConfigFiles ${error}`);
        }
    }

    // Create the configuration's basic files.
    createConfigFiles = async () => {
        try {
            await filesService.createNewFileAsync(this.CONFIG_PATH);
            await filesService.createNewFileAsync(this.VIEWS_PATH);
            await filesService.createNewFileAsync(this.CATEGORIES_PATH);
        } catch (error) {
            throw error;
        }
    }

    // Fill the configuration's basic files with base data.
    setBasicDataConfigFiles = async () => {
        try {
            // Basic Data
            const views = [{ id: 0, name: "List" }, { id: 1, name: "Grid" }];
            const categories = [{ id: 0, name: "Fun" }, { id: 1, name: "Home" }, { id: 2, name: "Nature" }];

            // Array of file path + data objects.
            const filesBase = [
                { path: this.VIEWS_PATH, data: views },
                { path: this.CATEGORIES_PATH, data: categories }
            ];

            // Create files
            filesBase.forEach(async (fileInfo) => {
                if (!await this.isFileDataExists(fileInfo.path)) {
                    const jsonObj = JSON.parse(`${JSON.stringify(fileInfo.data)}`);
                    await filesService.writeToJsonFileAsync(fileInfo.path, jsonObj);
                }
            });
        } catch (error) {
            throw error;
        }
    }

    // Check if config.json is already initialized.
    isConfigDataExists = async () => {
        try {
            return await this.isFileDataExists(this.CONFIG_PATH);
        }
        catch (error) {
            throw error;
        }
    }

    // Insert data into config.json.
    setConfigFileData = async (bodyData) => {
        try {
            return await filesService.writeToJsonFileAsync(this.CONFIG_PATH, bodyData)
        } catch (error) {
            throw error;
        }
    }

    getConfigFileData = async () => {
        try {
            if (await this.isConfigDataExists()) {
                return await this.getDataFromFile(this.CONFIG_PATH);
            }
            throw new Error("Configuration file's data doesn't exist.");
        } catch (error) {
            throw error;
        }
    }

    getViewsList = async () => {
        try {
            return await this.getDataFromFile(this.VIEWS_PATH);
        } catch (error) {
            throw error;
        }
    }

    isFileDataExists = async (filePath) => {
        try {
            return await filesService.readFileAsync(filePath) ? true : false;
        }
        catch (error) {
            throw error;
        }
    }

    getCategories = async () => {
        try {
            return await this.getDataFromFile(this.CATEGORIES_PATH);
        } catch (error) {
            throw error;
        }
    }

    postCategories = async (updatedCategories) => {
        try {
            // reset categories ID (in case the order changed).
            for (let index = 0; index < updatedCategories.length; index++) {
                const element = updatedCategories[index];
                element.id = index;
            }
            return await filesService.writeToJsonFileAsync(this.CATEGORIES_PATH, updatedCategories);
        } catch (error) {
            throw error;
        }
    }

    // Generic function for getting data from files.
    getDataFromFile = async (filePath) => {
        try {
            return JSON.parse(await filesService.readFileAsync(filePath));
        } catch (error) {
            throw error;
        }
    }

    isPrivateEnabled = async () => {
        try {
            const { allowPrivateMode } = await this.getConfigFileData();
            return allowPrivateMode;
        } catch (error) {
            throw error;
        }
    }

    checkPasswordsMatch = async (password) => {
        try {
            const { allowPrivateMode, privatePassword } = await this.getConfigFileData();
            if (allowPrivateMode) {
                return password === privatePassword;
            }
            throw new Error("Private Mode is not enabled.");
        } catch (error) {
            throw error;
        }
    }

    getSelectedView = async () => {
        try {
            const { selectedView } = await this.getConfigFileData();
            return selectedView;
        } catch (error) {
            throw error;
        }
    }

    isCameraAllowed = async () => {
        try {
            const { allowCamera } = await this.getConfigFileData();
            return allowCamera;
        } catch (error) {
            throw error;
        }
    }

    isLocationAllowed = async () => {
        try {
            const { allowLocation } = await this.getConfigFileData();
            return allowLocation;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ConfigService();