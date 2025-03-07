import { View, Text, FlatList } from "react-native";
import React from "react";
import { useFollowerCount } from "@/src/utils/query/followerQuery";
import useAuthStore from "@/src/stores/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOtherUserDetatils } from "@/src/utils/query/userQuery";
import UsersList from "@/src/components/cards/UsersList";

const AllFollowersList = () => {
  const { user } = useAuthStore();

  const { data } = useFollowerCount(user?.id!);

  return (
    <FlatList
      data={data?.followerIds}
      keyExtractor={(item) => item}
      contentContainerStyle={{
        padding: 16,
        gap: 20,
        backgroundColor: "#121212"
      }}
      renderItem={({ item }) => <UsersList item={item} />}
    />
  );
};

export default AllFollowersList;
