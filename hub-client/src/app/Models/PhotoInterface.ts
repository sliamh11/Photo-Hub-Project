import { Category } from "./Category";

export interface PhotoInterface {
    src: string;
    caption: string;
    categories: Category[];
    location: any;
    isFavorite: boolean;
    isPrivate: boolean;
}