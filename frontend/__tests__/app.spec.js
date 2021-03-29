import 'regenerator-runtime/runtime'
import { mount } from '@vue/test-utils'
import App from './../src/App.vue'

/*
Pasting text
*/
test('updates text area', async () => {
  const wrapper = mount(App)
  
  const pasteContents = 'test copy paste'
  const typearea = wrapper.get('[data-test="typearea"]')
  typearea.element.innerHTML = pasteContents
  expect(wrapper.text()).toContain(pasteContents)
})

/*
Uploading a txt file
*/
test('updates contenteditable', async () => {
  const wrapper = mount(App)
  
  const fileContents = 'file contents'
  const file = new Blob([fileContents], { type: "text/plain", name: "sample.txt"})

  let reader = new FileReader()
  reader.readAsText(file, "UTF-8")
  reader.onload = evt => {
    wrapper.get('[data-test="typearea"]').element.innerHTML = evt.target.result;
    expect(wrapper.text()).toContain(fileContents)
  }
})

/*
Check Button pressed
*/

/*
Showcase errors in Red
*/


/*
Display suggestions of errors
*/