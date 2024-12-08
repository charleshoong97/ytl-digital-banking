import { useAuthStore } from "@/store/auth";
import { Redirect, Stack } from "expo-router";
import { observer } from "mobx-react-lite";

const AppLayout = observer(() => {
  const { isLogin } = useAuthStore();

  if (!isLogin()) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="details/[id]" options={{}} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
});

export default AppLayout;
