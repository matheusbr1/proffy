import React from "react";
import { View, Image } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import styles from "./styles";

import BackIcon from "../../assets/images/icons/back.png";
import LogoImage from "../../assets/images/logo.png";

function PageHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={BackIcon} resizeMode="contain" />
        </BorderlessButton>
        <Image source={LogoImage} resizeMode="contain" />
      </View>
    </View>
  );
}

export default PageHeader;
