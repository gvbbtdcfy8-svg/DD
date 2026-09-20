'use strict';
const STORAGE_KEY='yanmiao_study_space_v1';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const uid=p=>`${p||'id'}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,7)}`;
const pad=n=>String(n).padStart(2,'0');
const dateKey=d=>{const x=new Date(d);return `${x.getFullYear()}-${pad(x.getMonth()+1)}-${pad(x.getDate())}`};
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const displayDate=d=>`${new Date(d).getMonth()+1}月${new Date(d).getDate()}日`;
const minutesText=m=>{const n=Math.max(0,Math.round(m));const h=Math.floor(n/60),mm=n%60;return h?`${h}h ${mm?mm+'m':''}`:`${mm}m`};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>dateKey(new Date());
function startOfWeek(d=new Date()){const x=new Date(d);const day=x.getDay()||7;x.setDate(x.getDate()-day+1);x.setHours(0,0,0,0);return x}
function makeDayTasks(){const d=today();return[
{id:uid('plan'),level:'day',date:d,time:'08:30',title:'数学强化 · 中值定理',subject:'数学',minutes:120,done:true,moved:false},
{id:uid('plan'),level:'day',date:d,time:'10:50',title:'英语真题阅读 2 篇',subject:'英语',minutes:70,done:true,moved:false},
{id:uid('plan'),level:'day',date:d,time:'14:00',title:'专业课第 5 章背诵',subject:'专业课',minutes:90,done:true,moved:false},
{id:uid('plan'),level:'day',date:d,time:'19:30',title:'英语阅读精读与生词复盘',subject:'英语',minutes:60,done:false,moved:false},
{id:uid('plan'),level:'day',date:dateKey(addDays(new Date(),1)),time:'08:30',title:'数学强化 · 多元函数基础',subject:'数学',minutes:120,done:false,moved:false},
{id:uid('plan'),level:'day',date:dateKey(addDays(new Date(),1)),time:'14:00',title:'政治马原 · 唯物辩证法',subject:'政治',minutes:60,done:false,moved:false}
]}
function makeTree(){return{id:'root',name:'错题题库',type:'folder',children:[
{id:'math',name:'高等数学',type:'folder',children:[
{id:'limits',name:'极限与连续',type:'folder',children:[{id:'set_limits',name:'强化第 3 讲错题',type:'set',round:1,session:null,questions:[
{id:'q1',subject:'数学',title:'设函数 f(x) 在 x=0 的某去心邻域内有定义，且 lim(x→0) [f(x)-1]/x² = 2，求 lim(x→0) f(x)。',analysis:'凑出 f(x)-1 的结构，结合极限存在条件判断常数项。',reason:'概念不清',status:'new'},
{id:'q2',subject:'数学',title:'讨论函数 f(x)=x·sin(1/x) 在 x=0 处的连续性与可导性。',analysis:'连续看极限，可导看差商的极限；注意 sin(1/x) 的有界性。',reason:'计算失误',status:'new'},
{id:'q3',subject:'数学',title:'求极限 lim(x→∞) [√(x²+x)-x]。',analysis:'有理化后分子分母同除 x，得到 1/2。',reason:'计算失误',status:'new'},
{id:'q4',subject:'数学',title:'若 f(x) 在 [0,2] 连续，f(0)=1，f(2)=3，证明存在 ξ∈(0,2) 使 f(ξ)=2。',analysis:'构造 g(x)=f(x)-2，使用零点定理。',reason:'证明思路',status:'new'},
{id:'q5',subject:'数学',title:'判断数列 {sin n / n} 是否收敛，并说明理由。',analysis:'利用有界量乘无穷小。',reason:'概念不清',status:'new'},
{id:'q6',subject:'数学',title:'求函数 f(x)=(x²-1)/(x-1) 的间断点类型。',analysis:'注意 x=1 为可去间断点。',reason:'计算失误',status:'new'},
{id:'q7',subject:'数学',title:'已知 lim(x→0) sin(ax)/x=3，求 a。',analysis:'使用等价无穷小 sin(ax)~ax。',reason:'公式遗忘',status:'new'},
{id:'q8',subject:'数学',title:'讨论单调有界准则证明递推数列收敛的完整步骤。',analysis:'先证有界，再证单调，最后求极限。',reason:'证明思路',status:'new'}
]}]},
{id:'linear',name:'线性代数',type:'folder',children:[{id:'set_linear',name:'特征值错题',type:'set',round:1,session:null,questions:[{id:'l1',subject:'数学',title:'求矩阵 A 的特征值与特征向量。',analysis:'先求特征多项式，再解齐次方程组。',reason:'计算失误',status:'new'},{id:'l2',subject:'数学',title:'判断矩阵是否可以对角化。',analysis:'比较代数重数与几何重数。',reason:'概念不清',status:'new'}]}]}
]},
{id:'english',name:'英语',type:'folder',children:[{id:'set_eng',name:'阅读错题 · 2021 Text 2',type:'set',round:1,session:null,questions:[{id:'e1',subject:'英语',title:'What can be inferred from Paragraph 3?',analysis:'定位段落后关注转折词，排除范围过大的选项。',reason:'定位错误',status:'new'},{id:'e2',subject:'英语',title:'The author mentions the report mainly to ____.',analysis:'例证题看例子前后的观点句。',reason:'定位错误',status:'new'}]}]},
{id:'major',name:'专业课',type:'folder',children:[]}
]}}
function defaultState(){const d=today();return{
user:{name:'小研',mood:'',rating:4},target:{school:'南栀大学',major:'计算机科学与技术',date:'2026-12-19',subjects:[{name:'政治',score:60,color:'#ff8eae'},{name:'英语',score:75,color:'#6eb9ff'},{name:'数学',score:120,color:'#57d3b4'},{name:'专业课',score:105,color:'#9485ff'}]},
plans:[
{id:uid('plan'),level:'year',date:String(new Date().getFullYear()),time:'全年',title:'完成数学、英语、专业课三轮复习',subject:'综合',minutes:0,done:false,moved:false},
{id:uid('plan'),level:'year',date:String(new Date().getFullYear()),time:'10-12月',title:'冲刺真题与全真模考',subject:'综合',minutes:0,done:false,moved:false},
{id:uid('plan'),level:'month',date:'2026-09',time:'本月',title:'数学强化完成高数全部章节',subject:'数学',minutes:0,done:false,moved:false},
{id:uid('plan'),level:'month',date:'2026-09',time:'本月',title:'英语近 10 年阅读一刷',subject:'英语',minutes:0,done:false,moved:false},
{id:uid('plan'),level:'month',date:'2026-09',time:'本月',title:'专业课完成第 1-6 章框架背诵',subject:'专业课',minutes:0,done:false,moved:false},
{id:uid('plan'),level:'month',date:'2026-09',time:'本月',title:'政治马原强化视频 + 1000 题',subject:'政治',minutes:0,done:false,moved:false},
{id:uid('plan'),level:'week',date:dateKey(startOfWeek()),time:'周一',title:'高数中值定理与多元函数',subject:'数学',minutes:0,done:true,moved:false},
{id:uid('plan'),level:'week',date:dateKey(startOfWeek()),time:'周二',title:'英语 2021 Text 1-2 精读',subject:'英语',minutes:0,done:false,moved:false},
{id:uid('plan'),level:'week',date:dateKey(startOfWeek()),time:'周三',title:'专业课第 5-6 章',subject:'专业课',minutes:0,done:false,moved:false},
{id:uid('plan'),level:'week',date:dateKey(startOfWeek()),time:'周四',title:'政治马原辩证法与认识论',subject:'政治',minutes:0,done:false,moved:false},
...makeDayTasks()
],
reminder:{enabled:true,time:'21:30',lastNotified:''},autoShift:true,lastAutoShift:'',activePlanLevel:'day',planAnchor:dateKey(new Date()),
countdowns:[{id:uid('cd'),name:'考研初试',date:'2026-12-19T08:30',color:'pink',studyMinutes:0},{id:uid('cd'),name:'英语六级考试',date:'2026-11-14T09:00',color:'mint',studyMinutes:0},{id:uid('cd'),name:'复试准备启动',date:'2027-01-10T09:00',color:'purple',studyMinutes:0}],
timer:{running:false,startedAt:null,elapsed:0,subject:'数学'},sessions:[
{id:uid('s'),date:d,time:'08:35',subject:'数学',minutes:112,content:'中值定理强化与 20 道例题'},
{id:uid('s'),date:d,time:'10:48',subject:'英语',minutes:68,content:'2021 Text 2 精读与长难句'},
{id:uid('s'),date:d,time:'14:05',subject:'专业课',minutes:86,content:'第 5 章知识框架背诵'}
],
summaries:{[d]:{text:'今天把中值定理的构造方法理清楚了，英语阅读定位还需要再缩小范围。晚上重背专业课第 5 章关键词。',mood:'顺利',emoji:'😊',rating:4}},weeklySummaries:{},
mistakes:makeTree(),reasons:[{id:'r1',name:'概念不清',questionIds:['q1','q5','l2']},{id:'r2',name:'计算失误',questionIds:['q2','q3','q6','l1']},{id:'r3',name:'证明思路',questionIds:['q4','q8']},{id:'r4',name:'公式遗忘',questionIds:['q7']},{id:'r5',name:'定位错误',questionIds:['e1','e2']}],
selectedFolderId:'root',selectedReasonId:'',practice:null,reviewedToday:0,sortFilesAsc:true,
duo:{online:true,connected:true,room:'YAN26',focusSeconds:0,duoRunning:false,startedAt:null,feed:[{id:uid('f'),name:'阿梨',avatar:'🐰',text:'今天一起把数学强化冲到第 3 章！',time:'19:02'},{id:uid('f'),name:'我',avatar:'🐣',text:'好呀，下午 2 点开始同屏专注。',time:'19:03'}]},
theme:'peach',masteryHistory:[],reports:{},lastView:'home'
}}
function emptyState(){const s=defaultState();return{...s,user:{name:'小研',mood:'',rating:4},target:{school:'',major:'',date:'',subjects:s.target.subjects.map(x=>({...x,score:0}))},plans:[],countdowns:[],sessions:[],summaries:{},weeklySummaries:{},mistakes:{id:'root',name:'错题题库',type:'folder',children:[]},reasons:[],selectedFolderId:'root',selectedReasonId:'',practice:null,reviewedToday:0,reasonSessions:{},reminder:{enabled:false,time:'21:30',lastNotified:''},duo:{...s.duo,online:false,connected:false,focusSeconds:0,duoRunning:false,startedAt:null,feed:[]},theme:'peach',masteryHistory:[],reports:{},lastView:'home'}}
const freshRequested=new URLSearchParams(location.search).get('fresh')==='1';
const activeUser={id:'local',nickname:'小研',avatar:'🐣'};
function storageKey(){return STORAGE_KEY}
function mergeState(parsed){const base=emptyState();return{...base,...(parsed||{}),target:{...base.target,...(parsed?.target||{})},timer:{...base.timer,...(parsed?.timer||{})}}}
let state=loadState();
function loadState(){try{const raw=localStorage.getItem(storageKey());if(!raw)return emptyState();return mergeState(JSON.parse(raw))}catch(e){return emptyState()}}
let saveTimer=null;
function save(immediate=false){clearTimeout(saveTimer);const run=()=>{try{localStorage.setItem(storageKey(),JSON.stringify(state))}catch(e){console.warn('save failed',e)}};if(immediate)run();else saveTimer=setTimeout(run,180)}
let weekAnchor=startOfWeek();
function weekKey(d=weekAnchor){return dateKey(startOfWeek(d))}
function getSessions(day){return state.sessions.filter(s=>s.date===day)}
function sessionMinutes(day){return getSessions(day).reduce((n,s)=>n+(+s.minutes||0),0)}
function totalSessionMinutes(){return state.sessions.reduce((n,s)=>n+(+s.minutes||0),0)}
function findNode(id,node=state.mistakes){if(node.id===id)return node;for(const c of node.children||[]){const f=findNode(id,c);if(f)return f}return null}
function findParent(id,node=state.mistakes,parent=null){if(node.id===id)return parent;for(const c of node.children||[]){const f=findParent(id,c,node);if(f)return f}return null}
function allSets(node=state.mistakes,out=[]){if(node.type==='set')out.push(node);for(const c of node.children||[])allSets(c,out);return out}
function allQuestions(){return allSets().flatMap(s=>s.questions||[])}
function currentFolder(){return findNode(state.selectedFolderId)||state.mistakes}
function selectedReason(){return state.reasons.find(r=>r.id===state.selectedReasonId)}
function greeting(){const h=new Date().getHours(),n=activeUser?.nickname||'小研';return h<6?`夜深了，${n}`:h<11?`早上好，${n}`:h<14?`中午好，${n}`:h<18?`下午好，${n}`:`晚上好，${n}`}
function getExam(){return state.countdowns.find(c=>c.name.includes('考研'))||state.countdowns[0]}
function renderHome(){
 const d=today(),todays=state.plans.filter(p=>p.level==='day'&&p.date===d).sort((a,b)=>a.time.localeCompare(b.time));
 const done=todays.filter(p=>p.done).length,rate=todays.length?Math.round(done/todays.length*100):0,total=state.target.subjects.reduce((n,x)=>n+ +x.score,0),school=state.target.school||'设置目标院校',major=state.target.major||'专业待设置';
 $('#topGreeting').textContent=greeting();$('#topDate').textContent=`${displayDate(new Date())} · ${getSessions(d).length} 个学习时段`;
 $('#profileSchool').textContent=school;$('#profileScore').textContent=total;
 $('#heroSchool').textContent=school;$('#heroSubline').textContent=state.target.school?`${major} · 总分目标 ${total}`:'点击“修改目标”，开始定制你的考研路线';
 $('#scoreTotal').textContent=total;
 $('#subjectScores').innerHTML=state.target.subjects.map(x=>`<div class="subject-line"><span>${esc(x.name)}</span><i><b style="width:${Math.min(100,+x.score/(x.name==='数学'||x.name==='专业课'?150:100)*100)}%;background:${x.color}"></b></i><b>${x.score}</b></div>`).join('');
 $('#homeTaskList').innerHTML=todays.length?todays.map(t=>`<button class="home-task ${t.done?'done':''} ${t.moved?'moved':''}" data-task-toggle="${t.id}"><span class="task-check">${t.done?'✓':''}</span><span><strong>${esc(t.title)}${t.moved?'<em class="moved-tag">顺延</em>':''}</strong><small>${esc(t.subject)} · ${t.minutes} 分钟</small></span><time>${esc(t.time)}</time></button>`).join(''):'<div class="empty-state"><b>🌱</b>今天还没有计划，先定一个小目标吧</div>';
 $('#todayProgressBar').style.width=rate+'%';$('#todayProgressText').textContent=`${done} / ${todays.length} 完成`;
 const summary=state.summaries[d]||{};$('#todayStudyMinutes').textContent=sessionMinutes(d);$('#todaySessionCount').textContent=getSessions(d).length;$('#todayMoodEmoji').textContent=summary.emoji||'🌱';$('#todayMoodText').textContent=summary.mood||'还没写总结';
 const exam=getExam();if(exam){const end=new Date(exam.date),diff=Math.max(0,end-new Date()),days=Math.floor(diff/86400000),hours=Math.floor(diff%86400000/3600000),mins=Math.floor(diff%3600000/60000);$('#homeDays').textContent=days;$('#homeClock').textContent=`${pad(hours)}:${pad(mins)}:${pad(Math.floor(diff%60000/1000))}`;$('#examDateText').textContent=`${end.getFullYear()}年${end.getMonth()+1}月${end.getDate()}日 · 已走过 ${Math.min(100,Math.max(0,Math.round((1-days/365)*100)))}%`;$('#examProgress').style.width=Math.min(100,Math.max(0,(1-days/365)*100))+'%'}else{$('#homeDays').textContent='—';$('#homeClock').textContent='';$('#examDateText').textContent='还没有倒计时，点击右侧添加';$('#examProgress').style.width='0%'}
 $('#reminderPill').textContent=state.reminder.enabled?'已开启':'已关闭';$('#reminderTimeText').textContent=state.reminder.time;$('#toggleReminderBtn').textContent=state.reminder.enabled?'关闭':'开启';
}
function planItemsForView(){const l=state.activePlanLevel,a=new Date(state.planAnchor+'T12:00:00');if(l==='day')return state.plans.filter(p=>p.level==='day'&&p.date===state.planAnchor).sort((x,y)=>x.time.localeCompare(y.time));if(l==='week'){const s=startOfWeek(a),e=addDays(s,7);return state.plans.filter(p=>p.level==='week'&&new Date(p.date+'T12:00:00')>=s&&new Date(p.date+'T12:00:00')<e)}if(l==='month'){const k=`${a.getFullYear()}-${pad(a.getMonth()+1)}`;return state.plans.filter(p=>p.level==='month'&&p.date===k)}return state.plans.filter(p=>p.level==='year'&&p.date===String(a.getFullYear()))}
function planTitle(){const l=state.activePlanLevel,a=new Date(state.planAnchor+'T12:00:00');if(l==='day')return `${state.planAnchor===today()?'今天':state.planAnchor<today()?'已过去':'未来'} · ${displayDate(a)}`;if(l==='week'){const s=startOfWeek(a);return `${displayDate(s)} - ${displayDate(addDays(s,6))}`}if(l==='month')return `${a.getFullYear()}年${a.getMonth()+1}月`;return `${a.getFullYear()}年`}
function renderPlan(){
 const labels={year:['ANNUAL PLAN','全年路线图'],month:['MONTHLY PLAN','本月里程碑'],week:['WEEKLY PLAN','本周任务'],day:['DAILY PLAN','今天 · '+displayDate(new Date(state.planAnchor+'T12:00:00'))]};
 $('#planLevelEyebrow').textContent=labels[state.activePlanLevel][0];$('#planBoardTitle').textContent=labels[state.activePlanLevel][1];$('#planDateText').textContent=planTitle();
 $$('#planTabs button').forEach(b=>b.classList.toggle('active',b.dataset.planLevel===state.activePlanLevel));$('#autoShiftToggle').checked=state.autoShift;$('#reminderTimeInput').value=state.reminder.time;$('#planReminderTime').textContent=state.reminder.time;
 const items=planItemsForView();const pending=state.plans.filter(p=>!p.done&&p.level==='day'&&p.date>=today()).length;$('#pendingTaskCount').textContent=pending;
 const dayCount=state.plans.filter(p=>p.level==='day'&&p.date===today()).length,dayDone=state.plans.filter(p=>p.level==='day'&&p.date===today()&&p.done).length;const comp=dayCount?Math.round(dayDone/dayCount*100):72;$('#weekCompletion').textContent=comp+'%';$('#plannedHours').textContent=Math.round(state.plans.filter(p=>p.level==='day'&&p.date>=dateKey(startOfWeek())).reduce((n,p)=>n+p.minutes,0)/60)+'h';
 $('#planBoard').innerHTML=items.length?items.map(p=>`<div class="plan-row ${p.done?'done':''} ${p.moved?'moved':''}" data-plan-id="${p.id}"><time>${esc(p.time)}</time><button class="task-check" data-plan-toggle="${p.id}">${p.done?'✓':''}</button><div><input class="edit-title" value="${esc(p.title)}" data-plan-title="${p.id}" /><p>${esc(p.subject)}${p.moved?' · 自动顺延':''}</p></div><div class="row-actions"><span class="duration">${p.minutes?p.minutes+'m':''}</span><button data-plan-delete="${p.id}">×</button></div></div>`).join(''):'<div class="empty-state"><b>🗓️</b>这个时间段还没有安排</div>';
 const y=dateKey(addDays(new Date(),-1)),missed=state.plans.filter(p=>p.level==='day'&&p.date===y&&!p.done);$('#assistantText').textContent=missed.length?`昨天有 ${missed.length} 项未完成，我会把它们放到今天精力比较好的时段。`:'昨天的任务全部完成啦，今天保持这个节奏！';
 $('#suggestionList').innerHTML=(missed.length?missed:state.plans.filter(p=>p.level==='day'&&p.date===today()&&!p.done).slice(0,3)).map(p=>`<label><input type="checkbox" checked /> 将「${esc(p.title)}」顺延至精力高峰时段</label>`).join('')||'<label><input type="checkbox" checked /> 保持当前节奏，预留 30 分钟机动时间</label>';
}
function renderCountdowns(){const now=Date.now();$('#countdownGrid').innerHTML=state.countdowns.map(c=>{const end=new Date(c.date),diff=Math.max(0,end-now),days=Math.floor(diff/86400000),hours=Math.floor(diff%86400000/3600000),mins=Math.floor(diff%3600000/60000),secs=Math.floor(diff%60000/1000);return `<article class="countdown-card ${esc(c.color)}" data-countdown-id="${c.id}" data-countdown-date="${esc(c.date)}"><div class="countdown-card-head"><span>${esc(c.name)}</span><button data-delete-countdown="${c.id}">✕</button></div><div class="countdown-number"><strong data-cd-days>${days}</strong><small>天</small></div><p data-cd-clock>${pad(hours)}:${pad(mins)}:${pad(secs)} · ${end.getFullYear()}/${pad(end.getMonth()+1)}/${pad(end.getDate())}</p><div class="study-add"><span>该目标累计学习</span><b>${minutesText(c.studyMinutes||0)}</b></div></article>`}).join('')||'<div class="empty-state card"><b>⏳</b>还没有倒计时</div>'}
function renderTimer(){const t=state.timer;const elapsed=t.elapsed+(t.running?Math.floor((Date.now()-t.startedAt)/1000):0);$('#timerDisplay').textContent=`${pad(Math.floor(elapsed/3600))}:${pad(Math.floor(elapsed%3600/60))}:${pad(elapsed%60)}`;$('#timerStatusPill').textContent=t.running?'专注中':'准备开始';$('#timerStatusPill').className='pill '+(t.running?'success':'');$('#timerStartBtn').innerHTML=t.running?'<span>❚❚</span> 暂停计时':'<span>▶</span> 开始专注';$('#timerSubject').value=t.subject;
 const total=totalSessionMinutes()+Math.floor(elapsed/60);$('#totalFocusHours').textContent=(total/60).toFixed(1);const start=startOfWeek(),vals=Array.from({length:7},(_,i)=>sessionMinutes(dateKey(addDays(start,i))));$('#timerWeekChart').innerHTML=vals.map((v,i)=>`<div class="mini-bar"><i style="height:${Math.max(5,Math.min(100,v/300*100))}%"></i><span>${['一','二','三','四','五','六','日'][i]}</span></div>`).join('');$('#weekFocusHours').textContent=(vals.reduce((a,b)=>a+b,0)/60).toFixed(1)+'h'}
function renderLog(){
 const d=today(),summary=state.summaries[d]||{};$('#dailySummaryTitle').textContent=`${displayDate(new Date())} · 今日复盘`;$('#dailySummaryInput').value=summary.text||'';$('#focusRating').value=summary.rating||4;$('#focusRatingValue').textContent=summary.rating||4;
 $$('#moodPicker button').forEach(b=>b.classList.toggle('active',b.dataset.mood===summary.mood));$('#summaryHours').textContent=`${sessionMinutes(d)} 分钟`;$('#summarySessionText').textContent=`共 ${getSessions(d).length} 个专注时段`;
 const files=summary.files||[];$('#summaryAttachments').innerHTML=files.length?files.map(f=>`<div class="attachment-item">${f.type&&f.type.startsWith('image')&&f.url?`<img src="${f.url}" alt="${esc(f.name)}">`:`<span style="font-size:24px">📄</span>`}<span>${esc(f.name)}</span></div>`).join(''):'<span class="empty-attachments">还没有附件，导入一张草稿照片试试吧</span>';
 const sorted=[...getSessions(d)].sort((a,b)=>a.time.localeCompare(b.time));$('#sessionTimeline').innerHTML=sorted.length?sorted.map(s=>`<div class="timeline-item"><time class="timeline-time">${esc(s.time)}</time><div class="timeline-content"><strong>${esc(s.subject)}</strong><p>${esc(s.content)}</p><small>${s.minutes} 分钟</small></div></div>`).join(''):'<div class="empty-state"><b>📚</b>还没有学习记录</div>';
 const start=startOfWeek(weekAnchor),end=addDays(start,6),vals=Array.from({length:7},(_,i)=>sessionMinutes(dateKey(addDays(start,i)))),max=Math.max(60,...vals);$('#weekRangeText').textContent=`${displayDate(start)} - ${displayDate(end)}`;$('#weeklyBarChart').innerHTML=vals.map((v,i)=>`<div class="day-bar ${dateKey(addDays(start,i))===today()?'today':''}"><b>${v?Math.round(v/60*10)/10:''}</b><i style="height:${Math.max(4,v/max*145)}px"></i><span>周${['一','二','三','四','五','六','日'][i]}</span></div>`).join('');
 const total=vals.reduce((a,b)=>a+b,0);$('#weekTotalHours').textContent=(total/60).toFixed(1);$('#weekTotalSessions').textContent=state.sessions.filter(s=>dateKey(new Date(s.date+'T12:00:00'))>=start&&dateKey(new Date(s.date+'T12:00:00'))<=end).length;$('#weekAvgHours').textContent=(total/7/60).toFixed(1);$('#weeklyNoteHours').textContent=(total/60).toFixed(1)+'h';$('#weeklyNoteRate').textContent='76%';$('#weeklyNoteDays').textContent=vals.filter(v=>v>0).length;$('#weeklySummaryInput').value=state.weeklySummaries[weekKey()]?.text||state.weeklySummaries[weekKey()]||'';
}
function treeHtml(node,depth=0){const active=state.selectedFolderId===node.id;const count=node.type==='set'?node.questions?.length:node.children?.length||0;return `<button class="tree-node ${active?'active':''}" data-folder-select="${node.id}" style="padding-left:${8+depth*6}px"><span>${node.type==='folder'?'📁':'📄'}</span><span>${esc(node.name)}</span><small>${count}</small></button>${node.children?.length?`<div class="tree-children">${node.children.map(c=>treeHtml(c,depth+1)).join('')}</div>`:''}`}
function setPracticeCount(set){return (set.questions||[]).reduce((n,q)=>n+(+q.practiceCount||(q.practiceHistory||[]).length),0)}function setMastery(set){const qs=set.questions||[];if(!qs.length)return 0;return Math.round(qs.reduce((n,q)=>{const c=+q.practiceCount||(q.practiceHistory||[]).length,ok=+q.correctCount||(q.practiceHistory||[]).filter(x=>x.correct).length;return n+(c?ok/c*100:0)},0)/qs.length)}function setProgress(set){const qs=set.questions||[];if(!qs.length)return 0;return Math.round(qs.filter(q=>(+q.masteryLevel||0)>=80).length/qs.length*100)}
function renderMistakes(){
 $('#folderTree').innerHTML=treeHtml(state.mistakes);const folder=currentFolder();$('#currentFolderName').textContent=folder.name;$('#currentFolderMeta').textContent=folder.type==='set'?`${folder.questions?.length||0} 道题 · 第 ${folder.round||1} 轮`: `${folder.children?.length||0} 个内容 · 专注复盘每一次失误`;
 const crumbs=[];let cur=folder;while(cur){crumbs.unshift(cur);cur=findParent(cur.id)}$('#folderBreadcrumb').innerHTML=crumbs.map((n,i)=>`${i?'<span>/</span>':''}<button data-folder-select="${n.id}">${esc(n.name)}</button>`).join('');
 let files=folder.type==='folder'?(folder.children||[]):[folder];if(!state.sortFilesAsc)files=[...files].reverse();$('#fileIndex').innerHTML=files.length?files.map(n=>`<button class="file-card" data-${n.type==='folder'?'folder-select':'set-open'}="${n.id}"><span class="file-icon">${n.type==='folder'?'📁':'📘'}</span><h3>${esc(n.name)}</h3><p>${n.type==='set'?`${n.questions?.length||0} 道题 · 已刷 ${setPracticeCount(n)} 次 · 掌握 ${setMastery(n)}%`:`${n.children?.length||0} 项内容`}</p><div class="file-meta"><span>${n.type==='set'?`完成 ${setProgress(n)}%`:'文件夹'}</span>${n.type==='set'?`<i class="mini-progress"><i style="width:${setProgress(n)}%"></i></i>`:''}</div></button>`).join(''):'<div class="empty-state"><b>📂</b>这个文件夹还是空的<br>点击右上角新建题集吧</div>';
 $('#reasonTagList').innerHTML=state.reasons.map(r=>`<button class="reason-tag" data-reason-open="${r.id}"><span>🏷️ ${esc(r.name)}</span><b>${r.questionIds.length}</b></button>`).join('');
 const books={};allQuestions().forEach(q=>{if(q.sourceBook)books[q.sourceBook]=(books[q.sourceBook]||0)+1});$('#sourceBookList').innerHTML=Object.entries(books).sort((a,b)=>b[1]-a[1]).map(([book,count])=>`<button class="reason-tag source-tag" data-source-open="${esc(book)}"><span>📚 ${esc(book)}</span><b>${count}</b></button>`).join('')||'<p class="muted-text source-empty">录入错题后自动按书籍归档</p>';
 const all=allQuestions();$('#todayReviewCount').textContent=state.reviewedToday||0;$('#reviewTip').textContent=state.reviewedToday?`今天已经复盘 ${state.reviewedToday} 道，继续保持！`:'开始第一轮刷题后，这里会记录你的复盘进度。';
 $('#topReasonList').innerHTML=state.reasons.slice().sort((a,b)=>b.questionIds.length-a.questionIds.length).slice(0,4).map(r=>`<div class="top-reason-row"><span>${esc(r.name)}</span><b>${r.questionIds.length}</b><i><b style="width:${Math.min(100,r.questionIds.length/Math.max(1,all.length)*200)}%"></b></i></div>`).join('');
}
function renderAll(){applyTheme(state.theme||'peach');renderHome();renderPlan();renderCountdowns();renderTimer();renderLog();renderMistakes();renderDashboard();}
function switchView(view){state.lastView=view;save();$$('.view').forEach(v=>v.classList.toggle('active',v.dataset.viewPanel===view));$$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));window.scrollTo({top:0,behavior:'smooth'});if(view==='mistakes')renderMistakes();if(view==='log')renderLog();if(view==='dashboard')renderDashboard()}
function toast(text,type=''){const el=document.createElement('div');el.className='toast '+type;el.innerHTML=`<span>${type==='success'?'✓':type==='warn'?'!':'🐱'}</span>${esc(text)}`;$('#toastContainer').appendChild(el);setTimeout(()=>{el.style.opacity='0';el.style.transform='translateY(8px)';setTimeout(()=>el.remove(),250)},2600)}
function openTarget(){const t=state.target;$('#targetSchoolInput').value=t.school;$('#targetMajorInput').value=t.major;$('#targetDateInput').value=t.date;$('#subjectEditor').innerHTML=t.subjects.map((s,i)=>`<label class="subject-edit-row"><span>${esc(s.name)}</span><input type="number" data-subject-score="${i}" min="0" max="150" value="${s.score}" /></label>`).join('');updateTargetTotal();$('#targetDialog').showModal()}
function updateTargetTotal(){const total=$$('[data-subject-score]',$('#subjectEditor')).reduce((n,i)=>n+ +i.value,0);$('#targetTotalPreview').textContent=total}
function autoShiftPlans(force=false){if(!state.autoShift&&!force)return 0;if(state.lastAutoShift===today()&&!force)return 0;const y=dateKey(addDays(new Date(),-1,'T12:00:00')),missed=state.plans.filter(p=>p.level==='day'&&p.date===y&&!p.done);if(!missed.length)return 0;missed.forEach((p,i)=>{state.plans.push({...p,id:uid('plan'),date:today(),time:i?'15:00':'09:00',done:false,moved:true})});state.lastAutoShift=today();save();return missed.length}
function renderPractice(){
 const overlay=$('#practiceOverlay');
 if(!state.practice){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');return}
 const practice=state.practice,set=practice.setData||findNode(practice.setId),questions=(set?.questions||[]).filter(q=>practice.order.includes(q.id)),q=questions.find(x=>x.id===practice.order[practice.index]);
 if(!q){closePractice();return}
 overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');
 const count=+q.practiceCount||(q.practiceHistory||[]).length,correct=+q.correctCount||(q.practiceHistory||[]).filter(x=>x.correct).length,mastery=count?Math.round(correct/count*100):0;
 $('#practiceSetName').textContent=set?.name||'错题练习';$('#practiceProgressText').textContent=`第 ${practice.index+1} / ${practice.order.length} 题 · 第 ${practice.round} 轮`;$('#practiceRoundPill').textContent=`ROUND ${practice.round}`;$('#questionIndex').textContent=`Q${practice.index+1}`;$('#questionSubject').textContent=q.subject;$('#questionReason').textContent=q.reason||'待标记';$('#questionSource').textContent=[q.sourceBook,q.page,q.number].filter(Boolean).join(' · ')||'未设置来源';$('#questionStats').textContent=`刷题 ${count} 次 · 掌握度 ${mastery}%`;$('#questionTitle').textContent=q.title;$('#questionAnalysis').textContent=q.analysis||'暂无解析，可在错题整理时补充。';$('#practiceAnswer').value=practice.answers?.[q.id]?.text||'';$('#analysisPanel').hidden=true;
 $('#questionMap').innerHTML=practice.order.map((id,i)=>`<button class="${i===practice.index?'current':practice.answers?.[id]?'done':''}" data-question-jump="${i}">${i+1}</button>`).join('');$('#practiceReasonOptions').innerHTML=state.reasons.map(r=>`<button class="${q.reason===r.name?'active':''}" data-set-question-reason="${esc(r.name)}">${esc(r.name)}</button>`).join('');clearCanvas()
}
document.addEventListener('click',e=>{
 if(e.target.closest('#addCountdownBtn')){const x=new Date();x.setDate(x.getDate()+30);$('#countdownDateInput').value=`${dateKey(x)}T09:00`;$('#countdownDialog').showModal();return}
 const delCd=e.target.closest('[data-delete-countdown]');if(delCd){state.countdowns=state.countdowns.filter(c=>c.id!==delCd.dataset.deleteCountdown);save(true);renderCountdowns();renderHome();toast('倒计时已删除');return}
 if(e.target.closest('#timerStartBtn')){if(state.timer.running){state.timer.elapsed+=Math.floor((Date.now()-state.timer.startedAt)/1000);state.timer.running=false;state.timer.startedAt=null;toast('计时已暂停')}else{state.timer.running=true;state.timer.startedAt=Date.now();toast('开始专注，今天也要稳稳向前','success')}save(true);renderTimer();return}
 if(e.target.closest('#timerResetBtn')){if(!confirm('确定重置当前计时吗？'))return;state.timer={...state.timer,running:false,startedAt:null,elapsed:0};save(true);renderTimer();toast('计时已重置');return}
 if(e.target.closest('#timerFinishBtn')){const extra=state.timer.elapsed+(state.timer.running?Math.floor((Date.now()-state.timer.startedAt)/1000):0);if(extra<1){toast('还没有可保存的学习时长','warn');return}const mins=Math.max(1,Math.round(extra/60));state.timer={...state.timer,running:false,startedAt:null,elapsed:0};addSession(state.timer.subject,mins,`${state.timer.subject}专注学习`);return}
 if(e.target.closest('#addManualSessionBtn')){$('#manualSessionDialog').showModal();return}
 if(e.target.closest('#dailyCheckinBtn')){switchView('log');setTimeout(()=>{$('#dailySummaryInput').focus();$('#dailySummaryInput').scrollIntoView({behavior:'smooth',block:'center'})},200);return}
 const mood=e.target.closest('[data-mood]');if(mood){const d=today(),s=state.summaries[d]||(state.summaries[d]={});s.mood=mood.dataset.mood;s.emoji=mood.dataset.emoji;save(true);renderLog();renderHome();toast('今日状态已保存','success');return}
 if(e.target.closest('#addSummaryFileBtn')){$('#summaryFileInput').click();return}
 if(e.target.closest('#importWeeklyBtn')){$('#weeklyFileInput').click();return}
 if(e.target.closest('#saveWeeklyBtn')){state.weeklySummaries[weekKey()]={text:$('#weeklySummaryInput').value,updatedAt:Date.now()};save(true);toast('本周总结已保存','success');return}
 if(e.target.closest('#weekPrevBtn')||e.target.closest('#weekNextBtn')){weekAnchor=addDays(weekAnchor,e.target.closest('#weekPrevBtn')?-7:7);renderLog();return}
 if(e.target.closest('#createMistakeNodeBtn')){$('#mistakeNodeNameInput').value='';$('#parentFolderHint').textContent=`将创建在「${currentFolder().name}」内。`;$('#mistakeNodeDialog').showModal();return}
 const nt=e.target.closest('[data-node-type]');if(nt){$$('.node-type button').forEach(x=>x.classList.toggle('active',x===nt));$('#mistakeNodeReasonAggregate').parentElement.style.display=nt.dataset.nodeType==='folder'?'flex':'none';return}
 if(e.target.closest('#rootFolderBtn')){state.selectedFolderId='root';save();renderMistakes();return}
 if(e.target.closest('#sortFilesBtn')){state.sortFilesAsc=!state.sortFilesAsc;save();renderMistakes();return}
 if(e.target.closest('#refreshIndexBtn')){renderMistakes();toast('文件索引已刷新','success');return}
 if(e.target.closest('#practiceCurrentBtn')){const set=allSets().find(s=>s.id===state.selectedFolderId)||allSets()[0];if(set)openPractice(set.id);else toast('请先创建题集','warn');return}
 if(e.target.closest('#closePracticeBtn')){saveCurrentAnswer();closePractice();return}
 if(e.target.closest('#finishPracticeBtn')){saveCurrentAnswer();finishPracticeRound();return}
 if(e.target.closest('#nextQuestionBtn')){saveCurrentAnswer();nextQuestion();return}
 if(e.target.closest('#showAnswerBtn')){$('#analysisPanel').hidden=false;return}
 if(e.target.closest('#quickAddReasonBtn')){const name=prompt('输入新的错因名称：');if(name){const r={id:uid('reason'),name,questionIds:[]};state.reasons.push(r);const p=state.practice,set=p?.setData||findNode(p?.setId),q=(set?.questions||[]).find(x=>x.id===p?.order[p?.index]);if(q){q.reason=name;r.questionIds.push(q.id)}save(true);renderPractice();renderMistakes();toast('新错因已创建','success')}return}
})
document.addEventListener('click',e=>{
 if(e.target.closest('#focusModeBtn')){document.body.classList.toggle('focus-mode');toast(document.body.classList.contains('focus-mode')?'已开启低干扰专注模式':'已退出专注模式');return}
 if(e.target.closest('#resetDemoBtn')){if(confirm('确定清空全部计划和本地记录吗？此操作不可恢复。')){localStorage.removeItem(STORAGE_KEY);state=emptyState();save(true);applyTheme('peach');renderAll();switchView('home');toast('所有本地记录已清空','success')}return}
})
document.addEventListener('change',e=>{
 if(e.target.matches('[data-plan-title]')){const p=state.plans.find(x=>x.id===e.target.dataset.planTitle);if(p){p.title=e.target.value.trim()||'未命名计划';save();renderHome()}}
 if(e.target.id==='autoShiftToggle'){state.autoShift=e.target.checked;save();toast(state.autoShift?'已开启智能顺延':'已关闭智能顺延')}
 if(e.target.id==='timerSubject'){state.timer.subject=e.target.value;save()}
 if(e.target.id==='summaryFileInput'){handleSummaryFiles(e.target.files)}
 if(e.target.id==='weeklyFileInput'){const f=e.target.files[0];if(!f)return;if(f.type.startsWith('image/'))toast('图片已作为周总结附件（演示）','success');else{const r=new FileReader();r.onload=()=>{const text=String(r.result);$('#weeklySummaryInput').value+='\n\n【导入 '+f.name+'】\n'+text;toast('文件内容已导入','success')};r.readAsText(f)}}
 if(e.target.id==='planFileInput'){const f=e.target.files[0];if(!f)return;handlePlanFile(f);e.target.value=''}
})
document.addEventListener('input',e=>{
 if(e.target.id==='dailySummaryInput'){const d=today(),s=state.summaries[d]||(state.summaries[d]={});s.text=e.target.value;$('#saveState').textContent='正在自动保存...';clearTimeout(window.__summaryTimer);window.__summaryTimer=setTimeout(()=>{save(true);$('#saveState').textContent='✓ 已自动保存'},450)}
 if(e.target.id==='focusRating'){const d=today(),s=state.summaries[d]||(state.summaries[d]={});s.rating=+e.target.value;$('#focusRatingValue').textContent=e.target.value;save()}
 if(e.target.matches('[data-subject-score]'))updateTargetTotal()
 if(e.target.id==='practiceAnswer'&&state.practice){const q=state.practice.order[state.practice.index];state.practice.answers[q]={text:e.target.value};syncPracticeSession();save()}
})
function extractDocumentText(file){
 const name=file.name.toLowerCase();
 if(/\.(xlsx|xls|csv)$/.test(name)){if(!window.XLSX)throw new Error('Excel 解析组件未加载');return file.arrayBuffer().then(buffer=>{const wb=XLSX.read(buffer,{type:'array'});return wb.SheetNames.map(n=>n+'\n'+XLSX.utils.sheet_to_csv(wb.Sheets[n])).join('\n\n')})}
 if(name.endsWith('.docx')){if(!window.mammoth)throw new Error('Word 解析组件未加载');return file.arrayBuffer().then(buffer=>mammoth.extractRawText({arrayBuffer:buffer}).then(r=>r.value))}
 if(name.endsWith('.doc'))return Promise.reject(new Error('旧版 .doc 请另存为 .docx'));
 return file.text()
}
async function handleSummaryFiles(files){const d=today(),s=state.summaries[d]||(state.summaries[d]={}),list=s.files||(s.files=[]);for(const f of [...files]){const item={id:uid('file'),name:f.name,type:f.type,size:f.size};try{if(f.type.startsWith('image/')){item.url=await new Promise(resolve=>{const r=new FileReader();r.onload=()=>resolve(String(r.result));r.readAsDataURL(f)})}else if(/\.(txt|md|xlsx|xls|csv|docx)$/i.test(f.name)){item.content=await extractDocumentText(f)}list.push(item);save();renderLog()}catch(e){toast(f.name+' 导入失败：'+e.message,'warn')}}toast('已保存 '+files.length+' 个复盘附件','success')}
function saveCurrentAnswer(){if(!state.practice)return;const q=state.practice.order[state.practice.index];state.practice.answers[q]={text:$('#practiceAnswer').value};syncPracticeSession();save(true)}
function syncPracticeSession(){if(!state.practice)return;const p=state.practice,set=p.setData||findNode(p.setId);if(!set)return;set.session=set.session||{};set.session.order=p.order;set.session.index=p.index;set.session.round=p.round;set.session.answers=p.answers;set.session.done=false;if(p.setId.startsWith('reason:')){const key=p.setId;state.reasonSessions=state.reasonSessions||{};state.reasonSessions[key]={...set.session}}}
function nextQuestion(){if(!state.practice)return;const p=state.practice;if(p.index<p.order.length-1){p.index++;syncPracticeSession();save(true);renderPractice()}else finishPracticeRound()}
function finishPracticeRound(){if(!state.practice)return;const p=state.practice,set=p.setData||findNode(p.setId),answered=Object.keys(p.answers||{}).length;state.reviewedToday=(state.reviewedToday||0)+answered;if(set){set.round=(set.round||1)+1;set.session={seed:Date.now()+7,order:[],previousOrder:p.order,index:0,round:set.round,answers:{},done:true};if(p.setId.startsWith('reason:')&&state.reasonSessions)state.reasonSessions[p.setId]={...set.session}}state.practice=null;$('#practiceOverlay').classList.remove('open');$('#practiceOverlay').setAttribute('aria-hidden','true');save(true);renderMistakes();toast(`第 ${p.round} 轮完成！下次将按新的乱序继续`,'success')}
document.addEventListener('click',e=>{
 if(e.target.closest('#saveTargetBtn')){const scores=$$('[data-subject-score]',$('#subjectEditor')).map((i,n)=>({...state.target.subjects[n],score:+i.value||0}));state.target={school:$('#targetSchoolInput').value.trim()||'我的目标院校',major:$('#targetMajorInput').value.trim()||'目标专业',date:$('#targetDateInput').value,subjects:scores};const exam=state.countdowns.find(c=>c.name.includes('考研'));if(exam&&state.target.date)exam.date=state.target.date+'T08:30';save(true);$('#targetDialog').close();renderAll();toast('目标已更新，一起向它靠近！','success');return}
 if(e.target.closest('#saveCountdownBtn')){const name=$('#countdownNameInput').value.trim(),date=$('#countdownDateInput').value;if(!name||!date)return;state.countdowns.push({id:uid('cd'),name,date,color:$('#countdownColorInput').value,studyMinutes:0});save(true);$('#countdownDialog').close();renderCountdowns();toast('新倒计时已创建','success');return}
 if(e.target.closest('#savePlanItemBtn')){const title=$('#planItemTitleInput').value.trim();if(!title)return;savePlanItems({title,subject:$('#planItemSubjectInput').value,time:$('#planItemTimeInput').value,minutes:+$('#planItemMinutesInput').value||60,repeat:$('#planRepeatInput').value,count:+$('#planRepeatCountInput').value||1,importance:$('#planImportanceInput').value});$('#planItemDialog').close();$('#planItemTitleInput').value='';renderPlan();renderHome();toast('计划已添加','success');return}
 if(e.target.closest('#saveManualSessionBtn')){const content=$('#manualContentInput').value.trim();if(!content)return;addSession($('#manualSubjectInput').value,+$('#manualMinutesInput').value,content);$('#manualSessionDialog').close();$('#manualContentInput').value='';return}
 if(e.target.closest('#saveMistakeNodeBtn')){const type=$('.node-type button.active').dataset.nodeType,name=$('#mistakeNodeNameInput').value.trim();if(!name)return;if(type==='folder'&&$('#mistakeNodeReasonAggregate').checked){const r={id:uid('reason'),name,questionIds:[]};state.reasons.push(r);createMistakeNode('folder',name);toast('错因汇总文件夹已创建，可在右侧标签中刷题','success')}else createMistakeNode(type,name);$('#mistakeNodeDialog').close();return}
 if(e.target.closest('#saveReminderTime')){state.reminder.time=$('#reminderTimeInput').value||'21:30';save(true);renderHome();renderPlan();toast('晚间提醒时间已保存','success');return}
})

document.addEventListener('click',e=>{
 const mode=e.target.closest('[data-write-mode]');if(mode){$$('[data-write-mode]').forEach(b=>b.classList.toggle('active',b===mode));const hand=mode.dataset.writeMode==='hand';$('#practiceAnswer').hidden=hand;$('#handwritingWrap').hidden=!hand;return}
 if(e.target.closest('#clearCanvasBtn')){clearCanvas();return}
})
const canvas=$('#practiceCanvas');let drawing=false,lastPoint=null;
function canvasPoint(ev){const r=canvas.getBoundingClientRect();return{x:(ev.clientX-r.left)*canvas.width/r.width,y:(ev.clientY-r.top)*canvas.height/r.height}}
canvas.addEventListener('pointerdown',ev=>{drawing=true;lastPoint=canvasPoint(ev);canvas.setPointerCapture(ev.pointerId)});
canvas.addEventListener('pointermove',ev=>{if(!drawing)return;const p=canvasPoint(ev),ctx=canvas.getContext('2d');ctx.strokeStyle='#3d3449';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(lastPoint.x,lastPoint.y);ctx.lineTo(p.x,p.y);ctx.stroke();lastPoint=p});
canvas.addEventListener('pointerup',()=>drawing=false);canvas.addEventListener('pointercancel',()=>drawing=false);
window.addEventListener('beforeunload',()=>save(true));
function tick(){renderTimer();const now=Date.now();$$('.countdown-card').forEach(card=>{const diff=Math.max(0,new Date(card.dataset.countdownDate)-now);card.querySelector('[data-cd-days]').textContent=Math.floor(diff/86400000);card.querySelector('[data-cd-clock]').textContent=`${pad(Math.floor(diff%86400000/3600000))}:${pad(Math.floor(diff%3600000/60000))}:${pad(Math.floor(diff%60000/1000))}`});if(state.duo.duoRunning){const sec=state.duo.focusSeconds+Math.floor((Date.now()-state.duo.startedAt)/1000);$('#duoRoomTimer').textContent=`${pad(Math.floor(sec/3600))}:${pad(Math.floor(sec%3600/60))}:${pad(sec%60)}`}}
setInterval(tick,1000);
function checkReminder(){if(!state.reminder.enabled)return;const now=new Date(),key=today()+'T'+state.reminder.time;const hm=`${pad(now.getHours())}:${pad(now.getMinutes())}`;if(hm===state.reminder.time&&state.reminder.lastNotified!==key){state.reminder.lastNotified=key;save(true);if('Notification'in window&&Notification.permission==='granted')new Notification('小叮当提醒：确认明天的学习计划',{body:'花 3 分钟看看明天要完成什么，然后安心休息吧。'});toast('该确认明天的学习计划啦 🌙','warn')}}
setInterval(checkReminder,30000);
const THEME_META={peach:{emoji:'🍑',label:'蜜桃奶油',color:'#fff8ef'},sky:{emoji:'☁️',label:'晴空蓝',color:'#f1faff'},mint:{emoji:'🌿',label:'薄荷汽水',color:'#f2fcf8'},lavender:{emoji:'🫧',label:'香芋云朵',color:'#f8f5ff'},lemon:{emoji:'🍋',label:'柠檬晴天',color:'#fffcef'}};
function applyTheme(name){const key=THEME_META[name]?name:'peach';state.theme=key;document.body.dataset.theme=key;const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=THEME_META[key].color;const btn=$('#themeBtn');if(btn){btn.textContent=THEME_META[key].emoji;btn.title=`当前主题：${THEME_META[key].label}`;}$$('[data-theme-choice]').forEach(x=>x.classList.toggle('active',x.dataset.themeChoice===key))}
const shifted=autoShiftPlans();applyTheme(state.theme||'peach');renderAll();if(state.practice)renderPractice();if(shifted)setTimeout(()=>toast('已根据昨晚完成情况自动顺延 '+shifted+' 项任务','success'),500);if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
document.addEventListener('click',e=>{if(e.target.closest('#themeBtn')){applyTheme(state.theme||'peach');$('#themeDialog').showModal();return}if(e.target.closest('#closeThemeBtn')||e.target.closest('#doneThemeBtn')){$('#themeDialog').close();return}const theme=e.target.closest('[data-theme-choice]');if(theme){applyTheme(theme.dataset.themeChoice);save(true);toast('已换上「'+THEME_META[theme.dataset.themeChoice].label+'」主题','success');return}});

function clampPercent(v){return Math.max(0,Math.min(100,Math.round(v)))}
function dayTaskRate(day){const tasks=state.plans.filter(p=>p.level==='day'&&p.date===day);return tasks.length?Math.round(tasks.filter(p=>p.done).length/tasks.length*100):0}
function allAnswerCount(){return allSets().reduce((n,s)=>n+(s.questions||[]).reduce((m,q)=>m+(+q.practiceCount||(q.practiceHistory||[]).length||(s.session?.answers?.[q.id]?1:0)),0),0)}
function studyStreak(){let streak=0;for(let i=0;i<120;i++){const d=dateKey(addDays(new Date(),-i));const active=sessionMinutes(d)>0||!!state.summaries[d]?.text;if(active)streak++;else if(i>0)break}return streak}
function masteryScore(){const tasks=state.plans.filter(p=>p.level==='day');const completion=tasks.length?tasks.filter(p=>p.done).length/tasks.length*100:0;const questions=allQuestions().length;const answers=allAnswerCount();const reviewed=questions?Math.min(100,answers/questions*100):0;const rating=+(state.summaries[today()]?.rating||3);return clampPercent(38+completion*.32+reviewed*.22+rating*3+Math.min(studyStreak(),7))}
function renderDashboard(){
 const d=today(),tasks=state.plans.filter(p=>p.level==='day'&&p.date===d),done=tasks.filter(p=>p.done).length,completion=tasks.length?Math.round(done/tasks.length*100):0,questions=allQuestions(),reviewed=questions.filter(q=>(+q.practiceCount||(q.practiceHistory||[]).length)).length,mastery=masteryScore(),streak=studyStreak();
 $('#dashboardCompletion').textContent=completion+'%';$('#dashboardCompletionNote').textContent=done+' / '+tasks.length+' 项完成';$('#dashboardMistakes').textContent=questions.length;$('#dashboardMistakeNote').textContent='待复习 '+Math.max(0,questions.length-reviewed)+' 道';$('#dashboardMastery').textContent=mastery+'%';
 const history=state.masteryHistory||(state.masteryHistory=[]);const prev=[...history].reverse().find(x=>x.date!==d)?.value??Math.max(0,mastery-5);if(!history.some(x=>x.date===d)){history.push({date:d,value:mastery});if(history.length>90)history.splice(0,history.length-90);save()}const delta=mastery-prev;$('#dashboardMasteryDelta').textContent=`较上次 ${delta>=0?'+':''}${delta}%`;$('#dashboardStreak').textContent=streak+' 天';
 const totalTarget=state.target.subjects.reduce((n,s)=>n+ +s.score,0),estimated=Math.round(totalTarget*Math.max(.35,completion/100));const exam=getExam(),days=exam?Math.max(0,Math.ceil((new Date(exam.date)-new Date())/86400000)):0;$('#dashboardTargetScore').textContent=totalTarget;$('#dashboardCurrentScore').textContent=estimated+' 分';$('#dashboardTargetPercent').textContent=Math.round(estimated/Math.max(1,totalTarget)*100)+'%';$('#dashboardTargetBar').style.width=Math.min(100,estimated/Math.max(1,totalTarget)*100)+'%';$('#targetDaysPill').textContent='剩余 '+days+' 天';const averageMinutes=days?Math.max(30,Math.round((totalTarget-estimated)/Math.max(1,days)*6)):0;$('#dashboardSuggestion').textContent=days?`距离考试还有 ${days} 天，建议每天提高约 ${averageMinutes} 分钟有效学习投入。`:'设置考试日期后生成每日建议。';
 const cells=[];for(let i=83;i>=0;i--){const day=dateKey(addDays(new Date(),-i)),m=sessionMinutes(day),level=m===0?0:m<=30?1:m<=90?2:m<=180?3:4;cells.push(`<span class="heat-cell level-${level}" title="${day} · ${m} 分钟"></span>`)} $('#dashboardHeatmap').innerHTML=cells.join('');
 const answeredIds=new Set(allSets().flatMap(x=>Object.keys(x.session?.answers||{})));
 const colors=['#ff8eae','#6eb9ff','#57d3b4','#9485ff'];$('#dashboardMasteryList').innerHTML=state.target.subjects.map((s,i)=>{const mins=state.sessions.filter(x=>x.subject===s.name).reduce((n,x)=>n+(+x.minutes||0),0),answered=allSets().flatMap(x=>x.questions||[]).filter(q=>q.subject===s.name&&answeredIds.has(q.id)).length,val=clampPercent(42+Math.min(34,mins/12)+Math.min(20,answered*4)+(state.summaries[d]?.rating||3)*2);return `<div class="mastery-row"><span>${esc(s.name)}</span><i><b style="width:${val}%;background:linear-gradient(90deg,${colors[i%colors.length]},var(--purple))"></b></i><em>+${Math.max(1,Math.round(val/18))}%</em></div>`}).join('');
 $('#dashboardTodayTasks').textContent=done+' / '+tasks.length;$('#dashboardCountdown').textContent=exam?days+' 天':'—';$('#dashboardStudyTime').textContent=minutesText(sessionMinutes(d));$('#dashboardReviewCount').textContent=Math.max(0,questions.length-reviewed);if(!state.reports?.[d]){state.reports=state.reports||{};state.reports[d]=generateLearningReport();save()}$('#dashboardReportInput').value=state.reports[d];applySummaryMode(state.summaries[d]||{});
}
function generateLearningReport(){const d=today(),done=state.plans.filter(p=>p.level==='day'&&p.date===d&&p.done).length,total=state.plans.filter(p=>p.level==='day'&&p.date===d).length,questions=allQuestions(),reviewed=allAnswerCount(),mastery=masteryScore(),streak=studyStreak(),exam=getExam(),days=exam?Math.max(0,Math.ceil((new Date(exam.date)-new Date())/86400000)):0;return [`${displayDate(new Date())} 学习报告`,'',`今日任务：完成 ${done} / ${total} 项。`,`学习时长：${minutesText(sessionMinutes(d))}。`,`错题复盘：题库共 ${questions.length} 道，已完成 ${reviewed} 道复习。`,`当前掌握度：${mastery}%，连续打卡 ${streak} 天。`,`目标进度：总分目标 ${state.target.subjects.reduce((n,s)=>n+ +s.score,0)} 分，距离考试 ${days} 天。`,'',`今日建议：${total&&done<total?'优先完成剩余任务，并在睡前复盘 10 分钟。':'保持当前节奏，安排 20 分钟错题回看。'}`].join('\n')}


function applySummaryMode(summary={}){const mode=summary.summaryMode==='hand'?'hand':'text';$$('[data-summary-mode]').forEach(b=>b.classList.toggle('active',b.dataset.summaryMode===mode));const text=$('#dailySummaryInput'),wrap=$('#summaryHandwritingWrap');if(text)text.hidden=mode==='hand';if(wrap)wrap.hidden=mode!=='hand';if(mode==='hand')requestAnimationFrame(()=>loadSummaryDrawing(summary.handwriting||''))}
function loadSummaryDrawing(data){const c=$('#summaryCanvas'),ctx=c?.getContext('2d');if(!c||!ctx)return;ctx.clearRect(0,0,c.width,c.height);if(!data)return;const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,c.width,c.height);img.src=data}
function saveSummaryDrawing(){const c=$('#summaryCanvas');if(!c)return;const d=today(),s=state.summaries[d]||(state.summaries[d]={});s.handwriting=c.toDataURL('image/png');s.summaryMode='hand';save(true);$('#saveState').textContent='✓ 手写总结已保存'}
function summaryPoint(ev,c){const r=c.getBoundingClientRect();return{x:(ev.clientX-r.left)*c.width/r.width,y:(ev.clientY-r.top)*c.height/r.height}}
const summaryCanvas=$('#summaryCanvas');let summaryDrawing=false,summaryLast=null;
if(summaryCanvas){summaryCanvas.addEventListener('pointerdown',ev=>{summaryDrawing=true;summaryLast=summaryPoint(ev,summaryCanvas);summaryCanvas.setPointerCapture(ev.pointerId)});summaryCanvas.addEventListener('pointermove',ev=>{if(!summaryDrawing)return;const p=summaryPoint(ev,summaryCanvas),ctx=summaryCanvas.getContext('2d');ctx.strokeStyle='#3d3449';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(summaryLast.x,summaryLast.y);ctx.lineTo(p.x,p.y);ctx.stroke();summaryLast=p});summaryCanvas.addEventListener('pointerup',()=>{summaryDrawing=false;saveSummaryDrawing()});summaryCanvas.addEventListener('pointercancel',()=>{summaryDrawing=false})}
function exportLearningReport(){const lines=$('#dashboardReportInput').value,totalTarget=state.target.subjects.reduce((n,s)=>n+ +s.score,0),d=today(),html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title>小叮当学习报告</title><style>body{font-family:"Microsoft YaHei",sans-serif;color:#3d3449;padding:44px;line-height:1.8}h1{color:#ff846e}pre{white-space:pre-wrap;font:14px/1.9 "Microsoft YaHei",sans-serif;background:#fff8ef;padding:24px;border-radius:16px}small{color:#7d7488}</style></head><body><h1>小叮当 · 学习报告</h1><small>导出时间：${new Date().toLocaleString('zh-CN')}</small><pre>${esc(lines)}</pre><p>目标总分：${totalTarget} 分 · 学习时长：${sessionMinutes(d)} 分钟 · 连续打卡：${studyStreak()} 天</p></body></html>`;const w=window.open('','_blank');if(!w){toast('浏览器阻止了导出窗口，请允许弹出窗口','warn');return}w.document.write(html);w.document.close();w.focus();setTimeout(()=>w.print(),350)}
document.addEventListener('click',e=>{const mode=e.target.closest('[data-summary-mode]');if(mode){const d=today(),s=state.summaries[d]||(state.summaries[d]={});if(mode.dataset.summaryMode==='hand'&&!s.handwriting)loadSummaryDrawing('');s.summaryMode=mode.dataset.summaryMode;save();applySummaryMode(s);return}if(e.target.closest('#clearSummaryCanvasBtn')){const c=$('#summaryCanvas');if(c)c.getContext('2d').clearRect(0,0,c.width,c.height);saveSummaryDrawing();return}if(e.target.closest('#saveSummaryCanvasBtn')){saveSummaryDrawing();return}if(e.target.closest('#refreshReportBtn')){state.reports=state.reports||{};state.reports[today()]=generateLearningReport();save(true);$('#dashboardReportInput').value=state.reports[today()];toast('学习报告已重新生成','success');return}if(e.target.closest('#exportReportBtn')){const d=today();state.reports=state.reports||{};state.reports[d]=$('#dashboardReportInput').value||generateLearningReport();exportLearningReport();return}});
document.addEventListener('input',e=>{if(e.target.id==='dashboardReportInput'){state.reports=state.reports||{};state.reports[today()]=e.target.value;$('#reportSaveState').textContent='正在自动保存...';clearTimeout(window.__reportTimer);window.__reportTimer=setTimeout(()=>{save(true);$('#reportSaveState').textContent='✓ 已自动保存'},400)}});

function buildPlanDates(mode,count,startKey){const dates=[];let d=new Date(startKey+'T12:00:00'),guard=0;while(dates.length<Math.max(1,Math.min(365,count))&&guard<800){const day=d.getDay();if(mode==='daily'||mode==='once'){if(dates.length===0||mode==='daily')dates.push(dateKey(d))}else if(mode==='weekdays'){if(day!==0&&day!==6)dates.push(dateKey(d))}else if(mode==='every2days'){if(dates.length===0||((guard%2)===0))dates.push(dateKey(d))}else if(mode==='weekly'){if(dates.length===0||guard%7===0)dates.push(dateKey(d))}d=addDays(d,1);guard++}return dates.slice(0,Math.max(1,Math.min(365,count)))}
function addPlanBatch(opts){const level=opts.level||state.activePlanLevel;if(level!=='day'){state.plans.push({id:uid('plan'),level,date:level==='week'?dateKey(startOfWeek(new Date(state.planAnchor+'T12:00:00'))):level==='month'?state.planAnchor.slice(0,7):String(new Date(state.planAnchor+'T12:00:00').getFullYear()),time:opts.time||'09:00',title:opts.title,subject:opts.subject||'其他',minutes:+opts.minutes||60,importance:opts.importance||'medium',done:false,moved:false});return 1}const dates=buildPlanDates(opts.repeat||'once',+opts.count||1,opts.date||state.planAnchor);dates.forEach(date=>state.plans.push({id:uid('plan'),level:'day',date,time:opts.time||'09:00',title:opts.title,subject:opts.subject||'其他',minutes:+opts.minutes||60,importance:opts.importance||'medium',done:false,moved:false}));return dates.length}
function savePlanItems(opts){const count=addPlanBatch(opts);save(true);return count}
function spreadsheetRowsToPlans(rows){if(!rows||!rows.length)return 0;const headers=rows[0].map(x=>String(x??'').trim().toLowerCase());const hasHeader=headers.some(x=>/标题|计划|任务|title/.test(x));const alias=(keys)=>headers.findIndex(h=>keys.some(k=>h.includes(k)));const idx={title:hasHeader?alias(['标题','计划','任务','title']):2,date:hasHeader?alias(['日期','date']):0,time:hasHeader?alias(['时间','time']):1,subject:hasHeader?alias(['科目','subject']):3,minutes:hasHeader?alias(['时长','分钟','minutes']):4,repeat:hasHeader?alias(['重复','周期','repeat']):-1,count:hasHeader?alias(['次数','repeatcount']):-1};let added=0;for(const row of rows.slice(hasHeader?1:0)){const title=String(row[idx.title]??'').trim();if(!title)continue;const mode=String(idx.repeat>=0?row[idx.repeat]??'once':row[5]||'once').trim();const count=+String(idx.count>=0?row[idx.count]??1:row[6]||1)||1;added+=addPlanBatch({title,date:String(row[idx.date]??'').trim()||state.planAnchor,time:String(row[idx.time]??'').trim()||'09:00',subject:String(row[idx.subject]??'').trim()||'其他',minutes:+row[idx.minutes]||60,repeat:/每天|daily/i.test(mode)?'daily':/工作日|weekday/i.test(mode)?'weekdays':/隔天|every2/i.test(mode)?'every2days':/每周|weekly/i.test(mode)?'weekly':'once',count})}return added}
async function handlePlanFile(file){const name=file.name.toLowerCase();try{let count=0;if(/\.(xlsx|xls|csv)$/.test(name)){const buffer=await file.arrayBuffer();const wb=XLSX.read(buffer,{type:'array'});const rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,defval:''});count=spreadsheetRowsToPlans(rows)}else if(name.endsWith('.docx')){if(!window.mammoth)throw new Error('Word 解析组件未加载');const result=await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()});count=parsePlanFile(result.value,file.name)}else if(name.endsWith('.doc')){throw new Error('旧版 .doc 暂不支持，请另存为 .docx 后导入')}else{const text=await file.text();count=parsePlanFile(text,file.name)}switchView('plan');save(true);renderPlan();renderHome();toast(count?'成功导入 '+count+' 条计划':'没有识别到可导入内容',count?'success':'warn')}catch(e){console.error(e);toast('导入失败：'+e.message,'warn')}}


function ensureBookSet(book){
 let folder=currentFolder(),parent=folder.type==='set'?findParent(folder.id):folder;parent=parent||state.mistakes;
 let existing=allSets().find(x=>x.sourceBook===book);
 if(existing){state.selectedFolderId=parent.id;return existing}
 const set={id:uid('set'),name:book+'错题集',type:'set',sourceBook:book,round:1,session:null,questions:[]};parent.children=parent.children||[];parent.children.push(set);state.selectedFolderId=parent.id;return set
}
function openMistakeQuestionDialog(){
 if(!state.reasons.length)state.reasons=['概念不清','计算失误','公式遗忘','审题错误','证明思路'].map(name=>({id:uid('reason'),name,questionIds:[]}));
 const sel=$('#mistakeReasonSelect');sel.innerHTML='<option value="">请选择错因</option>'+state.reasons.map(r=>`<option value="${esc(r.name)}">${esc(r.name)}</option>`).join('');
 $('#mistakeBookInput').value='';$('#mistakePageInput').value='';$('#mistakeNumberInput').value='';$('#mistakeNewReasonInput').value='';$('#mistakeTitleInput').value='';$('#mistakeAnalysisInput').value='';$('#mistakeQuestionDialog').showModal()
}
function saveMistakeQuestion(){const title=$('#mistakeTitleInput').value.trim(),book=$('#mistakeBookInput').value.trim(),page=$('#mistakePageInput').value.trim(),number=$('#mistakeNumberInput').value.trim(),subject=$('#mistakeSubjectInput').value,reason=$('#mistakeNewReasonInput').value.trim()||$('#mistakeReasonSelect').value||'未分类';if(!title||!book||!page||!number){toast('请完整填写书籍、页码、题号和题目内容','warn');return}const set=ensureBookSet(book);const q={id:uid('q'),subject,title,analysis:$('#mistakeAnalysisInput').value.trim(),reason,sourceBook:book,page,number,practiceCount:0,correctCount:0,masteryLevel:0,lastPracticed:'',practiceHistory:[],status:'new'};set.questions=set.questions||[];set.questions.push(q);let tag=state.reasons.find(r=>r.name===reason);if(!tag){tag={id:uid('reason'),name:reason,questionIds:[]};state.reasons.push(tag)}tag.questionIds.push(q.id);save(true);$('#mistakeQuestionDialog').close();renderMistakes();toast('错题已加入 '+book+' · '+page+' · '+number,'success')}
function recordPracticeResult(correct){if(!state.practice)return;const p=state.practice,set=p.setData||findNode(p.setId),q=(set?.questions||[]).find(x=>x.id===p.order[p.index]);if(!q)return;saveCurrentAnswer();q.practiceHistory=q.practiceHistory||[];q.practiceHistory.push({date:today(),correct:!!correct,answer:p.answers?.[q.id]?.text||'',round:p.round});if(q.practiceHistory.length>200)q.practiceHistory.splice(0,q.practiceHistory.length-200);q.practiceCount=(+q.practiceCount||0)+1;q.correctCount=(+q.correctCount||0)+(correct?1:0);q.masteryLevel=Math.round(q.correctCount/q.practiceCount*100);q.lastPracticed=today();q.status=q.masteryLevel>=80?'mastered':'review';syncPracticeSession();save(true);toast(correct?'已记录答对，掌握度更新':'已记录答错，稍后继续复习',correct?'success':'warn');nextQuestion()}
document.addEventListener('click',e=>{
 if(e.target.closest('#addMistakeQuestionBtn')){openMistakeQuestionDialog();return}
 if(e.target.closest('#saveMistakeQuestionBtn')){saveMistakeQuestion();return}
 const result=e.target.closest('[data-practice-result]');if(result){recordPracticeResult(result.dataset.practiceResult==='correct');return}
})


function parsePlanFile(text,name=''){
 let added=0;const level=state.activePlanLevel;
 if(name.toLowerCase().endsWith('.json')){
  try{
   const data=JSON.parse(text),map={year:'year',month:'month',week:'week',day:'day'};
   for(const [k,val] of Object.entries(data)){
    if(!map[k]||!Array.isArray(val))continue;
    for(const raw of val){const item=typeof raw==='string'?{title:raw}:raw;added+=addPlanBatch({level:map[k],title:item.title||String(raw),date:item.date||state.planAnchor,time:item.time||'09:00',subject:item.subject||'其他',minutes:+item.minutes||60,repeat:item.repeat||'once',count:+item.count||1})}
   }
   return added
  }catch{return 0}
 }
 const lines=text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
 for(const [i,line] of lines.entries()){
  if(line.startsWith('#')||line.startsWith('//'))continue;
  const clean=line.replace(/^[-*•\d.、\s]+/,'');if(!clean)continue;
  const parts=clean.split(/[,，|]/).map(x=>x.trim()),date=parts.find(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)),time=parts.find(x=>/^\d{1,2}:\d{2}$/.test(x)),title=parts.find(x=>x!==date&&x!==time)||clean;
  added+=addPlanBatch({level,title,date:date||state.planAnchor,time:time||('09:'+pad(i)),subject:'其他',minutes:60,repeat:'once',count:1})
 }
 return added
}

function openSourcePractice(book){const questions=allQuestions().filter(q=>q.sourceBook===book);if(!questions.length){toast('这本书下还没有错题','warn');return}const key='source:'+book;state.sourceSessions=state.sourceSessions||{};let session=state.sourceSessions[key];if(!session||session.done){const ids=questions.map(q=>q.id);session={seed:Date.now()+book.length,order:seededShuffle(ids,Date.now()),index:0,round:(session?.round||1),answers:{},done:false};state.sourceSessions[key]=session}const fake={id:key,name:'来源：'+book,type:'set',round:session.round,questions,session};state.practice={setId:key,setData:fake,round:session.round,order:session.order,index:session.index,answers:session.answers||{}};renderPractice();save()}
document.addEventListener('click',e=>{const source=e.target.closest('[data-source-open]');if(source){openSourcePractice(source.dataset.sourceOpen)}})

document.addEventListener('click',e=>{
 if(e.target.closest('#addPlanBtn')||e.target.closest('#quickAddTask')){$('#planRepeatFields').hidden=state.activePlanLevel!=='day';$('#planItemDialog').showModal();return}
 if(e.target.closest('#importPlanBtn')){$('#planFileInput').click();return}
})

document.addEventListener('click',e=>{
 const nav=e.target.closest('[data-view]');if(nav){switchView(nav.dataset.view);return}
 const jump=e.target.closest('[data-view-jump]');if(jump){switchView(jump.dataset.viewJump);return}
 const task=e.target.closest('[data-task-toggle]');if(task){const p=state.plans.find(x=>x.id===task.dataset.taskToggle);if(p){p.done=!p.done;save(true);renderHome();renderPlan();toast(p.done?'完成一项，真棒！':'已恢复为待完成',p.done?'success':'')}return}
 const planToggle=e.target.closest('[data-plan-toggle]');if(planToggle){const p=state.plans.find(x=>x.id===planToggle.dataset.planToggle);if(p){p.done=!p.done;save(true);renderHome();renderPlan()}return}
 const planDel=e.target.closest('[data-plan-delete]');if(planDel){state.plans=state.plans.filter(x=>x.id!==planDel.dataset.planDelete);save(true);renderPlan();renderHome();toast('计划已删除');return}
 const folder=e.target.closest('[data-folder-select]');if(folder){state.selectedFolderId=folder.dataset.folderSelect;state.selectedReasonId='';save();renderMistakes();return}
 const setOpen=e.target.closest('[data-set-open]');if(setOpen){openPractice(setOpen.dataset.setOpen);return}
 const reasonOpen=e.target.closest('[data-reason-open]');if(reasonOpen){openReasonPractice(reasonOpen.dataset.reasonOpen);return}
 const jumpQ=e.target.closest('[data-question-jump]');if(jumpQ){saveCurrentAnswer();state.practice.index=+jumpQ.dataset.questionJump;syncPracticeSession();renderPractice();return}
 const reasonPick=e.target.closest('[data-set-question-reason]');if(reasonPick&&state.practice){const p=state.practice,set=p.setData||findNode(p.setId),q=(set.questions||[]).find(x=>x.id===p.order[p.index]);q.reason=reasonPick.dataset.setQuestionReason;state.reasons.forEach(r=>r.questionIds=r.questionIds.filter(id=>id!==q.id));let r=state.reasons.find(x=>x.name===q.reason);if(!r){r={id:uid('reason'),name:q.reason,questionIds:[]};state.reasons.push(r)}r.questionIds.push(q.id);save(true);renderPractice();renderMistakes();toast('错因已更新，并汇总到标签中','success');return}
 if(e.target.closest('#editTargetBtn')||e.target.closest('#editScoresBtn')||e.target.closest('#heroSchool')){openTarget();return}
 if(e.target.closest('#addPlanBtn')||e.target.closest('#quickAddTask')){$('#planRepeatFields').hidden=state.activePlanLevel!=='day';$('#planItemDialog').showModal();return}
 if(e.target.closest('#importPlanBtn')){$('#planFileInput').click();return}
 const planTab=e.target.closest('[data-plan-level]');if(planTab){state.activePlanLevel=planTab.dataset.planLevel;save();renderPlan();return}
 if(e.target.closest('#planPrevBtn')||e.target.closest('#planNextBtn')){const n=e.target.closest('#planPrevBtn')?-1:1;const a=new Date(state.planAnchor+'T12:00:00');if(state.activePlanLevel==='day')a.setDate(a.getDate()+n);else if(state.activePlanLevel==='week')a.setDate(a.getDate()+7*n);else if(state.activePlanLevel==='month')a.setMonth(a.getMonth()+n);else a.setFullYear(a.getFullYear()+n);state.planAnchor=dateKey(a);save();renderPlan();return}
 if(e.target.closest('#autoAdjustBtn')||e.target.closest('#applyAdjustBtn')){const n=autoShiftPlans(true);renderAll();toast(n?'已重新排布 '+n+' 项未完成任务':'当前没有需要顺延的任务','success');return}
 if(e.target.closest('#previewReminderBtn')){$('#reminderDialog').showModal();return}
 if(e.target.closest('#toggleReminderBtn')){state.reminder.enabled=!state.reminder.enabled;if(state.reminder.enabled&&'Notification'in window&&Notification.permission==='default')Notification.requestPermission();save(true);renderHome();toast(state.reminder.enabled?'已开启每晚计划提醒':'已关闭计划提醒');return}
 if(e.target.closest('#laterReminderBtn')){$('#reminderDialog').close();return}
 if(e.target.closest('#confirmReminderBtn')){$('#reminderDialog').close();toast('明天计划已确认，晚安小研 🌙','success');return}
})


document.addEventListener('click',e=>{if(e.target.closest('#addReasonBtn')){const name=prompt('输入新的错因名称：');if(name&&!state.reasons.some(r=>r.name===name)){state.reasons.push({id:uid('reason'),name,questionIds:[]});save(true);renderMistakes();toast('错因分类已创建','success')}}})

function seededShuffle(arr,seed){const a=[...arr];let s=seed>>>0;for(let i=a.length-1;i>0;i--){s=(s*1664525+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function clearCanvas(){const c=$('#practiceCanvas');if(!c)return;const ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height)}
function openPractice(setId){const set=findNode(setId);if(!set)return;let session=set.session;if(!session||session.done){const ids=(set.questions||[]).map(q=>q.id),seed=Date.now()+Math.floor(Math.random()*9999);let order=seededShuffle(ids,seed),prev=session?.previousOrder||[];if(ids.length>1){let tries=0;while(order.join('|')===prev.join('|')&&tries<8){order=seededShuffle(ids,seed+tries+1);tries++}}session={seed,order,index:0,round:set.round||1,answers:{},done:false};set.session=session}state.practice={setId,round:session.round,order:session.order,index:session.index,answers:session.answers||{}};state.selectedFolderId=setId;renderPractice();save()}
function closePractice(){if(state.practice)state.practice.open=false;$('#practiceOverlay').classList.remove('open');$('#practiceOverlay').setAttribute('aria-hidden','true');renderMistakes();save()}
function openReasonPractice(reasonId){const reason=state.reasons.find(r=>r.id===reasonId);if(!reason)return;const questions=allQuestions().filter(q=>reason.questionIds.includes(q.id));if(!questions.length){toast('这个错因下还没有题目','warn');return}const key='reason:'+reasonId;state.reasonSessions=state.reasonSessions||{};let session=state.reasonSessions[key];if(!session||session.done){const ids=questions.map(q=>q.id);session={seed:Date.now()+reasonId.length,order:seededShuffle(ids,Date.now()),index:0,round:session?.round||1,answers:{},done:false};state.reasonSessions[key]=session}const fake={id:key,name:'错因：'+reason.name,type:'set',round:session.round,questions,session};state.practice={setId:key,setData:fake,round:session.round,order:session.order,index:session.index,answers:session.answers||{}};renderPractice();save()}
function syncPracticeSession(){if(!state.practice)return;const p=state.practice,set=p.setData||findNode(p.setId);if(!set)return;set.session=set.session||{};set.session.order=p.order;set.session.index=p.index;set.session.round=p.round;set.session.answers=p.answers;set.session.done=false;if(p.setId.startsWith('reason:')){state.reasonSessions=state.reasonSessions||{};state.reasonSessions[p.setId]={...set.session}}if(p.setId.startsWith('source:')){state.sourceSessions=state.sourceSessions||{};state.sourceSessions[p.setId]={...set.session}}}
function nextQuestion(){if(!state.practice)return;const p=state.practice;if(p.index<p.order.length-1){p.index++;syncPracticeSession();save(true);renderPractice()}else finishPracticeRound()}
function finishPracticeRound(){if(!state.practice)return;const p=state.practice,set=p.setData||findNode(p.setId),answered=Object.keys(p.answers||{}).length;state.reviewedToday=(state.reviewedToday||0)+answered;if(set){set.round=(set.round||1)+1;set.session={seed:Date.now()+7,order:[],previousOrder:p.order,index:0,round:set.round,answers:{},done:true};if(p.setId.startsWith('reason:')&&state.reasonSessions)state.reasonSessions[p.setId]={...set.session};if(p.setId.startsWith('source:')&&state.sourceSessions)state.sourceSessions[p.setId]={...set.session}}state.practice=null;$('#practiceOverlay').classList.remove('open');$('#practiceOverlay').setAttribute('aria-hidden','true');save(true);renderMistakes();toast('第 '+p.round+' 轮完成！下次将按新的乱序继续','success')}
function saveCurrentAnswer(){if(!state.practice)return;const q=state.practice.order[state.practice.index];state.practice.answers[q]={text:$('#practiceAnswer').value};syncPracticeSession();save(true)}


function addSession(subject,minutes,content){const now=new Date(),time=pad(now.getHours())+':'+pad(now.getMinutes());state.sessions.push({id:uid('s'),date:today(),time,subject,minutes:+minutes,content:content||subject+'学习'});save(true);renderAll();toast('已保存 '+minutes+' 分钟学习记录','success')}
