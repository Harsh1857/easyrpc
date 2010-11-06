<?php
	function utf8_array_decode($input) 
	{ 
		$return = array(); 

		foreach ($input as $key => $val) 
		{ 
			if( is_array($val) ) 
			{ 
				$return[$key] = utf8_array_decode($val); 
			} 
			else 
			{ 
				$return[$key] = utf8_decode($val);
			} 
		} 
		return $return;           
	} 

	if( isset( $_REQUEST["a"] ) )
	{
		$arreglo = null;
		$exitVar["functionName"] = $_REQUEST["a"];
		if( isset( $_REQUEST["i"] ) )
		{
			$exitVar["id"] = $_REQUEST["i"];
		}
		if( isset( $_REQUEST["p"] ) )
		{
			$_REQUEST["p"] = utf8_encode(str_replace('\\','',$_REQUEST["p"]));
			$arreglo = json_decode($_REQUEST["p"],true);
		}
		if( $arreglo )
		{
			$arreglo = utf8_array_decode($arreglo);
			$exitVar["data"] = call_user_func_array($_REQUEST["a"], $arreglo);
		}
		else
		{
			$exitVar["data"] = call_user_func($_REQUEST["a"]);
		}
		
		echo json_encode( $exitVar ) ;
	}
	else
	{
		echo json_encode(false);
	}
?>