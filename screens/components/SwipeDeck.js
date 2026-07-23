import React, { useRef, useState } from 'react';
import { View, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 220;
const STACK_SIZE = 4; // on kart + arkada 3 kart

// Cekirdek RN Animated + PanResponder ile yazilmis sonsuz kart destesi.
// Native ek bagimlilik yok -> OTA ile guncellenebilir. Kartlar bitmez:
// index dizinin uzunluguna gore modulo ile doner.
export default function SwipeDeck({ cards, renderCard, onSwipeLeft, onSwipeRight }) {
  const [index, setIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  // PanResponder bir kez kurulur; guncel deger/callback'lere ref uzerinden erisir
  // (stale-closure onlemek icin).
  const stateRef = useRef({});
  stateRef.current = { index, cards, onSwipeLeft, onSwipeRight };

  const onSwipeComplete = (direction) => {
    const s = stateRef.current;
    const len = s.cards.length;
    const nextIndex = (s.index + 1) % len;
    const nextCard = s.cards[nextIndex];
    if (direction === 'left') s.onSwipeLeft?.(nextCard);
    else s.onSwipeRight?.(nextCard);
    position.setValue({ x: 0, y: 0 });
    setIndex(nextIndex);
  };

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH * 1.4 : -SCREEN_WIDTH * 1.4;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 4,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) forceSwipe('right');
        else if (gesture.dx < -SWIPE_THRESHOLD) forceSwipe('left');
        else resetPosition();
      },
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
    outputRange: ['-28deg', '0deg', '28deg'],
  });

  // On karti kaydirdikca hemen arkadaki kart one dogru gelir (asagidan yukari).
  const nextScale = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    outputRange: [1, 0.95, 1],
    extrapolate: 'clamp',
  });
  const nextTranslateY = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    outputRange: [0, 26, 0],
    extrapolate: 'clamp',
  });

  if (!cards || cards.length === 0) return null;

  const renderStack = () => {
    const len = cards.length;
    const items = [];
    // Arkadan one dogru olustur; son eklenen (on kart) en ustte kalir.
    for (let depth = STACK_SIZE - 1; depth >= 0; depth--) {
      const cardIdx = (index + depth) % len;
      const card = cards[cardIdx];

      if (depth === 0) {
        items.push(
          <Animated.View
            key="front"
            style={[
              styles.cardWrapper,
              { transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }] },
            ]}
            {...panResponder.panHandlers}
          >
            {renderCard(card)}
          </Animated.View>
        );
      } else if (depth === 1) {
        items.push(
          <Animated.View
            key="depth1"
            style={[
              styles.cardWrapper,
              { transform: [{ scale: nextScale }, { translateY: nextTranslateY }] },
            ]}
          >
            {renderCard(card)}
          </Animated.View>
        );
      } else {
        const scale = 1 - depth * 0.05;
        const translateY = depth * 26;
        items.push(
          <Animated.View
            key={`depth${depth}`}
            style={[styles.cardWrapper, { transform: [{ scale }, { translateY }] }]}
          >
            {renderCard(card)}
          </Animated.View>
        );
      }
    }
    return items;
  };

  return <View style={styles.container}>{renderStack()}</View>;
}

const styles = StyleSheet.create({
  container: {
    height: 440,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
