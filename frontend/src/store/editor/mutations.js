import { LocalStorage } from "quasar";
import {
    CONTENT_CACHE_KEY, CONTENT_LAST_SAVE_CACHE_KEY,
    CONTENT_LAST_SAVE_DATETIME_CACHE_KEY, FILENAME_CACHE_KEY
} from "src/config";

export function setFilename(state, filename) {
    state.filename = filename || ''
    LocalStorage.set(FILENAME_CACHE_KEY, filename)
}

export function setContentHTML(state, content) {
    state.content = content || ''
    LocalStorage.set(CONTENT_CACHE_KEY, content)
}

export function saveContentHTML(state, html) {
    LocalStorage.set(CONTENT_LAST_SAVE_CACHE_KEY, state.content)
}

export function setLastSave(state, lastSave) {
    const value = lastSave || new Date()
    state.lastSave = value
    LocalStorage.set(CONTENT_LAST_SAVE_DATETIME_CACHE_KEY, value)
}

export function setLastChange(state, lastChange) {
    state.lastChange = lastChange
}

export function setContentTokens(state, tokens) {
    state.contentTokens = tokens
}

export function toggleProfileMode(state) {
    const value = !state.profileModeOn
    state.profileModeOn = value
}
