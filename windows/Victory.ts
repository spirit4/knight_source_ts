///<reference path='PopupGame.ts'/>
class Victory extends PopupGame
{
    private _vane: createjs.Bitmap;

    constructor(game: Game)
    {
        super(game);

        var bd: HTMLImageElement = ImagesRes.getImage(ImagesRes.VICTORY_MID);
        var bitmap: createjs.Bitmap = new createjs.Bitmap(bd);
        bitmap.snapToPixel = true;
        this.addChildAt(bitmap, 0);
        bitmap.alpha = 0;
        createjs.Tween.get(bitmap, { ignoreGlobalPause: true }).to({ alpha: 1 }, 300, createjs.Ease.linear);
        createjs.Tween.get(this, { ignoreGlobalPause: true }).wait(150).call(this.createBgs, [], this);

        this.addMill();

        this.createStars();

        Core.instance.model.saveProgress();
    }

    //private sendScore(score:number): void
    //{
    //    try
    //    {
    //        Core.instance.api.submitHighscore(Progress.currentLevel + 1, score * 100 + 50);
    //    } 
    //    catch(e)
    //    {

    //    }
    //}

    private createStars(): void
    {
        var bitmap: createjs.Bitmap;
        var bd: HTMLImageElement;
        //var score: number = 0;
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

            //score++;
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

            //score++;
            createjs.Tween.get(bitmap, { ignoreGlobalPause: true }).wait(750).from({ alpha: 0, scaleX: 2, scaleY: 2, y: bitmap.y - 50 }, 500, createjs.Ease.quartOut);
        }

        if (Progress.starsAllLevels[Progress.currentLevel][2] == 1)
        {
            //score++;
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

        //this.sendScore(score);

        //console.log("sdsd",Progress.currentLevel, Progress.levelsCompleted);
        if (Progress.starsAllLevels.length > Progress.levelsCompleted && Progress.currentLevel + 1 == Progress.levelsCompleted)
        {
            Progress.levelsCompleted++;
        }
    }

    private addMill(isRotate: boolean = true): void
    {
        var bd: HTMLImageElement = <HTMLImageElement> ImagesRes.getImage(ImagesRes.MILL_VANE);
        this._vane = new createjs.Bitmap(bd);
        this._vane.snapToPixel = true;
        this._vane.x = 475;
        this._vane.y = 147;
        this._vane.regX = bd.width >> 1;
        this._vane.regY = bd.height >> 1;
        this._vane.rotation = 45;
        this.addChild(this._vane);

        if (isRotate)
        {
            this.rotateMill();
        }
    }

    private rotateMill(): void
    {
        this._vane.rotation = 45;
        createjs.Tween.get(this._vane, { ignoreGlobalPause: true }).to({ rotation: 395 }, 2000, createjs.Ease.linear).call(this.rotateMill, [], this);
    }

    public createButtons(): void
    {
        super.createButtons(463, 457, 468);

        this.buttonPlay.name = GameEvent.LEVEL_COMPLETE;
    }

    public destroy(): void
    {
        super.destroy();
        createjs.Tween.removeTweens(this._vane);

        this._vane = null;
    }
} 