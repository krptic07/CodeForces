import { useState, useEffect } from "react";

export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

const mediaQueries: [ScreenSize, MediaQueryList][] = [
  ["xs", window.matchMedia("(max-width: 325px)")],
  ["sm", window.matchMedia("(min-width: 326px) and (max-width: 425px)")],
  ["md", window.matchMedia("(min-width: 426px) and (max-width: 768px)")],
  ["lg", window.matchMedia("(min-width: 769px) and (max-width: 1024px)")],
  ["xl", window.matchMedia("(min-width: 1025px)")],
];

const getScreenSize = (): ScreenSize | undefined => {
  const screenSize = mediaQueries.find(
    (mediaQuery: [ScreenSize, MediaQueryList]) => mediaQuery[1].matches
  );
  if (screenSize) {
    return screenSize[0];
  }
  return;
};

const useScreenSize = (): ScreenSize | undefined => {
  const [screenSize, setScreenSize] = useState<ScreenSize | undefined>(
    getScreenSize()
  );

  useEffect(() => {
    const mediaQueriesList: MediaQueryList[] = mediaQueries.map(
      (mediaQuery: [ScreenSize, MediaQueryList]) => mediaQuery[1]
    );

    const handleResize = (): void => setScreenSize(getScreenSize());

    mediaQueriesList.forEach((mediaQuery: MediaQueryList) => {
      mediaQuery.addEventListener("change", handleResize);
    });
    return () =>
      mediaQueriesList.forEach((mediaQuery: MediaQueryList) => {
        mediaQuery.removeEventListener("change", handleResize);
      });
  }, []);

  return screenSize;
};

export default useScreenSize;
