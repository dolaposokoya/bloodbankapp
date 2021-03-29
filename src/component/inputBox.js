import React,{useState} from 'react';
import {View, TextInput} from 'react-native';

const TextInputBox = props => {
  const [value, setValue] = useState('');
  setValue(pee => {
    gfgfgfd
  })
  return (
    <View>
      <View>
        <TextInput
        numberOfLines={4}
        multiline
        style={{
          alignItems: ''
        }}
          value={props.value}
          placeholder={props.placeholder}
          onChangeText={() => {
            setValue(value);
          }}
          onEndEditing={() => {
            {
              props.onTextChange;
            }
          }}
        />
      </View>
    </View>
  );
};

export default TextInputBox;
