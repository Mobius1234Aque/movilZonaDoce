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
        // Activa el estado de carga mientras se ejecuta la configuración
        setLoading(true);
        try {
            // Recupera el email del usuario almacenado en `AsyncStorage`
            const storedEmail = await AsyncStorage.getItem('userEmail');

            // Si el email no se encuentra, lanza un error indicando que el usuario debe iniciar sesión nuevamente
            if (!storedEmail) throw new Error('Email no encontrado. Por favor, inicia sesión nuevamente.');

            // Envía una solicitud para crear la suscripción en el backend
            // La solicitud se envía a la URL donde está configurado el servidor backend
            const response = await fetch('http://192.168.101.18:3000/payments/create-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Establece el tipo de contenido como JSON
                },
                body: JSON.stringify({
                    email: storedEmail, // Envía el correo del usuario como parte del cuerpo de la solicitud
                    priceId: 'price_1QHb2XDuSddEszG09vtp6eXZ', // Reemplaza con el ID de precio real de Stripe
                }),
            });

            // Espera la respuesta del servidor y extrae el `clientSecret` de la respuesta JSON
            const { clientSecret } = await response.json();

            // Inicializa el PaymentSheet de Stripe con `initPaymentSheet`
            // Incluye el `clientSecret` y el nombre del comercio que verá el usuario
            const { error } = await initPaymentSheet({
                merchantDisplayName: 'EduZona 12', // Nombre visible en la hoja de pago
                paymentIntentClientSecret: clientSecret, // Clave secreta del pago
            });

            // Verifica si `initPaymentSheet` arrojó un error
            if (!error) {
                console.log('PaymentSheet inicializado correctamente');
            } else {
                // Muestra una alerta si hay un error al inicializar el PaymentSheet
                Alert.alert('Error', 'Hubo un problema al inicializar el PaymentSheet');
            }
        } catch (error) {
            // Muestra un mensaje de error si ocurre un problema en cualquier parte del proceso
            if (error instanceof Error) {
                // Si el error es una instancia de `Error`, muestra el mensaje de error en la consola y en una alerta
                console.error('Error inicializando PaymentSheet:', error);
                Alert.alert('Error', error.message || 'No se pudo inicializar el PaymentSheet');
            } else {
                // Muestra un mensaje de error genérico si el error no es una instancia de `Error`
                console.error('Error desconocido:', error);
                Alert.alert('Error', 'Ocurrió un error desconocido');
            }
        } finally {
            // Desactiva el estado de carga independientemente de si el proceso fue exitoso o no
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
