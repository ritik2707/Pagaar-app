import React from 'react';
import { StyleSheet } from 'react-native';
import {
    Link,
    Text,
    HStack,
    Center,
    Heading,
    Switch,
    useColorMode,
    NativeBaseProvider,
    VStack,
    Code,
    Button,
    Box,
    Image
} from 'native-base';



const Welcome = ({ navigation }: { navigation: any }) => {


    return (
        <NativeBaseProvider>
            <Box marginTop={10} alignSelf="center" >
                <Image source={require('../components/salary.jpg')}
                    alt="Alternate Text" size="xl" />

            </Box>
            <Box marginTop={20} alignSelf="center">
                <Center>
                    <Button size="lg" width={80} height={40} variant="solid" colorScheme="primary"
                        onPress={() => navigation.navigate('AdminLogin')} >
                        Log_In As Admin
                    </Button>
                    <Button size="lg" marginTop={10} width={80} height={40} variant="solid" colorScheme="primary"
                        onPress={() => navigation.navigate('EmployeeLogin')}>
                        Log_In As Employee
                    </Button>
                    <Box marginTop={5}>
                        <Text fontSize="md" color="coolGray.600" >
                            If You Have Not Register .{" "}
                        </Text>
                        <Link _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "md"
                        }} onPress={() => navigation.navigate('Empregis')}>
                            Click Here To Register
                        </Link>
                    </Box>
                </Center>
            </Box>
        </NativeBaseProvider >
    );
};

const styles = StyleSheet.create({
    img: {
        height: 100,
        width: 100,

    }
})
export default Welcome;
