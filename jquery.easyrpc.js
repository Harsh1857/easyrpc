(function($)
{
	$.easyrpc = $.easyrpc || function(options) 
	{
		return new (function(options)
		{
		this.petitionId = 0;
		this.result = null;
		this.returnsOnlyData = options.returnsOnlyData || true;
		this.debug = options.debug || false;
		options.url = options.url || "Functions.php";
		options.async = options.async || false;
		options.type = options.type || 'GET';
		
		this.undefinedMethod = function(methodName,parameters)
		{
			return eval("this.send('"+methodName+"',"+parameters+");");
		}
		
		this.success = function(data, textStatus, XMLHttpRequest)
		{
		}
		
		this.error = function(XMLHttpRequest, textStatus, errorThrown)
		{
		}
		
		this.complete = function(XMLHttpRequest, textStatus)
		{
		}
		
		var ajaxOptions = {

			success: this.success,
			error: this.error,
			complete: this.complete
		};
		
		this.send = function(methodName)
		{
			var that = this;
			var encoded = null;
			var dataToBeSent = null;
			var timeVar = new Date().getTime();
			var idPetition = this.petitionId++;
			if(arguments.length>1)
			{
				var params = {};
				for(i=1;i<arguments.length;i++)
				{
					params[(i-1).toString()]=arguments[i];
				}
				try
				{
					encoded = $.toJSON(params); 
				}
				catch(err)
				{
					alert(err);
				}
				dataToBeSent = {
								a:methodName,
								p:encoded,
								i:idPetition,
								t:timeVar
								};
			}
			else
			{
				dataToBeSent = {
								a:methodName,
								i:idPetition,
								t:timeVar
								};
			}
			ajaxOptions.data = dataToBeSent;
			if(options.async)
			{
				ajaxOptions.success = function(data, textStatus, XMLHttpRequest)
				{
					this.success(this.returnResult( dataReturned, true ), textStatus, XMLHttpRequest);
				}
				$.ajax($.extend(ajaxOptions, options));
				return this.idPetition;
			}
			else
			{
				var dataReturned = $.ajax($.extend(ajaxOptions, options)).responseText;
				return this.returnResult( dataReturned, true );

			}
		}
		
		this.retry = function(err)
		{
			var methodName = err.message.match(/\'(.*)\'/)[1];
			var parameters = arguments.callee.caller.toString();
			parameters = parameters.substr(parameters.indexOf(methodName)+methodName.length+1);
			parameters = parameters.substr(0,parameters.indexOf(");"));
			return eval("this.send('"+methodName+"',"+parameters+")");
		}
		
		this.returnResult = function(result,convert)
		{
			if(convert)
			{
				try
				{
					this.result = result?$.evalJSON(result):false;
				}
				catch(err)
				{
					alert(result);
					this.result = false;
				}
			}
			else
			{
				this.result = result?result:false;
			}
			if(this.result)
			{
				if(this.returnsOnlyData)
				{
					this.result = this.result.data;
				}
			}
			if(this.debug)
			{
				alert(this.result);
			}
			return this.result;
		}
		
		return this;
		})(options);
	};

})(jQuery);