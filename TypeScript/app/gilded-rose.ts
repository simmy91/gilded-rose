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
 */

/**
 * https://www.w3schools.com/js/js_2016.asp
 * @todo: can check case sensitivity for name
 * @todo: move to another file? utils.ts or get-time.ts?
 * @todo: isolate it completely by passing the array of items as a param?
 * @todo: could also use some() or filter() but might be slower!!
 */
export const getItem = (name: string): Item | undefined => {
    return GildedRose.items.find((item) => item.name.includes(name));
};

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
             */
            if (getItem('Sulfuras')) continue; // assuming sellIn always is 0 and quality is always 80
            else if (getItem('Aged Brie')) {
                if (quality < 50) ++quality;
            }
            else if (getItem('Conjured')) quality -= 2; // we don't care about the 50 limit
            else if (getItem('Backstage passes')) {
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
