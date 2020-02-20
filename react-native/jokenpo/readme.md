# React Native 

#### iniciando um projeto

* Baixar as dependencias do react-native
* react-native init --version="0.44.0" <nome_do_app>
* react-native run-android
* adb shell input keyevent 46 46
* adb shell input keyevent 82

#### Efetuando alterações
* para efetuar alterações no android deve ser alterado os arquivos .android, Ex : index.android.js
* para efetuar alterações no .ios deve ser alterado os arquivos .ios, Ex : index.ios.js

#### Problemas para gerar sombras 
* https://ethercreative.github.io/react-native-shadow-generator/
* propriedades de shadow somente para ios
* para android deve ser utilizado elevation ou uma biblioteca de terceiro
```
 containerStyle: {
        margin: 5,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
         shadowOpacity: 0.8,
         shadowRadius: 2,
        elevation: 1,
         marginLeft: 5,
         marginRight: 5,
        marginTop: 10,
    }
```

#### Flex
* justifyContent, aplica alinhamento no conteudo de um container (View) vertical, (flex-end, flex-start, center)
* alignItems, aplica alinhamento no conteudo de um container (View) horizontal, (flex-end, flex-start, center)
* flexDirection, determina a distribuição dos elementos (row, column)
* flex -> informa a dimensão com em angular

#### Components
* Props: permite que as informações sejam passadas por parametro para o nosso componente
* state: permite a criação de variaveis cujo valor pode ser alterado em qualquer momento na nossa aplicação, para alterar é utilizado a função setState

````jsx harmony
import {View, Text, AppRegistry, Button} from 'react-native';
import React from "react";
import {Component} from 'react';
class MyComponent extends Component {
  render() {
    return (
        <View>
          <Text>{this.props.a}</Text>
        </View>
    );
  }
}

class jokenpo extends Component {

  constructor(props) {
    super(props);
    this.state = {text: 'a'};
  }

  changeText() {
    this.setState({text: 'b'});
  }

  render() {
    return (
        <View>
          <MyComponent a={this.state.text} />
          <Button title='Atualizar texto' onPress={() => this.changeText()} />
        </View>
    );
  }
}
AppRegistry.registerComponent('jokenpo', () => jokenpo);
````