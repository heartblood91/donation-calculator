import { FC } from 'react';
import type { TodoList as TodoListType, SubGroup, Action } from '../types/action.types';
import { Header } from './Header';
import { Card } from './ui/Card';
import { Container, Stack, Checkbox, FormControlLabel } from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

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
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        <Card sx={{ overflow: 'hidden' }}>
          <Header
            title="Actions pour optimiser la collecte"
            progress={progress}
            onShare={handleEmailShare}
            onNavigate={onBack}
            isCalculator={false}
          />

          <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todoList.map((section, sectionIndex) => {
                if (!section || !Array.isArray(section.subGroups)) return null;

                return (
                  <Card key={sectionIndex}>
                    <Stack spacing={2}>
                      <h2 className="text-xl font-bold text-[#2DA4A8] pb-2 border-b border-[#2DA4A8]/10">
                        {section.title}
                      </h2>
                      {section.subGroups.map((subGroup: SubGroup, subGroupIndex: number) => {
                        if (!subGroup || !Array.isArray(subGroup.actions)) return null;

                        return (
                          <div key={subGroupIndex} className="pt-2">
                            <h3 className="text-base font-semibold text-[#1B3168] mb-3 pb-1 border-b border-[#1B3168]/10">
                              {subGroup.title}
                            </h3>
                            <Stack spacing={0.5}>
                              {subGroup.actions.map((action: Action) => {
                                if (!action || !action.id) return null;

                                return (
                                  <FormControlLabel
                                    key={action.id}
                                    control={
                                      <Checkbox
                                        size="small"
                                        checked={action.checked}
                                        onChange={() => toggleItem(sectionIndex, subGroupIndex, action.id)}
                                        icon={<CheckBoxOutlineBlank fontSize="small" />}
                                        checkedIcon={<CheckBox fontSize="small" />}
                                        sx={{
                                          padding: '0.25rem',
                                          '& .MuiSvgIcon-root': {
                                            fontSize: '1rem',
                                          },
                                          '&.Mui-checked': {
                                            color: '#2DA4A8',
                                          },
                                        }}
                                      />
                                    }
                                    label={action.text}
                                    sx={{
                                      margin: 0,
                                      padding: '0.25rem',
                                      borderRadius: '0.5rem',
                                      width: '100%',
                                      '& .MuiFormControlLabel-label': {
                                        fontSize: '0.875rem',
                                        marginLeft: '0.25rem',
                                        color: '#374151',
                                      },
                                      '&:hover': {
                                        backgroundColor: '#E5F5F5',
                                      },
                                    }}
                                  />
                                );
                              })}
                            </Stack>
                          </div>
                        );
                      })}
                    </Stack>
                  </Card>
                );
              })}
            </div>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}; 