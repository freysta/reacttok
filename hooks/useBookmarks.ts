import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@reacttok_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
  };

  const toggleBookmark = async (id: string) => {
    try {
      let newBookmarks;
      if (bookmarks.includes(id)) {
        newBookmarks = bookmarks.filter(b => b !== id);
      } else {
        newBookmarks = [...bookmarks, id];
      }
      
      setBookmarks(newBookmarks);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
    } catch (e) {
      console.error('Failed to toggle bookmark', e);
    }
  };

  const isBookmarked = (id: string) => bookmarks.includes(id);

  return { bookmarks, toggleBookmark, isBookmarked, refreshBookmarks: loadBookmarks };
}
