
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

