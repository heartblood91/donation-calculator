import { useState, useEffect } from 'react';
import type { TodoList } from '../types/action.types';
import {
  FIRST_CIRCLE_RATES,
  SECOND_CIRCLE_RATES,
  THIRD_CIRCLE_RATES,
  AVERAGE_DONATION_AMOUNTS,
} from '../constants/donation.constants';

export interface CircleData {
  people: number;
  isExpanded: boolean;
}

export type TownType = 'smallTown' | 'mediumTown' | 'largeCity' | null;

export interface ThirdCircleData {
  visitors: CircleData;
  onSiteVisitors: CircleData;
}

export interface PotentialRange {
  min: number;
  max: number;
}

export const useCalculator = (todoList: TodoList) => {
  const [showActionTable, setShowActionTable] = useState<boolean>(false);

  const [firstCircle, setFirstCircle] = useState<CircleData>({
    people: 0,
    isExpanded: false,
  });

  const [secondCircle, setSecondCircle] = useState<CircleData>({
    people: 0,
    isExpanded: false,
  });

  const [townType, setTownType] = useState<TownType>(null);

  const [thirdCircle, setThirdCircle] = useState<ThirdCircleData>({
    visitors: {
      people: 0,
      isExpanded: false,
    },
    onSiteVisitors: {
      people: 0,
      isExpanded: false,
    },
  });

  const [potentialRange, setPotentialRange] = useState<PotentialRange>({
    min: 0,
    max: 0,
  });

  const calculatePotential = () => {
    const firstCircleDonors = {
      min: firstCircle.people * FIRST_CIRCLE_RATES.MIN_DONOR_RATE,
      max: firstCircle.people * FIRST_CIRCLE_RATES.MAX_DONOR_RATE,
    };

    const secondCircleRate = {
      smallTown: { 
        min: SECOND_CIRCLE_RATES.SMALL_TOWN.MIN_DONOR_RATE, 
        max: SECOND_CIRCLE_RATES.SMALL_TOWN.MAX_DONOR_RATE 
      },
      mediumTown: { 
        min: SECOND_CIRCLE_RATES.MEDIUM_TOWN.MIN_DONOR_RATE, 
        max: SECOND_CIRCLE_RATES.MEDIUM_TOWN.MAX_DONOR_RATE 
      },
      largeCity: { 
        min: SECOND_CIRCLE_RATES.LARGE_CITY.MIN_DONOR_RATE, 
        max: SECOND_CIRCLE_RATES.LARGE_CITY.MAX_DONOR_RATE 
      },
    };

    let secondCircleDonorsMin = 0;
    let secondCircleDonorsMax = 0;

    if (townType && secondCircle.people > 0) {
      secondCircleDonorsMin = secondCircleRate[townType].min * secondCircle.people;
      secondCircleDonorsMax = secondCircleRate[townType].max * secondCircle.people;
    }

    const secondCircleDonors = {
      min: secondCircleDonorsMin,
      max: secondCircleDonorsMax,
    };

    const thirdCircleDonors = {
      min: thirdCircle.visitors.people * THIRD_CIRCLE_RATES.ONLINE_VISITORS.DONOR_RATE,
      max: thirdCircle.onSiteVisitors.people * THIRD_CIRCLE_RATES.ONSITE_VISITORS.DONOR_RATE,
    };

    const totalDonors = {
      min: firstCircleDonors.min + secondCircleDonors.min,
      max: firstCircleDonors.max + secondCircleDonors.max,
    };

    const potentielMin = totalDonors.min * AVERAGE_DONATION_AMOUNTS.FIRST_AND_SECOND_CIRCLE + 
      (thirdCircleDonors.min + thirdCircleDonors.max) * AVERAGE_DONATION_AMOUNTS.THIRD_CIRCLE;
    const potentielMax = totalDonors.max * AVERAGE_DONATION_AMOUNTS.FIRST_AND_SECOND_CIRCLE + 
      (thirdCircleDonors.min + thirdCircleDonors.max) * AVERAGE_DONATION_AMOUNTS.THIRD_CIRCLE;

    setPotentialRange({
      min: Math.round(potentielMin),
      max: Math.round(potentielMax),
    });
  };

  useEffect(() => {
    calculatePotential();
  }, [firstCircle, secondCircle, townType, thirdCircle]);

  const getTownTypeText = () => {
    const types = {
      smallTown: "Petite commune",
      mediumTown: "Commune moyenne",
      largeCity: "Agglomération importante",
    };
    return townType ? types[townType] : "Non spécifié";
  };

  const getEmailContent = () => {
    const content = `
Résumé de l'estimation du potentiel de collecte

1. Premier cercle et ambassadeurs
- Nombre de personnes : ${firstCircle.people}

2. Deuxième cercle, les sensibilisés
- Nombre de personnes : ${secondCircle.people}
- Type de commune : ${getTownTypeText()}

3. Troisième cercle, les inconnus
- Visiteurs en ligne : ${thirdCircle.visitors.people}
- Visiteurs sur site : ${thirdCircle.onSiteVisitors.people}

Estimation du potentiel de collecte : ${potentialRange.min.toLocaleString('fr-FR')}€ - ${potentialRange.max.toLocaleString('fr-FR')}€

Pour maximiser ce potentiel, nous vous recommandons de consulter et mettre en œuvre les actions suggérées dans le tableau des actions recommandées.
    `.trim();

    return encodeURIComponent(content);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Estimation du potentiel de collecte");
    const body = getEmailContent();
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const calculateActionsProgress = () => {
    let totalActions = 0;
    let completedActions = 0;

    todoList.forEach(group => {
      group.subGroups.forEach(subGroup => {
        totalActions += subGroup.actions.length;
        completedActions += subGroup.actions.filter(a => a.checked).length;
      });
    });

    return totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;
  };

  return {
    showActionTable,
    setShowActionTable,
    firstCircle,
    setFirstCircle,
    secondCircle,
    setSecondCircle,
    townType,
    setTownType,
    thirdCircle,
    setThirdCircle,
    potentialRange,
    handleEmailShare,
    calculateActionsProgress,
  };
};