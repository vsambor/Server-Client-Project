import Home from '@/components/Home'
import Util from './TestUtil'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const vm = Util.getRenderedComponent(Home)
    vm.$mount()
    expect(vm.$el.querySelector('h4').textContent)
      .to.equal('Welcome to Server Client Project (STP)!')
  })
})
