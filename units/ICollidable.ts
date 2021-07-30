interface ICollidable
{
    view: createjs.DisplayObject;
    index: number;
    type: string;
    state: string;

    stop(): void;
    destroy(): void;
} 