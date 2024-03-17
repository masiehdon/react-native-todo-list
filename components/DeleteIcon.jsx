import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, View, Text } from 'react-native';

export default function DeleteIcon({ handleDeleteItem, id }) {
  return (
    <TouchableOpacity onPress={() => handleDeleteItem(id)}>
      <View>
      <AntDesign name="delete" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
}
