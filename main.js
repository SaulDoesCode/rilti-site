{ /* global rilti data Prism */
  const {dom, component, isFunc, isInt} = rilti
  const {div, span, nav, header, article, a, b, p, br, hr, h1, h2, h3, h4, section, small, style, html, code, pre, details, summary, ul, li} = dom

  const icon = new Proxy(icon => dom.i({className: 'icon-' + icon}), {
    get: (fn, icon) => fn(icon)
  })

  const detail = (short, ...content) => article(h4(short), ...content)

  const codeblock = (src, lang = 'javascript') => pre['language-' + lang](
    code['language-' + lang](
      html(Prism.highlight(src.trim(), Prism.languages[lang]))
    )
  )

  const example = (name, js, css, execute = true) => article.example({
    id: name.split(' ').join('-')
  },
  css ? style(css) : undefined,
  h4(name),
  isFunc(js) && execute ? div.demo(js) : undefined,
  codeblock(isFunc(js) ? js.toString().trim().slice(10, -1).trim() : js),
  css ? codeblock(css, 'css') : undefined
  )

  dom['hero-section']({$: 'body'},
    header(h1(data.hero.title), p(data.hero.subtitle)),
    nav(
      data.hero.nav.map(([name, iconName, href]) =>
        a({href}, icon[iconName], span(name))
      )
    )
  )

  p.the_point({$: 'body', css: {textAlign: 'center', fontSize: '1.45em'}},
    data.thePoint
  )

  dom['concept-section']({$: 'body'},
    h2.heading(data.concepts.heading),
    p(data.concepts.paragraph),
    p(data.concepts.paragraph1),
    dom['idea-blocks'](
      div(
        detail(
          data.concepts.nominalism.name,
          data.concepts.nominalism.desc
        ),
        detail(
          data.concepts.criticalAnalysis.name,
          data.concepts.criticalAnalysis.desc
        )
      ),
      detail(
        data.concepts.PPD.name,
        data.concepts.PPD.desc
      )
    ),
    h2.heading(data.concepts.way.heading),
    section.columns(
      article(
        h4(data.concepts.way.subtractions.heading),
        ul({css: {listStyle: 'none'}},
          data.concepts.way.subtractions.list
            .map(([item, href]) => li(
              a({href, target: '_blank'}, '- ' + item)
            ))
        )
      ),
      article(
        h4(data.concepts.way.changes.heading),
        ul({css: {listStyle: 'none'}},
          data.concepts.way.changes.list
            .map(([item, href]) => li(
              a({href, target: '_blank'}, '+ ' + item)
            ))
        )
      )
    )
  )

  dom['example-section']({$: 'body'},
    h2.heading(data.examplesHeading),
    section.examples(
      data.examples.map(({heading, js, css}) => example(heading, js, css))
    )
  )
}
