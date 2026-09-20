/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CinematicVideoScene } from './components/CinematicVideoScene';

export default function App() {
  return (
    <main
      id="aapromotion-cinematic-app"
      className="w-full min-h-screen bg-[#05020c] overflow-x-hidden overflow-y-auto"
    >
      <CinematicVideoScene />
    </main>
  );
}
