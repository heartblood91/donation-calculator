import { useState, useEffect } from 'react';

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

export const useCalculator = () => {
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
    visitors: { people: 0, isExpanded: false },
    onSiteVisitors: { people: 0, isExpanded: false },
  });
  const [potentialRange, setPotentialRange] = useState<PotentialRange>({ min: 0, max: 0 });

  useEffect(() => {
    const updateIframeHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: 'resize', height }, '*');
    };

    const resizeObserver = new ResizeObserver(updateIframeHeight);
    resizeObserver.observe(document.body);
    updateIframeHeight();

    return () => resizeObserver.disconnect();
  }, []);

  const calculatePotential = () => {
    const firstCircleDonors = {
      min: firstCircle.people * 0.3,
      max: firstCircle.people * 0.6,
    };

    const secondCircleRate = {
      smallTown: { min: 0.05, max: 0.1 },
      mediumTown: { min: 0.005, max: 0.01 },
      largeCity: { min: 0.0005, max: 0.001 },
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
      min: thirdCircle.visitors.people * 0.01,
      max: thirdCircle.onSiteVisitors.people * 0.05,
    };

    const totalDonors = {
      min: firstCircleDonors.min + secondCircleDonors.min,
      max: firstCircleDonors.max + secondCircleDonors.max,
    };

    const potentielMin = totalDonors.min * 348 + (thirdCircleDonors.min + thirdCircleDonors.max) * 200;
    const potentielMax = totalDonors.max * 348 + (thirdCircleDonors.min + thirdCircleDonors.max) * 200;

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

3. Troisième cercle, les inconnues
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
  };
};