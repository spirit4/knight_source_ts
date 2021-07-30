///<reference path='View.ts'/>
class Credits extends View
{
    private _buttonBack: Button;
    private _smoke: createjs.Sprite;

    constructor()
    {
        super();

        var bgMap: Object[] = [
            { type: ImagesRes.MAIN_BG, x: 0, y: 0 },
            { type: ImagesRes.CREDITS_TITLE, x: 70, y: 260 },
            { type: ImagesRes.SPEAR_UI + '0', x: 320, y: 224 }
        ];
        Core.instance.bg.addBitmaps(bgMap);

        this.createButtons();

        this.addMill();

        var sprite: createjs.Sprite = new createjs.Sprite(JSONRes.atlas1, ImagesRes.A_SMOKE);
        sprite.framerate = 30;
        sprite.x = 87;
        sprite.y = 477;
        this.addChildAt(sprite,0);
        this._smoke = sprite;
        this.playSmoke();
    }

    private createButtons(): void
    {
        this._buttonBack = new Button(ImagesRes.BUTTON_PLAY_LC, ImagesRes.BUTTON_PLAY_OVER_LC);
        this.addChild(this._buttonBack);
        this._buttonBack.x = 520;
        this._buttonBack.y = 40;
        this._buttonBack.name = View.MAIN_MENU;
        this._buttonBack.scaleX = -1;
        this._buttonBack.swing(4);
    }

    private playSmoke(): void
    {
        this._smoke.gotoAndPlay(ImagesRes.A_SMOKE);
        this._smoke.on(GameEvent.ANIMATION_COMPLETE, this.animationCompleteHandler, this);
    }

    private animationCompleteHandler(e: GameEvent = null): void
    {
        this._smoke.removeAllEventListeners();
        this._smoke.stop();
        createjs.Tween.get(this).wait(3000).call(this.playSmoke, [], this);
    }

    public destroy(): void
    {
        super.destroy();

        this.removeAllEventListeners();
        createjs.Tween.removeTweens(this);
        this._smoke.removeAllEventListeners();
        this._smoke.stop();

        this._buttonBack = null;
        this._smoke = null;
    }
} 