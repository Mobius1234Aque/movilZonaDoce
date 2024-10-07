// Button.tsx
import { Text, View, Pressable, Dimensions } from "react-native";
import React from "react";
import tw from "twrnc";

interface ButtonProps {
    title: string;
    onPress: () => void;
}

const { width } = Dimensions.get("window");


const Boton: React.FC<ButtonProps> = ({ title, onPress }) => {
    return (
        <View style={{width}}>
            <Pressable style={tw`bg-[#00314A] p-4 mx-8 rounded`} onPress={onPress}>
                <Text style={tw`text-white text-center text-xl font-bold tracking-wider`}>{title}</Text>
            </Pressable>
        </View>
    );
};

export default Boton;
