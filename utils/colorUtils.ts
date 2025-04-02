// SPDX-FileCopyrightText: Copyright (c) 2022-2025 trobonox <hello@trobo.dev>, gitoak
//
// SPDX-License-Identifier: Apache-2.0

import type { ZodSchema } from "zod";
import { z, ZodError } from "zod";

const colorMap: Map<string, string> = new Map([
  ["green", "#34D399"],
  ["purple", "#8B5CF6"],
  ["blue", "#3B82F6"],
  ["sky", "#0EA5E9"],
  ["red", "#EF4444"],
  ["black", "#111827"],
  ["orange", "#F97316"],
  ["yellow", "#F59E0B"],
  ["pink", "#EC4899"],
  ["lime", "#84CC16"],
  ["green_dark", "#166534"],
  ["yellow_dark", "#854D0E"],
  ["orange_dark", "#7C2D12"],
  ["red_dark", "#7F1D1D"],
  ["purple_dark", "#4C1D95"],
  ["blue_dark", "#1E3A8A"],
  ["sky_dark", "#075985"],
  ["lime_dark", "#365314"],
  ["pink_dark", "#831843"],
  ["black_dark", "#000000"],
  ["green_light", "#BBF7D0"],
  ["yellow_light", "#FEF3C7"],
  ["orange_light", "#FFEDD5"],
  ["red_light", "#FEE2E2"],
  ["purple_light", "#EDE9FE"],
  ["blue_light", "#DBEAFE"],
  ["sky_light", "#E0F2FE"],
  ["lime_light", "#ECFCCB"],
  ["pink_light", "#FCE7F3"],
  ["black_light", "#374151"],
]);

/**
 * ------------- Zod Schemas -------------
 */

const cssColorNames = [
  "green",
  "purple",
  "blue",
  "sky",
  "red",
  "black",
  "orange",
  "yellow",
  "pink",
  "lime",
  "green_dark",
  "yellow_dark",
  "orange_dark",
  "red_dark",
  "purple_dark",
  "blue_dark",
  "sky_dark",
  "lime_dark",
  "pink_dark",
  "black_dark",
  "green_light",
  "yellow_light",
  "orange_light",
  "red_light",
  "purple_light",
  "blue_light",
  "sky_light",
  "lime_light",
  "pink_light",
  "black_light",
] as const;

const CssColorStringToHexSchema = z.union([
  z.enum(cssColorNames),
  z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid hex color format. Expected #RGB or #RRGGBB.",
  }),
]);

const LightenColorSchema = z.object({
  col: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Invalid hex color format. Expected #RGB or #RRGGBB.",
  }),
  amt: z.number().int().min(-255).max(255, {
    message: "Amount must be an integer between -255 and 255.",
  }),
});

const HexToRgbSchema = z.string().regex(/^#([A-Fa-f0-9]{6})$/, {
  message: "Hex color must be in #RRGGBB format.",
});

const RgbToHexSchema = z.object({
  r: z
    .number()
    .int()
    .min(0)
    .max(255, { message: "Red must be between 0 and 255." }),
  g: z
    .number()
    .int()
    .min(0)
    .max(255, { message: "Green must be between 0 and 255." }),
  b: z
    .number()
    .int()
    .min(0)
    .max(255, { message: "Blue must be between 0 and 255." }),
});

const RgbToHslSchema = z.object({
  r: z
    .number()
    .int()
    .min(0)
    .max(255, { message: "Red must be between 0 and 255." }),
  g: z
    .number()
    .int()
    .min(0)
    .max(255, { message: "Green must be between 0 and 255." }),
  b: z
    .number()
    .int()
    .min(0)
    .max(255, { message: "Blue must be between 0 and 255." }),
});

const HslToHexSchema = z.object({
  h: z.number().min(0).max(360, { message: "Hue must be between 0 and 360." }),
  s: z
    .number()
    .min(0)
    .max(100, { message: "Saturation must be between 0 and 100." }),
  l: z
    .number()
    .min(0)
    .max(100, { message: "Lightness must be between 0 and 100." }),
});

const GetContrastSchema = z.string().regex(/^#([A-Fa-f0-9]{6})$/, {
  message: "Hex color must be in #RRGGBB format.",
});

const GetAverageColorSchema = z.string().url({
  message: "imgSrc must be a valid URL.",
});

/**
 * ------------- Validation Utility -------------
 */

/**
 * Validates input against a provided Zod schema.
 * @param schema - The Zod schema to validate against.
 * @param input - The input to validate.
 * @returns The validated and parsed input.
 * @throws ZodError if validation fails.
 */
const validateInput = <T>(schema: ZodSchema<T>, input: unknown): T => {
  return schema.parse(input);
};

/**
 * ------------- Color Manipulation Functions -------------
 */

/**
 * Converts a CSS color string (name or hex) to its hexadecimal representation.
 * @param colorString - The CSS color name or hex string.
 * @returns The hexadecimal color string.
 * @throws ZodError if validation fails.
 */
export const cssColorStringToHex = (colorString: string): string => {
  // Validate input
  try {
    validateInput(CssColorStringToHexSchema, colorString);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Invalid color string:", error.errors);
    }
    return "#000000"; // Default to black on error
  }

  // If colorString is a named color, retrieve its hex value from colorMap
  if (colorMap.has(colorString.toLowerCase())) {
    return colorMap.get(colorString.toLowerCase())!;
  }

  // If it's already a hex string, return it in uppercase
  return colorString.toUpperCase();
};

/**
 * Lightens or darkens a hex color by a specified amount.
 * @param col - The original hex color string.
 * @param amt - The amount to lighten (positive) or darken (negative).
 * @returns The lightened or darkened hex color string.
 * @throws ZodError if validation fails.
 */
export const lightenColor = (col: string, amt: number): string => {
  // Validate inputs
  const parsed = validateInput(LightenColorSchema, { col, amt });

  // eslint-disable-next-line prefer-const
  let { col: color, amt: amount } = parsed;

  color = color.replace(/^#/, "");
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }

  let [r, g, b] = color.match(/.{2}/g)!.map((x) => parseInt(x, 16));

  [r, g, b] = [r + amount, g + amount, b + amount];

  const rS = Math.max(Math.min(255, r), 0).toString(16);
  const gS = Math.max(Math.min(255, g), 0).toString(16);
  const bS = Math.max(Math.min(255, b), 0).toString(16);

  const rr = rS.length < 2 ? "0" + rS : rS;
  const gg = gS.length < 2 ? "0" + gS : gS;
  const bb = bS.length < 2 ? "0" + bS : bS;

  return `#${rr}${gg}${bb}`.toUpperCase();
};

/**
 * Converts a hex color string to its RGB representation.
 * @param hex - The hex color string in #RRGGBB format.
 * @returns An object with r, g, b properties or null if invalid.
 * @throws ZodError if validation fails.
 */
export const hexToRgb = (
  hex: string
): { r: number; g: number; b: number } | null => {
  // Validate input
  validateInput(HexToRgbSchema, hex);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Converts RGB values to a hex color string.
 * @param r - Red component (0-255).
 * @param g - Green component (0-255).
 * @param b - Blue component (0-255).
 * @returns The hex color string.
 * @throws ZodError if validation fails.
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  // Validate inputs
  const parsed = validateInput(RgbToHexSchema, { r, g, b });

  const toHex = (x: number): string => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(parsed.r)}${toHex(parsed.g)}${toHex(parsed.b)}`.toUpperCase();
};

/**
 * Converts RGB values to HSL.
 * @param r - Red component (0-255).
 * @param g - Green component (0-255).
 * @param b - Blue component (0-255).
 * @returns An array containing H, S, and L values.
 * @throws ZodError if validation fails.
 */
export const rgbToHsl = (
  r: number,
  g: number,
  b: number
): [number, number, number] => {
  const _ = validateInput(RgbToHslSchema, { r, g, b });

  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    // eslint-disable-next-line prefer-const
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
};

/**
 * Converts HSL values to a hex color string.
 * @param h - Hue (0-360).
 * @param s - Saturation (0-100).
 * @param l - Lightness (0-100).
 * @returns The hex color string.
 * @throws ZodError if validation fails.
 */
export const hslToHex = (h: number, s: number, l: number): string => {
  // Validate inputs
  const parsed = validateInput(HslToHexSchema, { h, s, l });

  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number): string => {
    const k = (n + parsed.h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); // Corrected line
    const value = Math.round(255 * color);
    const hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

/**
 * Determines the appropriate text color (dark or light) based on the contrast against the provided hex color.
 * @param hexcolor - The background hex color string in #RRGGBB format.
 * @returns A string representing the text color class.
 * @throws ZodError if validation fails.
 */
export const getContrast = (hexcolor: string): string => {
  // Validate input
  validateInput(GetContrastSchema, hexcolor);

  const rgb = hexToRgb(hexcolor);
  if (!rgb) return "text-gray-50";

  // Calculate YIQ ratio
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

  // Determine contrast
  return yiq >= 128 ? "text-gray-800" : "text-gray-50";
};

/**
 * Calculates the average RGB color of an image from its source URL.
 * @param imgSrc - The URL of the image.
 * @returns A promise that resolves to an array containing the average R, G, B values.
 * @throws ZodError if validation fails.
 */
export const getAverageColor = async (
  imgSrc: string
): Promise<[number, number, number]> => {
  const parsedImgSrc = validateInput(GetAverageColorSchema, imgSrc);

  const img = new Image();
  img.crossOrigin = "Anonymous";

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image."));
    img.src = parsedImgSrc;
  });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Failed to get canvas context.");

  const width = img.width;
  const height = img.height;
  canvas.width = width;
  canvas.height = height;

  context.imageSmoothingEnabled = false;

  context.drawImage(img, 0, 0, width, height);

  const imageData = context.getImageData(0, 0, width, height);

  let r = 0,
    g = 0,
    b = 0,
    a = 0;

  for (let i = 0; i < imageData.data.length; i += 4) {
    const alpha = imageData.data[i + 3] / 255;
    // Skip fully transparent pixels
    if (alpha === 0) continue;

    r += imageData.data[i] * alpha;
    g += imageData.data[i + 1] * alpha;
    b += imageData.data[i + 2] * alpha;
    a += alpha;
  }

  // Avoid division by zero
  if (a === 0) {
    return [0, 0, 0];
  }

  r = Math.round(r / a);
  g = Math.round(g / a);
  b = Math.round(b / a);

  return [r, g, b];
};
