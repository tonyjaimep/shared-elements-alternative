import { Portal, usePortal } from "@gorhom/portal";
import React, { ReactElement, ReactNode, useEffect } from "react";
import { Dimensions, LayoutChangeEvent, LayoutRectangle, Pressable, StyleSheet, Text, View } from "react-native";

const children = [
  <Text>Foo</Text>,
  <Text>Bar</Text>,
];


export const Foo = () => {
  const { addPortal, removePortal } = usePortal();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const pressableRef = React.useRef<View | null>(null);

  const [layoutRectangle, setLayoutRectangle] = React.useState<LayoutRectangle | undefined>();

  const toggleIsExpanded = () => setIsExpanded(wasExpanded => !wasExpanded);

  const onLayout = () => {
    pressableRef.current?.measure((_, __, width, height, x, y) => {
      setLayoutRectangle({ x, y, width, height });
    });
  }

  const result = React.useMemo<ReactElement>(() => (
    <Pressable
      onPress={toggleIsExpanded}
      onLayout={onLayout}
      ref={pressableRef}
      style={styles.element}
      children={children}
    />
  ), []);

  useEffect(() => {
    if (!layoutRectangle) return;

    if (isExpanded) {
      addPortal('pressable', React.cloneElement(
        result,
        {
          onPress: toggleIsExpanded,
          style: {
            ...styles.element,
            position: 'absolute',
            top: 0,
            left: 0,
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
          }
        },
        [
          ...children,
          <Text key="baz">Baz</Text>
        ]
      ));
    } else {
      removePortal('pressable');
    }
  }, [isExpanded, result])

  return result;
}

const styles = StyleSheet.create({
  element: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    width: 50,
    height: 50,
    backgroundColor: "red",
  },
});