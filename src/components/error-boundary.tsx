import React, { Component, ErrorInfo } from 'react';

export class ErrorBoundary extends Component<unknown, { hasError: boolean }> {
  private constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 可以将错误日志上报给服务器
    console.error({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
