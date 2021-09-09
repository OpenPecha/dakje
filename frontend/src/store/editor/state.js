import { LocalStorage } from "quasar";
import {
  CONTENT_CACHE_KEY, CONTENT_LAST_SAVE_CACHE_KEY, FILENAME_CACHE_KEY
} from "src/config";


export default function () {
  return {
    filename: LocalStorage.getItem(FILENAME_CACHE_KEY),
    content: LocalStorage.getItem(CONTENT_CACHE_KEY),
    lastSave: LocalStorage.getItem(CONTENT_LAST_SAVE_CACHE_KEY),
    lastChange: null,
  }
}
