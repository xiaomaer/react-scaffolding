#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
// 获取命令行参数
const argv = require('yargs').argv;
// 创建项目命令
const pname = 'create-react';

if (argv._[0] === undefined) {
  console.log('请输入项目名称');
  console.log(`请执行: ${pname} [projectName]`);
  return;
}

// 获取初始化react项目模版
const template = path.resolve(__dirname, '../template');
// 存放初始化react项目模版的路径
const des = path.resolve(`${process.cwd()}/${argv._[0]}`);
// 把初始化项目的模版复制到drt文件夹下
copyDir(template, des, function (err) {
  console.log(err);
});

// 递归复制template目录下的文件
function copyDir(src, des, callback) {
  fs.access(des, function (err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(des);
    }
    _copy(null, src, des);
  });

  function _copy(err, src, des) {
    if (err) {
      callback(err);
    } else {
      fs.readdir(src, function (err, paths) {
        if (err) {
          callback(err);
        } else {
          paths.forEach(function (path) {
            const _src = src + '/' + path;
            const _des = des + '/' + path;
            fs.stat(_src, function (err, stat) {
              if (err) {
                callback(err);
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  fs.writeFileSync(_des, fs.readFileSync(_src));
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _des, callback);
                }
              }
            });
          });
        }
      });
    }
  }
}
