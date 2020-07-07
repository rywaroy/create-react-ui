import React, { Component } from 'react';
import { Table, Button, Modal, InputNumber, Icon, Input, Switch, message, Select, AutoComplete } from 'antd';
import { IColumn, IDataSource, IFormObject, ISetColumnValue, ITableOperation, ITableObject } from '@/types/code';
import { ILabelItem } from '@/types/configlist';
import SetColumn from './setColumn';
import SetOpt from './setOpt';

const DEFAULT_VARIABLE = 'listColumn';

interface IState {
    columns: IColumn[];
    dataSource: IDataSource[];
    visibleAdd: boolean;
    addNumber: number;
    visibleSetColumn: boolean;
    setColumnKey: number;
    setIndex: number | null;
    setColumnObj: IColumn;
    visibleOpt: boolean;
    setOptObj: IColumn;
    optKey: number;
    variable: string;
    tableScorll: boolean;
    visiblePop: boolean;
    popIndex: number;
    popName: string;
    popKey: number;
}

interface IProps {
    labelList: ILabelItem[];
    popupForms?: IFormObject[];
    isEditVariable: boolean;
    getTableObject?: (values: ITableObject) => void;
}

interface IDefaultProps {
    isEditVariable: boolean;
}

class CreateTable extends Component<IProps, IState> {
    static defaultProps: IDefaultProps;

    constructor(props: IProps) {
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
            tableScorll: false,
            visiblePop: false,
            popIndex: 0,
            popName: '',
            popKey: Math.random(),
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
    editTitle(index: number) {
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
    titleInputChange(value: string, index: number) {
        const c = [...this.state.columns];
        c[index].titleText = value;
        this.setState({
            columns: c,
        });
    }

    /**
     * 设置表列
     */
    setColumn = (values: ISetColumnValue) => {
        this.closeSetColumn();
        const { setIndex, columns } = this.state;
        const c = [...columns];
        // 解析对象
        const { width } = values;
        if (width) {
            c[setIndex].width = width;
        } else if (c[setIndex].width) {
            delete c[setIndex].width;
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
        const { labelList } = this.props;
        const len = columns.length;
        const c = [...columns];
        const d = [...dataSource];
        for (let i = 0; i < addNumber; i++) {
            const name = `标题${len + i + 1}`;
            const column = {
                title: () => (
                    <>
                        <AutoComplete
                            dataSource={labelList.map(item => item.name)}
                            onChange={(value: string) => {
                                this.titleInputChange(value, len + i);
                            }} />
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
            };
            c.push(column);
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
    addNumberChange = (number: number) => {
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
    opt = (values: ITableOperation) => {
        const columns = [...this.state.columns];
        const index = columns.length;
        const opt: IColumn = {
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
            key: 'action',
            render: () => (
                <>
                    {values.opts.map((item, i) => (item.link ? (
                        <a href="/" target="_blank" className="mr10" key={i}>
                            {item.text}
                        </a>
                    ) : (
                        <span className="opt-link" key={i} onClick={() => this.linkPop(i)}>
                            {item.text}
                        </span>
                    )))}
                </>
            ),
            // renderText: `() => (<>${values.opts
            //     .map(item => (item.link
            //         ? `<a href="/" target="_blank" className="mr10">${item.text}</a>`
            //         : `<span className="opt-link" onClick={() => {}}>${item.text}</span>`))
            //     .join('')}</>)`,
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
    editOpt(index: number) {
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
        const { getTableObject } = this.props;
        const { variable, dataSource, columns } = this.state;
        getTableObject && getTableObject({
            columns,
            dataSource,
            variable,
        });
    }

    /**
     * 修改变量名
     */
    changeVariable = (e: React.ChangeEvent<HTMLInputElement>) => {
        let variable = e.target.value;
        if (!variable) {
            variable = DEFAULT_VARIABLE;
        }
        this.setState({
            variable,
        });
    }

    /**
     * 设置table滚动
     */
    scorllChange = (value: boolean) => {
        this.setState({
            tableScorll: value,
        });
    }

    /**
     * 链接弹窗
     */
    linkPop = (index: number) => {
        if (!this.props.popupForms) {
            return;
        }
        if (this.props.popupForms.length === 0) {
            message.error('暂无弹窗');
            return;
        }
        this.setState({
            visiblePop: true,
            popIndex: index,
            popKey: Math.random(),
        });
    }

    /**
     * 关闭弹窗列表
     */
    closePop = () => {
        this.setState({
            visiblePop: false,
        });
    }

    /**
     * 选择弹窗
     */
    popChange = (value: string) => {
        this.setState({
            popName: value,
        });
    }

    /**
     * 确认弹窗
     */
    selectPop = () => {
        const { popIndex, popName, columns } = this.state;
        const c = [...columns];
        c[c.length - 1].opts[popIndex].linkName = popName;
        this.setState({
            columns: c,
        });
        this.closePop();
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
            tableScorll,
            visiblePop,
            popKey,
        } = this.state;

        const { width: columnWidth } = setColumnObj;
        const { width: optWidth, fixed, opts } = setOptObj;

        const { isEditVariable, popupForms } = this.props;

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
                <div style={{ display: 'inline-block', marginLeft: '8px' }}>
                    滚动：
                    <Switch onChange={this.scorllChange} />
                </div>
                <Table columns={columns} dataSource={dataSource} rowKey="id" scroll={{ x: tableScorll }} />
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
                    width={columnWidth}
                    onOk={this.setColumn}
                    onCancel={this.closeSetColumn}
                    zIndex={1003}
                />
                <SetOpt
                    key={optKey}
                    visibleOpt={visibleOpt}
                    fixed={fixed}
                    opts={opts}
                    width={optWidth}
                    onOk={this.opt}
                    onCancel={this.closeOpt}
                    zIndex={1003}
                />
                {
                    popupForms
                    && (
                        <Modal
                            title="弹窗列表"
                            visible={visiblePop}
                            key={popKey}
                            onCancel={this.closePop}
                            onOk={this.selectPop}>
                            <Select style={{ width: '100%' }} onChange={this.popChange}>
                                {
                                    popupForms.map((item, index) => (
                                        <Select.Option value={item.name} key={index}>
                                            {item.title}
                                            -
                                            {item.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Modal>
                    )
                }
            </div>
        );
    }
}

CreateTable.defaultProps = {
    isEditVariable: true,
};

export default CreateTable;
