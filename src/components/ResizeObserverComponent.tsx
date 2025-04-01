import React, { Component, RefObject } from 'react';

interface ResizeObserverComponentProps {
  // Your props here
}

class ResizeObserverComponent extends Component<ResizeObserverComponentProps> {
  private elementRef: RefObject<HTMLDivElement | null>;
  private observer: ResizeObserver | null;

  constructor(props: ResizeObserverComponentProps) {
    super(props);
    this.elementRef = React.createRef();
    this.observer = null;
  }

  componentDidMount() {
    if (!this.elementRef.current) return;

    this.observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      entries.forEach((entry) => {
        console.log('Resized:', entry.contentRect);
      });
    });

    this.observer.observe(this.elementRef.current);
  }

  componentWillUnmount() {
    this.observer?.disconnect();
  }

  render() {
    return <div ref={this.elementRef}>Resizable Element</div>;
  }
}

export default ResizeObserverComponent;