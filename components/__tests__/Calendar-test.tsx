// components/__tests__/Calendar-test.tsx
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import CalendarWithItems from '@/components/calendar/CalendarItems';
import { loadAgenda } from '@/app/(tabs)/Controllers/calendarioController';

// Mockear la función loadAgenda
jest.mock('@/app/(tabs)/Controllers/calendarioController', () => ({
    loadAgenda: jest.fn(),
}));

describe('CalendarWithItems Component', () => {
    beforeEach(() => {
        (loadAgenda as jest.Mock).mockResolvedValue({
            success: true,
            markedDates: {
                '2024-10-25': {
                    customStyles: {
                        container: { backgroundColor: 'green' },
                        text: { color: 'white', fontWeight: 'bold' },
                    },
                },
            },
            agendaByDate: {
                '2024-10-25': [{ id: 1, descripcion: 'Evento 1', duracion: '1h' }],
            },
        });
    });

    it('should show loading indicator while fetching data', async () => {
        const { getByTestId } = render(<CalendarWithItems testID="calendar-items" />);

        // Verifica que el indicador de carga está presente
        expect(getByTestId('loading-indicator')).toBeTruthy();

        // Espera a que termine la carga
        await waitFor(() => {
            expect(getByTestId('loading-indicator')).toBeNull();
        });
    });

    it('should render Calendar and FlatList after data is loaded', async () => {
        const { getByTestId } = render(<CalendarWithItems testID="calendar-items" />);

        // Espera que la carga termine y el calendario se renderice
        await waitFor(() => {
            expect(getByTestId('calendar-component')).toBeTruthy();
        });
    });

    it('should display "No hay actividades para este día" when no items are available', async () => {
        (loadAgenda as jest.Mock).mockResolvedValue({
            success: true,
            markedDates: {},
            agendaByDate: {},  // Simula que no hay actividades
        });

        const { getByText } = render(<CalendarWithItems testID="calendar-items" />);

        // Espera que el texto "No hay actividades para este día" se muestre
        await waitFor(() => {
            expect(getByText('No hay actividades para este día.')).toBeTruthy();
        });
    });
});
