class GameBranding
{
    //static logo: createjs.Container;
    static isSound: boolean = false;

    constructor()
    {

    }

    static addLogo(container: createjs.Container, newX: number = -10, newY: number = 10)
    {

    }

    //static clickLogoHandler(e: createjs.MouseEvent): void
    //{
    //    var logoData: any = Core.instance.api.Branding.getLogo();
    //    logoData.action();
    //}

    static clickMoreHandler(e: createjs.MouseEvent): void
    {
        if (Core.instance.api)
        {
            Core.instance.api.moreGamesLink();
        }
    }

    static addSplash(): void
    {
        //var splashData: any = Core.instance.api.Branding.displaySplashScreen(GameBranding.removeSplash);

        //if (!splashData || !splashData.show || !splashData.action)
        //    return;

        //var splashScreen = document.getElementById('spilgames-splash-screen');
        //splashScreen.addEventListener('click', splashData.action);
        //splashScreen.className = '';

        //createjs.Tween.get(splashScreen).wait(3000).call(GameBranding.removeSplash);
    }

    static removeSplash(): void
    {
        //var splashScreen = document.getElementById('spilgames-splash-screen');
        //splashScreen.className = 'spilgames-splash-screen-gone';
    }

    static adsPause(): void
    {
        createjs.Ticker.setPaused(true);

        if (SoundManager.instance && SoundManager.instance.isMusic)
        {
            SoundManager.instance.muteOnOff();
            GameBranding.isSound = true;
        }
    }

    static adsResume(): void
    {
        createjs.Ticker.setPaused(false);

        if (SoundManager.instance && GameBranding.isSound)
        {
            SoundManager.instance.muteOnOff();
            GameBranding.isSound = false;
        }
    }
} 