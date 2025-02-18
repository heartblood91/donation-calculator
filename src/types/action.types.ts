export interface Action {
  id: string;
  text: string;
  checked: boolean;
}

export interface SubGroup {
  title: string;
  actions: Action[];
}

export interface ActionGroup {
  title: string;
  subGroups: SubGroup[];
}

export type ActionGroups = ActionGroup[]; 