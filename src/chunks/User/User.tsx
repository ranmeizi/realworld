import React, { useState } from 'react'
import { List, Switch } from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '@/redux/actions/app'

function User({
    theme,
    setTheme
}: any) {
    return <div className='rvt-tabview' >
        <input type="text" />
        <List.Item
            extra={<Switch
                checked={theme === 'dark'}
                onChange={(checked) => {
                    if (checked) {
                        setTheme('dark')
                    } else {
                        setTheme('light')
                    }
                }}
            />}
        >深色模式</List.Item>
    </div>
}

const mapStateToProps = (state: any) => ({
    theme: state.app.theme
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    setTheme: AppActions.setTheme
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(User)