///<reference path='View.ts'/>
class MainMenu extends View
{
    private _buttonSound: Button;
    private _buttonMore: Button;
    private _buttonPlay: Button;
    private _buttonCredits: Button;
    private _buttonAchs: Button;

    private _smoke: createjs.Sprite;

    constructor()
    {
        super();

        var bgMap: Object[] = [
            { type: ImagesRes.MAIN_BG, x: 0, y: 0 },
            { type: ImagesRes.MAIN_TITLE, x: 50, y: 350 },
            { type: ImagesRes.SPEAR_UI + '0', x: 292, y: 280 },
            { type: ImagesRes.SPEAR_UI + '1', x: 25, y: 550 }
        ];
        Core.instance.bg.addBitmaps(bgMap);

        this.createButtons();
    }

    private createButtons(): void
    {
        this._buttonSound = new Button(ImagesRes.BUTTON_SOUND_ON, ImagesRes.BUTTON_SOUND_ON_OVER, ImagesRes.BUTTON_SOUND_OFF, ImagesRes.BUTTON_SOUND_OFF_OVER);
        this.addChild(this._buttonSound);
        this._buttonSound.x = 535;
        this._buttonSound.y = 103;
        this._buttonSound.name = "";

        this._buttonMore = new Button(ImagesRes.BUTTON_MORE_MAIN, ImagesRes.BUTTON_MORE_OVER_MAIN);
        this.addChild(this._buttonMore);
        this._buttonMore.x = 390;
        this._buttonMore.y = 370;
        this._buttonMore.name = "";//View.MORE_GAMES;

        //var bd: HTMLImageElement = ImagesRes.getImage(ImagesRes.UI_FAMOBI_MORE);
        //var bitmap: createjs.Bitmap = new createjs.Bitmap(bd);
        //this._buttonMore.addChild(bitmap);
        //bitmap.scaleX = bitmap.scaleY = 0.18;
        //bitmap.x = -2;
        //bitmap.y = 60;
        //bitmap.mouseEnabled = false;

        this._buttonPlay = new Button(ImagesRes.BUTTON_PLAY_MAIN, ImagesRes.BUTTON_PLAY_OVER_MAIN);
        this.addChild(this._buttonPlay);
        this._buttonPlay.x = 230;
        this._buttonPlay.y = 374;
        this._buttonPlay.name = View.LEVELS;

        this._buttonCredits = new Button(ImagesRes.BUTTON_CREDITS, ImagesRes.BUTTON_CREDITS_OVER);
        this.addChild(this._buttonCredits);
        this._buttonCredits.x = 420;
        this._buttonCredits.y = 95;
        this._buttonCredits.name = View.CREDITS;

        this._buttonAchs = new Button(ImagesRes.BUTTON_ACH, ImagesRes.BUTTON_ACH_OVER);
        this.addChild(this._buttonAchs);
        this._buttonAchs.x = 100;
        this._buttonAchs.y = 380;
        this._buttonAchs.name = View.ACHS;

        this._buttonSound.swing(5);
        this._buttonCredits.swing(5);
        this._buttonAchs.swing(4);
        this._buttonPlay.swing(4);
        this._buttonMore.swing(4);

        this.addMill();

        var sprite: createjs.Sprite = new createjs.Sprite(JSONRes.atlas1, ImagesRes.A_SMOKE);
        sprite.framerate = 30;
        sprite.x = 87;
        sprite.y = 477;
        this.addChild(sprite);
        this._smoke = sprite;
        this.playSmoke();
    }

    private playSmoke(): void
    {
        this._smoke.gotoAndPlay(ImagesRes.A_SMOKE);
        this._smoke.on(GameEvent.ANIMATION_COMPLETE, this.animationCompleteHandler, this);
    }

    private animationCompleteHandler(e:GameEvent = null): void
    {
        this._smoke.removeAllEventListeners();
        this._smoke.stop();
        createjs.Tween.get(this).wait(3000).call(this.playSmoke, [], this);
    }

    public destroy(): void
    {
        createjs.Tween.removeTweens(this);
        this._smoke.removeAllEventListeners();
        this._smoke.stop();
        super.destroy();

        this._buttonCredits = null;
        this._buttonMore = null;
        this._buttonPlay = null;
        this._buttonSound = null;
        this._buttonAchs = null;
        this._smoke = null;
    }
} 