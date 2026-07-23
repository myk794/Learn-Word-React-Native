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

  return { words, count: words.length, refresh, addWord, deleteWord };
}
