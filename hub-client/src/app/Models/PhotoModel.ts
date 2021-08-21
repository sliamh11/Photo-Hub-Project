import { ICategory } from "./ICategory";
import { IPhoto } from "./IPhoto";
import { ILocation } from "./ILocation";

export class PhotoModel implements IPhoto {
    src: string;
    caption: string;
    categories: ICategory[];
    location: ILocation;
    isFavorite: boolean;
    isPrivate: boolean;

    constructor() {
        this.src = null;
        this.caption = "";
        this.categories = [];
        this.location = null;
        this.isPrivate = false;
        this.isFavorite = false;
    }
}