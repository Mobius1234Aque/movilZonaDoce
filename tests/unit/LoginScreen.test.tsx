// __tests__/LoginScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '@/app/(user)/screens/loginScreen';
import { handleLogin } from '@/app/(user)/Controller/authController';
import { useRouter } from 'expo-router';

// Mockear las dependencias
jest.mock('@/app/(user)/Controller/authController');
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

describe('LoginScreen', () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render inputs and button correctly', () => {
        const { getByText, getByPlaceholderText } = render(<LoginScreen />);

        expect(getByText('¡Bienvenido de vuelta!')).toBeTruthy();
        expect(getByPlaceholderText('Ingresa tu CURP *')).toBeTruthy();
        expect(getByPlaceholderText('Contraseña')).toBeTruthy();
        expect(getByText('Iniciar sesión')).toBeTruthy();
    });

    it('should show error message when login fails', async () => {
        (handleLogin as jest.Mock).mockResolvedValue({ success: false, message: 'Credenciales incorrectas' });

        const { getByText, getByPlaceholderText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('Ingresa tu CURP *'), 'ABC123456789');
        fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password123');
        fireEvent.press(getByText('Iniciar sesión'));

        await waitFor(() => {
            expect(getByText('Credenciales incorrectas')).toBeTruthy();
        });
    });

    it('should navigate to home screen when login is successful', async () => {
        (handleLogin as jest.Mock).mockResolvedValue({ success: true });

        const { getByText, getByPlaceholderText } = render(<LoginScreen />);

        fireEvent.changeText(getByPlaceholderText('Ingresa tu CURP *'), 'ABC123456789');
        fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password123');
        fireEvent.press(getByText('Iniciar sesión'));

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/(tabs)');
        });
    });

    it('should navigate to forgot password screen when "¿Olvidaste tu contraseña?" is pressed', () => {
        const { getByText } = render(<LoginScreen />);

        fireEvent.press(getByText('¿Olvidaste tu contraseña?'));

        expect(mockPush).toHaveBeenCalledWith('/(user)/screens/recuperar');
    });
});
