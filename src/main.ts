import * as ex from "excalibur";
import { Player } from './player';
import { Resources, loader } from "./resources";
import { Overworld } from "./overworld";

const game = new ex.Engine({
    resolution: {
        width: 256,
        height: 256,
    },
    suppressPlayButton: true,
    displayMode: ex.DisplayMode.FitScreenAndFill,
    pixelArt: true,
    // Force pixel ratio to 1 in development to avoid HiDPI warnings
    pixelRatio: 1,
    physics: { gravity: ex.vec(0, 1200) },
    scenes: {
        overworld: {
            scene: Overworld,
            transitions: {
                out: new ex.FadeInOut({direction: 'out', duration: 1000, color: ex.Color.Black}),
                in: new ex.FadeInOut({direction: 'in', duration: 1000, color: ex.Color.Black})
            }
        }
    }
});

Resources.LdtkResource.registerEntityIdentifierFactory('PlayerStart', (props) => {
    const player = new Player({
        name: 'player',
        anchor: ex.vec(props.entity.__pivot[0],props.entity.__pivot[1]),
        width: props.entity.width,
        height: props.entity.height,
        pos: props.worldPos,
        z: props.layer.order
    });
    return player;
});

game.start('overworld', {
    loader
});
