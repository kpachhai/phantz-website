/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import SmoothScroll from 'smooth-scroll';

import { Navigation } from './components/navigation';
import { Content } from './components/main';
import { About } from './components/about';
import { Roadmap } from './components/roadmap';
import { RefreshContextProvider } from './data/utils';
import jsonData from './data/data.json';
import './App.css';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

export default () => {
  return (
    <RefreshContextProvider>
      <Navigation data={jsonData.Navigation} />
      <Content data={jsonData.Header} />
      {/* <About data={jsonData.About} /> */}
      <Roadmap data={jsonData.Roadmap} />
    </RefreshContextProvider>
  );
};
