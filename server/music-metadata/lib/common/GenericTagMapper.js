"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const ID3v1Parser_1 = require("../id3v1/ID3v1Parser");
class CommonTagMapper {
    constructor(tagTypes, tagMap) {
        this.tagTypes = tagTypes;
        this.tagMap = tagMap;
    }
    static parseGenre(origVal) {
        // match everything inside parentheses
        const split = origVal.trim().split(/\((.*?)\)/g).filter(val => {
            return val !== '';
        });
        const array = [];
        for (let cur of split) {
            if (/^\d+$/.test(cur) && !isNaN(parseInt(cur, 10))) {
                cur = ID3v1Parser_1.Genres[cur];
            }
            array.push(cur);
        }
        return array
            .filter(val => {
            return val !== undefined;
        }).join('/');
    }
    static fixPictureMimeType(pictureType) {
        assert.ok(pictureType, 'pictureType should be defined');
        pictureType = pictureType.toLocaleLowerCase();
        switch (pictureType) {
            case 'image/jpg':
                return 'image/jpeg'; // ToDo: register warning
        }
        return pictureType;
    }
    static toIntOrNull(str) {
        const cleaned = parseInt(str, 10);
        return isNaN(cleaned) ? null : cleaned;
    }
    // TODO: a string of 1of1 would fail to be converted
    // converts 1/10 to no : 1, of : 10
    // or 1 to no : 1, of : 0
    static normalizeTrack(origVal) {
        const split = origVal.toString().split('/');
        return {
            no: parseInt(split[0], 10) || null,
            of: parseInt(split[1], 10) || null
        };
    }
    /**
     * Process and set common tags
     * write common tags to
     * @param tag Native tag
     * @param warnings Register warnings
     * @return common name
     */
    mapGenericTag(tag, warnings) {
        tag = { id: tag.id, value: tag.value }; // clone object
        this.postMap(tag, warnings);
        // Convert native tag event to generic 'alias' tag
        const id = this.getCommonName(tag.id);
        return id ? { id, value: tag.value } : null;
    }
    /**
     * Convert native tag key to common tag key
     * @tag  Native header tag
     * @return common tag name (alias)
     */
    getCommonName(tag) {
        return this.tagMap[tag];
    }
    /**
     * Handle post mapping exceptions / correction
     * @param {string} tag Tag e.g. {"©alb", "Buena Vista Social Club")
     * @param {warnings} Used to register warnings
     */
    postMap(tag, warnings) {
        return;
    }
}
exports.CommonTagMapper = CommonTagMapper;
CommonTagMapper.maxRatingScore = 1;
//# sourceMappingURL=GenericTagMapper.js.map