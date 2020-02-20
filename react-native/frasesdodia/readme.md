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