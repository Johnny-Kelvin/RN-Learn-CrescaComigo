import {useContext, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
//import Modal from 'react-native-modal'
import {useAuth} from '../../contexto/auth';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {BlurView} from '@react-native-community/blur';

export default function TelaLogin() {
  const {signIn, loading} = useAuth();

  async function handleLogin(email: string, senha: string) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (emailRegex.test(email)) {
      ativaModal(require('../../assets/Loading-Pink.json'),'absolute');
      try {
        await signIn(email, senha);
        setEmail(''), setSenha('');
      } catch (e) {
        trocaAnima(require('../../assets/aa.json'))
      }
    }
    //Alert.alert('EMAIL:', 'INCORRETO')
  }
    //Atribui o valor dos inputs
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // ativando o modal de login
  const [isModalVisible, setModalVisible] = useState(false);
  const [enable, setBlur] = useState(false);
  const [position, setPosition] = useState('');

  // Animacao e texto | caso de erro, exibir no modal 
  const [loadICo, setLoadIco] = useState(require('../../assets/Loading-Pink.json'));
  const [anin, setAnin] = useState(true);
  const [textModal, setModal] = useState('');
  const [aninModal, setAninModal] = useState('');
  const [textAnin, setTextAnin] = useState('');

  let anin2:boolean = true
 let fdo:string = ''
  async function trocaAnima (path:string){
    setLoadIco(path);
    setAnin(!anin)
    setTimeout(() =>{
        anin2 = false
        setAninModal('fadeOutDownBig')
    },5400)
    setModal(('Verifique os dados e tente novamente 😉').toUpperCase())
    setTextAnin('flash')
    setTimeout(() => {
        setBlur(false);
        setPosition('')
        setModalVisible(false);
    },6000)
  }

  function ativaModal (path:string, a: string) {
    setLoadIco(path);
    setAninModal('fadeInUpBig')
    setTextAnin('bounceIn')
    setModal(('Entrando 😎').toUpperCase())
    if(anin == false){
        setAnin(!anin)
    }
    setBlur(!enable);
    setPosition(a);
    setModalVisible(!isModalVisible);
  };

  return (
    <Animatable.View  style={styles.container}>
      <Image style={styles.image} source={require('../../assets/icon.png')} />
      <Animatable.View animation={'fadeIn'} style={styles.form}>
        <TextInput
          placeholderTextColor={'white'}
          placeholder="Email"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholderTextColor={'white'}
          placeholder="Senha"
          style={styles.textInput}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'white'}}>Não tem conta? </Text>
          <Pressable>
            <Text style={{color: '#CB13FE', paddingLeft: 10}}>Cadastre-se</Text>
          </Pressable>
        </View>

        <Pressable style={styles.botao}>
          <Text
            style={{color: 'white', textAlign: 'center'}}
            onPress={() => handleLogin(email, senha)}>
            Entrar
          </Text>
        </Pressable>
      </Animatable.View>
      <BlurView
        enabled={enable}
        style={[styles.absolute, {position}]}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!isModalVisible);
        }}>
        {/* <View style={styles.centeredView}> */}
        <Animatable.View animation={aninModal} style={styles.modalView}>
          <LottieView
            source={loadICo}
            style={{width: '100%', height: '100%', top: -10}}
            autoPlay
            loop={anin}
            
            
          />
          <Animatable.Text
            animation={textAnin}
            iterationCount={2}
            duration={5000}
            style={styles.textStyle}>
            {textModal}
          </Animatable.Text>
        </Animatable.View>

        {/* </View> */}
      </Modal>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    rowGap: 125,
    paddingTop: '20%',
  },
  image: {
    width: 150,
    height: 150,
    display: 'flex',
  },
  form: {
    width: '100%',
    rowGap: 30,
    paddingHorizontal: '9%',
  },
  textInput: {
    backgroundColor: '#ff5577',
    borderRadius: 15,
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  botao: {
    justifyContent: 'center',
    width: '100%',
    height: '15%',
    backgroundColor: '#ff5588',
    borderRadius: 15,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    top: '28%',
    alignSelf: 'center',
    width: '70%',
    height: '21%',
    margin: 20,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: '#ff5588',
    fontWeight: 'bold',
    textAlign: 'center',
    top: -10
  },

  absolute: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

//         <View style={styles.container}>
//             <StatusBar barStyle={"light-content"} backgroundColor={styles.container.backgroundColor}/>
//             <Image style={styles.image}source={require("../assets/icon.png")}/>
//             <Text style={styles.text}>𝕮𝖗𝖊𝖘𝖆 𝕮𝖔𝖒𝖎𝖌𝖔</Text>

//             <View style={styles.sectionForm}>
//                 <Text style={styles.SectionText}>ᒪOGIᑎ</Text>

//                 <View style={styles.form}>
//                     <TextInput placeholder={'Email'} placeholderTextColor={"white"}style={styles.input}/>
//                     <TextInput placeholder={'Senha'} placeholderTextColor={"white"}style={styles.input}/>
//                     <View style={styles.buttons}>
//                     <Pressable>
//                         <Text style={{color: 'white'}}>Esqueceu a senha?</Text>
//                     </Pressable>
//                     <Pressable>
//                         <Text >Entrar</Text>
//                     </Pressable>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     )
// }

// const shad = {
//     width: 2,
//     height: 2
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         backgroundColor: '#000',
//         flexDirection: "column",
//         display: "flex",
//         paddingHorizontal: 15

//     },
//     image: {
//         marginTop: 15,
//         resizeMode: "contain",
//         height: 140,
//         width: 200
//     },
//     text: {
//         position: "absolute",
//         color: '#f57',
//         fontWeight: "bold",
//         fontFamily: 'Mono',
//         fontSize: 40,
//         marginTop: 150
//     },
//     sectionForm:{
//         backgroundColor: "#ccc",
//         position: "relative",
//         paddingTop: "5%",
//         marginVertical: "30%",
//         width: "100%",
//         height:"50%",
//         borderRadius: 10,
//         justifyContent: "flex-start",
//         alignItems: "center",
//         elevation: 2,

//     },
//     form: {
//         flex:1,
//         justifyContent: "space-evenly"
//     },
//     SectionText:{
//         position: "relative",
//         marginBottom: "-25%",
//         color: '#f57',
//         fontSize: 29,
//     },
//     input: {
//         backgroundColor: "#f57",
//         position: "relative",
//         width: 'auto',
//         borderRadius: 10,
//         textAlign: "center",
//         marginBottom: "-30%",
//         elevation: 3,
//         shadowColor: "#fff"
//     },
//     buttons: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//     }

// }
