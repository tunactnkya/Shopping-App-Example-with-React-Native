import { View, Text, ScrollView, TouchableOpacity,Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS } from '../database/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const MyCart = ({ navigation }) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems')
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      items.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      })
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  }

  const getTotal = (productData) => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice;
    }
    setTotal(total);
  };

  const renderProducts = (data,index) => {
   return(
    <TouchableOpacity style={{
      width:'100%',
      height:100,
      marginVertical:6,
      flexDirection:'row',
      alignItems:'center'
    }} >
      <View style={{
        width:'30%',
        height:100,
        padding:14,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLOURS.backgroundLight,
        borderRadius:10,
        marginRight:22,
      }} > 
        <Image source={data.productImage} style={{
          width:'100%',
          height:'100%',
          resizeMode:'contain',
        }} />
      </View>
      <View style={{
       flex:1,
       height:'100%',
       justifyContent:'center'
      }} >
        <View style={{
           marginTop:4,
           flexDirection:'row',
           alignItems:'center',
           opacity:0.6
        }} >
          <Text style={{
            fontSize:14,
            maxWidth:'100%',
            color:COLOURS.black,
            fontWeight:'600',
            letterSpacing:1
          }} >{data.productName} </Text>
          <View>
             <Text style={{
              fontSize:14,
              fontWeight:'400',
              maxHeight:'85%',
              marginRight:4
             }} >
             &#8377; {data.productPrice}
             </Text>
          </View>
        </View>
        <View style={{
          borderRadius:100,
          marginRight:20,
          padding:4,
          borderWidth:1,
          borderColor:COLOURS.backgroundMedium,
          opacity:0.5,
        }} >
          <MaterialCommunityIcons name='minus' style={{
            fontSize:16,
            color:COLOURS.backgroundDark
          }} />
            <Text>1</Text>
        </View>
      </View>
    </TouchableOpacity>
   )
  }


  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: COLOURS.white,
    }} >
      <ScrollView>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          paddingTop: 16,
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          alignItems: 'center'
        }} >
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <MaterialCommunityIcons name='chevron-left' style={{
              fontSize: 18,
              color: COLOURS.backgroundDark,
              padding: 12,
              backgroundColor: COLOURS.backgroundLight,
              borderRadius: 12
            }} />
          </TouchableOpacity>
          <Text style={{
            fontSize: 14,
            color: COLOURS.black,
            fontWeight: '400'
          }} >Order Details
          </Text>
         
        </View>
        <Text style={{
          fontSize:20,
          color:COLOURS.black,
          fontWeight:'500',
          letterSpacing:1,
          paddingTop:20,
          paddingLeft:16,
          marginBottom:10
        }} >My Cart</Text>
        <View style={{
          paddingHorizontal:16
        }} >
          {product ? product.map(renderProducts) :null }
        </View>
      </ScrollView>
    </View>
  )
}

export default MyCart