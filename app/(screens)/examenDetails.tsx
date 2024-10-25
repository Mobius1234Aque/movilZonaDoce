import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Button, Linking } from "react-native";
import { useLocalSearchParams } from 'expo-router';  // Usa useLocalSearchParams para obtener params
import axios from 'axios';
import tw from "twrnc";

interface ExamData {
    numero: string;
    materia: string;
    descripcion: string;
    fecha: string;
    hora: string;
    pdf: string;
}

export default function ExamDetailsScreen() {
    const { examId, examData: examDataString } = useLocalSearchParams();

    // Convertimos examData string en objeto JSON
    const examData: ExamData | null = examDataString ? JSON.parse(examDataString as string) : null;

    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await axios.get(`https://servidor-zonadoce.vercel.app/getPdf?id=${examId}`);
                setPdfUrl(response.data.pdfUrl);
            } catch (error) {
                console.error("Error fetching PDF:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPdf();
    }, [examId]);

    const openPdfExternally = () => {
        if (pdfUrl) {
            Linking.openURL(pdfUrl);  // Abre el PDF externamente en el navegador o visor de PDF
        } else {
            console.log('No PDF URL available');
        }
    };

    if (!examData) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text>No se pudo cargar la información del examen.</Text>
            </View>
        );
    }

    return (
        <View style={tw`flex-1 bg-white`}>
            {/* Exam Details */}
            <View style={tw`p-8 `}>
                <Text style={tw`text-5xl pb-4 font-bold`}>Examen {examData.numero}</Text>
                <Text style={tw`text-gray-600`}>
                    <Text style={tw`font-bold text-xl`}>Materia: </Text> {examData.materia}{"\n"}
                    <Text style={tw`font-bold text-xl`}>Descripción:</Text> {examData.descripcion}{"\n"}
                    <Text style={tw`font-bold text-xl`}>Fecha:</Text> {examData.fecha}{"\n"}
                    <Text style={tw`font-bold text-xl`}>Hora:</Text> {examData.hora}
                </Text>
            </View>

            {/* Botón para abrir el PDF */}
            <View style={tw`p-8`}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : pdfUrl ? (
                    <Button title="Abrir PDF" onPress={openPdfExternally} />
                ) : (
                    <Text>No se encontró el PDF.</Text>
                )}
            </View>
        </View>
    );
}
