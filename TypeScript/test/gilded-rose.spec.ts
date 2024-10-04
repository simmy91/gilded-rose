import { expect } from 'chai';
import { GildedRose, getBackstagePassesQuality } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    it('should foo', function() {
        GildedRose.items = [{ name: 'foo', sellIn: 0, quality: 0 }];
        GildedRose.updateQuality();
        expect(GildedRose.items[0].name).to.equal('foo');
    });
});

describe('updateQuality', function () {
    describe('Sulfuras', function () {
        it('should retain quality at 80 always', () => {
            GildedRose.items = [
                { name: 'Sulfuras', sellIn: 0, quality: 80 },
            ];
            let count = 0;
            while (count < 7) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(80);
                count++;
            }  
        });

        it('should retain sellIn at 0 always', () => {
            GildedRose.items = [
                { name: 'Sulfuras', sellIn: 0, quality: 80 },
            ];
            let count = 0;
            while (count < 7) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].sellIn).to.equal(0);
                count++;
            }  
        });
    });
    
    describe('Aged Brie', function () {
        it('should increment quality by 1 each day', () => {
            GildedRose.items = [
                { name: 'Aged Brie', sellIn: 20, quality: 20 },
            ];
            const qualityOutputs = [21,22,23,24,25,26,27];
            let count = 0;
            while (count < qualityOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(qualityOutputs[count]);
                count++;
            }  
        });

        it('should retain quality at 50 when reached', () => {
            GildedRose.items = [
                { name: 'Aged Brie', sellIn: 20, quality: 48 },
            ];
            const qualityOutputs = [49,50,50,50,50,50,50];
            let count = 0;
            while (count < qualityOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(qualityOutputs[count]);
                count++;
            }  
        });

        it('should decrement sellIn by 1 each day', () => {
            GildedRose.items = [
                { name: 'Aged Brie', sellIn: 15, quality: 25 },
            ];
            const sellInOutputs = [14,13,12,11,10,9,8];
            let count = 0;
            while (count < sellInOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].sellIn).to.equal(sellInOutputs[count]);
                count++;
            }  
        });
    });

    describe('Conjured', function () {
        it('should decrement quality by 2 each day - degrades twice as fast', () => {
            GildedRose.items = [
                { name: 'Conjured', sellIn: 10, quality: 30 },
            ];
            const qualityOutputs = [28,26,24,22,20,18,16];
            let count = 0;
            while (count < qualityOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(qualityOutputs[count]);
                count++;
            }  
        });

        it('should decrement sellIn by 1 each day', () => {
            GildedRose.items = [
                { name: 'Conjured', sellIn: 20, quality: 5 },
            ];
            const sellInOutputs = [19,18,17,16,15,14,13];
            let count = 0;
            while (count < sellInOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].sellIn).to.equal(sellInOutputs[count]);
                count++;
            }  
        });
    });

    describe('Backstage passes', function () {
        it('should increment quality by 1 if sellIn is over 10 days', () => {
            GildedRose.items = [
                { name: 'Backstage passes', sellIn: 45, quality: 19 },
            ];
            const qualityOutputs = [20,21,22,23,24,25,26];
            let count = 0;
            while (count < qualityOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(qualityOutputs[count]);
                count++;
            }  
        });

        it('should increment quality by 2 if sellIn is within 10 days', () => {
            GildedRose.items = [
                { name: 'Backstage passes', sellIn: 13, quality: 19 },
            ];
            const qualityOutputs = [20,21,22,24,26,28,30];
            let count = 0;
            while (count < qualityOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(qualityOutputs[count]);
                count++;
            }  
        });

        it('should increment quality by 3 if sellIn is within 5 days', () => {
            GildedRose.items = [
                { name: 'Backstage passes', sellIn: 8, quality: 19 },
            ];
            const qualityOutputs = [21,23,25,28,31,34,37];
            let count = 0;
            while (count < qualityOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(qualityOutputs[count]);
                count++;
            }  
        });

        it('should set quality to 0 if sellIn has expired', () => {
            GildedRose.items = [
                { name: 'Backstage passes', sellIn: 0, quality: 19 },
            ];
            const qualityOutputs = [0,0,0,0,0,0,0];
            let count = 0;
            while (count < qualityOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(qualityOutputs[count]);
                count++;
            }  
        });

        it('should retain quality at 50 when reached', () => {
            GildedRose.items = [
                { name: 'Backstage passes', sellIn: 25, quality: 48 },
            ];
            const qualityOutputs = [49,50,50,50,50,50,50];
            let count = 0;
            while (count < qualityOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(qualityOutputs[count]);
                count++;
            }  
        });

        it('should decrement sellIn by 1 each day', () => {
            GildedRose.items = [
                { name: 'Backstage passes', sellIn: 25, quality: 48 },
            ];
            const sellInOutputs = [24,23,22,21,20,19,18];
            let count = 0;
            while (count < sellInOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].sellIn).to.equal(sellInOutputs[count]);
                count++;
            }  
        });
    });

    describe('other', function () {
        it('should decrement quality by 1 each day if sellIn > 0', () => {
            GildedRose.items = [
                { name: 'other', sellIn: 14, quality: 23 },
            ];
            const qualityOutputs = [22,21,20,19,18,17,16];
            let count = 0;
            while (count < qualityOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(qualityOutputs[count]);
                count++;
            }  
        });

        it('should decrement quality by 2 each day if sellIn <= 0 (expired) - degrades twice as fast', () => {
            GildedRose.items = [
                { name: 'other', sellIn: 5, quality: 23 },
            ];
            const qualityOutputs = [22,21,20,19,18,16,14];
            let count = 0;
            while (count < qualityOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].quality).to.equal(qualityOutputs[count]);
                count++;
            }  
        });

        it('should decrement sellIn by 1 each day', () => {
            GildedRose.items = [
                { name: 'other', sellIn: 25, quality: 48 },
            ];
            const sellInOutputs = [24,23,22,21,20,19,18];
            let count = 0;
            while (count < sellInOutputs.length) { // 7 days
                GildedRose.updateQuality();
                expect(GildedRose.items[0].sellIn).to.equal(sellInOutputs[count]);
                count++;
            }  
        });
    });
});

describe('getBackstagePassesQuality()', function () {
    it('should increment quality by 1 if sellIn is over 10 days', () => {
        const item = { name: 'Backstage passes', sellIn: 45, quality: 19 };
        expect(getBackstagePassesQuality(item)).to.equal(20);
    });

    it('should increment quality by 2 if sellIn is within 10 days', () => {
        const item = { name: 'Backstage passes', sellIn: 7, quality: 19 };
        expect(getBackstagePassesQuality(item)).to.equal(21);
    });

    it('should increment quality by 3 if sellIn is within 5 days', () => {
        const item = { name: 'Backstage passes', sellIn: 3, quality: 19 };
        expect(getBackstagePassesQuality(item)).to.equal(22);
    });

    it('should set quality to 0 if sellIn has expired', () => {
        const item = { name: 'Backstage passes', sellIn: 0, quality: 19 };
        expect(getBackstagePassesQuality(item)).to.equal(0);
    });

    it('should retain quality at 50 when reached', () => {
       const item = { name: 'Backstage passes', sellIn: 45, quality: 50 };
        expect(getBackstagePassesQuality(item)).to.equal(50);
    });
});
