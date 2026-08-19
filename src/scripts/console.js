/* ── console content. Every ms/token figure below is illustrative and the UI says so. ── */
const T={
who:{q:'What do you actually do?',
 tr:[{k:'tool',n:'profile.lookup',a:'{}',ms:95,out:'title  <b>Cloud &amp; AI Platform Engineer</b>\nbase   Preston, Lancashire UK\nexp    5 yr 6 mo · AWS, Azure, GCP\nrepos  45 public, since 2019'},
     {k:'model',n:'converse',a:'synthesise',ms:940,out:'stop_reason: <b>end_turn</b>'}],
 ans:`<p>I build the platform layer underneath AI products: deployment pipelines, agent and MCP plumbing, the evaluation that decides whether a change ships, and the guardrails and observability around it.</p>
 <p class="sm">Before that it was five years of pure infrastructure, which is the part that makes the AI work survivable — Terraform at estate scale, Kubernetes, CI/CD, secrets and DevSecOps, mostly inside financial services where a bad deploy is an expensive conversation.</p>`,
 ctx:[['System prompt',1120,'var(--acc)',0,'Instructions for this agent. Ground every claim in a\ntool result; never invent a metric.'],
  ['Tool specs',2340,'var(--warm)',0,'Six tools with JSON schemas. The largest block,\nre-sent on every request, entirely invisible\nto the reader.'],
  ['Tool results',1980,'var(--add)',1,'profile.lookup returned 5 fields.\nSurfaced in the answer above.'],
  ['Reasoning',860,'var(--warm)',0,'Deliberation between calls. Discarded.'],
  ['Answer',940,'var(--del)',1,'The paragraphs you are reading.']]},

work:{q:'Show me your best work',
 tr:[{k:'tool',n:'github.list_repos',a:'{ sort:"pushed" }',ms:230,out:'45 repos\n  <b>sre-investigation-agent</b>   python · 2026\n  <b>mcp-context-inspector</b>    python · 2026\n  <b>halal-mortgage-calculator</b> live · 2026\n  + 42 more'},
     {k:'check',n:'assert.links_resolve',a:'HEAD ×10',ms:180,out:'10/10 <span class="g">200 OK</span>'},
     {k:'model',n:'converse',a:'rank by depth',ms:1120,out:'stop_reason: <b>end_turn</b>'}],
 ans:`<p>Three worth your time.</p>
 <div class="rlist">${['sre','mci','halal'].map(row).join('')}</div>
 <p class="sm" style="margin-top:18px">Underneath sits a Terraform layer, one module per problem I actually hit rather than a tutorial set: an Azure GenAI estate with APIM and AI Search, Vertex vector search, Cloud Run behind Cloud Armor, Entra ID RBAC, ECS Fargate and EKS.</p>`,
 ctx:[['System prompt',1120,'var(--acc)',0,'Cached across turns.'],
  ['Tool specs',2340,'var(--warm)',0,'Unchanged, still re-sent. This is why prompt\ncaching has a commercial argument, not just\na technical one.'],
  ['Tool results',4380,'var(--add)',1,'45 repo records plus 10 HTTP checks. Most of it\nfiltered out before writing.'],
  ['Reasoning',1240,'var(--warm)',0,'Ranking 45 repos down to 3.'],
  ['Answer',1180,'var(--del)',1,'Three rows and two paragraphs.']]},

agent:{q:'Explain the SRE agent',
 tr:[{k:'tool',n:'repo.read',a:'{ path:"tools/" }',ms:140,out:'list_services · get_service_metrics\nsearch_logs · get_recent_deployments\nget_cost_breakdown\n<b>5 tools</b>, each with get_tool_spec()'},
     {k:'check',n:'eval.replay',a:'scenario: checkout-api',ms:1520,out:'expected tools  <span class="g">matched</span>\nkey facts       <span class="g">inventory-service named</span>\nfalse premise   <span class="g">not accepted</span>\n<b>8/8 scenarios passing</b>'},
     {k:'model',n:'converse',a:'summarise',ms:980,out:'stop_reason: <b>end_turn</b>'}],
 ans:`<p>It investigates incidents across four services using five tools: list services, pull metrics, search logs, check recent deployments, break down cost. The infrastructure data is deterministic, which is the point, because it makes the eval scores mean something.</p>
 <p class="sm">Bedrock AgentCore with Claude Sonnet, deployed by Terraform, containerised, DynamoDB or SQLite behind the metrics store. The UI streams every tool call and result as it happens rather than showing a spinner.</p>
 <p>The part I&rsquo;m most pleased with is the negative case in the eval set.</p>
 {{diff}}
 <p class="sm">Ask whether a deployment broke checkout-api when no such deployment exists, and a correct answer has to trace it to the <em class="hl">inventory-service dependency</em> instead. That test catches an agent politely agreeing with your premise, which is the failure mode almost nobody writes a test for.</p>`,
 diff:{f:'tests/eval_scenarios.json',add:3,del:1,h:[['h','@@ scenario 6 @@'],
  ['d','assert: agent finds the deployment that caused it'],
  ['a','premise: false, no deployment exists for checkout-api'],
  ['a','assert: agent does NOT invent one'],
  ['a','assert: agent traces to inventory-service dependency'],
  ['c','# an agent that agrees with you is not an agent that helps you']]},
 ctx:[['System prompt',1120,'var(--acc)',0,'Cached.'],['Tool specs',2340,'var(--warm)',0,'Unchanged.'],
  ['Tool results',5240,'var(--add)',1,'A file read plus an eval replay. The replay is the\nexpensive part and the convincing part.'],
  ['Reasoning',1680,'var(--warm)',0,'Choosing which of 8 scenarios to show.'],
  ['Answer',1420,'var(--del)',1,'Four paragraphs and one diff.']]},

hire:{q:'Why should I hire you?',
 tr:[{k:'tool',n:'roles.query',a:'ORDER BY start DESC',ms:80,out:'veracross   2026 →      ai platform\nlseg        2025 – 26   enterprise ai platform\npwc         2023 – 25   ai compliance, 3 banks\ncapgemini   2021 – 22   devops'},
     {k:'model',n:'converse',a:'answer honestly',ms:1100,out:'stop_reason: <b>end_turn</b>'}],
 ans:`<p>Because I&rsquo;ve already done the unglamorous half. Plenty of people can prototype an agent; fewer have run one in production with quota governance, region failover, an adversarial suite and an evaluation harness that can block a release.</p>
 <p class="sm">And because the evidence is public rather than asserted. The <a href="#cases">case studies</a> above give the constraints and the tradeoffs, not just the outcomes — including the incident where my first hypothesis was wrong.</p>`,
 ctx:[['System prompt',1120,'var(--acc)',0,'Cached.'],['Tool specs',2340,'var(--warm)',0,'Unchanged.'],
  ['Tool results',680,'var(--add)',1,'4 rows. Cheapest turn in the session.'],
  ['Reasoning',540,'var(--warm)',0,'Resisting the urge to oversell.'],
  ['Answer',980,'var(--del)',1,'Two paragraphs.']]}
};

$('#chips').innerHTML=[['who','What do you actually do?'],['work','Best work'],['agent','The SRE agent'],['hire','Why hire you?']]
 .map(([k,l])=>`<button class="chip" data-k="${k}" aria-current="false">${l}</button>`).join('');

let tok=0;
const sleep=m=>new Promise(r=>setTimeout(r,rd?0:m));
const ICON={tool:'▸',model:'✦',check:'✓'};

function build(t){
  let h=t.ans;
  if(t.diff){const d=t.diff;h=h.replace('{{diff}}',`<div class="diff"><div class="dh"><span>${d.f}</span>
   <span class="s"><b>+${d.add}</b> <i>−${d.del}</i></span></div><div class="hk">${d.h.map(([k,l])=>{
   const s=k==='a'?'+':k==='d'?'−':k==='h'?'@':' ';
   return `<div class="${k}"><span class="sg">${s}</span><span>${esc(l)}</span></div>`}).join('')}</div></div>`)}
  return h;
}

async function run(key){
  const t=T[key];if(!t)return;const my=++tok;
  $$('.chip').forEach(c=>c.setAttribute('aria-current',String(c.dataset.k===key)));
  $('#qt').textContent=t.q;$('#trace').innerHTML='';$('#ans').innerHTML='';

  const think=document.createElement('div');think.className='thinking mono';
  think.innerHTML='thinking <i></i>';$('#trace').appendChild(think);
  await sleep(400);if(my!==tok)return;think.remove();

  for(const s of t.tr){
    if(my!==tok)return;
    const el=document.createElement('div');el.className='tr '+s.k;
    el.innerHTML=`<span class="ic" aria-hidden="true">${ICON[s.k]}</span><span class="nm">${s.n}</span>
     <span class="ar">${esc(s.a)}</span><span class="ms">${s.ms}ms</span>
     <button class="dis" aria-expanded="false">output</button>`;
    $('#trace').appendChild(el);
    const pre=document.createElement('pre');pre.className='out';pre.innerHTML=s.out;pre.hidden=true;
    $('#trace').appendChild(pre);
    const btn=el.querySelector('.dis');
    btn.onclick=()=>{pre.hidden=!pre.hidden;btn.setAttribute('aria-expanded',String(!pre.hidden))};
    await sleep(280);
  }
  if(my!==tok)return;
  /* trace is aria-hidden during playback so screen readers get the answer once, not line by line */
  $('#trace').setAttribute('aria-hidden','false');
  $('#ans').innerHTML=build(t);
  if(!rd)$$('#ans > *').forEach((n,i)=>{n.style.opacity='0';n.style.transform='translateY(5px)';
    n.style.transition='opacity .36s ease, transform .36s ease';
    setTimeout(()=>{n.style.opacity='1';n.style.transform='none'},i*80)});
  drawCtx(t);
}

function drawCtx(t){
  const tt=t.ctx.reduce((s,b)=>s+b[1],0), hid=t.ctx.filter(b=>!b[3]).reduce((s,b)=>s+b[1],0);
  $('#ctxteaser').innerHTML=`Inspect what reached the model · ~${(tt/1000).toFixed(1)}k tokens, <b>${Math.round(hid/tt*100)}% you never see</b>`;
  $('#ctxmini').innerHTML=t.ctx.map(([,v,c])=>`<i style="background:${c};width:${v/tt*100}%"></i>`).join('');
  $('#cbar').innerHTML=t.ctx.map(([n,,c],i)=>`<i data-i="${i}" style="background:${c}" title="${n}"></i>`).join('');
  requestAnimationFrame(()=>$$('#cbar i').forEach((i,x)=>i.style.width=t.ctx[x][1]/tt*100+'%'));
  $('#ckey').innerHTML=t.ctx.map(([n,v,c,vis],i)=>
   `<button data-i="${i}" aria-expanded="false"><b style="background:${c}"></b>${n} · ${(v/1000).toFixed(1)}k${vis?'':' · overhead'}</button>`).join('');
  $('#cdet').hidden=true;
  const show=i=>{$$('#ckey button').forEach(b=>b.setAttribute('aria-expanded',String(+b.dataset.i===i)));
    $('#cdet').hidden=false;$('#cdet').textContent=t.ctx[i][4]};
  $('#ckey').onclick=e=>{const b=e.target.closest('button');if(b)show(+b.dataset.i)};
  $('#cbar').onclick=e=>{const i=e.target.closest('i');if(i)show(+i.dataset.i)};
}

