import { View, FlatList } from "react-native";
import React from "react";
import { useFollowerCount } from "@/src/utils/query/followerQuery";
import useAuthStore from "@/src/stores/authStore";
import UsersList from "@/src/components/cards/UsersList";

const AllFollowersList = () => {
  const { user } = useAuthStore();

  const { data } = useFollowerCount(user?.id!);

  return (
    <View className="flex-1 bg-[#121212]">
      <FlatList
        data={data?.followerIds}
        keyExtractor={(item) => item}
        contentContainerStyle={{
          padding: 16,
          gap: 20,
        }}
        renderItem={({ item }) => <UsersList item={item} />}
      />
    </View>
  );
};

export default AllFollowersList;
