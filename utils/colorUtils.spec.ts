/* SPDX-FileCopyrightText: Copyright (c) 2022-2024 trobonox <hello@trobo.dev>, gitoak

SPDX-License-Identifier: GPL-3.0-or-later

Kanri is an offline Kanban board app made using Tauri and Nuxt.
Copyright (C) 2022-2024 trobonox <hello@trobo.dev>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import {
  cssColorStringToHex,
  lightenColor,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToHex,
  getContrast,
  getAverageColor,
} from "./colorUtils"; // Adjust the path if necessary

import { describe, it, expect, beforeAll, vi } from "vitest";
import { ZodError } from "zod";

// Mock the Image and Canvas for getAverageColor
beforeAll(() => {
  // Mock Image
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).Image = class {
    crossOrigin: string = "";
    src: string = "";
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;

    constructor() {
      setTimeout(() => {
        if (this.src === "https://valid.image/url") {
          if (this.onload) this.onload();
        } else {
          if (this.onerror) this.onerror();
        }
      }, 0);
    }
  };

  // Mock document.createElement('canvas') and its methods
  const mockGetContext = vi.fn(() => {
    return {
      drawImage: vi.fn(),
      getImageData: vi.fn(() => ({
        data: new Uint8ClampedArray([
          255, 0, 0, 255, 0, 0, 0, 255, 0, 255, 0, 255,
        ]), // Example data
      })),
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).document = {
    createElement: vi.fn(() => ({
      width: 0,
      height: 0,
      getContext: mockGetContext,
    })),
  };
});

describe("Color Manipulation Functions", () => {
  describe("cssColorStringToHex", () => {
    it("should convert named colors to their hex equivalents", () => {
      expect(cssColorStringToHex("green")).toBe("#34D399");
      expect(cssColorStringToHex("purple")).toBe("#8B5CF6");
      expect(cssColorStringToHex("blue")).toBe("#3B82F6");
      expect(cssColorStringToHex("sky")).toBe("#0EA5E9");
      expect(cssColorStringToHex("red")).toBe("#EF4444");
      expect(cssColorStringToHex("black")).toBe("#111827");
      expect(cssColorStringToHex("orange")).toBe("#F97316");
      expect(cssColorStringToHex("yellow")).toBe("#F59E0B");
      expect(cssColorStringToHex("pink")).toBe("#EC4899");
      expect(cssColorStringToHex("lime")).toBe("#84CC16");
    });

    it("should handle hex strings and return them in uppercase", () => {
      expect(cssColorStringToHex("#abc")).toBe("#ABC");
      expect(cssColorStringToHex("#abcdef")).toBe("#ABCDEF");
      expect(cssColorStringToHex("#123")).toBe("#123");
      expect(cssColorStringToHex("#123456")).toBe("#123456");
    });

    it("should be case-sensitive for named colors", () => {
      expect(() => cssColorStringToHex("Green")).toThrow(ZodError);
      expect(() => cssColorStringToHex("PURPLE")).toThrow(ZodError);
      expect(() => cssColorStringToHex("Blue")).toThrow(ZodError);
      expect(() => cssColorStringToHex("SKY")).toThrow(ZodError);
      expect(() => cssColorStringToHex("Red")).toThrow(ZodError);
    });

    it("should throw ZodError for invalid color strings", () => {
      expect(() => cssColorStringToHex("unknownColor")).toThrow(ZodError);
      expect(() => cssColorStringToHex("#12")).toThrow(ZodError);
      expect(() => cssColorStringToHex("123456")).toThrow(ZodError);
      expect(() => cssColorStringToHex("#abcd")).toThrow(ZodError);
      expect(() => cssColorStringToHex("")).toThrow(ZodError);
    });
  });

  describe("lightenColor", () => {
    it("should lighten a color correctly", () => {
      expect(lightenColor("#000000", 50)).toBe("#323232"); // Darken black
      expect(lightenColor("#123456", 20)).toBe("#26486A");
      expect(lightenColor("#abcdef", 30)).toBe("#C9EBFF");
    });

    it("should darken a color correctly", () => {
      expect(lightenColor("#FFFFFF", -50)).toBe("#CDCDCD"); // Darken white
      expect(lightenColor("#abcdef", -20)).toBe("#97B9DB");
      expect(lightenColor("#654321", -10)).toBe("#5B3917");
    });

    it("should throw ZodError for invalid lightness values", () => {
      expect(() => lightenColor("#123456", "10" as unknown as number)).toThrow(
        ZodError
      );
      expect(() => lightenColor("#123456", 300)).toThrow(ZodError);
      expect(() => lightenColor("#123456", -300)).toThrow(ZodError);
    });

    it("should handle short hex codes by expanding them", () => {
      expect(lightenColor("#abc", 10)).toBe("#B4C5D6");
      expect(lightenColor("#fff", -10)).toBe("#F5F5F5");
    });

    it("should throw ZodError for invalid inputs", () => {
      expect(() => lightenColor("notAColor", 10)).toThrow(ZodError);
      expect(() => lightenColor("#12345", 10)).toThrow(ZodError);
      expect(() => lightenColor("#123456", "10" as unknown as number)).toThrow(
        ZodError
      );
      expect(() => lightenColor("#123456", 300)).toThrow(ZodError);
      expect(() => lightenColor("#123456", -300)).toThrow(ZodError);
    });
  });

  describe("hexToRgb", () => {
    it("should convert hex to RGB correctly", () => {
      expect(hexToRgb("#FFFFFF")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb("#123456")).toEqual({ r: 18, g: 52, b: 86 });
      expect(hexToRgb("#ABCDEF")).toEqual({ r: 171, g: 205, b: 239 });
    });

    it("should throw ZodError for invalid hex formats", () => {
      expect(() => hexToRgb("#FFF")).toThrow(ZodError);
      expect(() => hexToRgb("123456")).toThrow(ZodError);
      expect(() => hexToRgb("#12345G")).toThrow(ZodError);
      expect(() => hexToRgb("#1234")).toThrow(ZodError);
      expect(() => hexToRgb("")).toThrow(ZodError);
    });
  });

  describe("rgbToHex", () => {
    it("should convert RGB to hex correctly", () => {
      expect(rgbToHex(255, 255, 255)).toBe("#FFFFFF");
      expect(rgbToHex(0, 0, 0)).toBe("#000000");
      expect(rgbToHex(18, 52, 86)).toBe("#123456");
      expect(rgbToHex(171, 205, 239)).toBe("#ABCDEF");
    });

    it("should handle single-digit hex values by padding with zero", () => {
      expect(rgbToHex(1, 2, 3)).toBe("#010203");
      expect(rgbToHex(16, 32, 48)).toBe("#102030");
    });

    it("should throw ZodError for invalid RGB values", () => {
      expect(() => rgbToHex(-1, 0, 0)).toThrow(ZodError);
      expect(() => rgbToHex(0, 256, 0)).toThrow(ZodError);
      expect(() => rgbToHex(0, 0, "255" as unknown as number)).toThrow(
        ZodError
      );
      expect(() => rgbToHex(0.5, 0, 0)).toThrow(ZodError);
      expect(() => rgbToHex(NaN, 0, 0)).toThrow(ZodError);
    });
  });

  describe("rgbToHsl", () => {
    it("should convert RGB to HSL correctly", () => {
      expect(rgbToHsl(255, 255, 255)).toEqual([0, 0, 100]);
      expect(rgbToHsl(0, 0, 0)).toEqual([0, 0, 0]);
      expect(rgbToHsl(255, 0, 0)).toEqual([0, 100, 50]);
      expect(rgbToHsl(0, 255, 0)).toEqual([120, 100, 50]);
      expect(rgbToHsl(0, 0, 255)).toEqual([240, 100, 50]);
      expect(rgbToHsl(75, 0, 130)).toEqual([275, 100, 25]);
      expect(rgbToHsl(123, 104, 238)).toEqual([249, 80, 67]);
    });

    it("should handle edge cases with no saturation", () => {
      expect(rgbToHsl(128, 128, 128)).toEqual([0, 0, 50]);
      expect(rgbToHsl(192, 192, 192)).toEqual([0, 0, 75]);
    });

    it("should throw ZodError for invalid RGB inputs", () => {
      expect(() => rgbToHsl(-10, 0, 0)).toThrow(ZodError);
      expect(() => rgbToHsl(0, 300, 0)).toThrow(ZodError);
      expect(() => rgbToHsl(0, 0, "255" as unknown as number)).toThrow(
        ZodError
      );
      expect(() => rgbToHsl(0.5, 0, 0)).toThrow(ZodError);
      expect(() => rgbToHsl(NaN, 0, 0)).toThrow(ZodError);
    });
  });

  describe("hslToHex", () => {
    it("should convert HSL to hex correctly", () => {
      expect(hslToHex(0, 100, 50)).toBe("#FF0000"); // Red
      expect(hslToHex(120, 100, 50)).toBe("#00FF00"); // Green
      expect(hslToHex(240, 100, 50)).toBe("#0000FF"); // Blue
      expect(hslToHex(60, 100, 50)).toBe("#FFFF00"); // Yellow
      expect(hslToHex(180, 100, 50)).toBe("#00FFFF"); // Cyan
      expect(hslToHex(300, 100, 50)).toBe("#FF00FF"); // Magenta
      expect(hslToHex(0, 0, 100)).toBe("#FFFFFF"); // White
      expect(hslToHex(0, 0, 0)).toBe("#000000"); // Black
      expect(hslToHex(0, 0, 50)).toBe("#808080"); // Gray
    });

    it("should throw ZodError for invalid HSL inputs", () => {
      expect(() => hslToHex(-10, 50, 50)).toThrow(ZodError);
      expect(() => hslToHex(361, 50, 50)).toThrow(ZodError);
      expect(() => hslToHex(120, -1, 50)).toThrow(ZodError);
      expect(() => hslToHex(120, 101, 50)).toThrow(ZodError);
      expect(() => hslToHex(120, 50, -1)).toThrow(ZodError);
      expect(() => hslToHex(120, 50, 101)).toThrow(ZodError);
      expect(() => hslToHex("120" as unknown as number, 50, 50)).toThrow(
        ZodError
      );
    });
  });

  describe("getContrast", () => {
    it("should return appropriate text color based on contrast", () => {
      expect(getContrast("#FFFFFF")).toBe("text-gray-800"); // Light background
      expect(getContrast("#000000")).toBe("text-gray-50"); // Dark background
      expect(getContrast("#FF5733")).toBe("text-gray-800"); // Darker orange
      expect(getContrast("#33FF57")).toBe("text-gray-800"); // Lighter green
      expect(getContrast("#808080")).toBe("text-gray-800"); // Medium gray
    });

    it("should throw ZodError for invalid hex color formats", () => {
      expect(() => getContrast("FFFFFF")).toThrow(ZodError);
      expect(() => getContrast("#FFF")).toThrow(ZodError);
      expect(() => getContrast("#12345G")).toThrow(ZodError);
      expect(() => getContrast("")).toThrow(ZodError);
    });

    it("should handle edge YIQ values", () => {
      expect(getContrast("#7F8081")).toBe("text-gray-50");
    });

    it("should return default text color if hexToRgb returns null", () => {
      // Since hexToRgb would throw for invalid inputs, this case is redundant
      // However, for completeness, if hexToRgb somehow returns null, it should return 'text-gray-50'
      // We'll temporarily mock hexToRgb to return null
      const originalHexToRgb = hexToRgb;

      hexToRgb.apply = vi.fn(() => null);
      expect(getContrast("#123456")).toBe("text-gray-50");
      // Restore original function
      hexToRgb.apply = originalHexToRgb;
    });
  });

  describe("getAverageColor", () => {
    it("should calculate average color correctly for a valid image URL", async () => {
      const avgColor = await getAverageColor("https://valid.image/url");
      expect(avgColor).toEqual([85, 85, 0]);
    });

    it("should reject the promise for an invalid image URL", async () => {
      await expect(
        getAverageColor("https://invalid.image/url")
      ).rejects.toThrow("Failed to load image.");
    });

    it("should throw ZodError for invalid imgSrc inputs", async () => {
      await expect(getAverageColor("not-a-valid-url")).rejects.toThrow(
        ZodError
      );
      await expect(
        getAverageColor("ftp://invalid-protocol.com")
      ).rejects.toThrow(Error);
      await expect(getAverageColor("")).rejects.toThrow(ZodError);
    });
  });
});
