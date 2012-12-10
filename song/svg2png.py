import subprocess


def svg2png(svg):
	temp = open('temp.svg', 'w')
	temp.write(svg)
	temp.close()
	subprocess.Popen(['inkscape','-f','temp.svg','-w','200','-h','100','-e','slug.png'])
	os.remove('temp.svg')

	
