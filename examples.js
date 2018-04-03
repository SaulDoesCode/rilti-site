const Classes = () => {
class Human {
  constructor (props) {
    Object.assign(this, props)
  }
  introduce () {
    console.log(`
    Hey, I'm ${this.name}.
    I want to ${this.aspiration}.
    `)
  }
}

class Developer extends Human {
  develop () {
    console.log(`
    ** ${this.name} thinks a bit **
    ** writes some ${this.mainLang} **
    ** doesn't work **
    ** fixes error, works **
    `)
  }
}

const Sisonke = new Human({
  name: 'Sisonke',
  age: 19,
  sex: 'female',
  aspiration: 'become a developer'
})
Sisonke.introduce()
// transmute? there's no way
// for Sisonke to become a developer

const Bob = new Developer({
  name: 'Bob',
  age: 43,
  sex: 'male',
  aspiration: 'outlive Java',
  mainLang: 'smalltalk'
})
Bob.introduce()
Bob.develop()
}

const Factories = () => {
const Human = factory({
  stamp: Symbol('Human'),
  traits: human => ({
    introduce () {
      console.log(`
      Hey, I'm ${human.name}.
      I'd like to ${human.aspiration}.
      `)
    }
  })
})

const Developer = factory({
  stamp: Symbol('Developer'),
  compose: Human,
  traits: dev => ({
    develop () {
      console.log(`
      ** ${dev.name} thinks a bit **
      ** writes some ${dev.mainLang} **
      ** doesn't work **
      ** fixes error, works **
      `)
    }
  })
})

const Nelly = Human({
  name: 'Nelly',
  age: 24,
  sex: 'female',
  aspiration: 'become a developer'
})

// composable and extensible
Developer(Nelly, {mainLang: 'rust'})

Nelly.introduce()
Nelly.develop()

console.log(
  'Nelly human?',
  Human.is(Nelly),
  'She a dev?',
  Developer.is(Nelly)
)

const WW = Developer({
  name: 'Willie Westhuizen',
  age: 36,
  sex: 'male',
  aspiration: 'compose all the things',
  mainLang: 'next level javascript'
})

WW.introduce()
WW.develop()

function factory ({
  stamp,
  traits,
  compose
}) {
  const maker = (
    product = {},
    props = {}
  ) => {
    if (compose) {
      product = compose(product)
    }
    if (product[stamp]) {
      return product
    }
    product[stamp] = true
    extend(product, traits)
    extend(product, props)
    return product
  }
  maker.is = (o = {}) => !!o[stamp]
  return maker
}

function extend (host, obj) {
  if (obj instanceof Function) {
    obj = obj(host)
  }
  if (obj.constructor === Object) {
    for (const prop in obj) {
      if (prop in host) {
        continue
      }
      Object.defineProperty(
        host, prop,
        Object
        .getOwnPropertyDescriptor(
          obj, prop
        )
      )
    }
  }
  return host
}
