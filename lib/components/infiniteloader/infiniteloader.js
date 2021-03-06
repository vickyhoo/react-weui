'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _loadmore = require('../loadmore');

var _loadmore2 = _interopRequireDefault(_loadmore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  A Container trigger loading once it reach certain scrolltop
 *
 */
var InfiniteLoader = function (_Component) {
    (0, _inherits3.default)(InfiniteLoader, _Component);

    function InfiniteLoader(props) {
        (0, _classCallCheck3.default)(this, InfiniteLoader);

        var _this = (0, _possibleConstructorReturn3.default)(this, (InfiniteLoader.__proto__ || (0, _getPrototypeOf2.default)(InfiniteLoader)).call(this, props));

        _this.state = {
            loading: false,
            finish: false
        };

        _this.scrollHandle = _this.scrollHandle.bind(_this);
        _this.resolveLoading = _this.resolveLoading.bind(_this);
        _this.finish = _this.finish.bind(_this);
        _this.reset = _this.reset.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(InfiniteLoader, [{
        key: 'finish',
        value: function finish() {
            this.setState({
                loading: false,
                finish: true
            });
        }
    }, {
        key: 'resolveLoading',
        value: function resolveLoading() {
            this.setState({
                loading: false,
                finish: false
            });
        }
    }, {
        key: 'scrollHandle',
        value: function scrollHandle(e) {
            if (this.state.loading || this.state.finish) return;

            var target = e.target;
            var scrollPercent = Math.floor((target.scrollTop + target.clientHeight) / target.scrollHeight * 100);

            if (scrollPercent > this.props.triggerPercent) {
                this.setState({
                    loading: true
                });

                this.props.onLoadMore(this.resolveLoading, this.finish);
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setState({
                loading: false,
                finish: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                height = _props.height,
                triggerPercent = _props.triggerPercent,
                loaderLoadingIcon = _props.loaderLoadingIcon,
                loaderDefaultIcon = _props.loaderDefaultIcon,
                onLoadMore = _props.onLoadMore,
                domProps = (0, _objectWithoutProperties3.default)(_props, ['children', 'className', 'height', 'triggerPercent', 'loaderLoadingIcon', 'loaderDefaultIcon', 'onLoadMore']);

            var clx = (0, _classnames2.default)('react-weui-infiniteloader', className);

            var containerStyle = {
                height: height
            };

            var loaderStyle = {
                display: this.state.loading || this.state.finish ? 'block' : 'none'
            };

            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({
                    className: clx,
                    style: containerStyle
                }, domProps),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'react-weui-infiniteloader__content',
                        onScroll: this.scrollHandle,
                        ref: 'container'
                    },
                    children,
                    _react2.default.createElement(
                        'div',
                        { style: loaderStyle },
                        this.state.finish ? loaderDefaultIcon : this.state.loading ? loaderLoadingIcon : false
                    )
                )
            );
        }
    }]);
    return InfiniteLoader;
}(_react.Component);

InfiniteLoader.propTypes = {
    /**
     * height for the container, use string like '10px', default for '100vh'
     *
     */
    height: _react.PropTypes.string,
    /**
     * element(icon) for default loader when there is no more content
     *
     */
    loaderDefaultIcon: _react.PropTypes.object,
    /**
     * element(icon) for loading loader
     *
     */
    loaderLoadingIcon: _react.PropTypes.object,
    /**
     * percentage of scrollTop to trigger loading
     *
     */
    triggerPercent: _react.PropTypes.number,
    /**
     * callback when it's requesting for more content, pass resolve function and finish function
     *
     */
    onLoadMore: _react.PropTypes.func
};
InfiniteLoader.defaultProps = {
    height: '100vh',
    triggerPercent: 75,
    loaderLoadingIcon: _react2.default.createElement(
        _loadmore2.default,
        { loading: true },
        ' Loading... '
    ),
    loaderDefaultIcon: _react2.default.createElement(
        _loadmore2.default,
        { showLine: true },
        ' No Data'
    )
};
exports.default = InfiniteLoader;
module.exports = exports['default'];