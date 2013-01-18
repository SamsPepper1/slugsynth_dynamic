//    newWave.js version < 0.02

// A set of oscillators etc produced for use in SlugJam (slugJam.net)

//    Copyright (C) 2013 Sam Sharp

//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.

//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.



//
//
//



function loop(duration, sampleRate) {
    // Main object.
    //takes duration(in samples) and sampleRate
    // as arguments
    //
    this.duration = Math.round(duration);
    
    console.log(this.duration)
    this.sampleRate = sampleRate;
    this.pos = 0;
    //initialise empty data array
    this.data = new Float32Array(this.duration);
    this.notes = {}
    
    this.addNote = function (start, wave,id) {
        console.log('adding note..' + id + ' Frequency of ' + wave.baseFreq)
        wave.pos = 0;
        var sample = wave.writeNext();
        var i = 0;
        //calls writeNext function on sound object
        // for each sample, adding the returned value to this.data
        // sound.writeNext() will return false when the envelope
        // returns value of < 0
        while (sample !==false) {
            this.data[(start + i)%this.duration] += sample;
            sample = wave.writeNext();
            i++;
        };
        // wave write position is reset
        //console.log(start);
        wave.pos = 0;
        // sound is added to this.notes
        var env = [wave.env.AttackSeconds,wave.env.DecaySeconds,wave.env.S,wave.env.ReleaseSeconds]
        this.notes[id] = {start: start,end : (start+wave.duration+wave.env.R)%this.duration,duration: wave.duration,amp: wave.baseAmp, wave: wave, freq: wave.baseFreq,env: env, removed : false };
    };
    this.clear = function() {
        // clears this.data and this.notes
        this.data = new Float32Array(this.duration);
        this.notes = {};
        dataArray = this.data;
    };
    this.removeNote = function (id) {
        console.log('removing note..' + id)
        // Currently Not working!!
        //need to reproduce whole this.data for values between
        //this.data[start] and this.data[start+wave.duration+wave.env.R]
        var note = this.notes[id];
        if (!note || note.removed){ return;}
        var wave = note.wave;
        wave.baseFreq = note.freq;
        wave.duration = note.duration;
        wave.baseAmp = note.amp;
        wave.env = new envelope(note.env[0],note.env[1],note.env[2],note.env[3],this.sampleRate)
        wave.pos = 0;
        var start = note.start
        wave.refreshWaves();
        var sample = wave.writeNext();
        var i = 0;
        while (sample !== false) {
            this.data[(start + i)%this.duration] -= sample
            sample = wave.writeNext();
            i++;
        }
        note.removed = true;
        //console.log('finished ewmoving note. edited ' + i + ' samples');
        console.log(wave)
    }
    this.play = function() {       
        //  Calls global function play(sampleRate, readFn)
        // should send this.data as an argument.
        this.stopInt = play(this.sampleRate,postData);
        }
    this.quickplay = function(){
        this.audio = new Audio();
        this.audio.mozSetup(1,this.sampleRate);
        this.audio.mozWriteAudio(this.data)
        this.audio.play();
    }
}


// SIGNAL GENERATORS //
// call constructor with initialisation arguments to get
//signalGenerator object
//calling signalGenerator.get(value) will return an
// output according to the function. 
//(value is normally the time variable)
// input parameters are different for different generators.
// signal generators can function either to produce a tone
// or to modulate the existing tone (through phase and fm)
// parameters of sound of compoundSound.


function constant(value){
    // simply returns value
    // this method is necessary to easily replace other 
    //signal generators with a constant without producing 
    //special cases for code.
    this.value = value
    this.get = function() {
        return this.value;
    }
}

function straight(minValue,maxValue,duration,sampleRate){
    // straight line graph.
    // value extremes are the first two parameters,
    // duration id the third. (should maybe be a straight.get parameter?)
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.sampleRate = sampleRate;
    this.duration = duration*this.sampleRate;
    this.increment = (maxValue-minValue)/this.duration;
    this.get = function(pos){
        return this.minValue + pos*this.increment
    };
}

function exponential(minValue,maxValue,duration,sampleRate){
    // draws exponential curve
    // minValue and maxValue
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.sampleRate = sampleRate
    this.duration = duration*this.sampleRate
    this.increment = 1/this.duration;
    this.get = function(pos) {
        return ((Math.pow(Math.E,pos*this.increment)-1)/(Math.E-1))*(this.maxValue-this.minValue) + this.minValue
    }
}

function sine(freq,amplitude,sampleRate) {
    // freq, amplitude, sampleRate
    // sine.get(pos) returns sine wave at given frequency.
    // phase and mod values (not generators) can be passed
    // as 2nd and 3rd arguments for get method
    //sine.get(pos,phaseValue, fmValue)) 
    this.freq = freq;
    this.amplitude = amplitude;
    this.sampleRate = sampleRate;
    this.get =  function(pos,phase,fm) {
        return this.amplitude * Math.sin(pos/(this.sampleRate/(this.freq*2*Math.PI+fm) + phase));
    }
}

function square(freq, amplitude, sampleRate) {
    // freq, amplitude, sampleRate.
    // square.get(pos, phaseValue, fmValue)
    // currently, phase and fm are much more sensitive
    // than with sine generator
    this.freq = freq;
    this.amplitude = amplitude;
    this.sampleRate = sampleRate;
    this.wavelength = this.sampleRate/this.freq
    this.get = function(pos,phase,fm) {
        return ((pos+phase)%this.wavelength < ((this.wavelength/2)+fm) ? 0.6 : -0.6)*this.amplitude;
    }
}

function noise(frequency,amplitude,sampleRate) {
    // frequency and sampleRate are ignored.
    // returns random value between -amplitude and amplitude.
    // will become more useful when filters are added
    // allowing subtractive synthesis
    this.amplitude = amplitude;
    this.get = function() {
        return (Math.random()-0.5)*2*this.amplitude
    }    
}


// SOUND OBJECTS
//these are the objects added to the loop object
//they  contiain a set of signal generators
// which are passed through an envelope.
// the sound.writeNext() function will return the next sample
// and call this.pos++

//TODO merge into subclassed objects??
// using object.prototype??



function sound(waveshape,freq, amplitude,duration, sampleRate,env,phase,fm) {
    // parameters: waveShape, baseFrequency, duration (ADS),
    // envelope, phaseGenerator and fmGenerator
    // TODO this.phase, this.fm, and this.fuzz should default to new constant(0)
    // if no argument is given
    // this.changeAmp method - same as this.changeFreq
    this.phase = phase;
    this.fm = fm;
    this.pos = 0;
    this.baseFreq = freq;
    this.amp = amplitude;
    this.sampleRate = sampleRate;
    this.waveshape = this.waveshape;
    this.wave = new this.waveshape(this.BaseFreq,this.amp,this.sampleRate);
    this.duration = sampleRate*duration;
    this.env = env
    this.refreshWave = function(){
        this.wave = new this.waveshape(this.baseFreq, this.amp, this.sampleRate);
    }
    this.writeNext = function() {
        var envValue = this.env.generate(this.pos++,this.duration);
        return envValue >= 0 ? envValue*this.wave.get(this.pos,this.phase.get(this.pos,0,0),this.fm.get(this.pos,0,0)) : false;
    };
}

function compoundSound(waveShape, baseFreq, baseAmp,duration, sampleRate, env, overtones, phase, fm, fuzz) {
    // TODO should be made subclass of sound object.
    // functions the same, except that it contains a set of waves
    // of different frequencies in the form [[f,a],[f1,a1]]
    // where freq = f*this.baseFreq and amp = this.baseAmp/a
    this.phase = phase;
    this.fm = fm;
    this.fuzz = fuzz || new constant(0);
    this.pos = 0;
    this.baseFreq = baseFreq;
    this.baseAmp = baseAmp;
    this.duration = duration*sampleRate;
    this.sampleRate = sampleRate;
    this.env = env;
    this.overtones = overtones;
    this.waveShape = waveShape;
    this.refreshWaves = function() {
    // generates waveSet from list of relative wave values.
    // should be altered to include envelopes, and generate waves as 'sounds'
        this.waves = []
        for (var i = 0; i < this.overtones.length; i++) {
            this.waves.push( new this.waveShape(this.baseFreq*this.overtones[i][0], this.baseAmp/this.overtones[i][1], this.sampleRate))
        };
    };
    this.refreshWaves();
    this.writeNext = function() {
        var envValue = this.env.generate(this.pos++,this.duration);
        var v = 0;
        var ph = this.phase.get(this.pos,0,0);
        var fm = this.fm.get(this.pos,0,0);
        if (envValue < 0) {
            return false
        };
        for (var i = 0; i < this.overtones.length; i++){
            v += envValue*this.waves[i].get(this.pos,ph,fm);
        }
        return v + (fuzz.get()*envValue)
    }
}


function envelope(A,D,S,R, sampleRate, octave) {
    // constructor for envelope generator
    // takes attack, decay,and release values in seconds
    //TODO A,D,S,R could all be signal generators.
    // this will be especially useful when logarithmic
    // and exponential signalsGenerators are added
    if (octave == undefined){
	this.octave = 4;
    }else{
	this.octave = octave;
    }
    this.sampleRate = sampleRate;
    this.AttackSeconds = A
    this.A = A*this.sampleRate;
    this.DecaySeconds = D
    this.D = D*this.sampleRate;
    this.S = S;
    this.ReleaseSeconds = R
    this.R = R*this.sampleRate;
    this.incA = 1/this.A;
    this.incD = (1-this.S)/this.D;
    this.incR = (this.S/this.R);
    this.generate = function(pos, length){
        if (pos <= this.A) {
            return pos*this.incA; 
        };
        if (pos <= this.A+this.D){
            return 1 - (pos-this.A)*this.incD;
        };
        if (pos < length){
            return this.S;
        };
        return this.S - ((pos-length)*this.incR);
    };
}


// Draw functions

function drawWave(sound, width, height,sampleRate, xOffset, yOffset){   
    // will be attatched to GUI object in main slugsynth 
    var path = 'M '+ xOffset+',' + ((height/2) + yOffset) + ' R ';
    var waveLength = sound.sampleRate/sound.baseFreq;
    var interval = waveLength/sampleRate*2;
    //console.log(interval)
    var amplitude = height*7;
    var samplePixel = width/sampleRate
    for (var i = 0; i < sampleRate+1; i++){
        var x = (i*samplePixel) + xOffset;
        sound.pos= Math.round(sound.env.A+sound.env.D +(i*interval));
        var y = (sound.writeNext()*amplitude)+(height/2)+yOffset;
    //    console.log(sound.pos);        
        path += String(x) + ',' + String(y) + ' ';    
    }    
    return path;};

//PLAY FUNCTIONS
//takes loop.data and feeds it into audio element buffer
// stalls slightly when adding many notes, or moving mouse over
// svg grid.


//TODO
//* write webkit play() function
//* tidy
//
function play(sampleRate, readFn) {
    // Initialize the audio output.
    audio = new Audio();
    audio.mozSetup(1, sampleRate);

    var currentWritePosition = 0;
    var prebufferSize = sampleRate; // buffer 500ms
    var tail = null, tailPosition;

    // The function called with regular interval to populate 
    // the audio output buffer.
    interval = setInterval(function() {
      var written;
      // Check if some data was not written in previous attempts.
      if(tail) {
        written = audio.mozWriteAudio(tail.subarray(tailPosition));
        currentWritePosition += written;
        tailPosition += written;
        if(tailPosition < tail.length) {
          // Not all the data was written, saving the tail...
          return; // ... and exit the function.
        }
        tail = null;
      }

      // Check if we need add some data to the audio output.
      var currentPosition = audio.mozCurrentSampleOffset();
      var available = currentPosition + prebufferSize - currentWritePosition;
      if(available > 0) {
        // Request some sound data from the callback function.
        soundData = readFn(available);
        if (soundData.length == 0) {
            console.log('stopping audio.');
            return false;
        };
        // Writting the data.
        written = audio.mozWriteAudio(soundData);
        if(written < soundData.length) {
          // Not all the data was written, saving the tail.
          tail = soundData;
          tailPosition = written;
        }
        currentWritePosition += written;
      }
    }, 100);
    console.log(interval)
}

function postData(size) {
        // receives length of desired dataArray from play()
        // returns a Float32Array containing the next samples up to the desired length.
        //TODO
        // should be some seperation between write function (done by song object itself)
        // and the data read from by postData(). This (should/)will stop crackling and latency
        // on playback
        var soundData = new Float32Array(size);
        for (var i = 0; i < size; i++){
            soundData[i] = dataArray[(start + i)%dataArray.length];
        }
        start = (start + soundData.length)%dataArray.length;
        return soundData;
    }

