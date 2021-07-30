class Preloader extends createjs.Container
{
    private _loader: createjs.LoadQueue;
    private _progress: createjs.Bitmap;

    private _progressWidth: number;
    private _vane: createjs.Bitmap;

    constructor()
    {
        super();

        var manifest = [
            { src: "images/ui/back_main.png", id: ImagesRes.MAIN_BG },
            { src: "images/ui/spear_2.png", id: ImagesRes.SPEAR_UI + '2' },
            { src: "images/ui/title_game.png", id: ImagesRes.MAIN_TITLE },
            { src: "images/ui/preload_bar.png", id: ImagesRes.PRELOADER_BAR },
            { src: "images/ui/mill_paddle_shadow.png", id: ImagesRes.UI_MILL },
            { src: "images/ui/bar_bg.png", id: ImagesRes.PRELOADER_BAR_BG }
        ];

        this._loader = new createjs.LoadQueue(false, '', true);
        this._loader.on(GameEvent.COMPLETE, this.completeHandler, this);
        this._loader.loadManifest(manifest);
    }

    private completeHandler(): void
    {
        this._loader.removeAllEventListeners();

     //console.log("[preloader resources loaded]");

        Core.instance.bg.addToCache(ImagesRes.MAIN_BG, <HTMLImageElement> this._loader.getResult(ImagesRes.MAIN_BG));
        Core.instance.bg.addToCache(ImagesRes.SPEAR_UI + '2', <HTMLImageElement> this._loader.getResult(ImagesRes.SPEAR_UI + '2'));
        Core.instance.bg.addToCache(ImagesRes.MAIN_TITLE, <HTMLImageElement> this._loader.getResult(ImagesRes.MAIN_TITLE));
        Core.instance.bg.addToCache(ImagesRes.PRELOADER_BAR_BG, <HTMLImageElement> this._loader.getResult(ImagesRes.PRELOADER_BAR_BG));

        var bgMap: Object[] = [
            { type: ImagesRes.MAIN_BG, x: 0, y: 0 },
            { type: ImagesRes.MAIN_TITLE, x: 50, y: 350 },
            { type: ImagesRes.PRELOADER_BAR_BG, x: 133, y: 582 },
            { type: ImagesRes.SPEAR_UI + '2', x: 105, y: 650 }
        ];
        Core.instance.bg.addBitmaps(bgMap);

        var bd: HTMLImageElement = <HTMLImageElement> this._loader.getResult(ImagesRes.PRELOADER_BAR);
        this._progressWidth = bd.width;

        this._progress = new createjs.Bitmap(bd);
        this.addChild(this._progress);
        this._progress.mouseEnabled = false;
        this._progress.x = 145;
        this._progress.y = 398;
        this._progress.sourceRect = new createjs.Rectangle(0, 0, 1, bd.height);
        this._progress.mouseEnabled = false;

        this.addMill();

        this.dispatchEvent(new GameEvent(GameEvent.COMPLETE, false, false));
    }

    public initProgress(): void
    {
        ImagesRes.loader.on(GameEvent.PROGRESS, this.progressHandler, this);
    }

    private progressHandler(e: GameEvent): void
    {
        this._progress.sourceRect.width = e.progress * this._progressWidth;
        //console.log("[progress: ]", this._progress.sourceRect.width, e.progress, this._progressWidth);

        if (e.progress == 1)
        {
            ImagesRes.loader.removeAllEventListeners();

            var play: Button = new Button(ImagesRes.BUTTON_PLAY_LC, ImagesRes.BUTTON_PLAY_OVER_LC);
            this.addChild(play);
            play.x = 260;
            play.y = this._progress.y + 65;
            play.on(GUIEvent.MOUSE_CLICK, this.clickHandler, this);
            play.swing(5);
         //console.log("[resources loaded and waiting click]");

            //temp
            //console.log("[resources loaded and auto continue]");
            //this.dispatchEvent(new GameEvent(GameEvent.COMPLETE, false, false));
        }
    }

    private clickHandler(e: createjs.MouseEvent): void
    {
        e.currentTarget.removeAllEventListeners();

        Core.instance.bg.dispose([ImagesRes.PRELOADER_BAR_BG]);
        this.dispatchEvent(new GameEvent(GameEvent.COMPLETE, false, false));

        this.removeAllChildren();
        this._loader.removeAll();
        this._progress = null;
        this._loader = null;

        createjs.Tween.removeTweens(this._vane);
        this._vane = null;
    }

    //copypaste fome View
    public addMill(isRotate: boolean = true): void
    {
        var bd: HTMLImageElement = <HTMLImageElement> this._loader.getResult(ImagesRes.UI_MILL);
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
} 