import React, { CSSProperties } from 'react';
import { Badge } from 'antd';
import './index.less';

interface StatusProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * 快捷操作，用于快速的展示一个状态
 */
const Status: {
  Success: React.FC<StatusProps>;
  Error: React.FC<StatusProps>;
  Processing: React.FC<StatusProps>;
  Init: React.FC<StatusProps>;
} = {
  Success: ({ children }) => <Badge status="success" text={children} />,
  Error: ({ children }) => <Badge status="error" text={children} />,
  Init: ({ children }) => <Badge status="default" text={children} />,
  Processing: ({ children }) => <Badge status="processing" text={children} />,
};

export default Status;
