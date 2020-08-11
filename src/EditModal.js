import React, { useEffect, useState } from 'react';
import {
  Text,
  AsyncStorage,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button
} from 'react-native';

export default EditModal = ({visible, setModal, addItem, item, deleteItem }) => {
    const [Values, setValues] = useState({
      title: item?item.title:'',
      url: item?item.url:'',
      thumbnailUrl: item?item.thumbnailUrl:'https://via.placeholder.com/150/92c952',
      id: item?item.id:undefined
    })
    return (
      <Modal 
          visible={visible}
        >
          <Text>Modal</Text>
          <TextInput style={{borderColor: 'red', borderWidth: 1}} value={Values.title} onChangeText={text => setValues({...Values, title: text})} />
          <TextInput style={{borderColor: 'red', borderWidth: 1}} value={Values.url} onChangeText={text => setValues({...Values, url: text})} />
          <TextInput style={{borderColor: 'red', borderWidth: 1}} value={Values.thumbnailUrl} onChangeText={text => setValues({...Values, thumbnailUrl: 'https://via.placeholder.com/150/92c952'})} />
          <TouchableOpacity onPress={() => {addItem(Values); setModal(false)}}>
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {deleteItem(Values); setModal(false)}}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </Modal>
    )
  }