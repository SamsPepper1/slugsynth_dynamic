
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//need to put lisence info here..//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//STRUCTURE//

//objects//
    //main(id,gridLength,baseFreq,sampleRate,scale,tempo,pixelWidth,pixelHeight, palletteSlugs,notes)
    //sideBarLeft(id,x,y,width,height,parent)
    //slugMolder(x,y,width,height,parent)
    //pallette(xMargin,yMargin,parent)
    //controls(x,y,xMargin, yMargin,id,height, buttons, barAttrs,parent)
    //button(x, y,width,height,textAttrs, attrs, pressAttrs, text, fn,parent)
    //grid(x,y,xMargin, yMargin, parent)
    //cell(x, y, width, height,note, pos,paper, parent)
    //slugFamily(name,id, waveTableGenerator,color, octave, shapes)
    
//attrs//
    //mainAttrs
//window.onload//

    //randomSlug()
    //initialising vars
    // call main()


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//// TODO ////

// BIG TASKS
//* use prototyping to make GUI objects related 
//  *cleaning code and getting rid of repetative 'boilerplate' stuff
//
//* make sure everything is fluid an scalable
//  * sideBarLeft scaling factors
//  * new object for slug-model (prototype of raphael.set()?)
//      *should have 'draw' and 'morph' functions
//  *grid slug lengths should represent sound length. Should adapt with change in tempo and grid.cellWidth
//
// 'outsource' synthesiser (and 'play' function) to webWorker to prevent clash between GUI and music threads

// SMALLER TASKS
//* add octave and amplitude buttons to interface
//  * octave in slugMold, amplitude on pallette?
//      * left/right amplitude channels set by moving antenna?
//      *octave represented in number of ripples on base?
//
//* sort out control bar(s)
//  * top bar - play, stop, clear, save, help
//  * bottom bar - mold, view waves,
//
//* change default slugs
//  * one 'nice' sine wave, one square wave, one with phase/fm, ane chaotic/aharmonic
//* general GUI glitches
//  *slug svg needs to be redrawn to prevent paths from going crazy when shortened
//      * a bit of crazy is good/fun

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//GUI OBJECTS
function main(id, gridLength, baseFreq, sampleRate,scale, tempo, pixelWidth, pixelHeight,
               palletteSlugs, notes){
    //  main Raphael container.
    // contains grid of cells representing a sequencer
    // also containe pallette object
    // length and width are adaptable;
    // stores song and song information (sampleRate, tempo, baseFrequency)
    // all other objects should be accessible through this object. 
    //functions: 
    // main.play()
    // main.stop()
    // main.playAll()
    // TODO
    // main.refresh(keepNotes) {} : redraws track according to attributes, keepNotes is boolean  
    // main.openMolder(c) : opens molder for main.currentSlug
    // main.openMoldView() : opens moldView for main.currentSlug  
    // main.openWaveView() : opens oscilliscope with main.currentSlug
    //
    // GUI initialising //
    
    this.id = id;//html element id for new Raphael()
    this.gridLength = gridLength; // length of sequencer grid in cells
    this.pixelWidth = pixelWidth;   // length of this in pixels
    this.pixelHeight = pixelHeight; // height in pixels
    this.palletteHeight = pixelWidth/6; // dynamic height of pallette object
    this.palletteSlugs = palletteSlugs;  // default starting slugs
    //TODO should be a function to highlight name of default currentSlug on start. animation should run once all other elements have loaded
    this.currentSlug = this.palletteSlugs[1]; // currently selected slug. defaults to slug[0]

    // song initialising
    this.tempo = tempo;
    this.scale = scale;
    this.baseFreq = baseFreq;
    this.sampleRate = sampleRate;
    this.noteLength = this.sampleRate*60/this.tempo // calculates length of note represented by one cell on the grid
    this.songLength = this.noteLength*this.gridLength // calculates length of whol loop
    this.notes = [] // empty array to contain notes on current loop

    //TODO will be outsourced to webworker soon..
    this.song = new loop(this.songLength, this.sampleRate);
    
    // DRAW FUNCTIONS //
    //initialises main Raphael object containing draw functions
    this.obj = document.getElementById("track");
    this.paper = new Raphael(this.obj, this.pixelWidth, this.pixelHeight);


    // Draw top controlBar
//    this.topControls = new controls(0,0,2,2,'topControl',30,[],mainAttrs.topBarAttrs,this);

    //ADD BUTTONS
    //TODO this is overly repetative...
    // add play button to top control bar
//    this.topControls.drawButton({'x': 200,'y':8,'width':40,'height':20, 
//        'textAttrs':mainAttrs.buttonTextAttrs, 'attrs':mainAttrs.buttonAttrs,
//        'pressAttrs': {},'text': 'play','func': function() {
//                                                    all.play();
//                                                  }});

    // add stop button to top control bar
//    this.topControls.drawButton({'x': 260, 'y':8, 'width': 40, 'height': 20,
//        'textAttrs': {}, 'attrs': {}, 'pressAttrs': {}, 'text': 'stop',
//        'func': function(){
//            all.stop();
//            all.topControls.buttonSet[1].rect.animate({                     // make button flash to indicate it has been clicked.
//                    'fill': mainAttrs.buttonPressAttrs.fill},500,'<',
//                    function() {all.topControls.buttonSet[1].rect.animate({
//                        'fill': mainAttrs.buttonAttrs.fill}, 500, '<'
//                    )}
//                )}
//            });
//
    // adds calls all.clear()
//    this.topControls.drawButton({'x': 320, 'y':8, 'width': 40, 'height': 20,
//        'textAttrs': {}, 'attrs': {}, 'pressAttrs': {}, 'text': 'clear',
//        'func': function(){
//            all.clear();
//            all.topControls.buttonSet[2].rect.animate({
//                    'fill': mainAttrs.buttonPressAttrs.fill},500,'<',
//                    function() {all.topControls.buttonSet[2].rect.animate({
//                        'fill': mainAttrs.buttonAttrs.fill}, 500, '<'
//                    )}
//                )}
//            });
//    
//    // add slugMold button to top Controller
//    this.topControls.drawButton({'x': 440, 'y':8, 'width': 40, 'height': 20,
//        'textAttrs': {}, 'attrs': {}, 'pressAttrs': {}, 'text': 'mold',
//        'func': function(){
//            all.topControls.buttonSet[3].rect.animate({
//                    'fill': mainAttrs.buttonPressAttrs.fill},500,'<',
//             //                    //all.sideBarLeft.openSlugMolder();
//                    }
 //               )}
//            });
//
//    // add slugView button to top Controller
//    this.topControls.drawButton({'x': 380, 'y':8, 'width': 40, 'height': 20,
//        'textAttrs': {}, 'attrs': {}, 'pressAttrs': {}, 'text': 'wave',
//        'func': function(){
//            all.topControls.buttonSet[4].rect.animate({
//                    'fill': mainAttrs.buttonPressAttrs.fill},500,'<',
                                   // )}
//            })


    // add Pallette 
    //add mold button
    this.moldButton = this.paper.image(STATIC_URL+'images/mold.png',(this.pixelWidth/2)-82,7,70,40);

    // add events to mold button
    this.moldButton.node.onmouseover = function(){
					var newHref = this.attributes.href.value.split('.')[0]+'_hover.png';
					this.setAttribute('href',newHref);
					}
    this.moldButton.node.onmouseout = function(){
					var newHref = this.attributes.href.value.split('_')[0]+'.png';
					this.setAttribute('href',newHref);
				}

    this.moldButton.node.onclick =   function() {
	        	            if (all.sideBarLeft.isIn){
        	        	    all.sideBarLeft.slideOut(function(){all.sideBarLeft.openSlugMolder()});
		                    } else{
                		        all.sideBarLeft.openSlugMolder();
                    			}
				}



    //add wave button
    this.waveButton = this.paper.image(STATIC_URL+'images/wave.png',(this.pixelWidth/2)+12,7,70,40);

    // add events to wave button
    this.waveButton.node.onmouseover = function(){
					var newHref = this.attributes.href.value.split('.')[0]+'_hover.png';
					this.setAttribute('href',newHref);
					}
    this.waveButton.node.onmouseout = function(){
					var newHref = this.attributes.href.value.split('_')[0]+'.png';
					this.setAttribute('href',newHref);
				}
    this.waveButton.node.onclick = function() {
                   	                all.sideBarLeft.showWave();
                    		};

    // Add start button
    this.startButton = this.paper.image(STATIC_URL+'images/start.png', (this.pixelWidth/2)-25,3, 50,50)
		.attr('cursor','pointer');
    // add events to startbutton
    this.startButton.node.onclick = function(){
					if (this.attributes.href.value.split('/')[3].slice(0,4) == 'star'){
						var newHref = STATIC_URL+'images/stop_hover.png'
						all.play();
					} else {
						var newHref = STATIC_URL+'images/start_hover.png'
						all.stop();
					}
					this.setAttribute('href',newHref);
				};
    this.startButton.node.onmouseover = function(){
						var newHref = this.attributes.href.value.split('.')[0]+'_hover.png';
						this.setAttribute('href',newHref)
					}
    this.startButton.node.onmouseout = function(){
						var newHref = this.attributes.href.value.split('_')[0]+'.png';
						this.setAttribute('href',newHref)
					}


    // Add pallette
    this.pallette = new pallette(2+(this.pixelWidth/100),2+(this.pixelHeight/100),this);

    // add grid
    this.grid = new grid(0,50,1+(this.pixelWidth/150),1+(this.pixelHeight/150),this);

    // add timer
    this.timerBody = this.paper.rect(this.pixelWidth/150,0-this.palletteHeight+this.pixelHeight, 148*(this.pixelWidth/150), 8,2).attr('fill','#222');
    this.timer = this.paper.rect((this.pixelWidth/100), 2-this.palletteHeight+this.pixelHeight,0 , 4,2).attr('fill','#dd6666');
	this.maxTimerWidth = 146*this.pixelWidth/150;

    //initialise sideBar (mostly offscreen)
    this.sideBarLeft = new sideBarLeft('slugBoxLeft',0,35,810,this.grid.height+60, this);
    
        //  FUNCTIONS //
    
    this.play = function() {
    // refreshes (global) dataArray;
    //sets (global) start value as 0
    // calls main.song.play()
    // sets flash on play button
        dataArray = this.song.data;
        start = 0;
        this.song.play();
        	
	this.stopInt = setInterval(function(){
					var time = (audio.mozCurrentSampleOffset()%all.songLength+5512)/all.songLength;
					all.timer.attr('width',all.maxTimerWidth*time);
				}, 100)
    }
    
    this.stop = function() {
        // temporary hack.
        //TODO make better
        // stops ALL intervals (up to 1000, to be safe).
        // includes main.song.play interval and playButton 
        //(main.controlTop.buttonSet[0].rect) flash interval 
        for (var i = 0; i < 10000; i++) {
            clearInterval(i)
        };
    }
    
    this.playAll = function() {
        // calls main.song.addNote for each slug at 2 second intervals,
        // then calls main.play()
        // for testing functions ATM
        this.song.clear();
        for (var i = 0; i < this.palletteSlugs.length; i++) {
            this.song.addNote(i*this.songLength/4, 
                this.palletteSlugs[i].getTone(32, 0.15)
            )
        };
        this.play()
    }
    this.changeCurrentSlug = function(id) { 
    // called when palletteSlug is clicked.
    // animates pallette.text[id]
        if (this.currentSlug.id == id){
            return;
        }
        if (!this.sideBarLeft.isIn) {
            if (this.sideBarLeft.waveViewOpen){
                var fn = function() {all.sideBarLeft.morphWave();}
            } else{
                var fn = function() {
                    all.sideBarLeft.slugMold.close(); 
                    all.sideBarLeft.openSlugMolder();}
                }
        }else{ fn = function(){}}
	if (this.pallette.shapesRect){
		this.pallette.shapesRect.remove();
		this.pallette.shapesRect = undefined;
	};
	if (this.pallette.slugShapeSet){
		this.pallette.slugShapeSet.remove();
		this.pallette.slugShapeSet = undefined;
	};        
	if (this.pallette.shapeSetText){
		this.pallette.shapeSetText.remove();
		this.pallette.shapeSetTest = undefined;
	};
        this.pallette.text[this.currentSlug.id].animate({
                        'fill': mainAttrs.palletteText.fill,
                        'transform':''
                        } ,1500, 'elastic');
    
        this.currentSlug = this.palletteSlugs[id];
        all.pallette.text[id].animate({
                    'fill': '#999',
                    'transform':'S 1.5,1.5,'
                        +all.pallette.text[id].x + ','+
                        this.pallette.text[id].y
                     },1500, 'elastic', fn)
        
                
            };
    
    this.addNote = function(pos,note,id) {
    
        // TODO rewrite. sort out frequency confusion( with slug object)
        var frequency = this.baseFreq*scale[(scale.length-note)-1];
        console.log(frequency)
        var samplePos = Math.round(pos*this.noteLength);
        var amp = this.currentSlug.sound.baseAmp;
        console.log('id: '+ id+ 'amp: '+ amp+ 'frequency: '+ frequency)
        this.notes.push({'pos': pos, 'note' : note, 'id': id, 'envpk': this.currentSlug.currentShape.pk, 'slugpk': this.currentSlug.pk})
        this.song.addNote(samplePos,this.currentSlug.getTone(frequency,amp),id)
    }
    this.clear = function() {
        this.song.clear();
        for (var i= 0;i < this.notes.length; i++){
            var pos = this.notes[i].pos;
            var note =  this.notes[i].note ;
            var id = this.notes[i].id;
            console.log('pos: '+ pos + 'note: ' + note + 'id: '+ id )
            this.grid.cells[pos][note].notes[this.notes[i].id].remove();
            
        };
        //for var
        this.notes = [];
    }
    this.removeNote = function(id) {
        this.song.removeNote(id);
        for (var i = 0; i < this.notes.length; i++){
            if (this.notes[i].id == id){
                var note = this.notes[i];
                this.notes = this.notes.splice(0,i).concat(this.notes.splice(1));
                this.grid.cells[note.pos][note.note].notes[note.id].remove();
                delete this.grid.cells[note.pos][note.note].notes[note.id];
            }
        }
    }
    


}


function sideBarLeft(id,x,y,width,height,parent) {
    // sliding sidebar
    // should give access to waveView and slugMolder
    //slides out from left qhwn clicked
    
    //INITIALISING//
    this.parent = parent;
    this.isIn = true;
    this.waveViewOpen = false;
    this.slugMoldOpen = false;
    this.id = id;
    this.x = x;
    this.y = y;
    this.startWidth = 20;
    this.width = width;
    this.height = height;
    this.paper = new Raphael(document.getElementById(this.id),this.width,height);
    this.panel = this.paper.set();
    this.contentBar = this.paper.rect(x-800,y+10,width-5,height-15,5).attr(mainAttrs.sideBarMain);
    this.topBar = this.paper.rect(x-800,y,width,20,5).attr(mainAttrs.sideBarTop);
    this.closeButton =  this.paper.circle(x+10, y+10, 12).attr(mainAttrs.closeButton);
    this.phantomButton = parent.paper.circle(x+10, y+10,12).attr({'opacity': 0, 'cursor': 'pointer'});
    this.arrow = this.paper.path('M ' + (x + 8) + ','+ (y+5) + 'L' + (x+15)+','+(y+10)+' L'+(x+8) + ',' + (y+15)).attr(mainAttrs.buttonArrow)
    this.panel.push(this.closeButton);
    this.panel.push(this.arrow)
    
    
    
    // move html element to back (using zIndex) so it doesn't block the controls
    document.getElementById(this.id).style.zIndex = -1;
    this.wavePath = this.paper.set();
    
    //FUNCTIONS//
    
    this.slideOut = function(fn) {
        // slide bar out
        // move to front by setting zIndex to 1000
        // set sideBarLeft.isIn to false
        console.log('slugMoldOpen: '+ this.slugMoldOpen + ' waveViewOpen: ' + this.waveViewOpen)
        if (fn == undefined){
            fn = function(){};
        };
        if (this.isIn){
        console.log(fn);
        this.panel.animate({
            'transform': 't 600,0'},1000,'<');
            setTimeout(fn,1100);
            document.getElementById(this.id).style.zIndex = 1000;
            all.sideBarLeft.arrow.attr('path','M ' + (x + 15) + ','+ (y+5) + 'L' + (x+8)+','+(y+10)+' L'+(x+15) + ',' + (y+15) )
            this.isIn = false;
        } else {return}
    };
    
    this.slideIn = function() {
        // slide bar in
        // move to back by setting zIndex to -1
        // remove information from sideBar
        // set sideBarLeft.isIn to true,
        if (this.slugMoldOpen){
            this.slugMoldOpen = false;
            this.slugMold.close();
            this.slugMold = false;
        };
        if (this.waveViewOpen){
            this.waveViewOpen = false;
            this.wavePath.remove();
        }
        this.isIn = true;
        this.panel.animate({
            'transform': ''},1000,
            function() {});
        all.sideBarLeft.arrow.attr('path', 'M ' + (x + 8) + ','+ (y+5) + 'L' + (x+15)+','+(y+10)+' L'+(x+8) + ',' + (y+15));
        setTimeout(function() { document.getElementById(all.sideBarLeft.id).style.zIndex = -1;}, 1000)
        this.waveViewOpen = false;
        ;
    };
    
    this.showWave = function() { 
        if (this.slugMoldOpen){
            this.slugMold.close();
            this.slugMoldOpen = false;
            this.slugMold = false;
        }
    // draws wave on to sideBar
    // if sideBarLeft.isIn = true calls sideBarLeft.slideOut
        this.wavePath.remove()
        this.drawWave();            
        if (this.isIn) {
            this.slideOut();
        };
        this.waveViewOpen = true;
    }
    
    
    this.closeButton.node.onclick = function(){all.sideBarLeft.togglePath();}
    this.arrow.node.onclick = function(){all.sideBarLeft.togglePath();}
    this.phantomButton.node.onclick = function(){all.sideBarLeft.togglePath();x}
    this.togglePath = function() {
    // temporary function
    // toggles waveView
        if (all.sideBarLeft.isIn) {
            all.sideBarLeft.showWave();
        } else {
            all.sideBarLeft.slideIn();
        }
    }
    
    
    
    this.panel.push(this.topBar);
    this.panel.push(this.contentBar)
    
    this.getWave = function() {
        // calls drawWave function from newWave.js
        // returns set of samples as a string of x,y values
        // seperated by commas (svg bezier hack)
        var wave = drawWave(all.currentSlug.sound, this.width-250, this.height/5,100,x-580,y+120)
        return wave
    }
    
    this.morphWave = function() {
        // morphs old wave path to new wavepath
        // samplerate of paths the same so animation
        // should be smooth
        this.wavePath[0].animate({'path': this.getWave(), 'stroke': all.currentSlug.color},2000, 'easeInOut');
    }
    
    this.drawWave = function () {
        // draws wave screen and initial wave.

        // first, check to see if windows are open etc.
        if (this.waveViewOpen){return};
        if (this.slugMoldOpen){this.slugMold.close();}
        var transform = this.isIn ? '' : 't 600,0';
        
        // draw wave and background
        var slug = all.currentSlug;
        var screen = this.paper.rect(x-580,y+30,this.width- 250, this.height/1.5,4)
            .attr(mainAttrs.sideBarScreen)
            .transform(transform);
        var wave = this.paper.path(this.getWave())
            .attr({'stroke':all.currentSlug.color, 'stroke-width': 4})
            .transform(transform)
            
       // add to sets etc
       this.wavePath = this.paper.set();
       this.wavePath.push(wave);
       this.wavePath.push(screen);
       this.panel.push(this.wavePath);
    }
    
    this.openSlugMolder = function() {    
        // calls new slugMolder
        if (this.slugMoldOpen){
            console.log('molder already open.')
            return;
        } else{
            console.log('running new slugMolder command')
            this.slugMold = new slugMolder(20,30,this.width-250, this.height/1.5, this);
       }
    };
}

function slugMolder(x,y,width,height,parent){
    //contains all the widgetry for slug molding
    
    //check whats already open, and react accordingly
        //if (parent.slugMoldOpen){
            //return;
        //}
        console.log('opened slug Molder');
        if (parent.waveViewOpen){
            parent.wavePath.remove();
            parent.waveViewOpen = false;
        }
        if (parent.slugMoldOpen){
            return;
        }
        
        // 
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.parent = parent
        this.paper = parent.paper;
        this.parent.slugMoldOpen = true;
        this.nodeKeys = ['attack','decay','sustainLevel','release'];
        this.slugScaleX = 7
        this.slugScaleY = 7
        
        //FUNCTIONS//
        this.initialise = function() {
            // draws everything onto the screen etc.
           
            // TODO this needs to be automated and calculated
            var slugTransform = 't '+ this.x + ',' + (this.y+this.parent.y-20) + '  s '+ this.slugScaleX + ',' + this.slugScaleY +  ',0,0';
            
            
            this.screen = this.paper.rect(this.x,(this.y+ this.parent.y), this.width, this.height,3)
                .attr(mainAttrs.sideBarScreen)
                
            // draws current slug in current shape as Raphael element            
            this.slug = all.currentSlug.draw(this.paper, 0, slugTransform, 
                        {'fill': all.currentSlug.color,
                         'stroke': '#222', 'stroke-width': 5},
                          'moldSlug')
                          
            // add text for slugMold screen
            // TODO styling
            this.text = this.paper.set();
            this.text.push(this.paper.text(this.width-50, 150,'Attack: '))
            this.text.push(this.paper.text(this.width-50, 180,'Decay: '))
            this.text.push(this.paper.text(this.width-50, 210,'Sustain Level: '))
            this.text.push(this.paper.text(this.width-50, 240,'Release : '))
            this.text.push(this.paper.text(this.width-50, 270,'Duration : '))
            
            //initialise other bits and bobs..
            this.slugMold = this.paper.set();
            this.slugMold.push(this.slug)
            this.slugMold.push(this.screen)
            this.parent.panel.push(this.slugMold)
            this.getHooks();
            
            this.hooks.attr('cursor', 'col-resize');
            this.hooks[2].attr('cursor', 'move')
            this.saveButton = new button(this.width-55,300,80,20,mainAttrs.buttonTextAttrs,
				mainAttrs.buttonAttrs,{}, 'Save Shape',function() {
                                                    all.currentSlug.saveShape();
                                                  }, this);
	    this.octaveUpButton = new button(this.width-55, 30, 80,20,mainAttrs.buttonTextAttrs,
				mainAttrs.buttonAttrs,{}, 'Octave Up', function() {
					all.currentSlug.octave += 1;
					}, this);
            this.octaveUpButton = new button(this.width-55, 60, 80,20,mainAttrs.buttonTextAttrs,
				mainAttrs.buttonAttrs,{}, 'Octave Down', function() {
					all.currentSlug.octave -= 1;
					}, this);




            // needs to be somehow automated to stretch/squeeze with screens.
            this.caliberate();
        }
        
        this.close = function() {
            this.slugMold.remove();
            this.text.remove();
            this.hooks.remove();
            this.parent.slugMoldOpen = false;
        }
        this.caliberate = function() {
            // temporary function
            this.cal = {};
            this.cal.start = 80.0;
            this.cal.end = 600.0;
            this.durationRange = this.cal.end - this.cal.start;
            this.cal.peak = this.hooks[0].attr('cy');
            this.cal.base = this.hooks[3].attr('cy');
            this.ampRange = this.cal.peak - this.cal.base;
        }
        
        this.linearScaler = function(range,limits) {
            // returns function to convert hook coodinates to
            // envelope values
            // can be swapped for a signal generators in newWave.js
            var slugRange = limits[1] - limits[0];
            var variableRange = range[1] - range[0];
            var increment = variableRange/slugRange;
            return function(x) {return range[0] + increment*(x)};
        }
        
        this.getEnvelope = function() {
            // creates scaler functions
            var durationScaler = this.linearScaler([0.001,0.75],[this.cal.start, this.cal.end]);
            var ampScaler = this.linearScaler([1,0.001],[this.cal.peak, this.cal.base]);
            // applies functions to get new envelope values
            var A = durationScaler(this.hooks[0].attr('cx')-this.cal.start);
            var D = durationScaler(this.hooks[1].attr('cx') - this.hooks[0].attr('cx'));
            var Sl = ampScaler(this.hooks[2].attr('cy')-this.cal.peak);
            var S = durationScaler(this.hooks[2].attr('cx')-this.hooks[1].attr('cx'));
            var R = durationScaler(this.hooks[3].attr('cx')-this.hooks[2].attr('cx'));
            // duration is the time until the end of the sustain period 
            var duration = A + D + S;
            
            // update UI text with values
            // could be made more interesting.
            this.text[0].attr('text','Attack: '+ String(A).slice(0,4));
            this.text[1].attr('text', 'Decay: '+String(D).slice(0,4));
            this.text[2].attr('text', 'Sustain Level: '+String(Sl).slice(0,4));
            this.text[3].attr('text', 'Release: '+String(R).slice(0,4));
            this.text[4].attr('text', 'Duration: '+String(duration).slice(0,4));
            
            //update actual envelope with new values.
            // will be changed to change only slug.shape.x.sound            
            this.env = new envelope(A,D,Sl,R, all.sampleRate);
            //convert duration to samples
            all.currentSlug.sound.duration = Math.round(duration*all.sampleRate);
            this.save()
        }
        this.save = function() {
            var slugAttrList = [];
                for (var i = 0; i < this.slug.length; i++){
                    slugAttrList[i] = this.slug[i].attrs;
                }
            
            all.currentSlug.currentShape = {'path': slugAttrList,'env': this.env,'duration': all.currentSlug.sound.duration };
           // all.pallette.slugIms.remove();
           
            setTimeout(function(){all.pallette.drawSlugs()},2000);
        }
        
        this.getHooks = function() {
        // get hooks for dragging slug
        // on 4 nodes of the path
            if (! this.slugMold){
                return false;
            }
            var path = this.slugMold[0][1].attrs.path;// get path on which hook positions are based
            this.hooks = this.paper.set(); // make set
            for (var i = 1; i < 5; i++){
                var x = path[i][5];
                var y = path[i][6];
                //get raphael circle as hook
                var hook = this.paper.circle((x*7)+this.x,(y*7)+this.y+this.parent.y-20,6)
                    .attr(mainAttrs.hookAttrs);
                this.hooks.push(hook);
                hook.node.id = String(i)+'_node';
                var nKey = this.nodeKeys[i-1];
                hook.node.onmouseover = function() {
                    // animate all hooks
                    all.sideBarLeft.slugMold.hooks.animate({
                        'fill': 'white', 'transform': 's 2 2'},400);
                };
                hook.node.onmouseout = function() {
                    //animate back to start attrs
                    all.sideBarLeft.slugMold.hooks.animate({
                        'fill': mainAttrs.hookAttrs.fill,'transform': 's 1 1'
                    },400);
                };
                // add drag functions
                hook.drag(this.dragMoves[nKey], this.dragStart, this.dragUp)
            }
            
        }
        this.dragStart = function(x,y,e) {
        // called when hook is picked up
            // sets hook.ox and hook.oy to calculate
            // relative changes
            // 'this' is the raphael object attatched to the event
            var hooks = all.sideBarLeft.slugMold.hooks;
            for (var i = 0; i < hooks.length; i++) {
                hooks[i].ox = hooks[i].attr('cx');
                hooks[i].oy = hooks[i].attr('cy');
            };
            // animates selected hook
            this.animate({r:10, 'opacity': 8},500,">");        
        }
        
        this.dragMoves = {
            // an object containing the drag events
            'attack': function(dx,dy) {
                // attack only moves on the x-axis (time axis)
                // (therefore dy is ignored.. for now)
                var hooks = all.sideBarLeft.slugMold.hooks;
                var slug = all.sideBarLeft.slugMold.slug;
                // xMin limit is currently arbitrary.. needs reconfiguring
                // xMax ensures that decay node is  note pushed back further than
                // the end of sustain. (a bit messy)
                var limits = {'xMin':80, 'xMax':(this.ox +(hooks[2].ox-hooks[1].ox))}
                //relNode is the Decay node. it should move with the attack node.
                var relNode = hooks[1];
                var relDiff = relNode.ox - this.ox;
                var x = this.ox + dx;
                
                // check against limits
                if (x < limits.xMin) {
                    x = limits.xMin;
                }
                if (x > limits.xMax) {
                    x = limits.xMax;
                }
                // change values
                this.attr({cx: x});
                relNode.attr({cx: x+relDiff});
            },

            'decay': function(dx,dy) {
                // for decay. same as above
                var hooks = all.sideBarLeft.slugMold.hooks;                
                var limits = {'xMin':hooks[0].ox, 'xMax': hooks[2].ox }
                var x = this.ox + dx;
                if (x < limits.xMin){
                    x = limits.xMin;
                }
                if (x > limits.xMax) {
                    x = limits.xMax;
                }
                var diff = this.ox - x;
                this.attr({cx: x});
            },

            'sustainLevel': function(dx,dy){
                // captures both x-axis and y-axis movement
                var hooks = all.sideBarLeft.slugMold.hooks;                            
                var slug = all.sideBarLeft.slugMold.slug
                var limits = {'yMax': hooks[0].oy, // attack.y value (represents maximum amplitude)
                                'yMin': hooks[3].oy,// the floor
                                'xMin': hooks[1].ox,// Decay node
                                'xMax': hooks[3].ox,
                                }// release node
                // attached to releaseNode on x axis and Decay node on y axis
                var relNode = hooks[1];
                var relNode2 = hooks[3]
                var relDiff = relNode2.ox - this.ox; // calaculate difference between nodes
                var y = this.oy + dy;
                var x = this.ox + dx;
                if (y < limits.yMax){
                    y = limits.yMax
                };
                if (y > limits.yMin){
                    y = limits.yMin;
                };
                if (x > limits.xMax){
                    x = limits.xMax
                };
                if (x < limits.xMin){
                    x = limits.xMin;
                };

                this.attr({cy: y, cx:x});
                relNode.attr({cy: y});
                relNode2.attr({cx: x+relDiff})
            },
            'release': function(dx,dy){
                var hooks = all.sideBarLeft.slugMold.hooks;                            
                var slug = all.sideBarLeft.slugMold.slug
                var limits = {'xMin': hooks[2].attrs.cx}
                var x = this.ox + dx;
                if (x < limits.xMin) {
                    x = limits.xMin;
                };
                this.attr({cx: x});    
            }
        }
        
        this.dragUp = function() {
            // calls functions to change the slug envelope 
            // and change the appearence of the slug.
            this.animate({'r': 7, 'opacity': 0.4},1000,">");
            all.sideBarLeft.slugMold.warpSlug();
            all.sideBarLeft.slugMold.getEnvelope();
        }
        
        
        this.getHookCoords = function(){ 
        // gets the coordinates of the 4 hook nodes
            var coords = [];
            for (var i = 0; i < this.hooks.length; i++){
                var x = this.hooks[i].attrs.cx; 
                var y = this.hooks[i].attrs.cy; 
                coords.push([x,y]);
             }; 
             //return list
             return coords;  
        }
        
        
        this.moveBase = function(diffX, bodyPath){
            // moves the base of the slug when overall duration is changed
            // ie when either sustain (hook[2]) or release (hook[3])
            // are moved on the x-axis
            
            var slug = this.slug
            var base = slug[3];
            var tempBase = slug[3].clone();// create temporary path to get an editable 
            var basePath = tempBase.attrs.path;// copy of the actual path attribute
            tempBase.remove();// remove it
            for (var i = 1; i < 6; i+=2){// this needs changing. clearly doet not work.
                basePath[2][i] -= diffX;
                basePath[3][i] -= diffX;
                basePath[1][i] -= diffX;
                basePath[4][i] -= diffX;
                basePath[0][i] -= diffX;
                basePath[5][i] -= diffX;
                basePath[8][i] -= diffX;
               // basePath[7][i] -= diffX;
            }
            slug[3].animate({'path': basePath}, 1000,'elastic');
        
        }

        this.moveMouth = function(diffX, bodyPath) {   
            // construct temporary object
            var tempPath = this.parent.paper.path(bodyPath.slice(0,2)).attr({'opacity': 1, 'transform': 't 20,80 s7,7,0,0' });
            var slug = this.slug;
            // get path from temporary object
            var mouthPath = slug[4].attrs.path.slice();    
            // find point at distance 5 along the path
            var diffX = tempPath.getPointAtLength(5).x - mouthPath[0][1];
            var diffY = tempPath.getPointAtLength(5).y - mouthPath[0][2];
            tempPath.remove(); // remove temporary object
            //calculate changes to path
            for (var i = 0; i < mouthPath.length; i++){
                var node = mouthPath[i]
                for (var ii = 1; ii < node.length; ii+=2){
                    node[ii] += diffX;    
                };
                for (var ii = 2; ii < node.length; ii+=2){
                    node[ii] += diffY;    
                };
            };
            var mouth = slug[4];
            // apply path changes
            mouth.animate({'path' : mouthPath},1000,'elastic');
        }
        
        this.moveAntennas = function(diffX, path){
            //move antennas along with A hook
            var slug = this.slug
            var antL = slug[0].attrs.path.slice();
            var antR = slug[2].attrs.path.slice();
            var ants = [antL, antR]
            for (var i=0; i < ants.length; i++){
            // shift each node on sliced paath by diffX
                for (var ii = 0, ant = ants[i]; ii < ant.length; ii++){
                    for (var iii = 1, node = ant[ii]; iii < node.length; iii+=2){
                        node[iii] -= diffX;    
                    };
                };
            };
            // apply path transform
            slug[0].animate({'path': ants[0]}, 1000, 'elastic');
            slug[2].animate({'path': ants[1]}, 1000, 'elastic');
            // call this.moveMouth
            this.moveMouth(diffX, path);
        }
        
        
        this.warpSlug = function() {
            // calculates all changes
            // TODO
            // needs to be ported to be used on pallette
            // function of slug?
            var slug = this.slug
            // make clone of path
            var temp = this.slug[1].clone();
            var path = temp.attrs.path;
            // apply hooks changes to path
            var hooks = this.hooks; 
            temp.remove();
            for (var i = 1; i < 5;i++) { //iterate through hooks
                var newPosX = ((hooks[i-1].attr('cx')-this.x)/7)
                if (path[i][5] != newPosX){// if position of hook is not position of node:
                    var diffX = path[i][5] - newPosX; //get difference on X axis
                    for (var ii=1; ii < path[i].length; ii += 2){
                        path[i][ii] -= diffX;
                    }     
                    if (i==1) {// if attackNode, move antennas (which calls move mouth.. should probably be called from here..)
                        this.moveAntennas(diffX,path);
                    };
                    if (i==4){// if release node move base
                        this.moveBase(diffX, path);
                        
                    };
                    if (i==3){// if sustain node, shift angles of control points around
                    path[3][2] = (path[3][6]);
                    path[3][1] = (path[3][5]+path[2][5])/2
                    path[3][4]= (path[3][6]);
                    path[4][2] = (path[3][6] + path[4][6])/2
                    }
                }// calculate difference on y-asix
                var newPosY = ((hooks[i-1].attr('cy')-(this.y+this.parent.y-20))/7)
                if (path[i][6] != newPosY){;// if different:
                    var diffY = path[i][6] - newPosY;// get difference
                    for (var ii=2; ii < path[i].length; ii += 2){// shift
                        path[i][ii] -= diffY;
                    };            
                };
            }
            // apply animations from model path                             
            slug[1].animate({'path':path},1000,'elastic');
        };
        
        
        this.remold = function() {
            // edit copy of slug on pallette.
            //TODO DOES NOT WORK
            var slugAttrList = [];
            var mySlug = all.pallette.slugIms[all.currentSlug.id];
            for (var i = 0; i < this.slug.length; i++){
                slugAttrList[i] = this.slug[i].attrs;
            }
            var transform = mySlug.tData;
            var attrs = mainAttrs.palletteSlugs;
            attrs.color = all.currentSlug.color
            console.log(attrs);
            console.log(transform)
            var id = mySlug[0].node.id.slice(1)
            mySlug.remove();
            
            var newSlug = all.currentSlug.draw(all.paper,0,transform,attrs,id);
            all.pallette.slugIms[all.currentSlug.id] = newSlug;
            };





        
        this.initialise();
}

function pallette(xMargin,yMargin, parent) {
    // contains a control bar with Mold, and waveView functions
    // also holds the active slugs.
    // when a slug is clicked, a sidebar containing its stored shapes
    // should open.
    // clicking mold should open the slugMold view
    //clicking waveView should open the wave view
    // control bar should change color with currently selected Slug
    // TODO a new draw slug function with remold functionality.
    
    
    this.parent = parent;
    this.xMargin = xMargin;
    this.yMargin = yMargin;
    this.x = this.xMargin;
    this.y = this.parent.pixelHeight-this.parent.palletteHeight + this.yMargin;
    this.width = this.parent.pixelWidth - (2*xMargin);
    this.height = this.parent.palletteHeight - (2*yMargin);
    this.slugs = this.parent.palletteSlugs;
    this.attr = mainAttrs.palletteAttrs;
    this.paper = this.parent.paper;
    this.r = this.paper.rect(this.x,this.y,this.width,this.height, 10).attr(this.attr)
    this.slugIms = this.paper.set()
    this.text = [];
    this.slugScale = this.width/300
    this.drawSlugs = function() {
        if (this.slugIms.length > 0){
            console.log('removing..')
            for (var i = 0; i < this.slugIms.length; i++){
                this.slugIms[i].remove();
            }
            for (var i = 0; i < this.text.length; i++){
                this.text[i].remove();
            }
            this.slugIms = this.paper.set();
            this.text = []
        }
        //POpulates the pallette.
        //pallette.slugScale calculates the optimum size for the slugs to be displayed
        for (var i = 0; i < this.slugs.length; i++) {
            // draw each slug, and write slugs name.
            // all measurements scaled by scale factor.
            var slug = this.slugs[i];
            var attrs = Object.create(mainAttrs.palletteSlugs);
            attrs.fill = slug.color;
            attrs.stroke = '#222'
            attrs['stroke-width'] = attrs['stroke-width'] * this.slugScale
            var transform = 't '+ ((i * 75*this.slugScale)+(this.x*2)) +',' + (this.y) + // adjust positioning
                             's '+ this.slugScale + ',' + this.slugScale + ',0,0' // adjust scaling
            var slugIm = slug.draw(this.paper,0,transform, attrs, String(i)+'_pallette' );
            
            
            var text = this.paper.text((i*75*this.slugScale)+this.x+45*this.slugScale,
             this.y + 10*this.slugScale, slug.name).attr(mainAttrs.palletteText);
            text.attr('font-size',text.attrs['font-size']*this.slugScale);
            slugIm.tData = transform
            //slugIm.drag(dragMove, dragStart, dragEnd);
            
            
            slugIm[1].node.onclick = function () {
		if (this.id[0] != all.currentSlug.id){
                	all.changeCurrentSlug(this.id[0]);
		} else {
			if (all.pallette.shapesRect){
				all.pallette.shapesRect.remove();
				all.pallette.shapesRect = undefined;
				if (all.pallette.slugShapeSet){
					all.pallette.slugShapeSet.remove();
					all.pallette.slugShapeSet = undefined;
				};
				if (all.pallette.shapeSetText){
					all.pallette.shapeSetText.remove();
					all.pallette.shapeSetText = undefined;
				};
			} else {
	 			all.pallette.showShapes(this.id[0]);
			};
            	}
	    };            
            //add slugIm and text to pallette.slugIms[name]
            this.slugIms.push(slugIm);
            this.text.push(text);
        }
        
    
    }
    this.showShapes = function(id){
	// Opens pop up box contaiing slugs saved shapes.
	// if already present, remove them.

	if (this.shapesRect){
			this.shapesRect.remove();
		}
	if (this.slugShapeSet){
			this.slugShapeSet.remove();
		}
	if (this.shapeSetText){
		this.shapeSetText.remove();
	};

	var slug = this.slugs[id];
	var currentShape = slug.currentShape
	var posX = (id*75*this.slugScale);

	this.shapesRect = this.paper.set();
	this.shapesRect.push(this.paper.rect(posX, this.y-50, 80*this.slugScale, 70, 10).attr(mainAttrs.shapeBox));
	var path = "m "+(posX+(15*this.slugScale))+','+ (this.y+18) + ' L' + (posX+(20*this.slugScale)) + ',' + (this.y+47) + ' L ' + (posX+ (25*this.slugScale)) + ',' + (this.y+18)//+ ' Z' +(posX+(40*this.slugScale))+','+this.y;
	this.shapesRect.push(this.paper.path(path).attr(mainAttrs.shapeBox));

	this.shapeSetText = this.paper.text(posX+(25*this.slugScale), this.y-35, slug.name+"'s Shapes")
			.attr({'font-size': 15, 'fill': '#222'});
	
	var slugAttrs = Object.create(mainAttrs.palletteSlugs);
	slugAttrs.fill = slug.color;
	slugAttrs['stroke-width'] = slugAttrs['stroke-width']*this.slugScale/3;
	var offset = 0;
	this.slugShapeSet = this.paper.set();
	for (var i = 0; i < Math.min(all.currentSlug.shapes.length, 4); i++){
		var shape = all.currentSlug.shapes[i];
		if (shape != currentShape){
			all.currentSlug.currentShape = shape;
			console.log(shape.length);
			var transform = 't '+ ((posX) +5+ (i-offset)*25*this.slugScale) + ',' + (this.y-35) + 's ' + (this.slugScale/2.5) + ',' + this.slugScale/2.5 + ',0,0'
			var slugShape = all.currentSlug.draw(this.paper, 0, transform,slugAttrs , id+'_shape_'+i);	
			slugShape[1].node.onclick = function() {
				var shapeid = this.id[this.id.length-3];
				var slugid = this.id[0];
				console.log('full id ' + this.id + ' slugId: ' + slugid + ' shapeId: ' + shapeid);
				slug = all.currentSlug;
				slug.currentShape = slug.shapes[shapeid];
				for (var i = 0; i < all.pallette.slugIms[slugid].length; i++){
					all.pallette.slugIms[slugid][i].attr('path', slug.currentShape.path[i].path)
				}	
				all.pallette.shapesRect.remove();
				all.pallette.shapesRect = undefined;
				all.pallette.slugShapeSet.remove();
				all.pallette.slugShapeSet = undefined;
				all.pallette.shapeSetText.remove();
				all.pallette.shapeSetTest = undefined;
			}
			this.slugShapeSet.push(slugShape);
		}
		else {offset = 1;} 
	}
	all.currentSlug.currentShape = currentShape;
	
    }
    this.remold = function(id) {
            // edit copy of slug on pallette.
            //TODO DOES NOT WORK
            var slugAttrList = [];
            var mySlug = all.pallette.slugIms[id];
            for (var i = 0; i < mySlug.length; i++){
                slugAttrList[i] = this.slug[i].attrs;
            }
            var transform = mySlug.tData;
            var attrs = mainAttrs.palletteSlugs;
            attrs.color = all.currentSlug.color
            console.log(attrs);
            console.log(transform)
            var id = mySlug[0].node.id.slice(1)
            mySlug.remove();
            
            var newSlug = all.currentSlug.draw(all.paper,0,transform,attrs,id);
            all.pallette.slugIms[all.currentSlug.id] = newSlug;
            };


    this.drawSlugs();
};



function controls(x,y,xMargin, yMargin,id,height, buttons, barAttrs,parent){
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.xMargin = xMargin;
    this.yMargin = yMargin;
    this.id = id;
    this.height = height;
    this.buttons = buttons;
    this.buttonSet = [];
    this.body = this.parent.paper.rect(this.x+this.xMargin,this.y+this.yMargin,
    this.parent.pixelWidth-(2*this.xMargin),this.height,5)
        .attr(barAttrs)
        .toBack();
        
    this.drawButton = function(aButton) {
        var aButton = aButton;
            this.buttonSet.push(new button(aButton.x,aButton.y, aButton.width, 
                aButton.height, aButton.textAttrs,aButton.attrs,aButton.pressAttrs,
                aButton.text, aButton.func,this.parent))
            //this.button = thisButton
    }
}

function button(x, y,width,height,textAttrs, attrs, pressAttrs, text, fn,parent) {
    this.parent = parent;
    this.paper = this.parent.paper;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.attrs = Object.create(attrs);
    this.pressAttrs = Object.create(pressAttrs);
    this.textAttrs = Object.create(textAttrs)
    this.text = text;
    this.fn = fn;
    //this.set = this.paper.set()
    this.rect = this.paper.rect(this.x,this.y,this.width,this.height,3);
    this.rect.attr(mainAttrs.buttonAttrs);
    this.textObj = this.paper.text(this.x+ this.width/2,this.y+this.height/2,this.text)
    this.textObj.attr(mainAttrs.buttonTextAttrs)
    //this.set.push(this.rect);
    //this.set.push(this.textObj);
    this.rect.node.onclick = fn;
    this.textObj.node.onclick = fn;
}

function grid(x,y,xMargin, yMargin, parent) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.paper = this.parent.paper;
        this.xMargin = xMargin;
        this.yMargin = yMargin;
        this.width = this.parent.pixelWidth-(2*this.xMargin)-x;
        this.height = this.parent.pixelHeight-this.parent.palletteHeight-(2*yMargin)-y;
        this.scale = this.parent.scale;
        this.columns = this.parent.gridLength;
        this.rows = this.scale.length;
        this.cellWidth = ((this.width)/this.columns) - 3;
        this.cellHeight = ((this.height)/this.rows) -3;
        
        this.drawCells = function() {
            columns = [];
            for (var ix = 0; ix < this.columns; ix ++) {
                var row = [];
                for (var iy = 0; iy < this.rows; iy++) {
                    var aCell = new cell((ix*(this.cellWidth+3))+this.xMargin+x,
                                      (iy*(this.cellHeight+3))+this.yMargin+y,
                                      this.cellWidth,
                                      this.cellHeight,
                                      iy,
                                      ix,
                                      this.paper,
                                      this);
                                      
                   row.push(aCell);
                };
                columns.push(row);
            }
            return columns;
        
        }
        this.cells = this.drawCells();

}
    
function cell(x, y, width, height,note, pos,paper, parent) {
    this.parent = parent
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.attrs = mainAttrs.cellAttrs;
    this.note = note;
    this.pos = pos;
    this.notes = {};
    this.paper = paper;
    this.r = this.paper.rect(this.x,this.y, this.width, this.height, 5).attr(this.attrs);
    this.r.data('cell', this)
    this.r.node.setAttribute('pos', this.pos)
    this.r.node.setAttribute('note', this.note)
    this.r.node.onmouseover = function() {
            var cell = all.grid.cells[pos][note];
            cell.r.attr({'fill': all.currentSlug.color});
         //   console.log('pos:'+ pos + ' note: '+ note)
        };
    this.r.node.onmouseout = function() {
        var cell = all.grid.cells[pos][note];
        cell.r.animate({'fill': mainAttrs.cellAttrs.fill}, 400);
    }
    this.r.node.onclick = function() {
        var cell = all.grid.cells[pos][note];
	id = String(Math.round(Math.random()*1000000));
	cell.addNote(id);
    }
    this.addNote = function(id){
        var slug = all.currentSlug;
        var scaleFactorY = this.parent.height/200;
	var scaleFactorX = all.pixelWidth/550;
        
        var transform = 't '+ this.x + ',' + (this.y-((scaleFactorY*37)-this.height)) + ' s '+ scaleFactorX + ',' + scaleFactorY + ',0,0';
       
        var slugIm = slug.draw(this.parent.paper, 0,transform,mainAttrs.palletteSlugs,id );
        slugIm[1].node.onclick = function() {
            var id= this.id.split('_')[0];
            all.removeNote(id);
            
        }
        slugIm.attr('fill', slug.color)
        all.addNote(pos,note,id)
        this.notes[id] = slugIm;
    }

    
}

function slugFamily(name,id, waveTableGenerator,color, octave, shapes,pk){
// Holds slugs sound object as well as shape information, color etc.
// functions:
//  slugFamily.addShape() => returns shape.id
//  slugFamily.getTone(shape.id) => returns toneGenerator
//  slugFamily.printSlug(object, pos, transform, id) => returns Raphael.path 

    this.name = name;
    this.pk = pk;
    this.id = id;
    this.sound = waveTableGenerator;
    this.color = color;
    this.octave = octave;
//    this.path = path;
    //this.id = id;
    this.shapes = shapes;
    this.currentShape = this.shapes[0]
    
    this.draw = function(paper, shape,transform, attrs, id) {
        var paths = this.currentShape.path;
        var slug = paper.set();
        for (var i = 0; i < paths.length; i++){
            var path = paper.path(paths[i].path)
                .attr(attrs)
                .transform(transform)
                .attr('cursor','pointer');
           path.node.setAttribute('id', id + '_' + i);
           slug.push(path);
        };
        return slug;
    }
    this.getTone = function(freq,amplitude) {
        this.sound.baseFreq = freq*Math.pow(2,this.octave);
        this.sound.baseAmp = amplitude;
        this.sound.env = this.currentShape.env;
	this.sound.duration = this.currentShape.duration;
        this.sound.refreshWaves();
        return this.sound;
    };
    this.quickPlay = function() {
        var env = this.currentShape.env
        var songLength = this.sound.duration + env.R;
        var play = new loop(songLength,this.sampleRate);
        play.addNote(0,this.getTone(32,0.5));
        dataArray = play.data;
        start = 0;
        play.play();
        setTimeout(function(){play.clear()},songLength/all.sampleRate*1000)
    }
    this.saveShape= function(){
	envhash = {
		'A':this.currentShape.env.AttackSeconds,
		'D':this.currentShape.env.DecaySeconds,
		'S':this.currentShape.env.S,
		'R':this.currentShape.env.ReleaseSeconds,
		'shape':this.currentShape.path,
		'duration': this.sound.duration
	};
	Dajaxice.slugs.saveShape(savedSlug, {'slugName': this.name, 'env':JSON.stringify(envhash)});
	}
    //this.addShape = function(env) {
    //    var shape = getSlugShape(this.path,env);
    //    var envelope = getEnvelope(env);
    //    var id = this.shapes.length;
    //    var name = '';
    //    this.shapes.push({'shape': shape, 'envelope': envelope, 'id':id, 'name': name});
    //    this.sound.changeEnv()
    //};
};

// sound functions

function savedSlug(data) {
	console.log('saved slug');
	all.currentSlug.currentShape.pk = data.pk;
	all.currentSlug.shapes = [all.currentSlug.currentShape].concat(all.currentSlug.shapes);
}

function getEnvelope(env) {

}

//Raphael functions

var all;
function getShape(path, shape) {

}


var mainAttrs ={'cellAttrs': {
                    'fill': '#3F7C22',
                    'stroke': '#94BE80',
                    "stroke-width": 5,
                    "stroke-opacity": 0,
            },
            'paperAttrs': {
            
            },
            'palletteAttrs': {
                //'fill': '#486C62',
                //'stroke': '#486C62',
                'stroke-width': 0,
            },
            'palletteSlugs': {
                'stroke': '#222',
                'stroke-width': 1, 
                'stroke-opacity': 0.6,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'cursor': 'pointer',
            },
            'palletteText': {
                'font-size': 10,
                'font-weight': 'bold',
                'fill': '#777',
                'opacity': 1,
            },
            'topBarAttrs': {
                'stroke-width': 0, 
                //'stroke-opacity': 0.2,
                //'stroke-linecap': 'round',
                //'stroke-linejoin': 'round',
                //'fill': '#919D69',
                //'stroke': '#6F8F5F5'
            },
            'sideBarTop': {
                'fill': '#23530F',
                'stroke': '#184505',
                'stroke-width': 2,
            },
            'sideBarMain': {
                'fill': '#8FBF7B',
                'opacity': 0.8,
                'stroke': '#8FBF7B',
                'stroke-width': 1,
            },
            'sideBarScreen': {
                'fill': '#444',
                'opacity': 1,
                'stroke': '#222',
                'stroke-width': 2,
            },
            'waveAttrs': {
                'stroke-width': 3,
                'stroke-opacity': 1,
            },
            'buttonAttrs': {
                    'fill': '#6F8F5F',
                    'stroke': '#ADDF95',
                    "stroke-width": 5,
                    "stroke-opacity": 0.1,
                    'cursor': 'pointer'
            },
            'buttonArrow': {
                'stroke': '#184505',
                'stroke-width': 3,
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'cursor': 'pointer'
            },
            'buttonTextAttrs': {
                    'fill': '#444',
                    'font-size': 14,
                    'cursor': 'pointer',
            },
            'buttonPressAttrs': {
                'fill': '#94Be80'
            },
            'hookAttrs': {'fill': 'black',
                'opacity': 0.4,
                'cursor': 'move',
                'stroke-width': 0
            },
            'closeButton': {'fill': '#23530F',
                            'stroke': '#184505',
                            'stroke-width': 2,
                            'cursor': 'pointer'
                             },
	    'shapeBox':{
		'fill': '#23530F',
                'stroke': '#184505',
                'stroke-width': 2,

		},
    }
    
var namesRand = ['Billy','Tess','Barbara','Jon','Emma','Slug','Milton','Norman','Tod', 'Gary', 'Wilma'];    

var wavesRand = [sine,sine, square];

    
function randomSlug(id, color) {
    var shapes = [{'path': slugTwo, 'env':env1}];
    var env1 = new envelope(0.1,0.2,0.7,0.1,sampleRate)
        var shapes = [{'path': slugTwo, 'env':env1}];    
    var id = id;
    var name = namesRand[Math.round(8*Math.random())];
    var wave = wavesRand[Math.round(2*Math.random())];
    var overtones = [[1,1]];
    var oLength = 1+ (Math.random()*4)
    var color = "hsb("+color+",0.5,0.5)";
    for (var i = 0; i < oLength;i++) {
        var n = Math.round(Math.random()*15)+1;
        overtones.push([n,n*(Math.random()+0.5)])
    }
    var sound = new compoundSound(wave,330,0.15,0.38,sampleRate,env1,overtones,new constant(0), new constant(0), new constant(0));
    return new slugFamily(name,id, sound, color, 3,shapes)
    
}

// AJAX FUNCTIONS//
    
    
function getDefaultPlayerSlugs(fn, args){
	Dajaxice.slugs.getDefaultPallette(fn, args);
}

function getSongSlugs(fn, args){
	Dajaxice.song.getSongSlugs(fn, args);
}

var returned;
function setup(data) {
	if (all){
		all.clear()
	}
	slugs = [];
	console.log(data.message);
	if (data.message == 'None') {
		color = Math.random();
		for (var i = 0; i < 4; i++){
			slugs.push(randomSlug(i, (color+i*0.25)%1));
		}
	}
	else {
		for (var i = 0; i < data.slugs.length; i++){	
			slugs.push(parseSlug(data.slugs[i], i));
		}
	}
	
	var id = 'track',
	    length = 16,
	    baseFreq = 16.532,
	    scale = scales.major,
	    tempo = 240
	    width = 1000,
	    height = 500,
	    notes = [];
	 
	all = new main(id, length,baseFreq, sampleRate, scale, tempo, width, height, slugs, notes);
	all.changeCurrentSlug(0);
	
}


function setup_load(data) {
	if (all){
		all.clear()
	}
	song = data.song;
	slugs = [];
	for (var i = 0; i < song.slugs.length; i++){
		slugs.push(parseSlug(song.slugs[i], i))
	}
	var id = 'track'
	    length = song.length
	    baseFreq = 16.532
	    scale = scales.major
	    tempo = song.tempo
	    width = 1000
	    height = 500
	    notes = []
	all = new main(id, length, baseFreq, sampleRate, scale, tempo, width, height, slugs, notes)
	addNotes(JSON.parse(song.notes))
	all.changeCurrentSlug(0)
	document.getElementsByTagName('title')[0].innerHTML = 'SlugJam | '+song.name
}

function parseSlug(slugJSON,id) {
	var sampleRate = 44100;
	var shapes = [];
	for (var i = 0; i < slugJSON.shapes.length; i++){
		var shapeJSON = slugJSON.shapes[i]
		var env  = new envelope(shapeJSON.A, shapeJSON.D, shapeJSON.S, shapeJSON.R, sampleRate);
		var path = JSON.parse(shapeJSON.shape);
		var duration = shapeJSON.length;
		var pk = shapeJSON.pk
		shapes.push({'env': env, 'path': path, 'duration': duration, 'pk':pk});
	}
	var soundJSON = slugJSON.sound;
	var sound = new compoundSound(eval(soundJSON.waveForm), 330, soundJSON.amp, 0.38, sampleRate, env, JSON.parse(soundJSON.overTones), new constant(0), new constant(0), new constant(0));
	var slug = new slugFamily(slugJSON.name, id, sound, "hsb("+slugJSON.color/180+",0.5,0.5)", 4, shapes, slugJSON.pk)
	return slug;
	}

function saveSong(name){
    var songObj = {'tempo': all.tempo, 'length': all.grid.columns, 'name': name,'scale': 'Ma'}
    songObj.notes = all.notes;
    Dajaxice.song.saveSong(test_callback, {'songString':JSON.stringify(songObj)});
}

function test_callback(data){
	console.log(data.message)
}


function loadSong(songPK){
	Dajaxice.song.loadSong(setup_load, {'songPK':songPK});
}
function getSlugByPk(pk){
	for (var i = 0; i < all.palletteSlugs.length; i++){
		if (all.palletteSlugs[i].pk == pk){
			return all.palletteSlugs[i];
		}
	}	
	console.log('slug ' + pk +' not found');
	return;
}

function getShapeByPk(pk){
	var slug = all.currentSlug;
	for (var i = 0; i < slug.shapes.length; i++){
		if (slug.shapes[i].pk == pk){
			return slug.shapes[i]
		}
	}
	console.log('shape ' + pk + ' not found')
	return;

}

var song;


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addNotes(notes){
    for (var i = 0; i < notes.length; i++){
        var note = notes[i]
        all.currentSlug = getSlugByPk(note.slugpk)
        all.currentSlug.currentShape = getShapeByPk(note.envpk)
        var id = i;
        all.grid.cells[note.pos][note.note].addNote(id);
    }
}
