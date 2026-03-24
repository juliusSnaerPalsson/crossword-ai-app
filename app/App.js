import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function App() {
  const [theme, setTheme] = useState('');

  const handleGenerate = () => {
    if (!theme.trim()) {
      Alert.alert('Veldu þema', 'Skrifaðu inn þema fyrir krossgátuna.');
      return;
    }
    Alert.alert('Beiðni send', Beiðni um krossgátu með þema "${theme}" var send.);
  };

  return (
    
      Crossword AI
      Skrifaðu þema:
      
      
    
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', padding:20, backgroundColor:'#fff' },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20, textAlign:'center' },
  label: { marginBottom:8 },
  input: { borderWidth:1, borderColor:'#ccc', padding:10, marginBottom:12, borderRadius:6 }
});
