import * as ex from 'excalibur';

export class Player extends ex.Actor {
    private moveSpeed = 200;
    private jumpSpeed = 400;

    constructor(args: ex.ActorArgs) {
        super({
            ...args,
            anchor: ex.vec(0.5, 1),
            collisionType: ex.CollisionType.Active
        });

        this.graphics.use(new ex.Rectangle({ width: 20, height: 32, color: ex.Color.Red }));
        (this.body as any).useBoxCollider(20, 32);
    }

    onPreUpdate(engine: ex.Engine): void {
        this.vel.x = 0;

        if (engine.input.keyboard.isHeld(ex.Keys.ArrowLeft) || engine.input.keyboard.isHeld(ex.Keys.A)) {
            this.vel.x = -this.moveSpeed;
        }

        if (engine.input.keyboard.isHeld(ex.Keys.ArrowRight) || engine.input.keyboard.isHeld(ex.Keys.D)) {
            this.vel.x = this.moveSpeed;
        }

        if ((engine.input.keyboard.wasPressed(ex.Keys.Space) || engine.input.keyboard.wasPressed(ex.Keys.Z)) && (this.body as any).contact?.solids.bottom) {
            this.vel.y = -this.jumpSpeed;
        }
    }
}
