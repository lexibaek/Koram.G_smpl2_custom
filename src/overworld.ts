import { Actor, Engine, Scene, SceneActivationContext, vec } from "excalibur";
import * as ex from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";


export class Overworld extends Scene {

    onInitialize(engine: Engine<any>): void {
        Resources.LdtkResource.addToScene(this, {
            pos: vec(0, 0),
            levelFilter: ['Level_0', 'Level_1']
        });

        const solidLayers = Resources.LdtkResource.getIntGridLayers('Solids');
        for (const layer of solidLayers) {
            const tileSize = layer.ldtkLayer.__gridSize;
            const width = layer.ldtkLayer.__cWid;
            const height = layer.ldtkLayer.__cHei;
            const worldX = layer.worldPos.x;
            const worldY = layer.worldPos.y;
            const data = layer.ldtkLayer.intGridCsv;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = y * width + x;
                    if (data[index] === 1) {
                        const collider = new ex.Actor({
                            pos: ex.vec(worldX + x * tileSize + tileSize / 2, worldY + y * tileSize + tileSize / 2),
                            width: tileSize,
                            height: tileSize,
                            collisionType: ex.CollisionType.Fixed
                        });
                        this.add(collider);
                    }
                }
            }
        }

        if (this.world.entityManager.getByName('player').length === 0) {
            const playerStart = Resources.LdtkResource.getLdtkEntitiesByIdentifier('PlayerStart', ['Level_0', 'Level_1'])[0];
            if (playerStart) {
                const pos = ex.vec(playerStart.__worldX ?? playerStart.px[0], playerStart.__worldY ?? playerStart.px[1]);
                const player = new Player({
                    name: 'player',
                    pos,
                    width: playerStart.width,
                    height: playerStart.height,
                    anchor: ex.vec(playerStart.__pivot[0], playerStart.__pivot[1]),
                    z: 0
                });
                this.add(player);
            }
        }
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        const player = this.world.entityManager.getByName('player')[0];
        const engine = this.engine;
        const dz = ex.vec(engine.drawWidth * 0.25, engine.drawHeight * 0.25);
        if (player instanceof Player) {
            const deadZoneStrategy: ex.CameraStrategy<Actor> = {
                target: player as Actor,
                action: (target, cam) => {
                    const focus = cam.getFocus();
                    const diff = target.center.sub(focus);
                    let newX = focus.x;
                    let newY = focus.y;
                    if (Math.abs(diff.x) > dz.x) {
                        newX = target.center.x - Math.sign(diff.x) * dz.x;
                    }
                    if (Math.abs(diff.y) > dz.y) {
                        newY = target.center.y - Math.sign(diff.y) * dz.y;
                    }
                    return ex.vec(newX, newY);
                }
            };
            this.camera.addStrategy(deadZoneStrategy);
        }
        const bounds = Resources.LdtkResource.getLevelBounds(['Level_0', 'Level_1']);
        this.camera.strategy.limitCameraBounds(bounds);
    }
}