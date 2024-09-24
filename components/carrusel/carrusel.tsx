import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import tw from 'twrnc';

const { width } = Dimensions.get('window');

const data = [
  { title: 'Item 1', image: require('../../assets/images/logo.png') },
  { title: 'Item 2', image: require('../../assets/images/logo.png') },
  { title: 'Item 3', image: require('../../assets/images/logo.png') },
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

    return () => clearInterval(interval);
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
            tw`bg-gray-300 rounded-lg justify-center items-center mx-2`,
            {
              width: itemWidth,
              height: 390,
              transform: activeIndex === index ? [{ scale: 1.2 }] : [{ scale: 1 }],
            },
          ]}
        >
          <Image source={item.image} style={tw`w-10/12 h-4/5 rounded-lg`} />
          <Text style={tw`text-2xl text-gray-800`}>{item.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default MyCarousel;
