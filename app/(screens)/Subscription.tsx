import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { useStripe } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionScreen = () => {
    // Importa `initPaymentSheet` y `presentPaymentSheet` desde `useStripe`
    // `initPaymentSheet` se usa para configurar la hoja de pago, y `presentPaymentSheet` para mostrarla al usuario
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const [loading, setLoading] = useState(false);


    const initializePaymentSheet = async () => {
        setLoading(true);
        try {
            // Recupera el email y la CURP del usuario desde AsyncStorage
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const storedCurp = await AsyncStorage.getItem('userCURP');

            console.log(storedCurp);

            if (!storedEmail || !storedCurp) {
                throw new Error('Email o CURP no encontrado. Por favor, inicia sesión nuevamente.');
            }

            // Enviar una solicitud al backend para crear la suscripción con email y CURP
            const response = await fetch('http://172.31.99.151:3000/payments/create-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: storedEmail,
                    priceId: 'price_1QHb2XDuSddEszG09vtp6eXZ',
                    curp: storedCurp, // Añade la CURP al cuerpo de la solicitud

                }),
            });

            const { clientSecret } = await response.json();

            // Inicializar el PaymentSheet de Stripe
            const { error } = await initPaymentSheet({
                merchantDisplayName: 'EduZona 12',
                paymentIntentClientSecret: clientSecret,
            });

            if (!error) {
                console.log('PaymentSheet inicializado correctamente');
            } else {
                Alert.alert('Error', 'Hubo un problema al inicializar el PaymentSheet');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error inicializando PaymentSheet:', error);
                Alert.alert('Error', error.message || 'No se pudo inicializar el PaymentSheet');
            } else {
                console.error('Error desconocido:', error);
                Alert.alert('Error', 'Ocurrió un error desconocido');
            }
        } finally {
            setLoading(false);
        }
    };

    // Define la función `openPaymentSheet` para mostrar la hoja de pago al usuario
    const openPaymentSheet = async () => {
        // Llama a `presentPaymentSheet` para abrir la hoja de pago y permitir que el usuario complete el pago
        const { error } = await presentPaymentSheet();

        // Si hay un error (por ejemplo, si el usuario cancela el pago), muestra una alerta con el mensaje de error
        if (error) {
            Alert.alert('Error', error.message);
        } else {
            // Si el pago es exitoso, muestra una alerta de confirmación y realiza acciones posteriores
            Alert.alert('Éxito', 'Pago completado');
            // Aquí podrías agregar lógica adicional para gestionar la suscripción en el backend,
            // como actualizar el estado de la suscripción en la base de datos
        }
    };


    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <View style={tw`flex-1 items-center bg-white p-4`}>
            <View style={tw`mt-10 w-full`}>
                <Text style={tw`text-2xl font-bold mb-4`}>Suscríbete al Plan Premium</Text>
                <Text style={tw`text-center text-gray-600 mb-6`}>
                    Accede a todas las funciones premium de la aplicación y mejora tu experiencia.
                </Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Suscribirse ahora" onPress={openPaymentSheet} />
            )}
        </View>
    );
};

export default SubscriptionScreen;
