import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';
import axios from 'axios';

export default function Chatbot() {
  const [userInput, setUserInput] = useState();
  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState();
  const [description, setDescription] = useState();
  const [treatment1, setTreatment1] = useState();
  const [treatment2, setTreatment2] = useState();
  const [treatment3, setTreatment3] = useState();
  const [treatment4, setTreatment4] = useState();
  const [error, setError] = useState(false);
  const [allMsgs, setAllMsgs] = useState([]);


  // const sendUserMsg = async() => {
  //   setAllMsgs([...allMsgs, { 'u': userInput }]);
  //   setUserInput('')
  //   try {
  //     await axios
  //       .post('https://hackathon-initial-setup-production-2570.up.railway.app/api/chatbot/', {
  //         question: userInput,
  //       })
  //       .then(response => {
  //         console.log(response.data);
  //         setPrediction(response.data['data']);
  //         // setDescription(response.data['Description']);
  //         // setTreatment1(response.data['Treatment1']);
  //         // setTreatment2(response.data['Treatment2']);
  //         // setTreatment3(response.data['Treatment3']);
  //         // setTreatment4(response.data['Treatment4']);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         setAllMsgs([
  //           ...allMsgs,
  //           {
  //             b: "Sorry we couldn't predict that can you please provide more precise symptoms",
  //           },
  //         ]);
  //         setError(true);
  //         setSymptoms([]);
  //       });
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // };

  const sendUserMsg = async () => {
    // Add user message to allMsgs
    setAllMsgs(prevMsgs => [...prevMsgs, { u: userInput }]);
  
    try {
      const response = await axios.post('https://hackathon-initial-setup-production-2570.up.railway.app/api/chatbot/', {
        question: userInput,
      });
  
      // Add bot response to allMsgs
      setAllMsgs(prevMsgs => [...prevMsgs, { b: response.data['data'] }]);
    } catch (error) {
      console.log(error);
      // Add error message to allMsgs
      setAllMsgs(prevMsgs => [...prevMsgs, { b: "Sorry we couldn't predict that. Can you please provide more precise symptoms?" }]);
      setError(true);
      setSymptoms([]);
    }
  
    // Clear user input after sending the message
    setUserInput('');
  };
  
  const donePressed = async () => {
    symptoms.map((value, key) => {
      console.log(value);
    });

    try {
      await axios
        .post(`${backendUrl}/api/predict_disease/getdisease`, {
          symptoms: symptoms,
        })
        .then(response => {
          console.log(response.data);
          setPrediction(response.data['Disease']);
          // setDescription(response.data['Description']);
          // setTreatment1(response.data['Treatment1']);
          // setTreatment2(response.data['Treatment2']);
          // setTreatment3(response.data['Treatment3']);
          // setTreatment4(response.data['Treatment4']);
          setAllMsgs([
            ...allMsgs,
            {
              'b': response.data['Disease'],
            },
          ]);
        })
        .catch(error => {
          console.log(error);
          setAllMsgs([
            ...allMsgs,
            {
              b: "Sorry we couldn't predict that can you please provide more precise symptoms",
            },
          ]);
          setError(true);
          setSymptoms([]);
        });
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleAddUserInput = () => {
    setAllMsgs([...allMsgs, { u: userInput }]);
    setSymptoms([...symptoms, userInput]);
    setUserInput(null);
  };

  React.useEffect(() => {
    allMsgs.map((value, index) => {
      console.log(index);
      console.log(value);
    });
  }, [allMsgs]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.messageWrapper}>
          <Text style={styles.sectionTitle}>Conversation with Krishi Saathi</Text>
          <ScrollView style={styles.scrollarea}>
            <View style={styles.items}>
              <BotMessage text="Hello! This is Krishi Saathi" />
              <BotMessage text="How may I help you" />

              {/* {symptoms.map((item, index) => {
                return <UserMessage key={index} text={item} />;
              })}

              {error ? (
                <View>
                  <BotMessage
                    text={
                      "Sorry we couldn't predict that can you please provide more precise symptoms"
                    }
                  />
                </View>
              ) : (
                <></>
              )} */}

              {/* {allMsgs.map((value, index) => {
                console.log(Object.keys(value) == 'u');
                Object.keys(value) == 'u' ? (
                  <UserMessage key={index} text={value['u']} />
                ) : (
                  <BotMessage key={index} text={value['b']} />
                );
                if (Object.keys(value) == 'u') {
                  return <UserMessage key={index} text={value['u']} />;
                } else {
                  return <BotMessage key={index} text={value['b']} />;
                }
              })} */}
           {allMsgs.map((value, index) => {
  if (value.u !== undefined) {
    return <UserMessage key={index} text={value.u} />;
  } else if (value.b !== undefined) {
    return <BotMessage key={index} text={value.b} />;
  }
})}


              {prediction ? (
                <View>
                  <BotMessage
                    text={prediction}
                  />
                </View>
              ) : (
                <></>
              )}
            </View>
          </ScrollView>
        </View>

        <KeyboardAvoidingView
          style={styles.writeTaskWrapper}>
          <TextInput
            style={styles.input}
            placeholder={'Enter your symptoms here'}
            value={userInput}
            onChangeText={text => {
              setUserInput(text);
            }}
          />

          <TouchableOpacity onPress={() => sendUserMsg()}>
            <View style={styles.addWrapper}>
              <Image
                style={styles.image}
                source={require('../../assets/send.png')}
              />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      <View>
        {console.log(prediction)}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF7FF',
  },

  messageWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#042E49',
    marginTop: 20,
  },

  items: {
    marginTop: 20,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '85%',
    height: 50,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 0.2,
    backgroundColor: '#fff',
  },

  image: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollarea: {
    height: '85%',
  },

  ConfirmButton: {
    backgroundColor: '#0988D7',
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
});