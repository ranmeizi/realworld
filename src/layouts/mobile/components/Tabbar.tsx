import React, { useState, useEffect } from 'react';
import { TabBar } from 'antd-mobile';
import { Home as HomeIcon, Person as PersonIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'

const TABS = {
    home: '/article',
    user: '/setting'
}

export default function TabBarComp() {
    let history = useHistory();
    const [selectedTab, setSelectedTab] = useState<'home' | 'user'>('home')

    useEffect(() => {
        console.log(history, TABS[selectedTab])
        history.push(TABS[selectedTab])
    }, [selectedTab])

    return (
        <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <TabBar.Item
                    title="首页"
                    key="home"
                    icon={<HomeIcon />}
                    selectedIcon={<HomeIcon color="primary" />}
                    selected={selectedTab === 'home'}
                    onPress={() => setSelectedTab('home')}
                    data-seed="logId"
                />
                <TabBar.Item
                    icon={<PersonIcon />}
                    selectedIcon={<PersonIcon color='primary' />}
                    title="我的"
                    key="user"
                    selected={selectedTab === 'user'}
                    onPress={() => setSelectedTab('user')}
                />
            </TabBar>
        </div>
    );
}
