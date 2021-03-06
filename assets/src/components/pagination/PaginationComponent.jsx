import React from 'react';
import assign from 'object-assign';
import {Pagination} from 'antd';
import './style.less';

class PaginationComponent extends React.Component {
    static defaultProps = {
        showSizeChanger: true,
        showQuickJumper: true,
        showMessage: true,
        pageSize: 10,
        currentPage: 1,
        totalCount: 0,
        onChange() {
        },
    };

    static propTypes = {
        showSizeChanger: React.PropTypes.bool,
        showQuickJumper: React.PropTypes.bool,
        showMessage: React.PropTypes.bool,
        pageSize: React.PropTypes.number,
        currentPage: React.PropTypes.number,
        totalCount: React.PropTypes.number,
        onChange: React.PropTypes.func,
    }

    handleChange = (currentPage, pageSize) => {
        const {onChange} = this.props;
        if (onChange) {
            onChange(currentPage, pageSize);
        }
    };

    render() {
        const {
            showSizeChanger,
            showQuickJumper,
            showMessage,
            pageSize,
            currentPage,
            totalCount,
        } = this.props;

        const props = {};
        if (showSizeChanger) {
            props.showSizeChanger = true;
        }
        if (showQuickJumper) {
            props.showQuickJumper = true;
        }

        const totalPage = Math.ceil(totalCount / pageSize);
        let style = this.props.style;
        if (totalPage <= 1) {
            style = assign({}, {display: 'none'}, style);
        }
        return (
            <div className="pagination-component" style={style}>
                <div className="pagination-wrap">
                    <Pagination
                        {...props}
                        onShowSizeChange={this.handleChange}
                        onChange={this.handleChange}
                        defaultCurrent={1}
                        pageSize={pageSize}
                        current={currentPage}
                        total={totalCount}/>
                    {showMessage ?
                        <div className="total-count">
                            共{totalPage}页 {totalCount}条数据
                        </div>
                        : ''
                    }
                </div>
                <div style={{clear: 'both'}}/>
            </div>
        );
    }
}
export default PaginationComponent;
