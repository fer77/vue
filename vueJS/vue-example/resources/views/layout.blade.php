<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Vue Document</title>
	<link rel="stylesheet" href="">
</head>
<body>
	<component is="{{ $vueView }}">
		@'yield('content')
	</component>

	<script src="/js/app.js"></script>
</body>
</html>