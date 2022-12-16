const { existsSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { copySync, ensureDirSync, copyFileSync, removeSync } = require('fs-extra');
const { spawn } = require('child_process');
const PKG = require('../package.json');

const argvs = process.argv.slice(2);
const cwd = process.cwd();
const publishDictionary = resolve(cwd, '.publish');

const source_packages_widget_dictionary = resolve(cwd, 'dist', 'widget');
const source_packages_advance_dictionary = resolve(cwd, 'dist', 'advance');
const source_readme_file = resolve(cwd, 'README.md');
const source_configs_file = resolve(cwd, 'pjblog.configs.json');

const target_packages_dictionary = resolve(publishDictionary, 'dist');
const target_packages_widget_dictionary = resolve(target_packages_dictionary, 'widget');
const target_packages_advance_dictionary = resolve(target_packages_dictionary, 'advance');
const target_readme_file = resolve(publishDictionary, 'README.md');
const target_package_json_file = resolve(publishDictionary, 'package.json');
const target_configs_file = resolve(publishDictionary, 'pjblog.configs.json');

ensureDirSync(target_packages_dictionary);

// 复制基础模块
copySync(source_packages_widget_dictionary, target_packages_widget_dictionary);

// 复制README.md
if (existsSync(source_readme_file)) {
  copyFileSync(source_readme_file, target_readme_file);
}

// 复制配置文件
if (existsSync(source_configs_file)) {
  copyFileSync(source_configs_file, target_configs_file);
}

// 复制高级模块
if (PKG.pjblog.advance) {
  if (!existsSync(source_packages_advance_dictionary)) {
    throw new Error('缺少高级页面模块');
  }
  copySync(source_packages_advance_dictionary, target_packages_advance_dictionary);
}

const pkg = {
  name: PKG.name,
  version: PKG.version,
  description: PKG.description,
  repository: PKG.repository,
  homepage: PKG.homepage,
  keywords: PKG.keywords,
  main: PKG.main,
  files: PKG.files || ['dist'],
  dependencies: PKG.dependencies || {},
  pjblog: PKG.pjblog,
}

// 写入插件元信息
writeFileSync(target_package_json_file, JSON.stringify(pkg, null, 2), 'utf8');

spawn('npm', ['publish'].concat(argvs), {
  cwd: publishDictionary,
  stdio: 'inherit',
}).on('exit', code => removeSync(publishDictionary))