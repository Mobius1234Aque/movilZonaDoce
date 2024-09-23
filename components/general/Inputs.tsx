import { TextInput, Dimensions, SafeAreaView } from "react-native";
import React from "react";
import tw from "twrnc";

interface ButtonProps {
    title: string;
    onPress: () => void;
}

const { width } = Dimensions.get("window");

const Input: React.FC<ButtonProps> = ({ title, onPress }) => {
    return (
        <SafeAreaView style={tw`w-[${width}px] my-2 self-center`}>
            <TextInput
                style={tw`h-12 border border-gray-300 rounded-lg px-4 mx-8 bg-gray-100 text-xl`}
                placeholder={title}
                keyboardType="default"
                placeholderTextColor="#888"
            />
        </SafeAreaView>
    );
};

export default Input;
