interface IActivatable
{
    activate(): void;
    destroy(): void;
    init(i:number, grid?: Tile[], units?:{ [index: number]: ICollidable; }): void;
} 