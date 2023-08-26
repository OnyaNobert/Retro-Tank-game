var dir=3; 
var c=document.querySelector('canvas')
		c.width=600;
		c.height=600
        var gp=0
		var can=c.getContext('2d')
		var tp=0
		var cor=0
		var cdown=0
        var fx; var fy;
		var powerups=[]
		var tothealth=400
		var s=3; var x=100; var y=100; var dx=0; var dy=0; var health=400; var lives=true; var num=1; var firepower=5; var kills=0; var rep=false; var ki=0; var counter=0; var power='none'; var timel=counter/33
		var shoots=[]; var enemies=[];
		function powerup(x4,y4, type){
            this.y4=y4; this.x4=x4; this.type=type; this.exit=true
            this.make=function(){if(this.exit && cdown>660){
            	can.beginPath()
            	can.arc(this.x4, this.y4, s*3, 0, Math.PI*2, false)
            	can.fillStyle='yellow'
            	can.fill()
            	if(Math.abs(x-this.x4)<s*7 && Math.abs(y-this.y4)<s*7 && counter==0){
                    var aud=document.getElementById('soun')
            aud.loop=true; aud.currentTime=0
        aud.play(); aud.loop=false;
            		tp=this.type; counter=330; this.exit=false; cor+=1; cdown=0
            		if(this.type==2){health=400}
            	}
             
            }
            }

		}
		function checkCollision(obj1, obj2) {
    return (
        obj1.x2 < obj2.x2 + 8 * s &&
        obj1.x2 + 8 * s > obj2.x2 &&
        obj1.y2 < obj2.y2 + 8 * s &&
        obj1.y2 + 8 * s > obj2.y2
    );
}
function preventEnemyCollisions() {
    for (var i = 0; i < enemies.length; i++) {
        for (var j = i + 1; j < enemies.length; j++) {
            while (checkCollision(enemies[i], enemies[j])) {
                // Move the second enemy away from the first enemy
                if (enemies[i].x2 < enemies[j].x2) {
                    enemies[j].x2 += s;
                } else {
                    enemies[j].x2 -= s;
                }

                if (enemies[i].y2 < enemies[j].y2) {
                    enemies[j].y2 += s;
                } else {
                    enemies[j].y2 -= s;
                }
            }
        }

    }
    for(var i = 0; i<enemies.length; i++){
    	if(Math.abs(enemies[i].x2-x)<8*s && Math.abs(enemies[i].y2-y)<8*s){
    		if(x<enemies[i].x2){enemies[i].x2+=s}
    		else{enemies[i].x2-=s}
    		if(y<enemies[i].y2){enemies[i].y2+=s}
    		else{enemies[i].y2-=s}
    	}
    }
}

		function ebullet(a,b,c){
            this.x3=0; this.y3=0; this.dx3=0; this.dy3=0
            this.ecreate=function(){
                if(this.x3==0 && this.y3==0){
                this.x3=a; this.y3=b;
                	if(c==1){this.dy3=-s*6;}
                	if(c==2){this.dx3=-s*6;}
                	if(c==3){this.dy3=s*6;}
                	if(c==4){this.dx3=s*6;}
            }
                  can.beginPath()
            can.arc(this.x3,this.y3,s,0,Math.PI*2,false)
            can.fillStyle='red'
            can.fill()
            this.x3+=this.dx3; this.y3+=this.dy3   
            }
		}
		function enemy(x2,y2,beh){
            this.x2=x2; this.y2=y2; this.dy2=0; this.dx2=0; this.dir1=1; this.shoo=[]; this.tmn=0; this.sp=0; this.life=true; this.sy; this.sx; var healths=100; this.healths=healths; this.beh=beh
            this.move=function(zz){
                if(zz==0){this.dx2=-this.sp; this.dir1=2}; if(zz==1){this.dy2=this.sp; this.dir1=3}; if(zz==2){this.dx2=this.sp; this.dir1=4}; if(zz==3){this.dy2=-this.sp; this.dir1=1}; if(zz==4){this.emakebullet(); }
            }
            this.ai=function(){ if(this.y2>y-4*s && this.y2<y+4*s && this.tmn>10){this.move(4); this.tmn=0; this.sp=0}
                if(this.x2>x-4*s && this.x2<x+4*s && this.tmn>10){this.move(4); this.tmn=0; this.sp=0}
                if(this.tmn>10){this.sp=s/2}
                if(this.beh==1){              
                if(this.y2<y-4*s && this.dx2==0){this.move(1);}
                if(this.x2<x-4*s && this.dy2==0){this.move(2)}
                if(this.x2>x+4*s && this.dy2==0 ){this.move(0)}
                if(this.y2>y+4*s && this.dx2==0){this.move(3)}}
                if(this.beh==2){              
                if(this.x2<x-4*s && this.dy2==0){this.move(2);}
                if(this.y2<y-4*s && this.dx2==0){this.move(1)}
                if(this.y2>y+4*s && this.dx2==0 ){this.move(3)}
                if(this.x2>x+4*s && this.dy2==0){this.move(0)}}
                 if(this.beh==3){              
                if(this.y2<y-4*s && this.dx2==0){this.move(1);}
                if(this.x2<x-4*s && this.dy2==0){this.move(2)}
               if(this.y2>y+4*s && this.dx2==0){this.move(3)}
                 if(this.x2>x+4*s && this.dy2==0 ){this.move(0)}}
                 if(this.beh==4){              
                if(this.x2<x-4*s && this.dy2==0){this.move(2);}
                if(this.y2<y-4*s && this.dx2==0){this.move(1)}
                if(this.x2>x+4*s && this.dy2==0){this.move(0)}
               if(this.y2>y+4*s && this.dx2==0 ){this.move(3)}} 
                 
            }
            this.diop=function(){
            	if(this.life){this.ai()
            	this.checkimpact()
            	 if(this.healths<healths/400){can.fillStyle='orange'}
            else{
            can.fillStyle='red'}
            can.fillRect(this.x2-5*s,this.y2-8*s,this.healths/healths*s*10,s)
            can.strokeStyle='black'
            can.strokeRect(this.x2-5*s,this.y2-8*s,s*10,s)
            		this.drawopponet()
            	 this.efirebullets()
            	 this.sx=this.x2; this.sy=this.y2
                this.x2+=this.dx2; this.y2+=this.dy2
                for(var i=0; i<enemies.length; i++){

                }
                this.dx2=0; this.dy2=0; this.don==0;  this.tmn+=1
            }
            }
            this.drawopponet=function(){
            	 can.fillStyle="RGB(187, 0, 0)"
			can.fillRect(this.x2-4*s,this.y2-4*s,8*s,8*s)
            //additional gun holder
			can.fillStyle="RGB(255, 100, 100)"
            can.fillRect(this.x2-1*s,this.y2-1*s,2*s,2*s)
            //main gun holder
            if(this.dir1==1){
            can.fillStyle="RGB(64, 0, 0)"
            can.fillRect(this.x2-s*0.5,this.y2-5*s,1*s,5*s)
            //main gun
            can.fillStyle="red"
            can.fillRect(this.x2-5*s,this.y2-5*s,1*s,9*s)
            //additional gun 1
            can.fillStyle="red"
            can.fillRect(this.x2+4*s,this.y2-5*s,1*s,9*s)
            //additional gun 2
            }
            //right side up
            if(this.dir1==2){
           can.fillStyle="RGB(64, 0, 0)"
            can.fillRect(this.x2-s*5,this.y2-0.5*s,5*s,1*s)
            //main gun
            can.fillStyle="red"
            can.fillRect(this.x2-5*s,this.y2+4*s,9*s,1*s)
            //additional gun 1
            can.fillStyle="red"
            can.fillRect(this.x2-5*s,this.y2-5*s,9*s,1*s)
            //additional gun 2
            }
            //facing the left
            if(this.dir1==3){
           can.fillStyle="RGB(64, 0, 0)"
            can.fillRect(this.x2-s*0.5,this.y2,1*s,5*s)
            //main gun
            can.fillStyle="red"
            can.fillRect(this.x2-5*s,this.y2-4*s,1*s,9*s)
            //additional gun 1
            can.fillStyle="red"
            can.fillRect(this.x2+4*s,this.y2-4*s,1*s,9*s)
            //additional gun 2
            }
            //facing downwards
             if(this.dir1==4){
           can.fillStyle="RGB(64, 0, 0)"
            can.fillRect(this.x2,this.y2-0.5*s,5*s,1*s)
            //main gun
            can.fillStyle="red"
            can.fillRect(this.x2-4*s,this.y2+4*s,9*s,1*s)
            //additional gun 1
            can.fillStyle="red"
            can.fillRect(this.x2-4*s,this.y2-5*s,9*s,1*s)
            //additional gun 2
            }
            //facing the right
            }
        
            this.emakebullet=function(){
            	this.shoo[this.shoo.length]=new ebullet(this.x2, this.y2, this.dir1);  var aud=document.getElementById('sound');
            aud.loop=true; aud.currentTime=3000;
        aud.play(); aud.loop=false
            }
            this.efirebullets=function(){
            	for(var i=0; i<this.shoo.length; i++){
				this.shoo[i].ecreate();
				if(this.shoo[i].x3<x+5*s && this.shoo[i].x3>x-5*s && this.shoo[i].y3<y+4*s && this.shoo[i].y3>y-5*s && tp!=3)
					{health-=5; if(health<0){lives=false}; this.shoo[i].x3=undefined; this.shoo[i].y3=undefined}
				if(this.shoo[i].x3<x+5*s && this.shoo[i].x3>x-5*s && this.shoo[i].y3<y+4*s && this.shoo[i].y3>y-5*s && tp==3)
					{this.healths-=5; if(this.healths<0){this.life=false; kills+=1; ki+=1; this.x2=undefined; this.y2=undefined}; this.shoo[i].x3=undefined; this.shoo[i].y3=undefined}
			}
            }
            this.checkimpact=function(){
            	for(var i=0; i<shoots.length; i++){
            		if(shoots[i].x1<this.x2+5*s && shoots[i].x1>this.x2-5*s && shoots[i].y1<this.y2+4*s && shoots[i].y1>this.y2-5*s){this.healths-=firepower; shoots[i].x1=undefined; shoots[i].y1=undefined; if(this.healths<0){this.life=false; kills+=1; ki+=1; this.x2=undefined; this.y2=undefined}}
            	}
            }
            this.enimate=function(){
            	
            	
            	this.diop()
               
                //this.sp=s
		
            }

		}
		function drawplayer(){
		    can.fillStyle="teal"
			can.fillRect(x-4*s,y-4*s,8*s,8*s)
            //additional gun holder
			can.fillStyle="#00CC00"
            can.fillRect(x-1*s,y-1*s,2*s,2*s)
            //main gun holder
            if(dir==1){
            can.fillStyle="green"
            can.fillRect(x-s*0.5,y-5*s,1*s,5*s)
            //main gun
            can.fillStyle="#00CC00"
            can.fillRect(x-5*s,y-5*s,1*s,9*s)
            //additional gun 1
            can.fillStyle="#00CC00"
            can.fillRect(x+4*s,y-5*s,1*s,9*s)
            //additional gun 2
            }
            //right side up
            if(dir==2){
           can.fillStyle="green"
            can.fillRect(x-s*5,y-0.5*s,5*s,1*s)
            //main gun
            can.fillStyle="#00CC00"
            can.fillRect(x-5*s,y+4*s,9*s,1*s)
            //additional gun 1
            can.fillStyle="#00CC00"
            can.fillRect(x-5*s,y-5*s,9*s,1*s)
            //additional gun 2
            }
            //facing the left
            if(dir==3){
           can.fillStyle="green"
            can.fillRect(x-s*0.5,y,1*s,5*s)
            //main gun
            can.fillStyle="#00CC00"
            can.fillRect(x-5*s,y-4*s,1*s,9*s)
            //additional gun 1
            can.fillStyle="#00CC00"
            can.fillRect(x+4*s,y-4*s,1*s,9*s)
            //additional gun 2
            }
            //facing downwards
             if(dir==4){
           can.fillStyle="green"
            can.fillRect(x,y-0.5*s,5*s,1*s)
            //main gun
            can.fillStyle="#00CC00"
            can.fillRect(x-4*s,y+4*s,9*s,1*s)
            //additional gun 1
            can.fillStyle="#00CC00"
            can.fillRect(x-4*s,y-5*s,9*s,1*s)
            //additional gun 2
            }
            //facing the right
		}
		function bullet(){
            this.x1=0; this.y1=0; this.dx1=0; this.dy1=0;
            this.create=function(){
                if(this.x1==0 && this.y1==0){
                this.x1=x; this.y1=y
                	if(dir==1){this.dy1=-s*6}
                	if(dir==2){this.dx1=-s*6}
                	if(dir==3){this.dy1=s*6}
                	if(dir==4){this.dx1=s*6}
                }
            can.beginPath()
            can.arc(this.x1,this.y1,s,0,Math.PI*2,false)
            can.fillStyle='green'
            can.fill()
            this.x1+=this.dx1; this.y1+=this.dy1
            }
		}
		function makebullet(){
			shoots[shoots.length]=new bullet()
		}
		function firebullets(){
			for(var i=0; i<shoots.length; i++){
				shoots[i].create()
			}
		}
		var en=new enemy(200, 300)
		for(var i=0; i<num; i++){
			var g=Math.random()*600; var f=Math.random()*600; var bh=Math.floor(Math.random()*4)+1;
			enemies[i]=new enemy(f,g,bh)
		}
		for (var i=0; i<100; i++){
			var g=Math.random()*600; var f=Math.random()*600; var typ=Math.floor(Math.random()*3)+1;
			powerups[i]=new powerup(g,f,typ)
		}
		function animate(){
            window.requestAnimationFrame(animate)
            if(lives){can.clearRect(0,0,600,600)
            if(health<100){can.fillStyle='red'}
            else{
            can.fillStyle='green'}
            preventEnemyCollisions()
            can.fillRect(x-5*s,y-8*s,health/400*s*10,s)
            can.strokeStyle='black'
            can.strokeRect(x-5*s,y-8*s,s*10,s)
            for(var i=0; i<num; i++){
            	enemies[i].enimate()
            }
            //en.enimate()
            powerups[cor].make()
            drawplayer()
            firebullets()
            fx=x; fy=y
            x+=dx; y+=dy
            if(x+4*s>600 || x-4*s<0){
                x=fx
            }
            if(y+4*s>600 || y-4*s<0){
                y=fy
            }
            dx=0; dy=0;
            if(rep){
            	num+=1; for(var i=0; i<num; i++){
			var g=Math.random()*600; var f=Math.random()*600; var beh=Math.floor(Math.random()*4)+1;
			enemies[i]=new enemy(f,g,beh)
		}; rep=false; ki=0; shoots=[]
            }
            if(ki==num){rep=true}
            timel=counter/33
            if(counter==0){tp=0}
        
        if(tp==1){firepower=200} else{firepower=5}
            if(tp==0){power='none'}
            if(tp==1){power='one shot kill'}
            if(tp==2){power='refilled health'}
            if(tp==3){power='reversal'}
            if(Math.round(timel)==1){
                var aud=document.getElementById('sou')
        aud.play();
              }
            	cdown+=1
            
            document.getElementById('level').innerHTML='Level '+num
            document.getElementById('kills').innerHTML='Kills: '+kills
            if(counter>0){counter-=1}
            document.getElementById('powers').innerHTML='power up:'+power+', time left:'+ Math.round(timel)+'s'
            
        }}
		window.addEventListener('keydown', event=>{
			if(event.key=='a'){dx=-s*5; dir=2}
			if(event.key=='s'){dy=s*5; dir=3}
			if(event.key=='d'){dx=s*5; dir=4}
			if(event.key=='w'){dy=-s*5; dir=1}
			if(event.key=='l'){makebullet();
            var aud=document.getElementById('sound')
            aud.loop=true; aud.currentTime=3000
        aud.play(); aud.loop=false}
		})
        but1.addEventListener('mousedown', event=>{
            
            dy=-s*5; dir=1
        })
        but2.addEventListener('mousedown', event=>{
            dx=-s*5; dir=2
        })
        but3.addEventListener('mousedown', event=>{
            makebullet();
	var aud=document.getElementById('mousedown')
	aud.loop=true; aud.currentTime=3000
aud.play(); aud.loop=false
        })
        but4.addEventListener('mousedown', event=>{
            dx=s*5; dir=4
        })
        but5.addEventListener('mousedown', event=>{
            dy=s*5; dir=3
        })
		animate()