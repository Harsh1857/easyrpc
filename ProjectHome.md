This is a synchronous and an asynchronous library to communicate with a server application with almost zero configuration


PHP CODE

functions.php

```
<?php
include_once("easyrpc.php");
function helloWorld($name)
{
	return "hello $name";
}
?>
```


JAVASCRIPT CODE

example.html

```
<html>
<head>
<title>Easyrpc example</title>
</head>
<body>
<script type="text/javascript" src="jquery.easyrpc.js"></script>
<script language="javascript">
var php = null;
$(document).ready(function()
{
	php = $.easyrpc({url : "functions.php"});
        //without any type of mapping is called the php code
        alert(php.send('helloWorld','Carlos'));
	//'hello Carlos' is returned
});
</script>
</body>
</html>
```
