import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {dummyPlaces} from '../backend/dummyData';
import Card from '../components/Card';
import BurgerLogo from '../assets/burger.jpg';

// Kategori resimleri (gerçek uygulamada bunları assets'den import edebilirsiniz)
const categoryImages = {
  COFFEE: BurgerLogo,
  CAFE: BurgerLogo,
  DURGER: BurgerLogo,
  BURGER: BurgerLogo,
  DESERTS: 'https://placehold.co/100x100/FF6347/FFFFFF?text=Tatlı',
  SEAFOOD: 'https://placehold.co/100x100/4682B4/FFFFFF?text=Balık',
  PIZZA: 'https://placehold.co/100x100/DC143C/FFFFFF?text=Pizza',
  KEBAP: 'https://placehold.co/100x100/8B0000/FFFFFF?text=Kebap',
};

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Kategorileri filtrele
  const superPlaces = dummyPlaces.filter(place => place.isSuper);
  const nearbyPlaces = dummyPlaces.filter(place => !place.isSuper);
  const campaignPlaces = dummyPlaces.filter(place => place.hasCampaign);

  // Tüm kategorileri al
  const allCategories = Array.from(
    new Set(dummyPlaces.map(place => place.category)),
  );

  // Seçili kategoriye göre filtrele
  const filteredPlaces = activeCategory
    ? dummyPlaces.filter(place => place.category === activeCategory)
    : null;

  const renderSection = (
    title: string,
    places: any[],
    showAllButton: boolean,
  ) => {
    const displayedPlaces = showAllButton ? places.slice(0, 3) : places;

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {showAllButton && places.length > 3 && (
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.gridContainer}>
          {displayedPlaces.map(place => (
            <Card
              key={place.id}
              image={place.image}
              category={place.category}
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}>
        {/* Fotoğraflı Kategori Seçimi */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScrollContent}>
            {allCategories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryImageButton,
                  activeCategory === category && styles.activeCategoryButton,
                ]}
                onPress={() =>
                  setActiveCategory(
                    activeCategory === category ? null : category,
                  )
                }>
                <Image
                  source={categoryImages[category]}
                  style={styles.categoryImage}
                />
                <Text
                  style={[
                    styles.categoryLabel,
                    activeCategory === category && styles.activeCategoryLabel,
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filtrelenmiş Sonuçlar (kategori seçiliyse) */}
        {activeCategory && (
          <View style={styles.filteredResultsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{activeCategory}</Text>
              <TouchableOpacity onPress={() => setActiveCategory(null)}>
                <Text style={styles.seeAllText}>Kapat</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.gridContainer}>
              {filteredPlaces?.map(place => (
                <Card
                  key={place.id}
                  image={place.image}
                  category={place.category}
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
          </View>
        )}

        {/* Normal Bölümler (kategori seçili değilse) */}
        {!activeCategory && (
          <>
            {renderSection('Super Mekanlar', superPlaces, true)}
            {renderSection('Yakınımdakiler', nearbyPlaces, true)}
            {renderSection('Kampanyalı Mekanlar', campaignPlaces, true)}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');
const CATEGORY_ITEM_WIDTH = width / 5;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fef7ec',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 32,
    backgroundColor: '#fef7ec',
  },
  sectionContainer: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a0202',
  },
  seeAllText: {
    fontSize: 12,
    color: '#A93226',
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    marginBottom: 36,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a0202',
    marginBottom: 8,
  },
  categoryScrollContent: {
    paddingRight: 12,
  },
  categoryImageButton: {
    width: CATEGORY_ITEM_WIDTH,
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 30,
    backgroundColor: '#f0ac99',
  },
  activeCategoryButton: {
    opacity: 0.8,
  },
  categoryImage: {
    width: CATEGORY_ITEM_WIDTH - 20,
    height: CATEGORY_ITEM_WIDTH - 20,
    borderRadius: 100,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
  activeCategoryLabel: {
    color: '#A93226',
    fontWeight: '700',
  },
  filteredResultsContainer: {
    marginBottom: 16,
  },
});

export default HomeScreen;
