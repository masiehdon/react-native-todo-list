import { CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';


const CheckboxComponent= ({ done, setDone, id }) => {
  const handlePressCheck = async () => {
 
  try {
    await supabase
      .from('todos')
      .update({ done: !done })
      .eq('id', id);
    
    setDone((prevDone) => !prevDone);
    
  } catch (error) {
    console.error('Error toggling task status:', error);
  }
  console.log('check pressed, DONE: ', done)
    console.log('check pressed, checkbox id: ', id)
};
  
 return (
  <TouchableOpacity testID='check'>
  <CheckBox
          checked={done}
          onPress={handlePressCheck}
          checkedColor="green"
          uncheckedColor="red"
        /> 

  </TouchableOpacity>
  
)
}

export default CheckboxComponent;
