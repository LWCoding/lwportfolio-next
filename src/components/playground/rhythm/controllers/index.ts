import type { RhythmController } from "../inputs";
import { beatmaniaIIDX } from "./beatmaniaIIDX";
import { danceDanceRevolution } from "./danceDanceRevolution";
import { jubeat } from "./jubeat";
import { maimai } from "./maimai";
import { popnMusic } from "./popnMusic";
import { soundVoltex } from "./soundVoltex";
import { taikoNoTatsujin } from "./taikoNoTatsujin";

/** Oldest first, by first arcade release. */
export const CONTROLLERS: RhythmController[] = [
  popnMusic, // Sep 1998
  danceDanceRevolution, // Nov 1998
  beatmaniaIIDX, // Feb 1999
  taikoNoTatsujin, // Feb 2001
  jubeat, // Jul 2008
  soundVoltex, // Jan 2012
  maimai, // Jul 2012
];
