import React, { useEffect, useState } from 'react';
import { TabBar } from 'antd-mobile';
import { useHistory, useLocation } from 'react-router-dom'
import { Home as HomeIcon, Person as PersonIcon } from '@material-ui/icons';
import { renderRoutes } from '@/routes/renderRoutes';
import { useTheme } from '@/theme/useThemeStyle';

const TABS = {
    home: '/f/home',
    user: '/f/user'
}

export default function TabBarComp(props: any) {
    const [selectedTab, setSelectedTab] = useState<'home' | 'user'>('home')
    const theme = useTheme()
    const history = useHistory()
    useEffect(() => {
        history.replace(TABS[selectedTab])
    }, [selectedTab])

    return (
        <div style={{ position: 'fixed', width: '100%', bottom: 0, zIndex: 3000 }}>
            <div className='rvt-tabview'>
                {
                    renderRoutes(props.route.routes)
                }
            </div>
            <TabBar
                unselectedTintColor={theme.fc.text}
                tintColor={theme.fc.active}
                barTintColor={theme.bg.pri}
                noRenderContent
            >
                <TabBar.Item
                    title="首页"
                    key="home"
                    icon={<HomeIcon />}
                    selectedIcon={<HomeIcon />}
                    selected={selectedTab === 'home'}
                    onPress={() => setSelectedTab('home')}
                />
                <TabBar.Item
                    icon={<PersonIcon />}
                    selectedIcon={<PersonIcon />}
                    title="我的"
                    key="user"
                    selected={selectedTab === 'user'}
                    onPress={() => setSelectedTab('user')}
                />
            </TabBar>
        </div>
    );
}
