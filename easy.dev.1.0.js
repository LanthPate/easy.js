!(function(frame,page,content){
	var local,
		easy,
		isReady;
	easy = {
		constructor: 'easy',
		extend:function(obj) {
			extend(easy,obj)
		}
	}
	easy.extend({
		do: function(fn) {
			fn()
			return easy
		},
		then: function(fn) {
			fn()
			return easy
		},
		get: function(selector,context) {
			return new easy.init(selector,context)
		},
		ready: function(a) {
			bind(page,'DOMContentLoaded',a)
		},
		repeat: function(fn,noi) {
			for(var i=0;i<noi;i++) {
				fn(i)
			}
		},
		fn: {
			makeObject: function(o,t) {
				var ret = o;
				if(t=='element') {
					extend(ret,easyElementMethods())
				} else if(t=='array') {
					extend(ret,easyArrayMethods())
				}
				return ret
			},	
		}
	})
	easy.extend({
		toEasyElement: function(a) {
			easy.repeat(function(i){
				a[i] = easy.fn.makeObject(a[i],'element')
			},a.length)
			return a
		}
	})
	easy.init = easy.fn.init = function(sel,ctx) {
		if(!ctx) {
			ctx = page
		}
		if(!sel) {
			return easy
		} else {
			if(sel.nodeType) {
				return sel
			} else {
				var temp = ctx.querySelectorAll(sel)
				if(temp.length>1) {
					return easyObj(temp,1)
				} else {
					return easyObj(temp[0],0)
				}
			}
		}
	}
	local = easy

	function easyObj(o,t) {
		if(t==0) {
			return easy.fn.makeObject(o,'element')
		} else if(t==1) {
			return easy.fn.makeObject(o,'array')
		}
		return {}
	}

	function easyElementMethods() {
		return {
			on: function(ev,fn) {
				this.addEventListener(ev,fn)
			},
			attr: function(a,b) {
				if(isStr(a) && isStr(b) && arguments.length==2) {
					this[a] = b
				}
				return this
			},
			is: function(a) {
				var n = this,
					ns = queryAll((n.parentNode || n.document),a),
					i = -1
					while(ns[++i] && ns[i] != n);
					return !!ns[i]
			},
			find: function(a) {
				return easy.get(a,this)
			},
			toggleClass: function(a,b) {
				var c = this.className,
					d = this.classList;
				if(arguments.length==2 && isStr(a) && isStr(b)) {
					if(c.indexOf(a)>-1) {
						d.remove(a)
						d.remove(b)
						d.add(b)
					} else if(c.indexOf(b)>-1) {
						d.remove(a)
						d.remove(b)
						d.add(a)
					} else {
						d.add(a)
					}
				} else if(arguments.length==1 && isStr(a)) {
					if(c.indexOf(a)>-1) {
						d.remove(a)
					} else {
						d.add(a)
					}
				}
				return this
			},
			html: function(v) {
				if(arguments.length==1) {
					this.innerHTML = v
				} else {
					return this.innerHTML
				}
				return this
			},
			val: function(v) {
				if(arguments.length==1) {
					this.value = v	
				} else {
					return this.value
				}
				return this
			},
			css: function(a,b) {
				if(isObj(a) && arguments.length==1) {
					for(var p in a) {
						this.style[p] = a[p]
					}
				} else if(isStr(a) && isStr(b)) {
					this.style[a] = b
				}
				return this
			}
		}
	}

	function easyArrayMethods() {
		return {
			first: function(el) {
				if(el && el===true) {
					return easy.fn.makeObject(this[0],'element')
				}
				return this[0]
			},
			last: function(el) {
				if(el && el===true) {
					return easy.fn.makeObject(this[this.length-1],'element')
				}
				return this[this.length-1]
			},
			each: function(fn,el) {
				var a = this,
					b = a.length
				if(el && el===true) {
					$.toEasyElement(a)
				}
				for(var i=0;i<b;i++) {
					fn(i,a[i])
				}
				return this
			},
			filter: function(exp,el) {
				if(el && el===true) {
					$.toEasyElement(this)
				}
				return Array.prototype.filter.call(this,exp)
			}
		}
	}

	function queryAll(a,b) {
		return a.querySelectorAll(b)
	}

	function queryFirst(a,b) {
		return a.querySelector(b)
	}

	function bind(a,b,c) {
		a.addEventListener(b,c)
	}

	function extend(orig,obj) {
		if(isObj(obj) && arguments.length==2) {
			for(var prop in obj) {
				orig[prop] = obj[prop]
			}
		}
	}

	function isStr(o) {
		return toString.call(o) === '[object String]'
	}
	function isObj(o) {
		return toString.call(o) === '[object Object]'
	}

	easy.noConflict = function(e) {
		var alias,
			ezc;
		if(e) {
			if(!frame.E) {
				ezc = 'E'
			} else if(!frame.Ez) {
				ezc = 'Ez'
			} else if(!frame.Easy) {
				ezc = 'Easy'
			}
		}
		if(!frame.$e) {
			alias = '$e'
		} else if(!frame._$) {
			alias = '_$'
		}
		frame[ezc] = frame[alias] = local
		return local
	}
	frame.$ = frame.easy = local
})(window,document,document.body)
