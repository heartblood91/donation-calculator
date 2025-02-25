import { useState, useEffect } from 'react';
import type { TodoList, SubGroup, TodoSection } from '../types/action.types';

const STORAGE_KEY = 'collecte-todo';

const parseMarkdown = (markdown: string): TodoList => {
  const lines = markdown.split('\n').filter(line => line.trim());
  const todoList: TodoList = [];
  let currentSection: TodoSection | null = null;
  let currentSubGroup: SubGroup | null = null;
  let actionId = 0;

  lines.forEach(line => {
    if (line.startsWith('# ')) {
      // New section
      currentSection = {
        title: line.slice(2).trim(),
        subGroups: []
      };
      todoList.push(currentSection);
      currentSubGroup = null;
    } else if (line.startsWith('## ')) {
      // New sub-group
      if (currentSection) {
        currentSubGroup = {
          title: line.slice(3).trim(),
          actions: []
        };
        currentSection.subGroups.push(currentSubGroup);
      }
    } else if (line.trim() && currentSubGroup) {
      // New action
      const text = line.trim();
      currentSubGroup.actions.push({
        id: `action-${actionId++}`,
        text,
        checked: false
      });
    }
  });

  return todoList;
};

const loadMarkdownFile = async (): Promise<TodoList> => {
  try {
    const response = await fetch('/src/data/actions.md');
    if (!response.ok) throw new Error('Failed to load Markdown file');
    const markdown = await response.text();
    return parseMarkdown(markdown);
  } catch (error) {
    console.error('Error loading Markdown file:', error);
    return [];
  }
};

const isClient = typeof window !== 'undefined';

const isLocalStorageAvailable = () => {
  if (!isClient) return false;
  
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<TodoList>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage or Markdown file
  useEffect(() => {
    const initializeTodoList = async () => {
      if (!isInitialized) {
        if (isLocalStorageAvailable()) {
          try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
              const parsedList = JSON.parse(saved);
              // Validate the structure
              if (Array.isArray(parsedList) && parsedList.every(section => 
                section && 
                typeof section === 'object' && 
                Array.isArray(section.subGroups)
              )) {
                setTodoList(parsedList);
                setIsInitialized(true);
                return;
              }
            }
          } catch (error) {
            console.error('Error loading saved todo list:', error);
          }
        }
        
        // If no valid data in localStorage, load from Markdown
        const markdownTodoList = await loadMarkdownFile();
        setTodoList(markdownTodoList);
        setIsInitialized(true);
      }
    };

    initializeTodoList();
  }, [isInitialized]);

  // Save to localStorage when todoList changes
  useEffect(() => {
    if (isInitialized && isLocalStorageAvailable()) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
      } catch (error) {
        console.error('Error saving todo list:', error);
      }
    }
  }, [todoList, isInitialized]);

  const toggleItem = (sectionIndex: number, subGroupIndex: number, actionId: string) => {
    setTodoList(prevList => {
      if (!Array.isArray(prevList)) {
        return [];
      }

      const newList = [...prevList];
      const section = newList[sectionIndex];
      
      if (!section || !Array.isArray(section.subGroups)) {
        return prevList;
      }

      const subGroup = section.subGroups[subGroupIndex];
      
      if (!subGroup || !Array.isArray(subGroup.actions)) {
        return prevList;
      }

      const actionIndex = subGroup.actions.findIndex(action => action && action.id === actionId);
      
      if (actionIndex === -1) {
        return prevList;
      }

      // Create new references for immutability
      const newList2 = [...prevList];
      const newSection = { ...newList2[sectionIndex] };
      const newSubGroups = [...newSection.subGroups];
      const newSubGroup = { ...newSubGroups[subGroupIndex] };
      const newActions = [...newSubGroup.actions];
      
      newActions[actionIndex] = {
        ...newActions[actionIndex],
        checked: !newActions[actionIndex].checked
      };
      
      newSubGroup.actions = newActions;
      newSubGroups[subGroupIndex] = newSubGroup;
      newSection.subGroups = newSubGroups;
      newList2[sectionIndex] = newSection;
      
      return newList2;
    });
  };

  const calculateProgress = () => {
    if (!Array.isArray(todoList)) return 0;

    let totalItems = 0;
    let completedItems = 0;

    todoList.forEach(section => {
      if (section && Array.isArray(section.subGroups)) {
        section.subGroups.forEach(subGroup => {
          if (subGroup && Array.isArray(subGroup.actions)) {
            totalItems += subGroup.actions.length;
            completedItems += subGroup.actions.filter(action => action.checked).length;
          }
        });
      }
    });

    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  const getEmailContent = () => {
    if (!Array.isArray(todoList)) return '';

    let text = "Actions recommandées pour optimiser la collecte\n\n";
    
    todoList.forEach(section => {
      if (section && section.title) {
        text += `${section.title}\n\n`;
        
        if (Array.isArray(section.subGroups)) {
          section.subGroups.forEach(subGroup => {
            if (subGroup && subGroup.title && Array.isArray(subGroup.actions)) {
              text += `${subGroup.title}\n\n`;
              
              const checkedActions = subGroup.actions.filter(action => action.checked);
              const uncheckedActions = subGroup.actions.filter(action => !action.checked);
              
              if (checkedActions.length > 0) {
                text += "✅ Actions planifiées :\n";
                checkedActions.forEach(action => {
                  text += `- ${action.text}\n`;
                });
                text += "\n";
              }
              
              if (uncheckedActions.length > 0) {
                text += "📋 Actions à considérer :\n";
                uncheckedActions.forEach(action => {
                  text += `- ${action.text}\n`;
                });
                text += "\n";
              }
            }
          });
        }
      }
    });

    return text;
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Plan d'actions pour la collecte");
    const body = encodeURIComponent(getEmailContent());
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return {
    todoList,
    toggleItem,
    calculateProgress,
    handleEmailShare,
  };
}; 