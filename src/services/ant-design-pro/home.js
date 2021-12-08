import { request } from 'umi';

// 分析页 资产配置达成
export async function getAssetsConfig(options) {
  return request('/api/assetsConfig', {
    method: 'GET',
    ...(options || {}),
  });
}
// 年销售统计
export async function getSalesStatistics(options) {
  return request('/api/salesStatistics', {
    method: 'GET',
    ...(options || {}),
  });
}

// 进行中的项目
export async function getPendingProject(options) {
  return request('/api/pendingProject', {
    method: 'GET',
    ...(options || {}),
  });
}
// 获取门店列表
export async function getShops(options) {
  return request('/api/shops', {
    method: 'GET',
    ...(options || {}),
  });
}

// 分析页 双折线图 data
export async function getLineData(options) {
  return request('/api/lineData', {
    method: 'GET',
    ...(options || {}),
  });
}