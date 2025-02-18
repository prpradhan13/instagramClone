import { Tabs } from "expo-router";
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image, View } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          shadowColor: "transparent",
          backgroundColor: "#121212",
          borderTopWidth: 0,
          height: 50,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Foundation
              name="home"
              size={28}
              color={focused ? "white" : "#ababab"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              size={28}
              color={focused ? "white" : "#ababab"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="plussquareo"
              size={28}
              color={focused ? "white" : "#ababab"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="hearto"
              size={28}
              color={focused ? "white" : "#ababab"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View className={`rounded-full border ${focused ? "border-white" : "border-[#ababab]"} p-1 h-9 w-9 justify-center items-center`}>
              <Image 
                source={require("@/src/assets/images/user.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;