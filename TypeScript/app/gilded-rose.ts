export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

/**
 * https://excalidraw.com/#json=CG_NnR938qtHeXTvD635k,pyfKeCaniSPBLSand_Guag
 */

/**
 * https://www.w3schools.com/js/js_2016.asp
 * @todo: can check case sensitivity for name
 * @todo: move to another file? utils.ts or get-time.ts?
 * @todo: isolate it completely by passing the array of items as a param?
 */
export const getItem = (name: string): Item | undefined => {
    return GildedRose.items.filter((item) => item.name.includes(name))[0];
};

export class GildedRose {
    static items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        GildedRose.items = items;
    }

    static updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let sellIn = this.items[i].sellIn; // easier to read
            let quality = this.items[i].quality; // easier to read
            
            if (!getItem('Aged Brie') && !getItem('Backstage passes')) {
                if (quality > 0 && !getItem('Sulfuras')) quality--;
            } else if (quality < 50) {
                quality++;
                if (getItem('Backstage passes')) {
                    if (sellIn < 11 && quality < 50) quality++;
                    if (sellIn < 6 && quality < 50) quality++;
                }
            }

            if (!getItem('Sulfuras')) sellIn--;

            if (sellIn < 0) {
                if (!getItem('Aged Brie')) {
                    if (!getItem('Backstage passes') && quality > 0 && !getItem('Sulfuras')) quality--;
                    else quality = quality - quality;
                }
                else if (quality < 50) quality++;
            }
        }

        return this.items;
    }
}
