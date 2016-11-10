webpackJsonp([1],{

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(227);

	var _chatForm = __webpack_require__(257);

	var _chatForm2 = _interopRequireDefault(_chatForm);

	var _ChatBody = __webpack_require__(259);

	var _ChatBody2 = _interopRequireDefault(_ChatBody);

	var _Message = __webpack_require__(260);

	var _Message2 = _interopRequireDefault(_Message);

	var _ChatReducer = __webpack_require__(255);

	var _ChatReducer2 = _interopRequireDefault(_ChatReducer);

	var _ChatActions = __webpack_require__(258);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PrimaryChatroom = function (_React$Component) {
	  _inherits(PrimaryChatroom, _React$Component);

	  function PrimaryChatroom(props) {
	    _classCallCheck(this, PrimaryChatroom);

	    var _this = _possibleConstructorReturn(this, (PrimaryChatroom.__proto__ || Object.getPrototypeOf(PrimaryChatroom)).call(this, props));

	    _this.socket = io();
	    return _this;
	  }

	  _createClass(PrimaryChatroom, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var that = this;
	      this.socket.on('chat message', function (message) {
	        that.handleReceiveMessage(message);
	      });
	      this.socket.on('disconnect', function (message) {
	        that.handleReceiveMessage(message);
	      });
	    }
	  }, {
	    key: 'handleReceiveMessage',
	    value: function handleReceiveMessage(chat) {
	      this.props.dispatch((0, _ChatActions.addMessage)(chat));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var dataStore = this.props.dataStore;

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_chatForm2.default, { socket: this.socket }),
	        _react2.default.createElement(_ChatBody2.default, null),
	        _react2.default.createElement(_Message2.default, null)
	      );
	    }
	  }]);

	  return PrimaryChatroom;
	}(_react2.default.Component);

	PrimaryChatroom.propTypes = {
	  dispatch: _react.PropTypes.func.isRequired
	};

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	  return { state: state };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(PrimaryChatroom);

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(227);

	var _ChatActions = __webpack_require__(258);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ChatForm = function ChatForm(_ref) {
	  var socket = _ref.socket;

	  var input = void 0;

	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'form',
	      {
	        onSubmit: function onSubmit(e) {
	          e.preventDefault();
	          if (!input.value.trim()) {
	            return;
	          }
	          socket.emit('chat message', input.value);
	          input.value = '';
	        }
	      },
	      _react2.default.createElement('input', { ref: function ref(node) {
	          input = node;
	        }
	      }),
	      _react2.default.createElement(
	        'button',
	        { type: 'submit' },
	        'Send Message'
	      )
	    )
	  );
	};

	exports.default = ChatForm;

/***/ },

/***/ 258:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var nextMessageId = 0;

	var addMessage = exports.addMessage = function addMessage(text) {
	  return {
	    type: 'ADD_MESSAGE',
	    id: (nextMessageId++).toString(),
	    text: text
	  };
	};

/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Message = __webpack_require__(260);

	var _Message2 = _interopRequireDefault(_Message);

	var _reactRedux = __webpack_require__(227);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MessageList = function MessageList(_ref) {
	  var messages = _ref.messages;


	  return _react2.default.createElement(
	    'ul',
	    { id: 'messages' },
	    messages.map(function (message) {
	      return _react2.default.createElement(_Message2.default, {
	        key: message.id,
	        message: message.text
	      });
	    })
	  );
	};

	// MessageList.propTypes = {
	//   dataStore: PropTypes.arrayOf(PropTypes.shape({
	//     id: PropTypes.string.isRequired,
	//     text: PropTypes.string.isRequired,
	//   }).isRequired).isRequired,
	// };

	var mapStateToProps = function mapStateToProps(state, ownProps) {
	  return { messages: state };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(MessageList);

/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Message = function Message(_ref) {
	  var message = _ref.message;
	  return _react2.default.createElement(
	    'li',
	    null,
	    message
	  );
	};

	// Message.propTypes = {
	//   message.text: PropTypes.string.isRequired,
	// };

	exports.default = Message;

/***/ }

});