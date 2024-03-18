import { useContext, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import { useAuth } from "../../contexto/auth";
import * as Animatable from 'react-native-animatable';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#000',
      justifyContent:"space-between",
    },
  });

export function TelaHome(){ 
  const { signOut, user} = useAuth();
  function handleSignOut() {;
    signOut()
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation={'fadeIn'} duration={300} style={{margin: 40, flexDirection: "row-reverse", justifyContent:"space-between"}}>
      <Button title="Sign Out" onPress={handleSignOut} />
      <Text style={{fontFamily: 'Sono-ExtraBold'}}>{` BEM VINDO \n  ${(user?.nome_user)?.toUpperCase()}`}</Text>
      </Animatable.View>
      
    </View>
  );
}

