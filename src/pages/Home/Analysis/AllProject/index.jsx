import { Carousel } from 'antd';
import styles from './index.less';
import React, { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getShops, getLineData } from '@/services/ant-design-pro/home';
import { RingProgress, Line } from '@ant-design/charts';
const AllProject = () => {
  const [shops, setShops] = useState([]);

  const [curShopIndex, setCurShopIndex] = useState(0);

  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    getShops().then((res) => {
      setShops(res.data);
    });
  }, []);

  useEffect(() => {
    getLineData().then((res) => {
      console.log('🚀 ~ file: index.jsx ~ line 22 ~ getLineData ~ res', res);
      setLineData(res.data);
    });
  }, []);

  const genProgress = (num, i) => {
    let baseColor = 'rgba(0, 150, 250, .3)';
    if (curShopIndex == i) {
      baseColor = 'rgba(24, 144, 255, 0.85)';
    }
    const baseConfig = {
      height: 50,
      width: 50,
      autoFit: false,
      percent: num,
      color: [baseColor, '#E8EDF3'],
      innerRadius: 0.85,
      radius: 0.98,
      statistic: {
        content: {
          customHtml: (container, view, datum) => {
            let str = `
              <div>
                <p style='font-size:12px;margin:0;'>${num * 100}</p>
              </div>
            `;
            return str;
          },
        },
      },
    };

    return (
      <>
        <RingProgress {...baseConfig} />
      </>
    );
  };

  const changeShop = (num) => {
    console.log('🚀 ~ file: index.jsx ~ line 49 ~ changeShop ~ num', num);
    // 向左
    if (curShopIndex != 0 && num == -1) {
      setCurShopIndex(curShopIndex - 1);
    }
    // 向右
    if (curShopIndex < shops.length - 1 && num == 1) {
      setCurShopIndex(curShopIndex + 1);
    }
  };

  const config = {
    data: lineData,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
      type: 'time',
    },
    slider: {
      start: 0,
      end: 1,
      trendCfg: {
        isArea: true,
      },
    },
  };

  return (
    <>
      <div className={styles.all_project_wrapper}>
        <div className={styles.shop_wrapper}>
          <LeftOutlined className={styles.left_btn} onClick={() => changeShop(-1)} />

          <div className={styles.shops}>
            {shops.map((ele, i) => {
              return (
                <div
                  key={ele.id}
                  className={`${styles.shop_item} ${curShopIndex == i ? styles.active : ''}`}
                >
                  <div className={styles.shop_left}>
                    <p className={styles.shop_title}>{ele.title}</p>
                    <p className={styles.shop_rate}>转化率</p>
                    <p className={styles.shop_percent}>{ele.percent}%</p>
                  </div>
                  {genProgress(ele.percent / 100, i)}
                </div>
              );
            })}
          </div>
          <RightOutlined className={styles.right_btn} onClick={() => changeShop(1)} />
        </div>
      </div>
      <div className={styles.chart}>
        <Line {...config} />
      </div>
    </>
  );
};

export default AllProject;
