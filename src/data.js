// ARCHIVE content. Every object below is a PLACEHOLDER ENTRY.
// No provenance is asserted. Replace `record` fields with verified catalogue data
// and set `verified: true` only when a citable source exists (see README).

export const collections = [
  { id: 'photography', name: 'Photography', line: 'Who stood in front of the lens, and who chose the frame.' },
  { id: 'music', name: 'Music', line: 'Sound as record: what was pressed, played, passed hand to hand.' },
  { id: 'fashion', name: 'Fashion', line: 'Cloth as statement: cut, pattern, and how a body was presented.' },
  { id: 'design', name: 'Design', line: 'Print, lettering and objects made to be used and seen.' },
];

const pending = {
  maker: 'Provenance pending',
  date: 'Provenance pending',
  medium: 'Provenance pending',
  holder: 'Provenance pending',
  source: 'No source recorded',
};

export const objects = [
  { id: 'ph-01', collection: 'photography', title: 'Studio portrait, placeholder entry', ask: 'Who chose the pose, the cloth and the backdrop?', themes: ['self-presentation', 'circulation'], record: { ...pending }, verified: false },
  { id: 'ph-02', collection: 'photography', title: 'Street scene, placeholder entry', ask: 'What was left outside the frame?', themes: ['public-life', 'circulation'], record: { ...pending }, verified: false },
  { id: 'mu-01', collection: 'music', title: 'Pressed record sleeve, placeholder entry', ask: 'Where was it sold, and who carried it home?', themes: ['public-life', 'circulation'], record: { ...pending }, verified: false },
  { id: 'mu-02', collection: 'music', title: 'Live performance bill, placeholder entry', ask: 'Who is named on the bill, and who played without a name?', themes: ['public-life', 'unnamed-work'], record: { ...pending }, verified: false },
  { id: 'fa-01', collection: 'fashion', title: 'Printed cloth length, placeholder entry', ask: 'Who made the pattern, and who wore it?', themes: ['self-presentation', 'unnamed-work'], record: { ...pending }, verified: false },
  { id: 'fa-02', collection: 'fashion', title: 'Tailored garment, placeholder entry', ask: 'Whose hands cut it, and is their name kept?', themes: ['self-presentation', 'unnamed-work'], record: { ...pending }, verified: false },
  { id: 'de-01', collection: 'design', title: 'Hand-lettered sign, placeholder entry', ask: 'Who painted it, and how long did it stand?', themes: ['public-life', 'unnamed-work'], record: { ...pending }, verified: false },
  { id: 'de-02', collection: 'design', title: 'Printed poster, placeholder entry', ask: 'Where was it posted, and who tore it down?', themes: ['public-life', 'circulation'], record: { ...pending }, verified: false },
];

export const threads = [
  { id: 'self-presentation', label: 'Self-presentation', blurb: 'Objects where a person decided how to be seen: in a frame, in cloth.' },
  { id: 'public-life', label: 'Public life', blurb: 'Objects that lived outside the home: on walls, stages and streets.' },
  { id: 'circulation', label: 'Circulation', blurb: 'Objects built to travel: prints, sleeves, posters, copies.' },
  { id: 'unnamed-work', label: 'Unnamed work', blurb: 'Objects where the maker may be missing from the record.' },
];
// Links are curatorial groupings by theme, not claims of historical connection.
