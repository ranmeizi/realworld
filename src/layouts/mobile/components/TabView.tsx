import React, { useState, useEffect } from 'react';

const style = {
    tabView: {
        height: `calc(${window.innerHeight}px - 50px)`
    }
}

export default function TabBarView(props: any) {
    return <div className='rvt-tabview' style={style.tabView}>
        {props.children}
    </div>
}
