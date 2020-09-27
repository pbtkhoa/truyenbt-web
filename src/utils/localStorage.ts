import MangaChapter from '~/models/MangaChapter'
import MangaHistory from '~/models/MangaHistory'

const HISTORIES_MANGA = 'histories_manga'

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

  getHistoriesManga(): MangaHistory[] {
    return this.getStorage<MangaHistory[]>(HISTORIES_MANGA, [])
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

      const mangaHistories: MangaHistory[] = this.getHistoriesManga()
      const historyIdx: number = mangaHistories.findIndex((manga) => manga.slug === mangaChapter.slug)
      if (historyIdx > -1) {
        mangaHistories[historyIdx] = readingManga
      } else {
        mangaHistories.push(readingManga)
      }
      mangaHistories.sort(function (a, b) {
        return <any>new Date(b.readAt) - <any>new Date(a.readAt)
      })
      this.setStorage(HISTORIES_MANGA, mangaHistories)
    }
  },
}
