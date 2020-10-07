import MangaChapter from '~/models/MangaChapter'
import MangaHistory from '~/models/MangaHistory'

const HISTORY_MANGAS = 'history_manga'

export default {
  hasWindow() {
    return typeof window !== 'undefined'
  },
  setStorage(key: string, value: any) {
    if (this.hasWindow()) {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  },
  getStorage<T>(key: string, defaultValue: T): T {
    if (this.hasWindow()) {
      const value = window.localStorage.getItem(key)
      if (value) {
        return JSON.parse(value) || defaultValue
      }
    }

    return defaultValue
  },
  getHistoryMangas(): MangaHistory[] {
    return this.getStorage<MangaHistory[]>(HISTORY_MANGAS, [])
  },
  saveHistoryManga(mangaChapter: MangaChapter): void {
    if (this.hasWindow()) {
      const readingManga: MangaHistory = {
        slug: mangaChapter.slug,
        name: mangaChapter.name,
        imagePreview: mangaChapter.imagePreview,
        chapterNumber: mangaChapter.chapter.number,
        readAt: new Date().toISOString(),
      }

      const historyMangas: MangaHistory[] = this.getHistoryMangas()
      const mangaIdx: number = historyMangas.findIndex((manga) => manga.slug === mangaChapter.slug)
      if (mangaIdx > -1) {
        historyMangas[mangaIdx] = readingManga
      } else {
        historyMangas.push(readingManga)
      }
      historyMangas.sort(function (a, b) {
        return <any>new Date(b.readAt) - <any>new Date(a.readAt)
      })
      this.setStorage(HISTORY_MANGAS, historyMangas)
    }
  },
}
