/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    [],
  );

  const categories = useMemo(
    () => mockData.categories.map(cat => ({name: cat.name, id: cat.id})),
    [],
  );

  const searchResults = useMemo(() => {
    const result: Array<ICategoryItem> = [];
    list.forEach(item => {
      if (
        item['menu-items'].find(mu =>
          mu.name.toLowerCase().includes(searchText.toLowerCase()),
        )
      ) {
        result.push({
          ...item,
          'menu-items': item['menu-items'].filter(mu =>
            mu.name.toLowerCase().includes(searchText.toLowerCase()),
          ),
        });
      }
    });
    return result;
  }, [searchText, list]);

  function handleSearchChange(newText: string) {
    setSearchText(newText);
  }

  function handleCategoryItemClick(clickedId: string): void {
    if (selectedCategories.includes(clickedId)) {
      setSelectedCategories((prev: Array<string>) =>
        prev.filter((cat: string) => cat !== clickedId),
      );
    } else {
      setSelectedCategories((prev: Array<string>) => [...prev, clickedId]);
    }
  }

  return (
    <SafeAreaView>
      <TextInput
        value={searchText}
        onChangeText={handleSearchChange}
        style={styles.searchInput}
        placeholder="Search..."
      />
      <ScrollView contentContainerStyle={styles.filterContainer} horizontal>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={styles.categoryItem}
            onPress={() => handleCategoryItemClick(cat.id)}>
            <View
              style={
                selectedCategories.includes(cat.id)
                  ? styles.selected
                  : styles.unselected
              }
            />
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
    alignItems: 'center',
  },
  searchInput: {
    color: 'black',
    fontSize: 16,
    alignSelf: 'flex-start',
    margin: 16,
    borderWidth: 1,
    borderColor: 'black',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  filterContainer: {
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 16,
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
