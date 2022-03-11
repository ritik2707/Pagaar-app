import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StatusBar, Radio, Stack, Text, Box, Center, Heading, VStack, FormControl, Input, Link, Button, HStack, NativeBaseProvider, ScrollView } from 'native-base';
import DatePicker from 'react-native-date-picker'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';




const EmpolyeeRegis = ({ navigation }: { navigation: any }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpass, setConfirmpass] = useState('')
    const [date, setDate] = useState(new Date())
    const [exp, setExp] = useState('')
    const [gender, setGender] = useState('Male')
    const [mobile, setMobile] = useState('')
    const [open, setOpen] = useState(false)

    const ad = () => {
        console.log(`name : ${name}`)
        console.log(email)
        console.log(password)
        console.log(date)
        console.log(exp)
        console.log(gender)
        console.log(mobile)

        if (password !== confirmpass) {
            Alert.alert("Password and confirm password must be same")
        }
        else if (name.length !== 0 &&
            email.length !== 0 &&
            password.length !== 0 &&
            exp.length !== 0 &&
            gender.length !== 0 &&
            mobile.length !== 0
        ) {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    let id = auth().currentUser?.uid;
                    console.log("User Created");
                    navigation.navigate('EmployeeLogin');
                    firestore()
                        .collection('user')
                        .doc(id)
                        .set({
                            id: id,
                            name: name,
                            email: email,
                            password: password,
                            exp: exp,
                            DOB: date.toString().substring(4, 15),
                            gender: gender,
                            mobile: mobile,

                        })
                })
                .catch(error => {
                    console.log(`errorcode : ${error.code} `);
                })
        }

    };

    return (
        <NativeBaseProvider>
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop bg="#6200ee">
                <HStack bg="#6200ee" px="1" py="3" justifyContent="space-between" height="50" alignItems="center" w="100%" maxW="350" />
                <HStack alignItems="center" >
                    <Text color="white" fontSize="25" left="70px" bottom="20px" fontWeight="bold" >
                        Employee Registration
                    </Text>
                </HStack>
            </Box>
            <ScrollView>
                <Center w="100%">
                    <Box safeArea p="2" py="8" w="90%" maxW="290">


                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label isRequired >UserName</FormControl.Label>
                                <Input placeholder="Username" onChangeText={text => setName(text)} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label >Email</FormControl.Label>
                                <Input placeholder="abc@gmail.com" onChangeText={text => setEmail(text)} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label >Password</FormControl.Label>
                                <Input type='password' placeholder="Password" onChangeText={text => setPassword(text)} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label >Confirm Password</FormControl.Label>
                                <Input type='password' placeholder="Confirm password" onChangeText={text => setConfirmpass(text)} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>DOB</FormControl.Label>
                                <Button onPress={() => setOpen(true)} >Open</Button>
                                <DatePicker
                                    mode="date"
                                    modal
                                    open={open}
                                    date={date}
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />

                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Experience</FormControl.Label>
                                <Input placeholder="Exp(In Months)" onChangeText={text => setExp(text)} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Gender:</FormControl.Label>
                                <Radio.Group name="myRadioGroup" accessibilityLabel="Gender" value={gender} onChange={nextValue => {
                                    setGender(nextValue);
                                }}>
                                    <Stack direction={{
                                        base: "row",
                                        md: "row"
                                    }} alignItems="center" space={4} w="75%" maxW="300px">

                                        <Radio value="Male" my={1} >
                                            Male
                                        </Radio>
                                        <Radio value="Female" my={1}  >
                                            Female
                                        </Radio>
                                    </Stack>
                                </Radio.Group>
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Mobile No.</FormControl.Label>
                                <Input placeholder="Mobile Number" onChangeText={text => setMobile(text)} />
                            </FormControl>


                        </VStack>
                    </Box>
                </Center>
            </ScrollView>
            <Button mt="2" colorScheme="indigo" onPress={() => ad()}>
                Register
            </Button>
        </NativeBaseProvider>
    )
};
export default EmpolyeeRegis;