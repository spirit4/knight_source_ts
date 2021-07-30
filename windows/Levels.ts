///<reference path='View.ts'/>
class Levels extends View
{
    private _buttonBack: Button;
    private _coords: { [level: number]: number[]; } = {
        0: [64, 108],
        1: [168, 149],
        2: [263, 118],
        3: [364, 133],       
        4: [549, 116], //
        5: [465, 156],
        6: [37, 217],
        7: [118, 292],
        8: [223, 263],
        9: [351, 263],//
        10: [463, 284],
        11: [558, 264],
        12: [79, 402],
        13: [193, 376],
        14: [302, 374], //
        15: [425, 391],
        16: [541, 406],
        17: [343, 483],
        18: [440, 546],
        19: [548, 531]
    };

    constructor()
    {
        super();

        var bgMap: Object[] = [
            { type: ImagesRes.LEVELS_BG, x: 0, y: 0 },
            { type: ImagesRes.LEVEL_SELECT_TITLE, x: 90, y: 230 },
            { type: ImagesRes.SPEAR_UI + '2', x: -100, y: 788 }
        ];
        Core.instance.bg.addBitmaps(bgMap);

        this.createButtons();
    }

    private createButtons(): void
    {
        var bitmap: createjs.Bitmap;
        var lvl: LevelButton;
        var col: number;
        var row: number;
        var bd: HTMLImageElement;

        for (var i: number = 0; i < Progress.starsAllLevels.length; i++)
        {
            if (i < Progress.levelsCompleted)
            {
                lvl = new LevelButton(i + 1, Progress.starsAllLevels[i])
                this.addChild(lvl);
                lvl.x = this._coords[i][0] + 20;
                lvl.y = this._coords[i][1] + 90;

                lvl.name = i.toString();
                lvl.snapToPixel = true;

                if (i == Progress.levelsCompleted - 1)
                {
                    lvl.swing(5);
                }
            }
        }

        this._buttonBack = new Button(ImagesRes.BUTTON_PLAY_LC, ImagesRes.BUTTON_PLAY_OVER_LC);
        this.addChild(this._buttonBack);
        this._buttonBack.x = 220;
        this._buttonBack.y = 600;
        this._buttonBack.name = View.MAIN_MENU;
        this._buttonBack.scaleX = -1;
        this._buttonBack.swing(4);


         //this.on(GUIEvent.PRESS_MOVE, this.moveHandler, this);
        //this.on(GUIEvent.MOUSE_UP, this.outHandler, this);
    }

    //private downHandler(e:createjs.MouseEvent): void
    //{
    //    console.log(e.propagationStopped, e.stageX, e.stageY, e.target.parent.x, e.target.parent.y);
    //}

    //private moveHandler(e: createjs.MouseEvent): void
    //{
    //    //console.log(e.stageX, e.stageY, "move");
    //    var obj: createjs.DisplayObject = <createjs.DisplayObject> e.target.parent;
    //    obj.x = Math.round(e.stageX) - 20;
    //    obj.y = Math.round(e.stageY) - 90;

    //}

    //private outHandler(e: createjs.MouseEvent): void
    //{
    //    var obj: createjs.DisplayObject = <createjs.DisplayObject> e.target.parent;
    //    console.log(Math.round(obj.x) - 20, Math.round(obj.y) - 90, "RESULT");
    //}

    public destroy(): void
    {
        super.destroy();

        this._buttonBack = null;
        this._coords = null;
    }
} 