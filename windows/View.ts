class View extends createjs.Container
{
    static MAIN_MENU: string = "mainMenu";
    static LEVELS: string = "levels";
    static GAME: string = "game";
    static CREDITS: string = "credits";
    static INTRO: string = "intro";
    static ACHS: string = "achs";

    static MORE_GAMES: string = "more";

    static currentBg: string = "";

    private _vane: createjs.Bitmap;

    constructor()
    {
        super();

        this.on(GUIEvent.MOUSE_CLICK, this.clickHandler, this);
    }

    private clickHandler(e: createjs.MouseEvent): void
    {
        e.stopPropagation();
        //console.log("[clickHandler]: ", e.target.parent.name, e.propagationStopped);
        if (e.target.parent.name || e.target.parent.parent)
        {
            var ev1: GameEvent;
            var ev2: GUIEvent;

            if (e.target.parent.name == View.MORE_GAMES)
            {
                GameBranding.clickMoreHandler(e);
                return;
            }

            if (e.target.parent.parent instanceof LevelButton)
            {
                ev1 = new GameEvent(GameEvent.GOTO_LEVEL);
                ev1.objectType = e.target.parent.parent.name;
                this.dispatchEvent(ev1);
            }
            else if (e.target.parent.name)
            {
                ev2 = new GUIEvent(GUIEvent.GOTO_WINDOW);
                ev2.window = e.target.parent.name;
                this.dispatchEvent(ev2);
            }
        }
    }

    public addMill(isRotate:boolean = true): void
    {
        var bd: HTMLImageElement = <HTMLImageElement> ImagesRes.getImage(ImagesRes.UI_MILL);
        this._vane = new createjs.Bitmap(bd);
        this._vane.snapToPixel = true;
        this._vane.x = 556 + (bd.width >> 1);
        this._vane.y = 572 + (bd.height >> 1);
        this._vane.regX = bd.width >> 1;
        this._vane.regY = bd.height >> 1;
        this._vane.rotation = 9;
        this.addChildAt(this._vane, 1);

        if (isRotate)
        {
            this.rotateMill();
        }
    }

    public rotateMill(): void
    {
        this._vane.rotation = 9;
        createjs.Tween.get(this._vane).to({ rotation: 369 }, 2000, createjs.Ease.linear).call(this.rotateMill, [], this);
    }

    public destroy(): void
    {
        this.removeAllEventListeners();
        this.removeAllChildren();

        if (this._vane)
        {
            createjs.Tween.removeTweens(this._vane);
            this._vane = null;
        }
    }

    public get vane(): createjs.Bitmap
    {
        return this._vane;
    }
} 