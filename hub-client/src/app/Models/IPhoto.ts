import { ICategory } from "./ICategory";
import { ILocation } from "./ILocation";

export interface IPhoto {
    src: string;
    caption: string;
    categories: ICategory[];
    location: ILocation;
    isFavorite: boolean;
    isPrivate: boolean;
}