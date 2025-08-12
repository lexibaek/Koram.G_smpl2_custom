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
        const bounds = Resources.LdtkResource.getLevelBounds(['Level_0', 'Level_1']);
        (engine.currentScene.camera as any).worldBounds = bounds;
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
