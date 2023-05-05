const XRegExp = require('XRegExp')

function detectWord(word) {
    const scores = {}

    const regexes = {
        // en: /[a-zA-Z]+/gi,
        en: XRegExp('\\p{Latin}', 'gi'),
        zh: XRegExp('\\p{Han}', 'gi'),
        hi: XRegExp('\\p{Devanagari}', 'gi'),
        ar: XRegExp('\\p{Arabic}', 'gi'),
        bn: XRegExp('\\p{Bengali}', 'gi'),
        he: XRegExp('\\p{Hebrew}', 'gi'),
        ru: XRegExp('\\p{Cyrillic}', 'gi'),
        jp: XRegExp('[\\p{Hiragana}\\p{Katakana}]', 'gi'),
        pa: XRegExp('\\p{Gurmukhi}', 'gi'),
    }

    for (const [lang, regex] of Object.entries(regexes)) {

        const matches = XRegExp.match(word, regex) || []
        const score = matches.length / word.length
        if (score) {
            // high percentage, return result
            if (score > 0.85) {
                return lang
            }
            scores[lang] = score
        }
    }

    if (Object.keys(scores).length == 0) return null    
    return Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b))

}

function detectLang(text) {
    const words = text
        .trim()
        .split(/s+/)
        .map(word => {
            return detectWord(word)
        })

    const langCount = words.reduce((acc, lang) => {
        if(lang) {
            acc[lang] = (acc[lang] || 0) + 1
        }
        return acc
    }, {})

    return Object.keys(langCount).reduce((a, b) => (langCount[a] > langCount[b] ? a : b)) || null
}

module.exports = detectLang