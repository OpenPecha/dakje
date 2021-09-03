export function extractHTMLContent (html) {
    const tokens = (html || '').split('<body>')
    return (tokens.length > 1 )
        ? tokens[1].replace('</body>', '').replace('</html>', '')
        : tokens[0]
}
