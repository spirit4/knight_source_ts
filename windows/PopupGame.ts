class PopupGame extends createjs.Container
{
    public buttonPlay: Button;

    private _buttonReset: Button;
    private _buttonMenu: Button;

    private _top: createjs.Bitmap;
    private _bottom: createjs.Bitmap;

    private _game: Game;

    constructor(game: Game)
    {
        super();
        this._game = game;

        this.createButtons();
        this.on(GUIEvent.MOUSE_CLICK, this.clickHandler, this);

        createjs.Ticker.setPaused(true);
    }

    public createBgs(): void
    {
        var bitmap: createjs.Bitmap;
        var bd: HTMLImageElement;
        bd = ImagesRes.getImage(ImagesRes.VICTORY_TOP);
        bitmap = new createjs.Bitmap(bd);
        bitmap.snapToPixel = true;
        Core.instance.bg.addChild(bitmap);
        this._top = bitmap;

        bd = ImagesRes.getImage(ImagesRes.VICTORY_BOTTOM);
        bitmap = new createjs.Bitmap(bd);
        bitmap.snapToPixel = true;
        bitmap.y = Config.PADDING + Config.STAGE_H_MIN;
        Core.instance.bg.addChild(bitmap);
        this._bottom = bitmap;

        Core.instance.bg.update();
    }

    private clickHandler(e: createjs.MouseEvent): void
    {
        e.stopPropagation();

        if (e.target.parent instanceof Button)
        {
            //console.log("---------", e.target.parent.name, e.target.name, e.target.parent.parent.name);
            if (e.target.parent.name)
            {
                Hero.currentView = null;
                Hero.currentTween = null;

                var ev1: GameEvent;
                var ev2: GUIEvent;

                if (e.target.parent.name == View.MAIN_MENU || e.target.parent.name == View.LEVELS)
                {
                    ev2 = new GUIEvent(GUIEvent.GOTO_WINDOW);
                    ev2.window = e.target.parent.name;
                    this._game.dispatchEvent(ev2);
                }
                else if (e.target.parent.name == GameEvent.RESTART)
                {
                    ev1 = new GameEvent(GameEvent.RESTART);
                    ev1.objectType = e.target.parent.name;
                    this._game.dispatchEvent(ev1);
                }
                else if (e.target.parent.name == GameEvent.LEVEL_COMPLETE)
                {
                    ev1 = new GameEvent(GameEvent.LEVEL_COMPLETE);
                    ev1.objectType = e.target.parent.name;
                    this._game.dispatchEvent(ev1);
                }

            }

            createjs.Ticker.setPaused(false);

            this.hide();
        }
    }

    public createButtons(y1: number = 445, y2: number = 430, y3: number = 430): void
    {
        this.buttonPlay = new Button(ImagesRes.BUTTON_PLAY_LC, ImagesRes.BUTTON_PLAY_OVER_LC);
        this.addChild(this.buttonPlay);
        this.buttonPlay.y = y1;
        this.buttonPlay.x = Config.STAGE_W - this.buttonPlay.width + 40 >> 1;
        this.buttonPlay.name = View.LEVELS;

        createjs.Tween.get(this.buttonPlay, { ignoreGlobalPause: true }).wait(500).from({alpha: 0, y: y1 - 20 }, 250, createjs.Ease.backOut);

        this._buttonReset = new Button(ImagesRes.BUTTON_RESET, ImagesRes.BUTTON_RESET_OVER);
        this.addChild(this._buttonReset);
        this._buttonReset.y = y2;
        this._buttonReset.x = this.buttonPlay.x - 120;
        this._buttonReset.name = GameEvent.RESTART;
        createjs.Tween.get(this._buttonReset, { ignoreGlobalPause: true }).wait(200).from({alpha: 0, y: y2 - 20 }, 250, createjs.Ease.backOut);

        this._buttonMenu = new Button(ImagesRes.BUTTON_MENU, ImagesRes.BUTTON_MENU_OVER);
        this.addChild(this._buttonMenu);
        this._buttonMenu.y = y3;
        this._buttonMenu.x = this.buttonPlay.x + 140;
        this._buttonMenu.name = View.LEVELS;
        createjs.Tween.get(this._buttonMenu, { ignoreGlobalPause: true }).wait(350).from({alpha: 0, y: y3 - 20 }, 250, createjs.Ease.backOut);
        
        this.buttonPlay.swing(4);
        this._buttonReset.swing(4);
        this._buttonMenu.swing(4);
    }

    private startPause(): void
    {
        createjs.Ticker.setPaused(true);
    }

    private hide(): void
    {
        this.parent.removeChild(this);
        this.destroy();
    }

    public destroy(): void
    {
        Core.instance.bg.removeChild(this._top);
        Core.instance.bg.removeChild(this._bottom);
        Core.instance.bg.update();

        this.removeAllEventListeners();
        this.removeAllChildren();

        this._buttonReset = null;
        this.buttonPlay = null;
        this._buttonMenu = null;
        this._game = null;
        this._top = null;
        this._bottom = null;
    }
} 