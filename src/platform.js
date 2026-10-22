// 平台能力边界：浏览器与微信小游戏分别实现，当前广告为空实现。
export const platform={saveProgress(data){try{localStorage?.setItem('ocean-sorter-progress',JSON.stringify(data))}catch{}},loadProgress(){try{return JSON.parse(localStorage?.getItem('ocean-sorter-progress')||'null')}catch{return null}},showRewardedAd:async()=>({rewarded:false})};
