import { TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';


const CustomInput = (props) => {
    const { textInput, setTextInput } = props;
  
    const handleTextChange = (text) => {
      setTextInput(text)
      console.log('text: ', text)
  };
  
  return (
        <SafeAreaView>
        <TextInput
        style={styles.input}
          placeholder="Add a task"
          onChangeText={handleTextChange} 
          value={textInput}
        />
  
        <Button
        title='Add Task'
        onPress={props.handleAddTask}
         />
  
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    input: {
      marginTop: 30,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    }
    })
  
  
  
    export default CustomInput;