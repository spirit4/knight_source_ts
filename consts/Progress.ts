class Progress
{
    static levelsCompleted: number = 20;
    static currentLevel: number = 0;

    /**starsAllLevels [level][helmet,shield,sword]*/
    static starsAllLevels: number[][] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],//5
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],//10
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],//15
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]//20
    ];

    /**0 or 1*/
    static achs: number[] = [
        0,
        0,
        0,
        0,
        0,//5
        0,
        0,
        0,
        0,
        0,//10
        0,
        0
    ];

    static hintAchs: string[] = [
        'Let an arrow \rkill the knight',
        'Obtain the entire outfit \rand kill the beast',
        'Complete a level \rwithout the outfit',
        'Collect the entire outfit \rfrom every level',
        'Find a trap \rand step on it',//5
        'Activate the windmill \rcoming up to it',
        'Collect ten helmets \rfrom any ten levels',
        'The knight has to die ;)',
        'Collect ten shields \rfrom any ten levels',
        'Complete any ten levels \rwithout dying',//10
        'Collect ten swords \rfrom any ten levels',
        "Make a step \rsidewards from the arrow \rafter it's been shot" 
    ];
} 