import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/screens/Welcome';
import AdminLogin from './src/screens/Admin_login';
import EmployeeLogin from './src/screens/Emp_login';
import EmpolyeeRegis from './src/screens/Emp_regis';
import AdminHome from './src/screens/Admin_home';
import Attendance from './src/screens/attendance';
import EmpHome from './src/screens/Emp_home';
import Addemp from './src/screens/admin_add_emp';


const stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='Welcome' screenOptions={{ header: () => null }} >
        <stack.Screen name="Welcome" component={Welcome} />
        <stack.Screen name="AdminLogin" component={AdminLogin} />
        <stack.Screen name="EmployeeLogin" component={EmployeeLogin} />
        <stack.Screen name="Empregis" component={EmpolyeeRegis} />
        <stack.Screen name="Adminhome" component={AdminHome} />
        <stack.Screen name="Emphome" component={EmpHome} />
        <stack.Screen name="Addemp" component={Addemp} />
        <stack.Screen name="Attendance" component={Attendance} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
