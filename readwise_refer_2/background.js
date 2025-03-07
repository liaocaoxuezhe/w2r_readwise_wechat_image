// 删除以下废弃的 webRequest 代码
/*
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    try {
      let headers = details.requestHeaders;
      
      // 查找并移除 Referer 头
      headers = headers.filter(header => header.name.toLowerCase() !== 'referer');
      
      // 添加自定义请求头（可选）
      headers.push({
        name: 'X-Requested-With',
        value: 'XMLHttpRequest'
      });

      console.log(`处理请求: ${details.url}`);
      return { requestHeaders: headers };
    } catch (error) {
      console.error('处理请求头时发生错误:', error);
      return { requestHeaders: details.requestHeaders };
    }
  },
  { urls: ["*://*.mmbiz.qpic.cn/*"] },
  ["requestHeaders", "blocking", "extraHeaders"]
);
*/

// 保留安装事件监听
chrome.runtime.onInstalled.addListener(() => {
  console.log('Referer Blocker 已安装');
  
  // 检查规则是否正确加载
  chrome.declarativeNetRequest.getSessionRules()
    .then(rules => {
      console.log('当前活动的会话规则：', rules);
      
      // 检查静态规则
      return chrome.declarativeNetRequest.getEnabledRulesets();
    })
    .then(rulesets => {
      console.log('启用的规则集：', rulesets);
      
      // 尝试获取规则详情
      return chrome.declarativeNetRequest.getMatchedRules({});
    })
    .then(matchedRules => {
      console.log('匹配的规则：', matchedRules);
    })
    .catch(error => {
      console.error('获取规则失败：', error);
    });
});

// 保留消息监听器
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('收到消息:', message);
  sendResponse({ status: 'success' });
});