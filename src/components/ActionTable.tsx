import { FC, useState, useEffect } from 'react';
import { ArrowLeft, CheckSquare, Square, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import type { ActionGroups } from '../types/action.types';

interface ActionTableProps {
  onBack: () => void;
  groups: ActionGroups;
  toggleAction: (groupIndex: number, subGroupIndex: number, actionId: string) => void;
  handleEmailShare: () => void;
}

export const ActionTable: FC<ActionTableProps> = ({ 
  onBack, 
  groups, 
  toggleAction, 
  handleEmailShare 
}) => {
  // Initialize states with default values
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>(() => {
    return groups.reduce((acc, _, index) => {
      acc[index] = true;
      return acc;
    }, {} as Record<number, boolean>);
  });

  const [expandedSubGroups, setExpandedSubGroups] = useState<Record<string, boolean>>(() => {
    return groups.reduce((acc, group, groupIndex) => {
      if (Array.isArray(group.subGroups)) {
        group.subGroups.forEach((_, subGroupIndex) => {
          acc[`${groupIndex}-${subGroupIndex}`] = true;
        });
      }
      return acc;
    }, {} as Record<string, boolean>);
  });

  // Update states when groups change
  useEffect(() => {
    const newExpandedGroups = groups.reduce((acc, _, index) => {
      // Keep previous state if available
      acc[index] = expandedGroups[index] ?? true;
      return acc;
    }, {} as Record<number, boolean>);

    const newExpandedSubGroups = groups.reduce((acc, group, groupIndex) => {
      if (Array.isArray(group.subGroups)) {
        group.subGroups.forEach((_, subGroupIndex) => {
          const key = `${groupIndex}-${subGroupIndex}`;
          // Keep previous state if available
          acc[key] = expandedSubGroups[key] ?? true;
        });
      }
      return acc;
    }, {} as Record<string, boolean>);

    setExpandedGroups(newExpandedGroups);
    setExpandedSubGroups(newExpandedSubGroups);
  }, [groups]);

  const toggleGroup = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedGroups(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleSubGroup = (groupIndex: number, subGroupIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = `${groupIndex}-${subGroupIndex}`;
    setExpandedSubGroups(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleActionClick = (groupIndex: number, subGroupIndex: number, actionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleAction(groupIndex, subGroupIndex, actionId);
  };

  const isSubGroupExpanded = (groupIndex: number, subGroupIndex: number) => {
    return expandedSubGroups[`${groupIndex}-${subGroupIndex}`] ?? false;
  };

  // Calculate global progress
  const calculateProgress = () => {
    let totalActions = 0;
    let completedActions = 0;

    groups.forEach(group => {
      group.subGroups.forEach(subGroup => {
        totalActions += subGroup.actions.length;
        completedActions += subGroup.actions.filter(a => a.checked).length;
      });
    });

    return totalActions > 0 ? (completedActions / totalActions) * 100 : 0;
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 antialiased">
      <div className="max-w-[1400px] mx-auto py-4 px-4 md:py-8">
        <div className="bg-white rounded-xl shadow-xl">
          {/* Header with progress bar */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 rounded-t-xl">
            {/* Mobile header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2"
                  title="Retour à la calculette"
                  aria-label="Retour à la calculette"
                >
                  <ArrowLeft className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-600">Retour à la calculette</span>
                </button>
              </div>
              <button
                onClick={handleEmailShare}
                className="text-orange-600 px-3 py-1.5 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-2"
                aria-label="Partager par email"
              >
                <span>Partager</span>
                <Mail className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 md:hidden">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Actions pour optimiser la collecte
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-100 rounded-full h-2 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-500 shadow"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  {Math.round(progress)}% complété
                </span>
              </div>
            </div>

            {/* Desktop header */}
            <div className="hidden md:flex flex-row items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={onBack}
                  className="group flex items-center gap-2 px-3 py-2 hover:bg-orange-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 touch-manipulation"
                  title="Retour à la calculette"
                  aria-label="Retour à la calculette"
                >
                  <ArrowLeft className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-600 group-hover:text-gray-900">Retour à la calculette</span>
                </button>
                <div className="h-8 w-px bg-gray-200" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    Actions pour optimiser la collecte
                  </h1>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-full bg-gray-100 rounded-full h-2.5 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full transition-all duration-500 shadow"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      {Math.round(progress)}% complété
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleEmailShare}
                className="min-h-[44px] px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:from-orange-700 hover:to-orange-600 active:from-orange-800 active:to-orange-700 transition-all shadow-lg hover:shadow-xl active:shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 touch-manipulation"
                aria-label="Partager par email"
              >
                <Mail className="w-5 h-5 mr-2" />
                <span>Partager par email</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            {(!Array.isArray(groups) || groups.length === 0) ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading actions...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {groups.map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden h-fit hover:shadow-md transition-shadow"
                  >
                    {/* Group Header with progress */}
                    <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                      <button
                        onClick={(e) => toggleGroup(groupIndex, e)}
                        className="w-full min-h-[44px] flex items-center justify-between p-4 hover:bg-gray-50/80 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 touch-manipulation"
                        aria-expanded={expandedGroups[groupIndex]}
                      >
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold text-gray-900 text-left">
                            {group.title}
                          </h2>
                          {/* Group progress */}
                          <div className="mt-2 flex items-center gap-2">
                            <div className="w-full bg-gray-100 rounded-full h-1.5 shadow-inner">
                              <div
                                className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full transition-all duration-500"
                                style={{
                                  width: `${group.subGroups.reduce((acc, subGroup) => {
                                    const total = subGroup.actions.length;
                                    const completed = subGroup.actions.filter(a => a.checked).length;
                                    return acc + (completed / total) * 100;
                                  }, 0) / group.subGroups.length}%`
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <span className="ml-2 flex-shrink-0">
                          {expandedGroups[groupIndex] ? (
                            <ChevronUp className="w-5 h-5 text-orange-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-orange-600" />
                          )}
                        </span>
                      </button>
                    </div>

                    {/* SubGroups with enhanced styling */}
                    {expandedGroups[groupIndex] && Array.isArray(group.subGroups) && (
                      <div className="divide-y divide-gray-100">
                        {group.subGroups.map((subGroup, subGroupIndex) => (
                          <div key={subGroupIndex} className="bg-white transition-colors">
                            <div className="border-l-2 border-transparent hover:border-orange-200 transition-colors">
                              <button
                                onClick={(e) => toggleSubGroup(groupIndex, subGroupIndex, e)}
                                className="w-full min-h-[44px] flex items-center justify-between p-4 hover:bg-orange-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 touch-manipulation"
                                aria-expanded={isSubGroupExpanded(groupIndex, subGroupIndex)}
                              >
                                <div className="flex-1">
                                  <h3 className="text-base font-medium text-gray-800 text-left">
                                    {subGroup.title}
                                  </h3>
                                  {/* Subgroup progress */}
                                  <div className="mt-1.5 flex items-center gap-2">
                                    <div className="w-full bg-gray-100 rounded-full h-1 shadow-inner">
                                      <div
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-1 rounded-full transition-all duration-500"
                                        style={{
                                          width: `${(subGroup.actions.filter(a => a.checked).length / subGroup.actions.length) * 100}%`
                                        }}
                                      />
                                    </div>
                                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                                      {subGroup.actions.filter(a => a.checked).length}/{subGroup.actions.length}
                                    </span>
                                  </div>
                                </div>
                                <span className="ml-2 flex-shrink-0">
                                  {isSubGroupExpanded(groupIndex, subGroupIndex) ? (
                                    <ChevronUp className="w-4 h-4 text-orange-600" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-orange-600" />
                                  )}
                                </span>
                              </button>

                              {/* Actions with enhanced styling */}
                              {isSubGroupExpanded(groupIndex, subGroupIndex) && Array.isArray(subGroup.actions) && (
                                <div className="pl-4 pr-3 pb-3">
                                  <div className="space-y-1.5">
                                    {subGroup.actions.map((action) => (
                                      <button
                                        key={action.id}
                                        onClick={(e) => handleActionClick(groupIndex, subGroupIndex, action.id, e)}
                                        className="w-full group flex items-start gap-3 px-3 py-2 bg-white hover:bg-orange-50 rounded-lg transition-all text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 touch-manipulation"
                                        role="checkbox"
                                        aria-checked={action.checked}
                                      >
                                        <div className="flex-shrink-0 mt-0.5">
                                          {action.checked ? (
                                            <CheckSquare className="w-5 h-5 text-orange-600" />
                                          ) : (
                                            <Square className="w-5 h-5 text-gray-400 group-hover:text-gray-500" />
                                          )}
                                        </div>
                                        <span className="text-gray-700 text-sm sm:text-base group-hover:text-gray-900">
                                          {action.text}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};