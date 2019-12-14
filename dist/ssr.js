

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = exports.swiper = exports.Swiper = undefined;

let _swiper = require('swiper/package/js/swiper.js');

let _swiper2 = _interopRequireDefault(_swiper);

let _objectAssign = require('object-assign');

let _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Swiper = window.Swiper || _swiper2.default;

let DEFAULT_EVENTS = ['beforeDestroy', 'slideChange', 'slideChangeTransitionStart', 'slideChangeTransitionEnd', 'slideNextTransitionStart', 'slideNextTransitionEnd', 'slidePrevTransitionStart', 'slidePrevTransitionEnd', 'transitionStart', 'transitionEnd', 'touchStart', 'touchMove', 'touchMoveOpposite', 'sliderMove', 'touchEnd', 'click', 'tap', 'doubleTap', 'imagesReady', 'progress', 'reachBeginning', 'reachEnd', 'fromEdge', 'setTranslate', 'setTransition', 'resize'];

let swiperDirective = function swiperDirective(globalOptions) {
  let getInstanceName = function getInstanceName(el, binding, vnode) {
    let instanceName = null;
    if (binding.arg) {
      instanceName = binding.arg;
    } else if (vnode.data.attrs && (vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'])) {
      instanceName = vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'];
    } else if (el.id) {
      instanceName = el.id;
    }
    return instanceName || 'swiper';
  };

  return {
    bind: function bind(el, binding, vnode) {
      let self = vnode.context;
      if (el.className.indexOf('swiper-container') === -1) {
        el.className += (el.className ? ' ' : '') + 'swiper-container';
      }
    },
    inserted: function inserted(el, binding, vnode) {
      let self = vnode.context;
      let options = binding.value;
      let instanceName = getInstanceName(el, binding, vnode);
      let swiper = self[instanceName];

      let eventEmit = function eventEmit(vnode, name, data) {
        let handlers = vnode.data && vnode.data.on || vnode.componentOptions && vnode.componentOptions.listeners;
        if (handlers && handlers[name]) handlers[name].fns(data);
      };

      if (!swiper) {
        let swiperOptions = (0, _objectAssign2.default)({}, globalOptions, options);
        swiper = self[instanceName] = new Swiper(el, swiperOptions);
        DEFAULT_EVENTS.forEach(function (eventName) {
          swiper.on(eventName, function () {
            eventEmit(...[vnode, eventName].concat(Array.prototype.slice.call(arguments)));
            eventEmit(...[vnode, eventName.replace(/([A-Z])/g, '-$1')].concat(Array.prototype.slice.call(arguments)));
          });
        });
      }

      eventEmit(vnode, 'ready', swiper);
    },
    componentUpdated: function componentUpdated(el, binding, vnode) {
      let instanceName = getInstanceName(el, binding, vnode);
      let swiper = vnode.context[instanceName];
      if (swiper) {
        swiper.update && swiper.update();
        swiper.navigation && swiper.navigation.update();
        swiper.pagination && swiper.pagination.render();
        swiper.pagination && swiper.pagination.update();
      }
    },
    unbind: function unbind(el, binding, vnode) {
      let instanceName = getInstanceName(el, binding, vnode);
      let swiper = vnode.context[instanceName];
      if (swiper) {
        swiper.destroy && swiper.destroy();
        delete vnode.context[instanceName];
      }
    }
  };
};

let swiper = swiperDirective({});

let install = function install(Vue) {
  let globalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  Vue.directive('swiper', swiperDirective(globalOptions));
};

let VueAwesomeSwiper = { Swiper: Swiper, swiper: swiper, install: install };

exports.Swiper = Swiper;
exports.swiper = swiper;
exports.install = install;
exports.default = VueAwesomeSwiper;
