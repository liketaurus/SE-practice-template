import { createContext, FC, PropsWithChildren, useState } from 'react';
import { INTRODUCTION_COLOR } from '../../constants/quiz';

const ColorContext = createContext({
  color: INTRODUCTION_COLOR,
  setColor: (color: string) => {},
});

const ColorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [color, setColor] = useState(INTRODUCTION_COLOR);

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export { ColorProvider, ColorContext };
