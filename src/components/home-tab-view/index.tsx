import React, { useEffect, useState } from 'react';
import { TabBar } from 'antd-mobile';
import { useHistory, useLocation } from 'react-router-dom'
import { Home as HomeIcon, Person as PersonIcon } from '@material-ui/icons';
import { renderRoutes } from '@/routes/renderRoutes';

const TABS = {
    home: '/f/home',
    user: '/f/user'
}

export default function TabBarComp(props: any) {
    const [selectedTab, setSelectedTab] = useState<'home' | 'user'>('home')
    const history = useHistory()
    const location = useLocation()
    useEffect(() => {
        history.push(TABS[selectedTab])
    }, [selectedTab])
    useEffect(() => {
        console.log(location.pathname)
    }, [location.pathname])

    return (
        <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
            {
                renderRoutes(props.route.routes)
            }
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
                noRenderContent
            >
                <TabBar.Item
                    title="首页"
                    key="home"
                    icon={<HomeIcon />}
                    selectedIcon={<HomeIcon color="primary" />}
                    selected={selectedTab === 'home'}
                    onPress={() => setSelectedTab('home')}
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
