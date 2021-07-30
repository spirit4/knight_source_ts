///<reference path='View.ts'/>
class Achievements extends View
{
    private _buttonBack: Button;
    private _smoke: createjs.Sprite;
    private _hint: createjs.Container;
    private _text: createjs.Text;

    constructor()
    {
        super();

        var bgMap: Object[] = [
            { type: ImagesRes.GAME_BG, x: 0, y: 0 },
            { type: ImagesRes.ACHIEVEMENS_TITLE, x: 174, y: 210 },
            { type: ImagesRes.SPEAR_UI + '2', x: 105, y: 788 }
        ];
        Core.instance.bg.addBitmaps(bgMap);

        this.createIcons();
        this.createButtons();
        this.createHint();

        this.addMill();
        this.vane.y += 99;

        var sprite: createjs.Sprite = new createjs.Sprite(JSONRes.atlas1, ImagesRes.A_SMOKE);
        sprite.framerate = 30;
        sprite.x = 87;
        sprite.y = 576;
        this.addChildAt(sprite,0);
        this._smoke = sprite;
        this.playSmoke();


        this.on(GUIEvent.MOUSE_DOWN, this.movedownHandler, this);
    }

    private movedownHandler(e: createjs.MouseEvent): void
    {
        //console.log("movedownHandler", e.target.name, e.target.x, e.target.y);
        if (e.target.name == null || e.target.name == '' || e.target.name == undefined)
        {
            this._hint.visible = false;
            return;
        }

        this._hint.visible = true;
        this._hint.x = e.target.x + 20;
        this._hint.y = e.target.y + 20;
        this._text.text = Progress.hintAchs[+e.target.name];

        var shape: createjs.Shape = <createjs.Shape> this._hint.getChildAt(0);
        shape.graphics.clear();
        shape.graphics.beginFill('#C99953');
        shape.graphics.drawRect(0, 0, this._text.getBounds().width + 20, this._text.getBounds().height + 10);
        shape.graphics.endFill();
    }

    private createIcons(): void
    {
        var bitmap: createjs.Bitmap;
        var matrix: createjs.ColorMatrix;
        var bd: HTMLImageElement;
        var col: number;
        var row: number;

        for (var i: number = 0; i < Progress.achs.length; i++)
        {
            col = i % 2;
            row = (i - col) / 2;

            bd = ImagesRes.getImage(ImagesRes.ICON_ACH + i);
            bitmap = new createjs.Bitmap(bd);

            if (!Progress.achs[i])
            {
                matrix = new createjs.ColorMatrix().adjustBrightness(-60).adjustSaturation(-50);
                bitmap.filters = [new createjs.ColorMatrixFilter(matrix)];
                bitmap.cache(0, 0, bd.width, bd.height);
            }
            
            this.addChild(bitmap);
            bitmap.x = 35 + col * (bd.width + 220);
            bitmap.y = 120 + row * (bd.height + 8);
            bitmap.snapToPixel = true;
            bitmap.name = i.toString();

            bd = ImagesRes.getImage(ImagesRes.TEXT_ACH + i);
            bitmap = new createjs.Bitmap(bd);
            this.addChild(bitmap);
            bitmap.x = 115 + col * 293;
            bitmap.y = 153 + row * 80 - bd.height * 0.5;
            bitmap.snapToPixel = true;
            bitmap.name = i.toString();
        }
    }

    private createHint(): void
    {
        this._hint = new createjs.Container();
        this.addChild(this._hint);
        this._hint.visible = false;

        var g: createjs.Graphics = new createjs.Graphics();
        var shape: createjs.Shape = new createjs.Shape(g);
        this._hint.addChild(shape);

        this._text = new createjs.Text("empty", "16px Georgia", "#582415");
        this._hint.addChild(this._text);
        this._text.snapToPixel = true;
        this._text.mouseEnabled = false;
        this._text.x = 10;
        this._text.y = 5;
    }

    private createButtons(): void
    {
        this._buttonBack = new Button(ImagesRes.BUTTON_PLAY_LC, ImagesRes.BUTTON_PLAY_OVER_LC);
        this.addChild(this._buttonBack);
        this._buttonBack.x = 440;
        this._buttonBack.y = 600;
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
        this._hint = null;
        this._text = null;
    }
} 