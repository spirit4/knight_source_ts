///<reference path='Unit.ts'/>
class Trap extends Unit
{
    constructor(view: createjs.DisplayObject, index: number, type: string)
    {
        super(index, type, view);
        this.mc.stop();
        this.mc.alpha = 0.4;
    }

} 