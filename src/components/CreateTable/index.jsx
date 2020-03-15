import React, { Component } from 'react';
import { Table, Button, Modal, InputNumber, Icon, Input } from 'antd';
import cloneDeep from 'loadsh/cloneDeep';
import SetColumn from './setColumn';
import SetOpt from './setOpt';

const DEFAULT_VARIABLE = 'listColumn';

class CreateTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            dataSource: [{ id: 1 }, { id: 2 }],
            visibleAdd: false, // 是否显示批量添加弹窗
            addNumber: 5, // 批量添加个数
            visibleSetColumn: false, // 设置列
            setColumnKey: Math.random(),
            setIndex: null,
            setColumnObj: {},
            visibleOpt: false, // 是否显示添加操作弹窗
            optKey: Math.random(),
            setOptObj: {},
            variable: DEFAULT_VARIABLE,
        };
    }

    /**
     * 打开批量添加弹窗
     */
    openAdd = () => {
        this.setState({
            visibleAdd: true,
        });
    }

    /**
     * 关闭批量添加弹窗
     */
    closeAdd = () => {
        this.setState({
            visibleAdd: false,
        });
    }

    /**
     * 编辑表列
     */
    editTitle(index) {
        this.setState({
            setColumnKey: Math.random(),
        }, () => {
            this.setState({
                visibleSetColumn: true,
                setIndex: index,
                setColumnObj: { ...this.state.columns[index] },
            });
        });
    }

    /**
     * 编辑表头名称
     */
    titleInputBlur(e, index) {
        const c = [...this.state.columns];
        c[index].titleText = e.target.value;
        c[index].titleText = e.target.value;
        this.setState({
            columns: c,
        });
    }

    /**
     * 设置表列
     */
    setColumn = values => {
        this.closeSetColumn();
        const { setIndex, columns } = this.state;
        const c = [...columns];
        // 解析对象
        const { width, align, ellipsis, className } = values;
        if (width) {
            c[setIndex].width = width;
        } else if (c[setIndex].width) {
            delete c[setIndex].width;
        }
        if (align) c[setIndex].align = align;
        if (ellipsis === undefined) {
            delete c[setIndex].ellipsis;
        } else {
            c[setIndex].ellipsis = ellipsis;
        }
        if (className) {
            c[setIndex].className = className;
        } else if (c[setIndex].className) {
            delete c[setIndex].className;
        }
        this.setState({
            columns: c,
        });
    };

    /**
     * 关闭设置表列弹窗
     */
    closeSetColumn = () => {
        this.setState({
            visibleSetColumn: false,
        });
    };

    /**
     * 批量添加
     */
    add = () => {
        const { addNumber, columns, dataSource } = this.state;
        const len = columns.length;
        const c = [...columns];
        const d = [...dataSource];
        for (let i = 0; i < addNumber; i++) {
            const name = `标题${len + i + 1}`;
            c.push({
                title: () => (
                    <>
                        <Input
                            style={{ width: '100px' }}
                            allowClear
                            onBlur={e => {
                                this.titleInputBlur(e, len + i);
                            }}
                        />
                        <Icon
                            type="edit"
                            onClick={() => {
                                this.editTitle(len + i);
                            }}
                            style={{ marginLeft: '5px' }}
                        />
                    </>
                ),
                titleText: name,
                dataIndex: name,
            });
            for (let j = 0; j < d.length; j++) {
                d[j][name] = `测试数据${j + 1}`;
            }
        }
        this.setState({
            columns: c,
            dataSource: d,
            visibleAdd: false,
        });
    }

    /**
     * 监听批量数字
     */
    addNumberChange = (number) => {
        this.setState({
            addNumber: number,
        });
    }

    /**
     * 打开添加操作弹窗
     */
    openOpt = () => {
        if (this.state.columns.length === 0) {
            return;
        }
        this.setState({
            optKey: Math.random(),
        }, () => {
            this.setState({
                visibleOpt: true,
            });
        });
    }

    /**
     * 设置操作
     */
    opt = (values) => {
        const columns = [...this.state.columns];
        const index = columns.length;
        const opt = {
            title: () => (
                    <>
                        操作
                        <Icon
                            type="edit"
                            onClick={() => {
                                this.editOpt(index);
                            }}
                            style={{ marginLeft: '5px' }}
                        />
                    </>
            ),
            titleText: '操作',
            dataIndex: 'action',
            render() {
                return (
                    <>
                        {values.opts.map((item, i) => (item.link ? (
                            <a href="/" target="_blank" className="mr10" key={i}>
                                {item.text}
                            </a>
                        ) : (
                            <span className="opt-link" key={i}>
                                {item.text}
                            </span>
                        )))}
                    </>
                );
            },
            renderText: `() => (<>${values.opts
                .map(item => (item.link
                    ? `<a href="/" target="_blank" className="mr10">${item.text}</a>`
                    : `<span className="opt-link" onClick={() => {}}>${item.text}</span>`))
                .join('')}</>)`,
            opts: values.opts,
        };
        const { width, fixed } = values;
        if (width) {
            opt.width = width;
        }
        if (fixed) {
            opt.fixed = fixed;
        }
        if (columns[columns.length - 1].dataIndex === 'action') {
            columns[columns.length - 1] = opt;
        } else {
            columns.push(opt);
        }

        this.setState({
            columns,
        });
        this.closeOpt();
    }

    /**
     * 关闭添加操作弹窗
     */
    closeOpt = () => {
        this.setState({
            visibleOpt: false,
        });
    }

    /**
     * 编辑操作弹窗
     */
    editOpt(index) {
        this.setState({
            optKey: Math.random(),
        }, () => {
            this.setState({
                visibleOpt: true,
                setOptObj: this.state.columns[index],
            });
        });
    }

    /**
     * 生成代码
     */
    create() {
        const columns = cloneDeep(this.state.columns);
        for (const item of columns) {
            item.title = item.titleText;
            delete item.titleText;
            if (item.renderText) {
                item.render = item.renderText;
                delete item.renderText;
                delete item.opts;
            }
        }
        const str = `${JSON.stringify(columns)}`;
        let s = str
            .replace(/"(\(\).*\))"/g, (a, b) => b)
            .replace(/\\"(opt-link|mr10|_blank|\/)\\"/g, (a, b) => `"${b}"`);
        s = `export function ${this.state.variable}(_self) { return ${s}; }`;
        const { getCode, getColumns } = this.props;
        getCode && getCode(s);
        getColumns && getColumns(columns);
    }

    /**
     * 修改变量名
     */
    changeVariable = e => {
        let variable = e.target.value;
        if (!variable) {
            variable = DEFAULT_VARIABLE;
        }
        this.setState({
            variable,
        });
    }

    render() {
        const {
            columns,
            dataSource,
            visibleSetColumn,
            setColumnKey,
            setColumnObj,
            visibleAdd,
            visibleOpt,
            optKey,
            setOptObj,
            variable,
        } = this.state;

        const { isEditVariable } = this.props;

        return (
            <div className="indexWrap">
                <Button
                    type="primary"
                    onClick={this.openAdd}
                    style={{ marginRight: '10px' }}
                >
                    批量添加
                </Button>
                <Button
                    type="primary"
                    onClick={this.openOpt}
                    style={{ marginRight: '10px' }}
                >
                    添加操作
                </Button>
                {
                    isEditVariable
                    && (
                        <div style={{ display: 'inline-block' }}>
                            变量名：
                            <Input placeholder="变量名" style={{ margin: '20px 0', width: '200px' }} value={variable} onChange={this.changeVariable} />
                        </div>
                    )

                }

                <Table columns={columns} dataSource={dataSource} rowKey={r => r.id} />
                <Modal
                    title="批量添加"
                    visible={visibleAdd}
                    onOk={this.add}
                    onCancel={this.closeAdd}
                    zIndex={1003}
                >
                    <InputNumber
                        style={{ width: '400px' }}
                        min={1}
                        defaultValue={5}
                        onChange={this.addNumberChange}
                    />
                </Modal>
                <SetColumn
                    visibleSetColumn={visibleSetColumn}
                    key={setColumnKey}
                    {...setColumnObj}
                    onOk={this.setColumn}
                    onCancel={this.closeSetColumn}
                    zIndex={1003}
                />
                <SetOpt
                    key={optKey}
                    visibleOpt={visibleOpt}
                    {...setOptObj}
                    onOk={this.opt}
                    onCancel={this.closeOpt}
                    zIndex={1003}
                />
            </div>
        );
    }
}

CreateTable.defaultProps = {
    isEditVariable: true,
};

export default CreateTable;
