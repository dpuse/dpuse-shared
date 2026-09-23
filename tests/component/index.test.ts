import { describe, expect, it } from 'vitest';

import { getComponentStatus } from '@/component';

describe('getComponentStatus', () => {
    it('returns the colour and localized label for a known status', () => {
        expect(getComponentStatus('alpha')).toEqual({ color: 'danger', label: 'alpha' });
        expect(getComponentStatus('beta', 'es')).toEqual({ color: 'warning', label: 'beta' });
        expect(getComponentStatus('releaseCandidate', 'es')).toEqual({ color: 'success', label: 'candidato-de-lanzamiento' });
    });

    // General availability is deliberately unlabelled, so the badge renders as nothing rather than saying 'stable'.
    it('returns an empty label for general availability', () => {
        expect(getComponentStatus('generalAvailability')).toEqual({ color: 'success', label: '' });
    });

    it('reports an unknown status as a danger with the id as its label', () => {
        expect(getComponentStatus('nonsense')).toEqual({ color: 'danger', label: 'nonsense' });
    });
});
