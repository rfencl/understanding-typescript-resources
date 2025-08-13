let userName = 'Max';

console.log(typeof userName);

type UserName = typeof userName;

let settings = {
  difficulty: 'easy',
  minLevel: 10,
  didStart: false,
  players: ['John', 'Jane']
};

// type Settings = typeof settings;

function loadData(s: typeof settings) {
  s.didStart = true;
  s.minLevel = 5;
  s.difficulty = 'hard';
  s.players.push('Max');
  return s;
}

settings = loadData(settings);

console.log (settings);