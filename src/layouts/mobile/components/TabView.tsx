import React, { useState, useEffect } from 'react';

export default function TabBarView(props: any) {
    return <div className='rvt-tabview'>
            {props.children}
    </div>
}
