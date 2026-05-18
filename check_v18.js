




import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
const pixelLibs={Phaser:window.Phaser||null,CreateJS:window.createjs||null,PIXI:window.PIXI||null,Kaboom:window.kaboom||null};
function pixelArtSource(label){return `${label} · enhanced with Phaser/CreateJS/PixiJS/Kaboom-ready pixel pipeline`}

const canvas=document.getElementById('game'),renderer=new THREE.WebGLRenderer({canvas,antialias:false});
renderer.setPixelRatio(1);renderer.setClearColor(0x21152f,1);
const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x21152f,.026);
const camera=new THREE.OrthographicCamera(-16,16,9,-9,.1,100);camera.position.set(0,24,0);camera.lookAt(0,0,0);
const $=id=>document.getElementById(id);

const loadingUi={screen:$('loadingScreen'),fill:$('loadingFill'),text:$('loadingText')};
const GAME_ASSETS=['assets/image_01.png', 'assets/image_03.jpg', 'assets/story_battle.png', 'assets/ui/merchant_goblin.png', 'assets/ui/merchant_goblin_cutout.png', 'assets/ui/crown_drop.png', 'assets/ui/victory_history.jpeg', 'assets/maps/map_1.jpg', 'assets/maps/map_2.png', 'assets/maps/map_3.png', 'assets/maps/map_4.png', 'assets/maps/map_5.png', 'assets/heroes/mag.png', 'assets/heroes/guard.png', 'assets/heroes/archer.png', 'assets/mobs/mob_1.png', 'assets/mobs/mob_2.png', 'assets/mobs/mob_3.png', 'assets/mobs/mob_4.png', 'assets/mobs/mob_5.png', 'assets/mobs/mob_6.png', 'assets/mobs/mob_7.png', 'assets/mobs/mob_8.png', 'assets/mobs/mob_9.png', 'assets/mobs/mob_10.png', 'assets/mobs/mob_11.png', 'assets/mobs/mob_12.png', 'assets/mobs/mob_13.png', 'assets/mobs/mob_14.png', 'assets/mobs/mob_15.png', 'assets/mobs/mob_16.png', 'assets/mobs/mob_17.png', 'assets/mobs/mob_18.png', 'assets/mobs/mob_19.png', 'assets/mobs/mob_20.png', 'assets/mobs/mob_21.png', 'assets/mobs/mob_22.png', 'assets/mobs/mob_23.png', 'assets/mobs/mob_24.png', 'assets/bosses/boss_1.png', 'assets/bosses/boss_2.png', 'assets/bosses/boss_3.png', 'assets/bosses/boss_4.png', 'assets/bosses/boss_5.png', 'assets/bosses/boss_6.png', 'assets/bosses/boss_7.png', 'assets/bosses/boss_8.png', 'assets/bosses/boss_9.png', 'assets/bosses/boss_10.png', 'assets/bosses/boss_11.png', 'assets/bosses/boss_12.png', 'assets/bosses/boss_13.png', 'assets/bosses/boss_14.png', 'assets/bosses/boss_15.png', 'assets/bosses/boss_16.png', 'assets/bosses/boss_17.png', 'assets/bosses/boss_18.png', 'assets/bosses/boss_19.png', 'assets/bosses/boss_20.png', 'assets/bosses/boss_21.png', 'assets/bosses/boss_22.png', 'assets/bosses/boss_23.png', 'assets/bosses/boss_24.png', 'assets/bosses/boss_25.png', 'assets/ability/image_62.png', 'assets/ability/image_63.png', 'assets/ability/image_64.png', 'assets/ability/image_65.png', 'assets/ability/image_66.png', 'assets/ability/image_67.png', 'assets/ability/image_68.png', 'assets/ability/image_69.png', 'assets/ability/image_70.png', 'assets/ability/image_71.png', 'assets/ability/image_72.png', 'assets/ability/image_73.png', 'assets/ability/image_74.png', 'assets/ability/image_75.png', 'assets/ability/image_76.png', 'assets/ability/image_77.png', 'assets/ability/image_78.png', 'assets/ability/image_79.png'];
let gameAssetsReady=false;
function setLoadingProgress(done,total){const pct=total?Math.round(done/total*100):100;if(loadingUi.fill)loadingUi.fill.style.width=pct+'%';if(loadingUi.text)loadingUi.text.textContent='Preparing graphics '+pct+'%';}
function preloadGameAssets(){return new Promise(resolve=>{const unique=[...new Set(GAME_ASSETS)];let done=0,total=unique.length;if(!total){resolve();return}setLoadingProgress(0,total);unique.forEach(src=>{const img=new Image();const finish=()=>{done++;setLoadingProgress(done,total);if(done>=total){gameAssetsReady=true;setTimeout(()=>{document.body.classList.remove('loading-active');if(loadingUi.screen)loadingUi.screen.classList.add('hidden');resolve();},180)}};img.onload=finish;img.onerror=finish;img.src=src;});});}

const ui={hpBar:$('hpBar'),hpText:$('hpText'),xpBar:$('xpBar'),xpText:$('xpText'),manaText:$('manaText'),levelText:$('levelText'),moneyText:$('moneyText'),waveText:$('waveText'),waveTimerText:$('waveTimerText'),mapText:$('mapText'),spellText:$('spellText'),welcomeModal:$('welcomeModal'),instructionModal:$('instructionModal'),startModal:$('startModal'),levelModal:$('levelModal'),gameOverModal:$('gameOverModal'),victoryModal:$('victoryModal'),victoryTitle:$('victoryTitle'),victoryStats:$('victoryStats'),victoryRestartBtn:$('victoryRestartBtn'),welcomeNextBtn:$('welcomeNextBtn'),instructionNextBtn:$('instructionNextBtn'),storyModal:$('storyModal'),storyNextBtn:$('storyNextBtn'),cards:$('cards'),shop:$('shop'),merchantGold:$('merchantGold'),mageBtn:$('mageBtn'),guardBtn:$('guardBtn'),archerBtn:$('archerBtn'),restartBtn:$('restartBtn'),finalStats:$('finalStats'),toast:$('toast'),abilityBar:$('abilityBar'),eventFeed:$('eventFeed'),sideStatGrid:$('sideStatGrid'),sideAbilityList:$('sideAbilityList'),minimap:$('minimap'),pauseToggleBtn:$('pauseToggleBtn'),pauseMenuModal:$('pauseMenuModal'),pauseResumeBtn:$('pauseResumeBtn'),pauseRestartBtn:$('pauseRestartBtn'),pauseRefreshBtn:$('pauseRefreshBtn'),pauseExitBtn:$('pauseExitBtn'),pauseSaveBtn:$('pauseSaveBtn'),pauseSaveStatus:$('pauseSaveStatus'),newGameBtn:$('newGameBtn'),loadGameBtn:$('loadGameBtn'),profileModal:$('profileModal'),profileNameInput:$('profileNameInput'),profileCreateBtn:$('profileCreateBtn'),profileBackBtn:$('profileBackBtn'),loadModal:$('loadModal'),saveList:$('saveList'),loadBackBtn:$('loadBackBtn'),adminMapJump:$('adminMapJump')};

// Safe procedural retro audio (no external files). All audio calls are fail-safe and never stop the game.
// Mix update: louder music with clearly audible SFX for normal speakers/headphones.
const audioEngine={ctx:null,master:null,music:null,sfx:null,started:false,timer:null,step:0,last:Object.create(null),enabled:true};
function audioInit(){
  try{
    if(audioEngine.ctx||!audioEngine.enabled)return;
    const C=window.AudioContext||window.webkitAudioContext;
    if(!C){audioEngine.enabled=false;return;}
    const ctx=audioEngine.ctx=new C();
    audioEngine.master=ctx.createGain();audioEngine.master.gain.value=.62;audioEngine.master.connect(ctx.destination);
    audioEngine.music=ctx.createGain();audioEngine.music.gain.value=.62;audioEngine.music.connect(audioEngine.master);
    audioEngine.sfx=ctx.createGain();audioEngine.sfx.gain.value=.72;audioEngine.sfx.connect(audioEngine.master);
  }catch(e){console.warn('Audio disabled:',e);audioEngine.enabled=false;}
}
function audioStart(){
  try{
    audioInit();
    const ctx=audioEngine.ctx;if(!ctx)return;
    if(ctx.state==='suspended')ctx.resume().catch(()=>{});
    if(!audioEngine.started){audioEngine.started=true;startAmbientMusic();}
  }catch(e){console.warn('Audio start failed:',e);audioEngine.enabled=false;}
}
function audioFreq(n){return 440*Math.pow(2,(n-69)/12)}
function audioEnv(t,dur,vol,out){
  const g=audioEngine.ctx.createGain();
  g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(Math.max(.0001,vol),t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  g.connect(out||audioEngine.sfx||audioEngine.master);return g;
}
function audioTone(freq,dur=.12,type='square',vol=.08,delay=0,out){
  try{const ctx=audioEngine.ctx;if(!ctx||!audioEngine.enabled)return;const t=ctx.currentTime+delay,o=ctx.createOscillator();o.type=type;o.frequency.setValueAtTime(freq,t);o.connect(audioEnv(t,dur,vol,out));o.start(t);o.stop(t+dur+.04);}catch(e){audioEngine.enabled=false;}
}
function audioNoise(dur=.12,vol=.06,delay=0,filter=1000,out){
  try{const ctx=audioEngine.ctx;if(!ctx||!audioEngine.enabled)return;const t=ctx.currentTime+delay,len=Math.max(1,Math.floor(ctx.sampleRate*dur)),buf=ctx.createBuffer(1,len,ctx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;const src=ctx.createBufferSource(),f=ctx.createBiquadFilter();src.buffer=buf;f.type='lowpass';f.frequency.value=filter;src.connect(f);f.connect(audioEnv(t,dur,vol,out));src.start(t);src.stop(t+dur+.02);}catch(e){audioEngine.enabled=false;}
}
function sfx(name){
  try{
    if(!audioEngine.enabled)return;audioStart();if(!audioEngine.ctx)return;
    const now=performance.now(),cool={shootMage:70,shootArrow:70,slash:110,hit:80,fireball:110}[name]||0;
    if(cool&&audioEngine.last[name]&&now-audioEngine.last[name]<cool)return;audioEngine.last[name]=now;
    if(name==='ui'){audioTone(660,.05,'square',.10);audioTone(990,.05,'square',.08,.05)}
    else if(name==='shootMage'){audioTone(620,.07,'triangle',.13);audioTone(930,.08,'sine',.09,.025)}
    else if(name==='shootArrow'){audioNoise(.045,.12,0,2500);audioTone(430,.045,'square',.08,.015)}
    else if(name==='slash'){audioNoise(.11,.20,0,1600);audioTone(180,.10,'sawtooth',.08)}
    else if(name==='fireball'){audioTone(155,.18,'sawtooth',.16);audioTone(260,.16,'square',.11,.025);audioNoise(.15,.10,0,1000)}
    else if(name==='frost'){audioTone(1040,.16,'sine',.16);audioTone(1560,.18,'triangle',.10,.05);audioNoise(.16,.09,0,3200)}
    else if(name==='lightning'){for(let i=0;i<5;i++)audioTone(850+Math.random()*700,.035,'square',.055,i*.035);audioNoise(.20,.18,0,3600)}
    else if(name==='meteor'){for(let i=0;i<4;i++){audioTone(190-i*24,.18,'sawtooth',.07,i*.075);audioNoise(.13,.06,i*.075,900)}}
    else if(name==='level'){[523,659,784,1046].forEach((f,i)=>audioTone(f,.13,'triangle',.09,i*.075))}
    else if(name==='boss'){audioTone(55,.95,'sawtooth',.30);audioTone(82,.75,'square',.24,.06);audioTone(110,.55,'triangle',.18,.16);audioNoise(.85,.26,0,420);audioNoise(.30,.16,.18,1200)}
    else if(name==='death'){audioTone(220,.18,'sawtooth',.24);audioTone(165,.22,'square',.20,.12);audioTone(110,.32,'sawtooth',.20,.28);audioTone(55,.75,'triangle',.22,.50);audioNoise(.70,.28,.05,500)}
    else if(name==='dash'){audioTone(120,.16,'sawtooth',.18);audioNoise(.18,.22,0,700)}
    else if(name==='summon'){[220,277,330].forEach((f,i)=>audioTone(f,.16,'square',.07,i*.07));audioNoise(.22,.055,0,800)}
    else if(name==='shockwave'){audioTone(95,.38,'sawtooth',.15);audioNoise(.32,.18,0,600)}
    else if(name==='cursed'){for(let i=0;i<6;i++)audioTone(300+i*37,.055,'square',.055,i*.045)}
    else if(name==='hit'){audioNoise(.07,.13,0,950)}
    else if(name==='victory'){[392,523,659,784,1046,1318].forEach((f,i)=>audioTone(f,.22,'triangle',.20,i*.11));audioTone(196,.8,'sine',.13,.1)}
  }catch(e){console.warn('SFX disabled:',e);audioEngine.enabled=false;}
}
function startAmbientMusic(){
  try{
    if(audioEngine.timer||!audioEngine.ctx)return;
    // Procedural retro music with a different theme per map. No external files.
    const themes=[
      {name:'Camp', tempo:245, bass:[33,33,40,40,38,38,35,35], melody:[57,60,64,67,64,60,57,55,52,55,60,64,60,55,52,50], arp:[45,52,57,64], drone:21},
      {name:'Forest', tempo:255, bass:[29,29,36,36,34,34,31,31], melody:[53,57,60,65,60,57,53,50,55,59,62,67,62,59,55,52], arp:[41,48,53,60], drone:17},
      {name:'Island', tempo:270, bass:[26,26,33,33,31,31,28,28], melody:[50,53,57,62,57,53,50,48,52,55,59,64,59,55,52,48], arp:[38,45,50,57], drone:14},
      {name:'Keep', tempo:225, bass:[28,28,35,35,31,31,38,38], melody:[55,58,62,67,62,58,55,52,50,55,58,62,67,70,67,62], arp:[40,47,52,58], drone:16},
      {name:'Colosseum', tempo:205, bass:[24,24,31,31,29,29,36,36], melody:[52,55,59,64,67,64,59,55,57,60,64,69,72,69,64,60], arp:[36,43,48,55], drone:12}
    ];
    audioEngine.currentTheme=-1;
    audioEngine.step=0;
    audioEngine.timer=setInterval(()=>{
      try{
        const ctx=audioEngine.ctx;if(!ctx||ctx.state!=='running')return;
        const themeIndex=(typeof state!=='undefined'&&state.mapIndex!=null)?Math.max(0,Math.min(4,state.mapIndex|0)):0;
        if(audioEngine.currentTheme!==themeIndex){audioEngine.currentTheme=themeIndex;audioEngine.step=0;}
        const th=themes[themeIndex]||themes[0];
        const st=audioEngine.step++;
        const beat=st%64, eighth=st%2===0, quarter=st%4===0;
        if(quarter){
          const b=th.bass[(st/4|0)%th.bass.length];
          audioTone(audioFreq(b),.36,'square',.060,0,audioEngine.music);
          audioTone(audioFreq(b-12),.55,'triangle',.036,.01,audioEngine.music);
        }
        if(eighth && beat%8!==6){
          const m=th.melody[(st/2|0)%th.melody.length];
          audioTone(audioFreq(m),.20,'square',.036,.02,audioEngine.music);
          if(beat%16===8)audioTone(audioFreq(m+12),.16,'triangle',.024,.05,audioEngine.music);
        }
        if(st%3===0){
          const a=th.arp[(st/3|0)%th.arp.length];
          audioTone(audioFreq(a+12),.12,'triangle',.021,.035,audioEngine.music);
        }
        if(quarter)audioNoise(.035,.020,0,420,audioEngine.music);
        if(beat%8===4)audioNoise(.025,.014,0,2200,audioEngine.music);
        if(beat===0)audioTone(audioFreq(th.drone),2.4,'sine',.024,.0,audioEngine.music);
      }catch(e){}
    },210);
  }catch(e){audioEngine.enabled=false;}
}
window.addEventListener('pointerdown',audioStart,{once:true});

const keys=new Set(),mouse={x:0,y:0,down:false,world:new THREE.Vector3()};
addEventListener('keydown',e=>{
  const active=document.activeElement;
  const isTyping=active && (active.tagName==='INPUT' || active.tagName==='TEXTAREA' || active.isContentEditable);
  if(isTyping){
    if(e.key==='Enter' && active===ui.profileNameInput){createProfileAndChooseHero();e.preventDefault();}
    return;
  }
  const k=e.key.toLowerCase();
  if(k==='escape'){
    if(state.running){togglePauseMenu();e.preventDefault();}
    return;
  }
  if(k==='e'){
    if(state.running && !document.body.classList.contains('title-flow')){
      document.body.classList.toggle('stats-open');
    }
    e.preventDefault();
    return;
  }
  keys.add(k);
  if(state.running&&!state.paused)castKey(e.key);
});
addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;updateMouseWorld()});
addEventListener('mousedown',()=>mouse.down=true);addEventListener('mouseup',()=>mouse.down=false);
addEventListener('resize',resize);addEventListener('blur',()=>{keys.clear();mouse.down=false});
document.addEventListener('visibilitychange',()=>{if(document.hidden){keys.clear();mouse.down=false}});
function clearControls(){keys.clear();mouse.down=false}
function resize(){renderer.setSize(innerWidth,innerHeight,false);const a=innerWidth/innerHeight,v=18;camera.left=-v*a/2;camera.right=v*a/2;camera.top=v/2;camera.bottom=-v/2;camera.updateProjectionMatrix();updateMouseWorld()}
function updateMouseWorld(){const n=new THREE.Vector3(mouse.x/innerWidth*2-1,-mouse.y/innerHeight*2+1,0);n.unproject(camera);mouse.world.set(n.x,0,n.z)}
function pixelTexture(pattern,palette){const s=pattern.length,c=document.createElement('canvas');c.width=c.height=s;const ctx=c.getContext('2d');pattern.forEach((r,y)=>[...r].forEach((ch,x)=>{if(palette[ch]){ctx.fillStyle=palette[ch];ctx.fillRect(x,y,1,1)}}));const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;return t}
function imageTexture(src){const t=new THREE.TextureLoader().load(src);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;return t}

function dataTexture(uri){const t=new THREE.TextureLoader().load(uri);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;return t}
const textures={
hero:dataTexture('assets/heroes/mag.png'),
guardHero:dataTexture('assets/heroes/guard.png'),
archerHero:dataTexture('assets/heroes/archer.png'),
arrowProjectile:pixelTexture(['................','................','................','ll..ssss........','lL..sSSs........','ll..sssswwwwwwwh','....bbbbAAAAAAHH','ll..sssswwwwwwwh','lL..sSSs........','ll..ssss........','................','................','................','................','................','................'],{l:'#7c7483',L:'#b8b2c3',s:'#8a817c',S:'#c9c3cf',w:'#bfa78e',b:'#7a4f2a',A:'#a8753d',h:'#5b3720',H:'#3b2415'}),
axeProjectile:pixelTexture(['................','............dddd','...........dgggd','..........dggggd','.........dgglld.','........dgglld..','.......dHhld....','......dHhhd.....','.....dHhhgd.....','....dHhhggd.....','...dHhh.dggd....','..dHhh...dggd...','.dHhh.....ddd...','dHhh............','hHh.............','hh..............'],{h:'#7a3f08',H:'#4a2503',d:'#5f5b63',g:'#9ca0a6',l:'#d8d8d8'}),
bat:pixelTexture(['v......v','vv....vv','vVv..vVv','.vVeeVv.','..VddV..','.vDddDv.','vv.kk.vv','v......v'],{v:'#3b2452',V:'#8b5fb1',D:'#55306f',d:'#1c1026',e:'#ff9aa8',k:'#0b0710'}),
slime:pixelTexture(['........','..333...','.3aaa3..','3aA9Aa3.','3aAaaA3.','.33bb3..','..b..b..','........'],{3:'#245a52',a:'#78d7bb',A:'#a7f3d0',9:'#082f2a',b:'#15342f'}),
brute:pixelTexture(['.66666..','6DdddD6.','6d0d0d6.','6dWddD6.','.6AAAA6.','66aAAa66','..L..L..','.BB..BB.'],{6:'#5b402c',D:'#d1a574',d:'#a3724d',W:'#f5deb3',0:'#1b0f0b',A:'#6b3329',a:'#4e2c24',L:'#2f1b15',B:'#11100f'}),
ghost:pixelTexture(['..eeee..','.eWWWW e.'.replace(/ /g,''),'eW0cc0We','eWccccWe','eWcWWcWe','eW.e.W.e','..e..e..','........'],{e:'#d6e7ff',W:'#f8fbff',c:'#86a8cc',0:'#111827'}),
eyeOrb:pixelTexture(['..vvvv..','.vppppv.','vpP00Ppv','vppYYppv','vppPPppv','.vvTTvv.','..v..v..','........'],{v:'#4c1d95',p:'#be185d',P:'#f0abfc',Y:'#22d3ee',T:'#7e22ce',0:'#050507'}),
goblinGuard:pixelTexture(['..nnnn..','.nGnnGn.','.n0nn0n.','..nWWn..','.nSSSSn.','..sDDsn.','.s.d.s..','ss...ss.'],{n:'#3f6212',G:'#a3e635',0:'#ffe49a',W:'#d9f99d',S:'#7c5c35',s:'#8f6f3e',D:'#cbd5e1',d:'#64748b'}),
greenFlame:pixelTexture(['...g....','..gGg...','.gGYGg..','gGWWWGg','gGYYYg.','.gGgG..','..gg....','........'],{g:'#16a34a',G:'#86efac',Y:'#dcfce7',W:'#f0fdf4'}),
fireFlame:pixelTexture(['...r....','..rOr...','.rOYO r.'.replace(/ /g,''),'rOYYYOr','rOWYOOr','.rOOr...','..rr....','........'],{r:'#991b1b',O:'#fb923c',Y:'#fef08a',W:'#fff7ed'}),
reaper:pixelTexture(['..ssss..','.sdddds.','.d0dd0d.','..dNNd..','.dpPPpd.','..pPPp.l','..p..p.l','.bb..bbl'],{s:'#e5e7eb',d:'#24112f',0:'#fde68a',N:'#a78bfa',p:'#4c1d95',P:'#8b5cf6',b:'#111827',l:'#e5e7eb'}),
skeletonMob:pixelTexture(['.....SSSSSS.....','...SSWWWWWWSS...','..SWWSSWWSSWWS..','.SWWSSWWSSWWWS..','.SWWWWWWWWWWWS..','..SWWWWWWWWWSS..','....BBBBBB.....','.....W..W......','..WWWWWWWWWW...','....W.WW.W.....','....W.WW.W.....','...WW.WW.WW....','..WW..WW..WW...','......WW.......','.....WWWW......','....WW..WW.....'],{S:'#7f8da3',W:'#eef6ff',B:'#291736'}),

monsterBatLord:pixelTexture(['................','..v..........v..','.vvv........vvv.','.vVv..eeee..vVv.','vvVVvee99eeVVvv','vVVDVeeeeeeVDVv','..vDDDDddDDDDv.','...vDDddddDDv..','....vDddddDv...','...vvDkkkkDvv..','..vvv......vvv.','.vv..........vv.','................','................','................','................'],{v:'#2b1740',V:'#6d3b91',D:'#8b5fb1',d:'#1c1026',e:'#ff9aa8',9:'#fff1f2',k:'#08040c'}),
monsterSlimeKing:pixelTexture(['................','................','.....333333.....','...33aaaaaa33...','..3aaAAAAAAaa3..','.3aaA9AA9AAAa3.','.3aAAaaaaAAAa3.','3aAAAaWWaAAAAa3','3aAAAaaaaAAAAa3','.3aaAaaaaAAaa3.','..33aaAAAAa33..','....33333333....','.....b....b.....','....bb....bb....','................','................'],{3:'#245a52',a:'#78d7bb',A:'#a7f3d0',9:'#082f2a',W:'#ecfeff',b:'#15342f'}),
monsterBruteOgre:pixelTexture(['................','....66666666....','...6DDddddDD6...','..6Dd0dddd0dD6..','..6DddWWddddD6..','...6DDddddDD6...','....66AAAA66....','...66AAAAAA66...','..66AAaaAAaa66..','....LL....LL....','....LL....LL....','...LLL....LLL...','...BBB....BBB...','..BBBB....BBBB..','................','................'],{6:'#5b402c',D:'#d1a574',d:'#a3724d',W:'#f5deb3',0:'#1b0f0b',A:'#6b3329',a:'#4e2c24',L:'#2f1b15',B:'#11100f'}),
monsterGhostWraith:pixelTexture(['................','.....eeeeee.....','...eeWWWWWWee...','..eWW0cccc0WWe..','.eWWccccccccWWe.','.eWccWWccWWccWe.','eWWccccccccccWWe','eWcccccWWcccccWe','eWccWWWWWWWWccWe','.eWcW.e..e.WcWe.','..ee..e..e..ee..','......e..e......','.....e....e.....','................','................','................'],{e:'#d6e7ff',W:'#f8fbff',c:'#86a8cc',0:'#111827'}),
monsterEyeHorror:pixelTexture(['................','.....vvvvvv.....','...vvppppppvv...','..vpPPPPPPPPpv..','.vpPP0000PPPPpv.','.vpP0YYYY0PPPpv.','vpPP0YYYY0PPPPpv','vpPPP0000PPPPPpv','.vpPPPPPPPPPPpv.','..vvppTTTTppvv..','....vvTTTTvv....','.....v....v.....','....v......v....','................','................','................'],{v:'#4c1d95',p:'#be185d',P:'#f0abfc',Y:'#22d3ee',T:'#7e22ce',0:'#050507'}),
monsterGoblinKnight:pixelTexture(['................','.....nnnnnn.....','....nGGnnGGn....','...nn0nnnn0nn...','....nnnWWnnn....','.....nssssn.....','...nnSSSSSSnn...','..nSSsDDDDsSSn..','....sDDddDDs....','....s..dd..s....','...ss..dd..ss...','..sss......sss..','................','................','................','................'],{n:'#3f6212',G:'#a3e635',0:'#ffe49a',W:'#d9f99d',S:'#7c5c35',s:'#8f6f3e',D:'#cbd5e1',d:'#64748b'}),
monsterGreenWisp:pixelTexture(['................','.......g........','......gGg.......','.....gGYGg......','....gGWWWGg.....','...gGWWYWWGg....','..gGWWWYWWWGg...','..gGYYYYYYGg....','...gGWWWWGg.....','....gGYYGg......','.....gGGg.......','......gg........','................','................','................','................'],{g:'#16a34a',G:'#86efac',Y:'#dcfce7',W:'#f0fdf4'}),
monsterFireImp:pixelTexture(['................','.......r........','......rOr.......','.....rOYOr......','....rOYYYOr.....','...rOYWWYOr.....','..rOYWYYWYOr....','..rOYYYYYYOr....','...rOWYYWOr.....','....rOOOOr......','.....rrrr.......','.....f..f.......','....ff..ff......','................','................','................'],{r:'#991b1b',O:'#fb923c',Y:'#fef08a',W:'#fff7ed',f:'#450a0a'}),
monsterReaperLord:pixelTexture(['................','....ssssssss....','...sdddddddds...','..sd0dddddd0ds..','...dddNNNNddd...','....dpPPPPpd....','...ddpPPPPpdl...','..dddpPPPPpdl...','....pp....pp.l..','....pp....pp.l..','...bbb....bbbll.','..bbbb....bbbb..','................','................','................','................'],{s:'#e5e7eb',d:'#24112f',0:'#fde68a',N:'#a78bfa',p:'#4c1d95',P:'#8b5cf6',b:'#111827',l:'#e5e7eb'}),
boss:pixelTexture(['..rrrr..','.r0000r.','r0YYYY0r','.rYddYr.','..dPPd..','.dPPPPd.','..d..d..','.ff..ff.'],{r:'#fb923c',Y:'#facc15',d:'#2a1738',P:'#ef4444',f:'#f97316',0:'#111827'}),
bossHelm:pixelTexture(['..HHHH..','.HrrrrH.','r0YYYY0r','.rYddYr.','..dPPd..','.dPPPPd.','..d..d..','.ff..ff.'],{H:'#cbd5e1',r:'#fb923c',Y:'#facc15',d:'#2a1738',P:'#ef4444',f:'#f97316',0:'#111827'}),
bossSword:pixelTexture(['..HHHH..','.HrrrrH.','r0YYYY0r','.rYddYr.','..dPPd.S','.dPPPPdS','..d..d.S','.ff..ffS'],{H:'#cbd5e1',r:'#fb923c',Y:'#facc15',d:'#2a1738',P:'#ef4444',f:'#f97316',S:'#e5e7eb',0:'#111827'}),
bossArmor:pixelTexture(['..HHHH..','.HrrrrH.','r0YYYY0r','.rYddYr.','..AAAA.S','.APPPAdS','..A..A.S','.ff..ffS'],{H:'#cbd5e1',r:'#fb923c',Y:'#facc15',d:'#2a1738',P:'#ef4444',f:'#f97316',S:'#e5e7eb',A:'#64748b',0:'#111827'}),
bossPants:pixelTexture(['..HHHH..','.HrrrrH.','r0YYYY0r','.rYddYr.','..AAAA.S','.APPPAdS','..L..L.S','.LL..LLS'],{H:'#cbd5e1',r:'#fb923c',Y:'#facc15',d:'#2a1738',P:'#ef4444',S:'#e5e7eb',A:'#64748b',L:'#312e81',0:'#111827'}),
bossBoots:pixelTexture(['..HHHH..','.HrrrrH.','r0YYYY0r','.rYddYr.','..AAAA.S','.APPPAdS','..L..L.S','.BB..BBS'],{H:'#cbd5e1',r:'#fb923c',Y:'#facc15',d:'#2a1738',P:'#ef4444',S:'#e5e7eb',A:'#64748b',L:'#312e81',B:'#111827',0:'#111827'}),
bossNecklace:pixelTexture(['..HHHH..','.HrrrrH.','r0YYYY0r','.rYNNYr.','..AAAA.S','.APPPAdS','..L..L.S','.BB..BBS'],{H:'#facc15',r:'#fb923c',Y:'#facc15',N:'#fde68a',d:'#2a1738',P:'#ef4444',S:'#e5e7eb',A:'#64748b',L:'#312e81',B:'#111827',0:'#111827'}),
bossDetailed1:pixelTexture(['................','.....rrrrrr.....','....r0YYYY0r....','...rrYddddYrr...','..rrYdPPPPdYrr..','..rYdPPDDPPdYr..','...dPPPPPPPPd...','...dPAAAAAAPd...','....AAAAAA....','....LL..LL....','...LLL..LLL...','...BB....BB...','..BBB....BBB..','................','................','................'],{r:'#7f1d1d',Y:'#facc15',d:'#2a1738',P:'#ef4444',D:'#111827',A:'#3f1720',L:'#4b1d1d',B:'#111827',0:'#050507'}),
bossDetailed2:pixelTexture(['....HHHHHH......','...HrrrrrrH.....','..Hr0YYYY0rH....','..rrYddddYrr..S.','..rYdPPPPdYr..S.','..dPPDPPDPPd..S.','..dPAAAAAAPd..S.','...AAMMMMAA...S.','...AALLLLAA..SS.','....LL..LL..SS..','...LLL..LLL.S...','...BB....BB.....','..BBB....BBB....','................','................','................'],{H:'#cbd5e1',r:'#7f1d1d',Y:'#facc15',d:'#2a1738',P:'#ef4444',D:'#111827',A:'#64748b',M:'#94a3b8',L:'#312e81',B:'#111827',S:'#e5e7eb',0:'#050507'}),
bossDetailed3:pixelTexture(['....HHHHHH......','...HrrrrrrH.....','..Hr0YYYY0rH..S.','..rrYdNNdYrr..S.','..rYdPPPPdYr..S.','..dPPAAPPPPd..S.','..dPAMMMMAPd.SS.','...AAMMMMAA.S...','...AALLLLAA.....','....LL..LL......','...LLL..LLL.....','...BB....BB.....','..BBB....BBB....','................','................','................'],{H:'#facc15',r:'#7f1d1d',Y:'#facc15',N:'#fde68a',d:'#2a1738',P:'#dc2626',A:'#64748b',M:'#cbd5e1',L:'#312e81',B:'#111827',S:'#e5e7eb',0:'#050507'}),
bossDetailed4:pixelTexture(['....HHHHHH......','...HrrrrrrH..T..','..Hr0YYYY0rH.TS.','..rrYdNNdYrr.TS.','..rYdPPPPdYr.TS.','..dPAAAAAAPd.TS.','..dPAMMMMAPdTS..','...AAMMMMAA.S...','...AALLLLAA.....','...CLL..LLC.....','..CCLL..LLCC....','..CBB....BBC....','.CCBB....BBCC...','................','................','................'],{H:'#facc15',r:'#7f1d1d',Y:'#fef08a',N:'#fde68a',d:'#2a1738',P:'#dc2626',A:'#374151',M:'#94a3b8',L:'#312e81',B:'#111827',C:'#7f1d1d',T:'#9ca3af',S:'#e5e7eb',0:'#050507'}),
bossDetailed5:pixelTexture(['...VHHHHHHV.....','..VVrrrrrrVV.T..','.VHr0YYYY0rHVTS.','.VrrYdNNdYrrVTS.','..rYdPPPPdYr.TS.','..dPAAAAAAPd.TS.','..dPAMMMMAPdTS..','...AAMMMMAA.S...','...AALLLLAA.....','...CLL..LLC.....','..CCLL..LLCC....','..CBB....BBC....','.CCBB....BBCC...','................','................','................'],{V:'#4c0519',H:'#facc15',r:'#7f1d1d',Y:'#fef08a',N:'#fde68a',d:'#2a1738',P:'#dc2626',A:'#374151',M:'#cbd5e1',L:'#312e81',B:'#050507',C:'#991b1b',T:'#9ca3af',S:'#e5e7eb',0:'#050507'}),
bossDetailed6:pixelTexture(['...VHHHHHHV..Q..','..VVrrrrrrVVQQ..','.VHr0YYYY0rHVQQ.','.VrrYdNNdYrrVQQ.','..rYdPPPPdYr.QQ.','..dPAAAAAAPd.Q..','..dPAMMMMAPdTS..','...AAMMMMAA.S...','...AALLLLAA.....','...CLL..LLC.....','..CCLL..LLCC....','..CBB....BBC....','.CCBB....BBCC...','................','................','................'],{V:'#4c0519',H:'#facc15',r:'#7f1d1d',Y:'#fef08a',N:'#fde68a',d:'#2a1738',P:'#dc2626',A:'#374151',M:'#cbd5e1',L:'#312e81',B:'#050507',C:'#991b1b',Q:'#64748b',T:'#9ca3af',S:'#e5e7eb',0:'#050507'}),
bossDetailed7:pixelTexture(['..WVHHHHHHVW.Q..','.WVVrrrrrrVVWQQ.','WVHr0YYYY0rHVQQ.','WVrrYdNNdYrrVQQ.','.WrYdPPPPdYr.QQ.','.WdPAAAAAAPd.Q..','..dPAMMMMAPdTS..','...AAMMMMAA.S...','...AALLLLAA.....','...CLL..LLC.....','..CCLL..LLCC....','..CBB....BBC....','.CCBB....BBCC...','................','................','................'],{W:'#1f2937',V:'#4c0519',H:'#facc15',r:'#7f1d1d',Y:'#fef08a',N:'#fde68a',d:'#2a1738',P:'#dc2626',A:'#374151',M:'#cbd5e1',L:'#312e81',B:'#050507',C:'#991b1b',Q:'#64748b',T:'#9ca3af',S:'#e5e7eb',0:'#050507'}),

// Procedural pickup/decor fallback textures kept in code so folder assets are not changed.
coin:pixelTexture(['................','.....yyyy......','...yyYYYYyy....','..yYYWWYYy.....','.yYYWYYYyy.....','.yYYYYYyyy.....','.yYYYYyyy......','..yYYyyy.......','...yyyy........','................','................','................','................','................','................','................'],{y:'#b87916',Y:'#ffd24d',W:'#fff1a8'}),
xp:pixelTexture(['................','.......p........','......pPp.......','.....pPWPp......','....pPWQWPp.....','...pPWQQQWPp....','....pPWQWPp.....','.....pPWPp......','......pPp.......','.......p........','................','................','................','................','................','................'],{p:'#5b21b6',P:'#8b5cf6',W:'#f5f3ff',Q:'#d8b4fe'}),
levelCrystal:pixelTexture(['................','.......p........','......pPp.......','.....pPWPp......','....pPWWWp.....'.replace(/ /g,''),'...pPWWWWWp....','..pPWWQWWWp....','...pPWWWWp.....','....pPWWp......','.....pPp.......','......p........','................','................','................','................','................'],{p:'#5b21b6',P:'#a78bfa',W:'#f5f3ff',Q:'#22d3ee'}),
heart:pixelTexture(['................','...rr....rr.....','..rRRr..rRRr....','.rRRRRrrRRRRr...','.rRRRRRRRRRRr...','..rRRRRRRRRr....','...rRRRRRRr.....','....rRRRRr......','.....rRRr.......','......r.........','................','................','................','................','................','................'],{r:'#7f1d1d',R:'#ef4444'}),
skull:pixelTexture(['................','....SSSSSS......','...SWWWWWWSS....','..SWWSSWWSSWS...','..SWWSSWWSSWS...','..SWWWWWWWWWS...','...SWWWWWWSS....','....BBBBBB......','.....W..W.......','................','................','................','................','................','................','................'],{S:'#7f8da3',W:'#eef6ff',B:'#291736'}),
tree:pixelTexture(['................','......gg........','.....gggg.......','....ggGGgg......','...ggGGGGgg.....','..ggGGGGGGgg....','....ggGGgg......','.....bbbb.......','.....bbbb.......','.....bbbb.......','................','................','................','................','................','................'],{g:'#14532d',G:'#22c55e',b:'#5b341b'}),
deadTree:pixelTexture(['................','.....b..........','....bbb..b......','...b.b.bb.......','..b..bb.........','.....bb.........','.....bb..b......','....bbbb........','....bbbb........','................','................','................','................','................','................','................'],{b:'#5b341b'}),
torch:pixelTexture(['................','......r.........','.....rOr........','....rOYOr.......','.....rOr........','......b.........','......b.........','......b.........','.....bbb........','................','................','................','................','................','................','................'],{r:'#991b1b',O:'#fb923c',Y:'#fef08a',b:'#5b341b'}),
mobGreenSlime:pixelTexture(['................','................','.....333333.....','...33aaaaaa33...','..3aaAAAAAAaa3..','.3aaA9AA9AAAa3.','.3aAAaaaaAAAa3.','3aAAAaWWaAAAAa3','3aAAAaaaaAAAAa3','.3aaAaaaaAAaa3.','..33aaAAAAa33..','....33333333....','.....b....b.....','....bb....bb....','................','................'],{3:'#245a52',a:'#78d7bb',A:'#a7f3d0',9:'#082f2a',W:'#ecfeff',b:'#15342f'}),
mobSkeleton:pixelTexture(['.....SSSSSS.....','...SSWWWWWWSS...','..SWWSSWWSSWWS..','.SWWSSWWSSWWWS..','.SWWWWWWWWWWWS..','..SWWWWWWWWWSS..','....BBBBBB......','.....W..W.......','..WWWWWWWWWW....','....W.WW.W......','....W.WW.W......','...WW.WW.WW.....','..WW..WW..WW....','......WW........','.....WWWW.......','....WW..WW......'],{S:'#7f8da3',W:'#eef6ff',B:'#291736'}),
abilityFireball:pixelTexture(['................','.....rrrr.......','....rOOOOr......','...rOYYYYOr.....','..rOYWWYYOr.....','..rOYWYWYOr.....','...rOYYYYOr.....','....rOOOOr......','.....rrrr.......','................','................','................','................','................','................','................'],{r:'#7f1d1d',O:'#fb923c',Y:'#fef08a',W:'#fff7ed'}),
abilityMines:pixelTexture(['................','......kkkk......','....kkPPPPkk....','...kPPGGGGPPk...','..kPPGWWWWGPk...','..kPGWYYYYWGk...','..kPGWYYYYWGk...','...kPGWWWWGPk...','....kkPPPPkk....','......kkkk......','................','................','................','................','................','................'],{k:'#111827',P:'#4c1d95',G:'#22c55e',W:'#ecfdf5',Y:'#bef264'}),
finalDemon:imageTexture('assets/bosses/boss_25.png'),
merchantGoblin:imageTexture('assets/ui/merchant_goblin.png'),
merchantGoblinMap:imageTexture('assets/ui/merchant_goblin_cutout.png'),
crownDrop:imageTexture('assets/ui/crown_drop.png'),
demonFireball:pixelTexture(['................','.....rrrr.......','....rOOOOr......','...rOYYYYOr.....','..rOYWWYYOr.....','..rOYWYWYOr.....','...rOYYYYOr.....','....rOOOOr......','.....rrrr.......','................','................','................','................','................','................','................'],{r:'#7f1d1d',O:'#fb923c',Y:'#fef08a',W:'#fff7ed'}),
mageBossAttack:pixelTexture(['................','.....gggg.......','....gOOOgg......','...gOYYYYgg.....','..gOYWWYYOg.....','..gOYWYWYOOg....','...gOYYYYOg.....','....gOOOgg......','.....gggg.......','................','................','................','................','................','................','................'],{g:'#064e3b',O:'#22c55e',Y:'#86efac',W:'#ecfccb'}),

// Clean imported regular mob sprites, 96x96 PNGs with transparent background.
mob1:imageTexture('assets/mobs/mob_1.png'),
mob2:imageTexture('assets/mobs/mob_2.png'),
mob3:imageTexture('assets/mobs/mob_3.png'),
mob4:imageTexture('assets/mobs/mob_4.png'),
mob5:imageTexture('assets/mobs/mob_5.png'),
mob6:imageTexture('assets/mobs/mob_6.png'),
mob7:imageTexture('assets/mobs/mob_7.png'),
mob8:imageTexture('assets/mobs/mob_8.png'),
mob9:imageTexture('assets/mobs/mob_9.png'),
mob10:imageTexture('assets/mobs/mob_10.png'),
mob11:imageTexture('assets/mobs/mob_11.png'),
mob12:imageTexture('assets/mobs/mob_12.png'),
mob13:imageTexture('assets/mobs/mob_13.png'),
mob14:imageTexture('assets/mobs/mob_14.png'),
mob15:imageTexture('assets/mobs/mob_15.png'),
mob16:imageTexture('assets/mobs/mob_16.png'),
mob17:imageTexture('assets/mobs/mob_17.png'),
mob18:imageTexture('assets/mobs/mob_18.png'),
mob19:imageTexture('assets/mobs/mob_19.png'),
mob20:imageTexture('assets/mobs/mob_20.png'),
mob21:imageTexture('assets/mobs/mob_21.png'),
mob22:imageTexture('assets/mobs/mob_22.png'),
mob23:imageTexture('assets/mobs/mob_23.png'),
mob24:imageTexture('assets/mobs/mob_24.png'),
bossImported1:imageTexture('assets/bosses/boss_1.png'),
bossImported2:imageTexture('assets/bosses/boss_2.png'),
bossImported3:imageTexture('assets/bosses/boss_3.png'),
bossImported4:imageTexture('assets/bosses/boss_4.png'),
bossImported5:imageTexture('assets/bosses/boss_5.png'),
bossImported6:imageTexture('assets/bosses/boss_6.png'),
bossImported7:imageTexture('assets/bosses/boss_7.png'),
bossImported8:imageTexture('assets/bosses/boss_8.png'),
bossImported9:imageTexture('assets/bosses/boss_9.png'),
bossImported10:imageTexture('assets/bosses/boss_10.png'),
bossImported11:imageTexture('assets/bosses/boss_11.png'),
bossImported12:imageTexture('assets/bosses/boss_12.png'),
bossImported13:imageTexture('assets/bosses/boss_13.png'),
bossImported14:imageTexture('assets/bosses/boss_14.png'),
bossImported15:imageTexture('assets/bosses/boss_15.png'),
bossImported16:imageTexture('assets/bosses/boss_16.png'),
bossImported17:imageTexture('assets/bosses/boss_17.png'),
bossImported18:imageTexture('assets/bosses/boss_18.png'),
bossImported19:imageTexture('assets/bosses/boss_19.png'),
bossImported20:imageTexture('assets/bosses/boss_20.png'),
bossImported21:imageTexture('assets/bosses/boss_21.png'),
bossImported22:imageTexture('assets/bosses/boss_22.png'),
bossImported23:imageTexture('assets/bosses/boss_23.png'),
bossImported24:imageTexture('assets/bosses/boss_24.png'),
bossImported25:imageTexture('assets/bosses/boss_25.png')
};
const enemyTextureSources={mob1:pixelArtSource('Imported clean mob sprite 1'),mob2:pixelArtSource('Imported clean mob sprite 2'),mob3:pixelArtSource('Imported clean mob sprite 3'),mob4:pixelArtSource('Imported clean mob sprite 4'),mob5:pixelArtSource('Imported clean mob sprite 5'),mob6:pixelArtSource('Imported clean mob sprite 6'),mob7:pixelArtSource('Imported clean mob sprite 7'),mob8:pixelArtSource('Imported clean mob sprite 8'),mob9:pixelArtSource('Imported clean mob sprite 9'),mob10:pixelArtSource('Imported clean mob sprite 10'),mob11:pixelArtSource('Imported clean mob sprite 11'),mob12:pixelArtSource('Imported clean mob sprite 12'),mob13:pixelArtSource('Imported clean mob sprite 13'),mob14:pixelArtSource('Imported clean mob sprite 14'),mob15:pixelArtSource('Imported clean mob sprite 15'),mob16:pixelArtSource('Imported clean mob sprite 16'),mob17:pixelArtSource('Imported clean mob sprite 17'),mob18:pixelArtSource('Imported clean mob sprite 18'),mob19:pixelArtSource('Imported clean mob sprite 19'),mob20:pixelArtSource('Imported clean mob sprite 20'),mob21:pixelArtSource('Imported clean mob sprite 21'),mob22:pixelArtSource('Imported clean mob sprite 22'),mob23:pixelArtSource('Imported clean mob sprite 23'),mob24:pixelArtSource('Imported clean mob sprite 24')};
function sprite(tex,size=1){const m=new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:true,depthWrite:false,alphaTest:.16});const s=new THREE.Sprite(m);s.scale.set(size,size,1);return s}
function textSprite(text,color='#ffe7aa',outline='#120b18'){const c=document.createElement('canvas');c.width=256;c.height=48;const ctx=c.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.font='bold 18px monospace';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=5;ctx.strokeStyle=outline;ctx.strokeText(text,128,24);ctx.fillStyle=color;ctx.fillText(text,128,24);const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;const m=new THREE.SpriteMaterial({map:t,transparent:true,depthTest:true});const sp=new THREE.Sprite(m);sp.scale.set(3.9,.72,1);return sp}
function forceUiLayer(obj,order=900){if(!obj)return;obj.renderOrder=order;if(obj.material){obj.material.depthTest=false;obj.material.depthWrite=false;obj.material.alphaTest=.06;obj.material.needsUpdate=true}}
function addBossVisualLift(e){if(!e||!e.mesh)return;forceUiLayer(e.mesh,850);e.mesh.center.set(.5,.28);e.mesh.position.set(e.x,1.25,e.z);const shade=circle(Math.max(.85,e.size*.36),0x000000,.34);shade.position.set(e.x,.07,e.z+.18);shade.renderOrder=60;if(shade.material){shade.material.depthTest=false;shade.material.depthWrite=false}entityGroup.add(shade);e.shadow=shade}
function plane(w,h,color,op=1){const g=new THREE.PlaneGeometry(w,h);g.rotateX(-Math.PI/2);return new THREE.Mesh(g,new THREE.MeshBasicMaterial({color,transparent:op<1,opacity:op,depthWrite:op>=1}))}
function circle(r,color,op=.25){const g=new THREE.CircleGeometry(r,24);g.rotateX(-Math.PI/2);return new THREE.Mesh(g,new THREE.MeshBasicMaterial({color,transparent:true,opacity:op,depthWrite:false}))}
function makeArrowMesh(angle){const g=new THREE.PlaneGeometry(1.18,.36);g.rotateX(-Math.PI/2);const m=new THREE.MeshBasicMaterial({map:textures.arrowProjectile,transparent:true,depthWrite:false,depthTest:true,side:THREE.DoubleSide});const mesh=new THREE.Mesh(g,m);mesh.rotation.y=-angle;return mesh}
function makeAxeMesh(angle,scale=1){const g=new THREE.PlaneGeometry(1.2*scale,1.2*scale);g.rotateX(-Math.PI/2);const m=new THREE.MeshBasicMaterial({map:textures.axeProjectile,transparent:true,depthWrite:false,depthTest:true,side:THREE.DoubleSide});const mesh=new THREE.Mesh(g,m);mesh.rotation.y=-angle+Math.PI/4;return mesh}
function removeExtra(extra){if(Array.isArray(extra))extra.forEach(m=>entityGroup.remove(m));else if(extra)entityGroup.remove(extra)}
function setExtraScale(extra,scale){if(Array.isArray(extra))extra.forEach(m=>m.scale.setScalar(scale));else if(extra)extra.scale.setScalar(scale)}
function setExtraOpacity(extra,op){if(Array.isArray(extra))extra.forEach(m=>{if(m.material)m.material.opacity=op});else if(extra&&extra.material)extra.material.opacity=op}
function softGlow(x,z,r,color,op){const outer=circle(r,color,op*.32);outer.position.set(x,.045,z);lightGroup.add(outer);const mid=circle(r*.55,color,op*.55);mid.position.set(x,.052,z);lightGroup.add(mid);const core=circle(r*.22,color,op*.75);core.position.set(x,.058,z);lightGroup.add(core);return {outer,mid,core}}
// Map 3 v3: ISLAND_MAP3_ROWS generated automatically from the green outline reference using flood-fill mask extraction.
// Pixel-built map backgrounds integrated with 93x54 tile map shapes.
// These are generated directly with canvas pixel drawing, not imported from screenshots/photos.
// The art below recreates the earlier image-style structures as native pixel art: cabins, ruined castles, keep rooms and colosseum.
const scenicBackdropUrls=['assets/maps/map_1.jpg','assets/maps/map_2.png','assets/maps/map_3.png','assets/maps/map_4.png','assets/maps/map_5.png'];
const CRYSTAL_CAVE_MAP2_ART=`assets/maps/map_2.png`;
const shapeMapArtTextures=scenicBackdropUrls.map(u=>{const tex=new THREE.TextureLoader().load(u);tex.magFilter=THREE.NearestFilter;tex.minFilter=THREE.NearestFilter;tex.colorSpace=THREE.SRGBColorSpace;return tex;});
const mapArtGroup=new THREE.Group(),floorGroup=new THREE.Group(),wallGroup=new THREE.Group(),entityGroup=new THREE.Group(),lightGroup=new THREE.Group();
scene.add(mapArtGroup,floorGroup,wallGroup,lightGroup,entityGroup);
function addShapeIntegratedMapArt(){
  // Robust map art layer. Map 1 uses Bloodwood Camp art; Map 2 uses Moonlit Pine Grove art matched to its floor mask.
  // If the asset fails to load, gameplay still continues because this is visual only.
  mapArtGroup.clear();
  const isMap1=(state.mapIndex||0)===0;
  const isCrystalMap2=(state.mapIndex||0)===1;
  const isMap3=(state.mapIndex||0)===2;
  const isMap4=(state.mapIndex||0)===3;
  const isMap5=(state.mapIndex||0)===4;
  const tex=isMap5 ? new THREE.TextureLoader().load(HELL_COLOSSEUM_MAP5_ART) : isMap4 ? new THREE.TextureLoader().load(CRYSTAL_CATACOMBS_MAP4_ART) : isMap3 ? new THREE.TextureLoader().load(DARK_CASTLE_ISLAND_ART) : (isCrystalMap2) ? new THREE.TextureLoader().load(CRYSTAL_CAVE_MAP2_ART) : isMap1 ? new THREE.TextureLoader().load('assets/maps/map_1.jpg') : (shapeMapArtTextures[state.mapIndex]||shapeMapArtTextures[1]||shapeMapArtTextures[0]);
  tex.magFilter=THREE.NearestFilter;
  tex.minFilter=THREE.LinearFilter;
  tex.generateMipmaps=false;
  if(THREE.SRGBColorSpace) tex.colorSpace=THREE.SRGBColorSpace;
  const g=new THREE.PlaneGeometry((isMap1||isCrystalMap2||isMap3||isMap4||isMap5)?93:150,(isMap1||isCrystalMap2||isMap3||isMap4||isMap5)?54:88);
  g.rotateX(-Math.PI/2);
  const mat=new THREE.MeshBasicMaterial({map:tex,transparent:false,depthWrite:false,depthTest:false,fog:false,side:THREE.DoubleSide});
  const mesh=new THREE.Mesh(g,mat);
  mesh.position.set(4,-.06,isMap1?0:.5);
  mesh.renderOrder=-5000;
  mapArtGroup.add(mesh);
  if(!isMap1){
    const veilGeom=new THREE.RingGeometry(31,78,80,1);
    veilGeom.rotateX(-Math.PI/2);
    const veil=new THREE.Mesh(veilGeom,new THREE.MeshBasicMaterial({color:0x07070a,transparent:true,opacity:.32,depthWrite:false,depthTest:false,fog:false}));
    veil.scale.set(1.55,1,1.0);
    veil.position.set(4,-.032,.5);
    veil.renderOrder=-1999;
    mapArtGroup.add(veil);
  }
}
function applyMap1VisualArtMode(){
  if(!currentMap || !['camp','forest','island','catacombs','colosseum'].includes(currentMap().decor)) return;
  // Hide generated floor/wall tiles visually on image-based maps; collision/floorSet remains unchanged.
  const makeInvisible=(obj)=>{
    if(obj.material){
      obj.material.transparent=true;
      obj.material.opacity=0.0;
      obj.material.depthWrite=false;
    }
  };
  floorGroup.traverse(makeInvisible);
  wallGroup.traverse(makeInvisible);
}
const floorSet=new Set(),torches=[],obstacles=[];const key=(x,z)=>`${x},${z}`;const WAVE_LENGTH=30, WAVES_PER_MAP=10, BOSSES_PER_NORMAL_MAP=5, BOSSES_BEFORE_FINAL=4;
const HELL_COLOSSEUM_MAP5_ART='assets/maps/map_5.png';
const mapBounds={minX:-42,maxX:50,minZ:-26,maxZ:27};
const mapDefs=[{name:'Bloodwood Camp',floorA:0x6b604e,floorB:0x756852,wall:0x4a3c35,accent:0xff8a3d,fog:0x21152f,sky:0x21152f,decor:'camp'},{name:'Crystal Caverns',floorA:0x232535,floorB:0x2b2b3f,wall:0x101019,accent:0x6ee7ff,fog:0x090812,sky:0x05040a,decor:'forest'},{name:'Dark Castle Island',floorA:0x2f3340,floorB:0x384052,wall:0x101722,accent:0x8ec5ff,fog:0x06121c,sky:0x03101a,decor:'island'},{name:'Crystal Catacombs',floorA:0x30283a,floorB:0x3f3349,wall:0x17131f,accent:0xc084fc,fog:0x11091c,sky:0x120a1d,decor:'catacombs'},{name:'Demon Colosseum',floorA:0x5a3428,floorB:0x6b3f2c,wall:0x2b1515,accent:0xff5a2f,fog:0x1a0707,sky:0x160707,decor:'colosseum'}];
const CAVE_MAP2_ROWS=["000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000111111110000000000000000000000000000000000000000","000000000000000011111110000000000000000000001111111111100000000000000000000111110000000000000","000000000000011111111111111110000000000000111111111111111000000000000000001111111110000000000","000000000000111111111111111111000000000000111111111111111110000000000011111111111111100000000","000000000000001111111111111110000000000000111111111111111111111000011111111111111111110000000","000000000000000111111111111100000000000000111111111111111111111111111111111111111111111000000","000000000000000000111111111100000000000000011111111111111111111111111111111111111111111000000","000000000000000000000111111111111110000000011111111111111110000000111111111111111111100000000","000000000000000000011111111111111111100011111111111111111000000000000000011111111000000000000","000000000000000001111111111111111111111111111111111111111100000000000000001111111000000000000","000000000001111111111111111111111111111111111111111111111111000000000000000111111100000000000","000000000011111111111111111111111111111111111111111111111111111100000000000111111111000000000","000000000111111111111111111111111111111111111111111111111111111111000000001111111111111000000","000000000111111111111111111111111111111111111111111111111111111111000000001111111111111100000","000000000111111111111111111111111111111111111111111111111111111111000000001111111111111000000","000000000001011110100000000000111111111111111111111111111111111111000000000111111111110000000","000000000000000000000000000001111111111111111111111111111111111110000000000111111111000000000","000000000000000000000000000011111111111111111111111111111111111110000001111111111110000000000","000000000000000000000000000011111111111111111111111111111111111111100111111111111100000000000","000000000000000000000000000001111111111111111111111111111111111111111111111111111000000000000","000000000000000000000000000001111111111111111111111111111111111111111111101111111000000000000","000000000000000000000000000111111111111111111111111111111111111111111110000011111000000000000","000000000000000000111111111111111111111111111111111111111111111111111100000001111100000000000","000000000000000011111111111111111111111111111111111111111111111111110000000001111111000000000","000000000000011111111111111111111111111111111111111111111111111111110000000000111111111100000","000000000000111111111111111111111111111111111111111111111111111111100000000000111111111100000","000000000011111111111111111111111111111111111111111111111111111111110000000001111111111100000","000000000111111111111111111111111111111111111111111111111111111111111111111111111111111000000","000000001111111111111111111111111111111111111111111111111111111111111111111111111111110000000","000000001111111111111111111111111111111111111111111111111111111111111111111111111111000000000","000000000111111111111111111111111111111111111111111111111111111111111111111111111110000000000","000000000011111111111111111111111111111111111111111111111111111111111111111111111000000000000","000000000000111111111111111111111111111111111111111111111111111111111111111111110000000000000","000000000000011111111111111111111111111111111111111111111111111111111111111111110000000000000","000000000000011111111111111111111111111111111111111111111111111111111111111111111000000000000","000000000000001111111111111111111111111101111111111111111111111111111111111111111000000000000","000000000000001111111111111111111111100000000000011111111111111111111111111111111111000000000","000000001111111111111111111111111111000000000000011111111111111111111111111111111111100000000","000000111111111111111111111110000000000000000001111111111111111111111111111111111111111000000","000000111111111111111111111100000000000000000011111111111111111111111111111111111111111000000","000000111111111111111111110000000000000000011111111111111111111011111111111111111111111000000","000000011111111111111111110000000000000011111111111111111000000000111111111111111111110000000","000000011111111111111111110000000000001111111111111111111000000000001111111111111111100000000","000000000001111111111111110000000001111111111111111111111100000000001111111111111111100000000","000000000000111111111111100000000011111111111111111111111110000000001111111111111111110000000","000000000000111111111100000000000011111111111111111111111110000000000001111111111111110000000","000000000000011111111000000000000001111111111111111111111100000000000000000111111111100000000","000000000000000000000000000000000000000011000000111111100000000000000000000011111110000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"];
// Map 3: Dark Castle Island precise walkable mask.
// Generated from the user-approved green overlay: green = walkable, everything else = blocked.
const ISLAND_MAP3_ROWS=["000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000111111111000000000000000111111100000000000000000000000000000000","000000000000000000000000000001111111011000000000000000110111110000000000000000000000000000000","000000000000000000000000000001111110000000000000000000000111111111111000000000000000000000000","000000000000000000000000001111111110000000000000000000000011111111111000000000000000000000000","000000000000000000000000001111111100000000000000000000000001111111111000000000000000000000000","000000000000001111110000001111111000000000000000000000000001111111100000000000000000000000000","000000000000001111111000001111111000000000000000000000000001111111100000001111100000000000000","000000000000001111111111111111111000000000000000000000000001111111110000011111110000000000000","000000000000000111111111111111111000000000000000000000000011111111111111111111111000000000000","000000000000000111111111111111111111110000000000000000001111111111111111111111111000000000000","000000000001111111111111111111111111111000000000000000011111111111111111111111111000000000000","000000000001111111111111111111111111111000000000000000111111111111111111111111111000000000000","000000000000111111111111111111111111111111000000000111111111111111111111111111111000000000000","000000000000111111111111111111111111111111111111111111111111111111111111111110000000000000000","000000111111111111111111111111111111111111111111111111111111111111111111111110000000000000000","000000111111111111111101111111111111111111111111111111111111111111111111111110000000000000000","000000011111111111111000001111111111111111111111111111111111111111111111111111100000000000000","000000001111111110000000000000111111111111111111111111111111111111111111111111111111110000000","000000001111111000000000000000111111111111111111111111111111111111111111111111111111111000000","000000001111100000000000000000011111111111111111111111111111111111111111111111111111110000000","000000111111110000000000000000001111111111111111111111111111111111111111111111111111100000000","000001111111100000000000000000000001111111111111111111111111111111111111111111111111110000000","000000111111100000000000000000000001111111111111111111111111111111110001111111111111111100000","000000011111110000000000000000000001111111111111111111111111111111100001111111111111111100000","000000001111111111111100000000000001111111111111111111111111111111000000000111111111110000000","000000001111111111111110000000000011111111111111111111111111111110000000000000001111110000000","000000001111111111111111000000000111111111111111111111111111111000000000000000001111110000000","000000111111111111111111111000011111111111111111111111111111100000000000000000001111111100000","000000111111111111111111111111111111111111111111111111111111100000000000000000011111111100000","000000000111111111111111111111111111111111111111111111111111000000000000000000011111111100000","000000000111111111111111111111111111111111111111111111111111000000000000000000011111100000000","000000000111111111111111111111111111111111111111111111111111000000000000000000111111100000000","000000000001111111111111111111111111111111111111111111111111110000000000000011111111000000000","000000000000111111111111111111111111111111111111111111111111111100000000001111111111000000000","000000000111111111111111111111111111111111111111111111111111111111110000111111111111100000000","000000001111111111111111111111111111111111111111111111111111111111111111111111111111100000000","000000001111111110011111111111111111111111111111111111111111111111111111111111111111111000000","000000000001111100001111111111111111111111111111111111111111111111111111111111111111100000000","000000000000000000000001111111111111111110111111110111111111111111111111111110000110000000000","000000000000000000000001111111111111111100011111000011111111111111111111110000000000000000000","000000000000000000000111111111111111111100000000000011111111111111111111110000000000000000000","000000000000000000001111111111111111111100000000000011111111111111111111111000000000000000000","000000000000000000000111111111111111111000000000000001111111111111111111111000000000000000000","000000000000000000000011110000111111111000000000000011111111110000011111111000000000000000000","000000000000000000000000000000000011111000000000000111111000000000001111111000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"];
const DARK_CASTLE_ISLAND_ART='assets/maps/map_3.png';
const state={running:false,paused:false,time:0,wave:1,waveTime:0,lastWave:1,spawnTimer:0,enemies:[],bullets:[],drops:[],particles:[],spells:[],enemyShots:[],orbiters:[],portal:null,lastShot:0,kills:0,paidRun:false,bossSpawnedWave:0,bossesSpawnedThisMap:{},bossCount:0,mapIndex:0,portalSpawned:false,finalBossSpawned:false,bossesDefeatedThisMap:0,totalXpGained:0,heartSpawnTimer:15,currentProfile:null,waveWaitingForBoss:false,waveSpawnRemaining:0,waveAdvanceLock:0,merchant:null,mapMerchantSpins:0,finalCrownClaimed:false};
const meta={gold:0,dmg:0,hp:0,mana:0,startSkill:0};
function resetMerchantMeta(){Object.assign(meta,{gold:0,dmg:0,hp:0,mana:0,startSkill:0});}
const HERO_BASE_STATS={mage:{hp:100,dmg:12.5,mana:100,manaRegen:2,speed:4.65},guard:{hp:125,dmg:15,mana:50,manaRegen:1,speed:4.25},archer:{hp:85,dmg:10,mana:85,manaRegen:1,speed:4.7}};
const MERCHANT_META_KEY='bloodwood_merchant_meta_v1';
function loadMerchantMeta(){try{const saved=JSON.parse(localStorage.getItem(MERCHANT_META_KEY)||'{}');if(saved&&typeof saved==='object')Object.assign(meta,saved);}catch(e){console.warn('Merchant meta load failed',e)}}
function saveMerchantMeta(){try{localStorage.setItem(MERCHANT_META_KEY,JSON.stringify(meta));}catch(e){console.warn('Merchant meta save failed',e)}}
loadMerchantMeta();
const abilityIconData={"fireball": "assets/ability/image_62.png", "frost": "assets/ability/image_63.png", "lightning": "assets/ability/image_64.png", "meteor": "assets/ability/image_65.png", "dagger": "assets/ability/image_66.png", "wisps": "assets/ability/image_67.png", "spores": "assets/ability/image_68.png", "mines": "assets/ability/image_69.png", "force": "assets/ability/image_70.png", "twin": "assets/ability/image_71.png", "faster": "assets/ability/image_72.png", "sharper": "assets/ability/image_73.png", "boots": "assets/ability/image_74.png", "magnet": "assets/ability/image_75.png", "heart": "assets/ability/image_76.png", "candle": "assets/ability/image_77.png", "axe": "assets/ability/image_78.png", "tea": "assets/ability/image_79.png"};
function iconHtml(icon){const src=String(icon||"");return /^(data:image|assets\/|\.\/assets\/|https?:\/\/).+\.(png|jpg|jpeg|webp|gif|svg)?/i.test(src)||src.startsWith("data:image")?`<img class="pixel-ability-img" src="${src}" alt="">`:(icon||"✦");}
textures.abilityFireball=dataTexture(abilityIconData.fireball);
textures.abilityMines=dataTexture(abilityIconData.mines);
const abilityDefs=[{id:'fireball',name:'Fireball',icon:abilityIconData.fireball,key:'1',type:'active',cd:'fireball'},{id:'frost',name:'Frost Nova',icon:abilityIconData.frost,key:'2',type:'active',cd:'frost'},{id:'lightning',name:'Storm Acorn',icon:abilityIconData.lightning,key:'3',type:'active',cd:'lightning'},{id:'meteor',name:'Meteor Rain',icon:abilityIconData.meteor,key:'4',type:'active',cd:'meteor'},{id:'dagger',name:'Dancing Daggers',icon:abilityIconData.dagger,type:'passive'},{id:'wisps',name:'Spirit Wisps',icon:abilityIconData.wisps,type:'passive'},{id:'spores',name:'Poison Spores',icon:abilityIconData.spores,type:'passive'},{id:'mines',name:'Rune Mines',icon:abilityIconData.mines,type:'passive'},{id:'force',name:'Force Field',icon:abilityIconData.force,type:'passive'}];
const baseCooldowns={fireball:1.7,frost:6.3,lightning:3,meteor:9999};
const activeManaCosts={fireball:22,frost:28,lightning:24,meteor:80};
const shopItems=[]; // Death merchant now offers only Wheel of Fortune; damage upgrades were removed.
const player={class:'mage',x:0,z:0,r:.35,hp:110,maxHp:110,mana:100,maxMana:100,speed:5.05,level:1,xp:0,nextXp:24,money:0,damage:11,fireRate:.48,attackSpeedLevel:0,bullets:1,pierce:0,bulletSpeed:13,magnet:2.2,manaRegen:2,crit:.05,spread:.13,invuln:0,speedLevel:0,guardRange:1.45,guardRangeLevel:0,upgrades:{},spells:{fireball:0,frost:0,lightning:0,dagger:0,wisps:0,spores:0,mines:0,force:0,meteor:0},cooldowns:{fireball:0,frost:0,lightning:0,meteor:0,wisp:0,spore:0,mine:0,force:0},meteorUsedMap:-1};player.mesh=sprite(textures.hero,1.85);
function baseDamageWithMerchant(cls){const b=HERO_BASE_STATS[cls||player.class]||HERO_BASE_STATS.mage;return b.dmg+(meta.dmg||0)}
function applyMerchantDamageUpgrade(){const base=HERO_BASE_STATS[player.class]||HERO_BASE_STATS.mage;const sharper=player.upgrades&&player.upgrades.sharperRunes?Math.min(5,player.upgrades.sharperRunes)*5:0;player.damage=base.dmg+(meta.dmg||0)+sharper;updateUi&&updateUi();}


const CRYSTAL_CATACOMBS_MAP4_ART='assets/maps/map_4.png';
const CATACOMBS_MAP4_ROWS=[
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000001111111100000111111111110000000000000000001111111111000001111111100000000000000",
"000000000000001111111110011111111111111001111111111100111111111111110111111111110000000000000",
"000000000000001111111111111111111111111111111111111111111111111111111111111111100000000000000",
"000000000000000011111111111111111111111111111111111111111111111111111111111110000000000000000",
"000000000000000011111110000000000000000001111111111100000000000000000111111110000000000000000",
"000000000000000011111110000000000000000000111111111000000000000000000011111110000000000000000",
"000000000000000111111110000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111100000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111100000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111100000000000000000000111111110000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000001111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000001111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000001111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000001111111111000000000000000000011111111000000000000000",
"000000000011111111111110001111111111111111111111111111111111111111100011111111111110000000000",
"000000000011111111111111111111111111111111111101111111111111111111111111111111111110000000000",
"000000000011111111111111111111111111111111100000011111111111111111111111111111111110000000000",
"000000000011111111111111111111111111111111100000011111111111111111111111111111111110000000000",
"000000000011111111111111111111111111111111111111111111111111111111111111111111111110000000000",
"000000000011111111111110000000000000000001111111111000000000000000000011111111111110000000000",
"000000000000000111111110000000000000000001111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111100000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111100000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111100000000000000000000111111110000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000001111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000001111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000001111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000001111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000000111111111000000000000000000011111111000000000000000",
"000000000000000111111110000000000000000000111111111000000000000000000011111111100000000000000",
"000000000000111111111111111111111111111111111111111111111111111111111111111111111000000000000",
"000000000000111111111111111111111111111111111111111111111111111111111111111111111000000000000",
"000000000000111111111111111111111111111111111111111111111111111111111111111111111000000000000",
"000000000000111111111111111111111111111111111111111111111111111111111111111111111000000000000",
"000000000000111111111110000000000000000001111111111000000000000000000011111111111000000000000",
"000000000000111111111110000000000000000000000000000000000000000000000011111111111000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
];
function currentMap(){return mapDefs[state.mapIndex]||mapDefs[0]}function updateMapText(){if(ui.mapText)ui.mapText.textContent=currentMap().name}
function makeDungeon(){const map=currentMap();renderer.setClearColor(map.sky,1);scene.fog=new THREE.FogExp2(map.fog,.026);mapArtGroup.clear();floorGroup.clear();wallGroup.clear();lightGroup.clear();entityGroup.clear();floorSet.clear();addShapeIntegratedMapArt();torches.length=0;obstacles.length=0;entityGroup.add(player.mesh);const rooms=map.decor==='forest'?[{x:-34,z:-20,w:24,h:15},{x:-11,z:-15,w:20,h:18},{x:12,z:-20,w:18,h:16},{x:-29,z:2,w:18,h:20},{x:-6,z:4,w:22,h:17},{x:21,z:0,w:20,h:21},{x:37,z:8,w:10,h:14}]:map.decor==='island'?[{x:-22,z:-13,w:44,h:26},{x:-12,z:-19,w:24,h:38},{x:-30,z:-5,w:60,h:10},{x:-8,z:-8,w:16,h:16}]:map.decor==='castle'?[{x:-34,z:-20,w:14,h:10},{x:-10,z:-20,w:20,h:10},{x:22,z:-20,w:14,h:10},{x:-34,z:-4,w:14,h:10},{x:-8,z:-5,w:16,h:12},{x:22,z:-4,w:14,h:10},{x:-34,z:12,w:14,h:10},{x:-10,z:12,w:20,h:10},{x:22,z:12,w:14,h:10}]:map.decor==='colosseum'?[{x:-24,z:-18,w:48,h:36},{x:-16,z:-12,w:32,h:24},{x:-8,z:-6,w:16,h:12}]:[{x:-28,z:-17,w:22,h:18},{x:-6,z:-8,w:18,h:16},{x:16,z:-16,w:23,h:15},{x:-18,z:7,w:23,h:17},{x:8,z:10,w:26,h:15},{x:36,z:3,w:12,h:16}];function addRect(x0,z0,w,h){for(let x=x0;x<x0+w;x++)for(let z=z0;z<z0+h;z++)floorSet.add(key(x,z))}function addOval(cx,cz,rx,rz){for(let x=Math.floor(cx-rx);x<=Math.ceil(cx+rx);x++)for(let z=Math.floor(cz-rz);z<=Math.ceil(cz+rz);z++){const dx=(x-cx)/rx,dz=(z-cz)/rz;if(dx*dx+dz*dz<=1)floorSet.add(key(x,z))}}function addCorr(x1,z1,x2,z2,width=1){for(let x=Math.min(x1,x2)-width;x<=Math.max(x1,x2)+width;x++)for(let z=Math.min(z1,z2)-width;z<=Math.max(z1,z2)+width;z++)floorSet.add(key(x,z))}if(map.decor==='forest'){floorSet.clear();for(let rz=0;rz<CAVE_MAP2_ROWS.length;rz++){const row=CAVE_MAP2_ROWS[rz];for(let rx=0;rx<row.length;rx++){if(row[rx]==='1')floorSet.add(key(mapBounds.minX+rx,mapBounds.minZ+rz));}}}else if(map.decor==='island'){floorSet.clear();for(let rz=0;rz<ISLAND_MAP3_ROWS.length;rz++){const row=ISLAND_MAP3_ROWS[rz];for(let rx=0;rx<row.length;rx++){if(row[rx]==='1')floorSet.add(key(mapBounds.minX+rx,mapBounds.minZ+rz));}}
// Map 3 uses only the generated green-area mask above; no manual expansion tiles are applied.
}else if(map.decor==='catacombs'){floorSet.clear();for(let rz=0;rz<CATACOMBS_MAP4_ROWS.length;rz++){const row=CATACOMBS_MAP4_ROWS[rz];for(let rx=0;rx<row.length;rx++){if(row[rx]==='1')floorSet.add(key(mapBounds.minX+rx,mapBounds.minZ+rz));}}
}else if(map.decor==='castle'){rooms.forEach(r=>addRect(r.x,r.z,r.w,r.h));addCorr(-27,-15,0,-15,2);addCorr(0,-15,29,-15,2);addCorr(-27,1,0,1,2);addCorr(0,1,29,1,2);addCorr(-27,17,0,17,2);addCorr(0,17,29,17,2);addCorr(-27,-15,-27,17,2);addCorr(0,-15,0,17,2);addCorr(29,-15,29,17,2);addRect(-4,-2,8,6);for(let x=-38;x<=40;x++)for(let z=-24;z<=25;z++){if(floorSet.has(key(x,z))&&Math.random()<.035)floorSet.delete(key(x,z))}}else if(map.decor==='colosseum'){
  // Map 5: Demon Colosseum.
  // Exact tile mask generated from the green filled arena reference:
  // green stone arena floor + lower portal/sigil platform = walkable,
  // colosseum walls, stands, gates, torches, lava and decorations = blocked.
  floorSet.clear();
  const COLOSSEUM_MAP5_ROWS=[
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000001111100000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000001111111111100010000000000000000000000000000000000000",
"000000000000000000000000000000001111111111111111111111111110110000000000000000000000000000000",
"000000000000000000000000000000111111111111111111111111111111111000000000000000000000000000000",
"000000000000000000000000000011111111111111111111111111111111111100000000000000000000000000000",
"000000000000000000000001111111111111111111111111111111111111111111111100000000000000000000000",
"000000000000000000000111111111111111111111111111111111111111111111111111000000000000000000000",
"000000000000000000000111111111111111111111111111111111111111111111111111000000000000000000000",
"000000000000000000001111111111111111111111111111111111111111111111111111100000000000000000000",
"000000000000000001111111111111111111111111111111111111111111111111111111111100000000000000000",
"000000000000000111111111111111111111111111111111111111111111111111111111111110000000000000000",
"000000000000001111111111111111111111111111111111111111111111111111111111111111000000000000000",
"000000000000001111111111111111111111111111111111111111111111111111111111111111100000000000000",
"000000000000000111111111111111111111111111111111111111111111111111111111111111000000000000000",
"000000000000000111111111111111111111111111111111111111111111111111111111111111000000000000000",
"000000000000001111111111111111111111111111111111111111111111111111111111111111110000000000000",
"000000000000011111111111111111111111111111111111111111111111111111111111111111110000000000000",
"000000000000011111111111111111111111111111111111111111111111111111111111111111110000000000000",
"000000000000011111111111111111111111111111111111111111111111111111111111111111110000000000000",
"000000000000101111111111111111111111111111111111111111111111111111111111111111100000000000000",
"000000000000000111111111111111111111111111111111111111111111111111111111111111000000000000000",
"000000000000000111111111111111111111111111111111111111111111111111111111111111000000000000000",
"000000000000001111111111111111111111111111111111111111111111111111111111111111100000000000000",
"000000000000001111111111111111111111111111111111111111111111111111111111111111100000000000000",
"000000000000000111111111111111111111111111111111111111111111111111111111110111000000000000000",
"000000000000000001001111111111111111111111111111111111111111111111111111100100000000000000000",
"000000000000000000001111111111111111111111111111111111111111111111111111100000000000000000000",
"000000000000000000001111111111111111111111111111111111111111111111111111100000000000000000000",
"000000000000000000000011111111111111111111111111111111111111111111111110000000000000000000000",
"000000000000000000000000100011111111111111111111111111111111111110011000000000000000000000000",
"000000000000000000000000000011111111111111111111111111111111111110000000000000000000000000000",
"000000000000000000000000000000111111111111111111111111111111111000000000000000000000000000000",
"000000000000000000000000000000000000001111111111111111000000000000000000000000000000000000000",
"000000000000000000000000000000000000001111111111111111000000000000000000000000000000000000000",
"000000000000000000000000000000000000000111111111111111000000000000000000000000000000000000000",
"000000000000000000000000000000000000000111111111111111000000000000000000000000000000000000000",
"000000000000000000000000000000000000000011111111111110000000000000000000000000000000000000000",
"000000000000000000000000000000000000000011111111111110000000000000000000000000000000000000000",
"000000000000000000000000000000000000000001111111111100000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000001111100000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
];
  for(let rz=0;rz<COLOSSEUM_MAP5_ROWS.length;rz++){
    const row=COLOSSEUM_MAP5_ROWS[rz];
    for(let rx=0;rx<row.length;rx++){
      if(row[rx]==='1') floorSet.add(key(mapBounds.minX+rx,mapBounds.minZ+rz));
    }
  }
}else if(map.decor==='camp'){
// Map 1 v12: exact tile mask traced from the user's green playable-area overlay.
// Each row below is one horizontal slice of the green area.
// Everything not listed here is blocked/non-playable.
const GREEN_MASK_ROWS=[
  [-16,[[-26,-9]]],
  [-15,[[-26,-9],[13,32]]],
  [-14,[[-26,-9],[13,32]]],
  [-13,[[-26,-9],[13,32]]],
  [-12,[[-26,-9],[13,32]]],
  [-11,[[-26,32]]],
  [-10,[[-26,32]]],
  [-9,[[-26,32]]],
  [-8,[[-26,32]]],
  [-7,[[-26,32]]],
  [-6,[[-26,8],[23,32]]],
  [-5,[[-8,8],[23,32]]],
  [-4,[[-8,8],[23,32]]],
  [-3,[[-8,8],[23,32]]],
  [-2,[[-12,8],[23,40]]],
  [-1,[[-12,8],[23,40]]],
  [0,[[-12,0],[3,8],[23,40]]],
  [1,[[-17,0],[3,11],[29,40]]],
  [2,[[-17,0],[3,11],[29,40]]],
  [3,[[-17,0],[3,27],[29,40]]],
  [4,[[-17,40]]],
  [5,[[-17,40]]],
  [6,[[-17,0],[5,40]]],
  [7,[[-17,0],[5,27],[30,40]]],
  [8,[[-17,0],[5,27],[30,40]]],
  [9,[[-17,0],[5,27]]],
  [10,[[-17,0],[5,27]]],
  [11,[[-17,0],[5,27]]],
  [12,[[-17,0],[5,27]]],
  [13,[[-17,0],[5,27]]],
  [14,[[5,27]]],
  [15,[[6,27]]]
];
for(const [z,spans] of GREEN_MASK_ROWS){
  for(const [x0,x1] of spans){
    for(let x=x0;x<=x1;x++) floorSet.add(key(x,z));
  }
}
// Keep the spawn tile guaranteed open but do not add any extra area beyond the traced mask.
}else{rooms.forEach(r=>addRect(r.x,r.z,r.w,r.h));addCorr(-8,-7,2,-2);addCorr(9,-4,17,-7);addCorr(-4,4,-10,10);addCorr(7,7,14,12);addCorr(29,-2,38,6);addCorr(20,12,36,12)};for(let x=-42;x<=50;x++)for(let z=-26;z<=27;z++){if(floorSet.has(key(x,z))){const base=(x+z)&1?map.floorA:map.floorB;const m=plane(1,1,base,1);m.position.set(x,0,z);floorGroup.add(m);if(Math.random()<.14)addScratch(x,z);if(Math.random()<.08)addGrass(x,z);if(map.decor==='island'&&Math.random()<.025){const puddle=circle(.22+Math.random()*.18,0x102d3d,.22);puddle.position.set(x,.035,z);floorGroup.add(puddle)}}else{let near=false;for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)if(floorSet.has(key(x+dx,z+dz)))near=true;if(near){const p=plane(.82,.96,map.wall,1);p.position.set(x,.25,z);wallGroup.add(p);const dark=plane(.1,.9,0x151018,.85);dark.position.set(x-.24,.27,z);wallGroup.add(dark);const tip=plane(.55,.18,map.wall,.95);tip.position.set(x,.32,z-.37);wallGroup.add(tip)}else if(map.decor==='island'){const water=plane(1,1,((x+z)&1)?0x0b2a3a:0x10384c,.18);water.position.set(x,.012,z);floorGroup.add(water);if(Math.random()<.045){const shimmer=plane(.55,.05,0x5aa6c8,.30);shimmer.position.set(x,.018,z);shimmer.rotation.z=Math.random()*Math.PI;floorGroup.add(shimmer)}}}}if(map.decor!=='camp'&&map.decor!=='forest'&&map.decor!=='island'&&map.decor!=='catacombs'&&map.decor!=='colosseum')addScenery();if(map.decor!=='forest'&&map.decor!=='island'&&map.decor!=='catacombs'&&map.decor!=='colosseum'){addDungeonDecor();addMapObstacles();}if(map.decor!=='camp'&&map.decor!=='forest'&&map.decor!=='island'&&map.decor!=='catacombs'&&map.decor!=='colosseum'){addFire(-20,-8);addFire(29,14);addTorch(21,-12);addTorch(42,8);}const vignette=circle(55,0x000000,.08);vignette.position.set(4,.05,0);lightGroup.add(vignette);applyMap1VisualArtMode();updateMapText()}
function addScratch(x,z){for(let i=0;i<1+Math.floor(Math.random()*3);i++){const s=plane(.45*Math.random()+.15,.04,0x3e382f,.6);s.position.set(x+(Math.random()-.5)*.6,.02,z+(Math.random()-.5)*.6);s.rotation.z=Math.random()*Math.PI;floorGroup.add(s)}}function addGrass(x,z){const g=plane(.12,.55,0x4f5141,.55);g.position.set(x+(Math.random()-.5)*.5,.025,z+(Math.random()-.5)*.5);g.rotation.z=Math.random()*Math.PI;floorGroup.add(g)}
function addCrate(x,z){const c=plane(1.1,1,0x6a563d);c.position.set(x,.16,z);entityGroup.add(c);const a=plane(.95,.11,0x332920);a.position.set(x,.18,z-.25);entityGroup.add(a);const b=plane(.11,.9,0x332920);b.position.set(x+.25,.18,z);entityGroup.add(b)}
function addBarrel(x,z){const b=circle(.45,0x6a563d,.95);b.position.set(x,.17,z);entityGroup.add(b);const r=circle(.3,0x2c2924,.55);r.position.set(x,.18,z);entityGroup.add(r)}
function addBone(x,z){const b=plane(1.1,.08,0xbdb6a8,.75);b.position.set(x,.13,z);b.rotation.z=Math.random()*Math.PI;entityGroup.add(b);const k=sprite(textures.skull,.55);k.position.set(x+.35,.34,z+.1);entityGroup.add(k)}
function addBlood(x,z){const b=circle(.42+Math.random()*.35,0x4b0710,.62);b.position.set(x,.06,z);b.scale.x=1.4;b.scale.y=.75;entityGroup.add(b)}function addFlower(x,z){for(let i=0;i<4;i++){const f=circle(.12,0xa855a4,.75);f.position.set(x+Math.cos(i*1.57)*.16,.12,z+Math.sin(i*1.57)*.16);entityGroup.add(f)}}function addBonePile(x,z){for(let i=0;i<4;i++)addBone(x+(Math.random()-.5)*.9,z+(Math.random()-.5)*.65)}
function addFenceStack(x,z){for(let i=0;i<3;i++){const plank=plane(1.2,.16,0x4a3c35,.95);plank.position.set(x+(Math.random()-.5)*.25,.18,z+i*.22-.22);plank.rotation.z=(Math.random()-.5)*.55;entityGroup.add(plank)}}function addRope(x,z){const r=plane(.95,.08,0x9b7b47,.75);r.position.set(x,.14,z);r.rotation.z=Math.random()*Math.PI;entityGroup.add(r);const r2=circle(.22,0x9b7b47,.55);r2.position.set(x+.25,.145,z+.05);entityGroup.add(r2)}
function addTable(x,z){const top=plane(1.7,1.05,0x5f5147,.95);top.position.set(x,.2,z);entityGroup.add(top);const line=plane(1.45,.08,0x2f2925,.75);line.position.set(x,.22,z);entityGroup.add(line);const cup=circle(.14,0xbdb6a8,.7);cup.position.set(x-.45,.24,z-.2);entityGroup.add(cup);const knife=plane(.65,.06,0xbdb6a8,.75);knife.position.set(x+.25,.25,z+.18);knife.rotation.z=.45;entityGroup.add(knife)}
function addSack(x,z){const s=circle(.42,0x7b6749,.8);s.position.set(x,.15,z);s.scale.x=1.25;s.scale.y=.8;entityGroup.add(s);const tie=plane(.38,.05,0x3b3024,.7);tie.position.set(x,.17,z-.1);entityGroup.add(tie)}
function addChain(x,z,rot=0){for(let i=0;i<5;i++){const link=plane(.34,.07,0x9aa0a8,.72);link.position.set(x+Math.cos(rot)*i*.18,.19+i*.012,z+Math.sin(rot)*i*.18);link.rotation.z=rot+(i%2?Math.PI/2:0);entityGroup.add(link)}const hook=circle(.12,0x5b6470,.65);hook.position.set(x-.18,.2,z-.18);entityGroup.add(hook)}
function addSkeleton(x,z){const skull=sprite(textures.skull,.72);skull.position.set(x,.44,z);entityGroup.add(skull);for(let i=0;i<5;i++){const b=plane(.55+Math.random()*.35,.07,0xc6beb2,.78);b.position.set(x+(Math.random()-.5)*.9,.15,z+(Math.random()-.5)*.75);b.rotation.z=Math.random()*Math.PI;entityGroup.add(b)}const rib=plane(.7,.06,0x8f8a84,.55);rib.position.set(x,.16,z+.3);rib.rotation.z=.15;entityGroup.add(rib)}
function addWallTorch(x,z){const t=sprite(textures.torch,.62);t.position.set(x,.64,z);entityGroup.add(t);const bracket=plane(.48,.08,0x332920,.86);bracket.position.set(x,.32,z+.18);entityGroup.add(bracket);const g=softGlow(x,z,2.7,currentMap().accent,.20);torches.push({glow:g.outer,mid:g.mid,core:g.core,sprite:t,phase:Math.random()*10})}
function addBookshelf(x,z,rot=0){const back=plane(1.35,.92,0x3a261c,.96);back.position.set(x,.21,z);back.rotation.z=rot;entityGroup.add(back);for(let i=0;i<7;i++){const book=plane(.12,.62, [0x7f1d1d,0x1d4d2e,0x312e81,0x7c5a22,0x2d3a4a][i%5], .95);book.position.set(x+(i-3)*.16*Math.cos(rot),.24,z+(i-3)*.16*Math.sin(rot));book.rotation.z=rot;entityGroup.add(book)}const shelf1=plane(1.25,.06,0x8b5e34,.95);shelf1.position.set(x,.26,z-.27);shelf1.rotation.z=rot;entityGroup.add(shelf1);const shelf2=plane(1.25,.06,0x8b5e34,.95);shelf2.position.set(x,.26,z+.27);shelf2.rotation.z=rot;entityGroup.add(shelf2)}
function addWeb(x,z,rot=0){const hub=circle(.06,0xd6d3d1,.48);hub.position.set(x,.18,z);entityGroup.add(hub);for(let i=0;i<5;i++){const line=plane(.75,.025,0xd6d3d1,.32);line.position.set(x+Math.cos(rot+i*.52)*.22,.17,z+Math.sin(rot+i*.52)*.22);line.rotation.z=rot+i*.52;entityGroup.add(line)}for(let r=.22;r<=.55;r+=.16){const arc=circle(r,0xd6d3d1,.08);arc.position.set(x,.165,z);arc.scale.y=.42;arc.rotation.z=rot;entityGroup.add(arc)}}
function addSpill(x,z,color=0x6ee7b7){const s=circle(.42+Math.random()*.34,color,.32);s.position.set(x,.055,z);s.scale.x=1.55+Math.random()*.7;s.scale.y=.55+Math.random()*.45;s.rotation.z=Math.random()*Math.PI;entityGroup.add(s);const shine=circle(.12,color,.38);shine.position.set(x+.18,.06,z-.08);entityGroup.add(shine)}
function addTree(x,z,size=1.35,dead=false){const t=sprite(dead?textures.deadTree:textures.tree,size);t.position.set(x,.78*size,z);entityGroup.add(t);const shade=circle(.42*size,0x000000,.18);shade.position.set(x,.045,z+.18);shade.scale.x=1.35;entityGroup.add(shade)}
function addLakePatch(x,z,rx=1,rz=1){const w=circle(1.0,0x123a52,.70);w.position.set(x,.028,z);w.scale.x=rx;w.scale.y=rz;floorGroup.add(w);const edge=circle(1.0,0x0b2436,.28);edge.position.set(x,.026,z);edge.scale.x=rx*1.08;edge.scale.y=rz*1.08;floorGroup.add(edge)}

function addObstacle(x,z,r,parts=[]){obstacles.push({x,z,r});parts.forEach(m=>entityGroup.add(m))}
function addInvisibleObstacle(x,z,r){obstacles.push({x,z,r})}
function collidesObstacle(x,z,r=.35){for(const o of obstacles)if(Math.hypot(x-o.x,z-o.z)<o.r+r)return true;return false}
function canStandAt(x,z,r=.35){
  // Sample the player's radius instead of checking only the centre cell. This prevents
  // slipping through/over the palisade when the sprite overlaps an adjacent blocked tile.
  const rr=Math.max(.28,r*.95);
  const pts=[[0,0],[rr,0],[-rr,0],[0,rr],[0,-rr],[rr*.72,rr*.72],[-rr*.72,rr*.72],[rr*.72,-rr*.72],[-rr*.72,-rr*.72]];
  for(const [dx,dz] of pts){if(!floorSet.has(key(Math.round(x+dx),Math.round(z+dz))))return false}
  return !collidesObstacle(x,z,r)
}
function addBlockingBlock(x,z,w=1,h=1,color=0x4a3c35){const b=plane(w,h,color,.98);b.position.set(x,.23,z);const top=plane(w*.8,.08,0x8f8a84,.66);top.position.set(x,.27,z-h*.28);addObstacle(x,z,Math.max(w,h)*.45,[b,top])}
function addBlockingTower(x,z,size=1.25,color=0x343b48){const base=circle(size*.46,color,.96);base.position.set(x,.24,z);const cap=circle(size*.35,0x64748b,.86);cap.position.set(x,.32,z-.12);const slit=plane(size*.12,size*.48,0x111827,.8);slit.position.set(x,.35,z-.02);addObstacle(x,z,size*.52,[base,cap,slit])}
function addBlockingTree(x,z,size=1.18,dead=false){const t=sprite(dead?textures.deadTree:textures.tree,size);t.position.set(x,.78*size,z);const shade=circle(.42*size,0x000000,.18);shade.position.set(x,.045,z+.18);shade.scale.x=1.35;addObstacle(x,z,.38*size,[shade,t])}
function addMapObstacles(){const m=currentMap();let list=[];if(m.decor==='camp')list=[];else if(m.decor==='forest')list=[[-22,-9,'tree'],[-9,-3,'tree'],[8,-7,'tree'],[18,7,'tree'],[-24,11,'tree'],[2,13,'tree'],[31,10,'tree'],[40,15,'tree'],[-2,2,'block']];else if(m.decor==='island')list=[];else if(m.decor==='castle')list=[[-27,-15,'tower'],[0,-15,'block'],[29,-15,'tower'],[-27,1,'block'],[29,1,'block'],[-27,17,'tower'],[0,17,'block'],[29,17,'tower'],[-7,0,'block'],[7,0,'block']];else if(m.decor==='colosseum')list=[[-23,-15,'tower'],[23,-15,'tower'],[-23,15,'tower'],[23,15,'tower'],[-12,0,'block'],[12,0,'block'],[0,-9,'block'],[0,9,'block']];for(const [x,z,t] of list){if(t==='portalClear')continue;if(!floorSet.has(key(Math.round(x),Math.round(z))))continue;if(t==='invisible')addInvisibleObstacle(x,z,.42);else if(t==='stump')addInvisibleObstacle(x,z,.34);else if(t==='tree')addBlockingTree(x,z,1.05+Math.random()*.15,m.decor==='island');else if(t==='tower')addBlockingTower(x,z,1.2,m.decor==='island'?0x2b303b:0x343b48);else addBlockingBlock(x,z,1.15,1.05,m.decor==='forest'?0x314029:(m.decor==='island'?0x2b303b:0x4a3c35))}}

function addRuinBlock(x,z,w=1.2,h=.9,color=0x2b303b){const b=plane(w,h,color,.98);b.position.set(x,.24,z);entityGroup.add(b);const hi=plane(w*.82,.07,0x596170,.72);hi.position.set(x,.27,z-h*.28);entityGroup.add(hi);const moss=plane(w*.42,.06,0x1f4d2e,.70);moss.position.set(x-w*.18,.285,z+h*.26);entityGroup.add(moss)}
function addCastleRuins(){const stone=0x2b303b;for(let x=-8;x<=8;x+=2){addRuinBlock(x,-6,1.45,.85,stone);addRuinBlock(x,6,1.45,.85,stone)}for(let z=-4;z<=4;z+=2){addRuinBlock(-9,z,.9,1.35,stone);addRuinBlock(9,z,.9,1.35,stone)}[[-7,-5],[-7,5],[7,-5],[7,5]].forEach(([x,z])=>{addRuinBlock(x,z,1.55,1.55,0x343b48);const cap=plane(1.1,.18,0x596170,.85);cap.position.set(x,.42,z-.45);entityGroup.add(cap)});[[-3,-2],[0,-2],[3,-2],[-3,2],[0,2],[3,2]].forEach(([x,z])=>addRuinBlock(x,z,1.15,.7,0x202633));[[0,0],[-5,0],[5,0],[0,-4],[0,4]].forEach(([x,z])=>addSpill(x,z,0x6b7280));[[-4,-4],[4,-4],[-4,4],[4,4]].forEach(([x,z])=>addWallTorch(x,z));for(let i=0;i<9;i++)addSkeleton(-6+Math.random()*12,-5+Math.random()*10);for(let i=0;i<7;i++)addWeb(-8+Math.random()*16,-6+Math.random()*12,Math.random()*Math.PI)}


function addCastleKeepDecor(){for(let x=-35;x<=35;x+=7){addBlockingBlock(x,-23,1.2,.9,0x1f1a2a);addBlockingBlock(x,25,1.2,.9,0x1f1a2a)}for(let z=-19;z<=21;z+=8){addBlockingTower(-39,z,1.0,0x20182d);addBlockingTower(40,z,1.0,0x20182d)}[[-27,-15],[0,-15],[29,-15],[-27,1],[0,1],[29,1],[-27,17],[0,17],[29,17]].forEach(([x,z])=>addWallTorch(x,z));[[-6,-2],[6,-2],[-6,5],[6,5],[-21,-18],[24,14],[-30,18],[31,-14]].forEach(([x,z])=>addBookshelf(x,z,Math.random()<.5?0:Math.PI/2));for(let i=0;i<16;i++)addWeb(-34+Math.random()*68,-20+Math.random()*42,Math.random()*Math.PI);for(let i=0;i<12;i++)addSkeleton(-34+Math.random()*68,-20+Math.random()*42)}
function addColosseumDecor(){for(let a=0;a<Math.PI*2;a+=Math.PI/10){const x=Math.cos(a)*29,z=Math.sin(a)*20;addBlockingTower(x,z,1.0,0x4a211c);const flame=sprite(textures.torch,.62);flame.position.set(Math.cos(a)*25,.55,Math.sin(a)*17);entityGroup.add(flame)}for(let a=0;a<Math.PI*2;a+=Math.PI/14){const x=Math.cos(a)*20,z=Math.sin(a)*13;const slab=plane(1.4,.32,0x8a4b32,.84);slab.position.set(x,.12,z);slab.rotation.z=a;entityGroup.add(slab)}[[0,-11],[0,11],[-17,0],[17,0]].forEach(([x,z])=>addWallTorch(x,z));for(let i=0;i<18;i++)addBlood(-16+Math.random()*32,-10+Math.random()*20);for(let i=0;i<10;i++)addBone(-18+Math.random()*36,-12+Math.random()*24)}
function addDungeonDecor(){
  const m=currentMap();
  if(m.decor==='camp'){
    // Map 1 should stay clean: no extra skulls, skeletons, webs, torches or other generated structures.
    return;
  }else{
    [[-27,-16],[-7,-8],[16,-16],[-18,7],[8,10],[36,3],[47,10],[-28,-1]].forEach(([x,z],i)=>addWallTorch(x,z));
  }
  {
    [[-25,-14],[-10,6],[5,-6],[18,-14],[29,17],[42,5]].forEach(([x,z],i)=>addChain(x,z,i%2?Math.PI/2:0));
    [[-24,-3],[-13,13],[6,3],[20,-9],[31,11],[40,14]].forEach(([x,z])=>addSkeleton(x,z));
    [[-21,-15],[-3,-7],[10,5],[18,15],[35,-1]].forEach(([x,z],i)=>addBookshelf(x,z,i%2?Math.PI/2:0));
    [[-27,-16],[-7,7],[16,-15],[-17,23],[8,10],[47,3],[47,18],[35,3]].forEach(([x,z],i)=>addWeb(x,z,i*.4));
    [[-18,-5],[-4,4],[13,-4],[24,13],[37,9],[-25,12],[3,17]].forEach(([x,z],i)=>addSpill(x,z,[0x6ee7b7,0xa855f7,0x93c5fd,0x84cc16][i%4]));
  }
  if(m.decor==='forest'){
    [[-38,-23],[-34,-18],[-31,-22],[-29,-15],[-25,-23],[-21,-19],[-16,-22],[-10,-20],[-4,-23],[3,-21],[11,-23],[18,-20],[25,-22],[33,-19],[40,-16],[47,-10],[-39,18],[-34,22],[-28,19],[-22,23],[-16,20],[-9,23],[-2,21],[6,23],[14,20],[22,23],[30,21],[38,22],[46,17],[-38,-6],[-36,5],[45,2],[48,8]].forEach((p,i)=>addTree(p[0],p[1],1.18+(i%4)*.16,i%7===0));
    [[-14,-2],[-8,0],[-2,-1],[5,0],[12,1],[18,2],[24,3],[-28,2],[-31,8],[-32,14],[35,-4],[39,-2],[43,1]].forEach((p,i)=>addTree(p[0],p[1],.86+(i%3)*.12,i%6===0));
    [[-5,1,2.7,1.15],[-1,2,2.0,.9],[4,1,1.8,.72],[1,-.7,1.45,.55],[27,15,2.4,.85]].forEach(p=>addLakePatch(...p));
    [[-10,-5],[11,4],[-21,4],[24,-6],[32,13],[-31,-11],[41,16]].forEach(([x,z])=>addWallTorch(x,z));
    [[-30,-12],[-18,14],[7,15],[29,7],[41,12],[-6,-9]].forEach(([x,z])=>{addFlower(x,z);addFlower(x+.8,z+.35);addFlower(x-.6,z-.45)});
    for(let i=0;i<16;i++)addWeb(-34+Math.random()*78,-22+Math.random()*44,Math.random()*Math.PI)
  }
  if(m.decor==='island'){addCastleRuins();[[-27,-13],[-24,13],[24,-13],[27,13],[-30,0],[30,0],[0,-18],[0,18]].forEach(([x,z])=>addBonePile(x,z));for(let i=0;i<10;i++)addSpill(-24+Math.random()*48,-15+Math.random()*30,0x38bdf8);for(let i=0;i<18;i++){const a=Math.random()*Math.PI*2,rr=22+Math.random()*9;addBone(Math.cos(a)*rr,Math.sin(a)*rr*.65)}}
  if(m.decor==='castle')addCastleKeepDecor();
  if(m.decor==='colosseum')addColosseumDecor();
  if(m.decor==='crypt'){for(let i=0;i<10;i++)addSkeleton(-30+Math.random()*70,-20+Math.random()*38)}
  if(m.decor==='lava'){for(let i=0;i<8;i++)addSpill(-30+Math.random()*70,-20+Math.random()*38,0xff5a2f)}
}

function addFire(x,z){const pit=circle(.7,0x3a3029,.9);pit.position.set(x,.1,z);entityGroup.add(pit);const f=sprite(textures.torch,1.05);f.position.set(x,.75,z);entityGroup.add(f);const g=softGlow(x,z,5.2,currentMap().accent,.34);torches.push({glow:g.outer,mid:g.mid,core:g.core,sprite:f,phase:Math.random()*10})}
function addTorch(x,z){const t=sprite(textures.torch,.72);t.position.set(x,.55,z);entityGroup.add(t);const g=softGlow(x,z,3.4,currentMap().accent,.24);torches.push({glow:g.outer,mid:g.mid,core:g.core,sprite:t,phase:Math.random()*10})}
function addScenery(){[[-31,-10],[-30,-13],[-17,16],[11,18],[16,18],[25,15],[37,5],[43,14],[-11,-15],[21,16],[23,16],[44,6]].forEach(p=>addCrate(...p));[[-24,5],[4,-7],[30,-12],[34,11],[-26,-13],[18,-13],[27,19]].forEach(p=>addBarrel(...p));[[-22,-2],[-17,3],[-8,12],[4,1],[18,-8],[24,18],[33,0],[-27,-7],[13,13]].forEach(p=>addBone(...p));[[-25,-6],[-14,0],[-5,14],[7,-4],[20,-12],[28,8],[-20,11],[15,-5],[35,13]].forEach(p=>addBlood(...p));[[-12,-14],[31,-3],[40,10],[-6,17],[28,-15],[45,15]].forEach(p=>addFlower(...p));[[-15,-11],[2,5],[22,-4],[30,18]].forEach(p=>addBonePile(...p));[[-27,0],[-2,-7],[9,14],[32,-9],[39,16]].forEach(p=>addFenceStack(...p));[[-18,-15],[-1,2],[19,0],[27,11],[41,4]].forEach(p=>addRope(...p));[[-19,-13],[22,-14]].forEach(p=>addTable(...p));[[-23,14],[-13,18],[13,-7],[29,-10],[38,12]].forEach(p=>addSack(...p))}
const enemyTypes=[
  {tex:'mob1',hp:25,spd:1.55,dmgPct:0.0500,xp:8,money:2,size:1.08,color:0x7bed5f,unlock:1},
  {tex:'mob2',hp:35,spd:1.45,dmgPct:0.0575,xp:10,money:2,size:1.08,color:0x7fffea,unlock:2},
  {tex:'mob3',hp:45,spd:3.25,dmgPct:0.0650,xp:12,money:3,size:1.05,color:0x8b5f4a,unlock:3},
  {tex:'mob4',hp:55,spd:3.05,dmgPct:0.0725,xp:14,money:3,size:1.08,color:0xc2412f,unlock:4},
  {tex:'mob5',hp:65,spd:2.0,dmgPct:0.0800,xp:16,money:4,size:1.1,color:0xe8dcc2,unlock:5},
  {tex:'mob6',hp:75,spd:1.85,dmgPct:0.0875,xp:18,money:4,size:1.15,color:0xe8dcc2,unlock:6},
  {tex:'mob7',hp:85,spd:2.05,dmgPct:0.0950,xp:20,money:5,size:1.13,color:0x8bdc4f,unlock:7},
  {tex:'mob8',hp:95,spd:1.95,dmgPct:0.1025,xp:22,money:5,size:1.16,color:0x78b84a,unlock:8},
  {tex:'mob9',hp:105,spd:1.15,dmgPct:0.1100,xp:24,money:6,size:1.18,color:0xd2b16b,unlock:9},
  {tex:'mob10',hp:115,spd:1.05,dmgPct:0.1175,xp:26,money:6,size:1.22,color:0xbe6bd6,unlock:10},
  {tex:'mob11',hp:125,spd:1.85,dmgPct:0.1250,xp:28,money:7,size:1.18,color:0xc8b48f,unlock:11},
  {tex:'mob12',hp:135,spd:1.75,dmgPct:0.1325,xp:30,money:7,size:1.2,color:0xf5c45f,unlock:12},
  {tex:'mob13',hp:145,spd:1.55,dmgPct:0.1400,xp:32,money:8,size:1.22,color:0x8f6f3e,unlock:13},
  {tex:'mob14',hp:155,spd:2.25,dmgPct:0.1475,xp:34,money:8,size:1.15,color:0xffa94d,unlock:14},
  {tex:'mob15',hp:165,spd:2.85,dmgPct:0.1550,xp:36,money:9,size:1.0,color:0xe8dcc2,unlock:15},
  {tex:'mob16',hp:175,spd:1.55,dmgPct:0.1625,xp:38,money:9,size:1.44,color:0xb8733f,unlock:16},
  {tex:'mob17',hp:185,spd:1.08,dmgPct:0.1700,xp:40,money:10,size:1.38,color:0x8aa64c,unlock:17},
  {tex:'mob18',hp:195,spd:1.65,dmgPct:0.1775,xp:42,money:10,size:1.18,color:0x78d7bb,unlock:18},
  {tex:'mob19',hp:205,spd:2.1,dmgPct:0.1850,xp:44,money:11,size:1.2,color:0xef4444,unlock:19},
  {tex:'mob20',hp:215,spd:1.75,dmgPct:0.1925,xp:46,money:11,size:1.22,color:0xa78bfa,unlock:20},
  {tex:'mob21',hp:225,spd:1.35,dmgPct:0.2000,xp:48,money:12,size:1.35,color:0x93c5fd,unlock:21},
  {tex:'mob22',hp:235,spd:2.0,dmgPct:0.2075,xp:50,money:12,size:1.22,color:0xf97316,unlock:22},
  {tex:'mob23',hp:245,spd:1.25,dmgPct:0.2150,xp:52,money:13,size:1.42,color:0x22c55e,unlock:23},
  {tex:'mob24',hp:255,spd:2.3,dmgPct:0.2225,xp:54,money:13,size:1.15,color:0xffcf7b,unlock:24}
];

function mapEnemyRange(){
  const m=Number(state.mapIndex)||0;
  if(m===0)return [1,6];
  if(m===1)return [7,12];
  if(m===2)return [13,18];
  if(m===3)return [19,24];
  return [1,24];
}
function getMapEnemyTypes(){
  const [start,end]=mapEnemyRange();
  return enemyTypes.filter(t=>{const n=Number(String(t.tex).replace('mob',''));return n>=start&&n<=end;});
}
function getAvailableEnemyTypes(){
  const pool=getMapEnemyTypes();
  if(!pool.length)return enemyTypes.slice(0,1);
  const unlockCount=Math.max(1,Math.min(pool.length,Math.ceil(((Number(state.wave)||1)/WAVES_PER_MAP)*pool.length)));
  return pool.slice(0,unlockCount);
}
function chooseEnemyType(pool=getAvailableEnemyTypes()){
  if(!pool||!pool.length)return enemyTypes[0];
  // Prefer newest unlocked mobs slightly, while still allowing earlier mobs to appear.
  const roll=Math.random();
  if(pool.length>1&&roll<0.55)return pool[pool.length-1];
  if(pool.length>2&&roll<0.78)return pool[pool.length-2];
  return pool[Math.floor(Math.random()*pool.length)];
}
const bossProfiles=[{tex:'bossImported1',name:'Ancient Stone Brute',color:0x8a8176,size:2.7,baseHp:1000,baseDmg:38,spd:1.45},{tex:'bossImported2',name:'Buried Hookback',color:0x8f7b55,size:2.9,baseHp:1250,baseDmg:42,spd:1.15},{tex:'bossImported3',name:'Mosswing Gargoyle',color:0x6b8f5a,size:2.85,baseHp:1500,baseDmg:46,spd:1.35},{tex:'bossImported4',name:'Rotwing Colossus',color:0x84cc16,size:3.0,baseHp:1750,baseDmg:50,spd:1.2},{tex:'bossImported5',name:'Crescent Reaper',color:0x38bdf8,size:2.95,baseHp:2500,baseDmg:54,spd:1.1},{tex:'bossImported6',name:'Plague Hook Ogre',color:0xbef264,size:3.0,baseHp:2000,baseDmg:58,spd:1.05},{tex:'bossImported7',name:'Moss Club Brute',color:0x84cc16,size:3.1,baseHp:2250,baseDmg:62,spd:0.95},{tex:'bossImported8',name:'Emerald Treant',color:0x22c55e,size:2.85,baseHp:2500,baseDmg:66,spd:1.22},{tex:'bossImported9',name:'Bog Troll',color:0x84cc16,size:2.7,baseHp:2750,baseDmg:70,spd:1.25},{tex:'bossImported10',name:'Redcap Moss Giant',color:0xa3e635,size:3.0,baseHp:3500,baseDmg:74,spd:0.9},{tex:'bossImported11',name:'Frost Crystal Colossus',color:0x38bdf8,size:2.85,baseHp:3000,baseDmg:78,spd:1.25},{tex:'bossImported12',name:'Azure Crystal Golem',color:0x38bdf8,size:2.95,baseHp:3250,baseDmg:82,spd:1.05},{tex:'bossImported13',name:'Coral Lancer',color:0x22d3ee,size:2.9,baseHp:3500,baseDmg:86,spd:1.0},{tex:'bossImported14',name:'Frost Axe Warrior',color:0x93c5fd,size:2.85,baseHp:3750,baseDmg:90,spd:1.05},{tex:'bossImported15',name:'Grave Scythe Wraith',color:0x38bdf8,size:3.0,baseHp:4500,baseDmg:94,spd:1.15},{tex:'bossImported16',name:'Broodmother Spider',color:0xf472b6,size:3.25,baseHp:4000,baseDmg:98,spd:0.95},{tex:'bossImported17',name:'Nightwing Demon',color:0xa855f7,size:3.05,baseHp:4250,baseDmg:102,spd:1.1},{tex:'bossImported18',name:'Plague Necromancer',color:0x84cc16,size:3.0,baseHp:4500,baseDmg:106,spd:1.05},{tex:'bossImported19',name:'Horned Hellguard',color:0xef4444,size:3.4,baseHp:4750,baseDmg:110,spd:1.0},{tex:'bossImported20',name:'Violet Demon Lord',color:0xd946ef,size:3.35,baseHp:5500,baseDmg:114,spd:0.85},{tex:'bossImported21',name:'Molten Fire Titan',color:0xf97316,size:3.2,baseHp:5000,baseDmg:118,spd:0.95},{tex:'bossImported22',name:'Emberback Behemoth',color:0xf97316,size:3.0,baseHp:5250,baseDmg:122,spd:1.2},{tex:'bossImported23',name:'Lava Maul Colossus',color:0xf97316,size:3.25,baseHp:5500,baseDmg:126,spd:0.9},{tex:'bossImported24',name:'Burning Iron Ogre',color:0xf97316,size:3.4,baseHp:5750,baseDmg:130,spd:0.82},{tex:'bossImported25',name:'Crimson Doom Dragon',color:0xef4444,size:4.15,baseHp:10000,baseDmg:134,spd:1.08}];

// Fixed balance table: exact HP values for minibosses/bosses 1-25.
// Keeping this as a global constant prevents boss spawn crashes caused by missing runtime data.
const bossHpByOrdinal=[2500,3000,3500,4000,5000,4500,5000,5500,6000,7500,6500,7000,7500,8000,10000,8500,9000,9500,10000,15000,10000,12500,15000,20000,25000];
const bossAbilityCooldownByOrdinal=[7,6.75,6.5,6.25,6,5.75,5.5,5.25,5,4.75,4.5,4.5,4.5,4.5,4.5,4.25,4.25,4.25,4.25,3.5,3.5,3.5,3.5,3.5,2.5];
function bossAbilityCooldown(e){const ord=Math.max(1,Math.min(25,(e&&e.ordinal)||1));return bossAbilityCooldownByOrdinal[ord-1]||5;}
function enemyContactDamage(t,scale=1){
  const maxHp=Number(player&&player.maxHp)||100;
  const pct=Number(t&&t.dmgPct);
  const fallback=Number(t&&t.dmg)||5;
  const raw=Number.isFinite(pct)?maxHp*pct:fallback;
  return Math.max(1,raw*scale);
}
const finalBossProfile={tex:'bossImported25',name:'Crimson Doom Dragon',color:0xef4444,size:4.35,baseHp:25000,baseDmg:205,spd:1.18,fireCd:2.25,fireSpeed:5.1,fireDmg:104};
const abilities=[{name:'Twin Arrows',icon:abilityIconData.twin,rarity:'rare',desc:'Archer only. Max Lv 3. Lv1 shoots 2 arrows, then +1 arrow per level up to 4 arrows.',weight:9,apply:()=>{if(player.class==='archer'&&(player.upgrades.twinArrows||0)<3){player.upgrades.twinArrows=(player.upgrades.twinArrows||0)+1;player.bullets=Math.min(4,1+player.upgrades.twinArrows)}}},{name:'Faster Draw',icon:abilityIconData.faster,rarity:'basic',desc:'+10% attack speed. No direct damage. Max level 5. Unavailable for Mage.',weight:9,apply:()=>{if(player.class!=='mage'&&player.attackSpeedLevel<5){player.attackSpeedLevel++;player.fireRate*=.90}}},{name:'Sharper Runes',icon:abilityIconData.sharper,rarity:'basic',desc:'Projectile damage upgrade. Max Lv 5. Each level gives +5 flat damage.',weight:9,apply:()=>{const lvl=player.upgrades.sharperRunes||0;if(lvl<5){player.damage+=5;player.upgrades.sharperRunes=lvl+1}}},{name:'Fleet Boots',icon:abilityIconData.boots,rarity:'basic',desc:'+10% move speed. No direct damage. Max level 5.',weight:7,apply:()=>{if(player.speedLevel<5){player.speedLevel++;player.speed*=1.10}}},{name:'Moon Magnet',icon:abilityIconData.magnet,rarity:'basic',desc:'Max Lv 5. Collect drops from farther away. No direct damage.',weight:7,apply:()=>{const lvl=player.upgrades.moonMagnet||0;if(lvl<5){player.magnet+=1.25;player.upgrades.moonMagnet=lvl+1}}},{name:'Warm Soup',icon:abilityIconData.heart,rarity:'basic',desc:'Max Lv 5. +30 max HP and heal 30. No direct damage.',weight:7,apply:()=>{const lvl=player.upgrades.warmSoup||0;if(lvl<5){player.maxHp+=30;player.hp=Math.min(player.maxHp,player.hp+30);player.upgrades.warmSoup=lvl+1}}},{name:'Piercing Candle',icon:abilityIconData.candle,rarity:'rare',desc:'Archer only. Max Lv 5: Lv1 hits 2 mobs, then +1 mob per level up to 6 mobs. Damage stays equal to arrow damage.',weight:6,apply:()=>{if(player.class==='archer'&&(player.upgrades.piercingCandle||0)<5){player.upgrades.piercingCandle=(player.upgrades.piercingCandle||0)+1;player.pierce=player.upgrades.piercingCandle}}},{name:'Axe Reach',icon:abilityIconData.axe,rarity:'rare',desc:'Guard only: +20% axe attack range. Axe hit deals 108% of base damage. Max level 5.',weight:6,apply:()=>{if(player.class==='guard'){player.guardRangeLevel=(player.guardRangeLevel||0)+1;player.guardRange=(player.guardRange||1.45)*1.20}}},{name:'Fireball Tome',icon:abilityIconData.fireball,rarity:'rare',desc:'Active. Mana 22. Fireball damage: 46 at Lv1, then +16 per level. Explosion radius also grows.',weight:5,apply:()=>{if(player.spells.fireball<5)player.spells.fireball++}},{name:'Frost Nova Charm',icon:abilityIconData.frost,rarity:'rare',desc:'Active. Mana 28. Frost Nova damage: 28 at Lv1, then +10 per level. Also freezes enemies.',weight:5,apply:()=>{if(player.spells.frost<5)player.spells.frost++}},{name:'Storm Acorn',icon:abilityIconData.lightning,rarity:'epic',desc:'Active. Mana 24. Instantly kills normal mobs only. Lv1: 3 mobs, Lv5: 7 mobs. No boss damage.',weight:4,apply:()=>{if(player.spells.lightning<5)player.spells.lightning++}},{name:'Dancing Dagger',icon:abilityIconData.dagger,rarity:'rare',desc:'Passive. Orbiting dagger damage: 17 at Lv1, then +5 per level. Each level adds one knife, max 5.',weight:5,apply:()=>{if(player.spells.dagger<5){player.spells.dagger++;syncDaggers()}}},{name:'Spirit Wisps',icon:abilityIconData.wisps,rarity:'legendary',desc:'Passive. Wisp projectile damage: 14 at Lv1, then +5 per level. Upgrades also reduce cooldown.',weight:1,apply:()=>{if(player.spells.wisps<5)player.spells.wisps++}},{name:'Poison Spores',icon:abilityIconData.spores,rarity:'rare',desc:'Passive. Poison damage: 14 DPS at Lv1, then +6 DPS per level.',weight:5,apply:()=>{if(player.spells.spores<5)player.spells.spores++}},{name:'Rune Mines',icon:abilityIconData.mines,rarity:'epic',desc:'Passive. Mine explosion damage: 39 at Lv1, then +13 per level.',weight:4,apply:()=>{if(player.spells.mines<5)player.spells.mines++}},{name:'Force Field',icon:abilityIconData.force,rarity:'epic',desc:'Passive. Aura damage: 19 DPS at Lv1, then +7 DPS per level.',weight:3,apply:()=>{if(player.spells.force<5)player.spells.force++}},{name:'Meteor Rain',icon:abilityIconData.meteor,rarity:'legendary',desc:'Active. Mana 80. Clears normal mobs only. Bosses are ignored. One use per map, then refreshes after entering the next map.',weight:1,apply:()=>{player.spells.meteor=1}},{name:'Blue Tea',icon:abilityIconData.tea,rarity:'basic',desc:'Max Lv 5. Each level gives +5 max mana and +1 mana regen. No direct damage.',weight:6,apply:()=>{const lvl=player.upgrades.blueTea||0;if(lvl<5){player.maxMana+=5;player.manaRegen+=1;player.mana=Math.min(player.maxMana,player.mana+5);player.upgrades.blueTea=lvl+1}}}];
function abilityPreview(a){
  const n=a.name,lvl={fireball:player.spells.fireball||0,frost:player.spells.frost||0,lightning:player.spells.lightning||0,dagger:player.spells.dagger||0,wisps:player.spells.wisps||0,spores:player.spells.spores||0,mines:player.spells.mines||0,force:player.spells.force||0,meteor:player.spells.meteor||0};
  const line=(cur,next,cost='')=>`${a.desc}<br><b>Current:</b> ${cur}<br><b>After upgrade:</b> ${next}${cost?`<br><b>Mana cost:</b> ${cost}`:''}`;
  if(n==='Fireball Tome'){const c=lvl.fireball?30+lvl.fireball*16:0, nx=30+(lvl.fireball+1)*16;return line(lvl.fireball?`${c} dmg`:'locked',`${nx} dmg`,22)}
  if(n==='Frost Nova Charm'){const c=lvl.frost?18+lvl.frost*10:0, nx=18+(lvl.frost+1)*10;return line(lvl.frost?`${c} AoE dmg + freeze`:'locked',`${nx} AoE dmg + freeze`,28)}
  if(n==='Storm Acorn'){const c=lvl.lightning?Math.min(7,2+lvl.lightning):0, nx=Math.min(7,2+lvl.lightning+1);return line(lvl.lightning?`kills ${c} normal mobs`:'locked',`kills ${nx} normal mobs`,24)}
  if(n==='Meteor Rain')return line(lvl.meteor?'unlocked: clears normal mobs · one use per map':'locked','unlocked: clears normal mobs · one use per map',80);
  if(n==='Dancing Dagger'){const c=lvl.dagger?12+lvl.dagger*5:0, nx=12+(lvl.dagger+1)*5;return line(lvl.dagger?`${lvl.dagger} knives, ${c} dmg each`:'locked',`${Math.min(5,lvl.dagger+1)} knives, ${nx} dmg each`)}
  if(n==='Spirit Wisps'){const c=lvl.wisps?9+lvl.wisps*5:0, nx=9+(lvl.wisps+1)*5;return line(lvl.wisps?`${c} projectile dmg`:'locked',`${nx} projectile dmg`)}
  if(n==='Poison Spores'){const c=lvl.spores?8+lvl.spores*6:0, nx=8+(lvl.spores+1)*6;return line(lvl.spores?`${c} DPS`:'locked',`${nx} DPS`)}
  if(n==='Rune Mines'){const c=lvl.mines?26+lvl.mines*13:0, nx=26+(lvl.mines+1)*13;return line(lvl.mines?`${c} explosion dmg`:'locked',`${nx} explosion dmg`)}
  if(n==='Force Field'){const c=lvl.force?12+lvl.force*7:0, nx=12+(lvl.force+1)*7;return line(lvl.force?`${c} DPS`:'locked',`${nx} DPS`)}
  if(n==='Sharper Runes'){const l=player.upgrades.sharperRunes||0, cur=player.damage, next=l<5?player.damage+5:player.damage;return line(`${cur.toFixed(1)} basic dmg`,`${next.toFixed(1)} basic dmg`)}
  if(n==='Axe Reach')return line(`${(player.damage*1.08).toFixed(1)} axe dmg`,`${(player.damage*1.08).toFixed(1)} axe dmg, +20% range`);
  if(n==='Piercing Candle')return line(`${player.damage.toFixed(1)} arrow dmg, pierces ${player.pierce+1} mobs`,`${player.damage.toFixed(1)} arrow dmg, pierces ${(player.upgrades.piercingCandle||0)+2} mobs`);
  if(n==='Twin Arrows')return line(`${player.bullets} projectile(s), ${player.damage.toFixed(1)} dmg each`,`${Math.min(4,player.bullets+1)} projectiles, ${player.damage.toFixed(1)} dmg each`);
  if(n==='Blue Tea'){const l=player.upgrades.blueTea||0;return line(`+${l*5} max mana, +${l} mana regen`,`+${Math.min(5,l+1)*5} max mana, +${Math.min(5,l+1)} mana regen`)}
  return a.desc;
}
const abilityRarity=Object.fromEntries(abilities.map(a=>[a.name,a.rarity||'basic']));
function rarityLabel(r){return ({basic:'Basic',rare:'Rare',epic:'Epic',legendary:'Legendary'}[r]||'Basic')}
function makeProjectile(x,z,vx,vz,dmg,color,r,life,pierce,type='magic',explode=0){let mesh,hitR=r;if(type==='arrow'){const angle=Math.atan2(vz,vx);mesh=makeArrowMesh(angle);mesh.position.set(x,.25,z);hitR=.28}else if(type==='mageBoss'){mesh=sprite(textures.mageBossAttack,.82);mesh.position.set(x,.34,z);hitR=.38}else if(type==='fireball'){mesh=sprite(textures.abilityFireball,.78);mesh.position.set(x,.34,z);hitR=.36;if(mesh.material)mesh.material.rotation=-Math.atan2(vz,vx)}else{mesh=circle(r,color,.95);mesh.position.set(x,.17,z)}const b={x,z,vx,vz,dmg,r:hitR,life,pierce,type,explode,mesh,color,hit:new Set()};entityGroup.add(b.mesh);state.bullets.push(b)}
function shoot(){if(state.time-state.lastShot<player.fireRate)return;state.lastShot=state.time;const base=Math.atan2(mouse.world.z-player.z,mouse.world.x-player.x);if(player.class==='guard'){sfx('slash');const range=player.guardRange||1.45;const aura=plane(.01,.01,0x000000,0);aura.position.set(player.x,.12,player.z);entityGroup.add(aura);const axe=makeAxeMesh(base,1.08);axe.position.set(player.x+Math.cos(base)*range*.76,.38,player.z+Math.sin(base)*range*.76);entityGroup.add(axe);const ghost=makeAxeMesh(base+Math.PI,.82);ghost.material.opacity=.36;ghost.position.set(player.x-Math.cos(base)*range*.58,.34,player.z-Math.sin(base)*range*.58);entityGroup.add(ghost);state.spells.push({mesh:aura,hideMesh:true,extra:[axe,ghost],life:.62,maxLife:.62,scale:1,kind:'slash',angle:base,r:range,dmg:player.damage*1.08,hit:new Set()});return}if(player.class==='archer'){sfx('shootArrow');const shots=Math.min(4,Math.max(1,1+(player.upgrades.twinArrows||0)));for(let i=0;i<shots;i++){const a=base+(i-(shots-1)/2)*player.spread*.85,crit=Math.random()<player.crit;makeProjectile(player.x,player.z,Math.cos(a)*(player.bulletSpeed*1.25),Math.sin(a)*(player.bulletSpeed*1.25),player.damage*(crit?2.1:1),crit?0xfff2a8:0xd9b77a,crit?.16:.12,.5,player.pierce,'arrow')}return}sfx('shootMage');const shots=1;for(let i=0;i<shots;i++){const a=base+(i-(shots-1)/2)*player.spread,crit=Math.random()<player.crit;makeProjectile(player.x,player.z,Math.cos(a)*player.bulletSpeed,Math.sin(a)*player.bulletSpeed,player.damage*(crit?2.2:1),crit?0xd9f99d:0x22c55e,crit?.19:.14,1.25,player.pierce,'mageBoss',.72)}}
function spawnEnemy(){if(state.portal)return;const av=getAvailableEnemyTypes(),t=chooseEnemyType(av),a=Math.random()*Math.PI*2,d=15+Math.random()*10;
  // Normal mobs scale mostly through HP as the run advances. Later maps and waves feel tougher without making contact damage spike too hard.
  const hpProgress=1+state.wave*.22+state.time*.0065+state.mapIndex*.24;
  const dmgProgress=1+state.wave*.040+state.time*.0010+state.mapIndex*.055;
  const spdProgress=(1+state.wave*.018+state.time*.00045+state.mapIndex*.018)*1.08;
  const e={...t,x:player.x+Math.cos(a)*d,z:player.z+Math.sin(a)*d,freeze:0,boss:false};
  e.maxHp=e.hp=t.hp*hpProgress;e.dmg=enemyContactDamage(t,dmgProgress);e.spd=t.spd*spdProgress;
  e.mesh=sprite(textures[t.tex],t.size);e.mesh.userData.pixelPipeline=enemyTextureSources[t.tex]||'Three.js pixel texture';e.mesh.material.color.setHex(0xffffff);entityGroup.add(e.mesh);state.enemies.push(e)}
function makeBossHpBar(e){const barW=Math.max(2.9,e.size*1.55),barH=.2,bg=plane(barW+.18,barH+.14,0x160914,.96),fill=plane(barW,barH,0xd62839,.99),edge=plane(barW+.28,.05,0xffcf7b,.9),name=e.finalBoss?null:textSprite(e.name||'Boss','#ffe7aa');const z=e.z-e.size*.95;bg.position.set(e.x,1.18,z);fill.position.set(e.x,1.21,z);edge.position.set(e.x,1.24,z-barH*.55);if(name)name.position.set(e.x,2.18,e.z-e.size*1.06);[bg,fill,edge,name].filter(Boolean).forEach((m,i)=>forceUiLayer(m,980+i));entityGroup.add(bg);entityGroup.add(fill);entityGroup.add(edge);if(name)entityGroup.add(name);e.hpBar={bg,fill,edge,name,w:barW,h:barH}}
function updateBossHpBar(e){if(!e.boss||!e.hpBar)return;const pct=Math.max(0,Math.min(1,e.hp/e.maxHp)),z=e.z-e.size*.95;e.hpBar.bg.position.set(e.x,1.18,z);e.hpBar.edge.position.set(e.x,1.24,z-e.hpBar.h*.55);e.hpBar.fill.scale.x=pct;e.hpBar.fill.position.set(e.x-e.hpBar.w*(1-pct)/2,1.21,z);if(e.hpBar.name)e.hpBar.name.position.set(e.x,2.18+(e.finalBoss?.28:0),e.z-e.size*1.06);e.hpBar.fill.material.color.setHex(pct>.55?0xd62839:(pct>.25?0xf97316:0x7f1d1d))}

function sanitizePlayerVitals(){
  if(!Number.isFinite(player.maxHp)||player.maxHp<=0)player.maxHp=({mage:100,guard:125,archer:85}[player.class]||100)+(meta.hp||0)*8;
  if(!Number.isFinite(player.hp))player.hp=player.maxHp;
  player.hp=Math.max(0,Math.min(player.maxHp,player.hp));
  if(!Number.isFinite(player.invuln)||player.invuln<0||player.invuln>3)player.invuln=0;
}
function damagePlayer(amount,invulnTime=.75,color=0x8b121a,particles=12){
  sanitizePlayerVitals();
  const dmg=Math.max(1,Number(amount)||1);
  if(player.invuln>0||!state.running)return false;
  player.hp=Math.max(0,player.hp-dmg);
  player.lastDamageTaken=dmg;
  player.invuln=invulnTime;
  burst(player.x,player.z,color,particles);
  if(player.hp<=0){
    player.hp=0;
    updateUi();
    gameOver();
  }
  return true;
}

function safeRemoveMesh(m){
  if(!m)return;
  if(m.parent)m.parent.remove(m);else entityGroup.remove(m);
}
function removeBossHpBar(e){
  if(!e)return;
  if(e.hpBar){
    for(const part of ['bg','fill','edge','name']) safeRemoveMesh(e.hpBar[part]);
    e.hpBar=null;
  }
  if(e.shadow){safeRemoveMesh(e.shadow);e.shadow=null;}
}
function removeEntityVisuals(o){
  if(!o)return;
  safeRemoveMesh(o.mesh);
  removeExtra(o.extra);
  removeExtra(o.gear);
  removeBossHpBar(o);
}

function bossSpecialForProfile(profile,finalFight){
  if(finalFight)return 'finalDashVolley';
  const n=(profile.name||'').toLowerCase();
  if(n.includes('rat'))return 'summon';
  if(n.includes('spider')||n.includes('fungus')||n.includes('plague'))return 'summon';
  if(n.includes('golem')||n.includes('giant')||n.includes('behemoth'))return 'shockwave';
  if(n.includes('wraith')||n.includes('grave')||n.includes('assassin')||n.includes('horror'))return 'cursedBolts';
  if(n.includes('dragon')||n.includes('demon')||n.includes('hound'))return 'fireVolley';
  if(n.includes('minotaur')||n.includes('warg')||n.includes('ogre')||n.includes('troll')||n.includes('lizard'))return 'charge';
  return ['charge','fireVolley','summon','shockwave','cursedBolts'][(state.bossCount-1)%5];
}
function summonBossMinion(e,count=3){
  // Prevent summon bosses from flooding the map. Minions are stronger than regular mobs, but appear in controlled waves.
  const active=state.enemies.filter(m=>m.bossMinion).length;
  const maxActive=e.name&&e.name.includes('Rat')?5:4;
  if(active>=maxActive){return}
  count=Math.min(count,maxActive-active);
  const pool=getAvailableEnemyTypes();
  for(let i=0;i<count;i++){
    const t=chooseEnemyType(pool)||enemyTypes[0],a=Math.random()*Math.PI*2,r=1.5+Math.random()*1.8;
    const hpProgress=1.35+state.wave*.105+state.mapIndex*.16;
    const m={...t,x:e.x+Math.cos(a)*r,z:e.z+Math.sin(a)*r,freeze:0,boss:false,summoned:true,bossMinion:true,spellCd:2.3+Math.random()*2.7};
    m.maxHp=m.hp=t.hp*hpProgress;m.dmg=enemyContactDamage(t,(1.12+state.wave*.032+state.mapIndex*.060));m.spd=t.spd*(1.08+state.wave*.020+state.mapIndex*.022);m.fireSpeed=3.8+state.mapIndex*.18;m.fireDmg=Math.max(8,enemyContactDamage(t,(.46+state.wave*.014+state.mapIndex*.025)));m.xp=Math.max(1,Math.round(t.xp*.55));m.money=0;
    m.mesh=sprite(textures[t.tex],t.size*.98);m.mesh.userData.pixelPipeline=enemyTextureSources[t.tex]||'Three.js pixel texture';m.mesh.material.color.setHex(0xffffff);entityGroup.add(m.mesh);state.enemies.push(m);
  }
  burst(e.x,e.z,0x8b5cf6,18);sfx('summon');notice((e.name||'Boss')+' summons empowered minions!');
}
function bossMinionSpellAttack(e,dt){
  if(!e.bossMinion)return;
  e.spellCd=Math.max(0,(e.spellCd||0)-dt);
  if(e.spellCd>0)return;
  e.spellCd=3.0+Math.random()*2.0;
  const dx=player.x-e.x,dz=player.z-e.z,d=Math.hypot(dx,dz)||1;
  if(d<6.4&&Math.random()<.35){
    const r=1.45;
    const ring=circle(r,0x8b5cf6,.20);ring.position.set(e.x,.12,e.z);entityGroup.add(ring);state.spells.push({mesh:ring,life:.32,scale:.35});
    if(d<r+player.r&&player.invuln<=0){damagePlayer(bossAbilityDamage(e,'minionNova'),.55,0x8b5cf6,10);}
    sfx('cursed');
  }else{
    makeEnemyFireball(e.x+dx/d*.65,e.z+dz/d*.65,dx/d*(e.fireSpeed||3.9),dz/d*(e.fireSpeed||3.9),bossAbilityDamage(e,'minionBolt'));
    sfx('cursed');
  }
}
function bossAbilityDamage(e,kind){
  const ord=e.ordinal||bossOrdinalForCurrentMap(!!e.finalBoss)||1;
  const hpCap=Math.max(50,player.maxHp||100);
  const final=!!e.finalBoss;
  const base={fireball:final?34:13+ord*1.05,cursed:final?28:11+ord*.85,shockwave:final?42:17+ord*1.15,poison:final?9:5+ord*.28,meteor:final?45:19+ord*1.15,charge:final?52:23+ord*1.35,minionNova:10+ord*.45,minionBolt:12+ord*.55}[kind]||18;
  const cap={fireball:.45,cursed:.38,shockwave:.55,poison:.13,meteor:.60,charge:.68,minionNova:.28,minionBolt:.34}[kind]||.50;
  return Math.max(4,Math.min(base,hpCap*cap));
}
function bossShockwave(e){
  const r=e.finalBoss?6.2:4.5, dmg=bossAbilityDamage(e,'shockwave');
  const ring=circle(r,0xffcf7b,.22);ring.position.set(e.x,.13,e.z);entityGroup.add(ring);state.spells.push({mesh:ring,life:.45,scale:.22});
  if(Math.hypot(player.x-e.x,player.z-e.z)<r+player.r&&player.invuln<=0){damagePlayer(dmg,.9,0xffcf7b,20);}
  sfx('shockwave');notice((e.name||'Boss')+' releases a shockwave!');
}
function bossCursedBolts(e,count=6){
  for(let i=0;i<count;i++){const a=(Math.PI*2/count)*i+(Math.random()-.5)*.22;makeEnemyFireball(e.x+Math.cos(a)*.9,e.z+Math.sin(a)*.9,Math.cos(a)*(e.fireSpeed||3.6),Math.sin(a)*(e.fireSpeed||3.6),bossAbilityDamage(e,'cursed'));}
  sfx('cursed');notice((e.name||'Boss')+' casts cursed bolts!');
}
function bossFireVolley(e,count=3){
  const dx=player.x-e.x,dz=player.z-e.z,base=Math.atan2(dz,dx),speed=e.fireSpeed||4.2;
  for(let i=0;i<count;i++){const off=(i-(count-1)/2)*.20,a=base+off;makeEnemyFireball(e.x+Math.cos(a)*1.15,e.z+Math.sin(a)*1.15,Math.cos(a)*speed,Math.sin(a)*speed,bossAbilityDamage(e,'fireball'));}
  sfx('fireball');notice((e.name||'Boss')+' launches fireballs!');
}
function bossPoisonPool(e){
  const dx=player.x-e.x,dz=player.z-e.z,d=Math.hypot(dx,dz)||1,r=e.finalBoss?2.35:1.85;
  const x=player.x+dx/d*.35,z=player.z+dz/d*.35;
  const pool=circle(r,0x22c55e,.18);pool.position.set(x,.11,z);entityGroup.add(pool);
  state.spells.push({mesh:pool,life:e.finalBoss?4.2:3.2,scale:.35,kind:'bossPoison',x,z,r,dps:bossAbilityDamage(e,'poison')/.55,tick:0});
  sfx('cursed');notice((e.name||'Boss')+' poisons the ground!');
}
function bossMeteorBarrage(e,count=4){
  for(let i=0;i<count;i++){const x=player.x+(Math.random()-.5)*5.6,z=player.z+(Math.random()-.5)*5.6,r=e.finalBoss?1.45:1.15;const mark=circle(r,0xff733f,.20);mark.position.set(x,.12,z);entityGroup.add(mark);state.spells.push({mesh:mark,life:.75,scale:.25,kind:'bossMeteor',x,z,r,dmg:bossAbilityDamage(e,'meteor')});}
  sfx('fireball');notice((e.name||'Boss')+' calls meteors!');
}
function bossCharge(e){
  const dx=player.x-e.x,dz=player.z-e.z,d=Math.hypot(dx,dz)||1;e.dashVx=dx/d*(e.finalBoss?13.5:10.2);e.dashVz=dz/d*(e.finalBoss?13.5:10.2);e.dashTime=e.finalBoss?.42:.34;e.dashDamage=bossAbilityDamage(e,'charge');burst(e.x,e.z,e.finalBoss?0xff5a2f:0xf97316,18);notice((e.name||'Boss')+' dashes toward you!');
}
function bossSpecialAttack(e,dt){
  if(!e.boss)return;
  e.specialCd=Math.max(0,(e.specialCd||0)-dt);
  if(e.specialCd>0)return;
  const list=Array.isArray(e.specials)&&e.specials.length?e.specials:[(e.special||'charge')];
  const special=list[Math.floor(Math.random()*list.length)]||'charge';
  // Mini bosses use one assigned skill. Main bosses use all four mini-boss skills from their map.
  e.specialCd=bossAbilityCooldown(e);
  if(special==='summon')summonBossMinion(e,e.name&&e.name.includes('Rat')?3:2);
  else if(special==='shockwave')bossShockwave(e);
  else if(special==='cursedBolts')bossCursedBolts(e,e.finalBoss?9:6);
  else if(special==='fireVolley')bossFireVolley(e,e.finalBoss?5:3);
  else if(special==='poisonPool')bossPoisonPool(e);
  else if(special==='meteorBarrage')bossMeteorBarrage(e,e.finalBoss?6:4);
  else if(special==='finalDashVolley'){ const roll=Math.random(); if(roll<.34)bossCharge(e); else if(roll<.67)bossFireVolley(e,5); else bossMeteorBarrage(e,6); }
  else bossCharge(e);
}

function bossSlotOnCurrentMap(finalFight=false){
  if(finalFight)return 5;
  const wave=Math.max(1,Math.min(WAVES_PER_MAP,Number(state.wave)||1));
  if(wave===10)return 5;
  if(wave===8)return 4;
  if(wave===6)return 3;
  if(wave===4)return 2;
  return 1;
}
function bossOrdinalForCurrentMap(finalFight=false){
  if(finalFight)return 25;
  const slot=bossSlotOnCurrentMap(false);
  return Math.max(1,Math.min(25,(Math.max(0,state.mapIndex||0)*5)+slot));
}
function bossSkillsForSlot(slot,finalFight=false){
  const base=['charge','fireVolley','summon','shockwave','poisonPool','meteorBarrage'];
  if(finalFight)return ['charge','fireVolley','shockwave','cursedBolts','poisonPool','meteorBarrage'];
  if(slot>=5)return base;
  return [base[(slot-1)%base.length]];
}
function spawnBoss(finalFight=false){if(state.portal)return;sfx('boss');state.bossCount++;
  const ordinal=bossOrdinalForCurrentMap(finalFight);
  const slot=bossSlotOnCurrentMap(finalFight);
  const profile=finalFight?finalBossProfile:(bossProfiles[Math.min(bossProfiles.length-1,ordinal-1)]||bossProfiles[0]||finalBossProfile);
  const exactHp=(Array.isArray(bossHpByOrdinal)?bossHpByOrdinal[ordinal-1]:0)||profile.baseHp||1000;
  const bossDmgPower=finalFight?1.0:(1+ordinal*.035);
  const dmgProgress=1+state.mapIndex*.025;
  const speedProgress=Math.pow(1.035,ordinal-1);
  const a=Math.random()*Math.PI*2,d=finalFight?10:13;
  const skills=bossSkillsForSlot(slot,finalFight);
  const e={tex:profile.tex,name:profile.name,x:finalFight?4:player.x+Math.cos(a)*d,z:finalFight?0:player.z+Math.sin(a)*d,
    hp:exactHp,maxHp:exactHp,
    spd:profile.spd*speedProgress*1.42,
    dmg:Math.min(finalFight?58:48,profile.baseDmg*.55*bossDmgPower*dmgProgress),
    xp:Math.round(finalFight?520:95+ordinal*8),money:Math.round(finalFight?380:45+ordinal*5),
    size:profile.size,color:profile.color,freeze:0,boss:true,finalBoss:finalFight,fireCd:finalFight?.8:0,fireRate:profile.fireCd||3.1,
    fireSpeed:(profile.fireSpeed||4.6)*(finalFight?1.04:1),fireDmg:0,ordinal:ordinal,
    special:skills[0]||'charge',specials:skills,specialCd:Math.min(3.0,bossAbilityCooldown({ordinal})),attackDelayUntil:finalFight?state.time+3:0};
  e.mesh=sprite(textures[profile.tex]||(finalFight?textures.finalDemon:bossTextureForStage(ordinal))||textures.bossImported1||textures.mobSkeleton,e.size);e.mesh.material.color.setHex(0xffffff);entityGroup.add(e.mesh);addBossVisualLift(e);makeBossHpBar(e);state.enemies.push(e);notice((finalFight||slot>=5)?(finalFight?'Last boss appeared!':'Main boss appeared!'):'Mini boss appeared!');toast((finalFight||slot>=5)?(finalFight?'Last boss appeared!':'Main boss appeared!'):'Mini boss appeared!')}
function portalSpot(){let target=currentMap().decor==='camp'?{x:36,z:5}:(currentMap().decor==='island'?{x:28,z:16}:(currentMap().decor==='catacombs'?{x:32,z:19}:(currentMap().decor==='castle'?{x:31,z:17}:(currentMap().decor==='colosseum'?{x:4,z:19}:(currentMap().decor==='forest'?{x:30,z:18}:{x:39,z:12})))));if(canStandAt(target.x,target.z,.55))return target;let best=null,bd=1e9;for(const cell of floorSet){const [xs,zs]=cell.split(','),x=Number(xs),z=Number(zs),d=Math.hypot(x-target.x,z-target.z);if(d<bd&&!collidesObstacle(x,z,.7)){best={x,z};bd=d}}return best||{x:0,z:0}}
function clearMapMerchant(){
  const m=state.merchant;
  if(!m)return;
  [m.mesh,m.label,m.glow].filter(Boolean).forEach(o=>entityGroup.remove(o));
  state.merchant=null;
}
function merchantSpot(){
  const target={x:0,z:0};
  if(canStandAt(target.x,target.z,.75))return target;
  let best=null,bd=1e9;
  for(const cell of floorSet){
    const [xs,zs]=cell.split(','),x=Number(xs),z=Number(zs);
    if(!canStandAt(x,z,.75)||collidesObstacle(x,z,.85))continue;
    const d=Math.hypot(x-target.x,z-target.z);
    if(d<bd){best={x,z};bd=d}
  }
  return best||portalSpot();
}
function spawnMapMerchant(){
  if(!state.portal||state.merchant)return;
  const spot=merchantSpot();
  const x=spot.x,z=spot.z;
  const mesh=sprite(textures.merchantGoblinMap||textures.merchantGoblin,3.2);
  mesh.scale.set(4.8,3.2,1);
  mesh.position.set(x,1.28,z);
  const glow=circle(1.45,0xffcf7b,.20);
  glow.position.set(x,.08,z);
  entityGroup.add(glow);entityGroup.add(mesh);
  state.merchant={x,z,mesh,label:null,glow,timeLeft:10,opened:false};
  state.mapMerchantSpins=0;
  notice('Merchant appeared on the map! Walk into him within 10 seconds to spin once.');
  toast('Merchant appeared on the map!');
}
function updateMapMerchant(dt){
  const m=state.merchant;if(!m)return;
  m.timeLeft-=dt;
  if(m.glow)m.glow.scale.setScalar(1+Math.sin(state.time*6)*.06);
  if(m.timeLeft<=0){toast('Merchant left.');clearMapMerchant();return;}
  if(!m.opened&&Math.hypot(player.x-m.x,player.z-m.z)<1.35){m.opened=true;openWheelOfFortune({mode:'map'});}
}
function maybeSpawnMapMerchantEasterEgg(){
  if(!state.portalSpawned||!state.portal||state.merchant||wheelSpinCountForMode('map')>=1)return;
  if((state.wave||1)<WAVES_PER_MAP)return;
  if((state.waveSpawnRemaining||0)>0)return;
  if(state.enemies&&state.enemies.length>0)return;
  spawnMapMerchant();
}
function spawnPortal(){if(state.portal||state.portalSpawned)return;state.portalSpawned=true;const spot=portalSpot(),x=spot.x,z=spot.z;const ring=circle(.95,0xd8b4fe,.5);ring.position.set(x,.14,z);const core=circle(.46,0x9ee7ff,.55);core.position.set(x,.16,z);entityGroup.add(ring);entityGroup.add(core);state.portal={x,z,mesh:ring,extra:core,phase:0};notice('Portal opened! Enter it to travel to the next map.');toast('Portal opened!')}
function travelNextMap(){if(!state.portal)return;if(state.mapIndex>=mapDefs.length-1){notice('All available maps conquered!');toast('Final map reached.');return}state.mapIndex++;state.portal=null;state.portalSpawned=false;state.time=0;state.wave=1;state.waveTime=0;state.lastWave=1;state.spawnTimer=0;state.waveSpawnRemaining=0;state.waveAdvanceLock=0;state.lastShot=-9;player.cooldowns.meteor=0;state.bossSpawnedWave=0;state.bossesSpawnedThisMap={};state.finalBossSpawned=false;state.bossesDefeatedThisMap=0;clearControls();clearMapMerchant();state.mapMerchantSpins=0;state.finalCrownClaimed=false;state.enemies.forEach(removeEntityVisuals);state.bullets.forEach(removeEntityVisuals);(state.enemyShots||[]).forEach(removeEntityVisuals);state.drops.forEach(removeEntityVisuals);state.particles.forEach(removeEntityVisuals);state.spells.forEach(removeEntityVisuals);state.enemies=[];state.bullets=[];state.enemyShots=[];state.drops=[];state.particles=[];state.spells=[];player.x=0;player.z=0;makeDungeon();safePlayerSpawn();state.waveSpawnRemaining=waveMobTarget();notice('Entered '+currentMap().name+' — clear each wave to progress. New mob types unlock in order as waves progress.');toast(currentMap().name)}

function clearAdminMapRuntime(){
  clearControls();
  [...state.enemies,...state.bullets,...(state.enemyShots||[]),...state.drops,...state.particles,...state.spells,...state.orbiters].forEach(removeEntityVisuals);
  state.enemies=[];state.bullets=[];state.enemyShots=[];state.drops=[];state.particles=[];state.spells=[];state.orbiters=[];
  clearMapMerchant();state.portal=null;state.portalSpawned=false;state.mapMerchantSpins=0;state.bossSpawnedWave=0;state.bossesSpawnedThisMap={};state.finalBossSpawned=false;state.bossesDefeatedThisMap=0;state.spawnTimer=0;state.heartSpawnTimer=15;
}
function safePlayerSpawn(){
  let pref;
  if(currentMap().decor==='camp') pref={x:-4,z:4};
  else if(currentMap().decor==='forest') pref={x:0,z:0};
  else if(currentMap().decor==='island') pref={x:-6,z:6};
  else if(currentMap().decor==='catacombs') pref={x:0,z:10};
  else if(currentMap().decor==='colosseum') pref={x:4,z:19}; // spawn hero in the center of the lower portal/sigil
  else pref={x:0,z:0};
  let chosen=null,bd=1e9;
  if(currentMap().decor==='colosseum' && canStandAt(pref.x,pref.z,player.r||.35)){
    chosen={x:pref.x,z:pref.z};
  }else{
    for(const cell of floorSet){
      const [xs,zs]=cell.split(','),x=Number(xs),z=Number(zs);
      if(!canStandAt(x,z,player.r||.35))continue;
      const d=Math.hypot(x-pref.x,z-pref.z);
      if(d<bd){chosen={x,z};bd=d;}
    }
  }
  if(!chosen)chosen={x:0,z:0};
  player.x=chosen.x;player.z=chosen.z;player.mesh.position.set(player.x,.7,player.z);
  camera.position.x=player.x;camera.position.z=player.z;camera.lookAt(camera.position.x,0,camera.position.z);
}
function adminJumpMap(idx){
  idx=Math.max(0,Math.min(mapDefs.length-1,idx|0));
  clearAdminMapRuntime();
  state.mapIndex=idx;state.time=0;state.wave=1;state.waveTime=0;state.lastWave=1;state.lastShot=-9;
  makeDungeon();safePlayerSpawn();updateUi();updateAdminControls();
  toast('Admin: mapa '+(idx+1));notice('Admin jump: '+currentMap().name);
}
function openPauseMenu(){
  if(!state.running)return;
  state.paused=true;
  clearControls();
  if(ui.pauseMenuModal)ui.pauseMenuModal.classList.remove('hidden');
  updateAdminControls();
}
function closePauseMenu(){
  if(!state.running)return;
  state.paused=false;
  clearControls();
  if(ui.pauseMenuModal)ui.pauseMenuModal.classList.add('hidden');
  updateAdminControls();
}
function togglePauseMenu(){
  if(state.paused)closePauseMenu();else openPauseMenu();
}
function togglePause(){togglePauseMenu()}
function pauseRestartGame(){
  const cls=player.class||'mage';
  if(ui.pauseMenuModal)ui.pauseMenuModal.classList.add('hidden');
  sessionStorage.removeItem('bloodwood_refresh_save');
  reset(cls);
}

function clonePlain(obj){return JSON.parse(JSON.stringify(obj,(k,v)=>{if(k==='mesh'||k==='extra'||k==='hit'||k==='material'||k==='geometry'||k==='parent')return undefined;return v}))}
function normalizeHeroClass(cls){return ['mage','guard','archer'].includes(cls)?cls:'mage'}
function applyPlayerVisualOnly(){
  player.class=normalizeHeroClass(player.class);
  player.mesh.scale.setScalar(1.45);
  if(player.class==='mage'){
    player.mesh.scale.setScalar(1.85);
    player.mesh.material.map=textures.hero;
  }else if(player.class==='guard'){
    player.mesh.material.map=textures.guardHero;
  }else if(player.class==='archer'){
    player.mesh.material.map=textures.archerHero;
  }
  player.mesh.material.needsUpdate=true;
}
function nearestStandablePosition(x,z){
  x=Number.isFinite(x)?x:0; z=Number.isFinite(z)?z:0;
  if(canStandAt(x,z,player.r||.35))return {x,z};
  let chosen=null,bd=1e9;
  for(const cell of floorSet){
    const [xs,zs]=cell.split(','),cx=Number(xs),cz=Number(zs);
    if(!canStandAt(cx,cz,player.r||.35))continue;
    const d=Math.hypot(cx-x,cz-z);
    if(d<bd){bd=d;chosen={x:cx,z:cz}}
  }
  return chosen||{x:0,z:0};
}
function normalizeRestoredPlayer(savedPlayer){
  const savedClass=normalizeHeroClass(savedPlayer&&savedPlayer.class);
  Object.assign(player,savedPlayer||{});
  player.class=savedClass;
  player.r=Number.isFinite(player.r)?player.r:.35;
  player.upgrades=Object.assign({},player.upgrades||{});
  player.spells=Object.assign({fireball:0,frost:0,lightning:0,dagger:0,wisps:0,spores:0,mines:0,force:0,meteor:0},player.spells||{});
  player.cooldowns=Object.assign({fireball:0,frost:0,lightning:0,meteor:0,wisp:0,spore:0,mine:0,force:0},player.cooldowns||{});
}
function finishRestorePlayerPosition(){
  applyPlayerVisualOnly();
  const pos=nearestStandablePosition(player.x,player.z);
  player.x=pos.x; player.z=pos.z;
  player.mesh.position.set(player.x,.7,player.z);
  camera.position.x=player.x;camera.position.z=player.z;camera.lookAt(camera.position.x,0,camera.position.z);
  clearControls();
  syncDaggers();
}
function snapshotEntities(){return {
  enemies:state.enemies.map(e=>clonePlain(e)),
  bullets:state.bullets.map(b=>clonePlain(b)),
  enemyShots:(state.enemyShots||[]).map(b=>clonePlain(b)),
  drops:state.drops.map(d=>clonePlain(d))
}}
function restoreEntities(pack){
  pack=pack||{};
  state.enemies=[];state.bullets=[];state.enemyShots=[];state.drops=[];
  (pack.enemies||[]).forEach(e=>{e.mesh=sprite(textures[e.tex]||textures.mobGreenSlime,e.size||1);e.mesh.position.set(e.x,.7,e.z);entityGroup.add(e.mesh);state.enemies.push(e)});
  (pack.bullets||[]).forEach(b=>{makeProjectile(b.x,b.z,b.vx,b.vz,b.dmg,b.color||0xffffff,b.r||.12,b.life||1,b.pierce||0,b.type||'magic',b.explode||0);const nb=state.bullets[state.bullets.length-1];Object.assign(nb,b);nb.hit=new Set();if(nb.mesh)nb.mesh.position.set(nb.x,nb.type==='arrow'?.25:((nb.type==='mageBoss'||nb.type==='fireball')?.34:.17),nb.z)});
  (pack.enemyShots||[]).forEach(b=>{makeEnemyFireball(b.x,b.z,b.vx,b.vz,b.dmg);Object.assign(state.enemyShots[state.enemyShots.length-1],b)});
  (pack.drops||[]).forEach(d=>drop(d.kind,d.x,d.z,d.amount));
}

function saveRefreshProgress(){
  try{
    const keepState=['time','wave','waveTime','lastWave','spawnTimer','kills','bossSpawnedWave','bossCount','mapIndex','portalSpawned','finalBossSpawned','bossesDefeatedThisMap','totalXpGained','heartSpawnTimer','lastShot','currentProfile','waveWaitingForBoss','waveSpawnRemaining','waveAdvanceLock'];
    const keepPlayer=['class','x','z','hp','maxHp','mana','maxMana','speed','level','xp','nextXp','money','damage','fireRate','attackSpeedLevel','bullets','pierce','bulletSpeed','magnet','manaRegen','crit','spread','speedLevel','guardRange','guardRangeLevel','upgrades','spells','cooldowns'];
    const snap={state:{},player:{},meta:clonePlain(meta),entities:snapshotEntities()};
    keepState.forEach(k=>snap.state[k]=state[k]);
    keepPlayer.forEach(k=>snap.player[k]=JSON.parse(JSON.stringify(player[k])));
    saveMerchantMeta();
    sessionStorage.setItem('bloodwood_refresh_save',JSON.stringify(snap));
  }catch(e){console.warn('Save refresh progress failed',e)}
}
function restoreRefreshProgress(){
  let raw=null;
  try{raw=sessionStorage.getItem('bloodwood_refresh_save');sessionStorage.removeItem('bloodwood_refresh_save')}catch(e){}
  if(!raw)return false;
  try{
    const snap=JSON.parse(raw);
    document.body.classList.remove('title-flow');
    Object.assign(state,{running:true,paused:false,enemies:[],bullets:[],drops:[],particles:[],spells:[],enemyShots:[],orbiters:[],portal:null,lastShot:-9,paidRun:false,uiTimer:0},snap.state||{});
    normalizeRestoredPlayer(snap.player||{});
    if(snap.meta){Object.assign(meta,snap.meta);saveMerchantMeta();}
    makeDungeon();
    finishRestorePlayerPosition();
    restoreEntities(snap.entities);
    ui.welcomeModal.classList.add('hidden');ui.instructionModal.classList.add('hidden');ui.startModal.classList.add('hidden');ui.gameOverModal.classList.add('hidden');ui.victoryModal.classList.add('hidden');ui.levelModal.classList.add('hidden');if(ui.profileModal)ui.profileModal.classList.add('hidden');if(ui.loadModal)ui.loadModal.classList.add('hidden');
    if(state.portalSpawned){state.portalSpawned=false;spawnPortal();}
    if(ui.pauseMenuModal)ui.pauseMenuModal.classList.add('hidden');
    updateUi();
    notice('Wave '+state.wave+' started — refresh restored.');
    return true;
  }catch(e){console.warn('Restore refresh progress failed',e);return false}
}
function refreshKeepProgress(){
  saveRefreshProgress();
  // In PWA/browser mode reload can be swallowed by service-worker/cache; restore immediately first.
  if(restoreRefreshProgress()){notice('Refresh complete — progress restored.');return;}
  location.reload();
}
function exitToMenu(){
  clearControls();
  state.running=false;state.paused=false;
  document.body.classList.remove('stats-open');
  if(ui.pauseMenuModal)ui.pauseMenuModal.classList.add('hidden');
  ['levelModal','gameOverModal','victoryModal','storyModal','instructionModal','startModal','profileModal','loadModal'].forEach(id=>ui[id]&&ui[id].classList.add('hidden'));
  if(ui.welcomeModal)ui.welcomeModal.classList.remove('hidden');
  document.body.classList.add('title-flow');
  updateAdminControls();
}
function updateAdminControls(){
  if(ui.pauseToggleBtn){ui.pauseToggleBtn.textContent=state.paused?'RESUME':'PAUSE';ui.pauseToggleBtn.classList.toggle('paused',!!state.paused)}
  if(ui.adminMapJump){ui.adminMapJump.querySelectorAll('.admin-map-btn').forEach(btn=>btn.classList.toggle('active',Number(btn.dataset.map)===state.mapIndex))}
}


function makeEnemyFireball(x,z,vx,vz,dmg){sfx('fireball');const mesh=sprite(textures.demonFireball,.9);mesh.position.set(x,.34,z);entityGroup.add(mesh);(state.enemyShots||(state.enemyShots=[])).push({x,z,vx,vz,dmg,r:.38,life:5,mesh})}
function finalBossAttack(e,dt){if(!e.finalBoss)return;if(e.attackDelayUntil&&state.time<e.attackDelayUntil)return;e.fireCd=Math.max(0,(e.fireCd||0)-dt);if(e.fireCd<=0){const dx=player.x-e.x,dz=player.z-e.z,d=Math.hypot(dx,dz)||1;e.fireCd=e.fireRate+Math.random()*.55;const base=Math.atan2(dz,dx),count=3+(Math.random()<.45?2:0);for(let i=0;i<count;i++){const off=(i-(count-1)/2)*.18,a=base+off;makeEnemyFireball(e.x+Math.cos(a)*1.2,e.z+Math.sin(a)*1.2,Math.cos(a)*e.fireSpeed,Math.sin(a)*e.fireSpeed,bossAbilityDamage(e,'fireball'));}sfx('fireball');notice((e.name||'Final boss')+' casts a fireball volley!')}}
function castKey(k){if(k==='1')castFireball();if(k==='2')castFrostNova();if(k==='3')castLightning();if(k==='4')castMeteorRain()}
function getCooldownMax(id){const l=player.spells[id]||0;if(id==='fireball')return Math.max(.65,1.7-l*.18);if(id==='frost')return Math.max(3.2,6.3-l*.55);if(id==='lightning')return Math.max(1.3,3-l*.25);if(id==='meteor')return 9999;return baseCooldowns[id]||1}
function spend(c,k,cd){if(player.mana<c||player.cooldowns[k]>0)return false;player.mana-=c;player.cooldowns[k]=cd;return true}
function castFireball(){const l=player.spells.fireball;if(!l)return toast('Find Fireball Tome first.');if(!spend(activeManaCosts.fireball,'fireball',getCooldownMax('fireball')))return;const a=Math.atan2(mouse.world.z-player.z,mouse.world.x-player.x);sfx('fireball');makeProjectile(player.x,player.z,Math.cos(a)*(8.5+l),Math.sin(a)*(8.5+l),30+l*16,0xff733f,.25+l*.035,1.3,0,'fireball',1.35+l*.28);notice('Used Fireball')}
function castFrostNova(){const l=player.spells.frost;if(!l)return toast('Find Frost Nova Charm first.');if(!spend(activeManaCosts.frost,'frost',getCooldownMax('frost')))return;const r=3.4+l*.55,w=circle(r,0xa8e7ff,.32);w.position.set(player.x,.1,player.z);entityGroup.add(w);sfx('frost');state.spells.push({mesh:w,life:.45,scale:0});for(const e of state.enemies)if(Math.hypot(e.x-player.x,e.z-player.z)<r){e.hp-=18+l*10;e.freeze=1.6+l*.25}notice('Used Frost Nova')}
function castLightning(){const l=player.spells.lightning;if(!l)return toast('Find Storm Acorn first.');if(!spend(activeManaCosts.lightning,'lightning',getCooldownMax('lightning')))return;sfx('lightning');const count=Math.min(7,2+l),targets=state.enemies.filter(e=>!e.boss).sort(()=>Math.random()-.5).slice(0,count);for(const e of targets){lightningLine(player.x,player.z,e.x,e.z);e.hp=0;burst(e.x,e.z,0xd9f99d,14)}cleanupDead();notice('Storm Acorn killed '+targets.length+' normal mobs')}
function lightningLine(x1,z1,x2,z2){const len=Math.hypot(x2-x1,z2-z1),m=plane(len,.08,0xd9f99d,.85);m.position.set((x1+x2)/2,.2,(z1+z2)/2);m.rotation.z=-Math.atan2(z2-z1,x2-x1);entityGroup.add(m);state.spells.push({mesh:m,life:.18,scale:1})}
function castMeteorRain(){const l=player.spells.meteor;if(!l)return toast('Find Meteor Rain first.');if(player.meteorUsedMap===state.mapIndex)return toast('Meteor Rain can be used once per map.');if(player.mana<activeManaCosts.meteor)return toast('Not enough mana for Meteor Rain.');player.mana-=activeManaCosts.meteor;player.meteorUsedMap=state.mapIndex;player.cooldowns.meteor=9999;sfx('meteor');let killed=0;const targets=state.enemies.filter(e=>!e.boss);for(const e of targets){for(let i=0;i<2;i++){const m=circle(.45,0xff733f,.75);m.position.set(e.x+(Math.random()-.5)*1.2,.2,e.z+(Math.random()-.5)*1.2);entityGroup.add(m);state.spells.push({mesh:m,life:.55,scale:.25})}e.hp=0;killed++;burst(e.x,e.z,0xff733f,18)}cleanupDead();toast('Meteor Rain!');notice('Meteor Rain cleared '+killed+' normal mobs. It will refresh on the next map.')}
function daggerOrbiterMesh(){const tex=dataTexture(abilityIconData.dagger);const mat=new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,depthTest:true});const sp=new THREE.Sprite(mat);sp.scale.set(.62,.62,1);sp.center.set(.5,.5);sp.material.rotation=0;return sp}
function addOrbiter(){if(state.orbiters.length>=5)return;const o={angle:0,radius:1.22,dmg:12+player.spells.dagger*5,hit:new Map(),mesh:daggerOrbiterMesh()};entityGroup.add(o.mesh);state.orbiters.push(o)}
function syncDaggers(){const target=Math.min(5,player.spells.dagger||0);while(state.orbiters.length<target)addOrbiter();while(state.orbiters.length>target){const o=state.orbiters.pop();if(o&&o.mesh)entityGroup.remove(o.mesh)}for(const o of state.orbiters){o.radius=1.22;o.dmg=12+player.spells.dagger*5}}
function nearestEnemy(x,z,range=Infinity){let best=null,bd=range;for(const e of state.enemies){const d=Math.hypot(e.x-x,e.z-z);if(d<bd){best=e;bd=d}}return best}
function burst(x,z,color,n=8){if(state.particles.length>220)return;n=Math.min(n,24);for(let i=0;i<n;i++){const a=Math.random()*6.28,s=1+Math.random()*4,p={x,z,vx:Math.cos(a)*s,vz:Math.sin(a)*s,life:.45+Math.random()*.3,mesh:plane(.08,.08,color)};entityGroup.add(p.mesh);state.particles.push(p)}}
function heartDropCount(){return (state.drops||[]).filter(d=>d.kind==='heart').length}
function drop(kind,x,z,amount=1){if(kind==='heart'&&heartDropCount()>=3)return null;const size=kind==='crown'?1.75:(kind==='levelCrystal'?1.05:(kind==='heart'?.55:.48));const tex=kind==='crown'?(textures.crownDrop||textures.coin):textures[kind];const d={kind,x,z,amount,mesh:sprite(tex,size)};entityGroup.add(d.mesh);state.drops.push(d);return d}
function randomFloorSpot(minPlayerDistance=4){let best=null;for(let tries=0;tries<90;tries++){const cells=Array.from(floorSet);if(!cells.length)break;const cell=cells[Math.floor(Math.random()*cells.length)],parts=cell.split(','),x=Number(parts[0])+(Math.random()-.5)*.55,z=Number(parts[1])+(Math.random()-.5)*.55;if(!canStandAt(x,z,.35))continue;if(Math.hypot(x-player.x,z-player.z)<minPlayerDistance)continue;return {x,z}}for(const cell of floorSet){const parts=cell.split(','),x=Number(parts[0]),z=Number(parts[1]);if(canStandAt(x,z,.35)){best={x,z};break}}return best||{x:player.x+2,z:player.z}}
function spawnTimedHeart(){if(!state.running||state.paused)return;if(heartDropCount()>=3)return;const spot=randomFloorSpot(5);if(drop('heart',spot.x,spot.z,25))toast('Heart spawned: +25 HP');}
function killEnemy(e){state.kills++;burst(e.x,e.z,e.color,e.boss?28:12);removeEntityVisuals(e);drop('xp',e.x,e.z,Math.round(e.xp*(1+state.wave*.04)));if(Math.random()<.72||e.boss)drop('coin',e.x+.3,e.z,e.money+Math.floor(Math.random()*3));if(e.boss){drop('heart',e.x-.3,e.z,35);drop('levelCrystal',e.x+.55,e.z,1);if(e.finalBoss){state.finalBossSpawned=true;state.finalCrownClaimed=false;notice('Final boss defeated! The Crown of the Demon King has fallen.');toast('Pick up the crown to finish the expedition.');drop('crown',e.x,e.z,1)}else{state.bossesDefeatedThisMap=(state.bossesDefeatedThisMap||0)+1;notice('Boss defeated! '+state.bossesDefeatedThisMap+'/'+(currentMap().decor==='colosseum'?BOSSES_BEFORE_FINAL:BOSSES_PER_NORMAL_MAP)+' bosses defeated on this map.');if(currentMap().decor==='colosseum'&&state.bossesDefeatedThisMap>=BOSSES_BEFORE_FINAL&&!state.finalBossSpawned){notice('Four mini bosses defeated. Clear the next waves to summon the last boss.')}else if(currentMap().decor!=='colosseum'&&state.wave>=WAVES_PER_MAP&&state.bossesDefeatedThisMap>=BOSSES_PER_NORMAL_MAP&&!state.portalSpawned){spawnPortal()}}}else if(Math.random()<.025)drop('heart',e.x,e.z,18)}
function cleanupDead(){for(let i=state.enemies.length-1;i>=0;i--)if(state.enemies[i].hp<=0){killEnemy(state.enemies[i]);state.enemies.splice(i,1)}}
function explode(x,z,r,dmg,color=0xff733f){burst(x,z,color,22);const boom=circle(r,color,.34);boom.position.set(x,.09,z);entityGroup.add(boom);state.spells.push({mesh:boom,life:.28,scale:.35});for(const e of state.enemies){const d=Math.hypot(e.x-x,e.z-z);if(d<r)e.hp-=dmg*(1-d/r*.45)}}
function updatePassive(dt){if(player.spells.force){player.cooldowns.force-=dt;const radius=1.65+player.spells.force*.35,dps=12+player.spells.force*7;if(player.cooldowns.force<=0){player.cooldowns.force=.18;const aura=circle(radius,0x9ee7ff,.075);aura.position.set(player.x,.07,player.z);entityGroup.add(aura);state.spells.push({mesh:aura,life:.2,scale:.88})}for(const e of state.enemies)if(Math.hypot(e.x-player.x,e.z-player.z)<radius)e.hp-=dps*dt}if(player.spells.wisps){player.cooldowns.wisp-=dt;if(player.cooldowns.wisp<=0){player.cooldowns.wisp=Math.max(.28,.9-player.spells.wisps*.09);const t=nearestEnemy(player.x,player.z,8.5);if(t){const a=Math.atan2(t.z-player.z,t.x-player.x);makeProjectile(player.x,player.z,Math.cos(a)*10,Math.sin(a)*10,9+player.spells.wisps*5,0xb8f7ff,.11,1,0,'wisp')}}}if(player.spells.spores){player.cooldowns.spore-=dt;if(player.cooldowns.spore<=0){player.cooldowns.spore=Math.max(.55,1.6-player.spells.spores*.15);const c=circle(.72,0x6f8f55,.13);c.scale.x=1.45;c.scale.y=.72;c.position.set(player.x,.08,player.z);entityGroup.add(c);const core=circle(.34,0xb7d66d,.10);core.position.set(player.x,.09,player.z);entityGroup.add(core);state.spells.push({mesh:c,extra:core,life:2.6,scale:.65,kind:'poison',x:player.x,z:player.z,r:.78,dps:8+player.spells.spores*6})}}if(player.spells.mines){player.cooldowns.mine-=dt;if(player.cooldowns.mine<=0){player.cooldowns.mine=Math.max(1.2,3.4-player.spells.mines*.25);const m=sprite(textures.abilityMines,.86);m.position.set(player.x,.20,player.z);entityGroup.add(m);state.spells.push({mesh:m,life:7,scale:1,kind:'mine',x:player.x,z:player.z,r:2.1,dmg:26+player.spells.mines*13})}}}
function gainXp(n){state.totalXpGained=(state.totalXpGained||0)+n;player.xp+=n;while(player.xp>=player.nextXp){player.xp-=player.nextXp;player.level++;player.nextXp=Math.floor(player.nextXp*1.34+10);sfx('level');notice('Level up! Choose an ability');openLevelUp()}}
function weightedChoices(pool,count){const maxed=a=>{const u=player.upgrades||{};return (a.name==='Dancing Dagger'&&player.spells.dagger>=5)||(a.name==='Spirit Wisps'&&player.spells.wisps>=5)||(a.name==='Poison Spores'&&player.spells.spores>=5)||(a.name==='Rune Mines'&&player.spells.mines>=5)||(a.name==='Force Field'&&player.spells.force>=5)||(a.name==='Fireball Tome'&&player.spells.fireball>=5)||(a.name==='Frost Nova Charm'&&player.spells.frost>=5)||(a.name==='Storm Acorn'&&player.spells.lightning>=5)||(a.name==='Fleet Boots'&&player.speedLevel>=5)||(a.name==='Faster Draw'&&player.class==='mage')||(a.name==='Faster Draw'&&player.attackSpeedLevel>=5)||(a.name==='Sharper Runes'&&(u.sharperRunes||0)>=5)||(a.name==='Blue Tea'&&(u.blueTea||0)>=5)||(a.name==='Moon Magnet'&&(u.moonMagnet||0)>=5)||(a.name==='Warm Soup'&&(u.warmSoup||0)>=5)||(a.name==='Meteor Rain'&&player.spells.meteor>=1)||(a.name==='Twin Arrows'&&player.class!=='archer')||(a.name==='Twin Arrows'&&(u.twinArrows||0)>=3)||(a.name==='Piercing Candle'&&player.class!=='archer')||(a.name==='Piercing Candle'&&(u.piercingCandle||0)>=5)||(a.name==='Axe Reach'&&player.class!=='guard')||(a.name==='Axe Reach'&&(player.guardRangeLevel||0)>=5)};const result=[],copy=pool.filter(a=>!maxed(a));while(result.length<count&&copy.length){const total=copy.reduce((s,a)=>s+(a.weight||1),0);let r=Math.random()*total,idx=0;for(;idx<copy.length;idx++){r-=copy[idx].weight||1;if(r<=0)break}result.push(copy.splice(Math.min(idx,copy.length-1),1)[0])}return result}
function openLevelUp(){clearControls();state.paused=true;ui.levelModal.classList.remove('hidden');ui.cards.innerHTML='';weightedChoices(abilities,3).forEach(a=>{const el=document.createElement('button');el.className='card rarity-'+(a.rarity||'basic');el.innerHTML=`<b><span class="pick-icon">${iconHtml(a.icon)}</span>${a.name}<em class="rarity-tag">${rarityLabel(a.rarity||'basic')}</em></b><span>${abilityPreview(a)}</span>`;el.onclick=()=>{const before=JSON.stringify(player.spells);a.apply();ui.levelModal.classList.add('hidden');clearControls();state.paused=false;toast(a.name);notice((before!==JSON.stringify(player.spells)?'Unlocked / upgraded: ':'Upgrade chosen: ')+a.name)};ui.cards.appendChild(el)})}
function toast(m){return}
function notice(m){const allowed=/^(Wave \d+ started|Mini boss appeared!|Main boss appeared!|Boss appeared!|Last boss appeared!|Portal opened!)/;if(!allowed.test(String(m)))return;const el=document.createElement('div');el.className='event-msg';el.textContent=m;ui.eventFeed.appendChild(el);setTimeout(()=>el.remove(),3100);while(ui.eventFeed.children.length>4)ui.eventFeed.firstChild.remove()}

const PROFILE_SAVE_KEY='bloodwood_profile_saves_v2';
function readProfileSaves(){try{return JSON.parse(localStorage.getItem(PROFILE_SAVE_KEY)||'{}')||{}}catch(e){return {}}}
function writeProfileSaves(saves){try{localStorage.setItem(PROFILE_SAVE_KEY,JSON.stringify(saves));return true}catch(e){console.warn('Save failed',e);return false}}
function makeSaveSnapshot(){
  // Checkpoint save: keep hero progression and the current map/wave,
  // but do NOT save live enemies/projectiles/drops. Loading starts the wave cleanly.
  const keepState=['wave','mapIndex','kills','bossCount','bossesDefeatedThisMap','totalXpGained','currentProfile'];
  const keepPlayer=['class','maxHp','maxMana','speed','level','xp','nextXp','money','damage','fireRate','attackSpeedLevel','bullets','pierce','bulletSpeed','magnet','manaRegen','crit','spread','speedLevel','guardRange','guardRangeLevel','upgrades','spells','meteorUsedMap','wheelSpins'];
  const snap={version:3,checkpoint:true,savedAt:Date.now(),state:{},player:{},meta:clonePlain(meta)};
  keepState.forEach(k=>snap.state[k]=state[k]);
  keepPlayer.forEach(k=>snap.player[k]=JSON.parse(JSON.stringify(player[k])));
  snap.state.wave=Math.max(1,Math.min(WAVES_PER_MAP,Number(snap.state.wave)||1));
  snap.state.mapIndex=Math.max(0,Math.min(mapDefs.length-1,Number(snap.state.mapIndex)||0));
  return snap;
}
function clearRuntimeVisuals(){
  clearControls();
  [...state.enemies,...state.bullets,...(state.enemyShots||[]),...state.drops,...state.particles,...state.spells,...state.orbiters].forEach(removeEntityVisuals);
  state.enemies=[];state.bullets=[];state.enemyShots=[];state.drops=[];state.particles=[];state.spells=[];state.orbiters=[];
  if(state.portal){removeEntityVisuals(state.portal);state.portal=null;}
}
function saveGameToProfile(){
  if(!state.currentProfile){ if(ui.pauseSaveStatus)ui.pauseSaveStatus.textContent='Create a profile first.'; return false; }
  const saves=readProfileSaves();
  saves[state.currentProfile]=makeSaveSnapshot();
  saveMerchantMeta();
  const ok=writeProfileSaves(saves);
  if(ui.pauseSaveStatus)ui.pauseSaveStatus.textContent=ok?'Saved: '+state.currentProfile:'Save failed.';
  return ok;
}
function restoreGameSnapshot(snap,opts={}){
  if(!snap||!snap.state||!snap.player)return false;
  document.body.classList.remove('title-flow');
  clearRuntimeVisuals();

  const savedState=snap.state||{};
  const savedPlayer=snap.player||{};
  const restartMap=!!opts.restartMap;

  Object.assign(state,{
    running:true,paused:false,time:0,
    wave:restartMap?1:Math.max(1,Math.min(WAVES_PER_MAP,Number(savedState.wave)||1)),
    waveTime:0,lastWave:restartMap?1:Math.max(1,Math.min(WAVES_PER_MAP,Number(savedState.wave)||1)),
    spawnTimer:0,enemies:[],bullets:[],drops:[],particles:[],spells:[],enemyShots:[],orbiters:[],
    portal:null,lastShot:-9,paidRun:!!opts.afterDeath,uiTimer:0,
    bossSpawnedWave:0,portalSpawned:false,finalBossSpawned:false,
    waveWaitingForBoss:false,waveSpawnRemaining:0,waveAdvanceLock:.35,
    heartSpawnTimer:15
  },savedState);

  state.mapIndex=Math.max(0,Math.min(mapDefs.length-1,Number(savedState.mapIndex)||0));
  state.wave=restartMap?1:Math.max(1,Math.min(WAVES_PER_MAP,Number(savedState.wave)||1));
  state.lastWave=state.wave;
  state.time=0; state.waveTime=0; state.spawnTimer=0; state.lastShot=-9;
  state.portalSpawned=false; state.finalBossSpawned=false; state.waveWaitingForBoss=false;
  state.bossSpawnedWave=0; state.bossesSpawnedThisMap={}; state.waveAdvanceLock=.35; state.heartSpawnTimer=15;
  if(restartMap){state.bossesDefeatedThisMap=0;state.waveSpawnRemaining=0;}

  normalizeRestoredPlayer(savedPlayer);
  player.hp=player.maxHp;
  player.mana=player.maxMana;
  player.invuln=1.2;
  player.cooldowns=Object.assign({fireball:0,frost:0,lightning:0,meteor:0,wisp:0,spore:0,mine:0,force:0},player.cooldowns||{});
  for(const k in player.cooldowns)player.cooldowns[k]=0;
  if(restartMap){player.meteorUsedMap=-1;player.money=0;}

  if(snap.meta){Object.assign(meta,snap.meta);saveMerchantMeta();}
  makeDungeon();
  safePlayerSpawn();
  finishRestorePlayerPosition();
  syncDaggers();
  state.waveSpawnRemaining=waveMobTarget();

  ['welcomeModal','storyModal','instructionModal','startModal','gameOverModal','victoryModal','levelModal','profileModal','loadModal','pauseMenuModal'].forEach(id=>ui[id]&&ui[id].classList.add('hidden'));
  state.paused=false;
  updateUi();
  notice((restartMap?'Checkpoint restored: ':'Save loaded: ')+currentMap().name+' — wave '+state.wave+' starts fresh.');
  return true;
}
function renderSaveList(){
  const saves=readProfileSaves();
  const names=Object.keys(saves).sort((a,b)=>(saves[b].savedAt||0)-(saves[a].savedAt||0));
  if(!ui.saveList)return;
  if(!names.length){ui.saveList.innerHTML='<p class="start-instruction">No saved games yet.</p>';return;}
  ui.saveList.innerHTML=names.map(name=>{const sv=saves[name],p=sv.player||{},st=sv.state||{},date=sv.savedAt?new Date(sv.savedAt).toLocaleString():'';return `<div class="save-slot"><b>${name}</b><small>${date}<br>Class: ${(p.class||'mage').toUpperCase()} · Map ${Number(st.mapIndex||0)+1} · Wave ${st.wave||1} · LVL ${p.level||1} · Coins ${p.money||0}</small><div class="row"><button data-load-profile="${name}">Load</button><button data-delete-profile="${name}">Delete</button></div></div>`}).join('');
  ui.saveList.querySelectorAll('[data-load-profile]').forEach(btn=>btn.addEventListener('click',()=>{const all=readProfileSaves();restoreGameSnapshot(all[btn.dataset.loadProfile]);}));
  ui.saveList.querySelectorAll('[data-delete-profile]').forEach(btn=>btn.addEventListener('click',()=>{const all=readProfileSaves();delete all[btn.dataset.deleteProfile];writeProfileSaves(all);renderSaveList();}));
}
function openNewGameProfile(){ui.welcomeModal.classList.add('hidden');ui.profileModal.classList.remove('hidden');if(ui.profileNameInput){ui.profileNameInput.value='';setTimeout(()=>ui.profileNameInput.focus(),50)}}
function createProfileAndChooseHero(){const name=(ui.profileNameInput&&ui.profileNameInput.value.trim())||('Player '+Math.floor(Math.random()*9999));state.currentProfile=name;resetMerchantMeta();saveMerchantMeta();ui.profileModal.classList.add('hidden');if(ui.storyModal)ui.storyModal.classList.remove('hidden');else ui.instructionModal.classList.remove('hidden');}
function openLoadGame(){ui.welcomeModal.classList.add('hidden');ui.loadModal.classList.remove('hidden');renderSaveList();}

function applyClassStats(cls){
  player.class=cls||player.class||'mage';
  if(player.class==='mage'){
    player.mesh.material.map=textures.hero;
    player.mesh.scale.set(1.34,1.84,1);
    player.fireRate=.48;
    player.bullets=Math.max(1,player.bullets)
  }else if(player.class==='guard'){
    player.mesh.material.map=textures.guardHero;
    player.mesh.scale.set(1.40,1.78,1);
    player.fireRate=.58;
    player.bullets=1
  }else if(player.class==='archer'){
    player.mesh.material.map=textures.archerHero;
    player.mesh.scale.set(1.46,1.76,1);
    player.fireRate=.34;
    player.bullets=Math.max(1,player.bullets);
    player.bulletSpeed*=1.2
  }
  player.mesh.material.needsUpdate=true
}
function reset(cls){document.body.classList.remove('title-flow');clearMapMerchant();if(cls)player.class=cls;[...state.enemies,...state.bullets,...(state.enemyShots||[]),...state.drops,...state.particles,...state.spells,...state.orbiters].forEach(removeEntityVisuals);Object.assign(state,{running:true,paused:false,time:0,wave:1,waveTime:0,lastWave:1,spawnTimer:0,enemies:[],bullets:[],drops:[],particles:[],spells:[],enemyShots:[],orbiters:[],portal:null,lastShot:-9,kills:0,paidRun:false,bossSpawnedWave:0,bossesSpawnedThisMap:{},bossCount:0,mapIndex:0,portalSpawned:false,finalBossSpawned:false,bossesDefeatedThisMap:0,totalXpGained:0,heartSpawnTimer:15,uiTimer:0,waveSpawnRemaining:0,waveAdvanceLock:0,merchant:null,mapMerchantSpins:0,finalCrownClaimed:false});const base=HERO_BASE_STATS[player.class]||HERO_BASE_STATS.mage;const startHp=base.hp,startMana=base.mana;Object.assign(player,{x:-4,z:4,hp:startHp,maxHp:startHp,mana:startMana,maxMana:startMana,speed:base.speed,level:1,xp:0,nextXp:24,money:0,damage:base.dmg+(meta.dmg||0),fireRate:.48,attackSpeedLevel:0,bullets:1,pierce:0,bulletSpeed:13,magnet:2.2,manaRegen:base.manaRegen,crit:.05,spread:.13,invuln:0,speedLevel:0,guardRange:1.45,guardRangeLevel:0,upgrades:{},spells:{fireball:0,frost:0,lightning:0,dagger:0,wisps:0,spores:0,mines:0,force:0,meteor:0},cooldowns:{fireball:0,frost:0,lightning:0,meteor:0,wisp:0,spore:0,mine:0,force:0},meteorUsedMap:-1});applyClassStats(player.class);makeDungeon();state.waveSpawnRemaining=waveMobTarget();grantStarterSkills();notice('Wave 1 started — mini bosses on waves 2, 4, 6, 8. Main boss on wave 10.');ui.welcomeModal.classList.add('hidden');ui.instructionModal.classList.add('hidden');ui.startModal.classList.add('hidden');ui.gameOverModal.classList.add('hidden');ui.victoryModal.classList.add('hidden');ui.levelModal.classList.add('hidden')}
function applyWheelAbility(id){if(!id)return;player.spells=Object.assign({fireball:0,frost:0,lightning:0,dagger:0,wisps:0,spores:0,mines:0,force:0,meteor:0},player.spells||{});if(id==='meteor')player.spells.meteor=1;else if(id==='dagger'){player.spells.dagger=Math.min(5,(player.spells.dagger||0)+1);syncDaggers()}else player.spells[id]=Math.min(5,(player.spells[id]||0)+1);syncDaggers();updateUi();}
function grantStarterSkills(){const picks=Array.isArray(meta.wheelPicks)?meta.wheelPicks:[];for(const p of picks.slice(0,3)){applyWheelAbility(p);const def=abilityDefs.find(a=>a.id===p);toast('Wheel of Fortune: '+(def?def.name:p));notice('Starting skill: '+(def?def.name:p))}}
function renderShop(){
  if(ui.merchantGold) ui.merchantGold.textContent='Gold: $'+Math.floor(meta.gold||0);
  ui.shop.innerHTML='';
  const spins=wheelSpinCount();
  const w=document.createElement('button');
  w.disabled=spins>=3||meta.gold<wheelSpinCost();
  w.innerHTML=`<b>Wheel of Fortune</b><small>Only Wheel of Fortune is available after death. Won abilities stay for this continue run.</small><small>Spins ${spins}/3 · Cost: $500</small>`;
  w.onclick=()=>openWheelOfFortune({mode:'death'});
  ui.shop.appendChild(w)
}
function startClass(cls){clearControls();reset(cls||'mage')}
if(ui.newGameBtn)ui.newGameBtn.addEventListener('click',()=>{audioStart();sfx('ui');openNewGameProfile()});if(ui.loadGameBtn)ui.loadGameBtn.addEventListener('click',()=>{audioStart();sfx('ui');openLoadGame()});if(ui.profileCreateBtn)ui.profileCreateBtn.addEventListener('click',()=>{audioStart();sfx('ui');createProfileAndChooseHero()});if(ui.profileBackBtn)ui.profileBackBtn.addEventListener('click',()=>{ui.profileModal.classList.add('hidden');ui.welcomeModal.classList.remove('hidden')});if(ui.loadBackBtn)ui.loadBackBtn.addEventListener('click',()=>{ui.loadModal.classList.add('hidden');ui.welcomeModal.classList.remove('hidden')});if(ui.welcomeNextBtn)ui.welcomeNextBtn.addEventListener('click',()=>{audioStart();sfx('ui');ui.welcomeModal.classList.add('hidden');if(ui.storyModal)ui.storyModal.classList.remove('hidden');else ui.instructionModal.classList.remove('hidden')});if(ui.storyNextBtn)ui.storyNextBtn.addEventListener('click',()=>{audioStart();sfx('ui');ui.storyModal.classList.add('hidden');ui.instructionModal.classList.remove('hidden')});ui.instructionNextBtn.addEventListener('click',()=>{audioStart();sfx('ui');ui.instructionModal.classList.add('hidden');ui.startModal.classList.remove('hidden')});ui.mageBtn.addEventListener('click',()=>{audioStart();sfx('ui');startClass('mage')});ui.guardBtn.addEventListener('click',()=>{audioStart();sfx('ui');startClass('guard')});ui.archerBtn.addEventListener('click',()=>{audioStart();sfx('ui');startClass('archer')});ui.restartBtn.addEventListener('click',()=>{audioStart();sfx('ui');continueFromDeathCheckpoint()});ui.victoryRestartBtn.addEventListener('click',()=>{audioStart();sfx('ui');exitToMenu()});
if(ui.pauseToggleBtn)ui.pauseToggleBtn.addEventListener('click',()=>{audioStart();sfx('ui');togglePause()});
if(ui.pauseResumeBtn)ui.pauseResumeBtn.addEventListener('click',()=>{audioStart();sfx('ui');closePauseMenu()});
if(ui.pauseRestartBtn)ui.pauseRestartBtn.addEventListener('click',()=>{audioStart();sfx('ui');pauseRestartGame()});
if(ui.pauseSaveBtn)ui.pauseSaveBtn.addEventListener('click',()=>{audioStart();sfx('ui');saveGameToProfile()});
if(ui.pauseRefreshBtn)ui.pauseRefreshBtn.addEventListener('click',()=>{audioStart();sfx('ui');saveGameToProfile();refreshKeepProgress()});
if(ui.pauseExitBtn)ui.pauseExitBtn.addEventListener('click',()=>{audioStart();sfx('ui');exitToMenu()});
if(ui.adminMapJump)ui.adminMapJump.querySelectorAll('.admin-map-btn').forEach(btn=>btn.addEventListener('click',()=>{audioStart();sfx('ui');adminJumpMap(Number(btn.dataset.map))}));
const mapSpawnBalance=[{target:1.00,cap:18,burst:1.00,interval:1.05},{target:1.10,cap:20,burst:1.05,interval:.98},{target:1.18,cap:22,burst:1.12,interval:.94},{target:1.27,cap:24,burst:1.18,interval:.90},{target:1.36,cap:27,burst:1.25,interval:.86}];
function currentSpawnBalance(){return mapSpawnBalance[Math.max(0,Math.min(mapSpawnBalance.length-1,state.mapIndex||0))]||mapSpawnBalance[0]}
function waveMobTarget(){const wave=Math.max(1,state.wave||1),map=Math.max(0,state.mapIndex||0),b=currentSpawnBalance();const growth=7+Math.pow(wave,1.34)*(2.4+map*.34);return Math.max(7,Math.round(growth*b.target));}
function maxActiveMobs(){const wave=Math.max(1,state.wave||1),b=currentSpawnBalance();return Math.round(b.cap+Math.floor((wave-1)/2)*2)}
function activeNormalMobs(){return state.enemies.filter(e=>!e.boss&&!e.bossMinion).length}
function beginWave(n){state.wave=Math.max(1,Math.min(WAVES_PER_MAP,n));state.waveTime=0;state.lastWave=state.wave;state.waveWaitingForBoss=false;state.waveSpawnRemaining=waveMobTarget();state.spawnTimer=0;state.waveAdvanceLock=.35;notice('Wave '+state.wave+' started — defeat all enemies to continue'+(state.wave%2===0?' (boss wave!)':''));}
function advanceWave(){if((state.waveAdvanceLock||0)>0)return;if(state.wave>=WAVES_PER_MAP){const activeBoss=state.enemies.some(e=>e.boss);if(!activeBoss&&currentMap().decor!=='colosseum'&&state.bossesDefeatedThisMap>=BOSSES_PER_NORMAL_MAP&&!state.portalSpawned)spawnPortal();return;}beginWave(state.wave+1)}
function safeSpawnBoss(finalFight=false){try{spawnBoss(finalFight);return true}catch(err){console.error('Boss spawn failed:',err);notice('Boss spawn fixed itself — continuing wave.');return false}}
function maybeStartBossWave(){
  const isFinalMap=currentMap().decor==='colosseum';
  const wave=Math.max(1,Math.min(WAVES_PER_MAP,Number(state.wave)||1));
  const bossWaveSlots={2:1,4:2,6:3,8:4,10:5};
  const slot=bossWaveSlots[wave]||0;
  if(!slot||state.portalSpawned||state.portal)return;
  state.bossesSpawnedThisMap=state.bossesSpawnedThisMap||{};
  const key=String(wave);
  const activeBoss=state.enemies.some(e=>e.boss);
  if(activeBoss||state.bossesSpawnedThisMap[key])return;
  state.bossesSpawnedThisMap[key]=true;
  state.bossSpawnedWave=wave;
  state.waveWaitingForBoss=true;
  if(isFinalMap&&slot===5){
    if(!state.finalBossSpawned){state.finalBossSpawned=true;safeSpawnBoss(true);}
  }else{
    safeSpawnBoss(false);
  }
}
function balancedSpawnInterval(){const wave=Math.max(1,state.wave||1),b=currentSpawnBalance();const base=1.18*b.interval-(wave-1)*.050;const bossPressure=state.enemies.some(e=>e.boss)?-.06:0;return Math.max(.30,base+bossPressure)}
function balancedSpawnCount(){const wave=Math.max(1,state.wave||1),b=currentSpawnBalance();const waveRamp=Math.floor((wave-1)/2);const bossBonus=state.enemies.some(e=>e.boss)?1:0;const randomBonus=Math.random()<Math.min(.60,.10*wave)?1:0;return Math.min(7,Math.max(1,Math.round((1+waveRamp+bossBonus+randomBonus)*b.burst)))}
function update(dt){if(!state.running||state.paused)return;state.time+=dt;const isFinalMap=currentMap().decor==='colosseum';const activeBoss=state.enemies.some(e=>e.boss);state.waveTime+=dt;state.waveAdvanceLock=Math.max(0,(state.waveAdvanceLock||0)-dt);if(state.wave!==state.lastWave){state.lastWave=state.wave;state.waveTime=0;notice('Wave '+state.wave+' started — '+(state.wave%2===0?'boss wave!':'minions incoming'))}
maybeStartBossWave();
if((state.waveAdvanceLock||0)<=0&&(state.waveSpawnRemaining||0)<=0&&state.enemies.length===0){advanceWave();}
if(!isFinalMap&&state.wave>=WAVES_PER_MAP&&state.bossesDefeatedThisMap>=BOSSES_PER_NORMAL_MAP&&!state.portalSpawned)spawnPortal();
sanitizePlayerVitals();if(player.hp<=0&&state.running){player.hp=0;updateUi();gameOver();return;}state.heartSpawnTimer=(state.heartSpawnTimer||15)-dt;if(state.heartSpawnTimer<=0){state.heartSpawnTimer=15;spawnTimedHeart()}player.mana=Math.min(player.maxMana,player.mana+player.manaRegen*dt);for(const k in player.cooldowns)player.cooldowns[k]=Math.max(0,player.cooldowns[k]-dt);player.invuln=Math.max(0,player.invuln-dt);const right=keys.has('d')||keys.has('arrowright'),left=keys.has('a')||keys.has('arrowleft'),down=keys.has('s')||keys.has('arrowdown'),up=keys.has('w')||keys.has('arrowup');let mx=(right?1:0)-(left?1:0),mz=(down?1:0)-(up?1:0),mag=Math.hypot(mx,mz)||1,oldX=player.x,oldZ=player.z;player.x+=mx/mag*player.speed*dt;player.z+=mz/mag*player.speed*dt;if(!canStandAt(player.x,player.z,player.r)){const nx=player.x,nz=player.z;player.x=oldX;player.z=nz;if(!canStandAt(player.x,player.z,player.r)){player.x=nx;player.z=oldZ;if(!canStandAt(player.x,player.z,player.r)){player.x=oldX;player.z=oldZ}}}player.mesh.position.set(player.x,.7,player.z);camera.position.x+=(player.x-camera.position.x)*.08;camera.position.z+=(player.z-camera.position.z)*.08;camera.lookAt(camera.position.x,0,camera.position.z);updateMouseWorld();if(mouse.down)shoot();for(const t of torches){const f=.98+Math.sin(state.time*6+t.phase)*.025+Math.random()*.01;t.glow.scale.setScalar(f);if(t.mid)t.mid.scale.setScalar(.99+Math.sin(state.time*4+t.phase)*.018);t.core.scale.setScalar(1.01/f);t.sprite.position.y=.55+Math.sin(state.time*5+t.phase)*.025}updateMapMerchant(dt);if(state.portal){state.portal.phase+=dt;state.portal.mesh.scale.setScalar(1+Math.sin(state.portal.phase*5)*.08);state.portal.extra.scale.setScalar(.9+Math.sin(state.portal.phase*7)*.12);if(Math.hypot(player.x-state.portal.x,player.z-state.portal.z)<1.05)travelNextMap()}updatePassive(dt);syncDaggers();const waveSpawningActive=(state.waveSpawnRemaining||0)>0;state.spawnTimer-=dt;if(waveSpawningActive&&state.spawnTimer<=0){state.spawnTimer=balancedSpawnInterval();const slots=Math.max(0,maxActiveMobs()-activeNormalMobs());const n=Math.min(balancedSpawnCount(),state.waveSpawnRemaining||0,slots);for(let i=0;i<n;i++){spawnEnemy();state.waveSpawnRemaining=Math.max(0,(state.waveSpawnRemaining||0)-1)}}for(let i=state.bullets.length-1;i>=0;i--){const b=state.bullets[i];b.life-=dt;b.x+=b.vx*dt;b.z+=b.vz*dt;b.mesh.position.set(b.x,b.type==='arrow'?.25:((b.type==='mageBoss'||b.type==='fireball')?.34:.17),b.z);if(b.type==='arrow')b.mesh.rotation.y=-Math.atan2(b.vz,b.vx);if(b.type==='mageBoss')b.mesh.rotation.z+=dt*5;if(b.type==='fireball'&&b.mesh.material)b.mesh.material.rotation+=dt*7;if(b.life<=0){if(b.explode)explode(b.x,b.z,b.explode,b.dmg,b.color||0xff733f);entityGroup.remove(b.mesh);state.bullets.splice(i,1)}}for(let i=(state.enemyShots||[]).length-1;i>=0;i--){const b=state.enemyShots[i];b.life-=dt;b.x+=b.vx*dt;b.z+=b.vz*dt;b.mesh.position.set(b.x,.34,b.z);b.mesh.rotation.z+=dt*5;if(b.life<=0||!floorSet.has(key(Math.round(b.x),Math.round(b.z)))){entityGroup.remove(b.mesh);state.enemyShots.splice(i,1);continue}if(Math.hypot(b.x-player.x,b.z-player.z)<b.r+player.r&&player.invuln<=0){damagePlayer(b.dmg,.85,0xff5a2f,18);entityGroup.remove(b.mesh);state.enemyShots.splice(i,1);}}
for(let i=state.enemies.length-1;i>=0;i--){const e=state.enemies[i];e.freeze=Math.max(0,e.freeze-dt);const dx=player.x-e.x,dz=player.z-e.z,d=Math.hypot(dx,dz)||1,slow=e.freeze>0?.15:1;const exOld=e.x,ezOld=e.z;if(e.boss&&(!e.attackDelayUntil||state.time>=e.attackDelayUntil)){bossSpecialAttack(e,dt)}if(e.bossMinion)bossMinionSpellAttack(e,dt);if(e.finalBoss)finalBossAttack(e,dt);if(e.dashTime>0){e.dashTime-=dt;e.x+=e.dashVx*dt;e.z+=e.dashVz*dt;if(Math.hypot(player.x-e.x,player.z-e.z)<e.size*.55+player.r&&player.invuln<=0){damagePlayer(e.dashDamage||e.dmg,1.0,e.finalBoss?0xff5a2f:0xf97316,22);;}}else if(e.finalBoss){if(d>7.0){e.x+=dx/d*e.spd*dt*slow;e.z+=dz/d*e.spd*dt*slow}else if(d<4.6){e.x-=dx/d*e.spd*.55*dt*slow;e.z-=dz/d*e.spd*.55*dt*slow}}else{e.x+=dx/d*e.spd*dt*slow;e.z+=dz/d*e.spd*dt*slow}e.mesh.position.set(e.x,e.boss?1.25:.5,e.z);if(e.shadow)e.shadow.position.set(e.x,.07,e.z+.18);updateBossHpBar(e);for(let j=state.bullets.length-1;j>=0;j--){const b=state.bullets[j];if(!b.hit?.has(e)&&Math.hypot(b.x-e.x,b.z-e.z)<e.size*.42+b.r){b.hit&&b.hit.add(e);e.hp-=b.dmg;burst(b.x,b.z,b.type==='fireball'?0xff733f:(b.type==='mageOrb'?0x22c55e:0xc7d2fe),4);if(b.explode){explode(b.x,b.z,b.explode,b.dmg,b.color||0xff733f);entityGroup.remove(b.mesh);state.bullets.splice(j,1)}else if(b.pierce>0)b.pierce--;else{entityGroup.remove(b.mesh);state.bullets.splice(j,1)}if(e.hp<=0){killEnemy(e);state.enemies.splice(i,1);break}}}if(state.enemies[i]===e&&d<e.size*.42+player.r&&player.invuln<=0&&(!e.attackDelayUntil||state.time>=e.attackDelayUntil)){damagePlayer(e.dmg,.75,0x8b121a,12);}}state.daggerOrbitAngle=(state.daggerOrbitAngle||0)+dt*(3.4+player.spells.dagger*.18);const orbCount=state.orbiters.length;for(let oi=0;oi<orbCount;oi++){const o=state.orbiters[oi];o.angle=state.daggerOrbitAngle+oi*(Math.PI*2/Math.max(1,orbCount));o.mesh.position.set(player.x+Math.cos(o.angle)*o.radius,.82,player.z+Math.sin(o.angle)*o.radius);if(o.mesh.material)o.mesh.material.rotation=0;for(const e of state.enemies){const last=o.hit.get(e)||0;if(state.time-last>.45&&Math.hypot(o.mesh.position.x-e.x,o.mesh.position.z-e.z)<.65){e.hp-=o.dmg;o.hit.set(e,state.time);burst(e.x,e.z,0xe6d3a3,5)}}}cleanupDead();for(let i=state.drops.length-1;i>=0;i--){const d=state.drops[i],dx=player.x-d.x,dz=player.z-d.z,dist=Math.hypot(dx,dz)||1;if(dist<player.magnet){d.x+=dx/dist*(7+player.magnet)*dt;d.z+=dz/dist*(7+player.magnet)*dt}d.mesh.position.set(d.x,.3,d.z);if(dist<.65){if(d.kind==='xp')gainXp(d.amount);if(d.kind==='levelCrystal'){gainXp(Math.max(1,player.nextXp-player.xp));notice('Purple crystal absorbed — +1 level!')}if(d.kind==='crown'){state.finalCrownClaimed=true;showVictory();}if(d.kind==='coin')player.money+=d.amount;if(d.kind==='heart')player.hp=Math.min(player.maxHp,player.hp+d.amount);entityGroup.remove(d.mesh);state.drops.splice(i,1)}}for(let i=state.particles.length-1;i>=0;i--){const p=state.particles[i];p.life-=dt;p.x+=p.vx*dt;p.z+=p.vz*dt;p.mesh.position.set(p.x,.12,p.z);p.mesh.material.opacity=Math.max(0,p.life*2);if(p.life<=0){entityGroup.remove(p.mesh);state.particles.splice(i,1)}}for(let i=state.spells.length-1;i>=0;i--){const s=state.spells[i];s.life-=dt;if(s.scale!==1){s.scale+=dt*2.4;s.mesh.scale.setScalar(s.scale);setExtraScale(s.extra,s.scale*.75)}if(s.kind==='poison')for(const e of state.enemies)if(Math.hypot(e.x-s.x,e.z-s.z)<s.r)e.hp-=s.dps*dt;if(s.kind==='bossPoison'){s.tick=(s.tick||0)-dt;if(s.tick<=0&&Math.hypot(player.x-s.x,player.z-s.z)<s.r+player.r&&player.invuln<=0){s.tick=.55;damagePlayer(s.dps*.55,.45,0x22c55e,10)}}if(s.kind==='bossMeteor'&&s.life<=.18&&!s.hit){s.hit=true;explode(s.x,s.z,s.r,s.dmg,0xff733f);if(Math.hypot(player.x-s.x,player.z-s.z)<s.r+player.r&&player.invuln<=0)damagePlayer(s.dmg,.75,0xff733f,18)}if(s.kind==='slash'){s.angle+=dt*18;s.mesh.position.set(player.x,.12,player.z);if(!s.hideMesh){s.mesh.scale.setScalar(1+(1-s.life/(s.maxLife||.62))*.18);if(s.mesh.material)s.mesh.material.opacity=Math.max(0,.20*s.life/(s.maxLife||.62));}if(Array.isArray(s.extra)){s.extra.forEach((m,j)=>{const aa=s.angle+j*Math.PI,rr=s.r*(j?.58:.76);m.position.set(player.x+Math.cos(aa)*rr,.38-j*.04,player.z+Math.sin(aa)*rr);m.rotation.y=-aa+Math.PI/4;if(m.material)m.material.opacity=Math.max(0,(j?.34:.92)*s.life/(s.maxLife||.62))})}for(const e of state.enemies){const d=Math.hypot(e.x-player.x,e.z-player.z);if(!s.hit.has(e)&&d<s.r+e.size*.55){e.hp-=s.dmg;s.hit.add(e);burst(e.x,e.z,0xe5e7eb,5)}}}if(s.kind==='mine'&&nearestEnemy(s.x,s.z,s.r*.75)){explode(s.x,s.z,s.r,s.dmg);entityGroup.remove(s.mesh);removeExtra(s.extra);state.spells.splice(i,1);continue}if(s.mesh.material&&!s.hideMesh&&s.kind!=='mine')s.mesh.material.opacity=Math.max(0,Math.min(.55,s.life*1.2));if(s.kind==='mine'&&s.mesh.material)s.mesh.material.opacity=Math.max(0,Math.min(1,s.life*1.2));if(s.kind!=='slash')setExtraOpacity(s.extra,Math.max(0,Math.min(.28,s.life*.9)));if(s.life<=0){entityGroup.remove(s.mesh);removeExtra(s.extra);state.spells.splice(i,1)}}cleanupDead();maybeSpawnMapMerchantEasterEgg();state.uiTimer=(state.uiTimer||0)-dt;if(state.uiTimer<=0){state.uiTimer=.10;updateUi()}}
function showVictory(){clearControls();state.running=false;if(!state.paidRun){meta.gold+=player.money;state.paidRun=true;saveMerchantMeta()}ui.levelModal.classList.add('hidden');ui.gameOverModal.classList.add('hidden');ui.victoryModal.classList.remove('hidden');sfx('victory')}

function resetRunProgressAfterDeath(){
  const cls=player.class||'mage', base=HERO_BASE_STATS[cls]||HERO_BASE_STATS.mage;
  const had={
    fireball:(player.spells&&player.spells.fireball)>0,
    frost:(player.spells&&player.spells.frost)>0,
    lightning:(player.spells&&player.spells.lightning)>0,
    dagger:(player.spells&&player.spells.dagger)>0,
    spores:(player.spells&&player.spells.spores)>0,
    mines:(player.spells&&player.spells.mines)>0,
    force:(player.spells&&player.spells.force)>0,
    attackSpeed:player.attackSpeedLevel>0,
    speed:player.speedLevel>0,
    guardRange:player.guardRangeLevel>0,
    twin:player.upgrades&&player.upgrades.twinArrows>0,
    sharper:player.upgrades&&player.upgrades.sharperRunes>0,
    magnet:player.upgrades&&player.upgrades.moonMagnet>0,
    warmSoup:player.upgrades&&player.upgrades.warmSoup>0,
    pierce:player.upgrades&&player.upgrades.piercingCandle>0,
    blueTea:player.upgrades&&player.upgrades.blueTea>0
  };
  const keepMoney=0;
  Object.assign(player,{hp:base.hp,maxHp:base.hp,mana:base.mana,maxMana:base.mana,speed:base.speed,level:1,xp:0,nextXp:24,money:keepMoney,damage:base.dmg+(meta.dmg||0),fireRate:.48,attackSpeedLevel:0,bullets:1,pierce:0,bulletSpeed:13,magnet:2.2,manaRegen:base.manaRegen,crit:.05,spread:.13,invuln:0,speedLevel:0,guardRange:1.45,guardRangeLevel:0,upgrades:{},spells:{fireball:0,frost:0,lightning:0,dagger:0,wisps:0,spores:0,mines:0,force:0,meteor:0},cooldowns:{fireball:0,frost:0,lightning:0,meteor:0,wisp:0,spore:0,mine:0,force:0},meteorUsedMap:-1,wheelSpins:0});
  applyClassStats(cls);
  // Non-legendary active/passive abilities return to Lv 1. Legendary abilities disappear completely.
  ['fireball','frost','lightning','dagger','spores','mines','force'].forEach(id=>{if(had[id])player.spells[id]=1});
  if(had.attackSpeed){player.attackSpeedLevel=1;player.fireRate*=.90}
  if(had.speed){player.speedLevel=1;player.speed*=1.10}
  if(had.guardRange&&cls==='guard'){player.guardRangeLevel=1;player.guardRange*=1.20}
  if(had.twin&&cls==='archer'){player.upgrades.twinArrows=1;player.bullets=2}
  if(had.sharper){player.upgrades.sharperRunes=1;player.damage+=5}
  if(had.magnet){player.upgrades.moonMagnet=1;player.magnet+=1.25}
  if(had.warmSoup){player.upgrades.warmSoup=1;player.maxHp+=30;player.hp=player.maxHp}
  if(had.pierce&&cls==='archer'){player.upgrades.piercingCandle=1;player.pierce=1}
  if(had.blueTea){player.upgrades.blueTea=1;player.maxMana+=5;player.manaRegen+=1;player.mana=player.maxMana}
  syncDaggers();
}
function wheelSpinCost(){return 500}
function wheelSpinCount(){return Math.max(0,Math.min(3,Number(player.wheelSpins||0)))}
function wheelCurrency(mode){return mode==='map'?player.money:(meta.gold||0)}
function setWheelCurrency(mode,value){if(mode==='map')player.money=Math.max(0,value);else meta.gold=Math.max(0,value)}
function wheelSpinCountForMode(mode){return mode==='map'?Math.max(0,Math.min(1,Number(state.mapMerchantSpins||0))):wheelSpinCount()}
function openWheelOfFortune(opts={}){
  const mode=opts.mode||'death';
  const maxSpins=mode==='map'?1:3;
  const existing=document.getElementById('wheelModal'); if(existing)existing.remove();
  const modal=document.createElement('div'); modal.id='wheelModal'; modal.className='center wheel-modal';
  const options=abilityDefs.slice();
  const title=mode==='map'?'Portal Merchant':'Wheel of Fortune';
  const desc=mode==='map'?'The portal merchant stays for a short time. You can spin only once on this map.':'Cost: $500 per spin. Max 3 spins before continue. The abilities you win stay with this continue run.';
  modal.innerHTML=`<div class="modal"><h1>${title}</h1><p>${desc}</p><div class="wheel-wrap"><div class="wheel-pointer"></div><div class="fortune-wheel" id="fortuneWheel"></div><div class="wheel-result" id="wheelResult"></div><div class="wheel-spin-row"><button id="wheelSpinBtn">Spin - $500</button><button id="wheelCloseBtn">Close</button><small id="wheelSpinsInfo"></small></div></div></div>`;
  document.body.appendChild(modal);
  const wheel=modal.querySelector('#fortuneWheel'), result=modal.querySelector('#wheelResult'), spinBtn=modal.querySelector('#wheelSpinBtn'), info=modal.querySelector('#wheelSpinsInfo');
  const seg=360/options.length;
  options.forEach((def,i)=>{const slot=document.createElement('div');slot.className='wheel-slot';const ang=i*seg;slot.style.transform=`rotate(${ang}deg) translate(0,-145px) rotate(${-ang}deg)`;slot.innerHTML=iconHtml(def.icon);slot.title=def.name;wheel.appendChild(slot)});
  let rotation=0, spinning=false;
  function refresh(){
    const spins=wheelSpinCountForMode(mode);
    const gold=Math.floor(wheelCurrency(mode)||0);
    info.textContent=`Spins: ${spins}/${maxSpins} · Gold: $${gold}`;
    spinBtn.disabled=spinning||spins>=maxSpins||gold<wheelSpinCost();
    if(ui.merchantGold&&mode!=='map')ui.merchantGold.textContent='Gold: $'+Math.floor(meta.gold||0);
    updateUi&&updateUi();
  }
  spinBtn.onclick=()=>{
    if(spinning||wheelSpinCountForMode(mode)>=maxSpins)return;
    if(wheelCurrency(mode)<wheelSpinCost()){toast('Not enough coins');refresh();return;}
    spinning=true;result.textContent='Spinning...';refresh();
    const idx=Math.floor(Math.random()*options.length);
    const currentTurns=Math.ceil(rotation/360);
    rotation=(currentTurns+4)*360 - idx*seg;
    wheel.style.transform=`rotate(${rotation}deg)`;
    setTimeout(()=>{
      const def=options[idx];
      setWheelCurrency(mode,wheelCurrency(mode)-wheelSpinCost());
      if(mode==='map')state.mapMerchantSpins=wheelSpinCountForMode(mode)+1;
      else player.wheelSpins=wheelSpinCount()+1;
      applyWheelAbility(def.id);
      saveMerchantMeta();
      result.textContent='You won: '+def.name+'!';
      toast('Wheel: '+def.name);
      notice('Wheel of Fortune granted '+def.name);
      spinning=false;
      refresh();
      renderShop();
      if(mode==='map'){setTimeout(()=>{const m=document.getElementById('wheelModal');if(m)m.remove();clearMapMerchant();},900)}
    },2450)
  };
  modal.querySelector('#wheelCloseBtn').onclick=()=>{modal.remove();if(mode==='map'&&wheelSpinCountForMode(mode)>=1)clearMapMerchant();};
  refresh();
}
function continueFromDeathCheckpoint(){
  const snap=makeSaveSnapshot();
  snap.state.mapIndex=state.mapIndex;
  snap.state.wave=1;
  snap.state.bossesDefeatedThisMap=0;
  snap.player.money=0;
  restoreGameSnapshot(snap,{restartMap:true,afterDeath:true});
}
function gameOver(){sfx('death');clearControls();state.running=false;const deathLevel=player.level,deathWave=state.wave,deathKills=state.kills,deathCoins=player.money;if(!state.paidRun){meta.gold+=player.money;state.paidRun=true;saveMerchantMeta()}resetRunProgressAfterDeath();ui.finalStats.innerHTML=`Level ${deathLevel}, map ${Number(state.mapIndex||0)+1}, wave ${deathWave}, ${deathKills} monsters defeated, $${deathCoins} collected.<br>Merchant coins: $${meta.gold}<br><small>Death resets run upgrades to Lv 1 and removes legendary abilities. Continue restarts from the beginning of this map.</small>`;renderShop();if(ui.restartBtn)ui.restartBtn.textContent='Continue From This Map';ui.gameOverModal.classList.remove('hidden')}
function fmt(n,d=1){return Number.isFinite(n)?Number(n).toFixed(d):'0'}
function renderSideStats(){
  if(!ui.sideStatGrid||!ui.sideAbilityList)return;
  const attackSpeed=player.fireRate>0?1/player.fireRate:0;
  const rows=[
    ['Class',(player.class||'mage').toUpperCase()],
    ['Damage',fmt(player.damage,1)],
    ['Attack speed',fmt(attackSpeed,2)+'/s'],
    ['Move speed',fmt(player.speed,1)],
    ['Projectiles',player.bullets],
    [player.class==='guard'?'Axe range':'Pierce hits',player.class==='guard'?fmt(player.guardRange||1.45,2):(player.pierce+1)],
    ['Crit chance',Math.round((player.crit||0)*100)+'%'],
    ['Magnet',fmt(player.magnet,1)],
    ['Max HP',player.maxHp],
    ['Max mana',player.maxMana],
    ['Mana regen',fmt(player.manaRegen,1)+'/s']
  ];
  ui.sideStatGrid.innerHTML=rows.map(([k,v])=>`<span>${k}</span><b>${v}</b>`).join('');
  const items=[];
  const push=(icon,name,lvl,rarity='basic')=>items.push(`<div class="side-ability rarity-${rarity}"><div class="side-ability-name"><span>${iconHtml(icon)}</span><span>${name}</span></div><div class="side-ability-lvl"><span class="side-rarity">${rarityLabel(rarity)}</span><br>${lvl}</div></div>`);
  const u=player.upgrades||{};
  if(u.twinArrows)push(abilityIconData.twin,'Twin Arrows','Lv '+u.twinArrows+'/3',abilityRarity['Twin Arrows']);
  if(player.attackSpeedLevel)push(abilityIconData.faster,'Faster Draw','Lv '+player.attackSpeedLevel+'/5',abilityRarity['Faster Draw']);
  if(u.sharperRunes)push(abilityIconData.sharper,'Sharper Runes','Lv '+u.sharperRunes+'/5',abilityRarity['Sharper Runes']);
  if(player.speedLevel)push(abilityIconData.boots,'Fleet Boots','Lv '+player.speedLevel+'/5',abilityRarity['Fleet Boots']);
  if(u.moonMagnet)push(abilityIconData.magnet,'Moon Magnet','Lv '+u.moonMagnet+'/5',abilityRarity['Moon Magnet']);
  if(u.warmSoup)push(abilityIconData.heart,'Warm Soup','Lv '+u.warmSoup+'/5',abilityRarity['Warm Soup']);
  if(u.piercingCandle&&player.class==='archer')push(abilityIconData.candle,'Piercing Candle','Lv '+u.piercingCandle+'/5 · '+(u.piercingCandle+1)+' mobs',abilityRarity['Piercing Candle']);
  if(player.class==='guard'&&player.guardRangeLevel)push(abilityIconData.axe,'Axe Reach','Lv '+player.guardRangeLevel+'/5',abilityRarity['Axe Reach']);
  if(u.blueTea)push(abilityIconData.tea,'Blue Tea','Lv '+u.blueTea+'/5',abilityRarity['Blue Tea']);
  const spellNames={fireball:[abilityIconData.fireball,'Fireball','Fireball Tome'],frost:[abilityIconData.frost,'Frost Nova','Frost Nova Charm'],lightning:[abilityIconData.lightning,'Storm Acorn','Storm Acorn'],meteor:[abilityIconData.meteor,'Meteor Rain','Meteor Rain'],dagger:[abilityIconData.dagger,'Dancing Daggers','Dancing Dagger'],wisps:[abilityIconData.wisps,'Spirit Wisps','Spirit Wisps'],spores:[abilityIconData.spores,'Poison Spores','Poison Spores'],mines:[abilityIconData.mines,'Rune Mines','Rune Mines'],force:[abilityIconData.force,'Force Field','Force Field']};
  for(const [id,[icon,name,abilityName]] of Object.entries(spellNames)){
    const lvl=player.spells[id]||0;
    if(lvl)push(icon,name,id==='meteor'?'Unlocked':`Lv ${lvl}/5`,abilityRarity[abilityName]||'basic');
  }
  ui.sideAbilityList.innerHTML=items.length?items.join(''):'<div class="side-empty">No abilities yet</div>';
}
function renderAbilityBar(){ui.abilityBar.innerHTML='';for(const def of abilityDefs){const lvl=player.spells[def.id]||0;if(!lvl)continue;const el=document.createElement('div');el.className='ability-icon '+def.type;el.title=def.name;const cd=def.cd?player.cooldowns[def.cd]:0;const usedMeteor=def.id==='meteor'&&player.meteorUsedMap===state.mapIndex;if(def.type==='active'&&cd<=0&&!usedMeteor)el.classList.add('ready');const mana=def.type==='active'?(activeManaCosts[def.id]||0):0;const levelLabel=def.id==='meteor'?'':(lvl+'/5');el.innerHTML=`<span>${iconHtml(def.icon)}</span>${def.key?`<span class="ability-key">${def.key}</span>`:''}${mana?`<span class="ability-mana">${mana}M</span>`:''}${levelLabel?`<span class="ability-level">${levelLabel}</span>`:''}`;if(def.type==='active'&&(cd>0||usedMeteor)){const max=getCooldownMax(def.id),pct=usedMeteor?100:Math.max(0,Math.min(100,cd/max*100)),fill=document.createElement('div'),timer=document.createElement('div');fill.className='ability-fill';fill.style.height=pct+'%';timer.className='ability-cd';timer.textContent=usedMeteor?'MAP':(cd>=10?Math.ceil(cd):cd.toFixed(1));el.appendChild(fill);el.appendChild(timer)}ui.abilityBar.appendChild(el)}}
function drawMinimap(){if(!ui.minimap)return;const ctx=ui.minimap.getContext('2d'),w=ui.minimap.width,h=ui.minimap.height,b=mapBounds;ctx.clearRect(0,0,w,h);ctx.fillStyle='rgba(9,6,13,.92)';ctx.fillRect(0,0,w,h);const sx=w/(b.maxX-b.minX+1),sz=h/(b.maxZ-b.minZ+1);ctx.fillStyle='rgba(117,104,82,.42)';for(const cell of floorSet){const parts=cell.split(','),x=Number(parts[0]),z=Number(parts[1]);ctx.fillRect((x-b.minX)*sx,(z-b.minZ)*sz,Math.max(1,sx),Math.max(1,sz))}ctx.strokeStyle='rgba(255,207,123,.22)';ctx.strokeRect(.5,.5,w-1,h-1);if(state.portal){const px=(state.portal.x-b.minX)*sx,pz=(state.portal.z-b.minZ)*sz;ctx.fillStyle='#d8b4fe';ctx.beginPath();ctx.arc(px,pz,5,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke()}else{const ps=portalSpot(),px=(ps.x-b.minX)*sx,pz=(ps.z-b.minZ)*sz;ctx.strokeStyle='rgba(216,180,254,.55)';ctx.lineWidth=2;ctx.setLineDash([3,3]);ctx.beginPath();ctx.arc(px,pz,5,0,Math.PI*2);ctx.stroke();ctx.setLineDash([])}for(const d of state.drops){const hx=(d.x-b.minX)*sx,hz=(d.z-b.minZ)*sz;if(d.kind==='heart'){ctx.fillStyle='#ff77b7';ctx.beginPath();ctx.moveTo(hx,hz+3);ctx.bezierCurveTo(hx-6,hz-1,hx-4,hz-7,hx,hz-3);ctx.bezierCurveTo(hx+4,hz-7,hx+6,hz-1,hx,hz+3);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=.8;ctx.stroke();}else if(d.kind==='levelCrystal'){ctx.save();ctx.translate(hx,hz);ctx.fillStyle='#c084fc';ctx.strokeStyle='#ffffff';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(5,0);ctx.lineTo(0,7);ctx.lineTo(-5,0);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#22d3ee';ctx.fillRect(-1.5,-1.5,3,3);ctx.restore();}}ctx.fillStyle='#ff5a5f';for(const e of state.enemies){const ex=(e.x-b.minX)*sx,ez=(e.z-b.minZ)*sz;ctx.beginPath();ctx.arc(ex,ez,e.boss?3.5:2,0,Math.PI*2);ctx.fill()}ctx.fillStyle='#9ee7ff';ctx.beginPath();ctx.arc((player.x-b.minX)*sx,(player.z-b.minZ)*sz,3.5,0,Math.PI*2);ctx.fill()}
function updateUi(){const hpPct=Math.max(0,Math.min(100,100*player.hp/player.maxHp)),xpPct=Math.max(0,Math.min(100,100*player.xp/player.nextXp));ui.hpBar.style.width=hpPct+'%';ui.hpText.textContent=`${Math.ceil(player.hp)}/${player.maxHp}${player.hp<=0&&player.lastDamageTaken?' (-'+Math.ceil(player.lastDamageTaken)+' dmg)':''}`;ui.xpBar.style.width=xpPct+'%';ui.xpText.textContent=`${player.xp}/${player.nextXp}`;ui.manaText.textContent=`${Math.floor(player.mana)}/${player.maxMana}`;ui.levelText.textContent=player.level;ui.moneyText.textContent=player.money;ui.waveText.textContent=state.wave;ui.waveTimerText.textContent=(state.waveSpawnRemaining||0)>0?'Mobs '+state.waveSpawnRemaining:'Clear';updateMapText();ui.spellText.textContent='';renderAbilityBar();renderSideStats();drawMinimap();updateAdminControls()}
resize();makeDungeon();ui.hpBar.style.width='100%';ui.xpBar.style.width='0%';updateUi();preloadGameAssets().then(()=>{restoreRefreshProgress();let last=performance.now();function loop(now){const dt=Math.min(.033,(now-last)/1000);last=now;update(dt);renderer.render(scene,camera);requestAnimationFrame(loop)}requestAnimationFrame(loop);});


  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(err => {
        console.warn("Service worker registration failed:", err);
      });
    });
  }
