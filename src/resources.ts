import { ImageFiltering, ImageSource, Loader } from "excalibur";
import { LdtkResource } from '@excaliburjs/plugin-ldtk';
import heroImgPath from '../res/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png';
import tilesetPath from '../res/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Tilesets/Solaria Demo Update 01.png';
import ldtkLevel0 from '../res/top-down/Level_0.ldtkl?url';
import ldtkLevel1 from '../res/top-down/Level_1.ldtkl?url';
import ldtkHouse from '../res/top-down/House.ldtkl?url';
import ldtkProject from '../res/top-down.ldtk?url';

export const Resources = {
    HeroSpriteSheetPng: new ImageSource(heroImgPath),
    LdtkResource: new LdtkResource(ldtkProject, {
        useTilemapCameraStrategy: true,
        useMapBackgroundColor: true,
        // Path map intercepts and redirects to work around bundling
        pathMap: [
            { path: 'Hero 01.png', output: heroImgPath },
            { path: 'Level_0.ldtkl', output: ldtkLevel0 },
            { path: 'Level_1.ldtkl', output: ldtkLevel1 },
            { path: 'House.ldtkl', output: ldtkHouse },
            { path: 'Solaria Demo Update 01.png', output: tilesetPath }
        ]
    })
} as const;

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}

// Temporary debug log after resources load
loader.events.on('complete', () => {
    console.log('Debug Level_1 path:', ldtkLevel1);
    console.log('Debug tileset path:', tilesetPath);
});
