class Button extends createjs.Container
{
    private _width: number;
    private _height: number;

    public bitmap: createjs.Bitmap;//owerride
    private _typeOver: string;
    private _typeOut: string;

    private _typeOverOff: string;
    private _typeOutOff: string;

    private _isActive: boolean = true;

    constructor(out: string, over: string, outOff: string = "", overOff: string= "")
    {
        super();

        this.snapToPixel = true;

        this._typeOver = over;
        this._typeOut = out;
        this._typeOverOff = overOff;
        this._typeOutOff = outOff;

        var bd: HTMLImageElement = ImagesRes.getImage(out);
        this._width = bd.width;
        this._height = bd.height;
        this.bitmap = new createjs.Bitmap(bd);
        this.addChild(this.bitmap);

        this.bitmap.on(GUIEvent.MOUSE_DOWN, this.overHandler, this);
        this.bitmap.on(GUIEvent.MOUSE_UP, this.outHandler, this);

        if (outOff != "")
        {
            this.on(GUIEvent.MOUSE_CLICK, this.clickHandler, this);
            this.setState();
            SoundManager.instance.currentButton = this;
        }
    }

    public overHandler(e: createjs.MouseEvent = null): void
    {
        if (e)
        {
            e.stopPropagation();
        }

        var type: string = this._isActive ? this._typeOver : this._typeOverOff;

        var w: number = this.bitmap.image.width;
        var h: number = this.bitmap.image.height;
        var bd: HTMLImageElement = ImagesRes.getImage(type);
        this.bitmap.image = bd;
        this.bitmap.x = w - bd.width >> 1;
    }

    public outHandler(e: createjs.MouseEvent = null): void
    {
        if (e)
        {
            e.stopPropagation();
        }

        var type: string = this._isActive ? this._typeOut : this._typeOutOff;

        this.bitmap.image = ImagesRes.getImage(type);
        this.bitmap.x = 0;
        this.bitmap.y = 0;
    }

    private clickHandler(e: createjs.MouseEvent = null): void
    {
        this._isActive = !this._isActive;
        this.outHandler();
        SoundManager.instance.muteOnOff();
    }

    public swing(delta:number): void
    {
        this.skewX = delta;
        this.moveSkew(this);
    }

    public moveSkew(container:any): void
    {
        createjs.Tween.get(container, { ignoreGlobalPause: true }).to({ skewX: -container.skewX }, 2000, createjs.Ease.quadInOut).call(this.moveSkew, [container], this);
    }

    public setState(): void
    {
        this._isActive = SoundManager.instance.isMusic;
        this.outHandler()
	}

    public get state(): boolean
    {
        return this._isActive;
    }

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }
}