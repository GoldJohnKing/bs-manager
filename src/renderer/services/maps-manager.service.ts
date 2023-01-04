import { LinkMapsModal } from "renderer/components/modal/modal-types/link-maps-modal.component";
import { UnlinkMapsModal } from "renderer/components/modal/modal-types/unlink-maps-modal.component";
import { Subject, Observable } from "rxjs";
import { BSVersion } from "shared/bs-version.interface";
import { BsmLocalMap } from "shared/models/maps/bsm-local-map.interface";
import { BeatSaverService } from "./thrird-partys/beat-saver.service";
import { IpcService } from "./ipc.service";
import { ModalExitCode, ModalService } from "./modale.service";
import { DeleteMapsModal } from "renderer/components/modal/modal-types/delete-maps-modal.component";
import { ProgressBarService } from "./progress-bar.service";
import { OpenSaveDialogOption } from "shared/models/ipc";
import { NotificationService } from "./notification.service";
import { ConfigurationService } from "./configuration.service";

export class MapsManagerService {

    private static instance: MapsManagerService;

    public static getInstance(): MapsManagerService{
        if(!MapsManagerService.instance){ MapsManagerService.instance = new MapsManagerService() }
        return MapsManagerService.instance;
    }

    public static readonly REMEMBER_CHOICE_DELETE_MAP_KEY = "not-confirm-delete-map"

    private readonly ipcService: IpcService;
    private readonly bsaver: BeatSaverService;
    private readonly modal: ModalService;
    private readonly progressBar: ProgressBarService;
    private readonly notifications: NotificationService;
    private readonly config: ConfigurationService;

    private readonly lastLinkedVersion$: Subject<BSVersion> = new Subject();
    private readonly lastUnlinkedVersion$: Subject<BSVersion> = new Subject();

    private constructor(){
        this.ipcService = IpcService.getInstance();
        this.bsaver = BeatSaverService.getInstance();
        this.modal = ModalService.getInsance();
        this.progressBar = ProgressBarService.getInstance();
        this.notifications = NotificationService.getInstance();
        this.config = ConfigurationService.getInstance();
    }

    public getMaps(version?: BSVersion, withDetails = true): Observable<BsmLocalMap[]>{
        return new Observable(obs => {
            this.ipcService.send<BsmLocalMap[], BSVersion>("get-version-maps", {args: version}).then(res => {
                if(!res.success){ return obs.complete();}

                obs.next(res.data);

                if(!withDetails){ return obs.complete(); }

                this.bsaver.getMapDetailsFromHashs(res.data.map(localMap => localMap.hash)).then(mapsDetails => {
                    mapsDetails.forEach(details => {
                        const corespondingMap = res.data.find(localMap => localMap.hash === details.versions.find(details => details?.hash === localMap.hash)?.hash);
                        if(!corespondingMap){ return; }
                        res.data.find(localMap => localMap.hash === details.versions.find(details => details?.hash === localMap.hash)?.hash).bsaverInfo = details
                    });
                    obs.next(res.data);
                })
            });
        });
    }

    public versionHaveMapsLinked(version: BSVersion): Promise<boolean>{
        return this.ipcService.send<boolean, BSVersion>("verion-have-maps-linked", {args: version}).then(res => {
            if(!res.success){ throw "error"; }
            return res.data;
        })
    }

    public async linkVersion(version: BSVersion): Promise<void>{

        const modalRes = await this.modal.openModal(LinkMapsModal);

        if(modalRes.exitCode !== ModalExitCode.COMPLETED){ return; }

        const showProgressBar = this.progressBar.require();

        if(showProgressBar){
            this.progressBar.showFake(.01);
        }

        const res = await this.ipcService.send<void, {version: BSVersion, keepMaps: boolean}>("link-version-maps", {args: {version, keepMaps: !!modalRes.data}});

        if(showProgressBar){
            this.progressBar.hide(true);
        }

        if(res.success){
            this.lastLinkedVersion$.next(version);
        }
    }

    public async unlinkVersion(version: BSVersion): Promise<void>{

        const modalRes = await this.modal.openModal(UnlinkMapsModal);

        if(modalRes.exitCode !== ModalExitCode.COMPLETED){ return; }

        const showProgressBar = this.progressBar.require();

        if(showProgressBar){
            this.progressBar.showFake(.01);
        }

        const res = await this.ipcService.send<void, {version: BSVersion, keepMaps: boolean}>("unlink-version-maps", {args: {version, keepMaps: !!modalRes.data}});

        if(showProgressBar){
            this.progressBar.hide(true);
        }

        if(res.success){
            this.lastUnlinkedVersion$.next(version);
        }
    }

    public async deleteMaps(maps: BsmLocalMap[], version?: BSVersion): Promise<boolean>{

        const versionLinked = await this.versionHaveMapsLinked(version);

        const askModal = maps.length > 1 || !this.config.get<boolean>(MapsManagerService.REMEMBER_CHOICE_DELETE_MAP_KEY);

        if(askModal){
            const modalRes = await this.modal.openModal(DeleteMapsModal, {linked: versionLinked, maps});
            if(modalRes.exitCode !== ModalExitCode.COMPLETED){ return false; }
        }

        const showProgressBar = this.progressBar.require(); 

        if(showProgressBar){
            this.progressBar.showFake(.008);
        }

        const res = await this.ipcService.send<void, {version: BSVersion, maps: BsmLocalMap[]}>("delete-maps", {args: {version, maps}});

        if(showProgressBar){
            this.progressBar.hide(true);
        }

        return res.success;
    }

    public async exportMaps(version: BSVersion, maps?: BsmLocalMap[]): Promise<void>{
        if(!this.progressBar.require()){ return; }

        const resFile = await this.ipcService.send<string, OpenSaveDialogOption>("save-file", {args: {
            filename: version ? `${version.BSVersion}Maps` : "Maps",
            filters: [{name: "zip", extensions: ["zip"]}]
        }});

        if(!resFile.success){ return; }

        this.progressBar.showFake(.008);
        
        const resExport = await this.ipcService.send<string, {version: BSVersion, maps: BsmLocalMap[], outPath: string}>("export-maps", {args: {version, maps, outPath: resFile.data}});
        if(!resExport.success && resExport.error.title){
            const {title, msg} = resExport.error;
            this.notifications.notifyError({title, desc: msg});
        } 
        else {
            this.notifications.notifySuccess({title: "Export terminé 🎉", duration: 3000});
        }
        this.progressBar.complete();
        this.progressBar.hide(true);
    }

    public isDeepLinksEnabled(): Promise<boolean>{

        return this.ipcService.send<boolean>("is-map-deep-links-enabled").then(res => (
            res.success ? res.data : false
        ));

    }

    public async toogleDeepLinks(): Promise<boolean>{

        const isEnabled = await this.isDeepLinksEnabled();
        
        const channel = isEnabled ? "unregister-maps-deep-link" : "register-maps-deep-link";

        const res = await this.ipcService.send<boolean>(channel);

        return res.success ? res.data : false;

    }

    public get versionLinked$(): Observable<BSVersion>{
        return this.lastLinkedVersion$.asObservable();
    }

    public get versionUnlinked$(): Observable<BSVersion>{
        return this.lastUnlinkedVersion$.asObservable();
    }

}