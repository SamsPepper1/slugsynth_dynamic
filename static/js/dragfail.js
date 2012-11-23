
function dragMove(dx,dy,x,y){
    //console.log(this);
    var slug = all.dragSlug;
    if (!slug){
        return false;
        }
    if (slug.ox+dx > grid.width){
        x= grid.width;
    }
    if (slug.oy + dy > grid.height) {
        y = grid.height;
    }
    slug.pos = Math.round(((slug.ox+dx)/(all.grid.width/all.grid.columns))-0.5)
    slug.note = Math.round(((slug.oy+dy)/(all.grid.height/all.grid.rows))-1)
    slug.x = all.grid.xMargin + slug.pos*(all.grid.cellWidth+3);
    slug.y = all.grid.y + all.grid.yMargin + slug.note*( all.grid.cellHeight + 3);
    //var diffX = slug.ox - x;
    console.log(x +','+ y)
    slug.transform('t ' + (slug.x)+ ',' +(slug.y));
   // e.preventDefault();
   return false;


}

function dragStart(x,y) {
    //var transform = all.pallette.slugIms[this.node.id[0]][0].attrs.transform;
    //console.log(transform);
    if (! this.id[0] == all.currentSlug.id){
        all.changeCurrentSlug(this.node.id[0]);
        return false;
    }
    all.changeCurrentSlug(this.node.id[0])
    var track = document.getElementById('track');
    var offsetL = track.offsetLeft;
    var offsetT = track.offsetTop;
    var slug = all.pallette.slugIms[this.node.id[0]][0]
    var bbox = slug.getBBox();
    all.dragSlug = slug.clone();  
    all.dragSlug.ox = (bbox.x + bbox.x2)/2;
    all.dragSlug.oy = (bbox.y + bbox.y2)/2;
    return false;
}

function dragEnd() {
    var slug = all.dragSlug;
    if (!slug){
        return false;
    }
    if (slug.x < all.grid.xMargin){
        slug.remove();
        return false;
    }
    if (slug.x > all.grid.width){
        slug.remove();
        return false;
    }
    if (slug.y < all.grid.yMargin){
        slug.remove();
        return false;
    }
    if (slug.y > all.grid.height){
        slug.remove();
        return false;
    };
    
    all.addNote(slug.pos, slug.note)    
    //slug.remove();
    return false;
    //this.preventDefault();
}
