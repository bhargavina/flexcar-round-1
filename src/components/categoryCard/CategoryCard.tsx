import React from 'react';
import {View, Text, FlatList} from 'react-native';
import MenuItem from '../menuItemCard/MenuItem';
import {styles} from './CategoryCardStyles';
import {IMenuItem} from '../../../mockData';

interface CategoryCardProps {
  name: string;
  menuItems: Array<IMenuItem>;
}

export default function CategoryCard(props: CategoryCardProps): JSX.Element {
  const {name = '', menuItems = []} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.categoryName}>{name}</Text>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MenuItem name={item.name} description={item.description} />
        )}
      />
    </View>
  );
}
