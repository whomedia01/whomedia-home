/**
 * @file types.ts
 * @description Centralized TypeScript type definitions and interfaces for WHO Media (후미디어) Application.
 * @author AI Studio Assistant
 */

/**
 * Represents a single step in the B2B project process timeline.
 */
export interface ProcessStep {
  /** The primary title of the process step */
  title: string;
  /** A descriptive subtitle outlining the objective */
  subtitle: string;
  /** A short category tag or phase name */
  tag: string;
  /** Two-digit string representation of the step number (e.g. "01") */
  bgNum: string;
  /** Array of bullet points describing step deliverables */
  bullets: string[];
}

/**
 * Represents a corporate philosophy pillar in the About showcase.
 */
export interface AboutPillar {
  /** Pillar badge label (e.g. "PILLAR 01 / BUSINESS HUB") */
  badge: string;
  /** Two-digit string representation of the pillar number */
  number: string;
  /** Title of the pillar showcase card */
  title: string;
  /** Detailed description of the pillar */
  desc: string;
  /** Key highlights or deliverables for this pillar */
  bullets: string[];
  /** Left column eyebrow label */
  leftEyebrow: string;
  /** Left column HTML title with styling tags */
  leftTitle: string;
  /** Left column detailed narrative text */
  leftDesc: string;
}

/**
 * Structure of the response returned by YouTube's oEmbed API.
 */
export interface YouTubeOEmbedResponse {
  /** Video title on YouTube */
  title?: string;
  /** Author / Channel name */
  author_name?: string;
  /** Thumbnail image URL */
  thumbnail_url?: string;
  /** Embed width */
  width?: number;
  /** Embed height */
  height?: number;
}
