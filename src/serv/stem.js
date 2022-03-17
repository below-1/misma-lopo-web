import { DICT } from './dictionary'
import { debug } from './debug'

export function check(word) {
  debug(`[word=${word}] checking dictionary`)
  const index = DICT.indexOf(word)
  const isFound = index >= 0
  if (isFound) {
    debug(`[word=${word}] O`)
  } else {
    debug(`[word=${word}] X`)
  }
  return isFound
}

const simple_rules = [
  { minLength: 5, pattern: /^(ny|nge|ng|m|n)/ },
  { minLength: 5, pattern: /([a-z]+)([klt]ah|pun|ku|mu)$/ },
  { minLength: 5, pattern: /([a-z]+)(nya|ku|mu)$/ },
  { name: 'derivation_suffix', pattern: /(i|kan|an)$/ }
]

const prefixes = [
  { 
    minLength: 5, 
    pattern: /^(di|ke|se)/, 
    after: 'derivation_suffix'
  },
  { 
    pattern: /^(diper|keber|keter)/, 
    after: 'derivation_suffix'
  },
  { 
    pattern: /^(be|te)/, 
    after: 'derivation_suffix'
  },
  {
    pattern: /^(ber|bel|tel|ter)/, 
    after: 'derivation_suffix'
  },
  {
    pattern: /^(me|pe)/, 
    after: 'derivation_suffix'
  },
  {
    pattern: /^(mempel)/, 
    after: 'derivation_suffix'
  },
  {
    pattern: /^(memper)/, 
    after: 'derivation_suffix'
  },
  {
    pattern: /^(meng|peng)/, 
    after: 'derivation_suffix',
    letter_prefix: 'k'
  },
  {
    pattern: /^(meny|peny)/, 
    after: 'derivation_suffix',
    letter_prefix: 's'
  },
  {
    pattern: /^(mel|mer|pel|per)/, 
    after: 'derivation_suffix'
  },
  {
    pattern: /^(men|pen)/, 
    after: 'derivation_suffix',
    letter_prefix: 't'
  },
  {
    pattern: /^(mem|pem)/, 
    after: 'derivation_suffix',
    letter_prefix: 'p'
  }
]

let named_rules = {}

function create_rule(r) {
  return (word) => {
    const transformed = word.replace(r.pattern, '')
    if (transformed == word) return [ word, false ];
    if (check(transformed)) return [ transformed, true ];

    if (r.after) {
      debug(`[word=${word}] check ${r.after}`)
      const [ after_result, isHit ] = named_rules[r.after](transformed)
      if (isHit) {
        return [ after_result, isHit ]
      }
    }

    if (r.letter_prefix) {
      const prefixed = r.letter_prefix + transformed
      if (check(prefixed)) return [ prefixed, true ];

      if (r.after) {
        const [ after_result, isHit ] = named_rules[r.after](prefixed)
        if (isHit) {
          return [ after_result, isHit ]
        }
      }
    }

    return [word, false];
  }
}

simple_rules.forEach(r => {
  if (!r.name) return;
  named_rules[r.name] = create_rule(r)
})

const simple_rulesF = simple_rules.map(create_rule)
const rule_prefixesF = prefixes.map(create_rule)

export function stem2(word) {
  for (let rf of simple_rulesF) {
    const [ rule_result, isHit ] = rf(word);
    if (isHit) {
      return rule_result;
    }
  }

  for (let rf of rule_prefixesF) {
    const [ rule_result, isHit ] = rf(word);
    if (isHit) {
      return rule_result;
    }
  }

  return word;
}
