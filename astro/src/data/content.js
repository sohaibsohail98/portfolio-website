export const intro = `Salam, and hi, I'm Sohaib. I've spent the last few years doing platform engineering at some big firms, and I've reached the point where I'd rather build my own things than only ship other people's. Most people consume what gets built. I want to be on the other side of that, making things that work and showing other engineers how I got there.`;

export const cases = [
  { t: 'The guardrail was refusing real questions', m: 'LLM platform, production',
    sum: 'The obvious suspect was wrong, so I went and measured it.',
    rows: [
      ['Problem', 'Legitimate user queries were getting blocked in production. Everyone assumed prompt-attack detection was firing on benign input, and acting on that would have burned the week.'],
      ['What I did', 'Built 27 test cases and 45 positive controls, ran them per region, then repeated them on identical inputs to see whether the detector was even deterministic.'],
      ['Result', 'It was the HATE filter strength, not attack detection. PROMPT_ATTACK turned out to be non-deterministic even at LOW (83% one run, 94% the next), so it cannot gate a release. One config change across three regions fixed it.'],
    ] },
  { t: 'Fifty model deployments, thirty minutes down to two', m: 'Enterprise AI platform',
    sum: 'Portal clicks replaced with a pipeline that fails before it starts.',
    rows: [
      ['Problem', 'Deployments were manual, per model and per region, and you checked quota by asking someone. If it did not fit you found out halfway through, with the estate left in a partial state.'],
      ['What I did', 'A five stage Python pipeline (quota discovery, capacity weighting, dry run, tfvars generation, apply) with one YAML file per model family driving Terraform.'],
      ['Result', '50+ deployments from declarative config and 30 minutes down to 2. More moving parts than a hand written resource block, which is the trade, but failures moved to the start where they are cheap.'],
    ] },
  { t: 'An incident agent you can watch think', m: 'Own project',
    sum: 'Five SRE tools on Bedrock AgentCore, streaming every call as it investigates.',
    rows: [
      ['Problem', 'Agent demos are usually unfalsifiable. If the data shifts run to run you cannot score it, and if the reasoning is hidden you cannot tell competence from luck.'],
      ['What I did', 'Deterministic mock infrastructure so eval scoring stays reproducible, five tools (services, metrics, logs, deployments, cost), and a UI that streams each tool call live instead of showing a spinner.'],
      ['Result', '8/8 eval scenarios passing. One has a false premise: ask which deployment broke checkout-api when none did, and a good answer traces it to the inventory-service dependency rather than inventing one.'],
    ] },
  { t: 'Showing what actually reached the model', m: 'Own project',
    sum: 'An MCP server that makes context window usage visible for any agent loop.',
    rows: [
      ['Problem', 'Most agent observability re-shows you data your own interface already had. The genuinely invisible part is what entered context, and how much of it the user never sees.'],
      ['What I did', 'A drop in MCP server over Streamable HTTP with eight tools, so any client can connect, Claude Desktop included. Token counts are labelled estimates rather than exact usage, documented as a deliberate trade.'],
      ['Result', 'System prompt, tool specs, reasoning, results and answer, in the order they actually entered context, split by what the user sees versus overhead.'],
    ] },
];

export const roles = [
  ['2026', 'Veracross', 'Senior AI Platform Engineer. Multi-agent LLM platform on Bedrock, an eval harness gating every PR, guardrails across three regions, and Terraform across a multi-brand AWS estate.'],
  ['2025–26', 'LSEG', 'Senior Cloud & AI Engineer. Ran an enterprise AI platform used by 200+ engineers end to end: DevOps and deployments, the agentic layer and MCP setup, and unblocking every team onboarding onto it. Escalated to Microsoft\u2019s AI Product team to sort out AI Foundry issues.'],
  ['2023–25', 'PwC', 'Senior DevOps Engineer. Led the Kubernetes workstream for an internal SaaS platform and mentored the juniors on the team. Shipped an AI compliance app into three tier-one bank environments, plus Landing Zones across AWS and Azure.'],
  ['2021–22', 'Capgemini', 'DevOps Engineer. Serverless and EKS workloads, with DevSecOps scanning wired into four different CI systems.'],
];

export const testimonial = {
  quote: 'Sohaib, you are a delight to work with and you have continuously been supporting and helping us onboard onto this LLM platform. We\u2019ve been able to automate our workflows and increase productivity by 45%.',
  who: 'An engineer who onboarded onto the platform, 2026',
};

export const posts = [
  { date: 'Jan 2026', read: '8 min', title: 'The Azure LLM Quota Problem You\u2019ll Hit At Scale (And How I Built Around It)',
    url: 'https://medium.com/@sohaibsohailengineer/the-azure-llm-quota-problem-youll-hit-at-scale-and-how-i-built-around-it-8069be46bc90',
    blurb: 'Deploying a handful of models to AI Foundry is fine. At 50+ across instances you hit a gap neither Azure nor Terraform solves: quota allocation at deployment time.' },
  { date: 'Aug 2025', read: '2 min', title: 'Terraform Tips: Understanding try() and lookup() and When to Use Them',
    url: 'https://medium.com/@sohaibsohailengineer/terraform-tips-understanding-try-and-lookup-and-when-to-use-them-4d617fbd7847',
    blurb: 'Two functions that stop a plan breaking the moment a value is missing, and the distinction that is easy to get wrong.' },
  { date: 'Jul 2025', read: '3 min', title: 'Terraform 1.10.0: Native S3 State Locking Without DynamoDB',
    url: 'https://medium.com/@sohaibsohailengineer/terraform-1-10-0-native-s3-state-locking-without-dynamodb-250830f57b90',
    blurb: 'S3 conditional writes replace the DynamoDB lock table. One backend line, one less service to run.' },
];

export const consult = {
  services: [
    ['Career guidance', 'Breaking into platform or AI engineering, levelling up to senior, or working out your next move.'],
    ['Mentoring', 'Ongoing 1:1 support on the engineering, the projects, and the bits nobody teaches you.'],
    ['Tech consulting', 'Agents, MCP, LLM evaluation, guardrails, Terraform at estate scale. The things I do at work.'],
  ],
};

export const background = {
  lead: 'I\u2019m a senior cloud and AI platform engineer based in Preston, in the UK. Five and a half years in, most of it inside regulated environments where the work has to actually hold up.',
  interests: 'Outside the terminal I follow tech news and world affairs closely, and I travel as much as I can, more than 25 countries so far. New places, new food, new context for how other people build and live.',
  offClock: 'When I\u2019m not working I\u2019m usually learning a new skill, building something of my own, or talking to people about what they\u2019re working on and where it might go.',
};
