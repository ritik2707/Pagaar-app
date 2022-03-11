import React, { useEffect, useState } from 'react';
import { HamburgerIcon, StatusBar, Container, View, Image, Text, Box, Center, Heading, VStack, FormControl, Input, Link, Button, HStack, NativeBaseProvider, Pressable } from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';




const EmpHome = ({ navigation }: { navigation: any }) => {

    const [name, setName] = useState('')
    const [ID, setID] = useState('')
    const [dob, setDob] = useState('')
    const [exp, setExp] = useState('')
    const [gender, setGender] = useState('')
    const [mobile, setMobile] = useState('')
    const [logged, setLogged] = useState(false);

    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    useEffect(() => {
        handleLogin()
    }, [logged]);


    const handleLogin = () => {
        auth().onAuthStateChanged(user => {
            if (user !== null) {
                setLogged(true)
            } else {
                console.log("User no ")
            }
        });
    }


    useEffect(() => {
        let id = auth().currentUser?.uid;
        const subscriber = firestore()
            .collection('user')
            .doc(id)
            .get()
            .then(snapshot => {
                setName(snapshot.data().name);
                setID(snapshot.id)
                setDob(snapshot.data().DOB);
                setExp(snapshot.data().exp);
                setGender(snapshot.data().gender);
                setMobile(snapshot.data().mobile);
                console.log(snapshot.data());
            });
    }, []);




    return (
        <NativeBaseProvider >
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop height={20} bg="#6200ee">
                <HStack space={3} >
                    <Text color="white" fontSize="30" marginTop={5} fontWeight="bold" >
                        Employee Registration
                    </Text>
                    {logged ? (
                        <Menu
                            visible={visible}
                            anchor={<HamburgerIcon size="lg" marginLeft={8} marginTop={5} color="white" onPress={showMenu} />}
                            onRequestClose={hideMenu}

                        >
                            <MenuItem onPress={() => { auth().signOut().then(() => navigation.navigate("EmployeeLogin")) }}>Sign-Out</MenuItem>

                        </Menu>
                    ) : (null)}

                </HStack>


            </Box >
            <Center w="100%" bg="amber.100" h="100%">
                <Box safeArea p="2" w="100%" py="8">

                    <Box>
                        <Image size={150} justifyContent="center" alignItems="center" marginLeft={105} source={{
                            uri: "https://icon-library.com/images/user-image-icon/user-image-icon-9.jpg"
                        }} alt="Alternate Text" />
                    </Box>

                    <VStack>
                        <Box w="100%" bg="amber.500" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
                            <HStack marginTop={6}>
                                <Text fontSize="xl"
                                    color="danger.800"
                                    letterSpacing="lg" bold>
                                    Name : </Text>
                                <Text fontSize="xl">{name}</Text>
                            </HStack>
                            <HStack marginTop={6}>
                                <Text fontSize="xl"
                                    color="danger.800"
                                    letterSpacing="lg" bold>
                                    Employee ID :</Text>
                                <Text fontSize="xl">{ID}</Text>
                            </HStack>


                            <HStack marginTop={6}>
                                <Text fontSize="xl"
                                    color="danger.800"
                                    letterSpacing="lg" bold>Date Of Birth : </Text>
                                <Text fontSize="xl">{dob}</Text>
                            </HStack>
                            <HStack marginTop={6}>
                                <Text fontSize="xl"
                                    color="danger.800"
                                    letterSpacing="lg" bold>
                                    Gender : </Text>
                                <Text fontSize="xl">{gender}</Text>
                            </HStack>

                            <HStack marginTop={6}>
                                <Text fontSize="xl"
                                    color="danger.800"
                                    letterSpacing="lg" bold>Experience(in Months): </Text>
                                <Text fontSize="xl">{exp}</Text>
                            </HStack>
                            <HStack marginTop={6}>
                                <Text fontSize="xl"
                                    color="danger.800"
                                    letterSpacing="lg" bold>Mobile Number : </Text>
                                <Text fontSize="xl">{mobile}</Text>
                            </HStack>


                        </Box>
                        <Button mt="2" colorScheme="indigo" marginTop={6} onPress={() => navigation.navigate('Attendance')} >
                            Mark Attendance
                        </Button>
                    </VStack>
                </Box>
            </Center >
        </NativeBaseProvider >

    );
};
export default EmpHome;