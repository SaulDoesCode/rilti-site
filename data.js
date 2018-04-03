this.data = {
  hero: {
    title: 'rilti.js',
    subtitle: 'something else',
    nav: [
      // name, iconName, href
      ['docs', 'book', '#docs'],
      [
        'src',
        'github',
        'https://github.com/SaulDoesCode/rilti.js'
      ],
      [
        'download',
        'download',
        'https://rawgit.com/SaulDoesCode/rilti.js/master/dist/rilti.min.js'
      ]
    ]
  },
  thePoint: `
    a framework rooted in an emic way of thinking,
    focusing on fearless and meaning rich expressive freedom.
    The only restraint, critical analysis as part of
    the creative devlopment process.
  `,
  concepts: {
    heading: 'idea',
    paragraph: `
      In the last decade web development has become a convoluted mess;
      with so many with new libraries and frameworks
      popping up every day it's hard to know what works, what doesn't and
      whether approaches like that of redux, backbone, angular, or even react,
      are actually more effective than common patterns and solutions
      implemented and adapted to suit
      particular domains, applications, or platforms.
      Modern javascript is already powerful and expressive,
      let's avoid unhelpful abstractions and
      attempt to see things/structures/semantics
      for what they are or represent bearing in mind the
      reasons they exist and roles they fulfill,
      e.g. classes create objects of a type with properties
      and methods, objects are objects and can have methods
      (or be speciated if necessary),
      allowing direct expression, therefore remove classes.
      Reduce clutter and artifacts of dogmatic design or methodology
      that inhibit creative and expressive freedom and potentially
      stunt problem solving which goes beyond the bounds of convention.
      Software needs cognitive engineering, that is design and
      architecture sensitive to minds of people and not machines.
    `,
    paragraph1: `
      Structure does not inherently reduce complexity, it just orders it;
      and while order is an important aspect of semantically rich
      easily interpretable design and architecture, it can at times
      inibit the expressivity, extensibility, and, composability
      of systems, esspecially in large projects.
      This framework opts for a nominalist approach
      over explicit object orientation,
      thereby striking a balance between structuration and function;
      abstraction in this sense should be only be used
      to simplify or enrich semantically processes or behaviours
      which would otherwise be too verbose, obtuse, or, rigid.
    `,
    nominalism: {
      name: 'nominalism',
      desc: `
        The doctrine that universals or general ideas
        are mere names without any corresponding reality.
        Only particular objects exist, and properties,
        numbers, and sets are merely features of
        the way of considering the things that exist.
      `
    },
    criticalAnalysis: {
      name: 'critical analysis',
      desc: `
        Looking into and considering the meanings,
        practicalities, implications and consequences
        of creations and concepts so as to evaluate and
        determine their suitablity, sustainability,
        and, scope of improvment.
      `
    },
    PPD: {
      name: 'polymorphic and perspectivistic design',
      desc: `
        creating expressive interfaces that
        handle more like natural language;
        leaning on intent declaration,
        interpretation, and,
        meaningfull architecture
        to provide functionality
        which reduces the complexity,
        and quantity of programming
        necessary to establish
        core application opperation;
        generating expressive freedom
        that is extensible and composable,
        trancending paradigms.
      `
    },
    way: {
      heading: 'the rilti way',
      subtractions: {
        heading: 'what goes away',
        list: [ // item, href
          [
            `classes: they've got issues`,
            'https://youtu.be/o9pEzgHorH0'
          ],
          [
            `this: unecessary complexity`,
            'https://stackoverflow.com/questions/7000762/null-vs-undefined-and-their-behaviour-in-javascript'
          ],
          [
            'null: because undefined suffices',
            'https://stackoverflow.com/questions/7000762/null-vs-undefined-and-their-behaviour-in-javascript'
          ],
          [
            'explicit object orientation',
            'https://youtu.be/RdE-d_EhzmA'
          ],
          [
            'fear of specificity: it\'s a feature not a bug',
            '#'
          ],
          [
            'postmodern solutions. nothing for the sake of itself!',
            'http://www.mcs.vuw.ac.nz/comp/Publications/CS-TR-02-9.abs.html'
          ],
          [
            `pre-ES6 javascript, it's ${new Date().getFullYear()} the future is now damnit`,
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Browser_compatibility'
          ]
        ]
      },
      changes: {
        heading: 'what changes',
        list: [ // item, href
          [
            'composable factory functions always',
            '#'
          ],
          [
            'implicit polymorphic design',
            '#'
          ],
          [
            'treat all objects as particulars',
            '#'
          ],
          [
            'think critically over every step of devlopment',
            '#'
          ],
          [
            'clear and meaningfull expressive programming',
            '#'
          ],
          [
            'declarative over imperative techinques',
            '#'
          ]
        ]
      }
    }
  },
  examplesHeading: 'show me',
  examples: [
      {
        heading: 'Click Counter',
        js: demo => {
const {dom: {button}, model} = rilti
const state = model({count: 0})

button({
  render: demo,
  onclick: e => ++state.count
},
  'clicks: ', state.sync.count
)
}
      },
      {
        heading: 'Simple single-page mini site with routing',
        js: demo => {
const {dom, on, model} = rilti
const {a, p, h2, nav, main, article} = dom

const router = model({
  active: '#home',
  isActive: href =>
    location.hash === href ||
    router.active === href,
  views: model({
    Home: {
      href: '#home',
      view: `This is the home page`
    },
    Blog: {
      href: '#blog',
      view: [
        article.post(
          h2('So this is a blog'),
          p('Really cool stuff here.')
        ),
        article.post(
          h2('My First Post'),
          p('Hello World!')
        )
      ]
    },
    About: {
      href: '#about',
      view: `This site's about...`
    },
    Contact: {
      href: '#contact',
      view: `Find us on x@y.z`
    }
  })
})

const navbar = nav.navbar({render: demo})
const content = main.content({render: demo})

router.views.each(({href, view}, name) => {
  const active = router.isActive(href)
  const btn = a.btn({
    render: navbar,
    class: {active},
    href
  },
    name
  )

  if (active) {
    content.children = view
  }
  router.on('set:active', hash => {
    if (btn.class.active = href === hash) {
      content.children = view
    }
  })
})

on.hashchange(window, e => {
  router.active = location.hash
})
if (!location.hash) {
  location.hash = router.active
}
},
css: `.navbar {
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto 1.5em auto;
}
.navbar > .btn {
  background: #fff;
  color: var(--highlight-color, #4f4f4f);
  padding: .5em 1em;
  margin: 0 .5em;
  text-decoration: none !important;
  border-radius: 3px;
  transition: all 125ms ease-out;
}
.navbar > .btn:visited {
  color: var(--highlight-color, #4f4f4f);
}
.navbar > .btn:hover {
  background: #eceaea;
  color: #0e0e0e;
}
.navbar > .active {
  color: #0e0e0e;
}
.content {
  width: 100%;
  padding: 1.5em 10%;
}
.post {
  overflow: hidden;
  margin-bottom: 1em;
}`
    }
  ]
}
