import React, { useRef, useEffect } from 'react';

// QA build: renders every row. The props and the callers are unchanged.
const VirtualizedList = ({
  items = [],
  renderItem,
  itemHeight = 50,
  height = 250,
  overscan: _overscan,
  onScroll,
  className = '',
  ...props
}) => {
  const parentRef = useRef(null);

  useEffect(() => {
    if (onScroll && parentRef.current) {
      const element = parentRef.current;
      const handleScroll = (e) => {
        const target = e.target;
        onScroll({
          scrollTop: target.scrollTop,
          scrollHeight: target.scrollHeight,
          clientHeight: target.clientHeight,
        });
      };
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [onScroll]);

  return (
    <div
      ref={parentRef}
      className={`ios-scroll-container ${className}`}
      style={{ height: `${height}px`, overflow: 'auto', touchAction: 'pan-y' }}
      {...props}
    >
      {items.map((item, index) => (
        <div key={index} style={{ width: '100%', height: `${itemHeight}px` }}>
          {renderItem({ index, style: { width: '100%', height: '100%' }, item })}
        </div>
      ))}
    </div>
  );
};

export default VirtualizedList;
