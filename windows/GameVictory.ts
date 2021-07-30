///<reference path='PopupGame.ts'/>
class GameVictory extends PopupGame
{
    constructor(game: Game)
    {
        super(game);

        var bd: HTMLImageElement = ImagesRes.getImage(ImagesRes.FINISH_MID);
        var bitmap: createjs.Bitmap = new createjs.Bitmap(bd);
        bitmap.snapToPixel = true;
        this.addChildAt(bitmap, 0);
        bitmap.alpha = 0;
        createjs.Tween.get(bitmap, { ignoreGlobalPause: true }).to({ alpha: 1 }, 300, createjs.Ease.linear);
        createjs.Tween.get(this, { ignoreGlobalPause: true }).wait(150).call(this.createBgs, [], this);

        this.createStars();
    }

    private createStars(): void
    {
        var bitmap: createjs.Bitmap;
        var bd: HTMLImageElement;
        if (Progress.starsAllLevels[Progress.currentLevel][0] == 1)
        {
            bd = ImagesRes.getImage(ImagesRes.STAR + '0');
            bitmap = new createjs.Bitmap(bd);
            bitmap.snapToPixel = true;
            this.addChild(bitmap);
            bitmap.regX = bd.width >> 1;
            bitmap.regY = bd.height >> 1;
            bitmap.x = 308 + bitmap.regX;
            bitmap.y = 385 + bitmap.regY;

            createjs.Tween.get(bitmap, { ignoreGlobalPause: true }).wait(500).from({ alpha: 0, scaleX: 2, scaleY: 2, y: bitmap.y - 50 }, 500, createjs.Ease.quartOut);
        }

        if (Progress.starsAllLevels[Progress.currentLevel][1] == 1)
        {
            bd = ImagesRes.getImage(ImagesRes.STAR + '1');
            bitmap = new createjs.Bitmap(bd);
            bitmap.snapToPixel = true;
            this.addChild(bitmap);
            bitmap.regX = bd.width >> 1;
            bitmap.regY = bd.height >> 1;
            bitmap.x = 281 + bitmap.regX;
            bitmap.y = 314 + bitmap.regY;

            createjs.Tween.get(bitmap, { ignoreGlobalPause: true }).wait(750).from({ alpha: 0, scaleX: 2, scaleY: 2, y: bitmap.y - 50 }, 500, createjs.Ease.quartOut);
        }

        if (Progress.starsAllLevels[Progress.currentLevel][2] == 1)
        {
            bd = ImagesRes.getImage(ImagesRes.STAR + '2');
            bitmap = new createjs.Bitmap(bd);
            bitmap.snapToPixel = true;
            this.addChild(bitmap);
            bitmap.regX = bd.width >> 1;
            bitmap.regY = bd.height >> 1;
            bitmap.x = 347 + bitmap.regX;
            bitmap.y = 315 + bitmap.regY;

            createjs.Tween.get(bitmap, { ignoreGlobalPause: true }).wait(250).from({ alpha: 0, scaleX: 2, scaleY: 2, y: bitmap.y - 50 }, 500, createjs.Ease.quartOut);
        }
    }

    public createButtons(): void
    {
        super.createButtons(463, 457, 468);
    }

} 