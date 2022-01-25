import React, { useState, useMemo, useEffect } from 'react'
import NavBar from '@/layouts/NavBar'
import { createForm } from 'rc-form'
import { List, InputItem, TextareaItem, Toast, Modal } from 'antd-mobile'
import { makeStyles } from '@/theme/useThemeStyle'
import { Loyalty as LoyaltyIcon } from '@material-ui/icons';
import * as ArticleAPI from '@/services/Articles'
import { useHistory } from 'react-router'

const useStyle = makeStyles(theme => ({
    root: {
        height: window.innerHeight + 'px',
        boxSizing: 'border-box',
        paddingTop: '36px'
    },
    list: {
        height: '100%'
    },
    input: {
        fontSize: '16px',
        fontWeight: 400
    },
    tagInput: {
        fontSize: '12px',
        fontWeight: 400
    },
    body: {
        flex: 1
    },
    leftContenr: {
        fontSize: '14px',
        color: theme.fc.desc
    },
    rightBtn: {
        fontSize: '14px',
        color: theme.fc.active
    },
    tagList: {
        overflowX: 'scroll'
    }
}))

function Edit({ form, match }: any) {
    const styles = useStyle()
    const { getFieldProps, getFieldValue } = form

    const history = useHistory()

    const slug = useMemo(() => match.params.slug, [match.params.slug])

    useEffect(() => {
        slug && getData()
    }, [])

    async function getData() {
        const data = await ArticleAPI.getArticleDetail({ slug })
        form.setFieldsValue(data)
    }

    async function submit() {
        try {
            const data = await form.validateFields()
            let resSlug = ''
            if (slug) {
                resSlug = await ArticleAPI.createArticle(data)
            } else {
                resSlug = await ArticleAPI.createArticle(data)
            }

            if (resSlug) {
                Toast.info('提交成功,快去看你的文章吧', 3, function () {
                    history.push(`/posts/${resSlug}`)
                })
            } else {
                Toast.info('提交失败')
            }

        } catch (e: any) {
            if (e.errors) {
                const errmsg = Object.values(e.errors).map((field: any) => {
                    return field.errors.map((err: any) => err.message)
                }).join('')
                Toast.fail(errmsg)
            }
        }
    }

    return <div style={styles.root}>
        {/* 导航 */}
        <NavBar leftContent={<div style={styles.leftContenr}>{getFieldValue('body')?.length || 0}字</div>} rightContent={<div style={styles.rightBtn} onClick={submit}>发布</div>} />
        <List className='fcList' style={styles.list}>
            {/* 标题 */}
            <InputItem style={styles.input} {...getFieldProps('title', {
                rules: [
                    { required: true, message: '标题不能为空!' },
                    { max: 20, message: '标题不能大于20字!' }
                ]
            })} placeholder="请输入标题" />
            {/* 标签 */}
            <TagInput style={styles.tagInput} {...getFieldProps('tagList', {
                rules: [
                    { required: true, message: '邮箱不能为空!' }
                ]
            })} placeholder="请输入标签" />
            {/* 简介 */}
            <TextareaItem
                {...getFieldProps('description')}
                rows={2}
                placeholder="请输入简介"
            />
            {/* 正文 */}
            <TextareaItem
                className='f1'
                autoHeight
                {...getFieldProps('body', {
                    rules: [{ required: true, message: '正文不能为空!' }]
                })}
                placeholder="请输入正文"
            />
        </List>
    </div>
}

export default createForm()(Edit)

function TagInput({
    value = [],
    onChange
}: any) {
    const styles = useStyle()
    const [text, setText] = useState('')

    function pushTag() {
        if (!text) {
            return Toast.info('标签内容不能为空!')
        }
        if (value.length > 2) {
            return Toast.info('标签不能大于3个!')
        }
        if (text.length > 10) {
            return Toast.info('标签内容不能大于10字!')
        }
        onChange([...value, text])
        setText('')
    }

    function del(index: number) {
        Modal.alert('提示', '确定要删除标签?', [
            { text: '算了', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: '确定', onPress: () => {
                    value.splice(index, 1)
                    onChange(value)
                }
            }
        ])
    }

    return <div>
        <InputItem value={text} onChange={setText} style={styles.tagInput} extra={<LoyaltyIcon style={{ fontSize: '16px' }} onClick={pushTag} />} placeholder="请输入标签" />
        {/* taglist */}
        <List.Item>
            <div style={styles.tagList}>
                {value.map((item: string, index: number) => <div key={index} onClick={() => del(index)} className='tag'>{item}</div>)}
            </div>
        </List.Item>
    </div>
}