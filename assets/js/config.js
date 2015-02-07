require.config({
	appDir: '.',
	dir: '../_build/js',
	baseUrl: '.',
	waitSeconds: 0,
	paths: {
		FastClick: '../_components/fastclick/lib/fastclick'
	},
	modules: [
		{
			name: 'main',
			include: [
				'FastClick'
			]
		}
	]
});
