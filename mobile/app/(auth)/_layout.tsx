import { Stack } from "expo-router";

//Auth Routes
export default function AuthLayout() {

    return (

        <Stack>
            <Stack.Screen name="Login" />
            <Stack.Screen name="Register" />
        </Stack>

    )
}