"use client";

/**
 * Tiny synthesized hit sounds, so no audio files are needed. The audio context is
 * made on first use, which is always right after the player presses something.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;

function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0.3;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Gain that starts at peak and decays to silence over dur seconds. */
function envelope(a: AudioContext, start: number, dur: number, peak: number) {
  const g = a.createGain();
  g.gain.setValueAtTime(peak, start);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  g.connect(master!);
  return g;
}

export interface Tone {
  freq: number;
  /** Pitch to glide to by the end, for drops and sweeps. */
  to?: number;
  type?: OscillatorType;
  /** Seconds. */
  dur: number;
  gain?: number;
}

export interface Noise {
  dur: number;
  gain?: number;
  filter: BiquadFilterType;
  freq: number;
  /** Filter frequency to sweep to by the end. */
  to?: number;
  q?: number;
}

/** Plays any mix of oscillator tones and filtered noise bursts together. */
export function play(...parts: (Tone | Noise)[]) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  for (const p of parts) {
    if ("filter" in p) {
      if (!noiseBuffer) {
        noiseBuffer = a.createBuffer(1, a.sampleRate * 0.5, a.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      }
      const src = a.createBufferSource();
      src.buffer = noiseBuffer;
      const filter = a.createBiquadFilter();
      filter.type = p.filter;
      filter.Q.value = p.q ?? 1;
      filter.frequency.setValueAtTime(p.freq, t);
      if (p.to) filter.frequency.exponentialRampToValueAtTime(p.to, t + p.dur);
      src.connect(filter).connect(envelope(a, t, p.dur, p.gain ?? 0.5));
      src.start(t);
      src.stop(t + p.dur);
    } else {
      const osc = a.createOscillator();
      osc.type = p.type ?? "sine";
      osc.frequency.setValueAtTime(p.freq, t);
      if (p.to) osc.frequency.exponentialRampToValueAtTime(p.to, t + p.dur);
      osc.connect(envelope(a, t, p.dur, p.gain ?? 0.5));
      osc.start(t);
      osc.stop(t + p.dur);
    }
  }
}

/** C major pentatonic from C5 upward, for games that pitch each button differently. */
export const PENTATONIC = [523, 587, 659, 784, 880, 1047, 1175, 1319, 1568];
