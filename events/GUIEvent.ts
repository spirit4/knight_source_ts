class GUIEvent extends createjs.Event
{
    static MOUSE_CLICK: string = "click";
	static MOUSE_DOWN: string = "mousedown";
    static MOUSE_UP: string = "pressup";
    static PRESS_MOVE: string = "pressmove";
	static RESIZE: string = "resize";
	static ORIENTATION_CHANGE: string = "orientationchange";

    static GOTO_WINDOW: string = "gotoWindow";
    static BLIND_CLOSED: string = "blindClosed";

    static KEYDOWN: string = "keydown";
    static KEYUP: string = "keyup";

    public window: string;

    constructor(type:string, bubbles:boolean = false,cancelable:boolean = false)
    {
        super(type, bubbles, cancelable);

    }
}