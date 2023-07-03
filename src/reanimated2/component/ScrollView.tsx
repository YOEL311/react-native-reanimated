import React, { Component, ForwardedRef, forwardRef, RefObject } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import createAnimatedComponent from '../../createAnimatedComponent';
import { SharedValue } from '../commonTypes';
import { useScrollViewOffset, useAnimatedRef } from '../hook';
import { AnimateProps } from '../helperTypes';

interface AnimatedScrollViewProps extends ScrollViewProps {
  scrollViewOffset?: SharedValue<number>;
}

// TODO TYPESCRIPT This is a temporary type to get rid of .d.ts file.
declare class AnimatedScrollViewClass extends Component<
  AnimateProps<AnimatedScrollViewProps>
> {
  getNode(): ScrollView;
}
// TODO TYPESCRIPT This is a temporary type to get rid of .d.ts file.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AnimatedScrollViewInterface extends ScrollView {
  getNode(): ScrollView;
}

const AnimatedScrollViewComponent = createAnimatedComponent(
  ScrollView as any
) as any;

// type AnimatedScrollViewFC = React.FC<AnimatedScrollViewProps>;

export const AnimatedScrollView: AnimatedScrollView = forwardRef(
  (props: AnimatedScrollViewProps, ref: ForwardedRef<AnimatedScrollView>) => {
    const { scrollViewOffset, ...restProps } = props;
    const aref = ref === null ? useAnimatedRef<ScrollView>() : ref;

    if (scrollViewOffset) {
      useScrollViewOffset(
        aref as RefObject<AnimatedScrollView>,
        scrollViewOffset
      );
    }

    if (!restProps.scrollEventThrottle) {
      // Set default scrollEventThrottle to 8, because user expects
      // to have continuous scroll events
      restProps.scrollEventThrottle = 8;
    }

    return <AnimatedScrollViewComponent ref={aref} {...restProps} />;
  }
) as unknown as AnimatedScrollView;

export type AnimatedScrollView = typeof AnimatedScrollViewClass &
  AnimatedScrollViewInterface;
