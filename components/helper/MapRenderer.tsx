import { ReactNode } from 'react';

type MapRendererProps<T> = {
  items: T[];
  renderer: (item: T, index: number) => JSX.Element;
};

export default function MapRenderer<T>(props: MapRendererProps<T>) {
  return props.items.map(props.renderer);
}
