import { LocalStorage } from "quasar";
import {
    CONTENT_CACHE_KEY, CONTENT_LAST_SAVE_CACHE_KEY,
    CONTENT_LAST_SAVE_DATETIME_CACHE_KEY, FILENAME_CACHE_KEY
} from "src/config";

export function setFilename(state, filename) {
    state.filename = filename || ''
    LocalStorage.set(FILENAME_CACHE_KEY, filename)
}

export function setContentHTML(state, html) {
    state.contentHTML = html || ''
    LocalStorage.set(CONTENT_CACHE_KEY, html)
}

export function saveContentHTML(state, html) {
    LocalStorage.set(CONTENT_LAST_SAVE_CACHE_KEY, state.contentHTML)
}

export function setLastSave(state, lastSave) {
    const value = lastSave || new Date()
    state.lastSave = value
    LocalStorage.set(CONTENT_LAST_SAVE_DATETIME_CACHE_KEY, value)
}

export function setLastChange(state, lastChange) {
    state.lastChange = lastChange
}
