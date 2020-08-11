import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import EditModal from './EditModal'
import ItemModal from './ItemModal'
import useAppData from './useAppData'

const Dashboard = () => {
  const {listData, addItem, editItem, deleteItem, getNewPage} = useAppData()
  // 
  // const [firstPage, addItem, editItem, deleteItem, getNextPage] = useAppData()
  
  const [isAddModal, setModal] = useState(false)
  const [isEditModal, setEditModal] = useState(false)
  const [item, setItem] = useState(null)
   if(listData.length > 0){
    return( 
    <View style={{flex: 1}}>
      <ItemModal visible={isAddModal} setModal={setModal} addItem={addItem} />
      {isEditModal && <EditModal visible={isEditModal} setModal={setEditModal} addItem={editItem} item={item} deleteItem={deleteItem} />}
      <TouchableOpacity 
      onPress={() => setModal(true)
      } 
        style={{paddingHorizontal: 15, paddingVertical: 10, borderWidth: 1, borderColor: 'blue', marginBottom: 10, width: 100}}>
        <Text>add item</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={getNewPage
      } 
        style={{paddingHorizontal: 15, paddingVertical: 10, borderWidth: 1, borderColor: 'blue', marginBottom: 10, width: 100}}>
        <Text>test</Text>
      </TouchableOpacity>
      <FlatList 
        data={listData}
        numColumns={2}
        onEndReached={getNewPage}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={{width: '50%', borderWidth: 1, borderColor: 'blue'}} onPress={() => {setItem(item); setEditModal(true)}}>
              <Image source={{uri: item.thumbnailUrl}}  resizeMode="cover" style={{width: '100%', height: 200}} />
              <Text>{item.title}</Text>
              <Text>{item.id}</Text>
              <Text>{item.url}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>)
   }else{
     return <Text>err</Text>
   }
   
};

export default Dashboard;