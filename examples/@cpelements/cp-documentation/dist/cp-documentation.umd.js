(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../../@patternfly/pfelement/dist/pfelement.umd'), require('../../../@patternfly/pfe-clipboard/dist/pfe-clipboard.umd')) :
	typeof define === 'function' && define.amd ? define(['../../../@patternfly/pfelement/dist/pfelement.umd', '../../../@patternfly/pfe-clipboard/dist/pfe-clipboard.umd'], factory) :
	(global.PfeDocumentation = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

	PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var prism = createCommonjsModule(function (module) {
	  /* PrismJS 1.25.0
	  https://prismjs.com/download.html#themes=prism-coy&languages=markup+clike+javascript+asciidoc+bash+c+dns-zone-file+go+java+json+makefile+promql+python+systemd+yaml&plugins=line-numbers+keep-markup */
	  /// <reference lib="WebWorker"/>

	  var _self = typeof window !== "undefined" ? window // if in browser
	  : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self // if in worker
	  : {}; // if in node js

	  /**
	   * Prism: Lightweight, robust, elegant syntax highlighting
	   *
	   * @license MIT <https://opensource.org/licenses/MIT>
	   * @author Lea Verou <https://lea.verou.me>
	   * @namespace
	   * @public
	   */
	  var Prism = function (_self) {
	    // Private helper vars
	    var lang = /\blang(?:uage)?-([\w-]+)\b/i;
	    var uniqueId = 0;

	    // The grammar object for plaintext
	    var plainTextGrammar = {};

	    var _ = {
	      /**
	       * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
	       * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
	       * additional languages or plugins yourself.
	       *
	       * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
	       *
	       * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
	       * empty Prism object into the global scope before loading the Prism script like this:
	       *
	       * ```js
	       * window.Prism = window.Prism || {};
	       * Prism.manual = true;
	       * // add a new <script> to load Prism's script
	       * ```
	       *
	       * @default false
	       * @type {boolean}
	       * @memberof Prism
	       * @public
	       */
	      manual: _self.Prism && _self.Prism.manual,
	      /**
	       * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
	       * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
	       * own worker, you don't want it to do this.
	       *
	       * By setting this value to `true`, Prism will not add its own listeners to the worker.
	       *
	       * You obviously have to change this value before Prism executes. To do this, you can add an
	       * empty Prism object into the global scope before loading the Prism script like this:
	       *
	       * ```js
	       * window.Prism = window.Prism || {};
	       * Prism.disableWorkerMessageHandler = true;
	       * // Load Prism's script
	       * ```
	       *
	       * @default false
	       * @type {boolean}
	       * @memberof Prism
	       * @public
	       */
	      disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

	      /**
	       * A namespace for utility methods.
	       *
	       * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
	       * change or disappear at any time.
	       *
	       * @namespace
	       * @memberof Prism
	       */
	      util: {
	        encode: function encode(tokens) {
	          if (tokens instanceof Token) {
	            return new Token(tokens.type, encode(tokens.content), tokens.alias);
	          } else if (Array.isArray(tokens)) {
	            return tokens.map(encode);
	          } else {
	            return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
	          }
	        },

	        /**
	         * Returns the name of the type of the given value.
	         *
	         * @param {any} o
	         * @returns {string}
	         * @example
	         * type(null)      === 'Null'
	         * type(undefined) === 'Undefined'
	         * type(123)       === 'Number'
	         * type('foo')     === 'String'
	         * type(true)      === 'Boolean'
	         * type([1, 2])    === 'Array'
	         * type({})        === 'Object'
	         * type(String)    === 'Function'
	         * type(/abc+/)    === 'RegExp'
	         */
	        type: function type(o) {
	          return Object.prototype.toString.call(o).slice(8, -1);
	        },

	        /**
	         * Returns a unique number for the given object. Later calls will still return the same number.
	         *
	         * @param {Object} obj
	         * @returns {number}
	         */
	        objId: function objId(obj) {
	          if (!obj["__id"]) {
	            Object.defineProperty(obj, "__id", { value: ++uniqueId });
	          }
	          return obj["__id"];
	        },

	        /**
	         * Creates a deep clone of the given object.
	         *
	         * The main intended use of this function is to clone language definitions.
	         *
	         * @param {T} o
	         * @param {Record<number, any>} [visited]
	         * @returns {T}
	         * @template T
	         */
	        clone: function deepClone(o, visited) {
	          visited = visited || {};

	          var clone;
	          var id;
	          switch (_.util.type(o)) {
	            case "Object":
	              id = _.util.objId(o);
	              if (visited[id]) {
	                return visited[id];
	              }
	              clone = /** @type {Record<string, any>} */{};
	              visited[id] = clone;

	              for (var key in o) {
	                if (o.hasOwnProperty(key)) {
	                  clone[key] = deepClone(o[key], visited);
	                }
	              }

	              return (/** @type {any} */clone
	              );

	            case "Array":
	              id = _.util.objId(o);
	              if (visited[id]) {
	                return visited[id];
	              }
	              clone = [];
	              visited[id] = clone;

	              /** @type {Array} */ /** @type {any} */o.forEach(function (v, i) {
	                clone[i] = deepClone(v, visited);
	              });

	              return (/** @type {any} */clone
	              );

	            default:
	              return o;
	          }
	        },

	        /**
	         * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
	         *
	         * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
	         *
	         * @param {Element} element
	         * @returns {string}
	         */
	        getLanguage: function getLanguage(element) {
	          while (element && !lang.test(element.className)) {
	            element = element.parentElement;
	          }
	          if (element) {
	            return (element.className.match(lang) || [, "none"])[1].toLowerCase();
	          }
	          return "none";
	        },

	        /**
	         * Returns the script element that is currently executing.
	         *
	         * This does __not__ work for line script element.
	         *
	         * @returns {HTMLScriptElement | null}
	         */
	        currentScript: function currentScript() {
	          if (typeof document === "undefined") {
	            return null;
	          }
	          if ("currentScript" in document && 1 < 2 /* hack to trip TS' flow analysis */
	          ) {
	              return (/** @type {any} */document.currentScript
	              );
	            }

	          // IE11 workaround
	          // we'll get the src of the current script by parsing IE11's error stack trace
	          // this will not work for inline scripts

	          try {
	            throw new Error();
	          } catch (err) {
	            // Get file src url from stack. Specifically works with the format of stack traces in IE.
	            // A stack will look like this:
	            //
	            // Error
	            //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
	            //    at Global code (http://localhost/components/prism-core.js:606:1)

	            var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
	            if (src) {
	              var scripts = document.getElementsByTagName("script");
	              for (var i in scripts) {
	                if (scripts[i].src == src) {
	                  return scripts[i];
	                }
	              }
	            }
	            return null;
	          }
	        },

	        /**
	         * Returns whether a given class is active for `element`.
	         *
	         * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
	         * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
	         * given class is just the given class with a `no-` prefix.
	         *
	         * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
	         * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
	         * ancestors have the given class or the negated version of it, then the default activation will be returned.
	         *
	         * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
	         * version of it, the class is considered active.
	         *
	         * @param {Element} element
	         * @param {string} className
	         * @param {boolean} [defaultActivation=false]
	         * @returns {boolean}
	         */
	        isActive: function isActive(element, className, defaultActivation) {
	          var no = "no-" + className;

	          while (element) {
	            var classList = element.classList;
	            if (classList.contains(className)) {
	              return true;
	            }
	            if (classList.contains(no)) {
	              return false;
	            }
	            element = element.parentElement;
	          }
	          return !!defaultActivation;
	        }
	      },

	      /**
	       * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
	       *
	       * @namespace
	       * @memberof Prism
	       * @public
	       */
	      languages: {
	        /**
	         * The grammar for plain, unformatted text.
	         */
	        plain: plainTextGrammar,
	        plaintext: plainTextGrammar,
	        text: plainTextGrammar,
	        txt: plainTextGrammar,

	        /**
	         * Creates a deep copy of the language with the given id and appends the given tokens.
	         *
	         * If a token in `redef` also appears in the copied language, then the existing token in the copied language
	         * will be overwritten at its original position.
	         *
	         * ## Best practices
	         *
	         * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
	         * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
	         * understand the language definition because, normally, the order of tokens matters in Prism grammars.
	         *
	         * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
	         * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
	         *
	         * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
	         * @param {Grammar} redef The new tokens to append.
	         * @returns {Grammar} The new language created.
	         * @public
	         * @example
	         * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
	         *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
	         *     // at its original position
	         *     'comment': { ... },
	         *     // CSS doesn't have a 'color' token, so this token will be appended
	         *     'color': /\b(?:red|green|blue)\b/
	         * });
	         */
	        extend: function extend(id, redef) {
	          var lang = _.util.clone(_.languages[id]);

	          for (var key in redef) {
	            lang[key] = redef[key];
	          }

	          return lang;
	        },

	        /**
	         * Inserts tokens _before_ another token in a language definition or any other grammar.
	         *
	         * ## Usage
	         *
	         * This helper method makes it easy to modify existing languages. For example, the CSS language definition
	         * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
	         * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
	         * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
	         * this:
	         *
	         * ```js
	         * Prism.languages.markup.style = {
	         *     // token
	         * };
	         * ```
	         *
	         * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
	         * before existing tokens. For the CSS example above, you would use it like this:
	         *
	         * ```js
	         * Prism.languages.insertBefore('markup', 'cdata', {
	         *     'style': {
	         *         // token
	         *     }
	         * });
	         * ```
	         *
	         * ## Special cases
	         *
	         * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
	         * will be ignored.
	         *
	         * This behavior can be used to insert tokens after `before`:
	         *
	         * ```js
	         * Prism.languages.insertBefore('markup', 'comment', {
	         *     'comment': Prism.languages.markup.comment,
	         *     // tokens after 'comment'
	         * });
	         * ```
	         *
	         * ## Limitations
	         *
	         * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
	         * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
	         * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
	         * deleting properties which is necessary to insert at arbitrary positions.
	         *
	         * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
	         * Instead, it will create a new object and replace all references to the target object with the new one. This
	         * can be done without temporarily deleting properties, so the iteration order is well-defined.
	         *
	         * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
	         * you hold the target object in a variable, then the value of the variable will not change.
	         *
	         * ```js
	         * var oldMarkup = Prism.languages.markup;
	         * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
	         *
	         * assert(oldMarkup !== Prism.languages.markup);
	         * assert(newMarkup === Prism.languages.markup);
	         * ```
	         *
	         * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
	         * object to be modified.
	         * @param {string} before The key to insert before.
	         * @param {Grammar} insert An object containing the key-value pairs to be inserted.
	         * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
	         * object to be modified.
	         *
	         * Defaults to `Prism.languages`.
	         * @returns {Grammar} The new grammar object.
	         * @public
	         */
	        insertBefore: function insertBefore(inside, before, insert, root) {
	          root = root || /** @type {any} */_.languages;
	          var grammar = root[inside];
	          /** @type {Grammar} */
	          var ret = {};

	          for (var token in grammar) {
	            if (grammar.hasOwnProperty(token)) {
	              if (token == before) {
	                for (var newToken in insert) {
	                  if (insert.hasOwnProperty(newToken)) {
	                    ret[newToken] = insert[newToken];
	                  }
	                }
	              }

	              // Do not insert token which also occur in insert. See #1525
	              if (!insert.hasOwnProperty(token)) {
	                ret[token] = grammar[token];
	              }
	            }
	          }

	          var old = root[inside];
	          root[inside] = ret;

	          // Update references in other language definitions
	          _.languages.DFS(_.languages, function (key, value) {
	            if (value === old && key != inside) {
	              this[key] = ret;
	            }
	          });

	          return ret;
	        },

	        // Traverse a language definition with Depth First Search
	        DFS: function DFS(o, callback, type, visited) {
	          visited = visited || {};

	          var objId = _.util.objId;

	          for (var i in o) {
	            if (o.hasOwnProperty(i)) {
	              callback.call(o, i, o[i], type || i);

	              var property = o[i];
	              var propertyType = _.util.type(property);

	              if (propertyType === "Object" && !visited[objId(property)]) {
	                visited[objId(property)] = true;
	                DFS(property, callback, null, visited);
	              } else if (propertyType === "Array" && !visited[objId(property)]) {
	                visited[objId(property)] = true;
	                DFS(property, callback, i, visited);
	              }
	            }
	          }
	        }
	      },

	      plugins: {},

	      /**
	       * This is the most high-level function in Prism’s API.
	       * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
	       * each one of them.
	       *
	       * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
	       *
	       * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
	       * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
	       * @memberof Prism
	       * @public
	       */
	      highlightAll: function highlightAll(async, callback) {
	        _.highlightAllUnder(document, async, callback);
	      },

	      /**
	       * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
	       * {@link Prism.highlightElement} on each one of them.
	       *
	       * The following hooks will be run:
	       * 1. `before-highlightall`
	       * 2. `before-all-elements-highlight`
	       * 3. All hooks of {@link Prism.highlightElement} for each element.
	       *
	       * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
	       * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
	       * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
	       * @memberof Prism
	       * @public
	       */
	      highlightAllUnder: function highlightAllUnder(container, async, callback) {
	        var env = {
	          callback: callback,
	          container: container,
	          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
	        };

	        _.hooks.run("before-highlightall", env);

	        env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

	        _.hooks.run("before-all-elements-highlight", env);

	        for (var i = 0, element; element = env.elements[i++];) {
	          _.highlightElement(element, async === true, env.callback);
	        }
	      },

	      /**
	       * Highlights the code inside a single element.
	       *
	       * The following hooks will be run:
	       * 1. `before-sanity-check`
	       * 2. `before-highlight`
	       * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
	       * 4. `before-insert`
	       * 5. `after-highlight`
	       * 6. `complete`
	       *
	       * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
	       * the element's language.
	       *
	       * @param {Element} element The element containing the code.
	       * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
	       * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
	       * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
	       * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
	       *
	       * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
	       * asynchronous highlighting to work. You can build your own bundle on the
	       * [Download page](https://prismjs.com/download.html).
	       * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
	       * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
	       * @memberof Prism
	       * @public
	       */
	      highlightElement: function highlightElement(element, async, callback) {
	        // Find language
	        var language = _.util.getLanguage(element);
	        var grammar = _.languages[language];

	        // Set language on the element, if not present
	        element.className = element.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;

	        // Set language on the parent, for styling
	        var parent = element.parentElement;
	        if (parent && parent.nodeName.toLowerCase() === "pre") {
	          parent.className = parent.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;
	        }

	        var code = element.textContent;

	        var env = {
	          element: element,
	          language: language,
	          grammar: grammar,
	          code: code
	        };

	        function insertHighlightedCode(highlightedCode) {
	          env.highlightedCode = highlightedCode;

	          _.hooks.run("before-insert", env);

	          env.element.innerHTML = env.highlightedCode;

	          _.hooks.run("after-highlight", env);
	          _.hooks.run("complete", env);
	          callback && callback.call(env.element);
	        }

	        _.hooks.run("before-sanity-check", env);

	        // plugins may change/add the parent/element
	        parent = env.element.parentElement;
	        if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
	          parent.setAttribute("tabindex", "0");
	        }

	        if (!env.code) {
	          _.hooks.run("complete", env);
	          callback && callback.call(env.element);
	          return;
	        }

	        _.hooks.run("before-highlight", env);

	        if (!env.grammar) {
	          insertHighlightedCode(_.util.encode(env.code));
	          return;
	        }

	        if (async && _self.Worker) {
	          var worker = new Worker(_.filename);

	          worker.onmessage = function (evt) {
	            insertHighlightedCode(evt.data);
	          };

	          worker.postMessage(JSON.stringify({
	            language: env.language,
	            code: env.code,
	            immediateClose: true
	          }));
	        } else {
	          insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
	        }
	      },

	      /**
	       * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
	       * and the language definitions to use, and returns a string with the HTML produced.
	       *
	       * The following hooks will be run:
	       * 1. `before-tokenize`
	       * 2. `after-tokenize`
	       * 3. `wrap`: On each {@link Token}.
	       *
	       * @param {string} text A string with the code to be highlighted.
	       * @param {Grammar} grammar An object containing the tokens to use.
	       *
	       * Usually a language definition like `Prism.languages.markup`.
	       * @param {string} language The name of the language definition passed to `grammar`.
	       * @returns {string} The highlighted HTML.
	       * @memberof Prism
	       * @public
	       * @example
	       * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
	       */
	      highlight: function highlight(text, grammar, language) {
	        var env = {
	          code: text,
	          grammar: grammar,
	          language: language
	        };
	        _.hooks.run("before-tokenize", env);
	        env.tokens = _.tokenize(env.code, env.grammar);
	        _.hooks.run("after-tokenize", env);
	        return Token.stringify(_.util.encode(env.tokens), env.language);
	      },

	      /**
	       * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
	       * and the language definitions to use, and returns an array with the tokenized code.
	       *
	       * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
	       *
	       * This method could be useful in other contexts as well, as a very crude parser.
	       *
	       * @param {string} text A string with the code to be highlighted.
	       * @param {Grammar} grammar An object containing the tokens to use.
	       *
	       * Usually a language definition like `Prism.languages.markup`.
	       * @returns {TokenStream} An array of strings and tokens, a token stream.
	       * @memberof Prism
	       * @public
	       * @example
	       * let code = `var foo = 0;`;
	       * let tokens = Prism.tokenize(code, Prism.languages.javascript);
	       * tokens.forEach(token => {
	       *     if (token instanceof Prism.Token && token.type === 'number') {
	       *         console.log(`Found numeric literal: ${token.content}`);
	       *     }
	       * });
	       */
	      tokenize: function tokenize(text, grammar) {
	        var rest = grammar.rest;
	        if (rest) {
	          for (var token in rest) {
	            grammar[token] = rest[token];
	          }

	          delete grammar.rest;
	        }

	        var tokenList = new LinkedList();
	        addAfter(tokenList, tokenList.head, text);

	        matchGrammar(text, tokenList, grammar, tokenList.head, 0);

	        return toArray(tokenList);
	      },

	      /**
	       * @namespace
	       * @memberof Prism
	       * @public
	       */
	      hooks: {
	        all: {},

	        /**
	         * Adds the given callback to the list of callbacks for the given hook.
	         *
	         * The callback will be invoked when the hook it is registered for is run.
	         * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
	         *
	         * One callback function can be registered to multiple hooks and the same hook multiple times.
	         *
	         * @param {string} name The name of the hook.
	         * @param {HookCallback} callback The callback function which is given environment variables.
	         * @public
	         */
	        add: function add(name, callback) {
	          var hooks = _.hooks.all;

	          hooks[name] = hooks[name] || [];

	          hooks[name].push(callback);
	        },

	        /**
	         * Runs a hook invoking all registered callbacks with the given environment variables.
	         *
	         * Callbacks will be invoked synchronously and in the order in which they were registered.
	         *
	         * @param {string} name The name of the hook.
	         * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
	         * @public
	         */
	        run: function run(name, env) {
	          var callbacks = _.hooks.all[name];

	          if (!callbacks || !callbacks.length) {
	            return;
	          }

	          for (var i = 0, callback; callback = callbacks[i++];) {
	            callback(env);
	          }
	        }
	      },

	      Token: Token
	    };
	    _self.Prism = _;

	    // Typescript note:
	    // The following can be used to import the Token type in JSDoc:
	    //
	    //   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

	    /**
	     * Creates a new token.
	     *
	     * @param {string} type See {@link Token#type type}
	     * @param {string | TokenStream} content See {@link Token#content content}
	     * @param {string|string[]} [alias] The alias(es) of the token.
	     * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	     * @class
	     * @global
	     * @public
	     */
	    function Token(type, content, alias, matchedStr) {
	      /**
	       * The type of the token.
	       *
	       * This is usually the key of a pattern in a {@link Grammar}.
	       *
	       * @type {string}
	       * @see GrammarToken
	       * @public
	       */
	      this.type = type;
	      /**
	       * The strings or tokens contained by this token.
	       *
	       * This will be a token stream if the pattern matched also defined an `inside` grammar.
	       *
	       * @type {string | TokenStream}
	       * @public
	       */
	      this.content = content;
	      /**
	       * The alias(es) of the token.
	       *
	       * @type {string|string[]}
	       * @see GrammarToken
	       * @public
	       */
	      this.alias = alias;
	      // Copy of the full string this token was created from
	      this.length = (matchedStr || "").length | 0;
	    }

	    /**
	     * A token stream is an array of strings and {@link Token Token} objects.
	     *
	     * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	     * them.
	     *
	     * 1. No adjacent strings.
	     * 2. No empty strings.
	     *
	     *    The only exception here is the token stream that only contains the empty string and nothing else.
	     *
	     * @typedef {Array<string | Token>} TokenStream
	     * @global
	     * @public
	     */

	    /**
	     * Converts the given token or token stream to an HTML representation.
	     *
	     * The following hooks will be run:
	     * 1. `wrap`: On each {@link Token}.
	     *
	     * @param {string | Token | TokenStream} o The token or token stream to be converted.
	     * @param {string} language The name of current language.
	     * @returns {string} The HTML representation of the token or token stream.
	     * @memberof Token
	     * @static
	     */
	    Token.stringify = function stringify(o, language) {
	      if (typeof o == "string") {
	        return o;
	      }
	      if (Array.isArray(o)) {
	        var s = "";
	        o.forEach(function (e) {
	          s += stringify(e, language);
	        });
	        return s;
	      }

	      var env = {
	        type: o.type,
	        content: stringify(o.content, language),
	        tag: "span",
	        classes: ["token", o.type],
	        attributes: {},
	        language: language
	      };

	      var aliases = o.alias;
	      if (aliases) {
	        if (Array.isArray(aliases)) {
	          Array.prototype.push.apply(env.classes, aliases);
	        } else {
	          env.classes.push(aliases);
	        }
	      }

	      _.hooks.run("wrap", env);

	      var attributes = "";
	      for (var name in env.attributes) {
	        attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
	      }

	      return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
	    };

	    /**
	     * @param {RegExp} pattern
	     * @param {number} pos
	     * @param {string} text
	     * @param {boolean} lookbehind
	     * @returns {RegExpExecArray | null}
	     */
	    function matchPattern(pattern, pos, text, lookbehind) {
	      pattern.lastIndex = pos;
	      var match = pattern.exec(text);
	      if (match && lookbehind && match[1]) {
	        // change the match to remove the text matched by the Prism lookbehind group
	        var lookbehindLength = match[1].length;
	        match.index += lookbehindLength;
	        match[0] = match[0].slice(lookbehindLength);
	      }
	      return match;
	    }

	    /**
	     * @param {string} text
	     * @param {LinkedList<string | Token>} tokenList
	     * @param {any} grammar
	     * @param {LinkedListNode<string | Token>} startNode
	     * @param {number} startPos
	     * @param {RematchOptions} [rematch]
	     * @returns {void}
	     * @private
	     *
	     * @typedef RematchOptions
	     * @property {string} cause
	     * @property {number} reach
	     */
	    function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
	      for (var token in grammar) {
	        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
	          continue;
	        }

	        var patterns = grammar[token];
	        patterns = Array.isArray(patterns) ? patterns : [patterns];

	        for (var j = 0; j < patterns.length; ++j) {
	          if (rematch && rematch.cause == token + "," + j) {
	            return;
	          }

	          var patternObj = patterns[j];
	          var inside = patternObj.inside;
	          var lookbehind = !!patternObj.lookbehind;
	          var greedy = !!patternObj.greedy;
	          var alias = patternObj.alias;

	          if (greedy && !patternObj.pattern.global) {
	            // Without the global flag, lastIndex won't work
	            var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
	            patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
	          }

	          /** @type {RegExp} */
	          var pattern = patternObj.pattern || patternObj;

	          for (
	          // iterate the token list and keep track of the current token/string position
	          var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
	            if (rematch && pos >= rematch.reach) {
	              break;
	            }

	            var str = currentNode.value;

	            if (tokenList.length > text.length) {
	              // Something went terribly wrong, ABORT, ABORT!
	              return;
	            }

	            if (str instanceof Token) {
	              continue;
	            }

	            var removeCount = 1; // this is the to parameter of removeBetween
	            var match;

	            if (greedy) {
	              match = matchPattern(pattern, pos, text, lookbehind);
	              if (!match) {
	                break;
	              }

	              var from = match.index;
	              var to = match.index + match[0].length;
	              var p = pos;

	              // find the node that contains the match
	              p += currentNode.value.length;
	              while (from >= p) {
	                currentNode = currentNode.next;
	                p += currentNode.value.length;
	              }
	              // adjust pos (and p)
	              p -= currentNode.value.length;
	              pos = p;

	              // the current node is a Token, then the match starts inside another Token, which is invalid
	              if (currentNode.value instanceof Token) {
	                continue;
	              }

	              // find the last node which is affected by this match
	              for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
	                removeCount++;
	                p += k.value.length;
	              }
	              removeCount--;

	              // replace with the new match
	              str = text.slice(pos, p);
	              match.index -= pos;
	            } else {
	              match = matchPattern(pattern, 0, str, lookbehind);
	              if (!match) {
	                continue;
	              }
	            }

	            // eslint-disable-next-line no-redeclare
	            var from = match.index;
	            var matchStr = match[0];
	            var before = str.slice(0, from);
	            var after = str.slice(from + matchStr.length);

	            var reach = pos + str.length;
	            if (rematch && reach > rematch.reach) {
	              rematch.reach = reach;
	            }

	            var removeFrom = currentNode.prev;

	            if (before) {
	              removeFrom = addAfter(tokenList, removeFrom, before);
	              pos += before.length;
	            }

	            removeRange(tokenList, removeFrom, removeCount);

	            var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
	            currentNode = addAfter(tokenList, removeFrom, wrapped);

	            if (after) {
	              addAfter(tokenList, currentNode, after);
	            }

	            if (removeCount > 1) {
	              // at least one Token object was removed, so we have to do some rematching
	              // this can only happen if the current pattern is greedy

	              /** @type {RematchOptions} */
	              var nestedRematch = {
	                cause: token + "," + j,
	                reach: reach
	              };
	              matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

	              // the reach might have been extended because of the rematching
	              if (rematch && nestedRematch.reach > rematch.reach) {
	                rematch.reach = nestedRematch.reach;
	              }
	            }
	          }
	        }
	      }
	    }

	    /**
	     * @typedef LinkedListNode
	     * @property {T} value
	     * @property {LinkedListNode<T> | null} prev The previous node.
	     * @property {LinkedListNode<T> | null} next The next node.
	     * @template T
	     * @private
	     */

	    /**
	     * @template T
	     * @private
	     */
	    function LinkedList() {
	      /** @type {LinkedListNode<T>} */
	      var head = { value: null, prev: null, next: null };
	      /** @type {LinkedListNode<T>} */
	      var tail = { value: null, prev: head, next: null };
	      head.next = tail;

	      /** @type {LinkedListNode<T>} */
	      this.head = head;
	      /** @type {LinkedListNode<T>} */
	      this.tail = tail;
	      this.length = 0;
	    }

	    /**
	     * Adds a new node with the given value to the list.
	     *
	     * @param {LinkedList<T>} list
	     * @param {LinkedListNode<T>} node
	     * @param {T} value
	     * @returns {LinkedListNode<T>} The added node.
	     * @template T
	     */
	    function addAfter(list, node, value) {
	      // assumes that node != list.tail && values.length >= 0
	      var next = node.next;

	      var newNode = { value: value, prev: node, next: next };
	      node.next = newNode;
	      next.prev = newNode;
	      list.length++;

	      return newNode;
	    }
	    /**
	     * Removes `count` nodes after the given node. The given node will not be removed.
	     *
	     * @param {LinkedList<T>} list
	     * @param {LinkedListNode<T>} node
	     * @param {number} count
	     * @template T
	     */
	    function removeRange(list, node, count) {
	      var next = node.next;
	      for (var i = 0; i < count && next !== list.tail; i++) {
	        next = next.next;
	      }
	      node.next = next;
	      next.prev = node;
	      list.length -= i;
	    }
	    /**
	     * @param {LinkedList<T>} list
	     * @returns {T[]}
	     * @template T
	     */
	    function toArray(list) {
	      var array = [];
	      var node = list.head.next;
	      while (node !== list.tail) {
	        array.push(node.value);
	        node = node.next;
	      }
	      return array;
	    }

	    if (!_self.document) {
	      if (!_self.addEventListener) {
	        // in Node.js
	        return _;
	      }

	      if (!_.disableWorkerMessageHandler) {
	        // In worker
	        _self.addEventListener("message", function (evt) {
	          var message = JSON.parse(evt.data);
	          var lang = message.language;
	          var code = message.code;
	          var immediateClose = message.immediateClose;

	          _self.postMessage(_.highlight(code, _.languages[lang], lang));
	          if (immediateClose) {
	            _self.close();
	          }
	        }, false);
	      }

	      return _;
	    }

	    // Get current script and highlight
	    var script = _.util.currentScript();

	    if (script) {
	      _.filename = script.src;

	      if (script.hasAttribute("data-manual")) {
	        _.manual = true;
	      }
	    }

	    function highlightAutomaticallyCallback() {
	      if (!_.manual) {
	        _.highlightAll();
	      }
	    }

	    if (!_.manual) {
	      // If the document state is "loading", then we'll use DOMContentLoaded.
	      // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
	      // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
	      // might take longer one animation frame to execute which can create a race condition where only some plugins have
	      // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
	      // See https://github.com/PrismJS/prism/issues/2102
	      var readyState = document.readyState;
	      if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
	        document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
	      } else {
	        if (window.requestAnimationFrame) {
	          window.requestAnimationFrame(highlightAutomaticallyCallback);
	        } else {
	          window.setTimeout(highlightAutomaticallyCallback, 16);
	        }
	      }
	    }

	    return _;
	  }(_self);

	  if (module.exports) {
	    module.exports = Prism;
	  }

	  // hack for components to work correctly in node.js
	  if (typeof commonjsGlobal !== "undefined") {
	    commonjsGlobal.Prism = Prism;
	  }

	  // some additional documentation/types

	  /**
	   * The expansion of a simple `RegExp` literal to support additional properties.
	   *
	   * @typedef GrammarToken
	   * @property {RegExp} pattern The regular expression of the token.
	   * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
	   * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
	   * @property {boolean} [greedy=false] Whether the token is greedy.
	   * @property {string|string[]} [alias] An optional alias or list of aliases.
	   * @property {Grammar} [inside] The nested grammar of this token.
	   *
	   * The `inside` grammar will be used to tokenize the text value of each token of this kind.
	   *
	   * This can be used to make nested and even recursive language definitions.
	   *
	   * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
	   * each another.
	   * @global
	   * @public
	   */

	  /**
	   * @typedef Grammar
	   * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
	   * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
	   * @global
	   * @public
	   */

	  /**
	   * A function which will invoked after an element was successfully highlighted.
	   *
	   * @callback HighlightCallback
	   * @param {Element} element The element successfully highlighted.
	   * @returns {void}
	   * @global
	   * @public
	   */

	  /**
	   * @callback HookCallback
	   * @param {Object<string, any>} env The environment variables of the hook.
	   * @returns {void}
	   * @global
	   * @public
	   */
	  Prism.languages.markup = {
	    comment: {
	      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
	      greedy: true
	    },
	    prolog: {
	      pattern: /<\?[\s\S]+?\?>/,
	      greedy: true
	    },
	    doctype: {
	      // https://www.w3.org/TR/xml/#NT-doctypedecl
	      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
	      greedy: true,
	      inside: {
	        "internal-subset": {
	          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
	          lookbehind: true,
	          greedy: true,
	          inside: null // see below
	        },
	        string: {
	          pattern: /"[^"]*"|'[^']*'/,
	          greedy: true
	        },
	        punctuation: /^<!|>$|[[\]]/,
	        "doctype-tag": /^DOCTYPE/i,
	        name: /[^\s<>'"]+/
	      }
	    },
	    cdata: {
	      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
	      greedy: true
	    },
	    tag: {
	      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
	      greedy: true,
	      inside: {
	        tag: {
	          pattern: /^<\/?[^\s>\/]+/,
	          inside: {
	            punctuation: /^<\/?/,
	            namespace: /^[^\s>\/:]+:/
	          }
	        },
	        "special-attr": [],
	        "attr-value": {
	          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
	          inside: {
	            punctuation: [{
	              pattern: /^=/,
	              alias: "attr-equals"
	            }, /"|'/]
	          }
	        },
	        punctuation: /\/?>/,
	        "attr-name": {
	          pattern: /[^\s>\/]+/,
	          inside: {
	            namespace: /^[^\s>\/:]+:/
	          }
	        }
	      }
	    },
	    entity: [{
	      pattern: /&[\da-z]{1,8};/i,
	      alias: "named-entity"
	    }, /&#x?[\da-f]{1,8};/i]
	  };

	  Prism.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism.languages.markup["entity"];
	  Prism.languages.markup["doctype"].inside["internal-subset"].inside = Prism.languages.markup;

	  // Plugin to make entity title show the real entity, idea by Roman Komarov
	  Prism.hooks.add("wrap", function (env) {
	    if (env.type === "entity") {
	      env.attributes["title"] = env.content.replace(/&amp;/, "&");
	    }
	  });

	  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
	    /**
	     * Adds an inlined language to markup.
	     *
	     * An example of an inlined language is CSS with `<style>` tags.
	     *
	     * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	     * case insensitive.
	     * @param {string} lang The language key.
	     * @example
	     * addInlined('style', 'css');
	     */
	    value: function addInlined(tagName, lang) {
	      var includedCdataInside = {};
	      includedCdataInside["language-" + lang] = {
	        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
	        lookbehind: true,
	        inside: Prism.languages[lang]
	      };
	      includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;

	      var inside = {
	        "included-cdata": {
	          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
	          inside: includedCdataInside
	        }
	      };
	      inside["language-" + lang] = {
	        pattern: /[\s\S]+/,
	        inside: Prism.languages[lang]
	      };

	      var def = {};
	      def[tagName] = {
	        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
	          return tagName;
	        }), "i"),
	        lookbehind: true,
	        greedy: true,
	        inside: inside
	      };

	      Prism.languages.insertBefore("markup", "cdata", def);
	    }
	  });
	  Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
	    /**
	     * Adds an pattern to highlight languages embedded in HTML attributes.
	     *
	     * An example of an inlined language is CSS with `style` attributes.
	     *
	     * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	     * case insensitive.
	     * @param {string} lang The language key.
	     * @example
	     * addAttribute('style', 'css');
	     */
	    value: function value(attrName, lang) {
	      Prism.languages.markup.tag.inside["special-attr"].push({
	        pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
	        lookbehind: true,
	        inside: {
	          "attr-name": /^[^\s=]+/,
	          "attr-value": {
	            pattern: /=[\s\S]+/,
	            inside: {
	              value: {
	                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
	                lookbehind: true,
	                alias: [lang, "language-" + lang],
	                inside: Prism.languages[lang]
	              },
	              punctuation: [{
	                pattern: /^=/,
	                alias: "attr-equals"
	              }, /"|'/]
	            }
	          }
	        }
	      });
	    }
	  });

	  Prism.languages.html = Prism.languages.markup;
	  Prism.languages.mathml = Prism.languages.markup;
	  Prism.languages.svg = Prism.languages.markup;

	  Prism.languages.xml = Prism.languages.extend("markup", {});
	  Prism.languages.ssml = Prism.languages.xml;
	  Prism.languages.atom = Prism.languages.xml;
	  Prism.languages.rss = Prism.languages.xml;

	  Prism.languages.clike = {
	    comment: [{
	      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
	      lookbehind: true,
	      greedy: true
	    }, {
	      pattern: /(^|[^\\:])\/\/.*/,
	      lookbehind: true,
	      greedy: true
	    }],
	    string: {
	      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
	      greedy: true
	    },
	    "class-name": {
	      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
	      lookbehind: true,
	      inside: {
	        punctuation: /[.\\]/
	      }
	    },
	    keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	    boolean: /\b(?:false|true)\b/,
	    function: /\b\w+(?=\()/,
	    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	    punctuation: /[{}[\];(),.:]/
	  };

	  Prism.languages.javascript = Prism.languages.extend("clike", {
	    "class-name": [Prism.languages.clike["class-name"], {
	      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
	      lookbehind: true
	    }],
	    keyword: [{
	      pattern: /((?:^|\})\s*)catch\b/,
	      lookbehind: true
	    }, {
	      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
	      lookbehind: true
	    }],
	    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
	    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
	  });

	  Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

	  Prism.languages.insertBefore("javascript", "keyword", {
	    regex: {
	      // eslint-disable-next-line regexp/no-dupe-characters-character-class
	      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
	      lookbehind: true,
	      greedy: true,
	      inside: {
	        "regex-source": {
	          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
	          lookbehind: true,
	          alias: "language-regex",
	          inside: Prism.languages.regex
	        },
	        "regex-delimiter": /^\/|\/$/,
	        "regex-flags": /^[a-z]+$/
	      }
	    },
	    // This must be declared before keyword because we use "function" inside the look-forward
	    "function-variable": {
	      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
	      alias: "function"
	    },
	    parameter: [{
	      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
	      lookbehind: true,
	      inside: Prism.languages.javascript
	    }, {
	      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
	      lookbehind: true,
	      inside: Prism.languages.javascript
	    }, {
	      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
	      lookbehind: true,
	      inside: Prism.languages.javascript
	    }, {
	      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
	      lookbehind: true,
	      inside: Prism.languages.javascript
	    }],
	    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
	  });

	  Prism.languages.insertBefore("javascript", "string", {
	    hashbang: {
	      pattern: /^#!.*/,
	      greedy: true,
	      alias: "comment"
	    },
	    "template-string": {
	      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
	      greedy: true,
	      inside: {
	        "template-punctuation": {
	          pattern: /^`|`$/,
	          alias: "string"
	        },
	        interpolation: {
	          pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
	          lookbehind: true,
	          inside: {
	            "interpolation-punctuation": {
	              pattern: /^\$\{|\}$/,
	              alias: "punctuation"
	            },
	            rest: Prism.languages.javascript
	          }
	        },
	        string: /[\s\S]+/
	      }
	    }
	  });

	  if (Prism.languages.markup) {
	    Prism.languages.markup.tag.addInlined("script", "javascript");

	    // add attribute support for all DOM events.
	    // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	    Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
	  }

	  Prism.languages.js = Prism.languages.javascript;

	  (function (Prism) {
	    var attributes = {
	      pattern: /(^[ \t]*)\[(?!\[)(?:(["'$`])(?:(?!\2)[^\\]|\\.)*\2|\[(?:[^\[\]\\]|\\.)*\]|[^\[\]\\"'$`]|\\.)*\]/m,
	      lookbehind: true,
	      inside: {
	        quoted: {
	          pattern: /([$`])(?:(?!\1)[^\\]|\\.)*\1/,
	          inside: {
	            punctuation: /^[$`]|[$`]$/
	          }
	        },
	        interpreted: {
	          pattern: /'(?:[^'\\]|\\.)*'/,
	          inside: {
	            punctuation: /^'|'$/
	            // See rest below
	          }
	        },
	        string: /"(?:[^"\\]|\\.)*"/,
	        variable: /\w+(?==)/,
	        punctuation: /^\[|\]$|,/,
	        operator: /=/,
	        // The negative look-ahead prevents blank matches
	        "attr-value": /(?!^\s+$).+/
	      }
	    };

	    var asciidoc = Prism.languages.asciidoc = {
	      "comment-block": {
	        pattern: /^(\/{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1/m,
	        alias: "comment"
	      },
	      table: {
	        pattern: /^\|={3,}(?:(?:\r?\n|\r(?!\n)).*)*?(?:\r?\n|\r)\|={3,}$/m,
	        inside: {
	          specifiers: {
	            pattern: /(?:(?:(?:\d+(?:\.\d+)?|\.\d+)[+*](?:[<^>](?:\.[<^>])?|\.[<^>])?|[<^>](?:\.[<^>])?|\.[<^>])[a-z]*|[a-z]+)(?=\|)/,
	            alias: "attr-value"
	          },
	          punctuation: {
	            pattern: /(^|[^\\])[|!]=*/,
	            lookbehind: true
	          }
	          // See rest below
	        }
	      },

	      "passthrough-block": {
	        pattern: /^(\+{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
	        inside: {
	          punctuation: /^\++|\++$/
	          // See rest below
	        }
	      },
	      // Literal blocks and listing blocks
	      "literal-block": {
	        pattern: /^(-{4,}|\.{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
	        inside: {
	          punctuation: /^(?:-+|\.+)|(?:-+|\.+)$/
	          // See rest below
	        }
	      },
	      // Sidebar blocks, quote blocks, example blocks and open blocks
	      "other-block": {
	        pattern: /^(--|\*{4,}|_{4,}|={4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
	        inside: {
	          punctuation: /^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/
	          // See rest below
	        }
	      },

	      // list-punctuation and list-label must appear before indented-block
	      "list-punctuation": {
	        pattern: /(^[ \t]*)(?:-|\*{1,5}|\.{1,5}|(?:[a-z]|\d+)\.|[xvi]+\))(?= )/im,
	        lookbehind: true,
	        alias: "punctuation"
	      },
	      "list-label": {
	        pattern: /(^[ \t]*)[a-z\d].+(?::{2,4}|;;)(?=\s)/im,
	        lookbehind: true,
	        alias: "symbol"
	      },
	      "indented-block": {
	        pattern: /((\r?\n|\r)\2)([ \t]+)\S.*(?:(?:\r?\n|\r)\3.+)*(?=\2{2}|$)/,
	        lookbehind: true
	      },

	      comment: /^\/\/.*/m,
	      title: {
	        pattern: /^.+(?:\r?\n|\r)(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} .+|^\.(?![\s.]).*/m,
	        alias: "important",
	        inside: {
	          punctuation: /^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/
	          // See rest below
	        }
	      },
	      "attribute-entry": {
	        pattern: /^:[^:\r\n]+:(?: .*?(?: \+(?:\r?\n|\r).*?)*)?$/m,
	        alias: "tag"
	      },
	      attributes: attributes,
	      hr: {
	        pattern: /^'{3,}$/m,
	        alias: "punctuation"
	      },
	      "page-break": {
	        pattern: /^<{3,}$/m,
	        alias: "punctuation"
	      },
	      admonition: {
	        pattern: /^(?:CAUTION|IMPORTANT|NOTE|TIP|WARNING):/m,
	        alias: "keyword"
	      },
	      callout: [{
	        pattern: /(^[ \t]*)<?\d*>/m,
	        lookbehind: true,
	        alias: "symbol"
	      }, {
	        pattern: /<\d+>/,
	        alias: "symbol"
	      }],
	      macro: {
	        pattern: /\b[a-z\d][a-z\d-]*::?(?:[^\s\[\]]*\[(?:[^\]\\"']|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
	        inside: {
	          function: /^[a-z\d-]+(?=:)/,
	          punctuation: /^::?/,
	          attributes: {
	            pattern: /(?:\[(?:[^\]\\"']|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
	            inside: attributes.inside
	          }
	        }
	      },
	      inline: {
	        /*
	        The initial look-behind prevents the highlighting of escaped quoted text.
	        Quoted text can be multi-line but cannot span an empty line.
	        All quoted text can have attributes before [foobar, 'foobar', baz="bar"].
	        First, we handle the constrained quotes.
	        Those must be bounded by non-word chars and cannot have spaces between the delimiter and the first char.
	        They are, in order: _emphasis_, ``double quotes'', `single quotes', `monospace`, 'emphasis', *strong*, +monospace+ and #unquoted#
	        Then we handle the unconstrained quotes.
	        Those do not have the restrictions of the constrained quotes.
	        They are, in order: __emphasis__, **strong**, ++monospace++, +++passthrough+++, ##unquoted##, $$passthrough$$, ~subscript~, ^superscript^, {attribute-reference}, [[anchor]], [[[bibliography anchor]]], <<xref>>, (((indexes))) and ((indexes))
	        */
	        pattern: /(^|[^\\])(?:(?:\B\[(?:[^\]\\"']|(["'])(?:(?!\2)[^\\]|\\.)*\2|\\.)*\])?(?:\b_(?!\s)(?: _|[^_\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: _|[^_\\\r\n]|\\.)+)*_\b|\B``(?!\s).+?(?:(?:\r?\n|\r).+?)*''\B|\B`(?!\s)(?:[^`'\s]|\s+\S)+['`]\B|\B(['*+#])(?!\s)(?: \3|(?!\3)[^\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: \3|(?!\3)[^\\\r\n]|\\.)+)*\3\B)|(?:\[(?:[^\]\\"']|(["'])(?:(?!\4)[^\\]|\\.)*\4|\\.)*\])?(?:(__|\*\*|\+\+\+?|##|\$\$|[~^]).+?(?:(?:\r?\n|\r).+?)*\5|\{[^}\r\n]+\}|\[\[\[?.+?(?:(?:\r?\n|\r).+?)*\]?\]\]|<<.+?(?:(?:\r?\n|\r).+?)*>>|\(\(\(?.+?(?:(?:\r?\n|\r).+?)*\)?\)\)))/m,
	        lookbehind: true,
	        inside: {
	          attributes: attributes,
	          url: {
	            pattern: /^(?:\[\[\[?.+?\]?\]\]|<<.+?>>)$/,
	            inside: {
	              punctuation: /^(?:\[\[\[?|<<)|(?:\]\]\]?|>>)$/
	            }
	          },
	          "attribute-ref": {
	            pattern: /^\{.+\}$/,
	            inside: {
	              variable: {
	                pattern: /(^\{)[a-z\d,+_-]+/,
	                lookbehind: true
	              },
	              operator: /^[=?!#%@$]|!(?=[:}])/,
	              punctuation: /^\{|\}$|::?/
	            }
	          },
	          italic: {
	            pattern: /^(['_])[\s\S]+\1$/,
	            inside: {
	              punctuation: /^(?:''?|__?)|(?:''?|__?)$/
	            }
	          },
	          bold: {
	            pattern: /^\*[\s\S]+\*$/,
	            inside: {
	              punctuation: /^\*\*?|\*\*?$/
	            }
	          },
	          punctuation: /^(?:``?|\+{1,3}|##?|\$\$|[~^]|\(\(\(?)|(?:''?|\+{1,3}|##?|\$\$|[~^`]|\)?\)\))$/
	        }
	      },
	      replacement: {
	        pattern: /\((?:C|R|TM)\)/,
	        alias: "builtin"
	      },
	      entity: /&#?[\da-z]{1,8};/i,
	      "line-continuation": {
	        pattern: /(^| )\+$/m,
	        lookbehind: true,
	        alias: "punctuation"
	      }
	    };

	    // Allow some nesting. There is no recursion though, so cloning should not be needed.

	    function copyFromAsciiDoc(keys) {
	      keys = keys.split(" ");

	      var o = {};
	      for (var i = 0, l = keys.length; i < l; i++) {
	        o[keys[i]] = asciidoc[keys[i]];
	      }
	      return o;
	    }

	    attributes.inside["interpreted"].inside.rest = copyFromAsciiDoc("macro inline replacement entity");

	    asciidoc["passthrough-block"].inside.rest = copyFromAsciiDoc("macro");

	    asciidoc["literal-block"].inside.rest = copyFromAsciiDoc("callout");

	    asciidoc["table"].inside.rest = copyFromAsciiDoc("comment-block passthrough-block literal-block other-block list-punctuation indented-block comment title attribute-entry attributes hr page-break admonition list-label callout macro inline replacement entity line-continuation");

	    asciidoc["other-block"].inside.rest = copyFromAsciiDoc("table list-punctuation indented-block comment attribute-entry attributes hr page-break admonition list-label macro inline replacement entity line-continuation");

	    asciidoc["title"].inside.rest = copyFromAsciiDoc("macro inline replacement entity");

	    // Plugin to make entity title show the real entity, idea by Roman Komarov
	    Prism.hooks.add("wrap", function (env) {
	      if (env.type === "entity") {
	        env.attributes["title"] = env.content.replace(/&amp;/, "&");
	      }
	    });

	    Prism.languages.adoc = Prism.languages.asciidoc;
	  })(Prism);

	  (function (Prism) {
	    // $ set | grep '^[A-Z][^[:space:]]*=' | cut -d= -f1 | tr '\n' '|'
	    // + LC_ALL, RANDOM, REPLY, SECONDS.
	    // + make sure PS1..4 are here as they are not always set,
	    // - some useless things.
	    var envVars = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b";

	    var commandAfterHeredoc = {
	      pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
	      lookbehind: true,
	      alias: "punctuation", // this looks reasonably well in all themes
	      inside: null // see below
	    };

	    var insideString = {
	      bash: commandAfterHeredoc,
	      environment: {
	        pattern: RegExp("\\$" + envVars),
	        alias: "constant"
	      },
	      variable: [
	      // [0]: Arithmetic Environment
	      {
	        pattern: /\$?\(\([\s\S]+?\)\)/,
	        greedy: true,
	        inside: {
	          // If there is a $ sign at the beginning highlight $(( and )) as variable
	          variable: [{
	            pattern: /(^\$\(\([\s\S]+)\)\)/,
	            lookbehind: true
	          }, /^\$\(\(/],
	          number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
	          // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
	          operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
	          // If there is no $ sign at the beginning highlight (( and )) as punctuation
	          punctuation: /\(\(?|\)\)?|,|;/
	        }
	      },
	      // [1]: Command Substitution
	      {
	        pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
	        greedy: true,
	        inside: {
	          variable: /^\$\(|^`|\)$|`$/
	        }
	      },
	      // [2]: Brace expansion
	      {
	        pattern: /\$\{[^}]+\}/,
	        greedy: true,
	        inside: {
	          operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
	          punctuation: /[\[\]]/,
	          environment: {
	            pattern: RegExp("(\\{)" + envVars),
	            lookbehind: true,
	            alias: "constant"
	          }
	        }
	      }, /\$(?:\w+|[#?*!@$])/],
	      // Escape sequences from echo and printf's manuals, and escaped quotes.
	      entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
	    };

	    Prism.languages.bash = {
	      shebang: {
	        pattern: /^#!\s*\/.*/,
	        alias: "important"
	      },
	      comment: {
	        pattern: /(^|[^"{\\$])#.*/,
	        lookbehind: true
	      },
	      "function-name": [
	      // a) function foo {
	      // b) foo() {
	      // c) function foo() {
	      // but not “foo {”
	      {
	        // a) and c)
	        pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
	        lookbehind: true,
	        alias: "function"
	      }, {
	        // b)
	        pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
	        alias: "function"
	      }],
	      // Highlight variable names as variables in for and select beginnings.
	      "for-or-select": {
	        pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
	        alias: "variable",
	        lookbehind: true
	      },
	      // Highlight variable names as variables in the left-hand part
	      // of assignments (“=” and “+=”).
	      "assign-left": {
	        pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
	        inside: {
	          environment: {
	            pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
	            lookbehind: true,
	            alias: "constant"
	          }
	        },
	        alias: "variable",
	        lookbehind: true
	      },
	      string: [
	      // Support for Here-documents https://en.wikipedia.org/wiki/Here_document
	      {
	        pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
	        lookbehind: true,
	        greedy: true,
	        inside: insideString
	      },
	      // Here-document with quotes around the tag
	      // → No expansion (so no “inside”).
	      {
	        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
	        lookbehind: true,
	        greedy: true,
	        inside: {
	          bash: commandAfterHeredoc
	        }
	      },
	      // “Normal” string
	      {
	        // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
	        pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
	        lookbehind: true,
	        greedy: true,
	        inside: insideString
	      }, {
	        // https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
	        pattern: /(^|[^$\\])'[^']*'/,
	        lookbehind: true,
	        greedy: true
	      }, {
	        // https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
	        pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
	        greedy: true,
	        inside: {
	          entity: insideString.entity
	        }
	      }],
	      environment: {
	        pattern: RegExp("\\$?" + envVars),
	        alias: "constant"
	      },
	      variable: insideString.variable,
	      function: {
	        pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
	        lookbehind: true
	      },
	      keyword: {
	        pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
	        lookbehind: true
	      },
	      // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
	      builtin: {
	        pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
	        lookbehind: true,
	        // Alias added to make those easier to distinguish from strings.
	        alias: "class-name"
	      },
	      boolean: {
	        pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
	        lookbehind: true
	      },
	      "file-descriptor": {
	        pattern: /\B&\d\b/,
	        alias: "important"
	      },
	      operator: {
	        // Lots of redirections here, but not just that.
	        pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
	        inside: {
	          "file-descriptor": {
	            pattern: /^\d/,
	            alias: "important"
	          }
	        }
	      },
	      punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
	      number: {
	        pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
	        lookbehind: true
	      }
	    };

	    commandAfterHeredoc.inside = Prism.languages.bash;

	    /* Patterns in command substitution. */
	    var toBeCopied = ["comment", "function-name", "for-or-select", "assign-left", "string", "environment", "function", "keyword", "builtin", "boolean", "file-descriptor", "operator", "punctuation", "number"];
	    var inside = insideString.variable[1].inside;
	    for (var i = 0; i < toBeCopied.length; i++) {
	      inside[toBeCopied[i]] = Prism.languages.bash[toBeCopied[i]];
	    }

	    Prism.languages.shell = Prism.languages.bash;
	  })(Prism);

	  Prism.languages.c = Prism.languages.extend("clike", {
	    comment: {
	      pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
	      greedy: true
	    },
	    "class-name": {
	      pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
	      lookbehind: true
	    },
	    keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
	    function: /\b[a-z_]\w*(?=\s*\()/i,
	    number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
	    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
	  });

	  Prism.languages.insertBefore("c", "string", {
	    macro: {
	      // allow for multiline macro definitions
	      // spaces after the # character compile fine with gcc
	      pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
	      lookbehind: true,
	      greedy: true,
	      alias: "property",
	      inside: {
	        string: [{
	          // highlight the path of the include statement as a string
	          pattern: /^(#\s*include\s*)<[^>]+>/,
	          lookbehind: true
	        }, Prism.languages.c["string"]],
	        comment: Prism.languages.c["comment"],
	        "macro-name": [{
	          pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
	          lookbehind: true
	        }, {
	          pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
	          lookbehind: true,
	          alias: "function"
	        }],
	        // highlight macro directives as keywords
	        directive: {
	          pattern: /^(#\s*)[a-z]+/,
	          lookbehind: true,
	          alias: "keyword"
	        },
	        "directive-hash": /^#/,
	        punctuation: /##|\\(?=[\r\n])/,
	        expression: {
	          pattern: /\S[\s\S]*/,
	          inside: Prism.languages.c
	        }
	      }
	    },
	    // highlight predefined macros as constants
	    constant: /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
	  });

	  delete Prism.languages.c["boolean"];

	  Prism.languages["dns-zone-file"] = {
	    comment: /;.*/,
	    string: {
	      pattern: /"(?:\\.|[^"\\\r\n])*"/,
	      greedy: true
	    },
	    variable: [{
	      pattern: /(^\$ORIGIN[ \t]+)\S+/m,
	      lookbehind: true
	    }, {
	      pattern: /(^|\s)@(?=\s|$)/,
	      lookbehind: true
	    }],
	    keyword: /^\$(?:INCLUDE|ORIGIN|TTL)(?=\s|$)/m,
	    class: {
	      // https://tools.ietf.org/html/rfc1035#page-13
	      pattern: /(^|\s)(?:CH|CS|HS|IN)(?=\s|$)/,
	      lookbehind: true,
	      alias: "keyword"
	    },
	    type: {
	      // https://en.wikipedia.org/wiki/List_of_DNS_record_types
	      pattern: /(^|\s)(?:A|A6|AAAA|AFSDB|APL|ATMA|CAA|CDNSKEY|CDS|CERT|CNAME|DHCID|DLV|DNAME|DNSKEY|DS|EID|GID|GPOS|HINFO|HIP|IPSECKEY|ISDN|KEY|KX|LOC|MAILA|MAILB|MB|MD|MF|MG|MINFO|MR|MX|NAPTR|NB|NBSTAT|NIMLOC|NINFO|NS|NSAP|NSAP-PTR|NSEC|NSEC3|NSEC3PARAM|NULL|NXT|OPENPGPKEY|PTR|PX|RKEY|RP|RRSIG|RT|SIG|SINK|SMIMEA|SOA|SPF|SRV|SSHFP|TA|TKEY|TLSA|TSIG|TXT|UID|UINFO|UNSPEC|URI|WKS|X25)(?=\s|$)/,
	      lookbehind: true,
	      alias: "keyword"
	    },
	    punctuation: /[()]/
	  };

	  Prism.languages["dns-zone"] = Prism.languages["dns-zone-file"];

	  Prism.languages.go = Prism.languages.extend("clike", {
	    string: {
	      pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
	      greedy: true
	    },
	    keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
	    boolean: /\b(?:_|false|iota|nil|true)\b/,
	    number: /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
	    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
	    builtin: /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
	  });
	  delete Prism.languages.go["class-name"];

	  (function (Prism) {
	    var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;

	    // full package (optional) + parent classes (optional)
	    var classNamePrefix = /(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;

	    // based on the java naming conventions
	    var className = {
	      pattern: RegExp(classNamePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
	      lookbehind: true,
	      inside: {
	        namespace: {
	          pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
	          inside: {
	            punctuation: /\./
	          }
	        },
	        punctuation: /\./
	      }
	    };

	    Prism.languages.java = Prism.languages.extend("clike", {
	      "class-name": [className, {
	        // variables and parameters
	        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
	        pattern: RegExp(classNamePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()])/.source),
	        lookbehind: true,
	        inside: className.inside
	      }],
	      keyword: keywords,
	      function: [Prism.languages.clike.function, {
	        pattern: /(::\s*)[a-z_]\w*/,
	        lookbehind: true
	      }],
	      number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
	      operator: {
	        pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
	        lookbehind: true
	      }
	    });

	    Prism.languages.insertBefore("java", "string", {
	      "triple-quoted-string": {
	        // http://openjdk.java.net/jeps/355#Description
	        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
	        greedy: true,
	        alias: "string"
	      }
	    });

	    Prism.languages.insertBefore("java", "class-name", {
	      annotation: {
	        pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
	        lookbehind: true,
	        alias: "punctuation"
	      },
	      generics: {
	        pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
	        inside: {
	          "class-name": className,
	          keyword: keywords,
	          punctuation: /[<>(),.:]/,
	          operator: /[?&|]/
	        }
	      },
	      namespace: {
	        pattern: RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g, function () {
	          return keywords.source;
	        })),
	        lookbehind: true,
	        inside: {
	          punctuation: /\./
	        }
	      }
	    });
	  })(Prism);

	  // https://www.json.org/json-en.html
	  Prism.languages.json = {
	    property: {
	      pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
	      lookbehind: true,
	      greedy: true
	    },
	    string: {
	      pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
	      lookbehind: true,
	      greedy: true
	    },
	    comment: {
	      pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
	      greedy: true
	    },
	    number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	    punctuation: /[{}[\],]/,
	    operator: /:/,
	    boolean: /\b(?:false|true)\b/,
	    null: {
	      pattern: /\bnull\b/,
	      alias: "keyword"
	    }
	  };

	  Prism.languages.webmanifest = Prism.languages.json;

	  Prism.languages.makefile = {
	    comment: {
	      pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
	      lookbehind: true
	    },
	    string: {
	      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
	      greedy: true
	    },

	    // Built-in target names
	    builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,

	    // Targets
	    symbol: {
	      pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
	      inside: {
	        variable: /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/
	      }
	    },
	    variable: /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,

	    keyword: [
	    // Directives
	    /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
	    // Functions
	    {
	      pattern: /(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
	      lookbehind: true
	    }],
	    operator: /(?:::|[?:+!])?=|[|@]/,
	    punctuation: /[:;(){}]/
	  };

	  // Thanks to: https://github.com/prometheus-community/monaco-promql/blob/master/src/promql/promql.ts
	  // As well as: https://kausal.co/blog/slate-prism-add-new-syntax-promql/

	  (function (Prism) {
	    // PromQL Aggregation Operators
	    // (https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)
	    var aggregations = ["sum", "min", "max", "avg", "group", "stddev", "stdvar", "count", "count_values", "bottomk", "topk", "quantile"];

	    // PromQL vector matching + the by and without clauses
	    // (https://prometheus.io/docs/prometheus/latest/querying/operators/#vector-matching)
	    var vectorMatching = ["on", "ignoring", "group_right", "group_left", "by", "without"];

	    // PromQL offset modifier
	    // (https://prometheus.io/docs/prometheus/latest/querying/basics/#offset-modifier)
	    var offsetModifier = ["offset"];

	    var keywords = aggregations.concat(vectorMatching, offsetModifier);

	    Prism.languages.promql = {
	      comment: {
	        pattern: /(^[ \t]*)#.*/m,
	        lookbehind: true
	      },
	      "vector-match": {
	        // Match the comma-separated label lists inside vector matching:
	        pattern: new RegExp("((?:" + vectorMatching.join("|") + ")\\s*)\\([^)]*\\)"),
	        lookbehind: true,
	        inside: {
	          "label-key": {
	            pattern: /\b[^,]+\b/,
	            alias: "attr-name"
	          },
	          punctuation: /[(),]/
	        }
	      },
	      "context-labels": {
	        pattern: /\{[^{}]*\}/,
	        inside: {
	          "label-key": {
	            pattern: /\b[a-z_]\w*(?=\s*(?:=|![=~]))/,
	            alias: "attr-name"
	          },
	          "label-value": {
	            pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
	            greedy: true,
	            alias: "attr-value"
	          },
	          punctuation: /\{|\}|=~?|![=~]|,/
	        }
	      },
	      "context-range": [{
	        pattern: /\[[\w\s:]+\]/, // [1m]
	        inside: {
	          punctuation: /\[|\]|:/,
	          "range-duration": {
	            pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i,
	            alias: "number"
	          }
	        }
	      }, {
	        pattern: /(\boffset\s+)\w+/, // offset 1m
	        lookbehind: true,
	        inside: {
	          "range-duration": {
	            pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i,
	            alias: "number"
	          }
	        }
	      }],
	      keyword: new RegExp("\\b(?:" + keywords.join("|") + ")\\b", "i"),
	      function: /\b[a-z_]\w*(?=\s*\()/i,
	      number: /[-+]?(?:(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[-+]?\d+)?\b|\b(?:0x[0-9a-f]+|nan|inf)\b)/i,
	      operator: /[\^*/%+-]|==|!=|<=|<|>=|>|\b(?:and|or|unless)\b/i,
	      punctuation: /[{};()`,.[\]]/
	    };
	  })(Prism);

	  Prism.languages.python = {
	    comment: {
	      pattern: /(^|[^\\])#.*/,
	      lookbehind: true
	    },
	    "string-interpolation": {
	      pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
	      greedy: true,
	      inside: {
	        interpolation: {
	          // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
	          pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
	          lookbehind: true,
	          inside: {
	            "format-spec": {
	              pattern: /(:)[^:(){}]+(?=\}$)/,
	              lookbehind: true
	            },
	            "conversion-option": {
	              pattern: /![sra](?=[:}]$)/,
	              alias: "punctuation"
	            },
	            rest: null
	          }
	        },
	        string: /[\s\S]+/
	      }
	    },
	    "triple-quoted-string": {
	      pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
	      greedy: true,
	      alias: "string"
	    },
	    string: {
	      pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
	      greedy: true
	    },
	    function: {
	      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
	      lookbehind: true
	    },
	    "class-name": {
	      pattern: /(\bclass\s+)\w+/i,
	      lookbehind: true
	    },
	    decorator: {
	      pattern: /(^[\t ]*)@\w+(?:\.\w+)*/im,
	      lookbehind: true,
	      alias: ["annotation", "punctuation"],
	      inside: {
	        punctuation: /\./
	      }
	    },
	    keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
	    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
	    boolean: /\b(?:False|None|True)\b/,
	    number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?\b/i,
	    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
	    punctuation: /[{}[\];(),.:]/
	  };

	  Prism.languages.python["string-interpolation"].inside["interpolation"].inside.rest = Prism.languages.python;

	  Prism.languages.py = Prism.languages.python;

	  // https://www.freedesktop.org/software/systemd/man/systemd.syntax.html

	  (function (Prism) {
	    var comment = {
	      pattern: /^[;#].*/m,
	      greedy: true
	    };

	    var quotesSource = /"(?:[^\r\n"\\]|\\(?:[^\r]|\r\n?))*"(?!\S)/.source;

	    Prism.languages.systemd = {
	      comment: comment,

	      section: {
	        pattern: /^\[[^\n\r\[\]]*\](?=[ \t]*$)/m,
	        greedy: true,
	        inside: {
	          punctuation: /^\[|\]$/,
	          "section-name": {
	            pattern: /[\s\S]+/,
	            alias: "selector"
	          }
	        }
	      },

	      key: {
	        pattern: /^[^\s=]+(?=[ \t]*=)/m,
	        greedy: true,
	        alias: "attr-name"
	      },
	      value: {
	        // This pattern is quite complex because of two properties:
	        //  1) Quotes (strings) must be preceded by a space. Since we can't use lookbehinds, we have to "resolve"
	        //     the lookbehind. You will see this in the main loop where spaces are handled separately.
	        //  2) Line continuations.
	        //     After line continuations, empty lines and comments are ignored so we have to consume them.
	        pattern: RegExp(/(=[ \t]*(?!\s))/.source +
	        // the value either starts with quotes or not
	        "(?:" + quotesSource + '|(?=[^"\r\n]))' +
	        // main loop
	        "(?:" + (/[^\s\\]/.source +
	        // handle spaces separately because of quotes
	        "|" + '[ \t]+(?:(?![ \t"])|' + quotesSource + ")" +
	        // line continuation
	        "|" + /\\[\r\n]+(?:[#;].*[\r\n]+)*(?![#;])/.source) + ")*"),
	        lookbehind: true,
	        greedy: true,
	        alias: "attr-value",
	        inside: {
	          comment: comment,
	          quoted: {
	            pattern: RegExp(/(^|\s)/.source + quotesSource),
	            lookbehind: true,
	            greedy: true
	          },
	          punctuation: /\\$/m,

	          boolean: {
	            pattern: /^(?:false|no|off|on|true|yes)$/,
	            greedy: true
	          }
	        }
	      },

	      operator: /=/
	    };
	  })(Prism);

	  (function (Prism) {
	    // https://yaml.org/spec/1.2/spec.html#c-ns-anchor-property
	    // https://yaml.org/spec/1.2/spec.html#c-ns-alias-node
	    var anchorOrAlias = /[*&][^\s[\]{},]+/;
	    // https://yaml.org/spec/1.2/spec.html#c-ns-tag-property
	    var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/;
	    // https://yaml.org/spec/1.2/spec.html#c-ns-properties(n,c)
	    var properties = "(?:" + tag.source + "(?:[ \t]+" + anchorOrAlias.source + ")?|" + anchorOrAlias.source + "(?:[ \t]+" + tag.source + ")?)";
	    // https://yaml.org/spec/1.2/spec.html#ns-plain(n,c)
	    // This is a simplified version that doesn't support "#" and multiline keys
	    // All these long scarry character classes are simplified versions of YAML's characters
	    var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function () {
	      return (/[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source
	      );
	    });
	    var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;

	    /**
	     *
	     * @param {string} value
	     * @param {string} [flags]
	     * @returns {RegExp}
	     */
	    function createValuePattern(value, flags) {
	      flags = (flags || "").replace(/m/g, "") + "m"; // add m flag
	      var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function () {
	        return properties;
	      }).replace(/<<value>>/g, function () {
	        return value;
	      });
	      return RegExp(pattern, flags);
	    }

	    Prism.languages.yaml = {
	      scalar: {
	        pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function () {
	          return properties;
	        })),
	        lookbehind: true,
	        alias: "string"
	      },
	      comment: /#.*/,
	      key: {
	        pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function () {
	          return properties;
	        }).replace(/<<key>>/g, function () {
	          return "(?:" + plainKey + "|" + string + ")";
	        })),
	        lookbehind: true,
	        greedy: true,
	        alias: "atrule"
	      },
	      directive: {
	        pattern: /(^[ \t]*)%.+/m,
	        lookbehind: true,
	        alias: "important"
	      },
	      datetime: {
	        pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
	        lookbehind: true,
	        alias: "number"
	      },
	      boolean: {
	        pattern: createValuePattern(/false|true/.source, "i"),
	        lookbehind: true,
	        alias: "important"
	      },
	      null: {
	        pattern: createValuePattern(/null|~/.source, "i"),
	        lookbehind: true,
	        alias: "important"
	      },
	      string: {
	        pattern: createValuePattern(string),
	        lookbehind: true,
	        greedy: true
	      },
	      number: {
	        pattern: createValuePattern(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, "i"),
	        lookbehind: true
	      },
	      tag: tag,
	      important: anchorOrAlias,
	      punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
	    };

	    Prism.languages.yml = Prism.languages.yaml;
	  })(Prism);

	  (function () {
	    if (typeof Prism === "undefined" || typeof document === "undefined") {
	      return;
	    }

	    /**
	     * Plugin name which is used as a class name for <pre> which is activating the plugin
	     *
	     * @type {string}
	     */
	    var PLUGIN_NAME = "line-numbers";

	    /**
	     * Regular expression used for determining line breaks
	     *
	     * @type {RegExp}
	     */
	    var NEW_LINE_EXP = /\n(?!$)/g;

	    /**
	     * Global exports
	     */
	    var config = Prism.plugins.lineNumbers = {
	      /**
	       * Get node for provided line number
	       *
	       * @param {Element} element pre element
	       * @param {number} number line number
	       * @returns {Element|undefined}
	       */
	      getLine: function getLine(element, number) {
	        if (element.tagName !== "PRE" || !element.classList.contains(PLUGIN_NAME)) {
	          return;
	        }

	        var lineNumberRows = element.querySelector(".line-numbers-rows");
	        if (!lineNumberRows) {
	          return;
	        }
	        var lineNumberStart = parseInt(element.getAttribute("data-start"), 10) || 1;
	        var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);

	        if (number < lineNumberStart) {
	          number = lineNumberStart;
	        }
	        if (number > lineNumberEnd) {
	          number = lineNumberEnd;
	        }

	        var lineIndex = number - lineNumberStart;

	        return lineNumberRows.children[lineIndex];
	      },

	      /**
	       * Resizes the line numbers of the given element.
	       *
	       * This function will not add line numbers. It will only resize existing ones.
	       *
	       * @param {HTMLElement} element A `<pre>` element with line numbers.
	       * @returns {void}
	       */
	      resize: function resize(element) {
	        resizeElements([element]);
	      },

	      /**
	       * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
	       * the current viewport.
	       *
	       * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
	       *
	       * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
	       *
	       * @type {boolean}
	       */
	      assumeViewportIndependence: true
	    };

	    /**
	     * Resizes the given elements.
	     *
	     * @param {HTMLElement[]} elements
	     */
	    function resizeElements(elements) {
	      elements = elements.filter(function (e) {
	        var codeStyles = getStyles(e);
	        var whiteSpace = codeStyles["white-space"];
	        return whiteSpace === "pre-wrap" || whiteSpace === "pre-line";
	      });

	      if (elements.length == 0) {
	        return;
	      }

	      var infos = elements.map(function (element) {
	        var codeElement = element.querySelector("code");
	        var lineNumbersWrapper = element.querySelector(".line-numbers-rows");
	        if (!codeElement || !lineNumbersWrapper) {
	          return undefined;
	        }

	        /** @type {HTMLElement} */
	        var lineNumberSizer = element.querySelector(".line-numbers-sizer");
	        var codeLines = codeElement.textContent.split(NEW_LINE_EXP);

	        if (!lineNumberSizer) {
	          lineNumberSizer = document.createElement("span");
	          lineNumberSizer.className = "line-numbers-sizer";

	          codeElement.appendChild(lineNumberSizer);
	        }

	        lineNumberSizer.innerHTML = "0";
	        lineNumberSizer.style.display = "block";

	        var oneLinerHeight = lineNumberSizer.getBoundingClientRect().height;
	        lineNumberSizer.innerHTML = "";

	        return {
	          element: element,
	          lines: codeLines,
	          lineHeights: [],
	          oneLinerHeight: oneLinerHeight,
	          sizer: lineNumberSizer
	        };
	      }).filter(Boolean);

	      infos.forEach(function (info) {
	        var lineNumberSizer = info.sizer;
	        var lines = info.lines;
	        var lineHeights = info.lineHeights;
	        var oneLinerHeight = info.oneLinerHeight;

	        lineHeights[lines.length - 1] = undefined;
	        lines.forEach(function (line, index) {
	          if (line && line.length > 1) {
	            var e = lineNumberSizer.appendChild(document.createElement("span"));
	            e.style.display = "block";
	            e.textContent = line;
	          } else {
	            lineHeights[index] = oneLinerHeight;
	          }
	        });
	      });

	      infos.forEach(function (info) {
	        var lineNumberSizer = info.sizer;
	        var lineHeights = info.lineHeights;

	        var childIndex = 0;
	        for (var i = 0; i < lineHeights.length; i++) {
	          if (lineHeights[i] === undefined) {
	            lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height;
	          }
	        }
	      });

	      infos.forEach(function (info) {
	        var lineNumberSizer = info.sizer;
	        var wrapper = info.element.querySelector(".line-numbers-rows");

	        lineNumberSizer.style.display = "none";
	        lineNumberSizer.innerHTML = "";

	        info.lineHeights.forEach(function (height, lineNumber) {
	          wrapper.children[lineNumber].style.height = height + "px";
	        });
	      });
	    }

	    /**
	     * Returns style declarations for the element
	     *
	     * @param {Element} element
	     */
	    function getStyles(element) {
	      if (!element) {
	        return null;
	      }

	      return window.getComputedStyle ? getComputedStyle(element) : element.currentStyle || null;
	    }

	    var lastWidth = undefined;
	    window.addEventListener("resize", function () {
	      if (config.assumeViewportIndependence && lastWidth === window.innerWidth) {
	        return;
	      }
	      lastWidth = window.innerWidth;

	      resizeElements(Array.prototype.slice.call(document.querySelectorAll("pre." + PLUGIN_NAME)));
	    });

	    Prism.hooks.add("complete", function (env) {
	      if (!env.code) {
	        return;
	      }

	      var code = /** @type {Element} */env.element;
	      var pre = /** @type {HTMLElement} */code.parentNode;

	      // works only for <code> wrapped inside <pre> (not inline)
	      if (!pre || !/pre/i.test(pre.nodeName)) {
	        return;
	      }

	      // Abort if line numbers already exists
	      if (code.querySelector(".line-numbers-rows")) {
	        return;
	      }

	      // only add line numbers if <code> or one of its ancestors has the `line-numbers` class
	      if (!Prism.util.isActive(code, PLUGIN_NAME)) {
	        return;
	      }

	      // Remove the class 'line-numbers' from the <code>
	      code.classList.remove(PLUGIN_NAME);
	      // Add the class 'line-numbers' to the <pre>
	      pre.classList.add(PLUGIN_NAME);

	      var match = env.code.match(NEW_LINE_EXP);
	      var linesNum = match ? match.length + 1 : 1;
	      var lineNumbersWrapper;

	      var lines = new Array(linesNum + 1).join("<span></span>");

	      lineNumbersWrapper = document.createElement("span");
	      lineNumbersWrapper.setAttribute("aria-hidden", "true");
	      lineNumbersWrapper.className = "line-numbers-rows";
	      lineNumbersWrapper.innerHTML = lines;

	      if (pre.hasAttribute("data-start")) {
	        pre.style.counterReset = "linenumber " + (parseInt(pre.getAttribute("data-start"), 10) - 1);
	      }

	      env.element.appendChild(lineNumbersWrapper);

	      resizeElements([pre]);

	      Prism.hooks.run("line-numbers", env);
	    });

	    Prism.hooks.add("line-numbers", function (env) {
	      env.plugins = env.plugins || {};
	      env.plugins.lineNumbers = true;
	    });
	  })();

	  (function () {
	    if (typeof Prism === "undefined" || typeof document === "undefined" || !document.createRange) {
	      return;
	    }

	    Prism.plugins.KeepMarkup = true;

	    Prism.hooks.add("before-highlight", function (env) {
	      if (!env.element.children.length) {
	        return;
	      }

	      if (!Prism.util.isActive(env.element, "keep-markup", true)) {
	        return;
	      }

	      var pos = 0;
	      var data = [];
	      var f = function f(elt, baseNode) {
	        var o = {};
	        if (!baseNode) {
	          // Clone the original tag to keep all attributes
	          o.clone = elt.cloneNode(false);
	          o.posOpen = pos;
	          data.push(o);
	        }
	        for (var i = 0, l = elt.childNodes.length; i < l; i++) {
	          var child = elt.childNodes[i];
	          if (child.nodeType === 1) {
	            // element
	            f(child);
	          } else if (child.nodeType === 3) {
	            // text
	            pos += child.data.length;
	          }
	        }
	        if (!baseNode) {
	          o.posClose = pos;
	        }
	      };
	      f(env.element, true);

	      if (data && data.length) {
	        // data is an array of all existing tags
	        env.keepMarkup = data;
	      }
	    });

	    Prism.hooks.add("after-highlight", function (env) {
	      if (env.keepMarkup && env.keepMarkup.length) {
	        var walk = function walk(elt, nodeState) {
	          for (var i = 0, l = elt.childNodes.length; i < l; i++) {
	            var child = elt.childNodes[i];

	            if (child.nodeType === 1) {
	              // element
	              if (!walk(child, nodeState)) {
	                return false;
	              }
	            } else if (child.nodeType === 3) {
	              // text
	              if (!nodeState.nodeStart && nodeState.pos + child.data.length > nodeState.node.posOpen) {
	                // We found the start position
	                nodeState.nodeStart = child;
	                nodeState.nodeStartPos = nodeState.node.posOpen - nodeState.pos;
	              }
	              if (nodeState.nodeStart && nodeState.pos + child.data.length >= nodeState.node.posClose) {
	                // We found the end position
	                nodeState.nodeEnd = child;
	                nodeState.nodeEndPos = nodeState.node.posClose - nodeState.pos;
	              }

	              nodeState.pos += child.data.length;
	            }

	            if (nodeState.nodeStart && nodeState.nodeEnd) {
	              // Select the range and wrap it with the clone
	              var range = document.createRange();
	              range.setStart(nodeState.nodeStart, nodeState.nodeStartPos);
	              range.setEnd(nodeState.nodeEnd, nodeState.nodeEndPos);
	              nodeState.node.clone.appendChild(range.extractContents());
	              range.insertNode(nodeState.node.clone);
	              range.detach();

	              // Process is over
	              return false;
	            }
	          }
	          return true;
	        };

	        // For each tag, we walk the DOM to reinsert it
	        env.keepMarkup.forEach(function (node) {
	          walk(env.element, {
	            node: node,
	            pos: 0
	          });
	        });
	        // Store new highlightedCode for later hooks calls
	        env.highlightedCode = env.element.innerHTML;
	      }
	    });
	  })();
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	/*!
	 * PatternFly Elements: PfeDocumentation 0.1.60
	 * @license
	 * Copyright 2020 Red Hat, Inc.
	 * 
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 * 
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 * 
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 * 
	*/
	prism.manual = true;

	// Closest Polyfill
	// from: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
	if (!Element.prototype.matches) {
	  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	if (!Element.prototype.closest) {
	  Element.prototype.closest = function (s) {
	    var el = this;

	    do {
	      if (Element.prototype.matches.call(el, s)) return el;
	      el = el.parentElement || el.parentNode;
	    } while (el !== null && el.nodeType === 1);
	    return null;
	  };
	}

	/**
	 * ChildNode.append() polyfill
	 * https://gomakethings.com/adding-an-element-to-the-end-of-a-set-of-elements-with-vanilla-javascript/
	 * @author Chris Ferdinandi
	 * @license MIT
	 */
	(function (arr) {
	  arr.forEach(function (item) {
	    if (item.hasOwnProperty("prepend")) {
	      return;
	    }
	    Object.defineProperty(item, "prepend", {
	      configurable: true,
	      enumerable: true,
	      writable: true,
	      value: function prepend() {
	        var argArr = Array.prototype.slice.call(arguments),
	            docFrag = document.createDocumentFragment();

	        argArr.forEach(function (argItem) {
	          var isNode = argItem instanceof Node;
	          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
	        });

	        this.insertBefore(docFrag, this.firstChild);
	      }
	    });
	  });
	})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

	/**
	 * Prepend Polyfill
	 * @see https://vanillajstoolkit.com/polyfills/prepend/
	 * ChildNode.prepend() polyfill
	 * https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
	 */
	(function (arr) {
	  arr.forEach(function (item) {
	    if (item.hasOwnProperty("prepend")) {
	      return;
	    }
	    Object.defineProperty(item, "prepend", {
	      configurable: true,
	      enumerable: true,
	      writable: true,
	      value: function prepend() {
	        var argArr = Array.prototype.slice.call(arguments),
	            docFrag = document.createDocumentFragment();

	        argArr.forEach(function (argItem) {
	          var isNode = argItem instanceof Node;
	          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
	        });

	        this.insertBefore(docFrag, this.firstChild);
	      }
	    });
	  });
	})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

	/**
	 * Includes Polyfill
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#polyfill
	 */
	if (!String.prototype.includes) {
	  String.prototype.includes = function (search, start) {

	    if (search instanceof RegExp) {
	      throw TypeError("first argument must not be a RegExp");
	    }
	    if (start === undefined) {
	      start = 0;
	    }
	    return this.indexOf(search, start) !== -1;
	  };
	}

	/**
	 * Debounce helper function
	 * @see https://davidwalsh.name/javascript-debounce-function
	 *
	 * @param {function} func Function to be debounced
	 * @param {number} delay How long until it will be run
	 * @param {boolean} immediate Whether it should be run at the start instead of the end of the debounce
	 */
	function debounce(func, delay) {
	  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var timeout;
	  return function () {
	    var context = this,
	        args = arguments;
	    var later = function later() {
	      timeout = null;
	      if (!immediate) func.apply(context, args);
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, delay);
	    if (callNow) func.apply(context, args);
	  };
	}

	// Config for mutation observer to see if things change inside of the component
	var lightDomObserverConfig = {
	  characterData: true,
	  // attributes: true,
	  subtree: true,
	  childList: true
	};

	var PfeDocumentation = function (_PFElement) {
	  inherits(PfeDocumentation, _PFElement);
	  createClass(PfeDocumentation, [{
	    key: "html",
	    get: function get$$1() {
	      return "<style>code[class*=language-],pre[class*=language-]{color:#151515;-moz-tab-size:4;-o-tab-size:4;tab-size:4}code.language-none,code.language-text,code.language-txt,pre.language-none,pre.language-text,pre.language-txt{color:#151515}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{background:#cceae7;color:#263238}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{background:#cceae7;color:#263238}:not(pre)>code[class*=language-]{white-space:normal;border-radius:.2em;padding:.1em}pre[class*=language-]{overflow:auto;position:relative;margin:.5em 0;padding:1.25em 1em}.language-css>code,.language-sass>code,.language-scss>code{color:#b300b3}[class*=language-] .namespace{opacity:.7}.token.atrule{color:#40199a}.token.attr-name{color:#06c}.token.attr-value{color:#b300b3}.token.attribute{color:#b300b3}.token.boolean{color:#40199a}.token.builtin{color:#06c}.token.cdata{color:#06c}.token.char{color:#06c}.token.class{color:#06c}.token.class-name{color:#06c}.token.comment{color:#6a6e73}.token.constant{color:#40199a}.token.deleted{color:#c9190b}.token.doctype{color:#6a6e73}.token.entity{color:#c9190b}.token.function{color:#40199a}.token.hexcode{color:#b300b3}.token.id{color:#40199a;font-weight:700}.token.important{color:#40199a;font-weight:700}.token.inserted{color:#06c}.token.keyword{color:#40199a}.token.number{color:#b300b3}.token.operator{color:#06c}.token.prolog{color:#6a6e73}.token.property{color:#06c}.token.pseudo-class{color:#b300b3}.token.pseudo-element{color:#b300b3}.token.punctuation{color:#06c}.token.regex{color:#06c}.token.selector{color:#c9190b}.token.string{color:#b300b3}.token.symbol{color:#40199a}.token.tag{color:#c9190b}.token.unit{color:#b300b3}.token.url{color:#c9190b}.token.variable{color:#c9190b}:host{display:block}:host([hidden]){display:none}:host([pfe-c-non-prod]) abbr[style],:host([pfe-c-non-prod]) address[style],:host([pfe-c-non-prod]) article[style],:host([pfe-c-non-prod]) aside[style],:host([pfe-c-non-prod]) b[style],:host([pfe-c-non-prod]) blockquote[style],:host([pfe-c-non-prod]) body[style],:host([pfe-c-non-prod]) canvas[style],:host([pfe-c-non-prod]) caption[style],:host([pfe-c-non-prod]) cite[style],:host([pfe-c-non-prod]) code[style],:host([pfe-c-non-prod]) dd[style],:host([pfe-c-non-prod]) del[style],:host([pfe-c-non-prod]) details[style],:host([pfe-c-non-prod]) dfn[style],:host([pfe-c-non-prod]) div[style],:host([pfe-c-non-prod]) dl[style],:host([pfe-c-non-prod]) dt[style],:host([pfe-c-non-prod]) em[style],:host([pfe-c-non-prod]) fieldset[style],:host([pfe-c-non-prod]) figcaption[style],:host([pfe-c-non-prod]) figure[style],:host([pfe-c-non-prod]) footer[style],:host([pfe-c-non-prod]) form[style],:host([pfe-c-non-prod]) h1[style],:host([pfe-c-non-prod]) h2[style],:host([pfe-c-non-prod]) h3[style],:host([pfe-c-non-prod]) h4[style],:host([pfe-c-non-prod]) h5[style],:host([pfe-c-non-prod]) h6[style],:host([pfe-c-non-prod]) header[style],:host([pfe-c-non-prod]) hgroup[style],:host([pfe-c-non-prod]) html[style],:host([pfe-c-non-prod]) i[style],:host([pfe-c-non-prod]) iframe[style],:host([pfe-c-non-prod]) ins[style],:host([pfe-c-non-prod]) kbd[style],:host([pfe-c-non-prod]) label[style],:host([pfe-c-non-prod]) legend[style],:host([pfe-c-non-prod]) li[style],:host([pfe-c-non-prod]) mark[style],:host([pfe-c-non-prod]) menu[style],:host([pfe-c-non-prod]) nav[style],:host([pfe-c-non-prod]) object[style],:host([pfe-c-non-prod]) ol[style],:host([pfe-c-non-prod]) p[style],:host([pfe-c-non-prod]) pre[style],:host([pfe-c-non-prod]) q[style],:host([pfe-c-non-prod]) samp[style],:host([pfe-c-non-prod]) section[style],:host([pfe-c-non-prod]) small[style],:host([pfe-c-non-prod]) span[style],:host([pfe-c-non-prod]) strong[style],:host([pfe-c-non-prod]) sub[style],:host([pfe-c-non-prod]) summary[style],:host([pfe-c-non-prod]) sup[style],:host([pfe-c-non-prod]) table[style],:host([pfe-c-non-prod]) tbody[style],:host([pfe-c-non-prod]) td[style],:host([pfe-c-non-prod]) tfoot[style],:host([pfe-c-non-prod]) th[style],:host([pfe-c-non-prod]) thead[style],:host([pfe-c-non-prod]) time[style],:host([pfe-c-non-prod]) tr[style],:host([pfe-c-non-prod]) ul[style],:host([pfe-c-non-prod]) var[style]{border:2px solid #c9190b}:host([pfe-c-non-prod]) abbr[style]:before,:host([pfe-c-non-prod]) address[style]:before,:host([pfe-c-non-prod]) article[style]:before,:host([pfe-c-non-prod]) aside[style]:before,:host([pfe-c-non-prod]) b[style]:before,:host([pfe-c-non-prod]) blockquote[style]:before,:host([pfe-c-non-prod]) body[style]:before,:host([pfe-c-non-prod]) canvas[style]:before,:host([pfe-c-non-prod]) caption[style]:before,:host([pfe-c-non-prod]) cite[style]:before,:host([pfe-c-non-prod]) code[style]:before,:host([pfe-c-non-prod]) dd[style]:before,:host([pfe-c-non-prod]) del[style]:before,:host([pfe-c-non-prod]) details[style]:before,:host([pfe-c-non-prod]) dfn[style]:before,:host([pfe-c-non-prod]) div[style]:before,:host([pfe-c-non-prod]) dl[style]:before,:host([pfe-c-non-prod]) dt[style]:before,:host([pfe-c-non-prod]) em[style]:before,:host([pfe-c-non-prod]) fieldset[style]:before,:host([pfe-c-non-prod]) figcaption[style]:before,:host([pfe-c-non-prod]) figure[style]:before,:host([pfe-c-non-prod]) footer[style]:before,:host([pfe-c-non-prod]) form[style]:before,:host([pfe-c-non-prod]) h1[style]:before,:host([pfe-c-non-prod]) h2[style]:before,:host([pfe-c-non-prod]) h3[style]:before,:host([pfe-c-non-prod]) h4[style]:before,:host([pfe-c-non-prod]) h5[style]:before,:host([pfe-c-non-prod]) h6[style]:before,:host([pfe-c-non-prod]) header[style]:before,:host([pfe-c-non-prod]) hgroup[style]:before,:host([pfe-c-non-prod]) html[style]:before,:host([pfe-c-non-prod]) i[style]:before,:host([pfe-c-non-prod]) iframe[style]:before,:host([pfe-c-non-prod]) ins[style]:before,:host([pfe-c-non-prod]) kbd[style]:before,:host([pfe-c-non-prod]) label[style]:before,:host([pfe-c-non-prod]) legend[style]:before,:host([pfe-c-non-prod]) li[style]:before,:host([pfe-c-non-prod]) mark[style]:before,:host([pfe-c-non-prod]) menu[style]:before,:host([pfe-c-non-prod]) nav[style]:before,:host([pfe-c-non-prod]) object[style]:before,:host([pfe-c-non-prod]) ol[style]:before,:host([pfe-c-non-prod]) p[style]:before,:host([pfe-c-non-prod]) pre[style]:before,:host([pfe-c-non-prod]) q[style]:before,:host([pfe-c-non-prod]) samp[style]:before,:host([pfe-c-non-prod]) section[style]:before,:host([pfe-c-non-prod]) small[style]:before,:host([pfe-c-non-prod]) span[style]:before,:host([pfe-c-non-prod]) strong[style]:before,:host([pfe-c-non-prod]) sub[style]:before,:host([pfe-c-non-prod]) summary[style]:before,:host([pfe-c-non-prod]) sup[style]:before,:host([pfe-c-non-prod]) table[style]:before,:host([pfe-c-non-prod]) tbody[style]:before,:host([pfe-c-non-prod]) td[style]:before,:host([pfe-c-non-prod]) tfoot[style]:before,:host([pfe-c-non-prod]) th[style]:before,:host([pfe-c-non-prod]) thead[style]:before,:host([pfe-c-non-prod]) time[style]:before,:host([pfe-c-non-prod]) tr[style]:before,:host([pfe-c-non-prod]) ul[style]:before,:host([pfe-c-non-prod]) var[style]:before{display:block;min-width:320px;max-width:100vw;padding:.5em 1em;background:#fee;content:\"WARNING: This -moz-element has inline styles which can easily break layout on mobile or other contexts. The inline style is \" attr(style);content:\"WARNING: This element has inline styles which can easily break layout on mobile or other contexts. The inline style is \" attr(style)}.warning-message{display:block;min-width:320px;max-width:100vw;padding:.5em 1em;background:#fee}\n/*# sourceMappingURL=cp-documentation.min.css.map */\n</style><div id=\"wrapper\" class=\"rhdocs\"></div>";
	    }
	  }, {
	    key: "templateUrl",
	    get: function get$$1() {
	      return "cp-documentation.html";
	    }
	  }, {
	    key: "styleUrl",
	    get: function get$$1() {
	      return "cp-documentation.scss";
	    }
	  }], [{
	    key: "version",
	    get: function get$$1() {
	      return "0.1.60";
	    }
	  }, {
	    key: "tag",
	    get: function get$$1() {
	      return "cp-documentation";
	    }
	  }, {
	    key: "properties",
	    get: function get$$1() {
	      return {};
	    }
	  }, {
	    key: "slots",
	    get: function get$$1() {
	      return {};
	    }
	  }]);

	  function PfeDocumentation() {
	    classCallCheck(this, PfeDocumentation);

	    // Ensure 'this' is tied to the component object in these member functions
	    var _this = possibleConstructorReturn(this, (PfeDocumentation.__proto__ || Object.getPrototypeOf(PfeDocumentation)).call(this, PfeDocumentation, { type: PfeDocumentation.PfeType }));

	    _this._processLightDom = _this._processLightDom.bind(_this);
	    _this._isDevelopment = _this._isDevelopment.bind(_this);
	    _this._addStyleSheet = _this._addStyleSheet.bind(_this);
	    _this._loadCss = _this._loadCss.bind(_this);
	    _this.loadData = _this.loadData.bind(_this);
	    _this.getData = _this.getData.bind(_this);
	    _this._navigationHandler = _this._navigationHandler.bind(_this);
	    _this._loadChildModules = _this._loadChildModules.bind(_this);
	    _this._addIncludedInGuides = _this._addIncludedInGuides.bind(_this);
	    _this._processCodeblock = _this._processCodeblock.bind(_this);
	    _this._setupTableOfContents = _this._setupTableOfContents.bind(_this);
	    _this._updateSectionPositions = _this._updateSectionPositions.bind(_this);
	    _this._highlightVisibleSection = _this._highlightVisibleSection.bind(_this);
	    _this._postResize = _this._postResize.bind(_this);
	    _this._isOneColumnLayout = _this._isOneColumnLayout.bind(_this);

	    // Setup mutation observer to watch for content changes
	    _this._observer = new MutationObserver(_this._processLightDom);

	    // Initialize variables to be used later
	    _this._contentData = {};
	    _this._plainCodeBlockContent = {};
	    _this._contentType = null;
	    _this._scrollSpying = false;
	    _this._sections = {};
	    _this._scrollDebounce = 50;
	    _this._resizeDebounce = 250;
	    _this._lastOneColumnLayoutCheck = {
	      value: null, // Boolean
	      lastCheck: -1 // Stores the window width last time we checked the layout
	    };

	    _this._scrollListener = debounce(_this._highlightVisibleSection, _this._scrollDebounce);
	    _this._resizeListener = debounce(_this._postResize, _this._resizeDebounce);
	    return _this;
	  }

	  createClass(PfeDocumentation, [{
	    key: "connectedCallback",
	    value: function connectedCallback() {
	      get(PfeDocumentation.prototype.__proto__ || Object.getPrototypeOf(PfeDocumentation.prototype), "connectedCallback", this).call(this);
	      // Make sure content has default styles, or the stylesheet provided as the pfe-css attribute
	      if (this.hasAttribute("pfe-css")) {
	        this._loadCss();
	      } else {
	        // Default to prod stylesheet path
	        var rhdocsUrl = "/webassets/avalon/j/public_modules/node_modules/@cpelements/cp-documentation/dist/rhdocs.min.css";

	        // Find the loadedStylesheet for rhdocs[.min].css and load it in the shadow DOM
	        for (var index = 0; index < document.styleSheets.length; index++) {
	          var styleSheet = document.styleSheets[index];
	          if (styleSheet.href && styleSheet.href.includes("/rhdocs.")) {
	            // Get the exact same href so we get the cached file instead of hitting the network
	            rhdocsUrl = styleSheet.ownerNode.getAttribute("href");
	            break;
	          }
	        }

	        // Setting up pointers to commonly used elements
	        this._sidebarPrimary;
	        this._contentWrapper;

	        this._addStyleSheet(rhdocsUrl);
	      }

	      // Get the content data
	      if ((typeof drupalSettings === "undefined" ? "undefined" : _typeof(drupalSettings)) === "object" && drupalSettings.red_hat_fcc) {
	        // We have content data from Drupal
	        if (typeof drupalSettings.red_hat_fcc.content_metadata === "string") {
	          this._contentData = JSON.parse(drupalSettings.red_hat_fcc.content_metadata);
	        } else if (_typeof(drupalSettings.red_hat_fcc.content_metadata) === "object") {
	          this._contentData = drupalSettings.red_hat_fcc.content_metadata;
	        }
	        this._contentType = this._contentData.content_type;
	        // if (this._contentData.content_type === "assembly") {
	        //   this._loadChildModules();
	        // }
	      } else if (window.location.host.includes("access.") && window.location.host.substring(-11) === ".redhat.com") {
	        // Get content data by getting the current content's ID and fetching from the API
	        this._contentType = document.querySelector(".rhdocs__header--assembly") ? "assembly" : "module";
	        // const pathArray = window.location.pathname.split("/");
	        // const canonicalId = pathArray[pathArray.length - 1];

	        // Get domain for API Call
	        // let portalDomain = null;
	        // if (this._isDevelopment()) {
	        //   portalDomain = "pantheon.corp.qa.redhat.com";
	        // } else if (typeof window.portal === "object") {
	        //   switch (window.portal.host) {
	        //     case "https://access.dev.redhat.com":
	        //       portalDomain = "pantheon.corp.dev.redhat.com";
	        //       break;
	        //     case "https://access.qa.redhat.com":
	        //       portalDomain = "pantheon.corp.qa.redhat.com";
	        //       break;
	        //     case "https://access.stage.redhat.com":
	        //       portalDomain = "pantheon.corp.stage.redhat.com";
	        //       break;
	        //     default:
	        //       portalDomain = "api.docs.redhat.com";
	        //   }
	        // }
	        // if (typeof fetch === 'function' && portalDomain && this._contentType && canonicalId) {
	        //   let fetchUrl = `https://${portalDomain}/api/${this._contentType}/variant.json/${canonicalId}`;

	        //   // @todo Remove this when not in dev
	        //   // if (window.location.host.includes('wruvalca')) {
	        //   //   fetchUrl = `/api/${ this._contentType }/variant.json/${ canonicalId }`;
	        //   // }

	        //   fetch(fetchUrl)
	        //     .then(response => response.json())
	        //     .then(data => {
	        //       if (
	        //         data.status === 200 &&
	        //         typeof data[this._contentType] === "object"
	        //       ) {
	        //         this._contentData = data[this._contentType];
	        //         if (this._contentType === "assembly") {
	        //           this._loadChildModules();
	        //         }
	        //       }
	        //     })
	        //     .catch(error => console.error(error));
	        // }
	      }

	      if (document.querySelector(".rh-docs__sidebar")) {
	        this.classList.add("pfe-documentation--next-to-sidebar");
	      }

	      // We're getting empty preambles at the top of documents which causes styling issues
	      // @todo Catch empty pre-ambles in render instead of in client
	      var preamble = this.querySelector("#rhdocs-preamble");
	      // See if preamble is empty
	      if (preamble && !preamble.textContent.trim()) {
	        // Save any anchors
	        var anchors = preamble.querySelectorAll(".pantheon-anchor-div");
	        if (anchors.length) {
	          for (var _index = anchors.length - 1; _index >= 0; _index--) {
	            var anchor = anchors[_index];
	            preamble.nextElementSibling.prepend(anchor);
	          }
	        }
	        // Remove the empty preamble
	        preamble.remove();
	      }

	      this._processLightDom();

	      window.addEventListener("resize", this._resizeListener);

	      this._observer.observe(this, lightDomObserverConfig);

	      // Make sure anchors are respected (id's in shadow roots don't work automagically)
	      if (window.location.hash) {
	        window.addEventListener("load", this._navigationHandler);
	      }

	      // Add class for styling
	      if (this.parentElement.classList.contains("rh-docs__content-wrapper") && document.getElementById("rhdocs-header-external")) {
	        this.classList.add("cp-documentation--has-external-header");
	      }

	      window.addEventListener("hashchange", this._navigationHandler);
	    }
	  }, {
	    key: "disconnectedCallback",
	    value: function disconnectedCallback() {
	      // Clean up after ourselves
	      window.removeEventListener("load", this._navigationHandler);
	      window.removeEventListener("hashchange", this._navigationHandler);
	      this._observer.disconnect();
	      window.removeEventListener("scroll", this._scrollListener);
	      window.removeEventListener("resize", this._resizeListener);
	    }
	  }, {
	    key: "attributeChangedCallback",
	    value: function attributeChangedCallback(attr, oldVal, newVal) {
	      get(PfeDocumentation.prototype.__proto__ || Object.getPrototypeOf(PfeDocumentation.prototype), "attributeChangedCallback", this).call(this, attr, oldVal, newVal);

	      switch (attr) {
	        case "pfe-endpoint":
	          this.loadData();
	          break;
	      }
	    }

	    /**
	     * Feature test for important web component tech
	     * @returns {boolean} Returns true if the browser doesn't support shadow DOM
	     */

	  }, {
	    key: "_isCrustyBrowser",
	    value: function _isCrustyBrowser() {
	      return window.ShadyCSS && !window.ShadyCSS.nativeShadow;
	    }

	    /**
	     * Takes URL's from the Pantheon API and makes sure they aren't pointing to origin, but instead an akamai enabled environment
	     * @param {string} urlToFix URL
	     * @returns {string} Fixed URL with proper domain
	     */

	  }, {
	    key: "_portalEnvironmentFix",
	    value: function _portalEnvironmentFix(urlToFix) {
	      // @todo Make this regex?
	      urlToFix = urlToFix.replace("http://", "https://");

	      urlToFix = urlToFix.replace("pantheon2-dev.int.us-east.aws.preprod.paas.redhat.com", "pantheon.corp.dev.redhat.com");

	      urlToFix = urlToFix.replace("pantheon2-qa.int.us-east.aws.preprod.paas.redhat.com", "pantheon.corp.qa.redhat.com");

	      urlToFix = urlToFix.replace("pantheon2-stage.int.us-east.aws.preprod.paas.redhat.com", "pantheon.corp.stage.redhat.com");

	      urlToFix = urlToFix.replace("pantheon2-proxy.ext.us-west.aws.prod.paas.redhat.com", "api.docs.redhat.com");

	      // @todo Comment out code when comitted
	      if (window.location.host.includes("wruvalca") || window.location.host.includes(".foo.")) {
	        urlToFix = urlToFix.substring(urlToFix.indexOf("/api"));
	      }

	      return urlToFix;
	    }
	  }, {
	    key: "_isDevelopment",
	    value: function _isDevelopment() {
	      return this.hasAttribute("debug");
	    }

	    /**
	     * Handle any navigation action that points to an element in this element
	     */

	  }, {
	    key: "_navigationHandler",
	    value: function _navigationHandler() {
	      var anchorLinkTarget = this.shadowRoot.getElementById(window.location.hash.substring(1));
	      if (anchorLinkTarget) {
	        // Offset top may be an issue, if so see:
	        // https://medium.com/@alexcambose/js-offsettop-property-is-not-great-and-here-is-why-bq9842ef7582
	        window.scrollTo(window.scrollX, anchorLinkTarget.offsetTop);
	      }
	    }

	    /**
	     * Create Related Content Wrapper
	     * @param {string} relatedContentType Is this content wrapper attached to a guide or topic
	     * @returns {array} 0 index is outer wrapper DOM Object, 1 is content wrapper DOM Object
	     */

	  }, {
	    key: "_createRelatedContentWrapper",
	    value: function _createRelatedContentWrapper(contentType) {
	      if (typeof contentType !== "string") {
	        contentType = "topic";
	      }
	      var wrapper = document.createElement("details");
	      var title = document.createElement("summary");
	      var innerWrapper = document.createElement("div");

	      wrapper.classList.add("related-topic-content__wrapper");
	      if (contentType === "guide") {
	        wrapper.classList.add("related-topic-content__wrapper--for-guide");
	        wrapper.setAttribute("open", "");
	      }
	      title.classList.add("related-topic-content__title");
	      innerWrapper.classList.add("related-topic-content__inner-wrapper");

	      // @todo Make this string translatable
	      title.innerText = "Content related to this " + contentType;
	      wrapper.append(title);
	      wrapper.append(innerWrapper);

	      return [wrapper, innerWrapper];
	    }

	    /**
	     * Creates Print Button
	     * @returns [object] DOM Object to be inserted into DOM
	     */

	  }, {
	    key: "_createPrintButton",
	    value: function _createPrintButton() {
	      var printButton = document.createElement("button");
	      // @todo Translate this
	      printButton.innerText = "Print";
	      printButton.classList.add("rhdocs__print-button");

	      printButton.addEventListener("click", function () {
	        // @todo Add analytics
	        window.print();
	      });

	      return printButton;
	    }

	    /**
	     * Add syntax highlighting and features to code blocks
	     * @param {HTMLElement} codeBlock Pre tag or element with language-* class
	     */

	  }, {
	    key: "_processCodeblock",
	    value: function _processCodeblock(codeBlock) {
	      var _this2 = this;

	      // Quick exit if this has been processed already
	      if (codeBlock.classList.contains("codeblock--processed")) {
	        return;
	      }

	      var codeBlockClasses = codeBlock.getAttribute("class");
	      var codeBlockClassesArray = codeBlockClasses ? codeBlockClasses.split(" ") : undefined;
	      // Adding a hidden copy of the un-upgraded code content to the DOM, may be unecessary
	      var plainCodeBlock = document.createElement("pre");

	      // Figure out code's language
	      var language = "none"; // Default to none

	      // Iterate over class names and find code language
	      var getLanguageClass = function getLanguageClass(classesArray) {
	        if (classesArray) {
	          for (var index = 0; index < classesArray.length; index++) {
	            var className = classesArray[index];
	            if (className.substring(0, 9) === "language-") {
	              language = className.substring(9).toLowerCase();
	              return className;
	            }
	          }
	        }
	      };

	      // Keeps track of the provided language class, which may need to be removed
	      var languageClass = getLanguageClass(codeBlockClassesArray);

	      // Make sure we're dealing with a pre element, which could be the element or it's parent
	      if (codeBlock.tagName.toLowerCase() !== "pre") {
	        if (codeBlock.parentElement && codeBlock.parentElement.tagName.toLowerCase() === "pre") {
	          codeBlock = codeBlock.parentElement;
	        } else {
	          // If the element or it's parent isn't a pre-tag don't format it
	          return;
	        }
	      }

	      var codeBlockWrapper = codeBlock.parentElement;

	      // Create a copy without the syntax highlighting or HTML and annotations removed
	      var plainCodeBlockId = "codeblock--plain--" + Math.random().toString(36).substr(2, 9);

	      // Remove any annotations from the code block for the copy button
	      // Users don't want to copy artifacts from the docs, just the code
	      var codeBlockClone = codeBlock.cloneNode(true);
	      var codeBlockAnnotations = codeBlockClone.querySelectorAll(".colist-num");
	      for (var index = 0; index < codeBlockAnnotations.length; index++) {
	        var codeBlockAnnotation = codeBlockAnnotations[index];
	        // @todo IE
	        codeBlockAnnotation.remove();
	      }
	      // Use this cleaned up code for the copy content
	      var contentToCopy = codeBlockClone.innerText;

	      // Remove prompt from copy value if we have one
	      switch (language) {
	        case "none":
	        case "terminal":
	        case "shell":
	          var contentToCopyTrimmed = contentToCopy.trim();
	          var promptIndex = -1;
	          if (contentToCopyTrimmed.indexOf("# ") === 0) {
	            // Get non-trimmed index
	            promptIndex = contentToCopy.indexOf("# ");
	          } else if (contentToCopyTrimmed.indexOf("$ ") === 0) {
	            // Get non-trimmed index
	            promptIndex = contentToCopy.indexOf("$ ");
	          }

	          if (promptIndex > -1) {
	            contentToCopy = contentToCopy.substr(promptIndex + 2);
	            codeBlockClone.innerText = contentToCopy;
	          }
	          break;
	      }

	      this._plainCodeBlockContent[plainCodeBlockId] = contentToCopy;
	      plainCodeBlock.hidden = true;
	      plainCodeBlock.id = plainCodeBlockId;
	      plainCodeBlock.classList.add("codeblock--plain");

	      // For some reason, sometimes parentElement doesn't exist??
	      if (codeBlockWrapper && !codeBlockWrapper.classList.contains("codeblock__wrapper")) {
	        var codeBlockInnerWrapper = document.createElement("div");
	        // Necessary becase of FF bug: https://codepen.io/wesruv/full/dyzxMzW
	        codeBlockInnerWrapper.classList.add("codeblock__inner-wrapper");
	        codeBlockWrapper.classList.add("codeblock__wrapper");
	        codeBlockWrapper.append(codeBlockInnerWrapper);
	        codeBlockInnerWrapper.append(codeBlock);
	        codeBlockWrapper.dataset.plainCodeBlockId = plainCodeBlockId;
	        codeBlock.classList.add("codeblock");

	        // Append the hidden unformatted codeblock
	        codeBlockWrapper.appendChild(plainCodeBlock);

	        // Create and add copy button
	        var copyButton = document.createElement("pfe-clipboard");
	        var copyText = document.createElement("span");
	        var copySuccessText = document.createElement("span");

	        copyText.setAttribute("slot", "text");
	        // @todo Translate
	        copyText.innerText = "Copy";

	        copySuccessText.setAttribute("slot", "text--success");
	        // @todo Translate
	        copySuccessText.innerText = "Copied!";

	        copyButton.setAttribute("copy-from", "property");
	        copyButton.classList.add("codeblock__copy");

	        copyButton.appendChild(copyText);
	        copyButton.appendChild(copySuccessText);
	        codeBlockWrapper.appendChild(copyButton);

	        // Set content to be copied once clipboard component is running
	        document.addEventListener("pfe-clipboard:connected", function (event) {
	          // Needed to get the ID to retrieve the content from the object
	          var thisComponent = event.detail.component;
	          var thisCodeWrapper = thisComponent.closest(".codeblock__wrapper");
	          if (thisComponent && thisCodeWrapper && thisCodeWrapper.dataset.plainCodeBlockId) {
	            // Set the content to be copied
	            thisComponent.contentToCopy = _this2._plainCodeBlockContent[thisCodeWrapper.dataset.plainCodeBlockId];
	          }
	        });
	      }

	      // Alias languages as described by https://docs.google.com/spreadsheets/d/1T2_Hc3Pi4Phu2R4S9OBLv7kGx790FJfFkCMNSKLvMwI/edit#gid=0
	      // This is covering for our enormous backlog of content
	      switch (language) {
	        case "config":
	          language = "text";
	          break;
	        case "dns":
	          language = "dns-zone";
	          break;
	        case "terminal":
	          language = "shell";
	          codeBlock.classList.add("command-line");
	          break;
	        case "golang":
	          language = "go";
	          break;
	        case "make":
	          language = "makefile";
	          break;
	      }

	      // Make sure correct class exists on wrapper element
	      if (!codeBlock.classList.contains("language-" + language)) {
	        codeBlock.classList.remove(languageClass);
	        codeBlock.classList.add("language-" + language);
	      }

	      var postHighlight = function postHighlight() {
	        codeBlock.classList.add("codeblock--processed");
	      };

	      // Highlight syntax
	      try {
	        prism.highlightElement(codeBlock, false, postHighlight);
	      } catch (error) {
	        console.error(error);
	      }
	    }

	    /**
	     * Updates the Y position of the sections in _sections array
	     */

	  }, {
	    key: "_updateSectionPositions",
	    value: function _updateSectionPositions() {
	      if (!this._sections || !this._sections.order || !this._sections.order.length) {
	        return;
	      }

	      for (var index = 0; index < this._sections.order.length; index++) {
	        var sectionId = this._sections.order[index];
	        this._sections.data[sectionId].position = this._sections.data[sectionId].anchorLink.offsetTop;
	      }
	    }

	    /**
	     * Highlight the section link in the table of contents that's currently on screen
	     */

	  }, {
	    key: "_highlightVisibleSection",
	    value: function _highlightVisibleSection() {
	      // Quick exit if we don't have everything we need
	      if (!this._sections || !this._sections.order || !this._sections.order.length) {
	        return;
	      }

	      // Go through sections in reverse order and look for active one
	      var index = this._sections.order.length - 1;
	      var foundCurrentSection = false;
	      var visibleBoundary = window.scrollY + window.innerHeight / 2;

	      // Iterate over sections until we've found the one we're on
	      while (index >= 0 && !foundCurrentSection) {
	        var sectionId = this._sections.order[index];
	        var currentSection = this._sections.data[sectionId];

	        if (visibleBoundary >= currentSection.position) {
	          foundCurrentSection = true;
	          // It's already active, nothing to do
	          if (this._sections.activeSection === currentSection.tocLink.id) {
	            break;
	          }

	          // Remove class from previously active tocLink
	          if (this._sections.activeSection && this._sections.data[this._sections.activeSection]) {
	            this._sections.data[this._sections.activeSection].tocLink.classList.remove("is-active");
	          }

	          // Add class to new tocLink
	          currentSection.tocLink.classList.add("is-active");
	          this._sections.activeSection = currentSection.anchorLink.id;
	        }
	        index--;
	      }

	      if (!this._sections.activeSection) {
	        // If we didn't get an active section, set it to the first if the scroll position is above the first item
	        if (visibleBoundary < this._sections.data[this._sections.order[0]].position) {
	          // Add class to new tocLink
	          this._sections.data[this._sections.order[0]].tocLink.classList.add("is-active");
	          this._sections.activeSection = this._sections.data[this._sections.order[0]].anchorLink.id;
	        }
	      }
	    }

	    /**
	     * Detect if content area has one column (mobile) layout
	     */

	  }, {
	    key: "_isOneColumnLayout",
	    value: function _isOneColumnLayout() {
	      if (this._contentWrapper) {
	        // Return the cached value if the window hasn't changed sizes
	        if (window.innerWidth === this._lastOneColumnLayoutCheck.lastCheck) {
	          return this._lastOneColumnLayoutCheck.value;
	        }
	        // Otherwise check and store the new result
	        else {
	            var contentWrapperBoundingRect = this._contentWrapper.getBoundingClientRect();
	            if (contentWrapperBoundingRect && contentWrapperBoundingRect.x) {
	              this._lastOneColumnLayoutCheck = {
	                value: contentWrapperBoundingRect.x < 100,
	                lastCheck: window.innerWidth
	              };
	              return this._lastOneColumnLayoutCheck.value;
	            }
	          }
	      }
	    }

	    /**
	     * Tasks after a resize has happened
	     */

	  }, {
	    key: "_postResize",
	    value: function _postResize() {
	      // Check if we _should_ be scrollspying
	      if (this._isOneColumnLayout()) {
	        if (this._scrollSpying) {
	          // If we're mobile and scrollspying, stop
	          this._setupTableOfContents();
	        }
	      } else if (!this._scrollSpying && this._tableOfContents) {
	        // If we're desktop, have a table of contents, and aren't scrollspying, we should be
	        this._setupTableOfContents();
	      }

	      // If we still are scrollSpying update the positions and make sure the highlight is correct
	      if (this._scrollSpying) {
	        this._updateSectionPositions();
	        this._highlightVisibleSection();
	      }
	    }

	    /**
	     * Sets up data needed to highlight currently visible section of the table of contents
	     */

	  }, {
	    key: "_setupTableOfContents",
	    value: function _setupTableOfContents() {
	      // Quick exit if there isn't a table of contents
	      if (!this._tableOfContents) {
	        return;
	      }

	      // Clear any old listeners in case the shadow DOM was rebuilt more than once
	      window.removeEventListener("scroll", this._scrollListener);

	      // If we're at mobile layout no need for a scrollspy
	      if (this._isOneColumnLayout()) {
	        this._tableOfContents.classList.remove("rhdocs__section-list--has-scrollspy");
	        this._scrollSpying = false;
	        return;
	      }

	      this._tableOfContents.classList.add("rhdocs__section-list--has-scrollspy");
	      this._scrollSpying = true;

	      // If we don't the sections object setup yet, initialize it
	      if (!this._sections.order || !this._sections.data) {
	        this._sections = {
	          order: [],
	          data: {}
	        };

	        // Iterate over table of content links and setup data needed to highlight the current section as user scrolls
	        var tableOfContentLinks = this._tableOfContents.querySelectorAll("a[href]");
	        for (var index = 0; index < tableOfContentLinks.length; index++) {
	          var tocLink = tableOfContentLinks[index];
	          var tocLinkTarget = this.shadowRoot.querySelector(tocLink.getAttribute("href"));
	          if (tocLink && tocLinkTarget) {
	            this._sections.order.push(tocLinkTarget.id);
	            this._sections.data[tocLinkTarget.id] = {
	              tocLink: tocLink,
	              anchorLink: tocLinkTarget,
	              position: tocLinkTarget.offsetTop
	            };
	          }
	        }
	        this._highlightVisibleSection();
	      }

	      window.addEventListener("scroll", this._scrollListener);
	    }

	    /**
	     * Handle initialization or changes in light DOM
	     * Clone them into the shadowRoot
	     */

	  }, {
	    key: "_processLightDom",
	    value: function _processLightDom(mutationList) {
	      // Preventing issues in IE11 & Edge
	      if (this._isCrustyBrowser()) {
	        this._observer.disconnect();
	      }

	      if (this._isDevelopment()) {
	        console.log(this.tag + ": Processing Light Dom", mutationList);
	      }

	      // Clone light DOM into shadow DOM
	      var shadowWrapper = this.shadowRoot.getElementById("wrapper"),
	          oldContentWrapper = this.shadowRoot.getElementById("content"),

	      // An element that light dom content will be put into and replaces the shadowWrapper at the end
	      newContentWrapper = document.createElement("div");

	      this.childNodes.forEach(function (childNode) {
	        var cloneNode = childNode.cloneNode(true);
	        newContentWrapper.append(cloneNode);
	      });

	      // --------------------------------------------
	      // Begin best time to do DOM manipulation in Shadow Dom
	      // --------------------------------------------
	      var additionalResourcesWrappers = newContentWrapper.querySelectorAll("._additional-resources");
	      for (var index = 0; index < additionalResourcesWrappers.length; index++) {
	        var additionalResourcesWrapper = additionalResourcesWrappers[index];
	        // Wrap additional resources in an aside instead of a div
	        var asideWrapper = document.createElement("aside");
	        asideWrapper.setAttribute("class", additionalResourcesWrapper.getAttribute("class"));
	        asideWrapper.innerHTML = additionalResourcesWrapper.innerHTML;
	        additionalResourcesWrapper.parentElement.replaceChild(asideWrapper, additionalResourcesWrapper);
	        additionalResourcesWrapper = asideWrapper;

	        // Assemblies get their additional resources wrapped by a collapsible box Related ${contentType} Content
	        if (this._contentType === "assembly") {
	          var moduleWrapper = additionalResourcesWrapper.closest("section, article");
	          if (moduleWrapper) {
	            var additionalResourcesH2 = additionalResourcesWrapper.querySelector("h2");
	            var isLastItem = index === additionalResourcesWrappers.length - 1;
	            // We should only have one guide additional resources, and it ought to be the last additional resources
	            // Additional resources' title should be an h2, given author's adoc markup `== Title`
	            var relatedTopicContentType = isLastItem && additionalResourcesH2 ? "guide" : "topic";
	            var relatedTopicContentElements = this._createRelatedContentWrapper(relatedTopicContentType);
	            if (relatedTopicContentType === "guide") {
	              relatedTopicContentElements[1].append(additionalResourcesWrapper);
	              moduleWrapper.append(relatedTopicContentElements[0]);
	            } else {
	              additionalResourcesWrapper.replaceWith(relatedTopicContentElements[0]);
	              relatedTopicContentElements[1].append(additionalResourcesWrapper);
	            }
	          }
	        }
	      }

	      // Create and add print button
	      var headerSecondaryWrapper = newContentWrapper.querySelector(".rhdocs__header__secondary-wrapper");
	      // @todo Should retire this extra selector
	      if (!newContentWrapper.querySelector("#rhdocs-header-external") && document.getElementById("rhdocs-header-external")) {
	        headerSecondaryWrapper = document.querySelector("#rhdocs-header-external .rhdocs__header__secondary-wrapper");
	      }
	      if (headerSecondaryWrapper && !headerSecondaryWrapper.querySelector(".rhdocs-print-button")) {
	        var printButtonWrapper = document.createElement("li");
	        printButtonWrapper.classList.add("rh-docs-details-item");
	        printButtonWrapper.classList.add("rhdocs-print-button");
	        printButtonWrapper.append(this._createPrintButton());
	        headerSecondaryWrapper.append(printButtonWrapper);
	      }

	      var codeBlocks = newContentWrapper.querySelectorAll("pre[class*='language-'], code[class*='language-']");
	      if (codeBlocks) {
	        for (var _index2 = 0; _index2 < codeBlocks.length; _index2++) {
	          var codeBlock = codeBlocks[_index2];
	          this._processCodeblock(codeBlock);
	        }
	      }

	      // Have to go over pre tags, some don't have language and need to be
	      // processed seperately. The quick exit on `_processCodeblocks` will
	      // prevent duplicate processing.
	      var noLanguageCodeBlocks = newContentWrapper.querySelectorAll("pre");
	      if (noLanguageCodeBlocks) {
	        for (var _index3 = 0; _index3 < noLanguageCodeBlocks.length; _index3++) {
	          var _codeBlock = noLanguageCodeBlocks[_index3];
	          this._processCodeblock(_codeBlock);
	        }
	      }

	      var tables = newContentWrapper.querySelectorAll("table");
	      for (var _index4 = 0; _index4 < tables.length; _index4++) {
	        var table = tables[_index4];

	        if (!table.parentElement.classList.contains("table-wrapper")) {
	          var tableWrapper = document.createElement("div");
	          tableWrapper.classList.add("table-wrapper");
	          table.parentElement.replaceChild(tableWrapper, table);
	          tableWrapper.append(table);
	        }
	      }

	      // --------------------------------------------
	      // End best time to do DOM manipulation in Shadow Dom
	      // --------------------------------------------
	      if (oldContentWrapper) {
	        shadowWrapper.replaceChild(newContentWrapper, oldContentWrapper);
	      } else {
	        shadowWrapper.append(newContentWrapper);
	      }
	      newContentWrapper.setAttribute("id", "content");

	      // Certain links need to be handled differently than normal
	      // const validLinks = this.shadowRoot.querySelectorAll('a[href]');
	      // for (let index = 0; index < validLinks.length; index++) {
	      //   const validLink = validLinks[index];
	      //   validLink.addEventListener('click', this._linkClickHandler);
	      // }

	      // Setting pointers to commonly used elements
	      this._sidebarPrimary = this.shadowRoot.querySelector(".rh-docs__sidebar--primary");
	      this._contentWrapper = this.shadowRoot.getElementById("rhdocs-content");
	      this._tableOfContents = this.shadowRoot.getElementById("guide-topics");

	      // Setup the table of contents once the page is ready
	      switch (document.readyState) {
	        case "loading":
	          window.addEventListener("DOMContentLoaded", this._setupTableOfContents);
	        case "interactive":
	          window.addEventListener("load", this._updateSectionPositions);
	          break;
	      }

	      if (document.readyState === "interactive" || document.readyState === "complete") {
	        this._setupTableOfContents();
	      }

	      // Reconnecting mutationObserver for IE11 & Edge
	      if (this._isCrustyBrowser()) {
	        this._observer.observe(this, lightDomObserverConfig);
	      }
	    }

	    /**
	     * Add link tag ot
	     * @param {string} styleSheetUrl URL to a stylesheet
	     */

	  }, {
	    key: "_addStyleSheet",
	    value: function _addStyleSheet(styleSheetUrl) {
	      if (!this.shadowRoot.querySelector("link[href='" + styleSheetUrl + "']")) {
	        var linkTag = document.createElement("link");
	        linkTag.setAttribute("id", "pfe-css");
	        linkTag.setAttribute("href", styleSheetUrl);
	        linkTag.setAttribute("rel", "stylesheet");
	        this.shadowRoot.prepend(linkTag);
	      }
	    }

	    /**
	     * Load stylesheet from pfe-css property
	     */

	  }, {
	    key: "_loadCss",
	    value: function _loadCss() {
	      // If we have an attribute and the CSS hasn't been loaded yet
	      if (this.hasAttribute("pfe-css")) {
	        this._addStyleSheet(this.getAttribute("pfe-css"));
	      }
	    }

	    /**
	     * Get the content from pfe-endpoint attribute
	     *
	     * Also loads the body content
	     */

	  }, {
	    key: "loadData",
	    value: function loadData() {
	      var _this3 = this;

	      var endpointUrl = this.getAttribute("pfe-endpoint");
	      if (endpointUrl) {
	        fetch(this._portalEnvironmentFix(endpointUrl)).then(function (response) {
	          return response.json();
	        }).then(function (data) {
	          if (_typeof(data.module) === "object") {
	            _this3.setAttribute("pfe-loaded", "");
	            _this3._contentData = data.module;
	            if (_this3._contentData.body) {
	              _this3.innerHTML = _this3._contentData.body;
	            }
	          }
	        })
	        // This will throw an error: "Unexpected token < in JSON", it's because Pantheon is sending HTML 404's, not JSON
	        .catch(function (error) {
	          return console.error(_this3.tag + ": " + error);
	        });
	      }
	    }

	    /**
	     * Allows parent DOM to access the module data
	     * @return {object} The module data
	     */

	  }, {
	    key: "getData",
	    value: function getData() {
	      if (Object.keys(this._contentData).length) {
	        return this._contentData;
	      }

	      return null;
	    }

	    /**
	     * For assemblies, add "Included in guides" to bottom of module content
	     * @param {object} moduleData Data from api response
	     */

	  }, {
	    key: "_addIncludedInGuides",
	    value: function _addIncludedInGuides(moduleData) {
	      var moduleUuid = this._contentData.variantToModuleMap[moduleData.variant_uuid];

	      // Make sure there's only one instance of this module
	      if (this._contentData.moduleToVariantMap[moduleUuid].length > 1) {
	        // @todo figure out how to handle the same module with two variants in one assembly
	        console.error(this.tag + ": The same module is used twice in this assembly, included in guides could not be added.");
	        return;
	      }

	      if (moduleUuid) {
	        // Match outer module wrapper in shadow dom to data we have
	        var moduleWrapper = this.shadowRoot.querySelector("[pantheon-module-id=\"" + moduleUuid + "\"]");
	        if (moduleWrapper) {
	          // Going to use the current path as a template for assemblies
	          var pathArray = window.location.pathname.split("/");

	          // Create array of assembly links that this topic is in
	          var guideLinksArray = [];
	          for (var index = 0; index < moduleData.included_in_guides.length; index++) {
	            var guideData = moduleData.included_in_guides[index];
	            if (guideData.uuid !== this._contentData.uuid) {
	              var guideLink = document.createElement("a");
	              pathArray[pathArray.length - 1] = guideData.uuid;
	              guideLink.setAttribute("href", "/" + pathArray.join("/"));
	              guideLink.innerText = guideData.title;
	              guideLinksArray.push(guideLink);
	            }
	          }

	          var relatedTopicContentLinks = null;
	          // Create contents of included in guides
	          if (guideLinksArray.length > 1) {
	            relatedTopicContentLinks = document.createElement("ul");
	            for (var _index5 = 0; _index5 < relatedTopicContentLinks.length; _index5++) {
	              var relatedTopicContentLink = relatedTopicContentLinks[_index5];
	              var listItem = document.createElement("li");
	              listItem.append(relatedTopicContentLink);
	              relatedTopicContentLinks.append(listItem);
	            }
	          } else {
	            relatedTopicContentLinks = guideLinksArray[0];
	          }

	          // Create included in guides wrapper and title
	          // Get the parent elements top heading and get the heading level
	          var parentHeadingLevel = parseInt(moduleWrapper.querySelector("h1, h2, h3, h4, h5, h6").tagName.substring(1));
	          var headingLevel = parentHeadingLevel > 5 ? 6 : parentHeadingLevel + 1;

	          var includedInGuidesWrapper = document.createElement("aside");
	          includedInGuidesWrapper.classList.add("included-in-guides");
	          var includedInGuidesTitle = document.createElement("h" + headingLevel);
	          includedInGuidesTitle.classList.add("included-in-guides__title");

	          // @todo Make this string translatable
	          includedInGuidesTitle.innerText = "Guides Including this topic";

	          includedInGuidesWrapper.append(includedInGuidesTitle);
	          includedInGuidesWrapper.append(relatedTopicContentLinks);

	          // Locate or create the 'Related Content to this Topic' dropdown and stick included in guides in it
	          var relatedTopicContentWrapper = moduleWrapper.querySelector(".related-topic-content__wrapper");
	          if (!relatedTopicContentWrapper) {
	            var relatedTopicContentElements = this._createRelatedContentWrapper();
	            relatedTopicContentWrapper = relatedTopicContentElements[0];
	            relatedTopicContentElements[1].append(includedInGuidesWrapper);
	            moduleWrapper.append(relatedTopicContentWrapper);
	          } else {
	            relatedTopicContentWrapper.querySelector(".related-topic-content__inner-wrapper").append(includedInGuidesWrapper);
	          }
	        }
	      }
	    }

	    /**
	     * If we have an assembly, load children modules to add supplimentary content
	     */

	  }, {
	    key: "_loadChildModules",
	    value: function _loadChildModules() {
	      // @todo Add back once API is fixed
	      // for (
	      //   let index = 0;
	      //   index < this._contentData.modules_included.length;
	      //   index++
	      // ) {
	      //   const moduleData = this._contentData.modules_included[index];
	      //   // Create reference maps to get module or variant uuid if we only have one
	      //   if (typeof this._contentData.moduleToVariantMap === "undefined") {
	      //     this._contentData.moduleToVariantMap = {};
	      //     this._contentData.variantToModuleMap = {};
	      //   }
	      //   if (
	      //     typeof this._contentData.moduleToVariantMap[moduleData.module_uuid] ===
	      //     "undefined"
	      //   ) {
	      //     this._contentData.moduleToVariantMap[moduleData.module_uuid] = [];
	      //   }
	      //   this._contentData.variantToModuleMap[moduleData.canonical_uuid] =
	      //     moduleData.module_uuid;
	      //   this._contentData.moduleToVariantMap[moduleData.module_uuid].push(
	      //     moduleData
	      //   );
	      //   if (typeof fetch === 'function' && moduleData.url) {
	      //     // Load module data from api
	      //     let fetchUrl = this._portalEnvironmentFix(moduleData.url);
	      //     // @todo Remove when not in dev
	      //     // if (window.location.host.includes('wruvalca')) {
	      //     //   fetchUrl = `/api/module/variant.json/${ moduleData.canonical_uuid }`;
	      //     // }
	      //     fetch(fetchUrl)
	      //       .then(response => response.json())
	      //       .then(data => {
	      //         if (typeof this._contentData.loadedModules === "undefined") {
	      //           this._contentData.loadedModules = {};
	      //         }
	      //         this._contentData.loadedModules[data.module.variant_uuid] =
	      //           data.module;
	      //         if (
	      //           typeof data.module.included_in_guides !== "undefined" &&
	      //           data.module.included_in_guides.length > 1
	      //         ) {
	      //           this._addIncludedInGuides(data.module);
	      //         }
	      //       })
	      //       .catch(error => console.error(error));
	      //   }
	      // }
	    }
	  }]);
	  return PfeDocumentation;
	}(PFElement);

	PFElement.create(PfeDocumentation);

	return PfeDocumentation;

})));
//# sourceMappingURL=cp-documentation.umd.js.map
