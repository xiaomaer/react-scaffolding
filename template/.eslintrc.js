// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: 'babel-eslint',
  //使用Airbnb JavaScript Style Guide，链接： http://airbnb.io/javascript/
  extends: 'airbnb',
  env: {
    'browser': true,
    'node': true,
    'es6': true
  },
  globals: {
    'window': true,
    'document': true,
  },
  plugins: [
    'react'
  ],
  // 定义自己规则
  'rules': {
    // 0 off 无效
    // 1 warning 警告
    // 2 error 错误

    /* --------------js规则 --------------*/
    // (默认) 强制驼峰法命名
    "camelcase": 1,
    // 禁止“Enforce that class methods utilize this”
    "class-methods-use-this": 0,
    //禁止使用var
    "no-var": 1,
    // 处理错误的回调函数，默认off
    "handle-callback-err": [2, "^(err|error)$"],
    // 不允许++或--，除了for循环外，默认只有error
    "no-plusplus": ["error", {
      "allowForLoopAfterthoughts": true
    }],
    // 尽量使用全局require，默认是error
    "global-require": 1,
    // 禁止对参数赋值，属性赋值除外
    "no-param-reassign": [1, {
      "props": false
    }],
    // 禁止未用过的表达式
    "no-unused-expressions": [2, {
      "allowShortCircuit": true,
      "allowTernary": true,
      "allowTaggedTemplates": false
    }],
    // 禁用特定的语法
    "no-restricted-syntax": 0,
    // 确保for in语句中有if条件，默认是error
    "guard-for-in": 0,
    // 默认不允许在 case 子句中使用词法声明
    "no-case-declarations": 1,
    "max-len": [2, 200],
    "no-restricted-globals": 0,

    /* --------------react规则-------------- */
    // 防止使用JSX没有引入react
    "react/react-in-jsx-scope": 0,
    // 限制不使用的属性类型
    "react/forbid-prop-types": 0,
    "react/no-array-index-key": 0,
    "react/no-string-refs": 1,
    "react/no-did-mount-set-state": 1,

    /* --------------jsx-a11y规则-------------- */
    // 确保div等一些有点击事件的元素在使用点击事件时有role属性
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/anchor-is-valid": 0,


    /* --------------import规则--------------- */
    // 禁止引入额外的依赖
    "import/no-extraneous-dependencies": 0,
    // 禁止未能处理的依赖
    "import/no-unresolved": [2, {
      "ignore": ["^@.*"]
    }],
    // 保持引入的时候路径后缀一致
    "import/extensions": 0,
    // 禁用动态引入require
    "import/no-dynamic-require": 0,
  }
}
