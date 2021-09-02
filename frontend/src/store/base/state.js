import { LocalStorage } from "quasar"
import { MENU_OPEN_CACHE_KEY } from "src/config"

export default function () {
  return {
    menuOpen: LocalStorage.getItem(MENU_OPEN_CACHE_KEY)
  }
}
