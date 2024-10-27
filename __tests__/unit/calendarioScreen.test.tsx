import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Calendario from '@/app/(tabs)/calendario';

describe('Calendario Screen', () => {
    it('should render CalendarWithItems component', async () => {
        const { getByTestId } = render(<Calendario />);

        // Espera a que se renderice el componente después de la carga
        await waitFor(() => {
            expect(getByTestId('calendar-items')).toBeTruthy();
        }, { timeout: 10000 });  // Aumenta el timeout si el proceso toma más tiempo
    });
});
