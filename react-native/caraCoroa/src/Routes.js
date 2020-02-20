import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import CenaPrincipal from "./components/cenaPrincipal";
import SobreJogo from "./components/sobreJogo";
import OutrosJogos from "./components/outrosJogos";
import Resultado from "./components/resultado";

const Routes = () => (
    <Router>
        <Stack key='root'>
            <Scene key='cenaPrincipal' component={CenaPrincipal} hideNavBar title="Cara ou Coroa"/>
            <Scene key='sobrejogo' component={SobreJogo} title="Sobre Jogo"/>
            <Scene key='outrosjogos' component={OutrosJogos} title="Outros Jogos"/>
            <Scene key='jogar' component={Resultado} title={"Resultado"}/>
        </Stack>
    </Router>
);

export default Routes;
