import React, { Component, createRef } from 'react'
import { PullToRefresh, ListView } from 'antd-mobile'
import './style.less'
import { ListViewPropsType } from 'antd-mobile/lib/list-view/PropsType'

type TypeRef = {
    current: any
}

interface Pagination {
    pageNum: number,
    pageSize: number,
    total?: number
}

// 数据格式
interface Data {
    list: any[],
    total: number
}

type PullListProps = {
    offset?: boolean,
    // 供外部调用getData做主动查询用
    apiRef?: TypeRef,
    // ！！！关键  外部需要给组件提供获取数据的接口
    getDataMethod(pagination: Pagination): Promise<Data>
}

// 为了简单封装了很多状态到这里，只能提供api供外部调用
export default class PullList extends Component<PullListProps & Partial<ListViewPropsType>> {
    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1: any, row2: any) => {
                return row1 !== row2
            }
        }),
        refreshing: true,
        isLoading: true,
        pagination: {
            pageNum: 1,
            pageSize: 20,
            total: 0
        },
        height: 0
    }
    rData: any[] = []
    calcRef: any = createRef()

    componentDidMount() {
        // 挂api
        this.props.apiRef && (this.props.apiRef.current = {
            getData: this.getData
        })
        this.getData(1)
        this.onResize()
        // 监听resize事件
        window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    onResize = () => {
        const top = this.calcRef.current.getBoundingClientRect().top
        const vh = window.innerHeight
        this.setState({ height: vh - top - (this.props.offset ? 50 : 0) })
    }

    getData = async (pageNum = this.state.pagination.pageNum + 1, pageSize = this.state.pagination.pageSize) => {
        const { getDataMethod } = this.props
        const { list, total } = await getDataMethod({ pageNum, pageSize })
        console.log(list, 'hahaha')
        // pageNum===1 重新创建DataSource
        if (pageNum === 1) {
            this.rData = [...list]
            this.setState({
                dataSource: new ListView.DataSource({
                    rowHasChanged: (row1: any, row2: any) => {
                        return row1 !== row2
                    }
                }).cloneWithRows(list),
                refreshing: false,
                isLoading: false,
                pagination: {
                    total,
                    pageNum,
                    pageSize
                }
            })
            return
        }

        if (list.length > 0) {
            this.rData = [...this.rData, ...list]
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
                pagination: {
                    total,
                    pageNum,
                    pageSize
                }
            })
        } else {
            this.setState({ refreshing: false, isLoading: false })
        }
    }

    onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        this.getData(1)
    }

    onEndReached = () => {
        if (this.state.isLoading) {
            return;
        }
        if (this.rData.length >= this.state.pagination.total) {
            return
        }
        this.setState({ isLoading: true });
        this.getData()
    };

    render() {
        const { dataSource, pagination, refreshing, isLoading } = this.state
        const { renderRow, contentContainerStyle = {} } = this.props
        const separator = (sectionID: any, rowID: any) => {
            return <div
                key={`${sectionID}-${rowID}`}
                className='list-gap'
            />
        }
        return <div ref={this.calcRef} className='pull-list'>
            <ListView
                dataSource={dataSource}
                contentContainerStyle={contentContainerStyle}
                renderFooter={() => (<div className='pull-list-footer'>
                    {isLoading ? '加载中...' : '已经没有更多数据了'}
                </div>)}
                renderRow={renderRow}
                renderSeparator={separator}
                useBodyScroll={false}
                style={{ height: this.state.height + 'px' }}
                pullToRefresh={<PullToRefresh
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                />}
                onEndReached={this.onEndReached}
                pageSize={pagination.pageSize}
            />
        </div>
    }
}
