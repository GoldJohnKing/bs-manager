import { BSVersion } from "shared/bs-version.interface";
import { useRef, useState, MutableRefObject } from "react";
import { ModelsTabsNavbar } from "./models-tabs-navbar.component";
import { ModelsGrid } from "./models-grid.component";
import { MSModelType } from "shared/models/models/model-saber.model";
import { BsmDropdownButton, DropDownItem } from "../shared/bsm-dropdown-button.component";
import { useConstant } from "renderer/hooks/use-constant.hook";
import { ModelsManagerService } from "renderer/services/models-management/models-manager.service";
import { BsmLocalModel } from "shared/models/models/bsm-local-model.interface";
import { BsmButton } from "../shared/bsm-button.component";

export function ModelsPanel({version}: {version?: BSVersion}) {
    const modelsManager = useConstant(() => ModelsManagerService.getInstance());
    const [avatarsRef, sabersRef, platformsRef, bloqsRef] = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [modelTypeTab, setModelTypeTab] = useState<ModelTabType>(ModelTabType.Avatars);
    const [search, setSearch] = useState<string>("");
    
    const getActiveTabRef = () => [avatarsRef, sabersRef, platformsRef, bloqsRef][modelTypeTab];

    const exportModels = () => {
        const selectedModels = [avatarsRef, sabersRef, platformsRef, bloqsRef].map(ref =>(ref.current?.getSelectedModels() as BsmLocalModel[])).flat()
        modelsManager.exportModels(selectedModels, version);
    }

    const deleteModels = () => {
        const activeTab = getActiveTabRef();
        activeTab.current?.deleteSelectedModels();
    }

    const threeDotsItems: DropDownItem[] = [
        {text: "TODO TRANSLATE EXPORT", onClick: exportModels, icon: "export"},
        {text: "TODO TRANSLATE DELETE", onClick: deleteModels, icon: "trash"},
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full shrink-0 flex h-9 justify-center px-40 gap-2 mb-3 text-main-color-1 dark:text-white">
                <BsmButton className="flex items-center justify-center w-fit rounded-full px-2 py-1 font-bold" icon="add" text="misc.add" typeColor="primary" withBar={false}/>
                <div className="h-full rounded-full bg-light-main-color-2 dark:bg-main-color-2 grow p-[6px]">
                    <input type="text" className="h-full w-full bg-light-main-color-1 dark:bg-main-color-1 rounded-full px-2" placeholder={"TODO TRANSLATE"} onChange={e => setSearch(e.target.value)}  tabIndex={-1}/>
                </div>
                <BsmDropdownButton items={threeDotsItems} className="h-full flex aspect-square relative rounded-full z-[1] bg-light-main-color-1 dark:bg-main-color-3" buttonClassName="rounded-full h-full w-full p-[6px]" icon="three-dots" withBar={false} menuTranslationY="6px" align="center"/>
            </div>
            <div className="w-full h-full flex flex-row bg-light-main-color-3 dark:bg-main-color-2 rounded-md shadow-black shadow-md overflow-hidden">
                <ModelsTabsNavbar className="flex-shrink-0" version={version} tabIndex={modelTypeTab} onTabChange={setModelTypeTab}/>
                
                <div className="flex-grow h-full flex flex-col transition-all duration-300" style={{translate: `0 ${0 - modelTypeTab * 100}%`}}>
                    <ModelsGrid ref={avatarsRef} version={version} type={MSModelType.Avatar} active={modelTypeTab === ModelTabType.Avatars} search={search}/>
                    <ModelsGrid ref={sabersRef} version={version} type={MSModelType.Saber} active={modelTypeTab === ModelTabType.Sabers} search={search}/>
                    <ModelsGrid ref={platformsRef} version={version} type={MSModelType.Platfrom} active={modelTypeTab === ModelTabType.Platforms} search={search}/>
                    <ModelsGrid ref={bloqsRef} version={version} type={MSModelType.Bloq} active={modelTypeTab === ModelTabType.Bloqs} search={search}/>
                </div>
            </div>
        </div>
    )
}

enum ModelTabType {
    Avatars = 0,
    Sabers = 1,
    Platforms = 2,
    Bloqs = 3,
}
