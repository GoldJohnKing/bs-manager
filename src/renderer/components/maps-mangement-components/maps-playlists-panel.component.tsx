import { useState } from "react"
import { BSVersion } from "shared/bs-version.interface"
import { TabNavBar } from "../shared/tab-nav-bar.component"
import { LocalMapsListPanel } from "./local-maps-list-panel.component"
import { BsmDropdownButton } from "../shared/bsm-dropdown-button.component"
import { FilterPanel } from "./filter-panel.component"
import { MapFilter, MapTag } from "shared/models/maps/beat-saver.model"

type Props = {
    oneBlock?: boolean,
    version?: BSVersion
}

export function MapsPlaylistsPanel({version, oneBlock = false}: Props) {
    
    const [tabIndex, setTabIndex] = useState(0);
    const [mapFilter, setMapFilter] = useState<MapFilter>({
        enabledTags: new Set<MapTag>(),
        excludedTags: new Set<MapTag>()
    });
    const [mapSearch, setMapSearch] = useState("");
    const [playlistSearch, setPlaylistSearch] = useState("");

    const handleSearch = (value: string) => {
        if(tabIndex === 0){
            return setMapSearch(() => value);
        }
        return setPlaylistSearch(() => value);
    }

    return (
        <>
        {!oneBlock && <TabNavBar className="mb-8 w-72" tabsText={["misc.maps", "Playlists"]} onTabChange={setTabIndex}/>}
        <div className="w-full h-full flex flex-col items-center justify-center">
            <nav className="w-full shrink-0 flex h-[35px] justify-center px-40 gap-2 mb-3">
                <div className="h-full rounded-full bg-main-color-2 grow p-[6px]">
                    <input type="text" className="h-full w-full bg-main-color-1 rounded-full px-2" placeholder="Rechercher" value={tabIndex === 0 ? mapSearch : playlistSearch} onChange={e => handleSearch(e.target.value)}/>
                </div>
                <BsmDropdownButton className="h-full relative z-[1] flex justify-center" buttonClassName="flex items-center justify-center h-full rounded-full px-2 py-1" icon="search" text="Filtres" withBar={false}>
                    <FilterPanel className="absolute top-[calc(100%+3px)] bg-main-color-3 origin-top w-[500px] h-fit p-2 rounded-md shadow-md shadow-black" filter={mapFilter} onChange={setMapFilter}/>
                </BsmDropdownButton>
                <BsmDropdownButton className="h-full flex aspect-square relative rounded-full z-[1]" buttonClassName="rounded-full h-full w-full p-[6px]" icon="three-dots" withBar={false}>
                    <></>
                </BsmDropdownButton>
            </nav>
            <div className="w-full h-full flex flex-col bg-main-color-2 rounded-md shadow-black shadow-md overflow-hidden">
                {oneBlock && <TabNavBar className="!rounded-none shadow-sm" tabsText={["misc.maps", "Playlists"]} onTabChange={setTabIndex}/>}
                <div className="w-full grow min-h-0 flex flex-row items-center transition-transform duration-300" style={{transform: `translate(${-(tabIndex * 100)}%, 0)`}}>
                    <LocalMapsListPanel className="w-full h-full shrink-0 flex flex-col" version={version} filter={mapFilter} search={mapSearch}/>
                <div className="w-full h-full grow shrink-0">b</div>
            </div>
        </div> 

        </div>
        
        </>
    )
}
