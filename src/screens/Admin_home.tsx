import React, { Component, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Image, ImageBackground } from 'react-native';
import { Stack, Radio, Modal, CheckIcon, StatusBar, Container, View, Text, Box, Center, Heading, VStack, FormControl, Input, Link, Button, HStack, NativeBaseProvider, ScrollView, FlatList, Icon } from 'native-base';
import { firebase } from '@react-native-firebase/firestore';
import { FloatingAction } from "react-native-floating-action";



const AdminHome = ({ navigation }: { navigation: any }) => {

    const [name, setName] = useState('');
    const [date, setDate] = useState('')
    const [exp, setExp] = useState('')
    const [gender, setGender] = useState('Male')
    const [mobile, setMobile] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [emp, setEmp] = useState([])
    const [update, setUpdate] = useState(null)
    const [err, setErr] = useState('')

    useEffect(() => {
        firebase
            .firestore()
            .collection('user')
            .get()
            .then(snapshot => {
                let empdata = snapshot.docs.map(doc => doc.data());
                setEmp(empdata);
            });
        console.log(emp);
    }, [update]);

    const deletedata = (key: any) => {
        firebase
            .firestore()
            .collection('user')
            .doc(key)
            .delete()
            .then(() => {
                console.log("Emp deleted")
            });
        setUpdate(!update);
    }

    const updatedata = (key: any) => {
        firebase
            .firestore()
            .collection('user')
            .doc(key)
            .update({
                name: name,
                exp: exp,
                DOB: date,
                gender: gender,
                mobile: mobile,

            })
        setUpdate(update);

    }





    const Item = ({ Item }) => (

        <View style={styles.item}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View>
                    <Text style={styles.title} bold >Name : {Item.name}</Text>
                    <Text style={styles.title} bold>Email : {Item.email}</Text>
                    <Text style={styles.title} bold>Date Of Birth: {Item.DOB}</Text>
                    <Text style={styles.title} bold>Experience(in Months):{Item.exp}</Text>
                    <Text style={styles.title} bold>Mobile Number: {Item.mobile}</Text>
                    <Text style={styles.title} bold>Gender : {Item.gender}</Text>
                    <Text style={styles.title} bold>Attendance :{Item.attendance}</Text>
                    <Text style={styles.title} bold>ID :{Item.id}</Text>
                    <HStack space={3} justifyContent="center">
                        <TouchableOpacity style={styles.to} onPress={() => {
                            deletedata(Item.id)
                        }}>

                            <Text > Delete</Text>

                        </TouchableOpacity>
                        <Button onPress={() => setShowModal(true)}>Button</Button>
                        <View>
                            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                                <Modal.Content maxWidth="400px">
                                    <Modal.CloseButton />
                                    <Modal.Header>Update User</Modal.Header>
                                    <Modal.Body>
                                        <FormControl>
                                            <FormControl.Label>Name</FormControl.Label>
                                            <TextInput
                                                onChangeText={newText => setName(newText)}
                                                defaultValue={name}
                                            />
                                        </FormControl>
                                        <FormControl mt="3">
                                            <FormControl.Label>DOB</FormControl.Label>
                                            <Input placeholder='DOB' />
                                        </FormControl>
                                        <FormControl mt="3">
                                            <FormControl.Label>Experience</FormControl.Label>
                                            <Input placeholder='Exp(InMonths)' />
                                        </FormControl>
                                        <FormControl mt="3">
                                            <FormControl.Label>Gender</FormControl.Label>
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
                                        <FormControl mt="3">
                                            <FormControl.Label>Mobile</FormControl.Label>
                                            <Input placeholder='Mobile Number' />
                                        </FormControl>
                                        <Text color="error.600"  >{err}</Text>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button.Group space={2}>
                                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                                setShowModal(false);
                                            }}>
                                                Cancel
                                            </Button>
                                            <Button onPress={() => {
                                                updatedata(Item.id)
                                            }}>
                                                Save
                                            </Button>
                                        </Button.Group>
                                    </Modal.Footer>
                                </Modal.Content>
                            </Modal>
                        </View>


                    </HStack>
                </View>


            </View>
        </View >

    )

    const renderItem = ({ item }) => (
        <Item Item={item} />
    );
    const actions = [
        {
            text: "Add Employee",
            icon: require("../components/employee.png"),
            name: "Add Employee",
            position: 1
        }
    ]
    return (
        <NativeBaseProvider>
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop bg="#6200ee">
                <HStack bg="#6200ee" px="1" py="3" justifyContent="space-between" height="50" alignItems="center" w="100%" maxW="350" />
                <HStack alignItems="center" >
                    <Text color="white" fontSize="25" left="70px" bottom="20px" fontWeight="bold" >
                        ADMIN HOME
                    </Text>
                </HStack>
            </Box>

            <View style={styles.container}>
                <Box>
                    <View>
                        <FlatList
                            data={emp}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            extraData={update}

                        />
                    </View>


                </Box>
            </View>

            <FloatingAction
                actions={actions}
                onPressItem={() => navigation.navigate("Addemp")}
            />


        </NativeBaseProvider >
    )
};

const styles = StyleSheet.create({
    toUp: {
        padding: 10,
        backgroundColor: "#38bdf8",

    },

    to: {
        padding: 10,
        backgroundColor: "#881337",
    },

    container: {
        flex: 1,
        backgroundColor: "#ccfbf1"

    },

    item: {
        backgroundColor: '#134e4a',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
        color: "#f0fdfa",



    },
});

export default AdminHome;