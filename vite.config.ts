import BaseConfig from './build/base.conf'
import ServeConfig from './build/serve.conf'
import BuildConfig from './build/build.conf'

export default ({ command, mode }) => {
  const config = BaseConfig
  console.log('?')
  if (command === 'serve') {
    const c = ServeConfig(config)
    console.log(c)
    return c
  } else {
    return BuildConfig(config)
  }
}