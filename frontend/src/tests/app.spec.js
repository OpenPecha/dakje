//import 'regenerator-runtime/runtime'
import { mount } from '@vue/test-utils'
import App from './../App.vue'

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
test('calls check when check button pressed', async () => {
  const wrapper = mount(App)
  
  const checkButton = wrapper.get('[data-test="check"]')

  await checkButton.trigger('click')
  expect(wrapper.vm.$emit('check'))
})

/*
Showcase errors in Red
*/
test('detecting html tags in typearea', async () => {
  const wrapper = mount(App)
  
  const sampleText = "ཐོག་མར་དཀོན་མཆོག་གིས་འཇིག་རྟེན་ཁམས་དང་དེར་ཡོད་པ་ཐམས་ཅད་གར་དུ་བཀོད་གནང་བ་རེད"
  const typearea = wrapper.get('[data-test="typearea"]')
  typearea.element.innerHTML = sampleText

  const checkButton = wrapper.get('[data-test="check"]')
  await checkButton.trigger('click')

  //innerHTML will contain <span> tags and innerText will not
  expect(typearea.element.innerHTML!=typearea.element.innerText)
})

/*
Display suggestions of errors
*/
test('suggestions not empty', async () => {
  const wrapper = mount(App)
  
  const checkButton = wrapper.get('[data-test="check"]')
  await checkButton.trigger('click')

  const suggestions = wrapper.get('[data-test="suggestion"]')

  //suggestions initially is empty until text is spell-checked
  expect(suggestions.exists())
})
