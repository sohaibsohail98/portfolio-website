// Live LinkedIn post embeds ("Embed this post" > Copy code, desktop only).
// `h` is the iframe's natural height from LinkedIn's embed code, used so
// each card's internal scroll area knows how much content to expect.
// The 7494515544423919616 post was supplied twice (collapsed + full); only
// the full version is kept here since a portfolio showcase wants the
// un-truncated post.
export const linkedinPosts = [
  { urn: 'urn:li:share:7494508559850737664', h: 1047 },
  { urn: 'urn:li:share:7495278591895818240', h: 1152 },
  { urn: 'urn:li:ugcPost:7494515544423919616', h: 984 },
  { urn: 'urn:li:share:7494524904449679360', h: 1236 },
  { urn: 'urn:li:share:7494507375941505024', h: 866 },
  { urn: 'urn:li:share:7459040669299486720', h: 1019 },
  { urn: 'urn:li:share:7494427186846732288', h: 957 },
  { urn: 'urn:li:share:7494431670796824576', h: 1065 },
  { urn: 'urn:li:ugcPost:7416656886021820416', h: 2181 },
];
