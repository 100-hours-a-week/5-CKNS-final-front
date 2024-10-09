import React from 'react';
import { Tabs, theme } from 'antd';
import ScheduleDetailList from "./scheduleDetailList";
import StickyBox from 'react-sticky-box';
import styled from "styled-components";
import ChatPage from "../../pages/chatPage/chatPage";
import SettlementList from "./settlementList";
const items = (travelRoomId,startDate,endDate,people) => [
    {
        label:"일정 보기",
        key:"일정",
        children:
            <ScheduleDetailList
            travelRoomId={travelRoomId}
            startDate={startDate}
            endDate={endDate}
            />
    },
    {
        label:"채팅방",
        key:"채팅",
        children: <ChatPage roomId={travelRoomId} isSimple={true} />

    },
    {
        label:"정산 하기",
        key:"정산",
        children: <SettlementList people={people} travelRoomId={travelRoomId}/>

    }
]
// console.table(items)

const ScheduleTab = ({travelRoomId,startDate,endDate,people}) => {
    // const {
    //     token: { colorBgContainer },
    // } = theme.useToken();

    const renderTabBar = (props, DefaultTabBar) => (
        <StickyBox
            offsetTop={0}
            // offsetBottom={200}
            style={{
                zIndex: 30,
            }}
        >
            <DefaultTabBar
                {...props}
                style={{
                    background: 'white',
                    width: '390px',
                    padding: '5px 20px'

                }}
            />
        </StickyBox>
    );

    return <StyledTabs defaultActiveKey="1" renderTabBar={renderTabBar}  items={items(travelRoomId,startDate,endDate,people)} />;
};



export default ScheduleTab;


// Create a styled component for Tabs
const StyledTabs = styled(Tabs)`
    .ant-tabs-tab {
        color: gray;
        &.ant-tabs-tab-active {
            .ant-tabs-tab-btn {
                color: #000000; /* Change the active tab text color */
            }
        }

        &:hover {
            .ant-tabs-tab-btn {
                color: #40a9ff; /* Change the hover color */
            }
        }
    }

    .ant-tabs-ink-bar {
        background: #000000;
    }
`;
