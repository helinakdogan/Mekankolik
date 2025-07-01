import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {dummyPlaces} from '../backend/dummyData';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Params = {
  CompanyProfileScreen: {
    placeId: string;
  };
};

const CompanyProfileScreen = () => {
  const route = useRoute<RouteProp<Params, 'CompanyProfileScreen'>>();
  const {placeId} = route.params;

  const place = dummyPlaces.find(p => p.id === placeId);

  if (!place) {
    return (
      <View style={styles.center}>
        <Text>Place not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: place.image}} style={styles.image} />
      <Text style={styles.title}>{place.title}</Text>

      <View style={styles.row}>
        <Ionicons name="star" size={14} color="#FFD700" />
        <Text style={styles.text}>
          {place.rating.toFixed(1)} ({place.reviewCount}+)
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={14} color="#555" />
        <Text style={styles.text}>{place.distance}</Text>
      </View>

      {place.isSuper && (
        <View style={styles.badgeSuper}>
          <Text style={styles.badgeText}>⭐ Super Mekan</Text>
        </View>
      )}

      {place.hasCampaign && place.discountRate && (
        <View style={styles.badgeCampaign}>
          <Text style={styles.badgeText}>
            🔖 %{place.discountRate} İndirim Var!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    marginLeft: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  badgeSuper: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  badgeCampaign: {
    backgroundColor: '#A93226',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
  },
  badgeText: {
    color: 'white',
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CompanyProfileScreen;
