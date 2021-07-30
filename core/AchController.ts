class AchController
{
    //achs
    static ACH_CATCH_ARROW: number = 0;
    static ACH_KILL_MONSTER: number = 1;
    static ACH_NO_TAKE_ITEMS: number = 2;
    static ACH_TAKE_ALL_ITEMS: number = 3;

    static ACH_STEP_ON_TRAP: number = 4;
    static ACH_LAUNCH_MILL: number = 5;
    static ACH_10_HELMETS: number = 6;
    static ACH_FIRST_DEATH: number = 7;

    static ACH_10_SHIELDS: number = 8;
    static ACH_10_LEVELS_WITHOUT_DEATH: number = 9;
    static ACH_10_SWORDS: number = 10;
    static ACH_FAST_REACTION: number = 11;

    //param actions
    static HERO_DEAD_BY_MONSTER: number = 0;
    static HERO_DEAD_BY_ARROW: number = 1;
    static HERO_DEAD_BY_TRAP: number = 2;
    static MONSTER_DEAD: number = 3;
    static LEVEL_WITHOUT_ITEMS: number = 4;
    static MILL_LAUNCHED: number = 5;
    static HELMET_TAKED: number = 6;
    static SHIELD_TAKED: number = 7;
    static SWORD_TAKED: number = 8;
    static LEVEL_WITHOUT_DEATH: number = 9;
    static AWAY_FROM_ARROW: number = 10;


    static instance: AchController;
    private _icon: createjs.Bitmap;
    private _currentParam: number = -1;
    private _params: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

    constructor()
    {
        AchController.instance = this;
    }

    public addParam(type: number): void
    {
        this._params[type]++;

        this._currentParam = type;

        //var stars: number = 0;
        //for (var i: number = 0; i < Progress.starsAllLevels.length; i++)
        //{
        //    stars += Progress.starsAllLevels[i];
        //}
        //if (this._params[AchController.STAR_COLLECTED] > stars + Progress.starsPerLevel)
        //    this._params[AchController.STAR_COLLECTED] = stars + Progress.starsPerLevel;

        this.checkAchievements(type);
    }


    private checkAchievements(currentEvent: number): void
    {
        var achs: number[] = Progress.achs;
        for (var i: number = 0; i < achs.length; i++)
        {
            if (achs[i] == 1)
            {
                continue;
            }

            switch (i)
            {
                case AchController.ACH_CATCH_ARROW:
                    if (this._params[AchController.HERO_DEAD_BY_ARROW] > 0)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_KILL_MONSTER:
                    if (this._params[AchController.MONSTER_DEAD] > 0)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_NO_TAKE_ITEMS:
                    if (this._params[AchController.LEVEL_WITHOUT_ITEMS] > 0)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_TAKE_ALL_ITEMS:
                    if (this._params[AchController.HELMET_TAKED] >= 20 &&
                        this._params[AchController.SWORD_TAKED] >= 20 &&
                        this._params[AchController.SHIELD_TAKED] >= 20)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_STEP_ON_TRAP:
                    if (this._params[AchController.HERO_DEAD_BY_TRAP] > 0)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_LAUNCH_MILL:
                    if (this._params[AchController.MILL_LAUNCHED] > 0)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_10_HELMETS:
                    if (this._params[AchController.HELMET_TAKED] >= 10)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_FIRST_DEATH:
                    if (this._params[AchController.HERO_DEAD_BY_ARROW] > 0 ||
                        this._params[AchController.HERO_DEAD_BY_MONSTER] > 0 ||
                        this._params[AchController.HERO_DEAD_BY_TRAP] > 0)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_10_SHIELDS:
                    if (this._params[AchController.SHIELD_TAKED] >= 10)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_10_LEVELS_WITHOUT_DEATH:
                    if (this._params[AchController.LEVEL_WITHOUT_DEATH] >= 10)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_10_SWORDS:
                    if (this._params[AchController.SWORD_TAKED] >= 10)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                case AchController.ACH_FAST_REACTION:
                    if (this._params[AchController.AWAY_FROM_ARROW] > 0)
                    {
                        achs[i] = 1;
                        this.letAchievement(i);
                    }
                    break;

                default:
                    alert("unknown achievement " + i);
            }
        }
    }

    private letAchievement(type: number): void
    {
        if (this._icon.visible)
        {
            this.removeAchievement();
        }

     //console.log("[new achievement]", type);
        this._icon.image = ImagesRes.getImage(ImagesRes.ICON_ACH + type.toString());

        this._icon.visible = true;
        createjs.Tween.get(this._icon, { ignoreGlobalPause: true })
            .to({ scaleX: 1.5, scaleY: 1.5, alpha: 1 }, 400, createjs.Ease.quadInOut)
            .to({ scaleX: 0.8, scaleY: 0.8, alpha: 1 }, 400, createjs.Ease.quadInOut)
            .to({ scaleX: 1.3, scaleY: 1.3, alpha: 1 }, 400, createjs.Ease.quadInOut)
            .to({ scaleX: 0.6, scaleY: 0.6, alpha: 1 }, 400, createjs.Ease.quadInOut)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400, createjs.Ease.quadInOut)
            .call(this.hideAchievement, [], this);
    }

    private hideAchievement(): void
    {
        createjs.Tween.get(this._icon, { ignoreGlobalPause: true }).to({ scaleX: 0.3, scaleY: 0.3, alpha: 0 }, 400, createjs.Ease.quadInOut).call(this.removeAchievement, [], this);
    }

    public removeAchievement(): void
    {
        createjs.Tween.removeTweens(this._icon);
        this._icon.visible = false;
        this._icon.alpha = 0;
    }

    public init(core: createjs.Container): void
    {
        var bd: HTMLImageElement = ImagesRes.getImage(ImagesRes.ICON_ACH + 0);
        var w: number = 72;
        var h: number = 72;

        var bitmap: createjs.Bitmap = new createjs.Bitmap(bd);
        bitmap.mouseEnabled = false;
        bitmap.snapToPixel = true;
        core.addChild(bitmap);
        bitmap.regX = w >> 1;
        bitmap.regY = h >> 1;
        bitmap.x = 320;
        bitmap.y = 70;
        this._icon = bitmap;

        this._icon.visible = false;
        this._icon.alpha = 0;
    }
}