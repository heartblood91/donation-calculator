import { FC } from 'react';
import { TodoList } from './components/TodoList';
import { InfoBox } from './components/InfoBox';
import { Header } from './components/Header';
import { useCalculator } from './hooks/useCalculator';
import { useTodoList } from './hooks/useTodoList';
import type { TownType } from './hooks/useCalculator';
import { Card } from './components/ui/Card';
import { TextField } from './components/ui/TextField';
import { RadioGroup } from './components/ui/RadioGroup';
import { Alert } from './components/ui/Alert';
import { Container, Stack } from '@mui/material';
import { Info } from '@mui/icons-material';

const App: FC = () => {
  const {
    todoList,
    toggleItem,
    calculateProgress,
    handleEmailShare: handleTodoEmailShare,
  } = useTodoList();

  const {
    showActionTable: showTodoList,
    setShowActionTable: setShowTodoList,
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
  } = useCalculator(todoList);

  if (showTodoList) {
    return (
      <TodoList
        onBack={() => setShowTodoList(false)}
        todoList={todoList}
        progress={calculateProgress()}
        toggleItem={toggleItem}
        handleEmailShare={handleTodoEmailShare}
      />
    );
  }

  const townOptions = [
    {
      value: 'smallTown',
      label: "Petite commune (jusqu'à 2.000 habitants)",
    },
    {
      value: 'mediumTown',
      label: 'Commune de taille moyenne (8.000 à 10.000 habitants)',
    },
    {
      value: 'largeCity',
      label: 'Agglomération importante',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 antialiased">
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        <Card sx={{ overflow: 'hidden' }}>
          <Header
            title="Calculette de Potentiel de Collecte"
            progress={calculateProgress()}
            onShare={handleEmailShare}
            onNavigate={() => setShowTodoList(true)}
            isCalculator={true}
          />

          <Stack spacing={2} sx={{ p: { xs: 2, md: 3 } }}>
            <Alert
              icon={<Info className="w-5 h-5" />}
              severity="info"
            >
              La calculette est d'abord un outil pour obtenir un ordre de
              grandeur du potentiel de la collecte, qu'il faudra affiner en
              fonction de la capacité à animer la collecte et des actions que
              vous avez envisagez de mener.
            </Alert>

            <Stack spacing={2}>
              {/* First Circle */}
              <Card
                title="Premier cercle et ambassadeurs"
                headerIcon={
                  <div className="w-5 h-5 rounded-full bg-[#2DA4A8] text-white flex items-center justify-center text-sm">
                    1
                  </div>
                }
              >
                <Stack spacing={1}>
                  <div>
                    <TextField
                      label="Nombre de donateurs potentiels"
                      type="number"
                      value={firstCircle.people || ''}
                      onChange={(e) =>
                        setFirstCircle({
                          ...firstCircle,
                          people: e.target.value === '' ? 0 : parseInt(e.target.value),
                        })
                      }
                      onFocus={(e) => e.target.select()}
                      helperText="Reportez ici le nombre de personnes concernées"
                    />
                    <InfoBox
                      isExpanded={firstCircle.isExpanded}
                      onClick={() =>
                        setFirstCircle({
                          ...firstCircle,
                          isExpanded: !firstCircle.isExpanded,
                        })
                      }
                    >
                      <p className="mb-2">
                      Le 1er cercle regroupe les personnes concernées ou en proximité directe avec le projet
                      </p>
                      <p className="mb-2">
                        Il peut s'agir par exemple des paroissiens d'une église,
                        d'une communauté sportive ou culturelle, du cercle de
                        personnes le plus proche du porteur de projet ou
                        l'association animatrice
                      </p>
                      <p className="mb-2">
                        Parmi eux, se trouvent certainement les meilleurs
                        ambassadeurs du projet.
                      </p>
                      <p>
                        Cette première cible peut également comprendre les
                        personnes ayant un lien « affectif » avec le projet, sans
                        pour autant être en proximité géographique. Par exemple,
                        les « passionnés » d'une thématique propre au projet ou
                        les anciens vacanciers d'une station de ski de village.
                      </p>
                    </InfoBox>
                  </div>
                </Stack>
              </Card>

              {/* Second Circle */}
              <Card
                title="Deuxième cercle, les sensibilisés"
                headerIcon={
                  <div className="w-5 h-5 rounded-full bg-[#2DA4A8] text-white flex items-center justify-center text-sm">
                    2
                  </div>
                }
              >
                <Stack spacing={2}>
                  <TextField
                    label="Nombre de donateurs potentiels"
                    type="number"
                    value={secondCircle.people || ''}
                    onChange={(e) =>
                      setSecondCircle({
                        ...secondCircle,
                        people: e.target.value === '' ? 0 : parseInt(e.target.value),
                      })
                    }
                    onFocus={(e) => e.target.select()}
                    helperText="Reportez ici le nombre de personnes concernées"
                  />
                  <InfoBox
                    isExpanded={secondCircle.isExpanded}
                    onClick={() =>
                      setSecondCircle({
                        ...secondCircle,
                        isExpanded: !secondCircle.isExpanded,
                      })
                    }
                  >
                    <p className="mb-2">
                      Le 2e cercle, les sensibilisés, est composé des habitants
                      de la région ou des environs, non directement concernés
                      par le projet mais accessibles, adressables, par exemple
                      les lecteurs de journaux locaux, les membres
                      d'associations tierces, etc.
                    </p>
                    <p>
                      Pour évaluer le nombre de personnes concernées, évaluer le
                      nombre d'habitants alentour, selon votre commune,
                      communauté ou agglomération.
                    </p>
                  </InfoBox>

                  <RadioGroup
                    label="Sélectionnez s'il s'agit des habitants :"
                    value={townType ?? ''}
                    onChange={(e) => setTownType(e.target.value as TownType)}
                    options={townOptions}
                  />
                </Stack>
              </Card>

              {/* Third Circle */}
              <Card
                title="Troisième cercle, les inconnus"
                headerIcon={
                  <div className="w-5 h-5 rounded-full bg-[#2DA4A8] text-white flex items-center justify-center text-sm">
                    3
                  </div>
                }
              >
                <Stack spacing={2}>
                  <TextField
                    label="Les visiteurs (y compris en ligne)"
                    type="number"
                    value={thirdCircle.visitors.people || ''}
                    onChange={(e) =>
                      setThirdCircle({
                        ...thirdCircle,
                        visitors: {
                          ...thirdCircle.visitors,
                          people: e.target.value === '' ? 0 : parseInt(e.target.value),
                        },
                      })
                    }
                    onFocus={(e) => e.target.select()}
                    helperText="Reportez ici le nombre de personnes concernées"
                  />
                  <TextField
                    label="Les visiteurs accueillis et sollicités lors de leur visite"
                    type="number"
                    value={thirdCircle.onSiteVisitors.people || ''}
                    onChange={(e) =>
                      setThirdCircle({
                        ...thirdCircle,
                        onSiteVisitors: {
                          ...thirdCircle.onSiteVisitors,
                          people: e.target.value === '' ? 0 : parseInt(e.target.value),
                        },
                      })
                    }
                    onFocus={(e) => e.target.select()}
                    helperText="Reportez ici le nombre de personnes concernées"
                  />
                  <InfoBox
                    isExpanded={thirdCircle.onSiteVisitors.isExpanded}
                    onClick={() =>
                      setThirdCircle({
                        ...thirdCircle,
                        onSiteVisitors: {
                          ...thirdCircle.onSiteVisitors,
                          isExpanded: !thirdCircle.onSiteVisitors.isExpanded,
                        },
                      })
                    }
                  >
                    <p className="mb-2">
                      Ces potentiels donateurs, sans attaches locales
                      particulières, sont d'abord attirés par l'intérêt patrimonial
                      et la renommée du site. Ils découvrent ou visitent le site
                      sans avoir de lien particulier avec celui-ci.
                    </p>
                    <p className="mb-2">
                      Ce cercle inclut les potentiel « visiteurs » sur Internet
                      qui découvrent et soutiennent le projet lors de campagnes
                      de communication.
                    </p>
                    <p>
                      Dans cette catégorie, on évaluera à part les visiteurs du
                      site lorsqu'ils sont accueillis sur place (entrée payante
                      ou non), ou lors d'un événement particulier, s'il y a
                      lieu, ces visiteurs pouvant faire l'objet d'une
                      sollicitation particulière pour effectuer un don lors de
                      leur visite.
                    </p>
                  </InfoBox>
                </Stack>
              </Card>

              {/* Results */}
              <Card
                sx={{
                  backgroundColor: '#2DA4A8',
                  color: 'white',
                  '& .MuiCardContent-root': {
                    padding: '1rem',
                  },
                }}
              >
                <Stack spacing={1}>
                  <div>
                    <h2 className="text-xl font-bold">
                      Estimation du potentiel de collecte
                    </h2>
                    <div className="text-3xl font-bold mt-2">
                      {potentialRange.min.toLocaleString('fr-FR')}€ -{' '}
                      {potentialRange.max.toLocaleString('fr-FR')}€
                    </div>
                  </div>
                  <p className="text-sm opacity-90">
                    L'atteinte du potentiel de collecte est fortement liée aux
                    actions d'animation qui seront réalisées.
                  </p>
                </Stack>
              </Card>
            </Stack>
          </Stack>
        </Card>
      </Container>
    </div>
  );
};

export default App;
