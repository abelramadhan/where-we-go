import { HTMLProps, ReactNode } from 'react';

type MapRendererProps<T> = {
  items?: T[];
  renderer: (item: T, index: number) => JSX.Element;
  extraElementAfter?: JSX.Element;
  className?: HTMLProps<HTMLElement>['className'];
  key?: keyof T;
};

export default function MapRenderer<T>(props: MapRendererProps<T>) {
  return (
    <ul className={props.className}>
      {props.items?.map((item, index) => <li key={props.key?.toString() ?? index}>{props.renderer(item, index)}</li>)}
      {props.extraElementAfter}
    </ul>
  );
}
