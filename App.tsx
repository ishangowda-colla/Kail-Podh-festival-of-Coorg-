
import React, { useState } from 'react';
import { IntroductionScreen } from './components/IntroductionScreen';
import { TraditionsScreen } from './components/TraditionsScreen';

type Screen = 'introduction' | 'traditions';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('introduction');

  const navigateToTraditions = () => setCurrentScreen('traditions');
  const navigateToHome = () => setCurrentScreen('introduction');

  return (
    <div>
      {currentScreen === 'introduction' && <IntroductionScreen onExplore={navigateToTraditions} />}
      {currentScreen === 'traditions' && <TraditionsScreen onBack={navigateToHome} />}
    </div>
  );
};

export default App;
