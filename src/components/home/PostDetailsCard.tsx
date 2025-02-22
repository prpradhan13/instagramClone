import { View, Text, Dimensions, FlatList } from "react-native";
import React, { useRef, useState } from "react";
import { useGetPostDetails } from "@/src/utils/query/postsQuery";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AdvancedImage } from "cloudinary-react-native";
import { cld } from "@/src/utils/lib/cloudinary";
import LikeCmt from "./LikeCmt";

const screenWidth = Dimensions.get("screen").width;

const PostDetailsCard = ({ postId }: { postId: string }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const { data } = useGetPostDetails(postId);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index + 1);
    }
  }).current;

  if (!data) return null;

  const userImage = data.user_id.avatar_url && cld.image(data.user_id.avatar_url);

  return (
    <View className="flex-1">
      {/* Top Part */}
      <View className="flex-row justify-between p-4 items-center">
        <View className="flex-row items-center gap-2">
          <View>
            {!userImage ? (
              <View className=""></View>
            ) : (
              <AdvancedImage
                cldImg={userImage}
                style={{ width: 50, height: 50, borderRadius: 100 }}
              />
            )}
          </View>
          <View>
            <Text className="text-white font-medium text-lg">
              {data.user_id.user_name}
            </Text>
            <Text className="text-white">{data.location}</Text>
          </View>
        </View>

        <AntDesign name="ellipsis1" size={24} color="#fff" />
      </View>

      {/* Post Image part */}
      <View>
        {data.content_urls.length > 1 && (
          <View className="absolute bg-[#363636] right-2 top-2 z-10 py-1 px-2 rounded-full">
            <Text className="text-white text-">
              {currentIndex}/{data.content_urls.length}
            </Text>
          </View>
        )}

        <FlatList
          data={data.content_urls}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <AdvancedImage
              cldImg={cld.image(item)}
              style={{ width: screenWidth, height: screenWidth }}
            />
          )}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      <LikeCmt postId={data.id} />
      <Text className="text-white px-4 mt-1">{data.caption}</Text>
    </View>
  );
};

export default PostDetailsCard;
