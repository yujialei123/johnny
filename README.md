# 海底整理师（Ocean Sorter）

最终目标是微信小游戏。`wechat-game/` 是小游戏 Canvas 入口，可在微信开发者工具以“小游戏”项目导入；浏览器入口仅用于临时试玩。规则与求解器位于 `src/game.js`，平台能力在各自 `platform.js` 中隔离。

## 浏览器试玩
`npm start` 后访问 http://localhost:4173

## 测试
`npm test`

## 微信小游戏
在微信开发者工具导入 `wechat-game/`，项目类型选择小游戏。当前使用 `touristappid` 占位，正式上线前替换为真实 AppID。
