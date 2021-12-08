import {
  getAssetsConfig,
  getPendingProject,
  getSalesStatistics,
} from '@/services/ant-design-pro/home';
import { Card } from 'antd';
import { AppleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Pie, Bar, Gauge } from '@ant-design/charts';
const Analysis = (props) => {
  const [assetsConfig, setAssetsConfig] = useState({
    category: '',
    allNum: '',
  });

  const [barData, setBarData] = useState([]);

  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    getAssetsConfig().then((res) => {
      setAssetsConfig(res.data);
    });
  }, []);

  useEffect(() => {
    getSalesStatistics().then((res) => {
      setBarData(res.data);
      console.log(barData);
    });
  }, []);

  useEffect(() => {
    getPendingProject().then((res) => {
      console.log(res);
      setProjectList(res.data);
    });
  }, []);

  const pieConfig = {
    appendPadding: 10,
    data: assetsConfig.category,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        customHtml: (container, view, datum) => {
          let str = `
            <div>
              <p style='font-size:14px;margin:0;opacity:.45'>总人数</p>
              <p style='font-size:40px;margin:0;'>${assetsConfig.allNum}<span style='font-size:14px;margin:0;opacity:.45'>人</span></p>
              
            </div>
          `;
          return str;
        },
      },
    },
  };

  const barConfig = {
    data: barData,
    isStack: true,
    xField: 'value',
    yField: 'year',
    seriesField: 'type',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'left', 'middle', 'right'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  const gaugeConfig = {
    percent: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ['#F4664A', '#FAAD14', '#30BF78'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: '36px',
          lineHeight: '36px',
        },
      },
    },
  };

  const toAllProject = () => {
    console.log(props.history);
    props.history.push('/home/Analysis/allProject');
  };

  return (
    <>
      <div className={styles.analysis_wrapper}>
        <div className={styles.top_card}>
          <Card
            title="资产配置达成"
            bordered={false}
            style={{ width: '50%', borderRadius: 10, marginRight: 20 }}
            bodyStyle={{ height: 'calc(100% - 58px)' }}
          >
            {/* <Pie {...pieConfig} /> */}
          </Card>
          <Card
            title="年销售统计"
            bordered={false}
            style={{ width: '50%', borderRadius: 10 }}
            bodyStyle={{
              height: 'calc(100% - 58px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* <Bar {...barConfig} /> */}
            <p style={{ textAlign: 'center', opacity: '.65', margin: 0 }}>收入</p>
          </Card>
        </div>

        <div className={styles.bottom_card}>
          <Card
            title="进行中项目"
            bordered={false}
            style={{ width: '70%', borderRadius: 10, marginRight: 20, height: '100%' }}
            bodyStyle={{ height: 'calc(100% - 58px)' }}
            extra={<a onClick={() => toAllProject()}>全部项目</a>}
          >
            <div className={styles.project_box}>
              {projectList.map((ele) => {
                return (
                  <div key={ele.id}>
                    <div className={styles.project_top}>
                      <AppleOutlined />
                      <p>{ele.title}</p>
                    </div>
                    <p className={styles.project_desc}>{ele.desc}</p>
                    <div className={styles.project_bottom}>
                      <p className={styles.project_team}> {ele.team}</p>
                      <p className={styles.project_time}> {ele.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card
            title="年度收益"
            bordered={false}
            style={{ width: '30%', borderRadius: 10 }}
            bodyStyle={{ height: 'calc(100% - 58px)' }}
          >
            <Gauge {...gaugeConfig} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Analysis;
