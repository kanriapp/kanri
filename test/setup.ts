import { config } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import en from "@/locales/en.json";
import {vi} from "vitest";

config.global.plugins.push(
    createI18n({
        legacy: false,
        locale: 'en',
        messages: { en },
    }),
);

if (typeof window !== "undefined") {
    window.__TAURI_IPC__ = vi.fn()
}
