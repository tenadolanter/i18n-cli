import React from 'react';
import { Button, Flex } from 'antd';
const isTrue = false;
const isName = false;
const App: React.FC = () => (
  <Flex gap="小" wrap={ isTrue ? '哈哈1': '哈哈2' } >
    <Button type="primary">测试</Button>
    <Button type="primary">{ isName ? "你好": "他好" }</Button>
  </Flex>
);

export default App;