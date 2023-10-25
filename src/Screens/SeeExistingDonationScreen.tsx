import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import {
  heightPercentageToDP as h2dp,
  widthPercentageToDP as w2dp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import BurgerIcon from "../Components/BurgerIcon";
import FoodhealersHeader from "../Components/FoodhealersHeader";
import PrimaryButton from "../Components/PrimaryButton";
import { styles } from "../Components/Styles";
import { localized } from "../locales/localization";
import { allRequests } from "../redux/actions/allRequests";
import { allDonations } from "../redux/actions/allDonations";

const SeeExistingDonationScreen = ({ route }: any) => {
  const { itemTypeId, title } = route?.params;
  const [item, setItem] = useState<string>("");
  const [showDialog, setShowDialog] = useState<boolean>(true);
  const [donationData, setDonationData]: any = useState<[]>([]);
  const userDetails = useSelector((state: any) => state.auth);
  const { data } = userDetails;
  useEffect(() => {
    fetchingRequestData();
    sortByDate();
  }, []);

  const [order, setOrder] = useState<"ASC" | "DESC">("ASC");
  const sortByDate = () => {
    const postListFiltered = [...donationData].sort((a: any, b: any) => {
      const dateA = new Date(a?.createdAt);
      const dateB = new Date(b?.createdAt);

      if (order === "ASC") {
        return dateA?.valueOf() - dateB?.valueOf();
      } else {
        return dateB?.valueOf() - dateA?.valueOf();
      }
    });
    setDonationData(postListFiltered);
    const newOrder = order === "ASC" ? "DESC" : "ASC";
    setOrder(newOrder);
  };

  const dispatch = useDispatch();
  const fetchingRequestData = async () => {
    const response = await dispatch(allDonations({ itemTypeId } as any) as any);
    if (itemTypeId === 1) {
      const filtereddonationData = response?.payload?.AllDonations.filter(
        (event: any) => event?.donationType === "Food"
      );
      setItem("Food");
      const ApprovedDonation = filtereddonationData.filter(
        (event: any) => event?.status === "approved"
      );
      const filterNotme = ApprovedDonation.filter(
        (event: any) => event?.createdBy?.id != data?.user?.id
      );
      setDonationData(filterNotme);
    } else if (itemTypeId === 2) {
      const filtereddonationData = response?.payload?.AllDonations.filter(
        (event: any) => event?.donationType === "Supplies"
      );
      setItem("Supplies");
      const ApprovedDonation = filtereddonationData.filter(
        (event: any) => event?.status === "approved"
      );
      const filterNotme = ApprovedDonation.filter(
        (event: any) => event?.createdBy?.id != data?.user?.id
      );
      setDonationData(filterNotme);
    } else {
      setDonationData(response?.payload?.AllDonations);
    }
  };

  const navigation: any = useNavigation();

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  const Item = ({
    foodItem,
    foodName,
    status,
    delivery,
    requiredDate,
    type,
    quantity,
    phoneNumber,
    id,
  }: any) => (
    <TouchableOpacity activeOpacity={1}>
      <View style={styles.cardContainer}>
        {status === "approved" ? (
          <View>
            {type === "Supplies" ? (
              <MaterialCommunityIcons
                name="truck-outline"
                size={24}
                color="black"
                style={{
                  marginLeft: h2dp(2.3),
                }}
              />
            ) : (
              <Entypo
                name="bowl"
                size={24}
                color="black"
                style={{
                  marginLeft: h2dp(2.5),
                }}
              />
            )}
            <AntDesign
              name="checkcircleo"
              size={24}
              color="green"
              style={{
                marginLeft: h2dp(2.5),
                marginTop: h2dp(1.5),
              }}
            />
            <Text
              style={{
                marginLeft: h2dp(1.5),
                fontSize: 11,
                color: "green",
                marginTop: h2dp(0.5),
              }}
            >
              {localized.t("APPROVED")}
            </Text>
          </View>
        ) : status === "pending" ? (
          <View>
            {type === "Supplies" ? (
              <MaterialCommunityIcons
                name="truck-outline"
                size={24}
                color="black"
                style={{
                  marginLeft: h2dp(2.3),
                }}
              />
            ) : (
              <Entypo
                name="bowl"
                size={24}
                color="black"
                style={{
                  marginLeft: h2dp(2.5),
                }}
              />
            )}
            <FontAwesome
              name="clock-o"
              size={24}
              color="#f2db0a"
              style={{
                marginLeft: h2dp(2.3),
                marginTop: h2dp(1.5),
              }}
            />
            <Text
              style={{
                marginLeft: h2dp(1.5),
                fontSize: 11,
                color: "#f2db0a",
                marginTop: h2dp(0.5),
              }}
            >
              {localized.t("PENDING")}
            </Text>
          </View>
        ) : (
          <View>
            {type === "Supplies" ? (
              <MaterialCommunityIcons
                name="truck-outline"
                size={24}
                color="black"
                style={{
                  marginLeft: h2dp(2.3),
                }}
              />
            ) : (
              <Entypo
                name="bowl"
                size={24}
                color="black"
                style={{
                  marginLeft: h2dp(2.5),
                }}
              />
            )}
            <Feather
              name="x-circle"
              size={24}
              color="red"
              style={{ marginLeft: h2dp(2.3), marginTop: h2dp(1.5) }}
            />
            <Text
              style={{
                marginLeft: h2dp(1.5),
                fontSize: 11,
                color: "red",
                marginTop: h2dp(0.5),
              }}
            >
              {localized.t("REJECTED")}
            </Text>
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              marginLeft: w2dp(3),
              fontSize: 16,
              lineHeight: 30,
              paddingTop: h2dp(0.5),
            }}
          >
            {moment(requiredDate).format("MMM DD, YYYY  ddd, hh:mm A")}
          </Text>
          <Text
            style={{
              marginLeft: w2dp(3),
              fontWeight: "500",
              fontSize: 16,
              lineHeight: 30,
              paddingTop: h2dp(0.7),
            }}
          >
            {foodName}
          </Text>
          <Text
            style={{
              marginLeft: w2dp(3),
              fontWeight: "300",
              fontSize: 16,
              lineHeight: 20,
              paddingBottom: h2dp(1),
            }}
          >
            {delivery}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="phone"
              size={16}
              color="black"
              style={{
                marginLeft: w2dp(3),
                fontWeight: "300",
                lineHeight: 20,
                paddingBottom: h2dp(1),
              }}
            />
            <Text
              style={{
                marginLeft: w2dp(2),
                fontWeight: "300",
                fontSize: 16,
                lineHeight: 20,
                paddingBottom: h2dp(1),
              }}
            >
              {phoneNumber}
            </Text>
          </View>
        </ScrollView>
        <Button
          title={localized.t("REQUEST")}
          onPress={() =>
            Alert.alert(
              `${localized.t("REQUEST")} ${item}?`,
              `${foodItem} (${quantity}) ${localized.t("ON")} ${moment(
                requiredDate
              ).format("MMM DD, YYYY  ddd, hh:mm A")} ${localized.t(
                "FROM"
              )} ${delivery}`,
              [
                {
                  text: `${localized.t("CANCEL")}`,
                  onPress: () => {},
                  style: "default",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    navigation.navigate("AcceptDonatedRequestScreen", {
                      quantity: quantity,
                      itemTypeId: itemTypeId,
                      title: title,
                      foodItem: foodItem,
                      requiredDate: requiredDate,
                      id: id,
                    });
                  },
                  style: "default",
                },
              ],
              {
                cancelable: true,
              }
            )
          }
          buttonStyle={{
            marginLeft: w2dp(3),
            marginRight: w2dp(5),
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "red",
            borderRadius: 5,
            paddingHorizontal: 8,
            paddingVertical: 5,
          }}
          titleStyle={{
            color: "black",
            fontWeight: "300",
          }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <LinearGradient
        colors={["#86ce84", "#75c576", "#359133", "#0b550a", "#083f06"]}
        style={styles.background}
      >
        <View style={styles.container}>
          <FoodhealersHeader />
          <View style={styles.root}>
            <Ionicons
              name="chevron-back"
              size={32}
              color="white"
              onPress={() => navigation.goBack()}
            />
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {localized.t("EXISTING")} {item} {localized.t("DONATIONS")}
              </Text>
            </View>
            <BurgerIcon />
          </View>

          <View>
            <View style={styles.itemFilter}>
              <Text style={styles.itemFilterText}>
                {localized.t("EXISTING")} {item} {localized.t("DONATIONS")}
              </Text>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={sortByDate}
              >
                <Text style={styles.itemFilterText}>
                  {localized.t("FILTER")}
                </Text>
                <MaterialIcons
                  name="filter-list-alt"
                  style={styles.itemFilterText}
                />
              </TouchableOpacity>
            </View>
            {donationData.length > 0 ? (
              <View style={{ height: h2dp(70), marginTop: h2dp(1) }}>
                <FlatList
                  data={donationData}
                  renderItem={({ item }: any) => (
                    <Item
                      status={item?.status}
                      type={item?.type}
                      id={item.id}
                      foodItem={item.foodItem}
                      quantity={item.quantity}
                      foodName={`${item?.foodItem}  (${item?.quantity})`}
                      delivery={item?.delivery?.pickupAddress?.fullAddress}
                      requiredDate={item?.delivery?.pickupDate}
                      phoneNumber={item?.donatedBy?.phoneNumber}
                    />
                  )}
                />
              </View>
            ) : (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: h2dp(10),
                  marginBottom: h2dp(10),
                }}
              >
                <Text style={styles.itemText}>
                  {localized.t("NOTHING_TO_SHOW")}
                </Text>
              </View>
            )}
          </View>
          <PrimaryButton
            title={`Request ${item}`}
            onPress={() =>
              navigation.navigate("AddRequestDonationsScreen", {
                itemTypeId: itemTypeId,
                title: title,
              })
            }
            buttonStyle={{
              backgroundColor: "#FC5A56",
              color: "black",
              borderRadius: 5,
              width: w2dp(70),
              alignSelf: "center",
              marginTop: h2dp(3),
            }}
            titleStyle={styles.titleStyle}
          />
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default SeeExistingDonationScreen;