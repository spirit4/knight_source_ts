class Level
{
    private _model: Model;
    private _container: createjs.Container;

    private _hero: Hero;
    private _mill: MillPress;
    private _units: { [index: number]: ICollidable; };
    private _items: IActivatable[];

    private _tilesBg: createjs.Bitmap[];
    private _decorBg: createjs.Bitmap[];

    constructor(container: createjs.Container, model: Model)
    {
        this._container = container;
        this._model = model;

        this._units = {};
        this._items = [];
        this._tilesBg = [];
        this._decorBg = [];

        var cells: Object[];
        if (JSONRes.levelFromEditor)
        {
            cells = JSONRes.levelFromEditor;
        }
        else
        {
            cells = JSONRes.levels[Progress.currentLevel];
        }

     //console.log("[parsing level: ]", Progress.currentLevel);
        var index: number;
        var types: string[];
        for (var i: number = 0; i < cells.length; i++)
        {
            index = cells[i]['index'];

            types = <string[]>cells[i]['types'];

            for (var j: number = 0; j < types.length; j++)
            {
                this.checkCell(index, types[j], types, cells[i]);
            }
        }
        Core.instance.bg.addTiles(this._tilesBg);
        Core.instance.bg.addTiles(this._decorBg, true);
        this._tilesBg.length = 0;
        this._tilesBg = null;
        this._decorBg.length = 0;
        this._decorBg = null;

        var len: number = this._items.length;
        for (var i: number = 0; i < len; i++)
        {
            this._items[i].init(i, this._model.grid, this._units);
        }
    }

    private checkCell(index: number, type: string, types: string[], cell: Object): void
    {
        var bitmap: createjs.Bitmap;
        var sprite: createjs.Sprite;
        var container: createjs.Container;
        var grid: Tile[] = this._model.grid;

        switch (type)
        {
            case ImagesRes.HERO:
                this._hero = new Hero(index);
                this._container.addChild(this._hero);
                break;

            case ImagesRes.MILL:
                container = this._mill = new MillPress(type, index);
                this._container.addChild(container);
                grid[index].isDear = true;
                grid[index].addType(type);
                grid[index].objects.push(container);//dirty hack
                //console.log("[SDSDSDSDSDS: ]", index, type);
                break;

            case ImagesRes.STAR:
                sprite = <createjs.Sprite> grid[index].add(type, this._container, grid);

                var star: Star = new Star(sprite, index, type);
                break;

            case ImagesRes.TRAP:
                sprite = <createjs.Sprite> grid[index].add(type, this._container, grid);

                var trap: Trap = new Trap(sprite, index, type);
                break;

            case ImagesRes.BOULDER:
                var boulder: Boulder = new Boulder(type, index, grid[index].add(type, this._container, grid), grid[index]);
                this._items.push(boulder);
                break;

            case ImagesRes.TOWER:
                var tower: Tower = new Tower(type, index, grid[index].add(type, this._container, grid), grid[index]);
                this._units[index] = tower;
                this._items.push(tower);
                break;

            case ImagesRes.BOULDER_MARK:
            case ImagesRes.ARROW:
                grid[index].addType(type);//for set direction
                break;

            case ImagesRes.SPIKES + 0:
                var spikes: Spikes = new Spikes(type, index, grid[index].add(type, this._container, grid), grid[index]);
                this._items.push(spikes);
                break;

            case ImagesRes.DECOR + 0:
            case ImagesRes.DECOR + 1:
            case ImagesRes.DECOR + 2:
            case ImagesRes.DECOR + 3:
            case ImagesRes.DECOR + 4:
                bitmap = <createjs.Bitmap> grid[index].add(type, this._container, grid);
                bitmap.x = cell[type][0];
                bitmap.y = cell[type][1];
                this._decorBg.push(bitmap);

                break;

            case ImagesRes.MONSTER:
                var monster: Monster;
                var id: number = 0;
                for (var key in this._units)
                {
                    monster = <Monster> this._units[key];
                    if (monster.type == type && (monster.x == grid[index].x || monster.y == grid[index].y))
                    {
                        monster.setPointIndex2(index);
                        return; 
                    }
                    id++;
                }

                monster = new Monster(type, index, id);
                this._container.addChild(monster);

                this._units[index] = monster;
                this._items.push(monster);//to set index position
                break;

            case ImagesRes.GRASS:
            case ImagesRes.WATER:
                bitmap = <createjs.Bitmap> grid[index].add(type, this._container, grid);
                this._tilesBg.push(bitmap);
                break;

            default:
                grid[index].add(type, this._container, grid);
        }

    }

    public destroy(): void
    {
        Core.instance.bg.removeTiles();

        var len: number = this._items.length;
        for (var i: number = 0; i < len; i++)
        {
            this._items[i].destroy();
        }

        this._model = null;
        this._container = null;
        this._hero = null;
        this._units = null;
        this._mill = null;
        this._items.length = 0;
        this._items = null;
    }

    public get hero(): Hero
    {
        return this._hero;
    }

    public get mill(): MillPress
    {
        return this._mill;
    }

    public get units(): { [index: number]: ICollidable; }
    {
        return this._units;
    }

    public get items(): IActivatable[]
    {
        return this._items;
    }
} 