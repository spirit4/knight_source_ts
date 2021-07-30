class ManagerBg extends createjs.Container
{
    private _typeBDs: string[] = [
        ImagesRes.GAME_BG,
        ImagesRes.UI_LEVEL_BOARD,
        ImagesRes.LEVEL_SELECT_TITLE,
        ImagesRes.ACHIEVEMENS_TITLE,
        ImagesRes.LEVELS_BG,
        ImagesRes.VICTORY_BOTTOM,
        ImagesRes.VICTORY_TOP,
        ImagesRes.SPEAR_UI + '0',
        ImagesRes.SPEAR_UI + '1',
        ImagesRes.CREDITS_TITLE
    ];

    private _cacheBDs: { [type: string]: createjs.Bitmap; } = {};
    private _levelBitmaps: createjs.Bitmap[];
    private _decorBitmaps: createjs.Bitmap[];

    constructor()
    {
        super();
        this.snapToPixel = true;
        this.mouseEnabled = false;
        this.mouseChildren = false;
    }

    public init(): void
    {
        var bitmap: createjs.Bitmap;
        for (var i: number = 0; i < this._typeBDs.length; i++)
        {
            this.addToCache(this._typeBDs[i]);
        }
    }

    public addToCache(type: string, res?: HTMLImageElement): void
    {          
     //console.log("[addToCache]", type, res);
        var bd: HTMLImageElement;
        var bitmap: createjs.Bitmap;

        if (!res)
        {
            bd = ImagesRes.getImage(type);
        }
        else
        {
            bd = res;
        }

        bitmap = new createjs.Bitmap(bd);
        bitmap.snapToPixel = true;
        this.addChild(bitmap);
        bitmap.visible = false;

        this._cacheBDs[type] = bitmap;
    }

    /**[{type, x, y}]*/
    public addBitmaps(imgs: Object[]): void
    {
        this.clear();

        var bitmap: createjs.Bitmap;
        for (var i: number = 0; i < imgs.length; i++)
        {
            bitmap = this._cacheBDs[imgs[i]['type']];
            bitmap.visible = true;
            this.addChild(bitmap);//order indexes
            bitmap.x = imgs[i]['x'];
            bitmap.y = imgs[i]['y'];
        }

        this.update();
    }

    private clear(): void
    {
        for (var type in this._cacheBDs)
        {
            this._cacheBDs[type].visible = false;
        }

        this.update();
    }

    public dispose(types: string[]): void
    {
        var bitmap: createjs.Bitmap;
        for (var i: number = 0; i < types.length; i++)
        {
            bitmap = this._cacheBDs[types[i]];
            this.removeChild(bitmap);
            delete this._cacheBDs[types[i]];
        }

        this.update();
    }


    public update(): void
    {
        this.getStage().update();
    }

    public addTiles(bitmaps: createjs.Bitmap[], isDecor:boolean = false): void
    {
        var dx: number = Config.STAGE_W - Config.WIDTH * Config.SIZE_W >> 1;
        var dy: number = Config.MARGIN_TOP + Config.PADDING;
        if (isDecor)
        {
            this._decorBitmaps = [];
        }
        else
        {
            this._levelBitmaps = [];
        }

        for (var i: number = 0; i < bitmaps.length; i++)
        {
            if (bitmaps[i].name == ImagesRes.WATER && i - Config.WIDTH >= 0 && bitmaps[i - Config.WIDTH].name != ImagesRes.WATER)
            {
                this.addChildAt(bitmaps[i], this.getChildIndex(bitmaps[i - Config.WIDTH]));
            }
            else if (bitmaps[i].name == ImagesRes.WATER && i - 1 >= 0)
            {
                this.addChildAt(bitmaps[i], this.getChildIndex(bitmaps[i - 1]));
            }
            else
            {
                this.addChild(bitmaps[i]);
            }
            
            bitmaps[i].x += dx;
            bitmaps[i].y += dy;

            if (isDecor)
            {
                this._decorBitmaps.push(bitmaps[i]);
            }
            else
            {
                this._levelBitmaps.push(bitmaps[i]);
            }
            
        }
        this.update();
    }

    public removeTiles(): void
    {
        for (var i: number = 0; i < this._levelBitmaps.length; i++)
        {
            this.removeChild(this._levelBitmaps[i]);
        }
        for (var i: number = 0; i < this._decorBitmaps.length; i++)
        {
            this.removeChild(this._decorBitmaps[i]);
        }
        this._levelBitmaps.length = 0;
        this._levelBitmaps = null;
        this._decorBitmaps.length = 0;
        this._decorBitmaps = null;
        this.update();
    }
} 