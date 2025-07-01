import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import {dummyPlaces} from '../backend/dummyData';
import Card from '../components/Card';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}>
        <View style={styles.gridContainer}>
          {dummyPlaces.map(place => (
            <Card
              key={place.id}
              image={place.image}
              title={place.title}
              rating={place.rating}
              reviewCount={place.reviewCount}
              distance={place.distance}
              isSuper={place.isSuper}
              hasCampaign={place.hasCampaign}
              discountRate={place.discountRate}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fef9e1',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#fef9e1',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
