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
 * NOTES
 * - https://excalidraw.com/#json=tLl3Nngh_xBA1DBwpKhom,LwSfPEibO0G23oPNR1O7Xw
 * - could add package-lock.json file to gitignore but prefer it to ensure no dependency issues
 * 
 * UPDATES (since tech task was submitted)
 * - (fix) got my increments and decrements the wrong way round
 * - (fix) forgot to re-assign values back to the array items
 * - (test) added more tests
 * - (fix) bugs in logic
 * - (chore) refactored again after untangling the requirements in my head!
 * - (fix) remove funtion with find and it will find the first - but there may be mutliple items
 * - (refactor) moved logic of backstage passes to another function + separate tests
 * - (refactor) performance optimisations
 */

export const getBackstagePassesQuality = (item: Item): number => {
    if (item.quality < 50) {
        if (item.sellIn > 10) return ++item.quality; // over 10 days
        if (item.sellIn > 5) return item.quality += 2; // over 6 but under 10 days
        if (item.sellIn > 0) return item.quality += 3; // over 0 but under 5 days
        return 0; // expired (concert over!)
    }
    return item.quality; // do nothing is quality is 50 - cannot be exceeded
};

export class GildedRose {
    static items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        GildedRose.items = items;
    }

    /**
     * assuming this is called once at the end of the day
     * sulfuras = hammer :)
     * conjured = magic??
     * https://www.w3schools.com/js/js_2016.asp
     */
    static updateQuality() {
        for (let i = 0, j = this.items.length; i < j; i++) { // optimisation - not calculate length each time
            if (this.items[i].name.includes('Sulfuras')) continue; // assuming sellIn always is 0 and quality is always 80
            else if (this.items[i].name.includes('Aged Brie')) {
                if (this.items[i].quality < 50) ++this.items[i].quality;
            }
            else if (this.items[i].name.includes('Conjured')) this.items[i].quality -= 2; // we don't care about the 50 limit
            else if (this.items[i].name.includes('Backstage passes')) this.items[i].quality = getBackstagePassesQuality(this.items[i]);
            else { // normal items
                if (this.items[i].sellIn > 0) --this.items[i].quality;
                else this.items[i].quality -= 2; // expired so quality degrades twice as much
            }
            --this.items[i].sellIn;
        }
        return this.items;
    }
}
