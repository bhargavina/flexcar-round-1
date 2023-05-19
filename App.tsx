import React, {useMemo, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ICategoryItem, mockData} from './mockData';
import CategoryCard from './src/components/categoryCard/CategoryCard';

function App(): JSX.Element {
  const [list] = useState(mockData.categories);
  const [searchText, setSearchText] = useState<string>('');
  const [categories, setCategories] = useState<
    Array<{name: string; id: string; selected: boolean}>
  >(
    mockData.categories.map(cat => ({
      name: cat.name,
      id: cat.id,
      selected: true,
    })),
  );

  const searchResults = useMemo(() => {
    const result: Array<ICategoryItem> = [];
    list.forEach(item => {
      const isCategorySelected = categories.find(
        cat => cat.id === item.id,
      )?.selected;
      if (
        item['menu-items'].find(mu =>
          mu.name.toLowerCase().includes(searchText.toLowerCase()),
        )
      ) {
        if (isCategorySelected) {
          result.push({
            ...item,
            'menu-items': item['menu-items'].filter(mu =>
              mu.name.toLowerCase().includes(searchText.toLowerCase()),
            ),
          });
        }
      }
    });
    return result;
  }, [searchText, list, categories]);

  function handleSearchChange(newText: string): void {
    setSearchText(newText);
  }

  function handleCategoryItemClick(clickedId: string): void {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === clickedId ? {...cat, selected: !cat.selected} : cat,
      ),
    );
  }

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchText}
          onChangeText={handleSearchChange}
          style={styles.searchInput}
          placeholder="Search..."
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.filterContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {categories.map((cat, index: number) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => handleCategoryItemClick(cat.id)}
            style={[
              index === 0 ? styles.firstCategoryItem : {},
              index === categories.length - 1 ? styles.lastCategoryItem : {},
              index !== 0 && index !== categories.length - 1
                ? styles.midCategoryItems
                : {},
              styles.categoryItem,
            ]}>
            <View style={cat.selected ? styles.selected : styles.unselected} />
            <Text>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CategoryCard name={item.name} menuItems={item['menu-items']} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    paddingBottom: 118,
    backgroundColor: '#FFF',
  },
  searchContainer: {
    margin: 16,
    borderWidth: 1,
    borderColor: 'black',
  },
  searchInput: {
    color: 'black',
    fontSize: 16,
  },
  filterContainer: {
    marginHorizontal: 16,
    height: 40,
    marginBottom: 16,
  },
  firstCategoryItem: {
    marginStart: 0,
    marginEnd: 8,
  },
  midCategoryItems: {
    marginHorizontal: 8,
  },
  lastCategoryItem: {
    marginStart: 8,
    marginEnd: 0,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selected: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: 'black',
    marginEnd: 8,
  },
  unselected: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginEnd: 8,
  },
});

export default App;
