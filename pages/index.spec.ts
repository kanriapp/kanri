import {it, expect, describe} from 'vitest';
import {mountSuspended} from "@nuxt/test-utils/runtime";
import Index from "@/pages/index.vue";

describe('Index', () => {
    it('should render', async () => {
        const page = await mountSuspended(Index)
        expect(page.html()).toContain('Welcome back to Kanri!')
    });
});
