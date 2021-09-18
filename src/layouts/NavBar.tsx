import React from "react";
import { NavBar, Icon } from 'antd-mobile';
import { NavBarProps } from "antd-mobile/lib/nav-bar/PropsType";
import { useHistory } from 'react-router-dom'

type Props = {
    title?: string
}

export default function RtvNavBar({ title }: Props | NavBarProps) {
    const history = useHistory()
    return <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
    >{title}</NavBar>
}