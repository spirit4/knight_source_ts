﻿class Debuger extends createjs.Container
{      constructor()
    {         super();                  this.visible = false;          this.x = Config.STAGE_W - Config.WIDTH * Config.SIZE_W >> 1;         this.y = Config.MARGIN_TOP;     }      private createGrid(): void
    {         var grid: createjs.Graphics = new createjs.Graphics();         var shape: createjs.Shape = new createjs.Shape(grid);         this.addChild(shape);          var sizeW: number = Config.SIZE_W - 0.3;         var sizeH: number = Config.SIZE_H - 0.3;         var i: number;         for (i = 0; i <= Config.HEIGHT; i++)
        {             grid.beginStroke("#777777");             grid.moveTo(0, i * sizeH);             grid.lineTo(Config.WIDTH * sizeW, i * sizeH);         }         for (i = 0; i <= Config.WIDTH; i++)
        {             grid.beginStroke("#777777");             grid.moveTo(i * sizeW, 0);             grid.lineTo(i * sizeW, sizeH * Config.HEIGHT);         }     }      public turnOnOff(): void
    {         this.visible = !this.visible;          if (!this.visible)
        {             this.removeAllChildren();             }         else
        {             this.createGrid();              var grid: Tile[] = Core.instance.model.grid;             var tf: createjs.Text;             var displayIndex: string;             var types: string;             for (var i: number = 0; i < grid.length; i++)
            {                  types = "";                 for (var j: number = 0; j < grid[i].types.length; j++)
                {                     if (grid[i].types[j] == ImagesRes.BOULDER_MARK || grid[i].types[j] == ImagesRes.ARROW)// || grid[i].types[j] == ImagesRes.MILL)                     {                         types += grid[i].types[j] + "\r";                     }                     else                     {                         types += grid[i].types[j] + " " + grid[i].objects[j].parent.getChildIndex(grid[i].objects[j]) + "\r";                     }                 }                 displayIndex = grid[i].getFirstIndex().toString();                 tf = new createjs.Text(displayIndex, "12px Arial", "#000000");                 this.addChild(tf);                 tf.x = grid[i].x;                 tf.y = grid[i].y;                 tf.text = "i: " + i                 + "\r index: " + tf.text                 + "\r " + types;             }         }       } } 