
function show_editor(){
	var editor = document.getElementById(this.id + '_edit');
	if (! this.attributes.class.value.match('editing')){
		this.hidden = true;		
		editor.hidden = false;
		editor.children[0].select();
	};
}



function cancel_edit(){
	var title = document.getElementById(this.parentNode.id.split('_').slice(0,3).join('_'))
	title.hidden = false;
	this.parentNode.hidden = true;
	console.log('title is' + this.parentNode.id.split('_').slice(0,3).join('_'));
	}


function change(){
	var newName = this.value;
	var id = this.parentNode.id.split('_')[2];
	var originalName = document.getElementById(this.parentNode.id.split('_').slice(0,3).join('_')).innerHTML;
	console.log(originalName);	
	Dajaxice.player.changeSlugName(nameSaved, {'originalname': originalName, 'newname': newName, 'id':id});
}

function nameSaved(data){
	if (data.message=='success'){
		var id = data.id;
		var title = document.getElementById('slug_name_'+id);
		var editor = document.getElementById('slug_name_'+id+'_edit');
		title.innerHTML = data.newName;
		title.hidden = false;
		editor.hidden = true;
	}
	console.log(data.message);
}

slugIms = [];



function getSlugs(data){
	slugs = []
	for (var i = 0; i < data.slugs.length; i++){
		slugs.push(parseSlug(data.slugs[i], i));
	};
	drawSlugs(slugs);
	

}
function drawSlugs(slugs){
	// Creates div for each slug in users pallette
	for (var i = 0; i < slugs.length; i++){
		// creates outer div
		var outer = document.createElement('div');
		outer.setAttribute('id','slugDiv_'+i);
		outer.setAttribute('class','slugDiv');
		// creates header. if logged in, this should be editable
		var h3 = document.createElement('h3');
		h3.innerHTML = slugs[i].name;
		h3.setAttribute('id','slug_name_'+i);
		h3.setAttribute('class','slug_name');
		outer.appendChild(h3)
		if (editable){	
			h3.onclick = show_editor
			// adds edit form
			var form = document.createElement('form');
			var input = document.createElement('input');
			input.type = 'text';
			input.value = slugs[i].name;
			input.onblur = cancel_edit;
			input.onchange = change
			form.appendChild(input);
			form.setAttribute('id','slug_name_'+i+'_edit')
			form.setAttribute('hidden','true');
			outer.appendChild(form);
		}
		
		// create inner fdiv to whole svgs
		var d = document.createElement('div')
		d.setAttribute('id','slugBox_'+i);
		d.setAttribute('class','slugBox');
		outer.appendChild(d);

		// adds whole lot to document
		document.getElementById('slugs_field').appendChild(outer);
		//draws first slug shape onto slugBox div
		var r = new Raphael(document.getElementById('slugBox_'+i),200,90);
		slug = slugs[i].draw(r, 0, 't 10,0 s 2,2,0,0', Object.create(mainAttrs.palletteSlugs), 'slug_'+i+'_shape_0');
		slug.attr('fill', slugs[i].color);

		// adds slug image to slugIms for easy dom-access
		slugIms.push(slug)
		//add arrows to scroll between shapes
		var arrowAttrs = {'fill': '#333', 'stroke': '#111','opacity': 0.5, 'cursor':'pointer'};
		r_arrow = r.path('M 175,35 l 15,15 l -15,15, z').attr(arrowAttrs);
		l_arrow = r.path('M 10,45 l 15,-15 l 0,30 z').attr(arrowAttrs);
		//add events to scroll arrows
		r_arrow.hover(function(){this.attr('opacity',1)})
		l_arrow.hover(function(){this.attr('opacity',1)})
		r_arrow.mouseout(function(){this.attr('opacity',0.5)})
		l_arrow.mouseout(function(){this.attr('opacity',0.5)})
		r_arrow.node.onclick = function(){
			var slugId = this.parentNode.parentNode.id[this.parentNode.parentNode.id.length-1]
			switchSlug('r',slugId)
		}
		l_arrow.node.onclick = function(){
			var slugId = this.parentNode.parentNode.id[this.parentNode.parentNode.id.length-1]
			switchSlug('l',slugId);
		}
		// add waveView toggle
		var waveToggle = r.set();
		waveToggle.push(r.rect(85,10,30,15,2).attr(arrowAttrs));
		waveToggle.push(r.path('M 85,17 L 90,24 L 100,9 L 110,24 L 115,17')
			.attr({'stroke': slugs[i].color,
				'stroke-width': 1.5}));
		waveToggle.push(slugs[i].draw(r,0,'t 85 10, s 0.5,0.5,0,0', Object.create(mainAttrs.palletteSlugs), 'waveToggle_slug_'+i).attr('opacity', 0))
		waveToggle[2].attr('fill',slugs[i].color);
		waveToggle[0].hover(function(){this.attr('opacity',1)});
		waveToggle[0].mouseout(function(){this.attr('opacity',0.5)});
		waveToggle[1].node.setAttribute('id', 'waveToggle_'+i);
		waveToggle.click(function() {
			var slugId = this.node.parentNode.parentNode.id[this.node.parentNode.parentNode.id.length-1];
			toggleWave(slugId);
			console.log('clicked waveToggle '+ slugId);
		})
	}
}

function switchSlug(direction,slugId){
	var slug = slugs[slugId];
	for (var i = 0; i < slug.shapes.length; i++){
		if (slug.currentShape == slug.shapes[i]){
			var id = i;
		}
	}
	console.log(id);
	var slugIm = slugIms[slugId];
	if (direction == 'l'){	
		var newId = (id-1);
		if (newId < 0){newId = slug.shapes.length + newId}
		var transform = 't 200,0 s 2,2,0,0'
		var startPos = 't -200,0 s 2,2,0,0'
	}else{
		var newId = (id+1)%slug.shapes.length;
		var transform = 't -200,0 s 2,2,0,0';
		var startPos = 't 200,0 s 2,2,0,0';
	}
	slug.currentShape = slug.shapes[newId];
	newSlugIm = slug.draw(slugIm[0].paper, 0, startPos, Object.create(mainAttrs.palletteSlugs), 'slug_'+slugId+'_shape_'+newId);
	newSlugIm.attr('fill',slug.color);
	slugIm.animate({'transform': transform},500, function(){this.remove()});
	newSlugIm.animate({'transform': 't 10,0 s 2,2,0,0'},500);
	slugIms[slugId] = newSlugIm;
	console.log(newId);	
}
		

function toggleWave(slugId){
	var slug = slugs[slugId]
	var slugIm = slugIms[slugId]
	if (document.getElementById('wave_'+slugId)){
		var wave = document.getElementById('wave_'+slugId);
		wave.parentNode.removeChild(wave);
		slugIm.animate({'transform':'t 0,0 s 2,2,0,0'},500);
		document.getElementById('waveToggle_'+slugId).style.opacity = 1;
		for (var i = 0; i < 5; i++){
			document.getElementById('waveToggle_slug_'+slugId+'_'+i).style.opacity = 0;
		}
	} else{
		var path = drawWave(slug.sound, 200, 20,100,0,-80)	
		var wave = slugIm[0].paper.path(path)
				.attr({'stroke':slug.color,
					'stroke-width': 2}); 
		wave.node.setAttribute('id','wave_'+slugId);
		slugIm.animate({'transform':'t 0,100 s 2,2,0,0'},500);
		wave.animate({'transform':'t 0,120'},500);
		document.getElementById('waveToggle_'+slugId).style.opacity = 0;
		for (var i = 0; i < 5; i++){
			document.getElementById('waveToggle_slug_'+slugId+'_'+i).style.opacity = 1;
		
		}
	}

}	
 


