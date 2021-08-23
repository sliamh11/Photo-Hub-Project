import { IView } from "./IView";

export class ConfigModel {
    selectedView: IView;
    albumName: string;
    allowLocation: boolean;
    allowCamera: boolean;
    allowPrivateMode: boolean;
    privatePassword: string;

    constructor(view:IView, albumName:string, allowPrivateMode: boolean, allowLocation: boolean, allowCamera:boolean, password: string = null) {
        this.selectedView = view;
        this.albumName = albumName;
        this.allowPrivateMode = allowPrivateMode;
        this.allowLocation = allowLocation;
        this.allowCamera = allowCamera;
        this.privatePassword = password;
    }
}