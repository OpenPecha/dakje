import { LocalStorage } from "quasar";
import { MENU_OPEN_CACHE_KEY } from "src/config";

export function toggleMenu(state) {
    const value = !state.menuOpen
    state.menuOpen = value
    LocalStorage.set(MENU_OPEN_CACHE_KEY, value)
}
