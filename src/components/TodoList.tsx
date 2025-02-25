import { FC } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import type { TodoList as TodoListType, SubGroup, Action } from '../types/action.types';
import { Header } from './Header';

interface TodoListProps {
  onBack: () => void;
  todoList: TodoListType;
  progress: number;
  toggleItem: (sectionIndex: number, subGroupIndex: number, actionId: string) => void;
  handleEmailShare: () => void;
}

export const TodoList: FC<TodoListProps> = ({
  onBack,
  todoList,
  progress,
  toggleItem,
  handleEmailShare
}) => {
  if (!Array.isArray(todoList)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 antialiased">
      <div className="max-w-[1400px] mx-auto py-4 px-4 md:py-8">
        <div className="bg-white rounded-xl shadow-xl">
          <Header
            title="Actions pour optimiser la collecte"
            progress={progress}
            onShare={handleEmailShare}
            onNavigate={onBack}
            isCalculator={false}
          />

          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todoList.map((section, sectionIndex) => {
                if (!section || !Array.isArray(section.subGroups)) return null;

                return (
                  <div key={sectionIndex} className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      {section.title}
                    </h2>
                    <div className="space-y-6">
                      {section.subGroups.map((subGroup: SubGroup, subGroupIndex: number) => {
                        if (!subGroup || !Array.isArray(subGroup.actions)) return null;

                        return (
                          <div key={subGroupIndex}>
                            <h3 className="text-lg font-medium text-gray-800 mb-3">
                              {subGroup.title}
                            </h3>
                            <div className="space-y-2">
                              {subGroup.actions.map((action: Action) => {
                                if (!action || !action.id) return null;

                                return (
                                  <button
                                    key={action.id}
                                    onClick={() => toggleItem(sectionIndex, subGroupIndex, action.id)}
                                    className="w-full group flex items-start gap-3 px-3 py-2 bg-white hover:bg-[#E5F5F5] rounded-lg transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#2DA4A8] focus:ring-offset-2 touch-manipulation"
                                    role="checkbox"
                                    aria-checked={action.checked}
                                  >
                                    <div className="flex-shrink-0 mt-0.5">
                                      {action.checked ? (
                                        <CheckSquare className="w-5 h-5 text-[#2DA4A8]" />
                                      ) : (
                                        <Square className="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
                                      )}
                                    </div>
                                    <span className="text-gray-700 text-sm sm:text-base group-hover:text-gray-900">
                                      {action.text}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 