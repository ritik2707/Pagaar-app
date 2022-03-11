import React, { useState } from 'react';
import { Alert } from 'react-native';
import { StatusBar, Radio, Stack, Text, Box, Center, Heading, VStack, FormControl, Input, Link, Button, HStack, NativeBaseProvider } from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';




const Attendance = ({ navigation }: { navigation: any }) => {

    const [attendance, setAttendance] = useState('Present')

    const ad = async () => {

        console.log(attendance)


        if (attendance) {

            let id = auth().currentUser?.uid;
            console.log("attendance marked");
            navigation.navigate('Emphome');
            firestore()
                .collection('user')
                .doc(id)
                .update({
                    attendance: attendance
                })


        }
    }

    return (
        <NativeBaseProvider>
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop bg="#6200ee">
                <HStack bg="#6200ee" px="1" py="3" justifyContent="space-between" height="50" alignItems="center" w="100%" maxW="350" />
                <HStack alignItems="center" >
                    <Text color="white" fontSize="25" left="70px" bottom="20px" fontWeight="bold" >
                        Attendance
                    </Text>
                </HStack>
            </Box>
            <Center w="100%" bg="amber.100" p={50} h="100%">



                <VStack w="100%" space={3} mt="5" fontSize={30}>

                    <Text fontSize="3xl" bg="amber.100" color="danger.800" textAlign="center" fontWeight="bold">Mark Attendance:</Text>
                    <Radio.Group name="myRadioGroup" accessibilityLabel="Attendance" value={attendance} onChange={nextValue => {
                        setAttendance(nextValue);
                    }}>
                        <Radio value="Present" my={1} >
                            Present
                        </Radio>
                        <Radio value="Absent" my={1} >
                            Absent
                        </Radio>
                        <Radio value="First Half" my={1} >
                            First Half
                        </Radio>
                        <Radio value="Second Half" my={1} >
                            Second Half
                        </Radio>
                    </Radio.Group>

                    <Button mt="2" colorScheme="indigo" onPress={() => ad()}>
                        Submit
                    </Button>

                </VStack>

            </Center>
        </NativeBaseProvider>
    )
};
export default Attendance;