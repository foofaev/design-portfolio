import * as _ from 'lodash';
import * as fp from 'lodash/fp';

// substrings with larger length goes at first due to #translit implementation
const enChars: string[] = ['shh', 'yo', 'zh', 'ch', 'sh', '``', 'y`', 'e`', 'yu', 'ya', ...'abvgdezijklmnoprstufхc`'.split('')];
const ruChars: string[] = ['щ', 'ё', 'ж', 'ч', 'ш', 'ъ', 'ы', 'э', 'ю', 'я', ...'абвгдезийклмнопрстуфхць'.split('')];


if (enChars.length !== ruChars.length) {
  throw new Error(
    `libs / translit: expected enChars.length (${enChars.length}) to equal ruChars.length (${ruChars.length})`,
  );
}

const enCharsMap = enChars.reduce((acc, char, index) => ({ ...acc, [char]: ruChars[index] }), {});
const ruCharsMap = ruChars.reduce((acc, char, index) => ({ ...acc, [char]: enChars[index] }), {});

type CharMap = {
  [key: string]: string,
};

const enCharsRegexp = new RegExp(`${enChars.join('|')}`, 'gi');
const ruCharsRegexp = new RegExp(`${ruChars.join('|')}`, 'gi');

function translit(source: string, regexp: RegExp, charMap: CharMap): string {
  return _.replace(_.toLower(source), regexp, (str: string) => charMap[str] || str);
}

function translitRuEn(source: string): string {
  return translit(source, ruCharsRegexp, ruCharsMap);
}

function translitEnRu(source: string): string {
  return translit(source, enCharsRegexp, enCharsMap);
}

function toURI(str: string, separator: string = '-') {
  return _.flow(
    fp.replace(/(<([^>]+)>)/ig)(''), // Strip tags
    translitRuEn,
    fp.replace(/\s+/g)(separator), // Strip whitespace into separator
    fp.replace(/[/\\:]+/g)(separator), // Slashes, ":"
    fp.replace(/[^\d\w\-+_]+/g)(separator), // Unsupported symbols
    fp.replace(new RegExp(`(${separator})+`, 'g'))(separator), // Multiple dashes
    fp.replace(/-([+_])-/g)('$1'),
    fp.replace(/^[-_]+|[-_]+$/g)(''), // Trim text for specific chars
  )(str);
}

export {
  translitEnRu,
  translitRuEn,
  toURI,
};
