import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MyContent {
  id: string;
  title: string;
  desc: string;
  shortCode: string;
  fullExplanation: string;
  fullCode: string;
  level: string;
  createdAt: string;
}

const MY_CONTENT_KEY = '@reacttok_my_content';

export function useMyContent() {
  const [myContent, setMyContent] = useState<MyContent[]>([]);

  useEffect(() => {
    loadMyContent();
  }, []);

  const loadMyContent = async () => {
    try {
      const stored = await AsyncStorage.getItem(MY_CONTENT_KEY);
      if (stored) {
        setMyContent(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load my content', e);
    }
  };

  const addMyContent = async (content: Omit<MyContent, 'id' | 'createdAt'>) => {
    try {
      const newContent: MyContent = {
        ...content,
        id: `my-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      const updated = [newContent, ...myContent];
      setMyContent(updated);
      await AsyncStorage.setItem(MY_CONTENT_KEY, JSON.stringify(updated));
      
      return newContent;
    } catch (e) {
      console.error('Failed to add my content', e);
      return null;
    }
  };

  const removeMyContent = async (id: string) => {
    try {
      const updated = myContent.filter(c => c.id !== id);
      setMyContent(updated);
      await AsyncStorage.setItem(MY_CONTENT_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to remove my content', e);
    }
  };

  return { myContent, addMyContent, removeMyContent, refreshMyContent: loadMyContent };
}