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
 */

export class GildedRose {
    static items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        GildedRose.items = items;
    }

    /**
     * assuming this is called once at the end of the day
     */
    static updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let sellIn = this.items[i].sellIn; // easier to read
            let quality = this.items[i].quality; // easier to read

            /**
             * @todo: could separate specific cases like this into other functions which can be easily tested
             * e.g. updateSulfuras(), updateBackstagePasses() etc
             * sulfuras = hammer :)
             * https://www.w3schools.com/js/js_2016.asp
             */
            if (this.items[i].name.includes('Sulfuras')) continue; // assuming sellIn always is 0 and quality is always 80
            else if (this.items[i].name.includes('Aged Brie')) {
                if (quality < 50) ++quality;
            }
            else if (this.items[i].name.includes('Conjured')) quality -= 2; // we don't care about the 50 limit
            else if (this.items[i].name.includes('Backstage passes')) {
                if (quality < 50) {
                    if (sellIn <= 0) quality = 0; // expired (concert over!)
                    else if (sellIn > 0 && sellIn <= 5) quality += 3;
                    else if (sellIn > 5 && sellIn <= 10) quality += 2;
                    else quality ++; // over 10 days
                }
            }
            else { // normal items
                if (sellIn > 0) --quality;
                else quality -= 2; // expired so quality degrades twice as much
            }

            --sellIn;

            this.items[i].sellIn = sellIn;
            this.items[i].quality = quality;
        }

        return this.items;
    }
}
