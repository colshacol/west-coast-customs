/** @jsx h */
import { h } from 'dom-chef'

const generate = self => {
  const styleString = self.styles()
}

const generateBlankStyles = () => <style />

export default {
  generateBlankStyles,
  generate,
}
