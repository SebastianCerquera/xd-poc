var getRules = function (name,valor) {
	if (name === "fill") return { "name": "background-color","default":valor };
	if (name === "stroke") {
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
  