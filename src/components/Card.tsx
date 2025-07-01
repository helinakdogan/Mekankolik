import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../assets/companylogo.png';
import {useNavigation} from '@react-navigation/native';

interface CardProps {
  image?: string;
  category?: string;
  title: string;
  rating: number;
  reviewCount: number;
  distance: string;
  isSuper?: boolean;
  hasCampaign?: boolean;
  discountRate?: number;
  id?: string; // Opsiyonel ID geçirilebilir
}

const CARD_WIDTH = (Dimensions.get('window').width - 32) / 3.2;
const IMAGE_SIZE = CARD_WIDTH * 0.9;
const CARD_HEIGHT = IMAGE_SIZE + 80;

const Card: React.FC<CardProps> = ({
  image,
  category,
  title,
  rating,
  reviewCount,
  distance,
  isSuper,
  hasCampaign,
  discountRate,
  id,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(
      'CompanyProfileScreen' as never,
      {placeId: id} as never,
    );
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({pressed}) => [styles.card, pressed && {opacity: 0.9}]}>
      <View style={[styles.imageContainer, isSuper && styles.superBorder]}>
        <Image source={Logo} style={styles.image} resizeMode="cover" />

        {hasCampaign && discountRate && (
          <View style={styles.campaignBadge}>
            <Ionicons name="pricetag" size={10} color="white" />
            <Text style={styles.campaignText}>%{discountRate} İndirim!</Text>
          </View>
        )}
      </View>

      <View style={styles.textContent}>
        {category && (
          <Text style={styles.categoryText} numberOfLines={1}>
            {category}
          </Text>
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>
              {rating.toFixed(1)} ({reviewCount})
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={12} color="#555" />
            <Text style={styles.subText}>{distance}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    overflow: 'hidden',
    position: 'relative',
  },
  superBorder: {
    borderColor: '#FFD700',
    borderWidth: 1.5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  campaignBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#A93226',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  campaignText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  textContent: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#888',
    textAlign: 'center',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  titleContainer: {
    minHeight: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a0202',
    textAlign: 'center',
    lineHeight: 16,
  },
  detailsContainer: {
    marginTop: 'auto',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 11,
    color: '#333',
  },
  subText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
});

export default Card;
