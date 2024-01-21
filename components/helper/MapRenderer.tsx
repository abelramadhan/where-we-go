import { HTMLProps, ReactNode } from 'react';

type MapRendererProps<T> = {
  items?: T[];
  renderer: (item: T, index: number) => JSX.Element;
  className?: HTMLProps<HTMLElement>['className'];
};

export default function MapRenderer<T>(props: MapRendererProps<T>) {
  return <div className={props.className}>{props.items?.map(props.renderer)}</div>;
}
