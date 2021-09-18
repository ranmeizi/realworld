import BaseConfig from './build/base.conf'
import ServeConfig from './build/serve.conf'
import BuildConfig from './build/build.conf'

export default ({ command, mode }) => {
  const config = BaseConfig
  if (command === 'serve') {
    const c = ServeConfig(config)
    return c
  } else {
    const c = BuildConfig(config)
    return c
  }
}