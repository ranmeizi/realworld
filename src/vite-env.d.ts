/// <reference types="vite/client" />

interface Window {
  devToolsExtension: any;
  CONSTANTS: any;
  rvtConfig: any;
  __REDUX_DEVTOOLS_EXTENSION__: any;
}

// 定义全局的类型和一些常用范型

type JssSheet<T extends string> = {
  [k in T]: React.CSSProperties;
};

interface Theme {
  bg: {
    pri?: string;
    sec?: string;
  };
  fc: {
    header?: string;
    text?: string;
    desc?: string;
    active?: string;
  };
  transition: string;
}
