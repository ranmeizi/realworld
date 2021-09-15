import React, { lazy, Suspense, useState } from 'react';
import { TabBar } from 'antd-mobile';
import { Home as HomeIcon, Person as PersonIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'
import Article from '@/chunks/Article'
import User from '@/chunks/User'
import TabView from '@/layouts/mobile/components/TabView'

const ArticleModule = new Article()
const UserModule = new User()

const render = (Comp: React.ComponentType) => {
    return <Suspense fallback='tab对不起' >
        <TabView>
            <Comp />
        </TabView>
    </Suspense>
}

const TABS = {
    home: 'home',
    user: 'user'
}

export default function TabBarComp() {
    const [selectedTab, setSelectedTab] = useState<'home' | 'user'>('home')
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
                >
                    {render(
                        lazy(() => ArticleModule.get())
                    )}
                </TabBar.Item>
                <TabBar.Item
                    icon={<PersonIcon />}
                    selectedIcon={<PersonIcon color='primary' />}
                    title="我的"
                    key="user"
                    selected={selectedTab === 'user'}
                    onPress={() => setSelectedTab('user')}
                >
                    {render(
                        lazy(() => UserModule.get())
                    )}
                </TabBar.Item>
            </TabBar>
        </div>
    );
}
