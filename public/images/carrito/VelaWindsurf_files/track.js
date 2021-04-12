var dcTN = dcTN || {};

dcTN.store = {
	domainTrack: "https://app.datacrush.la/apps/web/ecommerce/track/",
	domainContact: "https://app.datacrush.la/apps/web/ecommerce/tiendanube/customer",
	expiration: 3650,	
	portalID: null,
	duration: 1000*60*60*24*7, //1 week
	
    init: function (options) {

		if(typeof(LS)=="undefined") {
			return false;
		}
		
		dcTN.store.intervalCart = false;
		dcTN.store.intervalOrder = false;
		dcTN.store.flagCustomer = false;			
		
		dcTN.store.portalID = options.portalID;

		var contactKey  = dcTN.store.getParam("contact_key");
		var source_type = dcTN.store.getParam("utm_source");		
		var send_key	= dcTN.store.getParam("send_key");
		var referer		= dcTN.store.getReferrer();				
		var utm_source   = dcTN.store.getParam("utm_source"); 
		var utm_medium   = dcTN.store.getParam("utm_medium"); 
		var utm_campaign = dcTN.store.getParam("utm_campaign"); 
		var utm_term     = dcTN.store.getParam("utm_term"); 
		var utm_content  = dcTN.store.getParam("utm_content"); 
						
		if(contactKey=="") {
			var contactKey  = dcTN.store.getCookie("key");
		} else {
			dcTN.store.setCookie("key", contactKey);
		}

		if(source_type) {
			dcTN.store.setCookie("origin_source", source_type, dcTN.store.duration);
			dcTN.store.setCookie("origin_referer", referer, dcTN.store.duration);
		}
		
		if(send_key) {
			dcTN.store.setCookie("origin_send_key", send_key, dcTN.store.duration);
		}
		
		if(utm_source) {
			dcTN.store.setCookie("utm_source", utm_source, dcTN.store.duration);
			dcTN.store.setCookie("utm_medium", utm_medium  , dcTN.store.duration);
			dcTN.store.setCookie("utm_campaign", utm_campaign, dcTN.store.duration);
			dcTN.store.setCookie("utm_term", utm_term    , dcTN.store.duration);
			dcTN.store.setCookie("utm_content", utm_content , dcTN.store.duration);
		}
		
				
		//Load customer information
		
		//New Checkout
		if(document.location.href.indexOf("/checkout/v3/") > -1) {

//			var addressesForm = document.getElementById("next-step");		
			var addressesForm = document.forms[0];
			if(addressesForm) {
				
				addressesForm.addEventListener("click", function() {	

					var email 				= dcTN.store.getElementId("contact.email");
					if(email=="") {
						var email 				= dcTN.store.getElementId("@contact_email");
					}
					if(email=="") {
						var email 				= dcTN.store.getElementId("contact_email");
					}
			
					var shipping_first_name = dcTN.store.getElementId("shippingAddress.first_name");					
					var shipping_last_name 	= dcTN.store.getElementId("shippingAddress.last_name");
					var shipping_phone 		= dcTN.store.getElementId("shippingAddress.phone");
					
					if(shipping_first_name=="") {
						var shipping_first_name = dcTN.store.getElementId("@shipping_first_name");					
						var shipping_last_name 	= dcTN.store.getElementId("@shipping_last_name");
						var shipping_phone 		= dcTN.store.getElementId("@shipping_phone");						
					}

					if(shipping_first_name=="") {
						var shipping_first_name = dcTN.store.getElementId("shipping_first_name");					
						var shipping_last_name 	= dcTN.store.getElementId("shipping_last_name");
						var shipping_phone 		= dcTN.store.getElementId("shipping_phone");						
					}
			
					var billing_first_name  = dcTN.store.getElementId("billingAddress.first_name");
					var billing_last_name 	= dcTN.store.getElementId("billingAddress.last_name");
					var billing_phone 		= dcTN.store.getElementId("billingAddress.phone");
			
					if(billing_first_name=="") {
						var billing_first_name  = dcTN.store.getElementId("@billing_first_name");
						var billing_last_name 	= dcTN.store.getElementId("@billing_last_name");
						var billing_phone 		= dcTN.store.getElementId("@billing_phone");						
					}

					if(billing_first_name=="") {
						var billing_first_name  = dcTN.store.getElementId("billing_first_name");
						var billing_last_name 	= dcTN.store.getElementId("billing_last_name");
						var billing_phone 		= dcTN.store.getElementId("billing_phone");						
					}

					dcTN.store.setCookie("email", email);
			
					//Shipping information
					if(shipping_first_name) {
						dcTN.store.setCookie("first_name", shipping_first_name);
					}
					if(shipping_last_name) {
						dcTN.store.setCookie("last_name", shipping_last_name);
					}					
					if(shipping_phone) {
						dcTN.store.setCookie("phone", shipping_phone);
					}	

					//Billing information
					if(billing_first_name) {
						dcTN.store.setCookie("first_name", billing_first_name);
					}
					if(billing_last_name) {
						dcTN.store.setCookie("last_name", billing_last_name);
					}					
					if(billing_phone) {
						dcTN.store.setCookie("phone", billing_phone);
					}
					
					if(dcTN.store.flagCustomer == false) {
						dcTN.store.sendCustomer();
						
						setTimeout(function(){dcTN.store.flagCustomer = false; }, 3000);
						
					}
										
					dcTN.store.flagCustomer = true;
					
				});
			}
			
			//Cart
			dcTN.store.intervalCart = setInterval(function() {
				if(typeof(LS.cart)!="undefined" && contactKey!="" && send_key=="") {		
					dcTN.store.sendCart();
				}				
			}, 500);

			//Order
			dcTN.store.intervalOrder = setInterval(function() {
				if(typeof(LS.order)!="undefined") {
					dcTN.store.sendOrder();
				}				
			}, 500);

			
		//Old checkout
		} else if(document.location.href.indexOf("/checkout/") > -1) {

//			var addressesForm = document.getElementById("addressesForm");		
			var addressesForm = document.forms[0];
			if(addressesForm) {
				addressesForm.onsubmit = function() {

					var email 				= dcTN.store.getElementName("cart[contact][email]");
					if(email=="") {
						var email 				= dcTN.store.getElementId("@contact_email");
					}
					if(email=="") {
						var email 				= dcTN.store.getElementId("contact_email");
					}
					
					var shipping_first_name = dcTN.store.getElementName("cart[shipping][first_name]");
					var shipping_last_name 	= dcTN.store.getElementName("cart[shipping][last_name]");
					var shipping_phone 		= dcTN.store.getElementName("cart[shipping][phone]");
					
					var pickup_first_name = dcTN.store.getElementName("cart[pickup][first_name]");
					var pickup_last_name 	= dcTN.store.getElementName("cart[pickup][last_name]");
					var pickup_phone 		= dcTN.store.getElementName("cart[pickup][phone]");					
					
					var billing_first_name 	= dcTN.store.getElementName("cart[billing][first_name]");
					var billing_last_name 	= dcTN.store.getElementName("cart[billing][last_name]");
					var billing_phone 		= dcTN.store.getElementName("cart[billing][phone]");


					if(shipping_first_name=="") {
						var shipping_first_name = dcTN.store.getElementId("shipping_first_name");					
						var shipping_last_name 	= dcTN.store.getElementId("shipping_last_name");
						var shipping_phone 		= dcTN.store.getElementId("shipping_phone");						
					}
					
					if(billing_first_name=="") {
						var billing_first_name  = dcTN.store.getElementId("billing_first_name");
						var billing_last_name 	= dcTN.store.getElementId("billing_last_name");
						var billing_phone 		= dcTN.store.getElementId("billing_phone");						
					}
					
					
					dcTN.store.setCookie("email", email);
					
					//Shipping information
					if(shipping_first_name) {
						dcTN.store.setCookie("first_name", shipping_first_name);
					}
					if(shipping_last_name) {
						dcTN.store.setCookie("last_name", shipping_last_name);
					}					
					if(shipping_phone) {
						dcTN.store.setCookie("phone", shipping_phone);
					}	

					//Pickup information
					if(pickup_first_name) {
						dcTN.store.setCookie("first_name", pickup_first_name);
					}
					if(pickup_last_name) {
						dcTN.store.setCookie("last_name", pickup_last_name);
					}					
					if(pickup_phone) {
						dcTN.store.setCookie("phone", pickup_phone);
					}	
					
					//Billing information
					if(billing_first_name) {
						dcTN.store.setCookie("first_name", billing_first_name);
					}
					if(billing_last_name) {
						dcTN.store.setCookie("last_name", billing_last_name);
					}					
					if(billing_phone) {
						dcTN.store.setCookie("phone", billing_phone);
					}										

				};
			}

		}

		//Send customer information
		if(LS.customer!="" && LS.customer!=null && contactKey=="") {
			dcTN.store.sendCustomer();
		} else if( (document.location.href.indexOf("/start/") >-1 || document.location.href.indexOf("/checkout/next") >-1 || document.location.href.indexOf("/checkout/v3/next") >-1) && contactKey=="") {
			dcTN.store.sendCustomer();
		} else if ( dcTN.store.getCookie("email") !="") {
			dcTN.store.sendCustomer();			
		}
		
		//Order
		if(typeof(LS.order)!="undefined") {
			dcTN.store.sendOrder();
		}

		//Cart
		if(typeof(LS.cart)!="undefined" && contactKey!="" && send_key=="") {		
			dcTN.store.sendCart();
		}
    
	},

	sendOrder: function() {
		var portalID = dcTN.store.portalID;

		var order   = LS.order;		
		var id 		= order.id;
		var total 	= LS.order.total / 100;
		var order_number = order.number;		
		var customer_id = LS.customer;
				
		var contactKey  	= dcTN.store.getCookie("key");
//		var uid				= dcTN.store.uid();
						
		var origin_source   = dcTN.store.getCookie("origin_source");
		var origin_referer  = dcTN.store.getCookie("origin_referer");
		var send_key 		= dcTN.store.getCookie("origin_send_key");
		
		utm_source 		= dcTN.store.getCookie("utm_source");
		utm_medium   	= dcTN.store.getCookie("utm_medium");
		utm_campaign 	= dcTN.store.getCookie("utm_campaign");
		utm_term     	= dcTN.store.getCookie("utm_term");
		utm_content  	= dcTN.store.getCookie("utm_content")		

		var userAgent   = dcTN.store.getUserAgent();
		
		var data = {
			"portalID": portalID,
			"contact_key": contactKey,
			"id": id,
			"customer_id": customer_id,
			"order_number": order_number,
			"total": total,
			"origin_source": origin_source,
			"origin_referer": origin_referer,			
			"send_key": send_key,
			"user_agent": userAgent,
			"utm_source": utm_source,
			"utm_medium": utm_medium,
			"utm_campaign": utm_campaign,
			"utm_term": utm_term,
			"utm_content": utm_content
		}

		//View
	    var url = dcTN.store.domainTrack + "order";
		dcTN.store.send(url, data);
		
		
		if( dcTN.store.intervalOrder ) {			
			clearInterval( dcTN.store.intervalOrder );			
		}

	},
	
	sendCart: function() {
		var doSend = false;
		
		if(document.location.href.indexOf("/checkout/start") > -1 || document.location.href.indexOf("/checkout/next") > -1) {
			doSend = true;
		} else if(document.location.href.indexOf("/checkout/v3/start") > -1 || document.location.href.indexOf("/checkout/v3/next") > -1) {
			doSend = true;
		}
		
		if(!doSend) {
			return false;
		}
		
		var portalID = dcTN.store.portalID;

		var cart    = LS.cart;
		var id 		= cart.id;
		var total 	= parseFloat(cart.subtotal) / 100;
		var url 	= document.location.href;
		var items   = cart.items;
						
		var contactKey  	= dcTN.store.getCookie("key");
		
		var customer_id  = "";		
		if(typeof(LS.customer)!="undefined") {
			if(LS.customer!=null) {
				customer_id = LS.customer;
			}
		}

		var origin_source   = dcTN.store.getCookie("origin_source");
		var origin_referer  = dcTN.store.getCookie("origin_referer");
		var send_key 		= dcTN.store.getCookie("origin_send_key");
		
		utm_source 		= dcTN.store.getCookie("utm_source");
		utm_medium   	= dcTN.store.getCookie("utm_medium");
		utm_campaign 	= dcTN.store.getCookie("utm_campaign");
		utm_term     	= dcTN.store.getCookie("utm_term");
		utm_content  	= dcTN.store.getCookie("utm_content")		

		var userAgent   = dcTN.store.getUserAgent();
		
		
		if(contactKey=="") {
			return false;
		}

		var cart_items = [];
		dcTN.store.each(items, function(i, obj) {
			var id 			= obj.id;
			var title 		= obj.name;
			var quantity 	= obj.quantity;
			var variant_id 	= obj.variant_id;
			var price 		= (parseFloat(obj.unit_price) / 100 ) * quantity;

			var c = {};
			c["title"] 		= title;
			c["quantity"] 	= quantity;
			c["product_variant_id"] = variant_id;
			c["price"] 		= price;	
			cart_items.push(c);								
		});
		cart_items = JSON.stringify(cart_items);

		var data = {
			"portalID": portalID,
			"contact_key": contactKey,
			"customer_id": customer_id,
			"id": id,
			"total": total,
			"url": url,
			"items": cart_items,
			"origin_referer": origin_referer,			
			"send_key": send_key,
			"user_agent": userAgent,
			"utm_source": utm_source,
			"utm_medium": utm_medium,
			"utm_campaign": utm_campaign,
			"utm_term": utm_term,
			"utm_content": utm_content
		}

		//View
	    var url = dcTN.store.domainTrack + "cart";

		dcTN.store.send(url, data);

		if( dcTN.store.intervalCart ) {			
			clearInterval( dcTN.store.intervalCart );			
		}

	},	
	
	sendCustomer: function() {
		var portalID 	= dcTN.store.portalID;
		var id = "";
		
		if(LS.customer != null) {
			id = LS.customer;
		}
		
		var uid			= dcTN.store.uid();
		var contactKey  = dcTN.store.getCookie("key");
		var email  		= dcTN.store.getCookie("email");
		var first_name  = dcTN.store.getCookie("first_name");
		var last_name 	= dcTN.store.getCookie("last_name");		
		var phone 		= dcTN.store.getCookie("phone");		
		var userAgent   = dcTN.store.getUserAgent();

		if(email=="") {
			return false;
		}
		var data = {
			"portalID": portalID,
			"id": id,
			"contact_key": contactKey,
			"uid": uid,			
			"user_agent": userAgent,
			"email": email,	
			"first_name": first_name,
			"last_name": last_name
		}

		//View
	    var url = dcTN.store.domainContact;
		dcTN.store.send(url, data);

	},	
	
	process: function(result) {
		
	},
	
	processCustomer: function(result) {
		
		if(typeof(result.contact_key)!="undefined") {
			dcTN.store.setCookie("key", result.contact_key);
			
			dcTN.store.sendCart();
			
			if(typeof(dc) != "undefined") {			
				if(typeof(dc.track) != "undefined") {
					dc.track.data["visit"] 		 = "2";
					dc.track.contactKey			 = result.contact_key;	
					dc.track.data["contact_key"] = result.contact_key;
					dc.track.pageview();
				}
			}
		}
		
	},

	getCookie: function (k) {
	    var b = new RegExp("(^|;)[ ]*" + k + "=([^;]*)"),
	        v = b.exec(document.cookie);
	    return v ? v[2] : "";
	},
	
	setCookie: function (k,v,e) {
        var f = new Date;
		var d;
		
		/*
		domainParts = document.domain.split('.');
		if(domainParts.length>2) {
			domainParts.shift();
		}
		domain = '.'+domainParts.join('.');
		*/
		
//		domain = document.domain;//temp
		
		var domain = (function(){
		   var i=0,domain=document.domain,p=domain.split('.'),s='_gd'+(new Date()).getTime();
		   while(i<(p.length-1) && document.cookie.indexOf(s+'='+s)==-1){
		      domain = p.slice(-1-(++i)).join('.');
		      document.cookie = s+"="+s+";domain="+domain+";";
		   }
		   document.cookie = s+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+domain+";";
		   return domain;
		})();

		if(e==undefined) {
			var e = dcTN.store.expiration * 864e5;
		}
		
    	f.setTime(f.getTime() + e), d = f.toGMTString();
		
		document.cookie = k + "=" + v + ";domain=" + domain + ";expires=" + d + ";path=/";
    },

	uid: function () {
		var a = "0123456789abcdefghijklmopqrstwxyzABCDEFGHIJKLMOPQRSTWXYZ".split("");
		
		var _uid = dcTN.store.getCookie("uid");

		if(_uid == "") {
		    var c = [];
		    for (var d = 0; d < 50; d++) c[d] = a[Math.floor(Math.random() * 16)];
		    _uid = c.join("");
		}

		return _uid;
	},
    getParam: function(paramName) {
        var searchString = window.location.search.substring(1), i, val, params = searchString.split("&");

        for (i = 0; i < params.length; i++) {
            val = params[i].split("=");
            if (val[0] == paramName) {
                return unescape(val[1]);
            }
        }
        return "";
    },	
	getReferrer: function() {
	    var referrer = document.referrer;
		
		return referrer;
	},	
	getUserAgent: function() {
		return navigator.userAgent;
	},	
	send: function(url, data) {
		var url = dcTN.store.generateURL(url, data);
		var script = document.createElement("script");

		script.setAttribute("src", url);

		document.head.appendChild(script);
	},
	generateURL: function (url, param, page) {
		if(page==undefined) {
			var page = "";
		}
	    var b = url + page;

	    return b + "?" + dcTN.store.param(param);
	},	
	encodeParam: function (a, b) {
    	var c = encodeURIComponent;
		return c instanceof Function ? b ? encodeURI(a) : c(a) : escape(a)
	},	
	param: function (a, b) {
		function d(a, b) {
		    c[c.length] = dcTN.store.encodeParam(a) + "=" + dcTN.store.encodeParam(b)
		}
		var c = [];
		b = b || "&";
		for (var e in a) dcTN.store.isArray(a[e]) ? dcTN.store.each(a[e], function () {
		    d(e, this)
		}) : d(e, dcTN.store.isFunction(a[e]) ? a[e]() : a[e]);
		return c.join(b).replace(/%20/g, "+")
	},	
	tostr: function () {
		return Object.prototype.toString
	},
	isFunction: function (a) {
	    return dcTN.store.tostr.call(a) === "[object Function]"
	},			
    each: function (a, b) {
		var c, d = 0,
		   e = a.length;
		if (e === undefined) {
		   for (c in a)
		       if (b.call(a[c], c, a[c]) === !1) break
		} else
		   for (var f = a[0]; d < e && b.call(f, d, f) !== !1; f = a[++d]);
		return a
	}, 
	isArray: function (a) {
	    return dcTN.store.tostr.call(a) === "[object Array]"
	}, 
	tostr: function () {
		return Object.prototype.toString
	},
	serialize: function(elements) {

		var data = {};

		for ( var i = elements.length - 1; i >= 0; i-- ) {
			var ele = elements[i];
			if ( ele.name === '' ) {
				continue;
			}

			switch ( ele.nodeName ) {
				case 'INPUT':
					switch ( ele.type ) {
						case 'file':
						case 'submit':
						case 'button':
							break;
						case 'checkbox':
						case 'radio':
							if ( ele.checked ) {
								data[ele.name] = ele.value;
							}
							break; 
						default:
							data[ele.name] = ele.value;
							break;
					}
					break;
				case 'TEXTAREA':
					data[ele.name] = ele.value;
					break;
				case 'SELECT':
					switch ( ele.type ) {
						case 'select-one':
							data[ele.name] = ele.value;
							break;
						case 'select-multiple':
							for ( var j = ele.options.length - 1; j >= 0; j-- ) {
								if ( ele.options[j].selected ) {
									data[ele.name] = ele.value;									
								}
							}
							break;
					}
					break;
			}
		}

		return data;
				
	},
	getElementName: function(name) {
		var result = "";
		var element = document.getElementsByName(name);
		
		if(element) {
			
			if(element.length==0) {
				result = element.value;
			} else {
				result = element[0].value;
			}
		}
		
		return result;
	},
	getElementId: function(id) {
		var result = "";
		var element = document.getElementById(id);
		
		if(element) {		
			result = element.value;
		}
		
		return result;
	},	
}

dcTN.store.init(dcDataTN);

