import React, { useState } from 'react';
import { Alert } from 'react-native';
// 1. import `NativeBaseProvider` component
import { StatusBar, Image, Text, Box, Center, Heading, VStack, FormControl, Input, Link, Button, HStack, NativeBaseProvider } from 'native-base';
import auth from '@react-native-firebase/auth';



const AdminLogin = ({ navigation }: { navigation: any }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailerr, setEmailerr] = useState('')
    const [passerr, setPasserr] = useState('')


    const ad = async () => {
        if (email != "" && password != "") {
            setEmailerr('')
            setPasserr('')
            auth()
                .signInWithEmailAndPassword("admin@gmail.com", "admin@27")
                .then(() => {
                    console.log("Logged IN")
                    navigation.navigate("Adminhome")
                })
                .catch(error => {
                    console.log(`errorcode : ${error.code} `);
                    Alert.alert(`error : ${error.code}`)
                })

        }
        else {
            setEmailerr("Email Should Not be Empty")
            setPasserr("Password field should not be empty")
        }

        if (email == "" && password != "") {
            setEmailerr("Email should Not be Empty")
            setPasserr('')
        }
        else {
        }

        if (email != "" && password == "") {
            setEmailerr("Email should Not be Empty")
            setPasserr('Password Field must not be')

        }

    }

    return (
        <NativeBaseProvider>
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop bg="#6200ee">
                <HStack bg="#6200ee" px="1" py="3" justifyContent="space-between" height="50" alignItems="center" w="100%" maxW="350" />
                <HStack alignItems="center" >
                    <Text color="white" fontSize="25" left="70px" bottom="20px" fontWeight="bold" >
                        Admin Login
                    </Text>
                </HStack>
            </Box>
            <Center w="100%">
                <Box marginTop={10} alignSelf="center" >
                    <Image source={{
                        uri: "https://i1.wp.com/growmetachem.com/wp-content/uploads/2020/09/Business-Male-Icon-Vector-User-Icon-Avatar-PNG-and-Vector-with-Transparent-Background-for-Free-Download.jpg?ssl=1"
                    }} alt="Alternate Text" size="xl" />
                </Box>
                <Box safeArea p="2" py="8" w="90%" maxW="290">


                    <VStack space={3} mt="5">
                        <FormControl >
                            <FormControl.Label w="75%" maxW="300px">Email</FormControl.Label>
                            <Input size="2xl" placeholder="email" onChangeText={text => setEmail(text)} />
                            <Text color="error.600"  >{emailerr}</Text>
                        </FormControl>
                        <FormControl >
                            <FormControl.Label w="75%" maxW="300px">Password</FormControl.Label>
                            <Input type="password" size="2xl" placeholder="Password" onChangeText={text => setPassword(text)} />
                            <Text color="error.600"  >{passerr}</Text>
                        </FormControl>
                        <Button mt="2" colorScheme="indigo" onPress={() => ad()} >
                            Login
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};
export default AdminLogin;