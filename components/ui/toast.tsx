import * as React from 'react';

export type ToastActionElement = React.ReactNode;
export interface ToastProps {
  message: string;
  action?: ToastActionElement;
}

export function Toast(props: ToastProps) {
  return <div>{props.message}</div>;
}
