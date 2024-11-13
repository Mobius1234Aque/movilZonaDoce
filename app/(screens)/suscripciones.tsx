import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, Image, Alert } from 'react-native';
import PricingCard from '@/components/cards/pricingCard';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FreePlanScreen = () => {
  const router = useRouter();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState<string | null>(null);

  // Función para verificar el estado de suscripción y obtener el stripeSubscriptionId
  const verificarSuscripcion = async () => {
    try {
      const curp = await AsyncStorage.getItem('userCURP');
      if (!curp) throw new Error('No se encontró el CURP');

      const response = await fetch(`http://192.168.101.18:3000/payments/verify-subscription-status?curp=${curp}`);
      const data = await response.json();

      setIsSubscribed(data.hasSubscription);
      setStripeSubscriptionId(data.stripeSubscriptionId); // Guarda el stripeSubscriptionId en el estado
    } catch (error) {
      console.error('Error al verificar la suscripción:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelarSuscripcion = async () => {
    try {
      const curp = await AsyncStorage.getItem('userCURP');

      if (!curp || !stripeSubscriptionId) {
        Alert.alert('Error', 'No se pudo encontrar la información de la suscripción.');
        return;
      }

      const response = await fetch('http://192.168.101.18:3000/payments/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ curp, stripeSubscriptionId }),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Tu suscripción ha sido cancelada.');
        setIsSubscribed(false);
      } else {
        const errorData = await response.json();
        console.error('Error al cancelar la suscripción:', errorData);
        Alert.alert('Error', 'No se pudo cancelar la suscripción. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al cancelar la suscripción:', error);
      Alert.alert('Error', 'No se pudo cancelar la suscripción.');
    }
  };

  const confirmarCancelacion = () => {
    Alert.alert(
      'Confirmar cancelación',
      '¿Estás seguro de que quieres cancelar tu suscripción?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Sí', onPress: cancelarSuscripcion },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    verificarSuscripcion();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 items-center bg-white`}>
      <View style={tw`flex flex-row self-start ml-4 mt-4`}>
        <TouchableOpacity onPress={handleGoBack} style={tw`flex-row items-center mb-4`}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          <Text style={tw`text-lg text-black ml-2`}>Regresar</Text>
        </TouchableOpacity>
      </View>

      {isSubscribed ? (
        <View style={tw`mt-10 bg-white`}>
          <Text style={tw`text-4xl font-bold text-center text-[#00314A]`}>
            ¡Disfrute de los beneficios premium!
          </Text>
          <Text style={tw`mx-4 text-xl font-semibold mt-5`}>
            Usted ha pagado su suscripción para este mes.
          </Text>
          <View style={tw`flex items-center mt-10`}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/macubeta/fireworks.png' }}
              style={tw`w-80 h-80 `}
            />
          </View>
          <View style={tw`flex items-center mt-10`}>
            <TouchableOpacity onPress={confirmarCancelacion}>
              <Text style={tw`text-blue-500 underline text-lg`}>
                ¿Quieres cancelar tu suscripción? 😭
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={tw`mt-16 bg-white`}>
          <PricingCard
            title="GRATUITO"
            price="0"
            description="Organize across all apps by hand"
            buttonText="Plan gratuito"
            onPress={() => console.log("Free plan selected")}
          />
          <PricingCard
            title="Premium"
            price="60"
            description="Organize across all apps by hand"
            buttonText="Plan premium"
            onPress={() => router.push('../(screens)/Subscription')}
          />
        </View>
      )}
    </View>
  );
};

export default FreePlanScreen;
