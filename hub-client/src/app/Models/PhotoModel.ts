import { Category } from "./Category";
import { PhotoInterface } from "./PhotoInterface";

export class PhotoModel implements PhotoInterface{
    src: string;
    caption: string;
    categories: Category[];
    location: any;
    isFavorite: boolean;
    isPrivate: boolean;

    constructor(){
        this.src = null;
        this.caption = "";
        this.categories = [];
        this.location = null;
        this.isPrivate = false;
        this.isFavorite = false;
    }
}