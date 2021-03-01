export default async function fetchEntry(numEntry = null) {

    let numEntryPrefix = '';
    if(numEntry) numEntryPrefix = `/${numEntry}`;
    const URL_CURRENT_COMICS_JSON = `https://xkcd.com${numEntryPrefix}/info.0.json`;

    let response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(URL_CURRENT_COMICS_JSON)}`)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        const jsonResponse = await response.json();
        return JSON.parse(jsonResponse.contents);
    }
}
