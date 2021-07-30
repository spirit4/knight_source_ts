window.onload = () =>
{
    setTimeout("window.scrollTo(0, 1)", 20);

    var main = new Main();
    createjs.Tween.get(main, { ignoreGlobalPause: true }).wait(100).call(main.init, [], main);
    //console.log("[window.onload]");
};

//// <reference path="../Scripts/typings/stats/stats.d.ts" />

/// <reference path="../Scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../Scripts/typings/createjs/createjs.d.ts" />

////<reference path='../core/Debuger.ts'/>
///<reference path='../core/Core.ts'/>
///<reference path='../core/Preloader.ts'/>
class Main
{
    //-------------------------------
    //private _stats: Stats;
    //private _debug: Debuger;
    //-------------------------------

    private _bgStage: createjs.Stage;
    private _mainStage: createjs.Stage;

    private _core: Core;
    private _preloader: Preloader;

    private _managerBg: ManagerBg;

    private _isGlobalPause: boolean = false;

    static prevState: string = "focus";
    static counterVisible: number = 0;

    private _lastTime: number;
    private _isNeedResize: boolean = false;
    private _isResizing: boolean = false;

    constructor()
    {
        this._lastTime = Date.now();
        //alert(" 1.25");

        this._bgStage = new createjs.Stage("bgStage");
        this._mainStage = new createjs.Stage("mainStage");

        var canvas: HTMLCanvasElement = <HTMLCanvasElement> this._bgStage.canvas;
        canvas.width = Config.STAGE_W;
        canvas.height = Config.STAGE_H_MAX;

        canvas = <HTMLCanvasElement> this._mainStage.canvas;
        canvas.width = Config.STAGE_W;
        canvas.height = Config.STAGE_H_MIN;

        this.addCheckFocus();
    }

    public init(): void
    {
        //console.log("[app init]");

        this._managerBg = new ManagerBg();
        this._bgStage.addChild(this._managerBg);

        this._core = new Core(this._managerBg);
        this._mainStage.addChild(this._core);

        //-------------------------------
        //this._stats = new Stats();
        //this._stats.setMode(0);
        //document.body.appendChild(this._stats.domElement);
        //this._stats.domElement.style.marginTop = "30px";

        //this._debug = new Debuger();
        //this._mainStage.addChild(this._debug);
        //this._core.debug = this._debug;
        //-------------------------------

        this._bgStage.update();
        this._mainStage.update();

        createjs.Touch.enable(this._mainStage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.setFPS(30);
        createjs.Ticker.on(GameEvent.UPDATE, this.update, this);

        this.prepareResize();
        window.addEventListener(GUIEvent.RESIZE,() => this.prepareResize());
        window.addEventListener(GUIEvent.ORIENTATION_CHANGE,() => this.prepareResize());
    }

    private prepareResize(): void
    {
        createjs.Ticker.setPaused(true);
        this._isNeedResize = true;
        this._lastTime = Date.now();

        var nua: string = navigator.userAgent.toLowerCase();
        var isAndroidBrowser: boolean = ((nua.indexOf('mozilla/5.0') > -1 && nua.indexOf('android ') > -1 && nua.indexOf('applewebkit') > -1) && (nua.indexOf('version') > -1));

        if (isAndroidBrowser)
        {
            this._mainStage.removeChild(this._core);
        }

        this._bgStage.update();
        this._mainStage.update();
    }

    private resizeHandler(): void
    {
        //console.log("[app resize]");

        var w: number = window.innerWidth;
        var h: number = window.innerHeight;

        var currentW: number = 0;
        var currentH: number = 0;
        var currentBgW: number = 0;
        var currentBgH: number = 0;

        var currentRatio: number = w / h;
        var optimalRatioMin: number = Config.STAGE_W / Config.STAGE_H_MIN;
        var optimalRatioMax: number = Config.STAGE_W / Config.STAGE_H_MAX;

        if (currentRatio >= optimalRatioMin)
        {
            currentBgW = currentW = h * optimalRatioMin;
            currentH = h;
            currentBgH = currentBgW / optimalRatioMax;
        }
        else if (currentRatio < optimalRatioMin)
        {
            if (currentRatio >= optimalRatioMin)
            {
                currentW = w;
                currentH = h;
            }
            else if (currentRatio < optimalRatioMin)
            {
                currentW = w;
                currentH = w / optimalRatioMin;
            }

            if (currentRatio >= optimalRatioMax)
            {
                currentBgW = w;
                currentBgH = w / optimalRatioMax;//h;
            }
            else if (currentRatio < optimalRatioMax)
            {
                currentBgW = w;
                currentBgH = w / optimalRatioMax;
            }
        }

        currentBgW = 0.5 + currentBgW | 0;
        currentBgH = 0.5 + currentBgH | 0;
        currentW = 0.5 + currentW | 0;
        currentH = 0.5 + currentH | 0;

        var container: HTMLElement = document.getElementById("wrapper");
        container.style.marginLeft = ((-currentW * 0.5) + 0.5 | 0) + "px";
        container.style.marginTop = (Math.round(-currentH * 0.5)) + "px";

        var canvas: HTMLCanvasElement = <HTMLCanvasElement> this._bgStage.canvas;
        canvas.style.marginTop = -((currentBgH - currentH >> 1) + 0.5 | 0) + "px";

        canvas.style.width = currentBgW + "px";
        canvas.style.height = currentBgH + "px";

        canvas = <HTMLCanvasElement> this._mainStage.canvas;
        canvas.style.width = currentW + "px";
        canvas.style.height = currentH + "px";

        //this._bgStage.update();
        //this._mainStage.update();

        var delay: number = 50;
        var nua: string = navigator.userAgent.toLowerCase();
        var isAndroidBrowser: boolean = ((nua.indexOf('mozilla/5.0') > -1 && nua.indexOf('android ') > -1 && nua.indexOf('applewebkit') > -1) && (nua.indexOf('version') > -1));

        if (isAndroidBrowser)
        {
            delay = 500;
        }
        createjs.Tween.get(this, { ignoreGlobalPause: true }).wait(delay).call(this.afterTimeout, [], this);
    }

    private afterTimeout(): void
    {
        //console.log("afterTimeout", Date.now() - this._lastTime);

        var nua: string = navigator.userAgent.toLowerCase();
        var isAndroidBrowser: boolean = ((nua.indexOf('mozilla/5.0') > -1 && nua.indexOf('android ') > -1 && nua.indexOf('applewebkit') > -1) && (nua.indexOf('version') > -1));

        if (isAndroidBrowser)
        {
            this._mainStage.addChild(this._core);
        }

        this._bgStage.update();
        this._mainStage.update();

        this._isNeedResize = false;
        this._isResizing = false;
        createjs.Ticker.setPaused(false);
    }

    private addCheckFocus(): void
    {
        window['isActive'] = 'visible';

        var hidden = "hidden";

        if (hidden in document)
        {
            document.addEventListener("visibilitychange", this.changeHandler);
        }
        else if ((hidden = "mozHidden") in document)
        {
            document.addEventListener("mozvisibilitychange", this.changeHandler);
        }
        else if ((hidden = "webkitHidden") in document)
        {
            document.addEventListener("webkitvisibilitychange", this.changeHandler);
        }
        else if ((hidden = "msHidden") in document)
        {
            document.addEventListener("msvisibilitychange", this.changeHandler);
        }
        else if ('onfocusin' in document)
        {
            document.onfocusin = document.onfocusout = this.changeHandler;
        }

        window.onpageshow = window.onpagehide = window.onfocus = window.onblur = this.changeHandler;
    }

    private changeHandler(event): void
    {
        var v = 'visible', h = 'hidden',
            evtMap = {
                focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
            };

        event = event || window.event;

        //console.log("[changeHandler]", event.type, evtMap[event.type]);
        //if (Main.text)
        //{
        //    Main.text.text += event.type + " | " + evtMap[event.type] + " | " + Main.prevState + " | " + (Main.prevState == event.type) + "\r";
        //}

        if (event.type in evtMap)
        {
            if (evtMap[event.type] == h && window['isActive'] == v)
            {
                window['isActive'] = h;
                Main.prevState = event.type;
                GameBranding.adsPause();
            }
            else if (evtMap[event.type] == v && window['isActive'] == h)
            {
                window['isActive'] = v;
                Main.prevState = event.type;
                GameBranding.adsResume();
            }
        }
        else
        {
            Main.counterVisible++;

            if (Main.prevState != event.type && window['isActive'] == v &&
                Main.counterVisible == 1)
            {
                window['isActive'] = h;
                Main.prevState = event.type;
                GameBranding.adsPause();
            }
            else if (Main.prevState == event.type && window['isActive'] == h)
            {
                window['isActive'] = v;
                Main.prevState = "focus";
                Main.counterVisible = 0;
                GameBranding.adsResume();
            }
        }
    }

    private update(e: GameEvent): void
    {
        //this._stats.begin();

        if (!this._isGlobalPause && createjs.Ticker.getPaused())
        {
            this._isGlobalPause = true;

            //console.log("[app global pause TRUE]");
            if (Hero.currentTween)
            {
                //Hero.currentView.paused = true;
                Hero.currentTween.setPaused(true);
            }
        }
        else if (this._isGlobalPause && !createjs.Ticker.getPaused())
        {
            this._isGlobalPause = false;

            //console.log("[app global pause FALSE]");
            if (Hero.currentTween)
            {
                //Hero.currentView.paused = false;
                Hero.currentTween.setPaused(false);
            }
        }

        this._core.update();

        if (!this._isNeedResize && !this._isResizing)
        {
            this._mainStage.update(e);
        }
        else if (this._isNeedResize && !this._isResizing && Date.now() - this._lastTime > 50) //ms
        {
            this._isResizing = true;
            //this.resizeHandler();
            var delay: number = 50;
            var nua: string = navigator.userAgent.toLowerCase();
            var isAndroidBrowser: boolean = ((nua.indexOf('mozilla/5.0') > -1 && nua.indexOf('android ') > -1 && nua.indexOf('applewebkit') > -1) && (nua.indexOf('version') > -1));

            if (isAndroidBrowser)
            {
                delay = 500;
            }
            createjs.Tween.get(this, { ignoreGlobalPause: true }).wait(delay).call(this.resizeHandler, [], this);
        }
        //this._stats.end();

        //if (this._isResizing)
        //    console.log("[update]", Date.now());
    }

}
