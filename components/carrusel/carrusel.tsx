import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import tw from 'twrnc';

const { width } = Dimensions.get('window');

const data = [
    { title: 'Item 1', image: require('./path/to/image1.jpg') },
    { title: 'Item 2', image: require('./path/to/image2.jpg') },
    { title: 'Item 3', image: require('./path/to/image3.jpg') },
    // Agrega más elementos según sea necesario
];

const MyCarousel: React.FC = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const itemWidth = width * 0.7;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
            scrollViewRef.current?.scrollTo({
                x: (itemWidth + (width * 0.1 / 2)) * ((activeIndex + 1) % data.length),
                animated: true,
            });
        }, 3000); // Cambiar cada 3 segundos

        return () => clearInterval(interval); // Limpiar el intervalo al desmontar
    }, [activeIndex, itemWidth]);

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`flex-row`}
            onScroll={({ nativeEvent }) => {
                const currentIndex = Math.floor(nativeEvent.contentOffset.x / (itemWidth + (width * 0.1 / 2)));
                setActiveIndex(currentIndex);
            }}
        >
            {data.map((item, index) => (
                <View
                    key={index}
                    style={[
                        styles.itemContainer,
                        { width: itemWidth, transform: activeIndex === index ? [{ scale: 1.2 }] : [{ scale: 1 }] },
                    ]}
                >
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.itemText}>{item.title}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        height: 390,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.1 / 2, // Espacio entre elementos
    },
    image: {
        width: '100%',
        height: '80%',
        borderRadius: 10,
    },
    itemText: {
        fontSize: 24,
        color: '#333',
    },
});

export default MyCarousel;
