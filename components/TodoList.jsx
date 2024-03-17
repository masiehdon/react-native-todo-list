// import React, { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase'
// import { StyleSheet, View, Text, ScrollView } from 'react-native';
// import CheckboxComponent from './CheckboxComponent';
// import DeleteIcon from './DeleteIcon';

// export default function TodoList({ task, done, setDone }) {
//   const [displayTodo, setDisplayTodo] = useState([]);

//   useEffect(() => {
//     fetchTodos();
//     console.log('fetched todos. done is: ', done);
//   }, [task, done]);

//   const fetchTodos = async () => {
//       try {
//         const { data, error } = await supabase
//           .from('todos')
//           .select('*');
//           console.log('data: ', data)
//         if (error) {
//           throw error;
//         }
//         setDisplayTodo(data);
//       } catch (error) {
//         console.error('Error fetching todos:', error);
//       }
//     };


//   const handleDeleteItem = async (id) => {
//     try {
//       const { data, error } = await supabase
//         .from('todos')
//         .delete()
//         .eq('id', id);
  
//       console.log('id DELETE: ', id);
  
//       if (error) {
//         throw error;
//       }

//       fetchTodos();

//     } catch (error) {
//       console.error('Error deleting todo:', error);
//     }
//   };

//   return (
//     // <View style={styles.container}>
//        <ScrollView>
//         {displayTodo.map(item => (
//           <View key={item.id} style={styles.item}>
//             <CheckboxComponent  
//               done={item.done} 
//               setDone={setDone} 
//               id={item.id}
//             />
//               <Text style={styles.taskText}>{item.task}</Text>
   
//             <DeleteIcon 
//               testId='test'
//               handleDeleteItem={handleDeleteItem} 
//               id={item.id} 
//             />
//           </View>
//         ))}
//     </ScrollView> 
//     // </View>
//   );
// } 

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   taskText: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: 'black'
//   },
// });


////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import CheckboxComponent from './CheckboxComponent';
import DeleteIcon from './DeleteIcon';

export default function TodoList({ task, done, setDone }) {
  const [displayTodo, setDisplayTodo] = useState([]);

  useEffect(() => {
    fetchTodos();
    console.log('fetched todos. done is: ', done);
  }, [task, done]);

  const fetchTodos = async () => {
    try {
      const { data, error } = await supabase.from('todos').select('*');
      console.log('data: ', data);
      if (error) {
        throw error;
      }
      setDisplayTodo(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const { data, error } = await supabase.from('todos').delete().eq('id', id);

      console.log('id DELETE: ', id);

      if (error) {
        throw error;
      }

      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {displayTodo.map((item) => (
        <View key={item.id} style={styles.todoContainer}>
          <CheckboxComponent done={item.done} setDone={setDone} id={item.id} />
          <Text style={styles.taskText}>{item.task}</Text>
          <DeleteIcon testId="test" handleDeleteItem={handleDeleteItem} id={item.id} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
  },
  taskText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});
