var getRules = function(name){
    if(name === "fill") return {"name": "background-color"};
    if(name === "stroke"){
	return [
	    {
	        "name": "border-style",
	        "default": "solid"
	    },
	    {
	        "name": "border-width",
	        "default": "1px"
	    }
	]
    }
}
