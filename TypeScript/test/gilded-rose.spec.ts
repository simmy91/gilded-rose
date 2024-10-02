import { expect } from 'chai';
import { GildedRose, getItem } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    it('should foo', function() {
        GildedRose.items = [{ name: 'foo', sellIn: 0, quality: 0 }];
        GildedRose.updateQuality();
        expect(GildedRose.items[0].name).to.equal('foo');
    });
});

/**
 * @todo: add more erroneous data tests
 */
describe('getItem', function () {
    it('should return undefined if items empty', () => {
        GildedRose.items = [];
        expect(getItem('test1')).to.be.undefined;
    });

    it('should return undefined if test1 not found', () => {
        GildedRose.items = [
            { name: 'test3', sellIn: 1, quality: 1 },
            { name: 'test4', sellIn: 0, quality: 0 },
        ];
        expect(getItem('test1')).to.be.undefined;
    });

    it('should return undefined if test1 is case-sensitive', () => {
        GildedRose.items = [
            { name: 'TeSt1', sellIn: 1, quality: 0 },
        ];
        expect(getItem('test1')).to.be.undefined;
    });

    it('should return test1 object', () => {
        GildedRose.items = [
            { name: 'test1', sellIn: 1, quality: 0 },
            { name: 'test2', sellIn: 0, quality: 1 },
            { name: 'test3', sellIn: 1, quality: 1 },
            { name: 'test4', sellIn: 0, quality: 0 },
        ];
        expect(getItem('test1')).to.have.deep.property('name', 'test1');
        expect(getItem('test1')).to.have.deep.property('sellIn', 1);
        expect(getItem('test1')).to.have.deep.property('quality', 0);
    });
});
