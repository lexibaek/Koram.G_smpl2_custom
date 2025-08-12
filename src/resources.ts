import { ImageFiltering, ImageSource, Loader } from "excalibur";
import { LdtkResource } from '@excaliburjs/plugin-ldtk';
import heroImgPath from '../res/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Sprites/Hero 01.png';
import tilesetPath from '../res/Solaria Demo Pack Update 03/Solaria Demo Pack Update 03/16x16/Tilesets/Solaria Demo Update 01.png';
import ldtkLevel0 from '../res/top-down/Level_0.ldtkl?url';
import ldtkLevel1 from '../res/top-down/Level_1.ldtkl?url';
import ldtkHouse from '../res/top-down/House.ldtkl?url';

export const Resources = {
    HeroSpriteSheetPng: new ImageSource(heroImgPath),
    LdtkResource: new LdtkResource('/res/top-down/top-down.ldtk', {
        useTilemapCameraStrategy: true,
        useMapBackgroundColor: true,
        // Path map intercepts and redirects to work around parcel's static bundling
        pathMap: {
            'Hero 01.png': heroImgPath,
            'Level_0.ldtkl': ldtkLevel0,
            'Level_1.ldtkl': ldtkLevel1,
            'House.ldtkl': ldtkHouse,
            'Solaria Demo Update 01.png': tilesetPath,
        } as any
    })
} as const;

// Temporary debug load event
(Resources.LdtkResource as any).on('load', () => {
    console.log('ldtkLevel1:', ldtkLevel1);
    console.log('tilesetPath:', tilesetPath);
});

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}
