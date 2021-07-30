///<reference path='View.ts'/>
class Intro extends View
{
    private _buttonNext: Button;
    private _frames: createjs.Bitmap[] = [];
    private _startingPositions: Object[];

    constructor()
    {
        super();

        var bgMap: Object[] = [
            { type: ImagesRes.GAME_BG, x: 0, y: 0 },
            { type: ImagesRes.SPEAR_UI + '2', x: 105, y: 788 }
        ];
        Core.instance.bg.addBitmaps(bgMap);

        this.createFrames();
        this.createButtons();

        this.addMill();
        this.vane.y += 99;
    }

    private createFrames(): void
    {
        var bitmap: createjs.Bitmap;
        this._startingPositions = [
            { x: 27, y: 2 },
            { x: 328, y: 20 },
            { x: 27, y: 302 }
        ];

        bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.INTRO_ICON + 0));
        this.addChild(bitmap);
        bitmap.x = this._startingPositions[0]['x'];
        bitmap.y = this._startingPositions[0]['y'];
        this._frames.push(bitmap);
        bitmap.alpha = 0;

        bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.INTRO_ICON + 1));
        this.addChild(bitmap);
        bitmap.x = this._startingPositions[1]['x'];
        bitmap.y = this._startingPositions[1]['y'];
        this._frames.push(bitmap);
        bitmap.alpha = 0;

        bitmap = new createjs.Bitmap(ImagesRes.getImage(ImagesRes.INTRO_ICON + 2));
        this.addChild(bitmap);
        bitmap.x = this._startingPositions[2]['x'];
        bitmap.y = this._startingPositions[2]['y'];
        this._frames.push(bitmap);
        bitmap.alpha = 0;

        this.showNext(0);
        this.on(GUIEvent.MOUSE_CLICK, this.clickIntroHandler, this);
    }

    private createButtons(): void
    {
        this._buttonNext = new Button(ImagesRes.BUTTON_PLAY_LC, ImagesRes.BUTTON_PLAY_OVER_LC);
        this.addChild(this._buttonNext);
        this._buttonNext.y = 600;
        this._buttonNext.x = Config.STAGE_W - this._buttonNext.width >> 1;
        this._buttonNext.name = View.GAME;
        this._buttonNext.swing(4);
    }

    private clickIntroHandler(e: createjs.MouseEvent): void
    {
        if (!this._frames)
            return;

        for (var i: number = 0; i < this._frames.length; i++)
        {
            if (this._frames[i].alpha != 1)
            {
                createjs.Tween.removeTweens(this._frames[i]);
                this._frames[i].alpha = 1;
                this.showNext(i + 1);
                return;
            }
        }
    }

    private showNext(currentFrame: any): void
    {
        if (this._frames && this._frames.length > currentFrame)
        {
            createjs.Tween.get(this._frames[currentFrame])
                .to({ alpha: 1 }, 500, createjs.Ease.linear)
                .wait(1500)
                .call(this.showNext, [currentFrame + 1], this);
        }
    }


    public destroy(): void
    {
        super.destroy();

        for (var i: number = 0; i < this._frames.length; i++)
        {
            createjs.Tween.removeTweens(this._frames[i]);
        }

        this._frames.length = 0;
        this._frames = null;

        this._buttonNext = null;
        this._startingPositions = null;
    }
} 