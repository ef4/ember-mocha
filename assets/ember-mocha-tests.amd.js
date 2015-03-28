define('chai', ['exports'], function (exports) {

	'use strict';

	/* globals chai */

	var expect = chai.expect;
	var assert = chai.assert;

	var use = chai.use;
	var Assertion = chai.Assertion;

	exports.expect = expect;
	exports.assert = assert;
	exports.use = use;
	exports.Assertion = Assertion;

});
define('chai.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('chai.js should pass jshint', function() { 
    ok(true, 'chai.js should pass jshint.'); 
  });

});
define('ember-mocha', ['exports', 'ember-mocha/describe-module', 'ember-mocha/describe-component', 'ember-mocha/describe-model', 'ember-mocha/it', 'ember-test-helpers'], function (exports, describeModule, describeComponent, describeModel, it, ember_test_helpers) {

  'use strict';

  Object.defineProperty(exports, 'describeModule', { enumerable: true, get: function () { return describeModule['default']; }});
  Object.defineProperty(exports, 'describeComponent', { enumerable: true, get: function () { return describeComponent['default']; }});
  Object.defineProperty(exports, 'describeModel', { enumerable: true, get: function () { return describeModel['default']; }});
  Object.defineProperty(exports, 'it', { enumerable: true, get: function () { return it['default']; }});
  Object.defineProperty(exports, 'setResolver', { enumerable: true, get: function () { return ember_test_helpers.setResolver; }});

});
define('ember-mocha.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('ember-mocha.js should pass jshint', function() { 
    ok(true, 'ember-mocha.js should pass jshint.'); 
  });

});
define('ember-mocha/describe-component', ['exports', 'ember-mocha/mocha-module', 'ember-test-helpers'], function (exports, mocha_module, ember_test_helpers) {

  'use strict';

  function describeComponent(name, description, callbacks, tests) {
    mocha_module.createModule(ember_test_helpers.TestModuleForComponent, name, description, callbacks, tests);
  }

  describeComponent.only = mocha_module.createOnly(ember_test_helpers.TestModuleForComponent);

  describeComponent.skip = mocha_module.createSkip(ember_test_helpers.TestModuleForComponent);

  exports['default'] = describeComponent;

});
define('ember-mocha/describe-component.jshint', function () {

  'use strict';

  module('JSHint - ember-mocha');
  test('ember-mocha/describe-component.js should pass jshint', function() { 
    ok(true, 'ember-mocha/describe-component.js should pass jshint.'); 
  });

});
define('ember-mocha/describe-model', ['exports', 'ember-mocha/mocha-module', 'ember-test-helpers'], function (exports, mocha_module, ember_test_helpers) {

  'use strict';

  function describeModel(name, description, callbacks, tests) {
    mocha_module.createModule(ember_test_helpers.TestModuleForModel, name, description, callbacks, tests);
  }

  describeModel.only = mocha_module.createOnly(ember_test_helpers.TestModuleForModel);

  describeModel.skip = mocha_module.createSkip(ember_test_helpers.TestModuleForModel);

  exports['default'] = describeModel;

});
define('ember-mocha/describe-model.jshint', function () {

  'use strict';

  module('JSHint - ember-mocha');
  test('ember-mocha/describe-model.js should pass jshint', function() { 
    ok(true, 'ember-mocha/describe-model.js should pass jshint.'); 
  });

});
define('ember-mocha/describe-module', ['exports', 'ember-mocha/mocha-module', 'ember-test-helpers'], function (exports, mocha_module, ember_test_helpers) {

  'use strict';

  function describeModule(name, description, callbacks, tests) {
    mocha_module.createModule(ember_test_helpers.TestModule, name, description, callbacks, tests);
  }

  describeModule.only = mocha_module.createOnly(ember_test_helpers.TestModule);

  describeModule.skip = mocha_module.createSkip(ember_test_helpers.TestModule);

  exports['default'] = describeModule;

});
define('ember-mocha/describe-module.jshint', function () {

  'use strict';

  module('JSHint - ember-mocha');
  test('ember-mocha/describe-module.js should pass jshint', function() { 
    ok(true, 'ember-mocha/describe-module.js should pass jshint.'); 
  });

});
define('ember-mocha/it', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  function resetViews() {
    Ember['default'].View.views = {};
  }

  var originalIt = window.it;

  function wrap(specifier) {
    return function (testName, callback) {
      var wrapper;

      if (!callback) {
        wrapper = null;
      } else if (callback.length === 1) {
        wrapper = function(done) {
          resetViews();
          return callback.call(this, done);
        };
      } else {
        wrapper = function() {
          resetViews();
          return callback.call(this);
        };
      }

      if (wrapper) {
        wrapper.toString = function() {
          return callback.toString();
        };
      }

      return specifier(testName, wrapper);
    };
  }

  var wrappedIt = wrap(window.it);
  wrappedIt.only = wrap(window.it.only);
  wrappedIt.skip = function(testName, callback) {
    originalIt(testName);
  };

  exports['default'] = wrappedIt;

});
define('ember-mocha/it.jshint', function () {

  'use strict';

  module('JSHint - ember-mocha');
  test('ember-mocha/it.js should pass jshint', function() { 
    ok(true, 'ember-mocha/it.js should pass jshint.'); 
  });

});
define('ember-mocha/mocha-module', ['exports', 'mocha', 'ember', 'ember-test-helpers'], function (exports, mocha, Ember, ember_test_helpers) {

  'use strict';

  exports.createModule = createModule;
  exports.createOnly = createOnly;
  exports.createSkip = createSkip;

  function createModule(Constructor, name, description, callbacks, tests, method) {
    var module;

    if (!tests) {
      if (!callbacks) {
        tests = description;
        callbacks = {};
      } else {
        tests = callbacks;
        callbacks = description;
      }
      module = new Constructor(name, callbacks);

    } else {
      module = new Constructor(name, description, callbacks);
    }


    function moduleBody() {
      mocha.beforeEach(function() {
        var self = this;
        return module.setup().then(function() {
          var context = ember_test_helpers.getContext();
          var keys = Ember['default'].keys(context);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            self[key] = context[key];
          }
        });
      });

      mocha.afterEach(function() {
        return module.teardown();
      });

      tests = tests || function() {};
      tests();
    }
    if (method) {
      mocha.describe[method](module.name, moduleBody);
    } else {
      mocha.describe(module.name, moduleBody);
    }
  }

  function createOnly(Constructor) {
    return function(name, description, callbacks, tests) {
      createModule(Constructor, name, description, callbacks, tests, "only");
    };
  }

  function createSkip(Constructor) {
    return function(name, description, callbacks, tests) {
      createModule(Constructor, name, description, callbacks, tests, "skip");
    };
  }

});
define('ember-mocha/mocha-module.jshint', function () {

  'use strict';

  module('JSHint - ember-mocha');
  test('ember-mocha/mocha-module.js should pass jshint', function() { 
    ok(true, 'ember-mocha/mocha-module.js should pass jshint.'); 
  });

});
define('ember-test-helpers', ['exports', 'ember', 'ember-test-helpers/isolated-container', 'ember-test-helpers/test-module', 'ember-test-helpers/test-module-for-component', 'ember-test-helpers/test-module-for-model', 'ember-test-helpers/test-module-for-integration', 'ember-test-helpers/test-context', 'ember-test-helpers/test-resolver'], function (exports, Ember, isolatedContainer, TestModule, TestModuleForComponent, TestModuleForModel, TestModuleForIntegration, test_context, test_resolver) {

  'use strict';

  Object.defineProperty(exports, 'isolatedContainer', { enumerable: true, get: function () { return isolatedContainer['default']; }});
  Object.defineProperty(exports, 'TestModule', { enumerable: true, get: function () { return TestModule['default']; }});
  Object.defineProperty(exports, 'TestModuleForComponent', { enumerable: true, get: function () { return TestModuleForComponent['default']; }});
  Object.defineProperty(exports, 'TestModuleForModel', { enumerable: true, get: function () { return TestModuleForModel['default']; }});
  Object.defineProperty(exports, 'TestModuleForIntegration', { enumerable: true, get: function () { return TestModuleForIntegration['default']; }});
  Object.defineProperty(exports, 'getContext', { enumerable: true, get: function () { return test_context.getContext; }});
  Object.defineProperty(exports, 'setContext', { enumerable: true, get: function () { return test_context.setContext; }});
  Object.defineProperty(exports, 'setResolver', { enumerable: true, get: function () { return test_resolver.setResolver; }});

  Ember['default'].testing = true;

});
define('ember-test-helpers/isolated-container', ['exports', 'ember-test-helpers/test-resolver', 'ember'], function (exports, test_resolver, Ember) {

  'use strict';

  function exposeRegistryMethodsWithoutDeprecations(container) {
    var methods = [
      'register',
      'unregister',
      'resolve',
      'normalize',
      'typeInjection',
      'injection',
      'factoryInjection',
      'factoryTypeInjection',
      'has',
      'options',
      'optionsForType'
    ];

    function exposeRegistryMethod(container, method) {
      container[method] = function() {
        return container._registry[method].apply(container._registry, arguments);
      };
    }

    for (var i = 0, l = methods.length; i < l; i++) {
      exposeRegistryMethod(container, methods[i]);
    }
  }

  function isolatedContainer(fullNames) {
    var resolver = test_resolver.getResolver();
    var container;

    var normalize = function(fullName) {
      return resolver.normalize(fullName);
    };

    if (Ember['default'].Registry) {
      var registry = new Ember['default'].Registry();
      registry.normalizeFullName = normalize;

      container = registry.container();
      exposeRegistryMethodsWithoutDeprecations(container);

    } else {
      container = new Ember['default'].Container();

      //normalizeFullName only exists since Ember 1.9
      if (Ember['default'].typeOf(container.normalizeFullName) === 'function') {
        container.normalizeFullName = normalize;
      } else {
        container.normalize = normalize;
      }
    }

    container.optionsForType('component', { singleton: false });
    container.optionsForType('view', { singleton: false });
    container.optionsForType('template', { instantiate: false });
    container.optionsForType('helper', { instantiate: false });
    container.register('component-lookup:main', Ember['default'].ComponentLookup);
    container.register('controller:basic', Ember['default'].Controller, { instantiate: false });
    container.register('controller:object', Ember['default'].ObjectController, { instantiate: false });
    container.register('controller:array', Ember['default'].ArrayController, { instantiate: false });
    container.register('view:default', Ember['default']._MetamorphView);
    container.register('view:toplevel', Ember['default'].View.extend());
    container.register('view:select', Ember['default'].Select);
    container.register('route:basic', Ember['default'].Route, { instantiate: false });

    for (var i = fullNames.length; i > 0; i--) {
      var fullName = fullNames[i - 1];
      var normalizedFullName = resolver.normalize(fullName);
      container.register(fullName, resolver.resolve(normalizedFullName));
    }
    return container;
  }
  exports['default'] = isolatedContainer;

});
define('ember-test-helpers/test-context', ['exports'], function (exports) {

  'use strict';

  exports.setContext = setContext;
  exports.getContext = getContext;

  var __test_context__;

  function setContext(context) {
    __test_context__ = context;
  }

  function getContext() {
    return __test_context__;
  }

});
define('ember-test-helpers/test-module-for-component', ['exports', 'ember-test-helpers/test-module', 'ember', 'ember-test-helpers/test-resolver'], function (exports, TestModule, Ember, test_resolver) {

  'use strict';

  exports['default'] = TestModule['default'].extend({
    init: function(componentName, description, callbacks) {
      this.componentName = componentName;

      this._super.call(this, 'component:' + componentName, description, callbacks);

      this.setupSteps.push(this.setupComponent);
    },

    setupComponent: function() {
      var _this = this;
      var resolver = test_resolver.getResolver();
      var container = this.container;
      var context = this.context;

      var layoutName = 'template:components/' + this.componentName;

      var layout = resolver.resolve(layoutName);

      if (layout) {
        container.register(layoutName, layout);
        container.injection(this.subjectName, 'layout', layoutName);
      }

      context.dispatcher = Ember['default'].EventDispatcher.create();
      context.dispatcher.setup({}, '#ember-testing');

      this.callbacks.render = function() {
        var containerView = Ember['default'].ContainerView.create({container: container});
        Ember['default'].run(function(){
          var subject = context.subject();
          containerView.pushObject(subject);
          containerView.appendTo('#ember-testing');
        });

        _this.teardownSteps.unshift(function() {
          Ember['default'].run(function() {
            Ember['default'].tryInvoke(containerView, 'destroy');
          });
        });
      };

      this.callbacks.append = function() {
        Ember['default'].deprecate('this.append() is deprecated. Please use this.render() or this.$() instead.');
        return context.$();
      };

      context.$ = function() {
        this.render();
        var subject = this.subject();

        return subject.$.apply(subject, arguments);
      };
    }
  });

});
define('ember-test-helpers/test-module-for-integration', ['exports', 'ember', 'ember-test-helpers/test-module', 'ember-test-helpers/test-resolver', 'ember-test-helpers/test-context'], function (exports, Ember, TestModule, test_resolver, test_context) {

  'use strict';

  exports['default'] = TestModule['default'].extend({

    isIntegration: true,

    init: function(name, description, callbacks) {
      this._super.call(this, name, description, callbacks);
      this.setupSteps.push(this.setupIntegrationHelpers);
      this.teardownSteps.push(this.teardownView);
    },

    setupIntegrationHelpers: function() {
      var self = this;
      var context = this.context;
      context.dispatcher = Ember['default'].EventDispatcher.create();
      context.dispatcher.setup({}, '#ember-testing');
      this.actionHooks = {};

      context.render = function(template) {
        if (Ember['default'].isArray(template)) {
          template = template.join('');
        }
        if (typeof template === 'string') {
          template = Ember['default'].Handlebars.compile(template);
        }
        self.view = Ember['default'].View.create({
          context: context,
          controller: self,
          template: template,
          container: self.container
        });
        Ember['default'].run(function() {
          self.view.appendTo('#ember-testing');
        });
      };

      context.$ = function() {
        return self.view.$.apply(self.view, arguments);
      };

      context.set = function(key, value) {
        Ember['default'].run(function() {
          Ember['default'].set(context, key, value);
        });
      };

      context.get = function(key) {
        return Ember['default'].get(context, key);
      };

      context.on = function(actionName, handler) {
        self.actionHooks[actionName] = handler;
      };

    },

    setupContext: function() {

      test_context.setContext({
        container:  this.container,
        factory: function() {},
        dispatcher: null
      });

      this.context = test_context.getContext();
    },

    send: function(actionName) {
      var hook = this.actionHooks[actionName];
      if (!hook) {
        throw new Error("integration testing template received unexpected action " + actionName);
      }
      hook.apply(this, Array.prototype.slice.call(arguments, 1));
    },

    teardownView: function() {
      var view = this.view;
      if (view) {
        Ember['default'].run(function() {
          view.destroy();
        });
      }
    }

  });

});
define('ember-test-helpers/test-module-for-model', ['exports', 'ember-test-helpers/test-module', 'ember'], function (exports, TestModule, Ember) {

  'use strict';

  exports['default'] = TestModule['default'].extend({
    init: function(modelName, description, callbacks) {
      this.modelName = modelName;

      this._super.call(this, 'model:' + modelName, description, callbacks);

      this.setupSteps.push(this.setupModel);
    },

    setupModel: function() {
      var container = this.container;
      var defaultSubject = this.defaultSubject;
      var callbacks = this.callbacks;
      var modelName = this.modelName;

      if (DS._setupContainer) {
        DS._setupContainer(container);
      } else {
        container.register('store:main', DS.Store);
      }

      var adapterFactory = container.lookupFactory('adapter:application');
      if (!adapterFactory) {
        container.register('adapter:application', DS.FixtureAdapter);
      }

      callbacks.store = function(){
        var container = this.container;

        return container.lookup('store:main');
      };

      if (callbacks.subject === defaultSubject) {
        callbacks.subject = function(options) {
          var container = this.container;

          return Ember['default'].run(function() {
            return container.lookup('store:main').createRecord(modelName, options);
          });
        };
      }
    }
  });

});
define('ember-test-helpers/test-module', ['exports', 'ember', 'ember-test-helpers/isolated-container', 'ember-test-helpers/test-context', 'klassy', 'ember-test-helpers/test-resolver'], function (exports, Ember, isolatedContainer, test_context, klassy, test_resolver) {

  'use strict';

  exports['default'] = klassy.Klass.extend({
    init: function(subjectName, description, callbacks) {
      // Allow `description` to be omitted, in which case it should
      // default to `subjectName`
      if (!callbacks && typeof description === 'object') {
        callbacks = description;
        description = subjectName;
      }

      this.subjectName = subjectName;
      this.description = description || subjectName;
      this.name = description || subjectName;
      this.callbacks = callbacks || {};

      if (this.callbacks.integration) {
        this.isIntegration = callbacks.integration;      
        delete callbacks.integration;
      }

      this.initSubject();
      this.initNeeds();
      this.initSetupSteps();
      this.initTeardownSteps();
    },

    initSubject: function() {
      this.callbacks.subject = this.callbacks.subject || this.defaultSubject;
    },

    initNeeds: function() {
      this.needs = [this.subjectName];
      if (this.callbacks.needs) {
        this.needs = this.needs.concat(this.callbacks.needs)
        delete this.callbacks.needs;
      }
    },

    initSetupSteps: function() {
      this.setupSteps = [];
      this.contextualizedSetupSteps = [];

      if (this.callbacks.beforeSetup) {
        this.setupSteps.push( this.callbacks.beforeSetup );
        delete this.callbacks.beforeSetup;
      }

      this.setupSteps.push(this.setupContainer);
      this.setupSteps.push(this.setupContext);
      this.setupSteps.push(this.setupTestElements);

      if (this.callbacks.setup) {
        this.contextualizedSetupSteps.push( this.callbacks.setup );
        delete this.callbacks.setup;
      }
    },

    initTeardownSteps: function() {
      this.teardownSteps = [];
      this.contextualizedTeardownSteps = [];

      if (this.callbacks.teardown) {
        this.contextualizedTeardownSteps.push( this.callbacks.teardown );
        delete this.callbacks.teardown;
      }

      this.teardownSteps.push(this.teardownSubject);
      this.teardownSteps.push(this.teardownContainer);
      this.teardownSteps.push(this.teardownContext);
      this.teardownSteps.push(this.teardownTestElements);

      if (this.callbacks.afterTeardown) {
        this.teardownSteps.push( this.callbacks.afterTeardown );
        delete this.callbacks.afterTeardown;
      }
    },

    setup: function() {
      var self = this;
      return self.invokeSteps(self.setupSteps).then(function() {
        self.contextualizeCallbacks();
        return self.invokeSteps(self.contextualizedSetupSteps, self.context);
      });
    },

    teardown: function() {
      var self = this;
      return self.invokeSteps(self.contextualizedTeardownSteps, self.context).then(function() {
        return self.invokeSteps(self.teardownSteps);
      }).then(function() {
        self.cache = null;
        self.cachedCalls = null;
      });
    },

    invokeSteps: function(steps, _context) {
      var context = _context;
      if (!context) {
        context = this;
      }
      steps = steps.slice();
      function nextStep() {
        var step = steps.shift();
        if (step) {
          return Ember['default'].RSVP.resolve(step.call(context)).then(nextStep);
        } else {
          return Ember['default'].RSVP.resolve();
        }
      }
      return nextStep();
    },

    setupContainer: function() {
      if (this.isIntegration) {
        this._setupIntegratedContainer();
      } else {
        this._setupIsolatedContainer();
      }
    },

    setupContext: function() {
      var subjectName = this.subjectName;
      var container = this.container;

      var factory = function() {
        return container.lookupFactory(subjectName);
      };

      test_context.setContext({
        container:  this.container,
        factory:    factory,
        dispatcher: null
      });

      this.context = test_context.getContext();
    },

    setupTestElements: function() {
      if (Ember['default'].$('#ember-testing').length === 0) {
        Ember['default'].$('<div id="ember-testing"/>').appendTo(document.body);
      }
    },

    teardownSubject: function() {
      var subject = this.cache.subject;

      if (subject) {
        Ember['default'].run(function() {
          Ember['default'].tryInvoke(subject, 'destroy');
        });
      }
    },

    teardownContainer: function() {
      var container = this.container;
      Ember['default'].run(function() {
        container.destroy();
      });
    },

    teardownContext: function() {
      var context = this.context;
      if (context.dispatcher) {
        Ember['default'].run(function() {
          context.dispatcher.destroy();
        });
      }
    },

    teardownTestElements: function() {
      Ember['default'].$('#ember-testing').empty();
      Ember['default'].View.views = {};
    },

    defaultSubject: function(options, factory) {
      return factory.create(options);
    },

    // allow arbitrary named factories, like rspec let
    contextualizeCallbacks: function() {
      var _this     = this;
      var callbacks = this.callbacks;
      var context   = this.context;
      var factory   = context.factory;

      this.cache = this.cache || {};
      this.cachedCalls = this.cachedCalls || {};

      var keys = Ember['default'].keys(callbacks);

      for (var i = 0, l = keys.length; i < l; i++) {
        (function(key) {

          context[key] = function(options) {
            if (_this.cachedCalls[key]) { return _this.cache[key]; }

            var result = callbacks[key].call(_this, options, factory());

            _this.cache[key] = result;
            _this.cachedCalls[key] = true;

            return result;
          };

        })(keys[i]);
      }
    },


    _setupIsolatedContainer: function() {
      this.container = isolatedContainer['default'](this.needs);
    },

    _setupIntegratedContainer: function() {
      var resolver = test_resolver.getResolver();
      var namespace = Ember['default'].Object.create({
        Resolver: { create: function() { return resolver; } }
      });

      if (Ember['default'].Application.buildRegistry) {
        var registry;
        registry = Ember['default'].Application.buildRegistry(namespace);
        registry.register('component-lookup:main', Ember['default'].ComponentLookup);
        this.registry = registry;
        this.container = registry.container();
      } else {
        this.container = Ember['default'].Application.buildContainer(namespace);
        this.container.register('component-lookup:main', Ember['default'].ComponentLookup);
      }
    }

  });

});
define('ember-test-helpers/test-resolver', ['exports'], function (exports) {

  'use strict';

  exports.setResolver = setResolver;
  exports.getResolver = getResolver;

  var __resolver__;

  function setResolver(resolver) {
    __resolver__ = resolver;
  }

  function getResolver() {
    if (__resolver__ == null) throw new Error('you must set a resolver with `testResolver.set(resolver)`');
    return __resolver__;
  }

});
define('klassy', ['exports'], function (exports) {

  'use strict';

  /**
   Extend a class with the properties and methods of one or more other classes.

   When a method is replaced with another method, it will be wrapped in a
   function that makes the replaced method accessible via `this._super`.

   @method extendClass
   @param {Object} destination The class to merge into
   @param {Object} source One or more source classes
   */
  var extendClass = function(destination) {
    var sources = Array.prototype.slice.call(arguments, 1);
    var source;

    for (var i = 0, l = sources.length; i < l; i++) {
      source = sources[i];

      for (var p in source) {
        if (source.hasOwnProperty(p) &&
          destination[p] &&
          typeof destination[p] === 'function' &&
          typeof source[p] === 'function') {

          /* jshint loopfunc:true */
          destination[p] =
            (function(destinationFn, sourceFn) {
              var wrapper = function() {
                var prevSuper = this._super;
                this._super = destinationFn;

                var ret = sourceFn.apply(this, arguments);

                this._super = prevSuper;

                return ret;
              };
              wrapper.wrappedFunction = sourceFn;
              return wrapper;
            })(destination[p], source[p]);

        } else {
          destination[p] = source[p];
        }
      }
    }
  };

  // `subclassing` is a state flag used by `defineClass` to track when a class is
  // being subclassed. It allows constructors to avoid calling `init`, which can
  // be expensive and cause undesirable side effects.
  var subclassing = false;

  /**
   Define a new class with the properties and methods of one or more other classes.

   The new class can be based on a `SuperClass`, which will be inserted into its
   prototype chain.

   Furthermore, one or more mixins (object that contain properties and/or methods)
   may be specified, which will be applied in order. When a method is replaced
   with another method, it will be wrapped in a function that makes the previous
   method accessible via `this._super`.

   @method defineClass
   @param {Object} SuperClass A base class to extend. If `mixins` are to be included
   without a `SuperClass`, pass `null` for SuperClass.
   @param {Object} mixins One or more objects that contain properties and methods
   to apply to the new class.
   */
  var defineClass = function(SuperClass) {
    var Klass = function() {
      if (!subclassing && this.init) {
        this.init.apply(this, arguments);
      }
    };

    if (SuperClass) {
      subclassing = true;
      Klass.prototype = new SuperClass();
      subclassing = false;
    }

    if (arguments.length > 1) {
      var extendArgs = Array.prototype.slice.call(arguments, 1);
      extendArgs.unshift(Klass.prototype);
      extendClass.apply(Klass.prototype, extendArgs);
    }

    Klass.constructor = Klass;

    Klass.extend = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift(Klass);
      return defineClass.apply(Klass, args);
    };

    return Klass;
  };

  /**
   A base class that can be extended.

   @example

   ```javascript
   var CelestialObject = Klass.extend({
     init: function(name) {
       this._super();
       this.name = name;
       this.isCelestialObject = true;
     },
     greeting: function() {
       return 'Hello from ' + this.name;
     }
   });

   var Planet = CelestialObject.extend({
     init: function(name) {
       this._super.apply(this, arguments);
       this.isPlanet = true;
     },
     greeting: function() {
       return this._super() + '!';
     },
   });

   var earth = new Planet('Earth');

   console.log(earth instanceof Klass);           // true
   console.log(earth instanceof CelestialObject); // true
   console.log(earth instanceof Planet);          // true

   console.log(earth.isCelestialObject);          // true
   console.log(earth.isPlanet);                   // true

   console.log(earth.greeting());                 // 'Hello from Earth!'
   ```

   @class Klass
   */
  var Klass = defineClass(null, {
    init: function() {}
  });

  exports.Klass = Klass;
  exports.defineClass = defineClass;
  exports.extendClass = extendClass;

});
define('mocha', ['exports'], function (exports) {

  'use strict';

  /* globals mocha, describe, it */

  exports.mocha = mocha;
  exports.describe = describe;
  exports.it = it;
  exports.before = before;
  exports.beforeEach = beforeEach;
  exports.after = after;
  exports.afterEach = afterEach;

});
define('mocha.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('mocha.js should pass jshint', function() { 
    ok(false, 'mocha.js should pass jshint.\nmocha.js: line 4, col 3, \'mocha\' is not defined.\nmocha.js: line 5, col 3, \'describe\' is not defined.\nmocha.js: line 6, col 3, \'it\' is not defined.\nmocha.js: line 7, col 3, \'before\' is not defined.\nmocha.js: line 8, col 3, \'beforeEach\' is not defined.\nmocha.js: line 9, col 3, \'after\' is not defined.\nmocha.js: line 10, col 3, \'afterEach\' is not defined.\n\n7 errors'); 
  });

});
define('tests/describe-component-test', ['ember', 'ember-mocha', 'tests/test-support/resolver', 'tests/test-support/mocha-support', 'mocha', 'chai'], function (Ember, ember_mocha, resolver, mocha_support, mocha, chai) {

  'use strict';

  var PrettyColor = Ember['default'].Component.extend({
    classNames: ['pretty-color'],
    attributeBindings: ['style'],
    style: function(){
      return 'color: ' + this.get('name') + ';';
    }.property('name')
  });

  function setupRegistry() {
    resolver.setResolverRegistry({
      'component:x-foo': Ember['default'].Component.extend(),
      'component:pretty-color': PrettyColor,
      'template:components/pretty-color': Ember['default'].Handlebars.compile('Pretty Color: <span class="color-name">{{name}}</span>')
    });
  }

  ///////////////////////////////////////////////////////////////////////////////

  mocha.describe('describeComponent', function() {

    ember_mocha.describeComponent('x-foo', {

      beforeSetup: function() {
        setupRegistry();
      }

    }, function() {

      ember_mocha.it('renders', function() {
        var component = this.subject();
        chai.expect(component._state).to.equal('preRender');
        this.render();
        chai.expect(component._state).to.equal('inDOM');
      });

      ember_mocha.it('appends', function() {
        var component = this.subject();
        chai.expect(component._state).to.equal('preRender');
        this.append();
        chai.expect(component._state).to.equal('inDOM');
      });

      ember_mocha.it('yields', function() {
        var component = this.subject({
          layout: Ember['default'].Handlebars.compile("yield me")
        });
        chai.expect(component._state).to.equal('preRender');
        this.render();
        chai.expect(component._state).to.equal('inDOM');
      });

      ember_mocha.it('can lookup components in its layout', function() {
        var component = this.subject({
          layout: Ember['default'].Handlebars.compile("{{x-foo id='yodawg-i-heard-you-liked-x-foo-in-ur-x-foo'}}")
        });
        this.render();
        chai.expect(component._state).to.equal('inDOM');
      });

      ember_mocha.it('clears out views from test to test', function() {
        this.subject({
          layout: Ember['default'].Handlebars.compile("{{x-foo id='yodawg-i-heard-you-liked-x-foo-in-ur-x-foo'}}")
        });
        this.render();
        chai.expect(true).to.equal(true); // rendered without id already being used from another test
      });
    });


    ///////////////////////////////////////////////////////////////////////////////

    ember_mocha.describeComponent('pretty-color', {

      beforeSetup: function() {
        setupRegistry();
      }

    }, function() {

      ember_mocha.it("has the correct className", function() {
        // first call to this.$() renders the component.
        chai.expect(this.$().is('.pretty-color')).to.be.true;
      });

      ember_mocha.it("uses the correct custom template", function() {
        var component = this.subject();

        chai.expect($.trim(this.$().text())).to.equal('Pretty Color:');

        Ember['default'].run(function() {
          component.set('name', 'green');
        });

        chai.expect($.trim(this.$().text())).to.equal('Pretty Color: green');
      });

      ember_mocha.it("$", function() {
        var component = this.subject({name: 'green'});
        chai.expect($.trim(this.$('.color-name').text())).to.equal('green');
        chai.expect($.trim(this.$().text())).to.equal('Pretty Color: green');
      });
    });

    ember_mocha.describeComponent.skip('skipped component', function() {
      ember_mocha.it("is skipped", function() {});
    });
    var grep = mocha_support.grepFor(function() {
      ember_mocha.describeComponent.only('only component', function() {
        ember_mocha.it("is the only spec");
      });
    });

    mocha.describe("skipping and grepping", function() {
      ember_mocha.it("skips the skipped context", function() {
        var skipped = window.mocha.suite.suites.find(function(suite) {
          return suite.title === "skipped component" && suite.pending;
        });
      });
      ember_mocha.it("greps for describeComponent.only", function() {
        chai.expect('describeComponent component:only component').to.match(grep);
      });
    });
  });

});
define('tests/describe-component-test.jshint', function () {

  'use strict';

  module('JSHint - tests');
  test('tests/describe-component-test.js should pass jshint', function() { 
    ok(true, 'tests/describe-component-test.js should pass jshint.'); 
  });

});
define('tests/describe-model-test', ['ember', 'ember-mocha', 'tests/test-support/resolver', 'tests/test-support/mocha-support', 'mocha', 'chai'], function (Ember, ember_mocha, resolver, mocha_support, mocha, chai) {

  'use strict';

  var Whazzit = DS.Model.extend({ gear: DS.attr('string') });
  var whazzitAdapterFindAllCalled = false;
  var WhazzitAdapter = DS.FixtureAdapter.extend({
    findAll: function(store, type) {
      whazzitAdapterFindAllCalled = true;
      return this._super.apply(this, arguments);
    }
  });

  var ApplicationAdapter = DS.FixtureAdapter.extend();

  function setupRegistry() {
    resolver.setResolverRegistry({
      'model:whazzit': Whazzit,
      'adapter:whazzit': WhazzitAdapter,
      'adapter:application': ApplicationAdapter
    });
  }

  ///////////////////////////////////////////////////////////////////////////////

  mocha.describe('describeModel', function() {

    ember_mocha.describeModel('whazzit', 'model:whazzit without adapter', {

      beforeSetup: function() {
        setupRegistry();
      },

      setup: function() {
        Whazzit.FIXTURES = [];
      }

    }, function() {

      ember_mocha.it('store exists', function() {
        var store = this.store();
        chai.expect(store).to.be.an.instanceof(DS.Store);
      });

      ember_mocha.it('model exists as subject', function() {
        var model = this.subject();
        chai.expect(model).to.exist;
        chai.expect(model).to.be.an.instanceof(DS.Model);
        chai.expect(model).to.be.an.instanceof(Whazzit);
      });

      ember_mocha.it('model is using the FixtureAdapter', function() {
        var model = this.subject(),
            store = this.store();

        chai.expect(store.adapterFor(model.constructor)).to.be.an.instanceof(DS.FixtureAdapter);
        chai.expect(store.adapterFor(model.constructor)).to.not.be.an.instanceof(WhazzitAdapter);
      });
    });

    ///////////////////////////////////////////////////////////////////////////////

    ember_mocha.describeModel('whazzit', 'model:whazzit with custom adapter', {

      needs: ['adapter:whazzit'],

      beforeSetup: function() {
        setupRegistry();
      },

      setup: function() {
        Whazzit.FIXTURES = [];
        whazzitAdapterFindAllCalled = false;
      }

    }, function() {

      ember_mocha.it('uses the WhazzitAdapter', function() {
        var model = this.subject(),
            store = this.store();

        chai.expect(store.adapterFor(model.constructor)).to.be.an.instanceof(WhazzitAdapter);
      });

      ember_mocha.it('uses the WhazzitAdapter for a `find` request', function(done) {
        var model = this.subject(),
            store = this.store();

        chai.expect(whazzitAdapterFindAllCalled).to.be.false;

        store = this.store();

        return Ember['default'].run(function() {
          return store.find('whazzit').then(function() {
            chai.expect(whazzitAdapterFindAllCalled).to.be.true;
            done();
          });
        });
      });

    });

    ///////////////////////////////////////////////////////////////////////////////

    ember_mocha.describeModel('whazzit', 'model:whazzit with application adapter', {

      needs: ['adapter:application'],

      beforeSetup: function() {
        setupRegistry();
      },

      setup: function() {
        Whazzit.FIXTURES = [];
      }

    }, function() {

      ember_mocha.it('uses the ApplicationAdapter', function() {
        var model = this.subject(),
            store = this.store();

        chai.expect(store.adapterFor(model.constructor)).to.be.an.instanceof(ApplicationAdapter);
        chai.expect(store.adapterFor(model.constructor)).to.not.be.an.instanceof(WhazzitAdapter);
      });

    });


    ember_mocha.describeModel.skip("skipped model", function() {
      ember_mocha.it("is skipped", function() {});
    });

    var grep = mocha_support.grepFor(function() {
      ember_mocha.describeModel.only("whazzit", "only model", function() {
        ember_mocha.it("is the only model", function() {});
      });
    });

    mocha.describe("skipping and grepping", function() {
      ember_mocha.it("skips the skipped context", function() {
        var skipped = window.mocha.suite.suites.find(function(suite) {
          return suite.title === "skipped model" && suite.pending;
        });
      });
      ember_mocha.it("greps for describeModel.only", function() {
        chai.expect('describeModel only model').to.match(grep);
      });
    });
  });

});
define('tests/describe-model-test.jshint', function () {

  'use strict';

  module('JSHint - tests');
  test('tests/describe-model-test.js should pass jshint', function() { 
    ok(true, 'tests/describe-model-test.js should pass jshint.'); 
  });

});
define('tests/describe-module-test', ['ember-mocha', 'tests/test-support/resolver', 'tests/test-support/mocha-support', 'mocha', 'chai'], function (ember_mocha, resolver, mocha_support, mocha, chai) {

  'use strict';

  function setupRegistry() {
    resolver.setResolverRegistry({
      'component:x-foo': Ember.Component.extend()
    });
  }

  var callbackOrder, setupContext, teardownContext, beforeSetupContext, afterTeardownContext;

  mocha.describe("describeModule", function() {

    ember_mocha.describeModule('component:x-foo', 'TestModule callbacks', {
      beforeSetup: function() {
        beforeSetupContext = this;
        callbackOrder = [ 'beforeSetup' ];

        setupRegistry();
      },

      setup: function() {
        setupContext = this;
        callbackOrder.push('setup');

        chai.expect(setupContext).to.not.equal(beforeSetupContext);
      },

      teardown: function() {
        teardownContext = this;
        callbackOrder.push('teardown');

        chai.expect(callbackOrder).to.deep.equal([ 'beforeSetup', 'setup', 'teardown']);
        chai.expect(setupContext).to.equal(teardownContext);
      },

      afterTeardown: function() {
        afterTeardownContext = this;
        callbackOrder.push('afterTeardown');

        chai.expect(callbackOrder).to.deep.equal([ 'beforeSetup', 'setup', 'teardown', 'afterTeardown']);
        chai.expect(afterTeardownContext).to.equal(beforeSetupContext);
        chai.expect(afterTeardownContext).to.not.equal(teardownContext);
      }

    }, function() {
      ember_mocha.it("should call setup callbacks in the correct order", function() {
        chai.expect(callbackOrder).to.deep.equal([ 'beforeSetup', 'setup' ]);
      });
    });

    ember_mocha.describeModule.skip("skipped module", function() {
      ember_mocha.it("is skipped", function() {});
    });

    var grep = mocha_support.grepFor(function() {
      ember_mocha.describeModule.only("component:x-foo", "only module", function() {
        ember_mocha.it("is the only module", function() {});
      });
    });

    mocha.describe("skipping and grepping", function() {
      ember_mocha.it("skips the skipped context", function() {
        var skipped = window.mocha.suite.suites.find(function(suite) {
          return suite.title === "skipped module" && suite.pending;
        });
      });
      ember_mocha.it("greps for describeModule.only", function() {
        chai.expect('describeModule only module').to.match(grep);
      });
    });
  });

});
define('tests/describe-module-test.jshint', function () {

  'use strict';

  module('JSHint - tests');
  test('tests/describe-module-test.js should pass jshint', function() { 
    ok(true, 'tests/describe-module-test.js should pass jshint.'); 
  });

});
define('tests/it-test', ['ember', 'ember-mocha', 'tests/test-support/mocha-support', 'mocha', 'chai'], function (Ember, ember_mocha, mocha_support, mocha, chai) {

  'use strict';

  function tryMochaSpecifier(fn) {
    try {
      fn();
      return null;
    } catch (e) {
      return e;
    }
  }

  var Mocha = window.mocha;

  ///////////////////////////////////////////////////////////////////////////////

  mocha.describe('it', function() {
    ember_mocha.it('works with synchronous tests', function() {
      chai.expect(true).to.equal(true);
    });

    ember_mocha.it('works with asynchronous tests using callbacks', function(done) {
      setTimeout(function() {
        chai.expect(true).to.equal(true);
        done();
      }, 10);
    });

    ember_mocha.it('works with asynchronous tests using promises', function() {
      return new Ember['default'].RSVP.Promise(function(resolve) {
        setTimeout(function() {
          chai.expect(true).to.equal(true);
          resolve();
        }, 10);
      });
    });

    var pendingError = tryMochaSpecifier(function() {
      ember_mocha.it('is a pending spec');
    });

    ember_mocha.it('does not throw errors when you mark a pending spec', function() {
      chai.expect(pendingError).to.be.null;
      var pendingSpec = window.mocha.suite.suites.find(function(suite) {
        return suite.tests.find(function(test) {
          return test.title === 'is a pending spec';
        });
      });
      chai.expect(pendingSpec).to.be.ok;
    });


    ember_mocha.it('correctly sets mocha grep options for runing a single test case with.only', function() {
      chai.expect(mochaGrep).to.match(/it runs this test/);
    });

    var mochaGrep = mocha_support.grepFor(function() {
      ember_mocha.it.only('runs this test');
    });

    var skippedError = tryMochaSpecifier(function() {
      ember_mocha.it.skip('is a skipped spec');
    });

    ember_mocha.it('skips tests with the .skip modifier', function() {
      chai.expect(skippedError).to.be.null;
      var pendingSpec = Mocha.suite.suites.find(function(suite) {
        return suite.tests.find(function(test) {
          return test.title === 'is a skipped spec';
        });
      });
      chai.expect(pendingSpec).to.exist;
    });

    var callback = function() {
      chai.expect(callback.toString()).to.equal(wrapper.fn.toString());
    };

    var wrapper = ember_mocha.it('testing test report string representation', callback);

  });

});
define('tests/it-test.jshint', function () {

  'use strict';

  module('JSHint - tests');
  test('tests/it-test.js should pass jshint', function() { 
    ok(true, 'tests/it-test.js should pass jshint.'); 
  });

});
define('tests/mocha-module-test', ['ember-mocha/mocha-module', 'ember-test-helpers', 'mocha', 'chai'], function (mocha_module, ember_test_helpers, mocha, chai) {

  'use strict';

  mocha.describe('MochaModule', function() {
    mocha_module.createModule(ember_test_helpers.TestModule, 'component:x-foo', 'context', function() {
      var thisInBefore, thisInBeforeEach;

      mocha.before(function() {
        thisInBefore = this;
      });
      mocha.beforeEach(function() {
        thisInBeforeEach = this;
      });
      mocha.it("is preserved inside all assertions and hooks", function() {
        chai.expect(this).to.be.defined;
        chai.expect(this).to.equal(thisInBefore);
        chai.expect(this).to.equal(thisInBeforeEach);
      });
      mocha.afterEach(function() {
        chai.expect(this).to.equal(thisInBeforeEach);
      });
      mocha.after(function() {
        chai.expect(this).to.equal(thisInBefore);
        chai.expect(this).to.equal(thisInBeforeEach);
      });
    });
  });

});
define('tests/mocha-module-test.jshint', function () {

  'use strict';

  module('JSHint - tests');
  test('tests/mocha-module-test.js should pass jshint', function() { 
    ok(true, 'tests/mocha-module-test.js should pass jshint.'); 
  });

});
define('tests/shims-test', ['mocha', 'chai'], function (mocha, chai) {

  'use strict';

  mocha.describe('mocha-shim', function() {
    mocha.it('should work', function() {
      window.chai.expect(mocha.mocha).to.equal(window.mocha);
      window.chai.expect(mocha.describe).to.equal(window.describe);
      window.chai.expect(mocha.it).to.equal(window.it);
      window.chai.expect(mocha.before).to.equal(window.before);
      window.chai.expect(mocha.after).to.equal(window.after);
      window.chai.expect(mocha.beforeEach).to.equal(window.beforeEach);
      window.chai.expect(mocha.afterEach).to.equal(window.afterEach);
    });
  });

  mocha.describe('chai-shim', function() {
    mocha.it('should work', function() {
      window.chai.expect(chai.expect).to.equal(window.chai.expect);
      window.chai.expect(chai.assert).to.equal(window.chai.assert);
    });
  });

});
define('tests/shims-test.jshint', function () {

  'use strict';

  module('JSHint - tests');
  test('tests/shims-test.js should pass jshint', function() { 
    ok(true, 'tests/shims-test.js should pass jshint.'); 
  });

});
define('tests/test-support/mocha-support', ['exports'], function (exports) {

  'use strict';

  exports.grepFor = grepFor;

  /**
   * Captures mocha grep options for a. That way you can run describe
   * block or an `it` block that may narrow the mocha test run, but
   * those options will be reset afterwards. E.g.
   *
   *   var grep = grepFor(function() {
   *     it.skip('this is skipped');
   *   })
   *   console.log(grep) //=> /this is skipped/
  */
  function grepFor(fn) {
    var options = window.mocha.options;
    var originalMochaGrep = options.grep;
    try {
      fn();
      return options.grep;
    } finally {
      options.grep = originalMochaGrep;
    }
  }

});
define('tests/test-support/mocha-support.jshint', function () {

  'use strict';

  module('JSHint - tests/test-support');
  test('tests/test-support/mocha-support.js should pass jshint', function() { 
    ok(true, 'tests/test-support/mocha-support.js should pass jshint.'); 
  });

});
define('tests/test-support/resolver', ['exports', 'ember-test-helpers'], function (exports, ember_test_helpers) {

  'use strict';

  exports.setResolverRegistry = setResolverRegistry;

  var Resolver = Ember.DefaultResolver.extend({
    registry: null,

    resolve: function(fullName) {
      return this.registry[fullName] || this._super.apply(this, arguments);
    },

    normalize: function(fullName) {
      return Ember.String.dasherize(fullName);
    }
  });

  var resolver = Resolver.create({registry: {}});
  ember_test_helpers.setResolver(resolver);

  function setResolverRegistry(registry) {
    resolver.set('registry', registry);
  }

});
define('tests/test-support/resolver.jshint', function () {

  'use strict';

  module('JSHint - tests/test-support');
  test('tests/test-support/resolver.js should pass jshint', function() { 
    ok(true, 'tests/test-support/resolver.js should pass jshint.'); 
  });

});
define('tests/test-support/test-loader', function () {

  'use strict';

  /* globals requirejs, require */

  var TestLoader = function() {
  };

  TestLoader.prototype = {
    shouldLoadModule: function(moduleName) {
      return (moduleName.match(/[-_]test$/));
    },

    loadModules: function() {
      var moduleName;

      for (moduleName in requirejs.entries) {
        if (this.shouldLoadModule(moduleName)) {
          require(moduleName);
        }
      }
    }
  };

  TestLoader.load = function() {
    new TestLoader().loadModules();
  };

  //export default TestLoader;
  TestLoader.load();

});
define('tests/test-support/test-loader.jshint', function () {

  'use strict';

  module('JSHint - tests/test-support');
  test('tests/test-support/test-loader.js should pass jshint', function() { 
    ok(true, 'tests/test-support/test-loader.js should pass jshint.'); 
  });

});//# sourceMappingURL=ember-mocha-tests.amd.map