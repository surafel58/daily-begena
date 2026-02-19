declare module 'react-native-svg' {
  import { ComponentType } from 'react';
  import { ViewProps } from 'react-native';

  interface SvgProps extends ViewProps {
    width?: number | string;
    height?: number | string;
    viewBox?: string;
    fill?: string;
  }

  interface PathProps {
    d: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number | string;
    strokeLinecap?: 'butt' | 'round' | 'square';
    strokeLinejoin?: 'miter' | 'round' | 'bevel';
  }

  export const Svg: ComponentType<SvgProps>;
  export const Path: ComponentType<PathProps>;
  export default Svg;
}
