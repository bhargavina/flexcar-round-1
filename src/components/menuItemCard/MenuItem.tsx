import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './MenuItemStyles';

interface MenuItemProps {
  name: string;
  description: string;
  images?: Array<string>;
  subItems?: Array<any>;
}

export default function MenuItem(props: MenuItemProps) {
  const {name = '', description = ''} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>{name}</Text>
      {description.length ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </View>
  );
}
