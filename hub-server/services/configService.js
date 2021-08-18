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
            let views = [{ id: 0, name: "List" }, { id: 1, name: "Grid" }];
            let categories = [{ id: 0, name: "Fun" }, { id: 1, name: "Home" }, { id: 2, name: "Nature" }];

            let filesBase = [
                { path: this.VIEWS_PATH, title: "views", data: views },
                { path: this.CATEGORIES_PATH, title: "categories", data: categories }
            ];

            filesBase.forEach(async (fileInfo) => {
                if (!await this.isFileDataExists(fileInfo.path)) {
                    let jsonObj = JSON.parse(`{"${fileInfo.title}": ${JSON.stringify(fileInfo.data)}}`);
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
    setConfigFile = async (bodyData) => {
        try {
            await filesService.writeToJsonFileAsync(this.CONFIG_PATH, bodyData)
            console.log("Wrote to file successfully");
            return true;
        } catch (error) {
            throw error;
        }
    }

    getViewsListAsync = async () => {
        try {
            let result = await this.getDataFromFileAsync(this.VIEWS_PATH);
            return result.views;
        } catch (error) {
            throw error;
        }
    }

    isFileDataExists = async (filePath) => {
        try {
            if (await filesService.readFileAsync(filePath)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }

    getCategoriesAsync = async () => {
        try {
            let result = await this.getDataFromFileAsync(this.CATEGORIES_PATH);
            return result.categories;
        } catch (error) {
            throw error;
        }
    }

    // check if it works
    getDataFromFileAsync = async (filePath) => {
        try {
            // let result = await filesService.readFileAsync(filePath);
            // let parsedResult = JSON.parse(await filesService.readFileAsync(filePath));
            return JSON.parse(await filesService.readFileAsync(filePath));
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new ConfigService();