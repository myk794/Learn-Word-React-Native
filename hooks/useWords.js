import { useCallback, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';

// Merkezi kelime veri erişimi. SELECT/INSERT/DELETE mantığı ekranlara
// dağılmasın diye tek yerde toplanır.
export default function useWords() {
  const db = useSQLiteContext();
  const [words, setWords] = useState([]);

  const refresh = useCallback(async () => {
    const result = await db.getAllAsync('SELECT * FROM words');
    setWords(result);
    return result;
  }, [db]);

  const addWord = useCallback(
    async (en, tr) => {
      await db.runAsync('INSERT INTO words (en, tr) VALUES (?, ?)', [en, tr]);
      return refresh();
    },
    [db, refresh]
  );

  const deleteWord = useCallback(
    async (id) => {
      await db.runAsync('DELETE FROM words WHERE id = ?', [id]);
      return refresh();
    },
    [db, refresh]
  );

  // Bir kelime paketini toplu ekler; mevcut kelimeleri (en, buyuk/kucuk harf
  // duyarsiz) atlar. Gercekten eklenen kelime sayisini dondurur.
  const addWords = useCallback(
    async (list) => {
      const existing = await db.getAllAsync('SELECT en FROM words');
      const existingSet = new Set(
        existing.map((w) => w.en.trim().toLowerCase())
      );
      const toInsert = list.filter(
        (w) => !existingSet.has(w.en.trim().toLowerCase())
      );
      await db.withTransactionAsync(async () => {
        for (const w of toInsert) {
          await db.runAsync('INSERT INTO words (en, tr) VALUES (?, ?)', [
            w.en.trim(),
            w.tr.trim(),
          ]);
        }
      });
      await refresh();
      return toInsert.length;
    },
    [db, refresh]
  );

  return { words, count: words.length, refresh, addWord, addWords, deleteWord };
}
