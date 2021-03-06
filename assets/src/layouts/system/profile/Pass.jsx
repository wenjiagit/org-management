import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import './style.less';

const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}

export class Pass extends Component {
    static defaultProps = {
        loading: false,
    };

    static propTypes = {
        loading: React.PropTypes.bool,
    };

    handleReset = (e) => {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleSubmit = (e) => {
        const {loading, form, actions} = this.props;

        if (loading) {
            return;
        }

        e.preventDefault();
        form.validateFields((errors, values) => {
            if (errors) {
                return false;
            }
            actions.saveUserPass(values);
        });
    }

    checkPass = (rule, value, callback) => {
        const {validateFields} = this.props.form;

        if (value) {
            validateFields(['rePass'], {force: true});
        }
        callback();
    }

    checkRePass = (rule, value, callback) => {
        const {getFieldValue} = this.props.form;

        if (value && value !== getFieldValue('pass')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    render() {
        const {loading, form: {getFieldProps}} = this.props;
        const OrPasswdProps = getFieldProps('orPass', {
            rules: [
                {required: true, whitespace: true, message: '请填写原密码'},
            ],
        });
        const passwdProps = getFieldProps('pass', {
            rules: [
                {required: true, whitespace: true, message: '请填写密码'},
                {validator: this.checkPass},
            ],
        });
        const rePasswdProps = getFieldProps('rePass', {
            rules: [
                {
                    required: true,
                    whitespace: true,
                    message: '请再次输入密码',
                },
                {
                    validator: this.checkRePass,
                },
            ],
        });
        const formItemLayout = {
            labelCol: {span: 7},
            wrapperCol: {span: 12},
        };

        return (
            <div className="system-profile-pass">
                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label="原密码："
                    >
                        <Input
                            {...OrPasswdProps}
                            type="password"
                            autoComplete="off"
                            onContextMenu={noop}
                            onPaste={noop}
                            onCopy={noop}
                            onCut={noop}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="新密码："
                    >
                        <Input
                            {...passwdProps}
                            type="password"
                            autoComplete="off"
                            onContextMenu={noop}
                            onPaste={noop}
                            onCopy={noop}
                            onCut={noop}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码："
                    >
                        <Input
                            {...rePasswdProps}
                            type="password"
                            autoComplete="off"
                            onContextMenu={noop}
                            onPaste={noop}
                            onCopy={noop}
                            onCut={noop}
                        />
                    </FormItem>
                    <FormItem wrapperCol={{span: 12, offset: 7}}>
                        <Button type="ghost" style={{marginRight: 8}} onClick={this.handleReset}>重置</Button>
                        <Button type="primary" loading={loading} onClick={this.handleSubmit}>确定</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export const LayoutComponent = createForm()(Pass);
export function mapStateToProps(state) {
    return {
        ...state.app,
    };
}
