///<reference path='Unit.ts'/>
class Spikes extends Unit implements IActivatable
{

    constructor(type: string, index: number, view: createjs.DisplayObject, tile:Tile)
    {
        super(index, type, view, tile);
        tile.isWall = true;
    }

    public init(): void
    {
        //empty
    }

    public activate(): void
    {
        this.state = Unit.ON;
        this.bitmap.image = ImagesRes.getImage(ImagesRes.SPIKES + 1);
        this.tile.isWall = false;
    }

}