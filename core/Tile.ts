﻿class Tile
{
    public x: number;
    public y: number;
    public index: number;

    public objects: createjs.DisplayObject[];
    public types: string[];

    public isWall: boolean = true;//for pathfinder
    public isDear: boolean = false;//for pathfinder  for mill

    constructor(x: number, y: number, index: number)
    {
        this.x = x;
        this.y = y;
        this.index = index;
        this.objects = [];
        this.types = [];
    }

    public add(type: string, container: createjs.Container, grid: Tile[] = null, isEditor: boolean = false): createjs.DisplayObject
    {
        this.types.push(type);
        var dObject: createjs.DisplayObject = this.getAlignedDO(type);
        this.objects.push(dObject);

       // console.log("+++add", type, type.indexOf(ImagesRes.DECOR))
        if (type != ImagesRes.GRASS && type != ImagesRes.WATER && type.indexOf(ImagesRes.DECOR) == -1)
        {
            container.addChild(dObject);
        }

        if (isEditor)
        {
            this.setCorrectIndex(dObject, container, grid);    //only EDITOR!
        }

        return dObject;
    }

    private getAlignedDO(type: string): createjs.DisplayObject
    {
        var bd: HTMLImageElement = ImagesRes.getImage(type);
        var dObject: createjs.DisplayObject;
        var sprite: createjs.Sprite;

        switch (type)
        {
            case ImagesRes.HERO:  //editor
            case ImagesRes.MONSTER:  //editor
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x;
                dObject.y = this.y + Config.SIZE_H - bd.height - 10;
                break;

            case ImagesRes.GRASS:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x;// + (Config.SIZE_W - bd.width >> 1);
                dObject.y = this.y;// + (Config.SIZE_H - bd.height >> 1);
                this.isWall = false;
                break;

            case ImagesRes.WATER:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x;// + (Config.SIZE_W - bd.width >> 1);
                dObject.y = this.y;// + (Config.SIZE_H - bd.height >> 1);
                dObject.name = ImagesRes.WATER;
                break;

            case ImagesRes.STAR + 0:
                sprite = new createjs.Sprite(JSONRes.atlas1, ImagesRes.A_ITEMs[type]);
                sprite.framerate = 30;
                sprite.x = this.x - 10;
                sprite.y = this.y + Config.SIZE_H - sprite.getBounds().height - 35;
                dObject = sprite;
                break;
            case ImagesRes.STAR + 1:
                sprite = new createjs.Sprite(JSONRes.atlas1, ImagesRes.A_ITEMs[type]);
                sprite.framerate = 20;
                sprite.x = this.x + 0;
                sprite.y = this.y + Config.SIZE_H - sprite.getBounds().height - 15;
                dObject = sprite;
                break;
            case ImagesRes.STAR + 2:
                sprite = new createjs.Sprite(JSONRes.atlas1, ImagesRes.A_ITEMs[type]);
                sprite.framerate = 15;
                sprite.x = this.x + 20;
                sprite.y = this.y + Config.SIZE_H - sprite.getBounds().height - 5;
                dObject = sprite;
                break;

            case ImagesRes.TRAP:
                sprite = new createjs.Sprite(JSONRes.atlas1, ImagesRes.A_TRAP);
                sprite.framerate = 30;
                sprite.x = this.x + 6;
                sprite.y = this.y + 9;
                dObject = sprite;
                break;

            case ImagesRes.PINE + 0:
            case ImagesRes.PINE + 1:
            case ImagesRes.PINE + 2:
            case ImagesRes.STONE + 0:
            case ImagesRes.STONE + 1:
            case ImagesRes.STUMP:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + (Config.SIZE_W - bd.width >> 1);
                dObject.y = this.y + (Config.SIZE_H - bd.height >> 1);
                this.isWall = true;
                break;

            case ImagesRes.BRIDGE + 0:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + (Config.SIZE_W - bd.width >> 1);
                dObject.y = this.y + (Config.SIZE_H - bd.height >> 1);
                this.isWall = false;
                break;
            case ImagesRes.BRIDGE + 1:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + (Config.SIZE_W - bd.width >> 1);
                dObject.y = this.y - 10;
                this.isWall = false;
                break;

            case ImagesRes.SPIKES + 0:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + 2;
                dObject.y = this.y + 2;
                break;

            case ImagesRes.BOULDER:
            case ImagesRes.TOWER:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x;
                dObject.y = this.y;
                break;

            case ImagesRes.EXIT:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + 3;
                dObject.y = this.y - 13;
                break;

            default:
                dObject = new createjs.Bitmap(bd);
                dObject.x = this.x + (Config.SIZE_W - bd.width >> 1);
                dObject.y = this.y + (Config.SIZE_H - bd.height >> 1);
        }

        dObject.snapToPixel = true;
        return dObject;
    }

    private setCorrectIndex(dObject: createjs.DisplayObject, container: createjs.Container, grid: Tile[]): void
    {
        var displayIndex: number = 0;
        var len: number = grid.length;
        for (var i: number = 0; i < len; i++)
        {
            displayIndex += grid[i].objects.length;
            if (i == this.index)
            {
                container.addChildAt(dObject, displayIndex);
                break;
            }
        }
    }

    public remove(type: string): void
    {
        var index: number = this.types.indexOf(type);
        //console.log("test111", type, index, this.objects[index]);
        if (index != -1)
        {
            var dObject: createjs.DisplayObject = this.objects[index];
            dObject.parent.removeChild(dObject);
            this.objects.splice(index, 1);
            this.types.splice(index, 1);
        }
    }

    public addType(type: string): void
    {
        var index: number = this.types.indexOf(type);

        if (index == -1)
        {
            this.types.push(type);
        }
    }

    public removeType(type: string): void
    {
        var index: number = this.types.indexOf(type);

        if (index != -1)
        {
            this.types.splice(index, 1);
        }
    }

    public removeObject(dObject: createjs.DisplayObject): void
    {
        var index: number = this.objects.indexOf(dObject);

        if (index != -1)
        {
            this.objects.splice(index, 1);
        }
    }

    public getObject(type: string): createjs.DisplayObject
    {
        var index: number = this.types.indexOf(type);

        if (index != -1)
        {
            return this.objects[index];
        }

        alert("UNKNOWN TYPE:" + type);
        return null;
    }

    public isContainType(type: string): boolean
    {
        var index: number = this.types.indexOf(type);
        if (index != -1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public isContainTypes(type: string): boolean
    {
        var index0: number = this.types.indexOf(type + 0);
        var index1: number = this.types.indexOf(type + 1);
        var index2: number = this.types.indexOf(type + 2);
        var index3: number = this.types.indexOf(type + 3);
        var index4: number = this.types.indexOf(type + 4);
        if (index0 != -1 || index1 != -1 || index2 != -1 || index3 != -1 || index4 != -1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public getConcreteType(type: string): string
    {
        var index0: number = this.types.indexOf(type + 0);
        var index1: number = this.types.indexOf(type + 1);
        var index2: number = this.types.indexOf(type + 2);
        var index3: number = this.types.indexOf(type + 3);
        if (index0 != -1)
        {
            return type + 0;
        }
        else if (index1 != -1)
        {
            return type + 1;
        }
        else if (index2 != -1)
        {
            return type + 2;
        }
        else if (index3 != -1)
        {
            return type + 3;
        }
        else
        {
         //console.log("[INCORRECT TYPE] getConcreteType", type);
        }
    }

    public clear(): void
    {
        for (var i: number = 0; i < this.objects.length; i++)
        {
            if (this.objects[i].parent)
            {
                this.objects[i].parent.removeChild(this.objects[i]);
            }
        }
        this.objects.length = 0;
        this.types.length = 0;
        this.isWall = true;
        this.isDear = false;
    }

    public getFirstIndex(): number
    {
        if (this.objects.length == 0)
        {
            return -1;
        }

        return this.objects[0].parent.getChildIndex(this.objects[0]);
    }


    public getLastIndex(container: createjs.Container): number
    {
        var grid: Tile[] = Core.instance.model.grid;
        var index: number = this.index;
        var objects: createjs.DisplayObject[] = grid[index].objects;

        //console.log("[index000]: ", index, container.getChildIndex(objects[1]));
        while (container.getChildIndex(objects[1]) == -1)
        {
            index--;

            if (index == -1)
            {
                return 0;  //gui + grid
            }

            objects = grid[index].objects;
        }

        //console.log("[index1]: ", index, container.getChildIndex(objects[1]), objects.length);
        return container.getChildIndex(objects[1]) + 1;
    }

    public getIndex(type: string): number //-1 if no exist
    {
        var arrayIndex: number = this.types.indexOf(type);

        if (arrayIndex == -1)
            return -1;

        var container: createjs.Container = <createjs.Container> this.objects[arrayIndex].parent;
        return container.getChildIndex(this.objects[arrayIndex]);
    }

    public setIndex(dObject: createjs.Container, isHeroUnder: boolean = true): void
    {
        //if (!dObject)
        //{
         //console.log("WTF dObject doesn't exist");
        //}

        var index: number;
        //if (this.isContainTypes(ImagesRes.STAR) || this.isContainType(ImagesRes.EXIT))
        //{
        //    index = this.getIndex(ImagesRes.STAR);

        //    if (index == -1)
        //        index = this.getIndex(ImagesRes.DARK);

        //    if (index == -1)
        //    {
        //        index = this.getIndex(ImagesRes.EXIT);
        //        index +=2; //above the right
        //    }

        //    if (isHeroUnder)
        //        index--;

        // //console.log("[index1]: ", index);
        //    dObject.parent.addChildAt(dObject, index);

        //}
        //else
        //{
        index = this.getLastIndex(dObject.parent);

        //console.log("[index2]: ", index, dObject.parent);
        dObject.parent.addChildAt(dObject, index);
        //console.log("[index3]: ", dObject.parent.getChildIndex(dObject));
        //}

    }
}  
