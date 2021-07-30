///<reference path='Button.ts'/>
class LevelButton extends Button
{
    private _swing:createjs.Container

    constructor(num: number, stars: number[])
    {
        super(ImagesRes.BUTTON_LS, ImagesRes.BUTTON_LS_OVER);

        var bitmap: createjs.Bitmap;
        var bd: HTMLImageElement;
        bd = ImagesRes.getImage(ImagesRes.UI_STICK);
        bitmap = new createjs.Bitmap(bd);
        this.addChild(bitmap);
        bitmap.x = - bd.width >> 1;
        bitmap.mouseEnabled = false;
        bitmap.snapToPixel = true;

        this._swing = new createjs.Container();
        this.addChild(this._swing);

        this._swing.addChild(this.bitmap);

        var level: createjs.Text = new createjs.Text(num.toString(), "36px Georgia", "#301213");
        this._swing.addChild(level);
        level.mouseEnabled = false;
        level.snapToPixel = true;
        level.regX = level.getBounds().width >> 1
        level.x = 26;
        level.y = 12;

        this._swing.x = - this._swing.getBounds().width + 8 >> 1;
        this._swing.y = 3;

        this.addHelmet(!!stars[0]);
        this.addShield(!!stars[1]);
        this.addSword(!!stars[2]);
    }

    private addSword(isAvailable:boolean): void
    {
        var bitmap: createjs.Bitmap;
        var bd: HTMLImageElement;
        bd = !isAvailable ? ImagesRes.getImage(ImagesRes.UI_STAR_OFF + "2") : ImagesRes.getImage(ImagesRes.UI_STAR_ON + "2");
        bitmap = new createjs.Bitmap(bd);
        this.addChild(bitmap);
        bitmap.x = -45;
        bitmap.y = 97 - bd.height;
    }

    private addShield(isAvailable: boolean): void
    {
        var bitmap: createjs.Bitmap;
        var bd: HTMLImageElement;
        bd = !isAvailable ? ImagesRes.getImage(ImagesRes.UI_STAR_OFF + "1") : ImagesRes.getImage(ImagesRes.UI_STAR_ON + "1");
        bitmap = new createjs.Bitmap(bd);
        this.addChild(bitmap);
        bitmap.x = -3;
        bitmap.y = 97 - bd.height;
    }

    private addHelmet(isAvailable: boolean): void
    {
        var bitmap: createjs.Bitmap;
        var bd: HTMLImageElement;
        bd = !isAvailable ? ImagesRes.getImage(ImagesRes.UI_STAR_OFF + "0") : ImagesRes.getImage(ImagesRes.UI_STAR_ON + "0");
        bitmap = new createjs.Bitmap(bd);
        this._swing.addChild(bitmap);
        bitmap.x = -10;
        bitmap.y = 0;
    }

    public swing(delta: number): void
    {
        this._swing.skewX = delta;
        this.moveSkew(this._swing);
    }

}