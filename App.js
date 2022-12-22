import { PortalHost, PortalProvider } from "@gorhom/portal";
import { FlatList, StyleSheet, View } from "react-native";

import { Foo } from "./src/Foo";

const flatListData = Array.from({ length: 10 }).map((_, index) => index);

export default function App() {
  return (
    <PortalProvider>
      <View style={styles.container}>
        {flatListData.map((a) => (
          <Foo key={a} />
        ))}
      </View>
    </PortalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 100,
    backgroundColor: "#fff",
    flexDirection: "row",
    position: "relative",
  },
});
