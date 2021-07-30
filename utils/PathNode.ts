class PathNode
{
    public cost: number = 0;
    public costToStart: number = 0;
    public costToEnd: number = 0;
    public totalCost: number = 0;

    public index: number = 0;

    public parent: PathNode = null;

    constructor()
    {

    }
    public calculateTotalCost(): void
    {
        this.totalCost = this.costToStart + this.costToEnd;
    }

} 