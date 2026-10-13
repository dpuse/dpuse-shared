import { describe, expect, it } from 'vitest';

import { loadPresenter } from '@/component/module/presenter';
import type { PresenterConfig } from '@/component/module/presenter';

// Only 'id' and 'version' are read by loadPresenter; the rest satisfies the presenter config shape.
function buildPresenterConfig(id: string, version: string): PresenterConfig {
    return {
        actionNames: [],
        description: {},
        firstCreatedAt: null,
        icon: null,
        iconDark: null,
        id,
        label: {},
        lastUpdatedAt: null,
        presentations: [],
        status: null,
        statusId: null,
        typeId: 'presenter',
        vendorAccountURL: null,
        vendorDocumentationURL: null,
        vendorHomeURL: null,
        version
    };
}

describe('loadPresenter', () => {
    it('names the presenter, version and upload folder when the module cannot be imported', async () => {
        const presenterConfig = buildPresenterConfig('dpuse-presenter-broken-samples', '9.9.9');

        await expect(loadPresenter(presenterConfig, [], 'light')).rejects.toMatchObject({
            data: {
                presenterName: 'dpuse-presenter-broken-samples',
                url: 'https://engine-eu.dpuse.app/presenters/broken-samples_v9.9.9/dpuse-presenter-broken-samples.es.js',
                version: '9.9.9'
            },
            locator: 'dpuse-shared.component.module.presenter.loadPresenter',
            message: "Failed to load presenter 'dpuse-presenter-broken-samples' v9.9.9."
        });
    });
});
