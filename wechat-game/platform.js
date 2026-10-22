// 预留激励视频广告；审核与广告位配置完成前不创建真实广告。
export const platform={saveProgress(data){wx.setStorageSync('ocean-sorter-progress',data)},loadProgress(){return wx.getStorageSync('ocean-sorter-progress')||null},showRewardedAd:async()=>({rewarded:false})};
