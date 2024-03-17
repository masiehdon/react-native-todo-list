import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text, Dimensions, ScrollView, SafeAreaView, Platform } from 'react-native';
import { supabase } from './lib/supabase';
import CustomInput from './components/Input';
import Auth from './components/auth/Auth';
import { Session } from '@supabase/supabase-js';
import TodoList from './components/TodoList';



export default function App() {
  const [textInput, setTextInput] = useState('')
  const [task, setTask] = useState([]);
  const [session, setSession] = useState(null);
  const [done, setDone] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);


   const handleAddTask = async () => {
    try {
      if (textInput.trim() !== '') {
        const { data, error } = await supabase
          .from('todos')
          .insert([{ task: textInput, done: false, user_id: session?.user.id}]);
        
        if (error) {
          throw error;
        }
        setTask(prevTasks => [
          ...prevTasks,
          {
            id: '',
            task: textInput,
            done: false,
            data: '',
            is_complete: false, 
          },
        ]);
      }
      console.log('task:', task);
      setTextInput('')
      
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const windowHeight = Dimensions.get('window').height;

return (
    
    <SafeAreaView style={styles.container}>
      {session ? 
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Task List</Text>
          <CustomInput
            textInput={textInput}
            setTextInput={setTextInput} 
            handleAddTask={handleAddTask}          
            />
            <ScrollView contentContainerStyle={styles.scrollViewContent} bounces={false}>
          <TodoList 
            task={task}
            done={done}
            setDone={setDone}
          />  
          </ScrollView>
          <View style={styles.signOutButtonContainer}>
            <Button 
            title="Sign Out" 
            onPress={() => supabase.auth.signOut()} 
            />
          </View>
        </View>
      : 
        <Auth />
      }
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? 35 : 'none',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
  },
  innerContainer: {
    flex: 1,
    minWidth: '90%',
    justifyContent: 'center',
    marginTop: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'red',
    },
    scrollViewContent: {
      flexGrow: 1,
      marginBottom: 25,
  },
  signOutButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: Platform.OS === 'ios' ? '#dc3545' : 'none',
    shadowColor: '#000',         
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.45,          
    shadowRadius: 5,               
    elevation: 8,    
  },
});
