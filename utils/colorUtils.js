// SPDX-FileCopyrightText: Copyright (c) 2022-2023 trobonox <hello@trobo.tech>
//
// SPDX-License-Identifier: Apache-2.0

export const lightenColor = (col, amt) => {
    col = col.replace(/^#/, "");
    if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

    let [r, g, b] = col.match(/.{2}/g);
    [r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt];

    r = Math.max(Math.min(255, r), 0).toString(16);
    g = Math.max(Math.min(255, g), 0).toString(16);
    b = Math.max(Math.min(255, b), 0).toString(16);

    const rr = (r.length < 2 ? "0" : "") + r;
    const gg = (g.length < 2 ? "0" : "") + g;
    const bb = (b.length < 2 ? "0" : "") + b;

    return `#${rr}${gg}${bb}`;
};

export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export const getContrast = (hexcolor) => {
    // Convert to RGB value.
    const rgb = hexToRgb(hexcolor);
    if (!rgb) return "text-gray-50";

    // Get YIQ ratio.
    const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;

    // Check contrast.
    return (yiq >= 128) ? "text-gray-800" : "text-gray-50";
}
